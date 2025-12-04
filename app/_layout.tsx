import { authApi } from '@/api/authApi';
import { useThemeColor } from '@/hooks/use-theme-color';
import { store } from '@/store/store';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import Toast from "react-native-toast-message";
import { Provider } from 'react-redux';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  const tinColor = useThemeColor({}, "tint")

  useEffect(() => {
    const checkAuth = async () => {
      const inAuthGroup = segments[0] === "(auth)";

      // 👉 Proper RTK Query call
      try {
        const result = await store.dispatch(
          authApi.endpoints.checkAuth.initiate()
        ).unwrap();

        console.log("Auth user:", result);

        // User exists but visiting login → redirect to dashboard
        if (result) {
          router.replace("/(tabs)");
        }

      } catch (error) {
        console.log("Auth failed:", error);

        // If token invalid → redirect to login
        if (!inAuthGroup) {
          router.replace("/(auth)/login");
        }
      }

      setReady(true);
    };

    checkAuth();
  }, [segments]);


  if (!ready) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={'small'} color={tinColor} />
      <Text>Loading...</Text>
    </View>
  ); // Loading screen optional

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={DefaultTheme}>
          <Slot />
          <StatusBar style="auto" />
          <Toast />
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
