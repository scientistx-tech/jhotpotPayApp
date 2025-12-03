// app/(auth)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen options={{ headerShown: false }} name="login" />
            <Stack.Screen options={{ headerShown: false }} name="registration_page_mobile_number" />
            <Stack.Screen options={{ headerShown: false }} name="registration_page_otp_varify" />
            <Stack.Screen options={{ headerShown: false }} name="registration_page_form" />
            <Stack.Screen options={{ headerShown: false }} name="registration_page_pin_setup" />
        </Stack>
    );
}
