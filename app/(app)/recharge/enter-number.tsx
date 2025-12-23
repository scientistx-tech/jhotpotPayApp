import SelectDropdown from '@/components/SelectDropdown';
import { ActionButton, RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { usePhone } from '../../../context/PhoneContext';
import RoundedInput from '@/components/rounded-input';

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
  const tint = useThemeColor({}, 'tint');
  const [phone, setPhone] = useState('');
  const [networkType, setNetworkType] = useState('Grameenphone');
  const [openOperator, setOpenOperator] = useState(false);

  const { setPhone: setPhoneContext } = usePhone();
  const canProceed = useMemo(() => phone.trim().length >= 11 && networkType, [phone, networkType]);

  const handleNextPress = () => {
    if (canProceed) {
      setPhoneContext(phone);
      router.push({
        pathname: '/(app)/recharge/amount',
        params: { phone, network_type: networkType },
      });
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Mobile Recharge"
        showBack={true}
        rightIcon="wallet-plus"
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.formSection}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Recipient
            </ThemedText>
            {/* Use RoundedInput for phone number */}
            <RoundedInput
              label=""
              placeholder="Enter phone number..."
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <SelectDropdown
              label="Select Operator"
              value={networkType}
              options={NETWORK_TYPES.map((op) => op.label)}
              placeholder="Choose operator"
              onSelect={setNetworkType}
              isOpen={openOperator}
              setOpen={setOpenOperator}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={{ flex: 1 }}>
          <ActionButton label="Continue" onPress={handleNextPress} disabled={!canProceed} />
        </View>
      </View>
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
