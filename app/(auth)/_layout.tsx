// app/(auth)/_layout.tsx
import AuthHeader from "@/components/auth-header";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen options={{ header: (props) => <AuthHeader {...props} isBack={false} /> }} name="login" />
        </Stack>
    );
}
