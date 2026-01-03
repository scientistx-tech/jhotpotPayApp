// app/(auth)/_layout.tsx
import AuthBanner from "@/components/auth-banner";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen options={{ header: (props) => <AuthBanner {...props}  showBack={false} /> }} name="login" />
            <Stack.Screen options={{ header: (props) => <AuthBanner {...props}  showBack={true} /> }} name="registration_page_mobile_number" />
            <Stack.Screen options={{ header: (props) => <AuthBanner {...props} iconName='mobile'  showBack={true} /> }} name="registration_page_otp_varify" />
            <Stack.Screen options={{ header: (props) => <AuthBanner {...props} iconName='circle-user'   showBack={true} /> }} name="registration_page_form" />
            <Stack.Screen options={{ header: (props) => <AuthBanner {...props} iconName='mobile'   showBack={true} /> }} name="registration_page_pin_setup" />

            <Stack.Screen options={{ header: (props) => <AuthBanner {...props} iconName='mobile'  showBack={true} /> }} name="forgot-password" />
            <Stack.Screen options={{ header: (props) => <AuthBanner {...props} iconName='mobile'  showBack={true} /> }} name="forgot-otp" />
            <Stack.Screen options={{ header: (props) => <AuthBanner {...props} iconName='mobile'  showBack={true} /> }} name="reset-password" />
        </Stack>
    );
}
