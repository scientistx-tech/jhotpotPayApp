import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function BillPayment() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');
  
  // Get params from navigation
  const params = useLocalSearchParams<{
    institutionName?: string;
    institutionType?: string;
    categoryId?: string;
  }>();

  const [accountNumber, setAccountNumber] = useState('');
  const [billId, setBillId] = useState('');
  const [amount, setAmount] = useState('');

  const handleBackPress = () => router.back();

  const handleProceed = () => {
    // Validate inputs
    if (!accountNumber.trim()) {
      Alert.alert('ত্রুটি', 'দয়া করে মিটার/একাউন্ট নম্বর লিখুন');
      return;
    }
    
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('ত্রুটি', 'দয়া করে সঠিক পরিমাণ লিখুন');
      return;
    }

    // Process payment or show confirmation
    Alert.alert(
      'পেমেন্ট নিশ্চিত করুন',
      `প্রতিষ্ঠান: ${params.institutionName}\nমিটার/একাউন্ট: ${accountNumber}\n${billId ? `বিল আইডি: ${billId}\n` : ''}পরিমাণ: ৳${amount}`,
      [
        {
          text: 'বাতিল',
          style: 'cancel',
        },
        {
          text: 'পে করুন',
          onPress: () => {
            // Handle payment logic here
            Alert.alert('সফল', 'বিল পেমেন্ট সফল হয়েছে');
            router.back();
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
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>একাউন্ট নম্বর *</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons name="keypad-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="কাউন্ট নম্বর লিখুন"
                placeholderTextColor="#aaa"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>বিল আইডি *</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons name="document-text-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="বিল আইডি লিখুন"
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

      {/* Bottom Button */}
      <View style={[styles.bottomSection, { backgroundColor: bg }]}>
        <TouchableOpacity
          style={[styles.proceedButton, { backgroundColor: tint }]}
          onPress={handleProceed}
        >
          <ThemedText style={styles.proceedButtonText}>এগিয়ে যান</ThemedText>
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
