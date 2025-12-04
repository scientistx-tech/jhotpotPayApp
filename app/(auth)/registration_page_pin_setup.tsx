import AuthBanner from '@/components/auth-banner'
import PinPad from '@/components/pin-pad'
import { ThemedText } from '@/components/themed-text'
import { saveToken } from '@/utils/auth'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


export default function RegistrationPinSetup() {
  const router = useRouter()
  const [pin, setPin] = React.useState('')
  const [pinError, setPinError] = React.useState('')

  return (
    <View style={{ flex: 1 }}>
      {/* <AuthBanner iconName='mobile' /> */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { flexGrow: 1, paddingTop: 80 }]}
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
            // ensure pin length is correct before finalizing
            // if (pin.length < 4) {
            //   setPinError('পিন ৪ অঙ্ক হতে হবে')
            //   return
            // }
            // setPinError('')
            const fakeToken = 'abc123'
            await saveToken(fakeToken)
            router.replace('/(tabs)')
          }}
        />
        {pinError ? <ThemedText style={{ color: '#e53935', marginTop: 8 }}>{pinError}</ThemedText> : null}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({ container: { paddingHorizontal: 20, paddingTop: 20 } })