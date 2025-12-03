import AuthBanner from '@/components/auth-banner'
import CustomButton from '@/components/custom-button'
import FormInput from '@/components/form-input'
import { ThemedText } from '@/components/themed-text'
import { profileSchema } from '@/schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function RegistrationForm() {
  const router = useRouter()
  const { control, handleSubmit, setError, getValues } = useForm({ resolver: zodResolver(profileSchema), defaultValues: { name: '', phone: '', nid: '', email: '', occupation: '', income: '', division: '', address: '', referral: '' } })

  const onSubmit = (data: any) => {
    // save profile and navigate to pin setup
    router.push('registration_page_pin_setup' as any)
  }

  return (
    <View style={{ flex: 1 }}>
      <AuthBanner iconName='circle-user' />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { flexGrow: 1, paddingTop: 80 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type='title' style={{ textAlign: 'center' }}>মাস্টার রেজিস্ট্রেশন প্রফাইল</ThemedText>

        <View style={{ height: 8 }} />
        <FormInput name='name' control={control} label='Name' placeholder='Name' />
        <FormInput name='phone' control={control} label='Phone Number' placeholder='Phone Number' />
        <FormInput name='nid' control={control} label='NID Number' placeholder='NID Number' />
        <FormInput name='email' control={control} label='Email (Optional)' placeholder='Email' />
        <FormInput name='occupation' control={control} label='Occupation' placeholder='Occupation' />
        <FormInput name='income' control={control} label='Monthly Income' placeholder='Monthly Income' />
        <FormInput name='division' control={control} label='Division' placeholder='Division' />
        <FormInput name='address' control={control} label='Address' placeholder='Address' />
        <FormInput name='referral' control={control} label='Referral Code (Optional)' placeholder='Referral Code' />

        <View style={{ height: 12 }} />
        <CustomButton
          title='পরবর্তী'
          onPress={async () => {
            // const values = getValues();
            // const result = profileSchema.safeParse(values as any);
            // if (!result.success) {
            //   result.error.issues.forEach((issue) => {
            //     const path = issue.path[0] as string;
            //     setError(path, { type: 'manual', message: issue.message });
            //   });
            //   return;
            // }
            handleSubmit(onSubmit)();
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({ container: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 50 } })