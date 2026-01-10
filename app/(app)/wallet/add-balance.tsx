import { useBkashOnlinePayMutation, useCreditBalanceMutation, useGetUserCreditQuery } from '@/api/balanceApi';
import CustomButton from '@/components/custom-button';
import RechargeHeader from '@/components/recharge/recharge-header';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View, type ImageSourcePropType } from 'react-native';

// import bkashLogo from '@/assets/online_payment/bkash.png';

type PaymentMethod = 'manual' | 'online';

type PaymentProvider = 'bkash' | 'nagad' | 'rocket' | 'upay';

type AccountType = 'SEND_MONEY' | 'CASH_OUT' | 'PAYMENT';

const ACCOUNT_TYPES: { label: string; value: AccountType }[] = [
  { label: 'Send Money', value: 'SEND_MONEY' },
  { label: 'Cash Out', value: 'CASH_OUT' },
  { label: 'Payment', value: 'PAYMENT' },
];

type Provider = {
  id: PaymentProvider;
  name: string;
  logo: ImageSourcePropType;
};

const PROVIDERS: Provider[] = [
  {
    id: 'bkash',
    name: 'বিকাশ',
    logo: undefined, // Image removed for now
  },
  {
    id: 'nagad',
    name: 'নগদ',
    logo: undefined, // Image removed for now
  },
  {
    id: 'rocket',
    name: 'রকেট',
    logo: undefined, // Image removed for now
  },
  {
    id: 'upay',
    name: 'উপায়',
    logo: undefined, // Image removed for now
  },
];


