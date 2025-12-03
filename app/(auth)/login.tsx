import AuthBanner from '@/components/auth-banner';
import CustomButton from '@/components/custom-button';
import RoundedInput from '@/components/rounded-input';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { saveToken } from '@/utils/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Login() {
    const router = useRouter()
    const tinColor = useThemeColor({}, "tint")
    const [phone, setPhone] = useState('')
    const [pin, setPin] = useState('')

    const handleLogin = async () => {
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
                <ThemedText style={{ textAlign: "center", marginTop: 10 }} type='title'>
                    লগইন করুন
                </ThemedText>
                <ThemedText type='subtitle' style={{ textAlign: "center", marginTop: 5 }}>
                    আপনার নম্বর এবং পিন দিন
                </ThemedText>

                <View style={{ height: 24 }} />

                <RoundedInput
                    label="মোবাইল নম্বর"
                    placeholder="মোবাইল নম্বর দিন"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                <RoundedInput
                    label="পিন"
                    placeholder="পিন দিন"
                    secureTextEntry
                    keyboardType="numeric"
                    value={pin}
                    onChangeText={setPin}
                />

                <View style={{ height: 8 }} />

                <View style={{ marginTop: 20, width: '100%' }}>
                    <CustomButton isLoading={false} title='পরবর্তী' onPress={async () => {
                        // Call API here, for now fake token
                        const fakeToken = 'abc123'
                        await saveToken(fakeToken)
                        router.replace('/(tabs)')
                    }} />
                </View>

                <View style={{ marginTop: 12, alignItems: 'center' }}>
                    <ThemedText type="link" style={{ textAlign: 'center' }} onPress={() => router.push('registration')}>
                        অ্যাকাউন্ট নেই? রেজিস্ট্রেশন করুন
                    </ThemedText>
                </View>
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
        paddingHorizontal: 20
    }
})