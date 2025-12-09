import CustomButton from '@/components/custom-button';
import RechargeHeader from '@/components/recharge/recharge-header';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import appLogo from '@/assets/images/logo.png';
import bkashLogo from '@/assets/online_payment/bkash.png';
import nagadLogo from '@/assets/online_payment/nagad.png';
import rocketLogo from '@/assets/online_payment/rocket.png';
import upayLogo from '@/assets/online_payment/upay.png';

type PaymentMethod = 'manual' | 'online';

type PaymentProvider = 'bkash' | 'nagad' | 'rocket' | 'upay';

type Provider = {
  id: PaymentProvider;
  name: string;
  logo: ImageSourcePropType;
};

const PROVIDERS: Provider[] = [
  {
    id: 'bkash',
    name: 'বিকাশ',
    logo: bkashLogo,
  },
  {
    id: 'nagad',
    name: 'নগদ',
    logo: nagadLogo,
  },
  {
    id: 'rocket',
    name: 'রকেট',
    logo: rocketLogo,
  },
  {
    id: 'upay',
    name: 'উপায়',
    logo: upayLogo,
  },
];

export default function AddBalance() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const [method, setMethod] = useState<PaymentMethod>('manual');
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('bkash');
  const [form, setForm] = useState({ trnxId: '', amount: '', pin: '' });

  const handleBackPress = () => router.back();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const renderRadio = (value: PaymentMethod, label: string) => {
    const active = method === value;
    return (
      <Pressable
        key={value}
        style={[styles.radioItem, active && styles.radioItemActive]}
        onPress={() => setMethod(value)}
      >
        <View style={[styles.radioOuter, active && { borderColor: tint }]}>
          {active && <View style={[styles.radioInner, { backgroundColor: tint }]} />}
        </View>
        <ThemedText style={styles.radioLabel}>{label}</ThemedText>
      </Pressable>
    );
  };

  const renderManualForm = () => (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <View style={styles.noteBox}>
        <ThemedText style={styles.noteText}>
          Provide your transaction reference and amount to add balance manually.
        </ThemedText>
      </View>
      <RoundedInput
        placeholder="Enter Trnx ID"
        value={form.trnxId}
        onChangeText={(text) => handleChange('trnxId', text)}
        autoCapitalize="none"
      />
      <RoundedInput
        placeholder="Amount"
        value={form.amount}
        onChangeText={(text) => handleChange('amount', text)}
        keyboardType="numeric"
      />
      <RoundedInput
        placeholder="PIN"
        value={form.pin}
        onChangeText={(text) => handleChange('pin', text)}
        secureTextEntry
        keyboardType="numeric"
      />
    </View>
  );

  const renderOnlineOptions = () => (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <View style={styles.providersRow}>
        {PROVIDERS.map((provider) => {
          const active = selectedProvider === provider.id;
          return (
            <Pressable
              key={provider.id}
              style={[styles.providerCard, active && { borderColor: tint }]}
              onPress={() => setSelectedProvider(provider.id)}
            >
              <Image source={provider.logo} style={styles.providerLogo} resizeMode="contain" />
              <ThemedText style={styles.providerName}>{provider.name}</ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Add Balance"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.selectorCard, { backgroundColor: bg }]}>
          <ThemedText style={styles.sectionLabel}>System</ThemedText>
          <View style={styles.radioRow}>
            {renderRadio('manual', 'Manual')}
            {renderRadio('online', 'Online Payment')}
          </View>
        </View>

        {method === 'manual' ? renderManualForm() : renderOnlineOptions()}

        <View style={{ height: 12 }} />
      </ScrollView>

      <View style={styles.bottomAction}>
        <CustomButton title="Add Balance" onPress={() => {}} />
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 12,
  },
  selectorCard: {
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E8ED',
  },
  radioItemActive: {
    backgroundColor: '#EEF3FA',
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 13,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  noteBox: {
    borderWidth: 1,
    borderColor: '#E5E8ED',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#F8FAFD',
  },
  noteText: {
    fontSize: 13,
    color: '#4B5563',
  },
  providersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  providerCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E8ED',
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#F8FAFD',
  },
  providerLogo: {
    width: 46,
    height: 46,
    marginBottom: 8,
  },
  providerName: {
    fontSize: 12,
    textAlign: 'center',
  },
  bottomAction: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 12,
  },
});