export default function AddBalance() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const [method, setMethod] = useState<PaymentMethod>('manual');
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('bkash');
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType>('SEND_MONEY');
  const [form, setForm] = useState({ trnxId: '', amount: '', pin: '' });
  const [creditBalance, { isLoading: isCrediting }] = useCreditBalanceMutation();
  const [bkashOnlinePay, { isLoading: isBkashPaying }] = useBkashOnlinePayMutation();

  // Fetch account info when bank_name or account_type changes
  const { data: accountData, isLoading: isAccountLoading, error: accountError } = useGetUserCreditQuery(
    { bank_name: selectedProvider.toUpperCase(), account_type: selectedAccountType },
    { skip: method !== 'manual' || !selectedProvider || !selectedAccountType }
  );

  const handleBackPress = () => router.back();

  // Handle balance credit submit
  const handleSubmit = async () => {
    if (method === 'manual') {
      if (!form.trnxId || !form.amount || !form.pin) {
        alert('সব তথ্য পূরণ করুন');
        return;
      }
      if (!accountData || !accountData.data) {
        alert('অ্যাকাউন্ট তথ্য লোড হচ্ছে বা পাওয়া যায়নি');
        return;
      }
      try {
        const payload = {
          bank_name: accountData?.data.bank_name,
          account_number: accountData?.data.account_number,
          amount: form.amount,
          transaction_id: form.trnxId,
          online_pay: false,
          password: form.pin,
        };
        const res = await creditBalance(payload).unwrap();
        console.log(res)
        if (res.success) {
          alert('ব্যালেন্স সফলভাবে যোগ হয়েছে!');
          router.replace('/(app)/wallet/history');
          setForm({ trnxId: '', amount: '', pin: '' });
        } else {
          alert(res.message || 'কিছু ভুল হয়েছে');
        }
      } catch (e: any) {
        console.log(e)
        alert(e?.data?.message || 'কিছু ভুল হয়েছে');
      }
    } else if (method === 'online') {
      if (!form.amount) {
        alert('পরিমাণ লিখুন');
        return;
      }
      try {
        const res = await bkashOnlinePay({ amount: form.amount }).unwrap();
        console.log(res)
        if (res?.paymentURL) {
          // Will handle navigation to WebView in next step
          router.push({ pathname: '/(app)/wallet/bkash-webview', params: { url: res?.paymentURL } });
        } else {
          alert(res?.message || 'কিছু ভুল হয়েছে');
        }
      } catch (e: any) {
        alert(e?.data?.message || 'কিছু ভুল হয়েছে');
      }
    }
  };

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
      <View className="noteBox">
        <ThemedText style={styles.noteText}>
          ব্যালেন্স যোগ করতে ব্যাংক, অ্যাকাউন্ট টাইপ, লেনদেন রেফারেন্স ও পরিমাণ দিন।
        </ThemedText>
      </View>
      {/* Bank selection */}
      <ThemedText style={{ marginBottom: 6, fontSize: 13 }}>ব্যাংক নির্বাচন করুন</ThemedText>
      <View style={styles.providersRow}>
        {PROVIDERS.map((provider) => (
          <Pressable
            key={provider.id}
            style={[
              styles.providerCard,
              { borderColor: selectedProvider === provider.id ? '#0066FF' : '#E5E8ED', backgroundColor: selectedProvider === provider.id ? '#EEF3FA' : '#F8FAFD' }
            ]}
            onPress={() => setSelectedProvider(provider.id)}
          >
            {/* Image removed for now */}
            <ThemedText style={styles.providerName}>{provider.name}</ThemedText>
          </Pressable>
        ))}
      </View>
      {/* Account type selection */}
      <ThemedText style={{ marginTop: 12, marginBottom: 6, fontSize: 13 }}>অ্যাকাউন্ট টাইপ</ThemedText>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        {ACCOUNT_TYPES.map((type) => (
          <Pressable
            key={type.value}
            style={[
              { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1, borderColor: '#E5E8ED', backgroundColor: selectedAccountType === type.value ? '#EEF3FA' : '#fff' },
            ]}
            onPress={() => setSelectedAccountType(type.value)}
          >
            <ThemedText style={{ fontSize: 13 }}>{type.label}</ThemedText>
          </Pressable>
        ))}
      </View>
      {/* Show account info if loaded */}
      {isAccountLoading ? (
        <ThemedText style={{ fontSize: 13, color: tint }}>অ্যাকাউন্ট তথ্য লোড হচ্ছে...</ThemedText>
      ) : accountData && accountData.data ? (
        <View style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontSize: 13, color: '#11181C' }}>অ্যাকাউন্ট নম্বর: {accountData.data.account_number}</ThemedText>
        </View>
      ) : accountError ? (
        <ThemedText style={{ fontSize: 13, color: 'red' }}>অ্যাকাউন্ট তথ্য পাওয়া যায়নি</ThemedText>
      ) : null}
      <RoundedInput
        placeholder="লেনদেন আইডি লিখুন"
        value={form.trnxId}
        onChangeText={(text) => handleChange('trnxId', text)}
        autoCapitalize="none"
      />
      <RoundedInput
        placeholder="পরিমাণ"
        value={form.amount}
        onChangeText={(text) => handleChange('amount', text)}
        keyboardType="numeric"
      />
      <RoundedInput
        placeholder="পিন"
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
        <Pressable
          key="bkash"
          style={[
            styles.providerCard,
            { borderColor: selectedProvider === 'bkash' ? '#0066FF' : '#E5E8ED', backgroundColor: selectedProvider === 'bkash' ? '#EEF3FA' : '#F8FAFD' }
          ]}
          onPress={() => setSelectedProvider('bkash')}
        >
          {/* Image removed for now */}
          <ThemedText style={styles.providerName}>বিকাশ</ThemedText>
        </Pressable>
      </View>
      <RoundedInput
        placeholder="পরিমাণ"
        value={form.amount}
        onChangeText={(text) => handleChange('amount', text)}
        keyboardType="numeric"
        style={{ marginTop: 16 }}
      />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="ব্যালেন্স যোগ করুন"
        showBack={true}
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
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.selectorCard, { backgroundColor: bg }]}>
            <ThemedText style={styles.sectionLabel}>পদ্ধতি</ThemedText>
            <View style={styles.radioRow}>
              {renderRadio('manual', 'ম্যানুয়াল')}
              {renderRadio('online', 'অনলাইন পেমেন্ট')}
            </View>
          </View>

          {method === 'manual' ? renderManualForm() : renderOnlineOptions()}

          <View style={{ height: 12 }} />
           <View style={styles.bottomAction}>
        <CustomButton title="ব্যালেন্স যোগ করুন" onPress={handleSubmit} isLoading={isCrediting || isBkashPaying} />
      </View>
        </ScrollView>
      </KeyboardAvoidingView>

     
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
    paddingBottom: 30,
    paddingTop: 12,
  },
});
