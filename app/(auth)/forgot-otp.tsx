import { useVerifyOtpMutation } from '@/api/authApi';
import CustomButton from '@/components/custom-button';
import OTPInput from '@/components/otp-input';
import { ThemedText } from '@/components/themed-text';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ForgotOtp() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { control, handleSubmit } = useForm({ defaultValues: { otp: '' } });
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleVerifyOtp = async (data: { otp: string }) => {
    try {
      const res = await verifyOtp({ phone: params.phone as string, otp: data.otp }).unwrap();
      if (res.success && res.data.id) {
        router.push({ pathname: '/(auth)/reset-password', params: { otpId: res.data.id } });
      } else {
        Toast.show({ type: 'error', text1: 'OTP Verification', text2: res.message || 'OTP verify failed' });
      }
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'OTP Verification', text2: err?.data?.message || 'OTP verify failed' });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.container}>
          <ThemedText type='title' style={{ textAlign: 'center', marginTop: 40 }}>OTP যাচাই করুন</ThemedText>
          <ThemedText type='subtitle' style={{ textAlign: 'center', marginTop: 6 }}>ভেরিফিকেশন কোড পাঠানো হয়েছে আপনার নম্বরে</ThemedText>
          <View style={{ height: 24 }} />
          <Controller control={control} name='otp' render={({ field }) => <OTPInput value={field.value} onChange={field.onChange} length={6} />} />
          <View style={{ height: 20 }} />
          <CustomButton isLoading={isLoading} title='পরবর্তী' onPress={handleSubmit(handleVerifyOtp)} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
});
