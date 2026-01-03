import { useSendOtpMutation } from '@/api/authApi';
import CustomButton from '@/components/custom-button';
import FormInput from '@/components/form-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ForgotPassword() {
  const router = useRouter();
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const { control, handleSubmit } = useForm({ defaultValues: { phone: '' } });

  const handleSendOtp = async (data: { phone: string }) => {
    try {
      const res = await sendOtp({ phone: data.phone, key: 'reset' }).unwrap();
      if (res.success && res.data?.phone) {
        router.push({ pathname: '/(auth)/forgot-otp', params: { phone: data.phone } });
      } else {
        Toast.show({ type: 'error', text1: 'OTP', text2: res.message || 'OTP send failed' });
      }
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'OTP', text2: err?.data?.message || 'OTP send failed' });
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.container}>
          <ThemedText type='title' style={{ textAlign: 'center', marginTop: 40 }}>পাসওয়ার্ড রিসেট</ThemedText>
          <ThemedText type='subtitle' style={{ textAlign: 'center', marginTop: 6 }}>আপনার নম্বর দিন, OTP পাঠানো হবে</ThemedText>
          <View style={{ height: 24 }} />
          <FormInput name='phone' control={control} label='মোবাইল নম্বর' placeholder='মোবাইল নম্বর দিন' keyboardType='phone-pad' />
          <View style={{ height: 20 }} />
          <CustomButton isLoading={isLoading} title='OTP পাঠান' onPress={handleSubmit(handleSendOtp)} />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
});
