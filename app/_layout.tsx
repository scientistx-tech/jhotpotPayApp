import { authApi } from '@/api/authApi';
import { useThemeColor } from '@/hooks/use-theme-color';
import { store } from '@/store/store';
import { getToken } from '@/utils/auth';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import Toast from "react-native-toast-message";
import { Provider } from 'react-redux';
import { PhoneProvider } from '../context/PhoneContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  const tinColor = useThemeColor({}, "tint")
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      const inAuthGroup = segments[0] === "(auth)";

      if (!token) {
        setAuthenticated(false);
        if (!inAuthGroup) router.replace("/(auth)/login");
      } else {
        try {
          await store.dispatch(authApi.endpoints.checkAuth.initiate()).unwrap();
          setAuthenticated(true);
          if (inAuthGroup) router.replace("/(tabs)");
        } catch {
          setAuthenticated(false);
          if (!inAuthGroup) router.replace("/(auth)/login");
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
      <PhoneProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={DefaultTheme}>
            <Slot />
            <StatusBar style="auto" />
            <Toast />
          </ThemeProvider>
        </GestureHandlerRootView>
      </PhoneProvider>
    </Provider>
  );
}
