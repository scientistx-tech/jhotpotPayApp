import CustomButton from '@/components/custom-button';
import RechargeHeader from '@/components/recharge/recharge-header';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import appLogo from '@/assets/images/logo.png';
import bkashLogo from '@/assets/online_payment/bkash.png';
import nagadLogo from '@/assets/online_payment/nagad.png';
import rocketLogo from '@/assets/online_payment/rocket.png';
import upayLogo from '@/assets/online_payment/upay.png';

type OperatorId = 'bkash' | 'nagad' | 'rocket' | 'upay';

type Operator = {
  id: OperatorId;
  name: string;
  logo: ImageSourcePropType;
};

const OPERATORS: Operator[] = [
  { id: 'bkash', name: 'Bkash', logo: bkashLogo },
  { id: 'nagad', name: 'Nagad', logo: nagadLogo },
  { id: 'rocket', name: 'Rocket', logo: rocketLogo },
  { id: 'upay', name: 'Upay', logo: upayLogo },
];

export default function CashOut() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const [selectedOperator, setSelectedOperator] = useState<Operator>(OPERATORS[0]);
  const [showOperators, setShowOperators] = useState(false);
  const [form, setForm] = useState({ receiver: '', amount: '' });

  const handleBackPress = () => router.back();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleOperators = () => setShowOperators((prev) => !prev);

  const handleSelect = (operator: Operator) => {
    setSelectedOperator(operator);
    setShowOperators(false);
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Cash out Request"
        showBack
        onBackPress={handleBackPress}
        rightImage={appLogo}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.card, { backgroundColor: bg }]}> 
          <ThemedText style={styles.label}>Select Operator</ThemedText>
          <Pressable style={[styles.dropdown, { borderColor: '#E5E8ED' }]} onPress={toggleOperators}>
            <View style={styles.dropdownLeft}>
              <Image source={selectedOperator.logo} style={styles.operatorLogo} resizeMode="contain" />
              <ThemedText style={styles.dropdownText}>{selectedOperator.name}</ThemedText>
            </View>
            <Ionicons name={showOperators ? 'chevron-up' : 'chevron-down'} size={18} color="#6B7280" />
          </Pressable>

          {showOperators && (
            <View style={styles.dropdownList}>
              {OPERATORS.map((op) => (
                <Pressable key={op.id} style={styles.dropdownItem} onPress={() => handleSelect(op)}>
                  <View style={styles.dropdownLeft}>
                    <Image source={op.logo} style={styles.operatorLogoSmall} resizeMode="contain" />
                    <ThemedText style={styles.dropdownText}>{op.name}</ThemedText>
                  </View>
                  {selectedOperator.id === op.id ? (
                    <Ionicons name="checkmark" size={18} color={tint} />
                  ) : null}
                </Pressable>
              ))}
            </View>
          )}

          <View style={styles.divider} />

          <ThemedText style={styles.label}>Select Receiver Number</ThemedText>
          <RoundedInput
            placeholder="Enter Receiver Number"
            value={form.receiver}
            onChangeText={(text) => handleChange('receiver', text)}
            keyboardType="phone-pad"
          />

          <ThemedText style={[styles.label, { marginTop: 10 }]}>Enter Amount</ThemedText>
          <RoundedInput
            placeholder="Enter Amount"
            value={form.amount}
            onChangeText={(text) => handleChange('amount', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={{ height: 12 }} />
      </ScrollView>

      <View style={styles.bottomAction}>
        <CustomButton title="Submit" onPress={() => {}} />
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
  },
  card: {
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 8,
  },
  dropdown: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFD',
  },
  dropdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdownText: {
    fontSize: 14,
  },
  operatorLogo: {
    width: 32,
    height: 32,
  },
  operatorLogoSmall: {
    width: 26,
    height: 26,
  },
  dropdownList: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E8ED',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  divider: {
    height: 1,
    backgroundColor: '#E9EDF3',
    marginVertical: 14,
  },
  bottomAction: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 12,
  },
});
