import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { getToken } from '@/utils/auth';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      const inAuthGroup = segments[0] === "(auth)";

      if (!token && !inAuthGroup) {
        // Not logged in → redirect to login
        router.replace("/(auth)/login");
      }
      if (token && inAuthGroup) {
        // Logged in → redirect to dashboard
        router.replace("/(tabs)");
      }

      setReady(true);
    };

    checkAuth();
  }, [segments]);

  if (!ready) return null; // Loading screen optional

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
