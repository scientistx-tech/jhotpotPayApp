import { useRegisterMutation } from '@/api/authApi'
import PinPad from '@/components/pin-pad'
import { ThemedText } from '@/components/themed-text'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'


export default function RegistrationPinSetup() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const [pin, setPin] = React.useState('')
  const [pinError, setPinError] = React.useState('')
  const [registerApi] = useRegisterMutation()

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
            { flexGrow: 1, paddingTop: 50, paddingBottom: 160 }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type='title' style={{ textAlign: 'center' }}>পিন সেট আপ করুন</ThemedText>
          <ThemedText type='subtitle' style={{ textAlign: 'center', marginTop: 6 }}>আপনার জন্য একটি নিরাপদ পিন তৈরি করুন</ThemedText>

          <View style={{ height: 24 }} />
          <PinPad
            length={4}
            value={pin}
            onChange={setPin}
            onSubmit={async () => {
              try {
                // parse profile passed from previous screen
                const profileRaw = params.profile as string | undefined
                if (!profileRaw) {
                  setPinError('Profile data missing')
                  return
                }
                const profile = JSON.parse(profileRaw)
                const otpId = params.otpId as string | undefined
                if (!otpId) {
                  setPinError('OTP verification missing')
                  return
                }

                const payload = {
                  name: profile.name,
                  password: profile.password,
                  nid: profile.nid,
                  email: profile.email || null,
                  occupation: profile.occupation,
                  income: Number(profile.income) || 0,
                  division: profile.division,
                  address: profile.address,
                  referralCode: profile.referralCode || null,
                  otpId,
                }

                const res = await registerApi(payload).unwrap()
                if (res.success && res.data.token && res.data.user) {
                  router.replace('/(tabs)')
                } else {
                  Toast.show({ type: 'error', text1: 'Registration', text2: res.message || 'Registration failed' })
                }
              } catch (err: any) {
                Toast.show({ type: 'error', text1: 'Registration', text2: err?.data?.message || 'Registration failed' })
              }
            }}
          />
          {pinError ? <ThemedText style={{ color: '#e53935', marginTop: 8 }}>{pinError}</ThemedText> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 20 },
  screen: {
    paddingHorizontal: 20
  }
})