import { useThemeColor } from '@/hooks/use-theme-color';
import { logout } from '@/utils/auth';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  title?: string;
};

export default function LogoutButton({ style, title = 'Logout' }: Props) {
  const tint = useThemeColor({}, 'tint');
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onPress = async () => {
    setLoading(true);
    try {
      await logout();
      // route to auth/login after token removed
      router.replace('/(auth)/login');
    } catch (err) {
      console.warn('Logout failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[{ backgroundColor: tint, height: 42, borderRadius: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12 }, style]}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontSize: 15 }}>{title}</Text>}
    </TouchableOpacity>
  );
}
