import { useForgotPasswordMutation } from '@/api/authApi';
import CustomButton from '@/components/custom-button';
import FormInput from '@/components/form-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ResetPassword() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { control, handleSubmit } = useForm({ defaultValues: { password: '', confirm: '' } });

  const handleReset = async (data: { password: string; confirm: string }) => {
    if (!data.password || !data.confirm) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'সব তথ্য দিন' });
      return;
    }
    if (data.password !== data.confirm) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'পাসওয়ার্ড মিলছে না' });
      return;
    }
    try {
      const res = await forgotPassword({ otpId: params.otpId as string, password: data.password }).unwrap();
      if (res.success) {
        Toast.show({ type: 'success', text1: 'Success', text2: res.message || 'পাসওয়ার্ড রিসেট হয়েছে' });
        setTimeout(() => {
          router.replace('/(auth)/login');
        }, 1200);
      } else {
        Toast.show({ type: 'error', text1: 'Error', text2: res.message || 'রিসেট ব্যর্থ হয়েছে' });
      }
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'Error', text2: err?.data?.message || 'রিসেট ব্যর্থ হয়েছে' });
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
          <ThemedText type='title' style={{ textAlign: 'center', marginTop: 40 }}>নতুন পাসওয়ার্ড সেট করুন</ThemedText>
          <View style={{ height: 24 }} />
          <FormInput name='password' control={control} label='নতুন পাসওয়ার্ড' placeholder='নতুন পাসওয়ার্ড দিন' secureTextEntry />
          <FormInput name='confirm' control={control} label='পাসওয়ার্ড নিশ্চিত করুন' placeholder='আবার দিন' secureTextEntry />
          <View style={{ height: 20 }} />
          <CustomButton isLoading={isLoading} title='রিসেট করুন' onPress={handleSubmit(handleReset)} />
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
