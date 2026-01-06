import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import HomeHeader from '@/components/home-header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          header: (props) => <HomeHeader
            onNotificationPress={() => console.log('Notifications pressed')}
            onSharePress={() => console.log('Share pressed')}
          />
        }}
      />
      <Tabs.Screen
        name="sale"
        options={{
          title: 'বেচা বিক্রি',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calculator" color={color} />,
            header: (props) => <HomeHeader
            onNotificationPress={() => console.log('Notifications pressed')}
            onSharePress={() => console.log('Share pressed')}
          />
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: 'আমার QR',
          tabBarIcon: ({ color }) => <Ionicons name="qr-code-outline" size={26} color={color} />,
          header: (props) => <HomeHeader
  
            onNotificationPress={() => console.log('Notifications pressed')}
            onSharePress={() => console.log('Share pressed')}
          />
        }}
      />

      <Tabs.Screen
        name="jhotpotPay"
        options={{
          title: 'ঝটপট পে',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wallet.pass.fill" color={color} />,
             header: (props) => <HomeHeader
   
            onNotificationPress={() => console.log('Notifications pressed')}
            onSharePress={() => console.log('Share pressed')}
          />
        }}
      />
    </Tabs>
  );
}
