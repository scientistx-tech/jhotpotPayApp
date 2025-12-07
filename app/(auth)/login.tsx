import { useLoginMutation } from '@/api/authApi';
import CustomButton from '@/components/custom-button';
import FormInput from '@/components/form-input';
import { ThemedText } from '@/components/themed-text';
import { loginSchema } from '@/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function Login() {
    const router = useRouter()
    const [loginApi, { isLoading }] = useLoginMutation()
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { phone: '', pin: '' }
    })

    const handleLogin = async (data: { phone: string, pin: string }) => {
        try {
            const res = await loginApi({ password: data.pin, phone: data.phone }).unwrap()
            if (res.success && res.data?.token && res.data?.user) {
                router.replace("/(tabs)");
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: res.message || "Login failed"
                })
            }
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error?.data?.message || "Login failed"
            })
        }
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
                    <CustomButton isLoading={isLoading} title='পরবর্তী' onPress={handleSubmit(handleLogin)} />
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