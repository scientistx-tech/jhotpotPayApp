import { useVerifyOtpMutation } from '@/api/authApi'
import CustomButton from '@/components/custom-button'
import OTPInput from '@/components/otp-input'
import { ThemedText } from '@/components/themed-text'
import { otpSchema } from '@/schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

export default function RegistrationOtp() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { control, handleSubmit } = useForm({ resolver: zodResolver(otpSchema), defaultValues: { otp: '' } })
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation()

  const onSubmit = async (data: any) => {
    try {
      const res = await verifyOtp({ phone: params.phone as string, otp: data.otp }).unwrap()
      if (res.success && res.data.id) {
        const otpId = res.data.id
        router.push({ pathname: 'registration_page_form', params: { otpId, phone: params.phone as string } } as any)
      } else {
        Toast.show({ type: 'error', text1: 'OTP Verification', text2: res.message || 'OTP verify failed' })
      }
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'OTP Verification', text2: err?.data?.message || 'OTP verify failed' })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <AuthBanner iconName='mobile' /> */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.screen,
            { flexGrow: 1, paddingTop: 50, paddingBottom: 200 }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type='title' style={{ textAlign: 'center' }}>ওটিপি যাচাই করুন</ThemedText>
          <ThemedText type='subtitle' style={{ textAlign: 'center', marginTop: 6 }}>ভেরিফিকেশন কোড পাঠানো হয়েছে আপনার নম্বরে</ThemedText>

          <View style={{ height: 24 }} />
          <Controller control={control} name='otp' render={({ field }: { field: any }) => <OTPInput value={field.value} onChange={field.onChange} length={6} />} />

          <View style={{ height: 20 }} />
          <CustomButton isLoading={isLoading} title="পরবর্তী" onPress={handleSubmit(onSubmit)} />

          <View style={{ height: 12 }} />
          <ThemedText type='link' style={{ textAlign: 'center', marginTop: 12 }}>মনে পড়ে না? ওটিপি পুনরায় পাঠান</ThemedText>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({ container: { paddingHorizontal: 20, paddingTop: 40 },
screen: {
        paddingHorizontal: 35
    }})