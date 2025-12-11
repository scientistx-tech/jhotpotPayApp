import { useRegisterMutation } from '@/api/authApi'
import CustomButton from '@/components/custom-button'
import FormInput from '@/components/form-input'
import { ThemedText } from '@/components/themed-text'
import { profileSchema } from '@/schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

export default function RegistrationForm() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const [registerApi, { isLoading }] = useRegisterMutation()
  
  const { control, handleSubmit, watch, setValue } = useForm({ 
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

  const [openSelect, setOpenSelect] = useState<'occupation' | 'division' | null>(null)

  const occupationOptions = ['Student', 'Business', 'Job Holder', 'Freelancer', 'Other']
  const divisionOptions = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh']

  const renderSelect = (
    label: string,
    name: 'occupation' | 'division',
    options: string[],
    placeholder: string,
  ) => {
    const value = watch(name)
    const isOpen = openSelect === name

    return (
      <View style={styles.selectGroup}>
        <ThemedText style={styles.selectLabel}>{label}</ThemedText>
        <TouchableOpacity
          style={[styles.selectBox, isOpen && { borderColor: '#248AEF' }]}
          onPress={() => setOpenSelect(isOpen ? null : name)}
          activeOpacity={0.8}
        >
          <ThemedText style={[styles.selectText, !value && { color: '#9AA1B0' }]}>
            {value || placeholder}
          </ThemedText>
          <ThemedText style={styles.chevron}>{isOpen ? '▲' : '▼'}</ThemedText>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdownMenu}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.dropdownOption}
                onPress={() => {
                  setValue(name, option)
                  setOpenSelect(null)
                }}
              >
                <ThemedText style={styles.dropdownText}>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    )
  }

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
        {renderSelect('Occupation', 'occupation', occupationOptions, 'Select Occupation')}
        <FormInput name='income' control={control} label='Monthly Income' placeholder='Monthly Income' keyboardType='decimal-pad' />
        {renderSelect('Division', 'division', divisionOptions, 'Select Division')}
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

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 50 },
  selectGroup: {
    marginVertical: 6,
  },
  selectLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 8,
  },
  selectBox: {
    borderWidth: 1,
    borderRadius: 22,
    borderColor: '#248AEF',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 14,
    color: '#11181C',
  },
  chevron: {
    fontSize: 14,
    color: '#4B5563',
  },
  dropdownMenu: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8ED',
  },
  dropdownText: {
    fontSize: 14,
    color: '#11181C',
  },
})