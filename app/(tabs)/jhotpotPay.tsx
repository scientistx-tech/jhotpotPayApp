import {
  FloatingActionButton,
  LiveChatModal,
  WalletSection,
} from '@/components/home';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';

export default function JhotpotPayScreen() {
  const router = useRouter();
  const [isChatVisible, setIsChatVisible] = useState(false);

  const walletItems = [
    { id: 1, icon: 'wallet-plus', label: 'ব্যালেন্স যোগ ', color: '#248AEF' },
    { id: 2, icon: 'cash-multiple', label: 'ক্যাশ আউট', color: '#FF6B6B' },
    { id: 3, icon: 'phone', label: 'রিচার্জ', color: '#FFD93D' },
    { id: 4, icon: 'receipt', label: 'বিল পরিশোধ', color: '#6BCB77' },
    { id: 5, icon: 'qrcode', label: 'পিন পরিবর্তন', color: '#4D96FF' },
    { id: 6, icon: 'history', label: 'ইতিহাস', color: '#9B59B6' },
  ];

  const handleWalletItemPress = (item: any) => {
    if (item.label === 'ব্যালেন্স যোগ') {
      router.push('/(app)/wallet/add-balance');
    } else if (item.label === 'ক্যাশ আউট') {
      router.push('/(app)/wallet/cash-out');
    } else if (item.label === 'রিচার্জ') {
      router.push('/(app)/recharge/enter-number');
    } else if (item.label === 'পিন পরিবর্তন') {
      router.push('/(app)/wallet/change-pin');
    } else if (item.label === 'বিল পরিশোধ') {
      router.push('/(app)/wallet/pay-bill');
    } else if (item.label === 'ইতিহাস') {
      router.push('/(app)/wallet/history');
    } else {
      console.log('Wallet item pressed:', item.label);
    }
  };

  const handleFabPress = () => {
    setIsChatVisible(true);
  };

  return (
    <ThemedView style={{ flex: 1 }}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >

        <WalletSection items={walletItems} onItemPress={handleWalletItemPress} />
      </ScrollView>

      <FloatingActionButton onPress={handleFabPress} />
      
      <LiveChatModal visible={isChatVisible} onClose={() => setIsChatVisible(false)} />
    </ThemedView>
  );
}