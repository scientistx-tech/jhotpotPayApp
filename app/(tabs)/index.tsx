import {
  BannerSection,
  FloatingActionButton,
  StatsSection,
  TollKhataSection,
  WalletSection,
} from '@/components/home';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  // Stats data arrays
  const firstRowStats = [
    { id: 1, amount: '500 TK', label: 'Total Recharge', bgColor: '#248AEF', fontSize: 24 },
    { id: 2, amount: '100 TK', label: 'Total Commission', bgColor: '#248AEF', fontSize: 24 },
    { id: 3, amount: '0 TK', label: 'Statistics', bgColor: '#248AEF', fontSize: 24 },
  ];

  const secondRowStats = [
    { id: 1, amount: '60000 টাকা', label: 'আজকের আয়', bgColor: '#4CAF50', fontSize: 18 },
    { id: 2, amount: '000  টাকা', label: 'আজকের ব্যয়', bgColor: '#FF6B6B', fontSize: 18 },
    { id: 3, amount: '000 টাকা', label: 'আজকের বাকি', bgColor: '#FFD93D', fontSize: 18 },
  ];

  const walletItems = [
    { id: 1, icon: 'wallet-plus', label: 'Add Balance', color: '#248AEF' },
    { id: 2, icon: 'cash-multiple', label: 'Cash Out', color: '#FF6B6B' },
    { id: 3, icon: 'phone', label: 'Recharge', color: '#FFD93D' },
    { id: 4, icon: 'receipt', label: 'Pay Bill', color: '#6BCB77' },
    { id: 5, icon: 'qrcode', label: 'PIN Change', color: '#4D96FF' },
    { id: 6, icon: 'history', label: 'History', color: '#9B59B6' },
  ];

  const tollKhataItems = [
    { id: 1, icon: 'store', label: 'দোকান খোলা', color: '#248AEF' },
    { id: 2, icon: 'file-document', label: 'ডেটা হিসাব', color: '#FF6B6B' },
    { id: 3, icon: 'account-multiple', label: 'সাথীদের সাথে', color: '#FFD93D' },
    { id: 4, icon: 'receipt', label: 'Pay Bill', color: '#6BCB77' },
    { id: 5, icon: 'account-voice', label: 'অংশীদারি', color: '#4D96FF' },
    { id: 6, icon: 'history', label: 'History', color: '#9B59B6' },
  ];

  const handleWalletItemPress = (item: any) => {
    console.log('Wallet item pressed:', item.label);
  };

  const handleTollKhataItemPress = (item: any) => {
    console.log('Toll Khata item pressed:', item.label);
  };

  const handleFabPress = () => {
    console.log('FAB pressed');
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
    </ThemedView>
  );
}