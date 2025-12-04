import AuthBanner from '@/components/auth-banner';
import CustomButton from '@/components/custom-button';
import FormInput from '@/components/form-input';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { loginSchema } from '@/schemas/authSchema';
import { saveToken } from '@/utils/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Login() {
    const router = useRouter()
    const tinColor = useThemeColor({}, "tint")
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { phone: '', pin: '' }
    })

    const handleLogin = async () => {
        // 👉 Call your API here
        // const res = await axios.post("your-api/auth/login", { email, password });
        const fakeToken = "abc123";

        await saveToken(fakeToken);
        router.replace("/(tabs)");
    };
    return (
        <View style={{ flex: 1 }}>
            {/* <AuthBanner showBack={false} /> */}

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

                <FormInput name="phone" control={control} label="মোবাইল নম্বর" placeholder="মোবাইল নম্বর দিন" keyboardType="phone-pad" />

                <FormInput name="pin" control={control} label="পিন" placeholder="পিন দিন" secureTextEntry keyboardType="numeric" />

                <View style={{ height: 8 }} />

                <View style={{ marginTop: 20, width: '100%' }}>
                    <CustomButton isLoading={false} title='পরবর্তী' onPress={handleSubmit(async (data: any) => {
                        // Call API here with validated data
                        const fakeToken = 'abc123'
                        await saveToken(fakeToken)
                        router.replace('/(tabs)')
                    })} />
                </View>

                <View style={{ marginTop: 12, alignItems: 'center' }}>
                    <ThemedText type="link" style={{ textAlign: 'center' }} onPress={() => router.push('registration_page_mobile_number' as any)}>
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