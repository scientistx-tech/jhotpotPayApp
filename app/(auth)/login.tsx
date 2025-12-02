import CustomButton from '@/components/custom-button';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { saveToken } from '@/utils/auth';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Login() {
    const router = useRouter()
    const tinColor = useThemeColor({}, "tint")

    const handleLogin = async () => {
        // 👉 Call your API here
        // const res = await axios.post("your-api/auth/login", { email, password });
        const fakeToken = "abc123";

        await saveToken(fakeToken);
        router.replace("/(tabs)");
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.topBox]}>
                <FontAwesome6 name="circle-user" size={40} color={tinColor} />
            </View>
            <View style={{ height: 80 }} />
            <ScrollView style={styles.screen}>
                <ThemedText style={{ textAlign: "center", marginTop: 10 }} type='title'>
                    রেজিস্ট্রেশন করুন
                </ThemedText>
                <ThemedText type='subtitle' style={{ textAlign: "center", marginTop: 5 }}>
                    আপনার নম্বর দিন
                </ThemedText>
                <CustomButton isLoading={false} title='পরবর্তী' />
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
        top: -60,
        left: '50%',
        transform: [{ translateX: -60 }],
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    screen: {
        paddingHorizontal: 20
    }
})