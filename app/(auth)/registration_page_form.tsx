import { useRegisterMutation } from '@/api/authApi'
import CustomButton from '@/components/custom-button'
import FormInput from '@/components/form-input'
import { ThemedText } from '@/components/themed-text'
import { profileSchema } from '@/schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

export default function RegistrationForm() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const [registerApi, { isLoading }] = useRegisterMutation()
  
  const { control, handleSubmit } = useForm({ 
    resolver: zodResolver(profileSchema), 
    defaultValues: { 
      name: '', 
      password: '', 
      nid: '', 
      email: '', 
      occupation: '', 
      income: '', 
      division: '', 
      address: '', 
      referralCode: '' 
    } 
  })

  const onSubmit = async (data: any) => {
    try {
      const otpId = params.otpId as string | undefined
      if (!otpId) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'OTP verification missing' })
        return
      }

      const payload = {
        name: data.name,
        password: data.password,
        nid: data.nid,
        email: data.email || null,
        occupation: data.occupation,
        income: Number(data.income) || 0,
        division: data.division,
        address: data.address,
        referralCode: data.referralCode || null,
        otpId,
      }

      const res = await registerApi(payload).unwrap()
      if (res.success && res.data.token && res.data.user) {
        Toast.show({ type: 'success', text1: 'Success', text2: 'Registration successful!' })
        router.replace('/(tabs)')
      } else {
        Toast.show({ type: 'error', text1: 'Registration', text2: res.message || 'Registration failed' })
      }
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'Registration', text2: err?.data?.message || 'Registration failed' })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <AuthBanner iconName='circle-user' /> */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { flexGrow: 1, paddingTop: 80 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type='title' style={{ textAlign: 'center' }}>মাস্টার রেজিস্ট্রেশন প্রফাইল</ThemedText>
        <View style={{ height: 8 }} />
        <FormInput name='name' control={control} label='Name' placeholder='Name' />
        <FormInput name='password' control={control} label='Password' placeholder='Password' secureTextEntry />
        {/* <FormInput name='phone' control={control} label='Phone Number' placeholder='Phone Number' /> */}
        <FormInput name='nid' control={control} label='NID Number' placeholder='NID Number' />
        <FormInput name='email' control={control} label='Email (Optional)' placeholder='Email' />
        <FormInput name='occupation' control={control} label='Occupation' placeholder='Occupation' />
        <FormInput name='income' control={control} label='Monthly Income' placeholder='Monthly Income' keyboardType='decimal-pad' />
        <FormInput name='division' control={control} label='Division' placeholder='Division' />
        <FormInput name='address' control={control} label='Address' placeholder='Address' />
        <FormInput name='referralCode' control={control} label='Referral Code (Optional)' placeholder='referralCode Code' />

        <View style={{ height: 12 }} />
        <CustomButton
          isLoading={isLoading}
          title='পরবর্তী'
          onPress={async () => {
            handleSubmit(onSubmit)();
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({ container: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 50 } })