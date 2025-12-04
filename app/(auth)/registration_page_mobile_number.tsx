import AuthBanner from '@/components/auth-banner'
import CustomButton from '@/components/custom-button'
import FormInput from '@/components/form-input'
import { ThemedText } from '@/components/themed-text'
import { phoneSchema } from '@/schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function RegistrationPhone() {
  const router = useRouter()

  const { control, handleSubmit, setError, getValues } = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' }
  })

  const onSubmit = (data: any) => {
    // Normally send OTP here then navigate
    router.push('registration_page_otp_varify' as any)
  }

  return (
    <View style={{ flex: 1 }}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { flexGrow: 1, paddingTop: 80 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type='title' style={{ textAlign: 'center' }}>রেজিস্ট্রেশন করুন</ThemedText>
        <ThemedText type='subtitle' style={{ textAlign: 'center', marginTop: 6 }}>আপনার নম্বর দিন</ThemedText>

        <View style={{ height: 20 }} />
        <FormInput name='phone' control={control} label='মোবাইল নম্বর' placeholder='মোবাইল নম্বর দিন' keyboardType='phone-pad' />

        <View style={{ height: 12 }} />
        <CustomButton title="পরবর্তী" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 40 }
})