import SelectDropdown from '@/components/SelectDropdown';
import { ActionButton, RechargeHeader } from '@/components/recharge';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { usePhone } from '../../../context/PhoneContext';

const NETWORK_TYPES = [
  { id: 'GRAMEENPHONE', label: 'Grameenphone' },
  { id: 'ROBI', label: 'Robi' },
  { id: 'AIRTEL', label: 'Airtel' },
  { id: 'BANGLALINK', label: 'Banglalink' },
  { id: 'TELETALK', label: 'Teletalk' },
  { id: 'SKITTO', label: 'Skitto' },
];

export default function RechargeEnterNumber() {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [networkType, setNetworkType] = useState('Grameenphone');
  const [openOperator, setOpenOperator] = useState(false);

  // Helper to detect network by prefix
  const detectNetworkType = (number: string): string => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.startsWith('017')) return 'Grameenphone';
    if (cleaned.startsWith('018')) return 'Robi';
    if (cleaned.startsWith('016')) return 'Airtel';
    if (cleaned.startsWith('019')) return 'Banglalink';
    if (cleaned.startsWith('015')) return 'Teletalk';
    if (cleaned.startsWith('013')) return 'Skitto';
    return networkType; // fallback to current
  };

  // Handler for phone input that also sets networkType
  const handlePhoneChange = (value: string) => {
    setPhone(value);
    const detected = detectNetworkType(value);
    setNetworkType(detected);
  };

  const { setPhone: setPhoneContext } = usePhone();
  const canProceed = useMemo(() => phone.trim().length >= 11 && networkType, [phone, networkType]);

  const handleNextPress = () => {
    if (canProceed) {
      setPhoneContext(phone);
      router.push({
        pathname: '/(app)/recharge/amount',
        params: { phone, network_type: networkType.toUpperCase() },
      });
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="মোবাইল রিচার্জ"

        showBack={true}
        rightIcon="wallet-plus"
        onBackPress={handleBackPress}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.formSection}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                প্রাপকের মোবাইল নম্বর
              </ThemedText>
              {/* Use RoundedInput for phone number */}
              <RoundedInput
                label=""
                placeholder="মোবাইল নম্বর লিখুন..."
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
              />
              <SelectDropdown
                label="অপারেটর নির্বাচন করুন"
                value={networkType}
                options={NETWORK_TYPES.map((op) => op.label)}
                placeholder="অপারেটর নির্বাচন করুন"
                onSelect={setNetworkType}
                isOpen={openOperator}
                setOpen={setOpenOperator}
                style={{ marginTop: 8 }}
              />
            </View>
          </View>
          <View style={styles.spacer} />
          <View style={styles.bottomSection}>
            <View style={{ flex: 1 }}>
              <ActionButton label="Continue" onPress={handleNextPress} disabled={!canProceed} />
            </View>
          </View>
        </ScrollView>

      </KeyboardAvoidingView>
    </ThemedView>
  );
}
// ...existing styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  formSection: {
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
  },
  operatorCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  operatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  operatorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  operatorBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  operatorBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  serviceLabel: {
    fontSize: 14,
    marginBottom: 12,
  },
  // ...removed picker/dropdownWrapper styles, handled in SelectDropdown
  spacer: {
    height: 20,
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
});
