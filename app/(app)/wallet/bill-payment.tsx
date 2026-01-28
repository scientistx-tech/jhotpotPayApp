import { usePayBillMutation } from '@/api/payBillApi';
import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function BillPayment() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  // Get params from navigation
  const params = useLocalSearchParams<{
    institutionName?: string;
    institutionType?: string;
    categoryId?: string;
    billerId?: string;
  }>();

  const [accountNumber, setAccountNumber] = useState('');
  const [billId, setBillId] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');

  const [payBill, { isLoading }] = usePayBillMutation();

  // Determine bill type from institutionType
  const isElectricityBill = params.institutionType?.includes('বিদ্যুৎ') || params.institutionType?.toLowerCase().includes('electric');
  const isTvBill = params.institutionType?.includes('টিভি') || params.institutionType?.toLowerCase().includes('tv');

  const handleBackPress = () => router.back();

  const handleProceed = async () => {
    // Validate required fields
    if (!params.billerId) {
      Alert.alert('ত্রুটি', 'বিলার আইডি পাওয়া যায়নি');
      return;
    }

    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('ত্রুটি', 'দয়া করে সঠিক পরিমাণ লিখুন');
      return;
    }

    // Show confirmation dialog
    Alert.alert(
      'পেমেন্ট নিশ্চিত করুন',
      `প্রতিষ্ঠান: ${params.institutionName}\n${accountNumber ? `মিটার/একাউন্ট: ${accountNumber}\n` : ''}${subscriptionId ? `সাবস্ক্রিপশন আইডি: ${subscriptionId}\n` : ''}${billId ? `বিল আইডি: ${billId}\n` : ''}${phoneNumber ? `ফোন: ${phoneNumber}\n` : ''}পরিমাণ: ৳${amount}`,
      [
        {
          text: 'বাতিল',
          style: 'cancel',
        },
        {
          text: 'পে করুন',
          onPress: async () => {
            try {
              const response = await payBill({
                billerId: params.billerId!,
                meter_no: accountNumber || '',
                contact_no: phoneNumber || '',
                sms_account_no: billId || '',
                subscription_id: subscriptionId || '',
                amount: Number(amount),
              }).unwrap();

              Alert.alert(
                'সফল',
                response.message || 'বিল পেমেন্ট সফল হয়েছে',
                [
                  {
                    text: 'ঠিক আছে',
                    onPress: () => router.push('/(app)/wallet/bill-details'),
                  },
                ]
              );
            } catch (error: any) {
              Alert.alert(
                'ত্রুটি',
                error?.data?.message || 'বিল পেমেন্ট ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="বিল পেমেন্ট"
        showBack
        onBackPress={handleBackPress}
      />
     
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Institution Info Card */}
          <View style={[styles.infoCard, { backgroundColor: '#fff' }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${tint}15` }]}>
              <Ionicons name="business" size={32} color={tint} />
            </View>
            <View style={styles.infoContent}>
              <ThemedText type="defaultSemiBold" style={styles.institutionName}>
                {params.institutionName || 'N/A'}
              </ThemedText>
              <ThemedText style={styles.institutionType}>
                {params.institutionType || 'বিল পেমেন্ট'}
              </ThemedText>
            </View>
          </View>

          {/* Input Fields */}
          <View style={[styles.inputSection, { backgroundColor: '#fff' }]}>
            {/* Show meter/account number for electricity bills */}
            {isElectricityBill && (
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>মিটার/একাউন্ট নম্বর</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons name="keypad-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="মিটার/একাউন্ট নম্বর লিখুন"
                    placeholderTextColor="#aaa"
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}

            {/* Show subscription ID for TV bills */}
            {isTvBill && (
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>সাবস্ক্রিপশন আইডি</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons name="card-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="সাবস্ক্রিপশন আইডি লিখুন"
                    placeholderTextColor="#aaa"
                    value={subscriptionId}
                    onChangeText={setSubscriptionId}
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>ফোন নম্বর</ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="ফোন নম্বর লিখুন"
                  placeholderTextColor="#aaa"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>এসএমএস একাউন্ট নম্বর</ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="document-text-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="এসএমএস একাউন্ট নম্বর লিখুন"
                  placeholderTextColor="#aaa"
                  value={billId}
                  onChangeText={setBillId}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>পরিমাণ (টাকা) *</ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="cash-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="পরিমাণ লিখুন"
                  placeholderTextColor="#aaa"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </View>

          {/* Info Notice */}
          <View style={[styles.noticeCard, { backgroundColor: `${tint}08` }]}>
            <Ionicons name="information-circle" size={20} color={tint} style={{ marginRight: 8 }} />
            <ThemedText style={styles.noticeText}>
              দয়া করে সঠিক তথ্য প্রদান করুন। পেমেন্ট সম্পন্ন হওয়ার পর ফেরত দেওয়া যাবে না।
            </ThemedText>
          </View>
        </ScrollView>

      </KeyboardAvoidingView>

      {/* Bottom Button */}
      <View style={[styles.bottomSection, { backgroundColor: bg }]}>
        <TouchableOpacity
          style={[styles.proceedButton, { backgroundColor: tint, opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleProceed}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.proceedButtonText}>এগিয়ে যান</ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  infoCard: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
    gap: 4,
  },
  institutionName: {
    fontSize: 16,
    fontWeight: '600',
  },
  institutionType: {
    fontSize: 13,
    opacity: 0.7,
  },
  inputSection: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    gap: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  noticeCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 18,
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 35,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  proceedButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
