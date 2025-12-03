import AuthBanner from '@/components/auth-banner';
import CustomButton from '@/components/custom-button';
import OTPInput from '@/components/otp-input';
import PinPad from '@/components/pin-pad';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { saveToken } from '@/utils/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Registration() {
    const router = useRouter()
    const tinColor = useThemeColor({}, "tint")
    const [phone, setPhone] = useState('')
    const [step, setStep] = useState<'phone' | 'otp' | 'profile' | 'pin'>('phone')
    const [otp, setOtp] = useState('')
    const [profile, setProfile] = useState({ name: '', nid: '', email: '', occupation: '', income: '', division: '', address: '', referral: '' })
    const [pin, setPin] = useState('')

    const handleRegistration = async () => {
        // 👉 Call your API here
        // const res = await axios.post("your-api/auth/login", { email, password });
        const fakeToken = "abc123";

        await saveToken(fakeToken);
        router.replace("/(tabs)");
    };
    return (
        <View style={{ flex: 1 }}>
            <AuthBanner />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.screen, { flexGrow: 1, paddingTop: 80 }]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {step === 'phone' && (
                    <>
                        <ThemedText style={{ textAlign: "center", marginTop: 10 }} type='title'>
                            রেজিস্ট্রেশন করুন
                        </ThemedText>
                        <ThemedText type='subtitle' style={{ textAlign: "center", marginTop: 5 }}>
                            আপনার নম্বর দিন
                        </ThemedText>

                        <View style={{ height: 24 }} />

                        <RoundedInput
                            label="মোবাইল নম্বর"
                            placeholder="মোবাইল নম্বর দিন"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />

                        <View style={{ height: 8 }} />

                        <View style={{ marginTop: 20 }}>
                            <CustomButton isLoading={false} title='পরবর্তী' onPress={() => {
                                // normally send OTP here
                                setStep('otp')
                            }} />
                        </View>
                    </>
                )}

                {step === 'otp' && (
                    <>
                        <ThemedText style={{ textAlign: "center", marginTop: 10 }} type='title'>
                            ওটিপি যাচাই করুন
                        </ThemedText>
                        <ThemedText type='subtitle' style={{ textAlign: "center", marginTop: 5 }}>
                            ভেরিফিকেশন কোড পাঠানো হয়েছে আপনার নম্বরে
                        </ThemedText>

                        <View style={{ height: 24 }} />
                        <OTPInput value={otp} onChange={setOtp} length={6} />

                        <View style={{ height: 20 }} />
                        <CustomButton isLoading={false} title='পরবর্তী' onPress={() => setStep('profile')} />

                        <View style={{ height: 12 }} />
                        <View style={{ alignItems: 'center' }}>
                            <ThemedText type='link' style={{ marginTop: 12 }}>মনে পড়ে না? ওটিপি পুনরায় পাঠান</ThemedText>
                        </View>
                    </>
                )}

                {step === 'profile' && (
                    <>
                        <ThemedText style={{ textAlign: "center", marginTop: 10 }} type='title'>
                            মাস্টার রেজিস্ট্রেশন প্রফাইল
                        </ThemedText>
                        <View style={{ height: 8 }} />

                        <RoundedInput label="Name" placeholder="Name" value={profile.name} onChangeText={(t) => setProfile(p => ({ ...p, name: t }))} />
                        <RoundedInput label="Phone Number" placeholder="Phone Number" value={phone} onChangeText={setPhone} />
                        <RoundedInput label="NID Number" placeholder="NID Number" value={profile.nid} onChangeText={(t) => setProfile(p => ({ ...p, nid: t }))} />
                        <RoundedInput label="Email (Optional)" placeholder="Email" value={profile.email} onChangeText={(t) => setProfile(p => ({ ...p, email: t }))} />
                        <RoundedInput label="Occupation" placeholder="Occupation" value={profile.occupation} onChangeText={(t) => setProfile(p => ({ ...p, occupation: t }))} />
                        <RoundedInput label="Monthly Income" placeholder="Monthly Income" value={profile.income} onChangeText={(t) => setProfile(p => ({ ...p, income: t }))} />
                        <RoundedInput label="Division" placeholder="Division" value={profile.division} onChangeText={(t) => setProfile(p => ({ ...p, division: t }))} />
                        <RoundedInput label="Address" placeholder="Address" value={profile.address} onChangeText={(t) => setProfile(p => ({ ...p, address: t }))} />
                        <RoundedInput label="Referral Code (Optional)" placeholder="Referral Code" value={profile.referral} onChangeText={(t) => setProfile(p => ({ ...p, referral: t }))} />

                        <View style={{ height: 12 }} />
                        <CustomButton isLoading={false} title='পরবর্তী' onPress={() => setStep('pin')} />
                    </>
                )}

                {step === 'pin' && (
                    <>
                        <ThemedText style={{ textAlign: "center", marginTop: 10 }} type='title'>
                            পিন সেট আপ করুন
                        </ThemedText>
                        <ThemedText type='subtitle' style={{ textAlign: "center", marginTop: 5 }}>
                            আপনার জন্য একটি নিরাপদ পিন তৈরি করুন
                        </ThemedText>

                        <View style={{ height: 24 }} />
                        <PinPad length={4} value={pin} onChange={setPin} onSubmit={async () => {
                            // completed registration
                            const fakeToken = 'abc123'
                            await saveToken(fakeToken)
                            router.replace('/(tabs)')
                        }} />
                    </>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    topBox: {
        height: 120,
        width: 120,
        borderRadius: 60,
        shadowColor: "#000",
        shadowOffset: {
            height: 8,
            width: 8
        },
        shadowOpacity: 6,
        shadowRadius: 10,
        backgroundColor: "#fff",
        elevation: 6,
        position: "absolute",
        top: 80,
        left: '50%',
        transform: [{ translateX: -60 }],
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        height: 150,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
    },
    screen: {
        paddingHorizontal: 20,
        paddingBottom: 45,
    }
})