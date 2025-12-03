import AuthBanner from '@/components/auth-banner'
import CustomButton from '@/components/custom-button'
import OTPInput from '@/components/otp-input'
import { ThemedText } from '@/components/themed-text'
import { otpSchema } from '@/schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function RegistrationOtp() {
  const router = useRouter()
  const { control, handleSubmit, setError, getValues } = useForm({ resolver: zodResolver(otpSchema), defaultValues: { otp: '' } })

  const onSubmit = (data: any) => {
    // verify OTP then go to profile form
    router.push('registration_page_form' as any)
  }

  return (
    <View style={{ flex: 1 }}>
      <AuthBanner iconName='mobile' />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { flexGrow: 1, paddingTop: 80 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type='title' style={{ textAlign: 'center' }}>ওটিপি যাচাই করুন</ThemedText>
        <ThemedText type='subtitle' style={{ textAlign: 'center', marginTop: 6 }}>ভেরিফিকেশন কোড পাঠানো হয়েছে আপনার নম্বরে</ThemedText>

        <View style={{ height: 24 }} />
        <Controller control={control} name='otp' render={({ field }: { field: any }) => <OTPInput value={field.value} onChange={field.onChange} length={6} />} />

        <View style={{ height: 20 }} />
        <CustomButton title="পরবর্তী" onPress={handleSubmit(onSubmit)} />

        <View style={{ height: 12 }} />
        <ThemedText type='link' style={{ textAlign: 'center', marginTop: 12 }}>মনে পড়ে না? ওটিপি পুনরায় পাঠান</ThemedText>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({ container: { paddingHorizontal: 20, paddingTop: 40 } })