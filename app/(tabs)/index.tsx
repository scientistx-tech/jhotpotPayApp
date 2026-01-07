import {
  BannerSection,
  FloatingActionButton,
  LiveChatModal,
  StatsSection,
  TollKhataSection,
  WalletSection,
} from '@/components/home';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [isChatVisible, setIsChatVisible] = useState(false);

  // Stats data arrays
  const firstRowStats = [
    { id: 1, amount: '500 টাকা', label: 'মোট রিচার্জ', bgColor: '#248AEF', fontSize: 24 },
    { id: 2, amount: '100 টাকা', label: 'মোট কমিশন', bgColor: '#248AEF', fontSize: 24 },
    { id: 3, amount: '0 টাকা', label: 'পরিসংখ্যান', bgColor: '#248AEF', fontSize: 24 },
  ];

  const secondRowStats = [
    { id: 1, amount: '60000 টাকা', label: 'আজকের আয়', bgColor: '#4CAF50', fontSize: 18 },
    { id: 2, amount: '000  টাকা', label: 'আজকের ব্যয়', bgColor: '#FF6B6B', fontSize: 18 },
    { id: 3, amount: '000 টাকা', label: 'আজকের বাকি', bgColor: '#FFD93D', fontSize: 18 },
  ];

  const walletItems = [
    { id: 1, icon: 'wallet-plus', label: 'ব্যালেন্স যোগ করুন', color: '#248AEF' },
    { id: 2, icon: 'cash-multiple', label: 'ক্যাশ আউট', color: '#FF6B6B' },
    { id: 3, icon: 'phone', label: 'রিচার্জ', color: '#FFD93D' },
    { id: 4, icon: 'receipt', label: 'বিল পরিশোধ', color: '#6BCB77' },
    { id: 5, icon: 'qrcode', label: 'পিন পরিবর্তন', color: '#4D96FF' },
    { id: 6, icon: 'history', label: 'হিস্টোরি', color: '#9B59B6' },
  ];

  const tollKhataItems = [
    { id: 1, icon: 'store', label: 'বাকি খাতা', color: '#248AEF' },
    { id: 2, icon: 'file-document', label: 'বেচা বিক্রি', color: '#FF6B6B' },
    { id: 3, icon: 'account-multiple', label: 'বিক্রির খাতা', color: '#FFD93D' },
     { id: 4, icon: 'package-variant', label: 'পণ্য ব্যবস্থাপনা', color: '#E67E22' },
    // { id: 4, icon: 'receipt', label: 'বিল পরিশোধ', color: '#6BCB77' },
    { id: 5, icon: 'account-voice', label: 'গ্রাহক তালিকা', color: '#4D96FF' },
    { id: 6, icon: 'history', label: 'হিস্টোরি', color: '#9B59B6' },
  ];

  const handleWalletItemPress = (item: any) => {
    if (item.label === 'ব্যালেন্স যোগ করুন') {
      router.push('/(app)/wallet/add-balance');
    } else if (item.label === 'ক্যাশ আউট') {
      router.push('/(app)/wallet/cash-out');
    } else if (item.label === 'রিচার্জ') {
      router.push('/(app)/recharge/enter-number');
    } else if (item.label === 'পিন পরিবর্তন') {
      router.push('/(app)/wallet/change-pin');
    } else if (item.label === 'বিল পরিশোধ') {
      router.push('/(app)/wallet/pay-bill');
    } else if (item.label === 'হিস্টোরি') {
      router.push('/(app)/wallet/history');
    } else {
      console.log('Wallet item pressed:', item.label);
    }
  };

  const handleTollKhataItemPress = (item: any) => {
    if (item.label === 'বেচা বিক্রি') {
      router.push('/(app)/sales/order');
    } else if (item.label === 'বাকি খাতা') {
      router.push('/(app)/sales/toll-khata');
    } else if (item.label === 'Product Management') {
      router.push('/(app)/sales/product-management');
    } else if (item.label === 'গ্রাহক তালিকা') {
      router.push('/(app)/sales/customer-list');
    } else if (item.label === 'হিস্টোরি') {
      router.push('/(app)/sales/history');
    } else if (item.label === 'পণ্য ব্যবস্থাপনা') {
      router.push('/(app)/sales/product-list');
    }
    
    else {
      console.log('Menu item pressed:', item.label);
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
        <StatsSection firstRowStats={firstRowStats} secondRowStats={secondRowStats} />

        <BannerSection />

        <WalletSection items={walletItems} onItemPress={handleWalletItemPress} />

        <TollKhataSection items={tollKhataItems} onItemPress={handleTollKhataItemPress} />
      </ScrollView>

      <FloatingActionButton onPress={handleFabPress} />
      
      <LiveChatModal visible={isChatVisible} onClose={() => setIsChatVisible(false)} />
    </ThemedView>
  );
}
