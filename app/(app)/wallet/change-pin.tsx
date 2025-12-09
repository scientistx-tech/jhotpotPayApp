import CustomButton from '@/components/custom-button';
import RechargeHeader from '@/components/recharge/recharge-header';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function ChangePin() {
  const router = useRouter();
  const bg = useThemeColor({}, 'background');

  const [form, setForm] = useState({ oldPin: '', newPin: '', confirmPin: '' });
  const [errors, setErrors] = useState({ oldPin: '', newPin: '', confirmPin: '' });

  const handleBackPress = () => router.back();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const validate = () => {
    const newErrors = { oldPin: '', newPin: '', confirmPin: '' };
    if (!form.oldPin.trim()) newErrors.oldPin = 'Old PIN is required';
    if (!form.newPin.trim()) newErrors.newPin = 'New PIN is required';
    if (form.newPin.length < 4) newErrors.newPin = 'PIN must be at least 4 digits';
    if (!form.confirmPin.trim()) newErrors.confirmPin = 'Confirm PIN is required';
    if (form.newPin !== form.confirmPin) newErrors.confirmPin = 'PINs do not match';
    setErrors(newErrors);
    return !newErrors.oldPin && !newErrors.newPin && !newErrors.confirmPin;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Change PIN:', form);
      // API call would go here
    }
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Change PIN"
        showBack
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.card, { backgroundColor: bg }]}>
          <ThemedText style={styles.label}>OLD PIN</ThemedText>
          <RoundedInput
            placeholder="Enter Old PIN"
            value={form.oldPin}
            onChangeText={(text) => handleChange('oldPin', text)}
            secureTextEntry
            keyboardType="numeric"
          />
          {errors.oldPin ? <ThemedText style={styles.error}>{errors.oldPin}</ThemedText> : null}

          <ThemedText style={[styles.label, { marginTop: 16 }]}>NEW PIN</ThemedText>
          <RoundedInput
            placeholder="Enter New PIN"
            value={form.newPin}
            onChangeText={(text) => handleChange('newPin', text)}
            secureTextEntry
            keyboardType="numeric"
          />
          {errors.newPin ? <ThemedText style={styles.error}>{errors.newPin}</ThemedText> : null}

          <ThemedText style={[styles.label, { marginTop: 16 }]}>CONFIRM PIN</ThemedText>
          <RoundedInput
            placeholder="Confirm PIN"
            value={form.confirmPin}
            onChangeText={(text) => handleChange('confirmPin', text)}
            secureTextEntry
            keyboardType="numeric"
          />
          {errors.confirmPin ? <ThemedText style={styles.error}>{errors.confirmPin}</ThemedText> : null}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.bottomAction}>
        <CustomButton title="CHANGE PIN" onPress={handleSubmit} />
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
    paddingTop: 16,
    paddingBottom: 24,
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
  label: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
    fontWeight: '600',
  },
  error: {
    fontSize: 12,
    color: '#e53935',
    marginTop: 6,
  },
  bottomAction: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 12,
  },
});
