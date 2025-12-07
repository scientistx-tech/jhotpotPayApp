import { ActionButton, AmountSelector, RechargeHeader, RecipientCard, TypeSelector } from '@/components/recharge';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type RechargeType = 'prepaid' | 'postpaid' | 'skitto';
type AmountCategory = 'amount' | 'internet' | 'minute' | 'bundle' | 'call-rate';

const AMOUNT_OPTIONS = {
  amount: [
    { id: '10', label: '10 BDT', price: '10 BDT' },
    { id: '20', label: '20 BDT', price: '20 BDT' },
    { id: '50', label: '50 BDT', price: '50 BDT' },
    { id: '100', label: '100 BDT', price: '100 BDT', isNew: true },
    { id: '200', label: '200 BDT', price: '200 BDT' },
    { id: '500', label: '500 BDT', price: '500 BDT' },
  ],
  internet: [
    { id: 'int1', label: '100 MB', price: '29 BDT', duration: '1 Sec' },
    { id: 'int2', label: '500 MB', price: '49 BDT', duration: '3 Days', isNew: true },
    { id: 'int3', label: '1 GB', price: '99 BDT', duration: '7 Days' },
    { id: 'int4', label: '3 GB', price: '199 BDT', duration: '30 Days' },
    { id: 'int5', label: '5 GB', price: '299 BDT', duration: '30 Days' },
    { id: 'int6', label: '10 GB', price: '499 BDT', duration: '30 Days' },
  ],
  minute: [
    { id: 'min1', label: '60 Min', price: '25 BDT', duration: '30 Days' },
    { id: 'min2', label: '120 Min', price: '45 BDT', duration: '30 Days' },
    { id: 'min3', label: '300 Min', price: '99 BDT', duration: '30 Days' },
    { id: 'min4', label: '600 Min', price: '179 BDT', duration: '30 Days' },
    { id: 'min5', label: 'Unlimited', price: '299 BDT', duration: '30 Days', isNew: true },
  ],
  bundle: [
    { id: 'bun1', label: 'Starter', price: '99 BDT', duration: '7 Days' },
    { id: 'bun2', label: 'Pro', price: '199 BDT', duration: '30 Days', isNew: true },
    { id: 'bun3', label: 'Premium', price: '399 BDT', duration: '30 Days' },
    { id: 'bun4', label: 'Elite', price: '699 BDT', duration: '30 Days' },
  ],
  'call-rate': [
    { id: 'call1', label: '0.99/min', price: '10 BDT' },
    { id: 'call2', label: '0.50/min', price: '20 BDT' },
    { id: 'call3', label: '0.25/min', price: '50 BDT', isNew: true },
    { id: 'call4', label: '0.10/min', price: '100 BDT' },
  ],
};

export default function RechargeTypeAmount() {
  const router = useRouter();
  const [rechargeType, setRechargeType] = useState<RechargeType>('prepaid');
  const [selectedCategory, setSelectedCategory] = useState<AmountCategory>('amount');
  const [selectedAmount, setSelectedAmount] = useState<string | undefined>();

  const currentAmounts = AMOUNT_OPTIONS[selectedCategory] || [];

  const handleNextPress = () => {
    if (selectedAmount) {
      router.push('/recharge_internet');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader title="Mobile Recharge" />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <RecipientCard
          name="MD. Mystogan Islam"
          phone="+880 123 345 678"
        />

        <TypeSelector selectedType={rechargeType} onTypeChange={setRechargeType} />

        <View style={styles.divider} />

        <AmountSelector
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedAmount={selectedAmount}
          onAmountSelect={(amount) => setSelectedAmount(amount.id)}
          amounts={currentAmounts}
        />

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.bottomSection}>
        <ActionButton
          label="Next"
          onPress={handleNextPress}
          disabled={!selectedAmount}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  spacer: {
    height: 20,
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
  },
});