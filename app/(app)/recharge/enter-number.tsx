import { ActionButton, RechargeHeader } from '@/components/recharge';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

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
  const [networkType, setNetworkType] = useState('GRAMEENPHONE');

  const canProceed = useMemo(() => phone.trim().length >= 11 && networkType, [phone, networkType]);

  const handleNextPress = () => {
    if (canProceed) {
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
            <RoundedInput
              placeholder="Enter phone number..."
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <ThemedText type="defaultSemiBold" style={[styles.label, { marginTop: 16 }]}>Select Operator</ThemedText>
            <View style={styles.servicesGrid}>
              {NETWORK_TYPES.map((op) => (
                <TouchableOpacity
                  key={op.id}
                  style={[
                    styles.serviceButton,
                    networkType === op.id && [
                      styles.serviceButtonActive,
                      { backgroundColor: tint },
                    ],
                  ]}
                  onPress={() => setNetworkType(op.id)}
                >
                  <ThemedText
                    style={[
                      styles.serviceButtonText,
                      networkType === op.id && styles.serviceButtonTextActive,
                    ]}
                  >
                    {op.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>

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
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceButton: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    backgroundColor: '#F8FAFD',
    alignItems: 'center',
  },
  serviceButtonActive: {
    borderColor: 'transparent',
  },
  serviceButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#11181C',
  },
  serviceButtonTextActive: {
    color: '#fff',
  },
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
