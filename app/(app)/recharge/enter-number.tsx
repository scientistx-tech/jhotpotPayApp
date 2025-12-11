import { ActionButton, RechargeHeader } from '@/components/recharge';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const OPERATOR_PREFIXES: Record<string, { name: string; services: string[] }> = {
  '170': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '171': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '172': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '173': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '174': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '175': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '176': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '177': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '178': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '179': { name: 'Grameenphone', services: ['Skitto', 'Prepaid', 'Postpaid'] },
  '180': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '181': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '182': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '183': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '184': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '185': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '186': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '187': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '188': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '189': { name: 'Banglalink', services: ['Prepaid', 'Postpaid'] },
  '190': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
  '191': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
  '192': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
  '193': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
  '194': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
  '195': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
  '196': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
  '197': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
  '198': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
  '199': { name: 'Robi', services: ['Prepaid', 'Postpaid'] },
};

export default function RechargeEnterNumber() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const operatorInfo = useMemo(() => {
    const prefix = phone.slice(1, 4);
    return OPERATOR_PREFIXES[prefix] || null;
  }, [phone]);

  const canProceed = useMemo(() => phone.trim().length >= 11 && selectedService, [phone, selectedService]);

  const handleNextPress = () => {
    if (canProceed && operatorInfo) {
      router.push({
        pathname: '/recharge/amount',
        params: { phone, operator: operatorInfo.name, service: selectedService },
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
              onChangeText={(text) => {
                setPhone(text);
                setSelectedService(null);
              }}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {operatorInfo && (
          <View style={styles.operatorCard}>
            <View style={styles.operatorHeader}>
              <ThemedText style={styles.operatorName}>{operatorInfo.name}</ThemedText>
              <View style={[styles.operatorBadge, { backgroundColor: tint }]}>
                <ThemedText style={styles.operatorBadgeText}>Detected</ThemedText>
              </View>
            </View>

            <ThemedText type="defaultSemiBold" style={styles.serviceLabel}>
              Select Service Type
            </ThemedText>

            <View style={styles.servicesGrid}>
              {operatorInfo.services.map((service) => (
                <TouchableOpacity
                  key={service}
                  style={[
                    styles.serviceButton,
                    selectedService === service && [
                      styles.serviceButtonActive,
                      { backgroundColor: tint },
                    ],
                  ]}
                  onPress={() => setSelectedService(service)}
                >
                  <ThemedText
                    style={[
                      styles.serviceButtonText,
                      selectedService === service && styles.serviceButtonTextActive,
                    ]}
                  >
                    {service}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

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
