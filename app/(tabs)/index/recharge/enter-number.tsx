import { ActionButton, RechargeHeader, RecipientCard } from '@/components/recharge';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function RechargeEnterNumber() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState({
    name: 'MD. Mystogan Islam',
    phone: '+880 123 345 678',
  });

  const canProceed = useMemo(() => phone.trim().length >= 6, [phone]);

  const handleNextPress = () => {
    if (canProceed) {
      router.push('recharge/internet');
    }
  };

  const handleChangeRecipient = () => {
    // Open contact picker or manual entry
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
          {/* <RecipientCard
            name={selectedRecipient.name}
            phone={selectedRecipient.phone}
            onChangePress={handleChangeRecipient}
          /> */}

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
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.bottomSection}>
        <ActionButton label="Proceed" onPress={handleNextPress} disabled={!canProceed} />
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
  spacer: {
    height: 20,
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
  },
});
