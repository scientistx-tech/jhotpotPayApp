import { useGetUserOverviewQuery } from '@/api/balanceApi';
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
  const [sort, setSort] = useState<'day' | 'month' | 'year'>('day');

  // Fetch overview for selected sort
  const { data: overview } = useGetUserOverviewQuery({ sort });

  // Get stats object for current sort
  let statsData: any = {};
  if (sort === 'day') statsData = overview?.data?.day || {};
  if (sort === 'month') statsData = overview?.data?.month || {};
  if (sort === 'year') statsData = overview?.data?.year || {};


  // Prepare stats for StatsSection
  const firstRowStats = [
    {
      id: 1,
      amount: `${overview?.data?.totalRecharge ?? 0} টাকা`,
      label: 'মোট রিচার্জ',
      bgColor: '#248AEF',
      fontSize: 24,
    },
    {
      id: 2,
      amount: `${overview?.data?.totalCommission ?? 0} টাকা`,
      label: 'মোট কমিশন',
      bgColor: '#248AEF',
      fontSize: 24,
    },
    {
      id: 3,
      amount: `${overview?.data?.totalProduct ?? 0} টি`,
      label: 'মোট পণ্য',
      bgColor: '#248AEF',
      fontSize: 24,
    },
  ];

  const secondRowStats = [
    {
      id: 1,
      amount: `${statsData?.earning ?? 0} টাকা`,
      label: sort === 'day' ? 'আজকের আয়' : sort === 'month' ? 'মাসিক আয়' : 'বার্ষিক আয়',
      bgColor: '#4CAF50',
      fontSize: 18,
    },
    {
      id: 2,
      amount: `${statsData?.sells ?? 0} টাকা`,
      label: sort === 'day' ? 'আজকের বিক্রি' : sort === 'month' ? 'মাসিক বিক্রি' : 'বার্ষিক বিক্রি',
      bgColor: '#FF6B6B',
      fontSize: 18,
    },
    {
      id: 3,
      amount: `${statsData?.due ?? 0} টাকা`,
      label: sort === 'day' ? 'আজকের বাকি' : sort === 'month' ? 'মাসিক বাকি' : 'বার্ষিক বাকি',
      bgColor: '#430adf',
      fontSize: 18,
    },
  ];

  const walletItems = [
    { id: 1, icon: 'wallet-plus', label: 'ব্যালেন্স যোগ ', color: '#248AEF' },
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
     { id: 6, icon: 'qrcode', label: 'পিন পরিবর্তন', color: '#4D96FF' },
  ];

  const handleWalletItemPress = (item: any) => {
    if (item.label === 'ব্যালেন্স যোগ ') {
      router.push('/(app)/wallet/add-balance');
    } else if (item.label === 'ক্যাশ আউট') {
      router.push('/(app)/wallet/cash-out');
    } else if (item.label === 'রিচার্জ') {
      router.push('/(app)/recharge/enter-number');
    } else if (item.label === 'পিন পরিবর্তন') {
      router.push('/(app)/change-password');
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
    }  else if (item.label === 'গ্রাহক তালিকা') {
      router.push('/(app)/sales/customer-list');
    } else if (item.label === 'বিক্রির খাতা') {
      router.push('/(app)/sales/history');
    } else if (item.label === 'পণ্য ব্যবস্থাপনা') {
      router.push('/(app)/sales/product-list');
    }else if (item.label === 'পিন পরিবর্তন') {
      router.push('/(app)/change-password');
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
        <StatsSection
          firstRowStats={firstRowStats}
          secondRowStats={secondRowStats}
          sort={sort}
          onSortChange={setSort}
        />

        <BannerSection />

        <WalletSection items={walletItems} onItemPress={handleWalletItemPress} />

        <TollKhataSection items={tollKhataItems} onItemPress={handleTollKhataItemPress} />
      </ScrollView>

      <FloatingActionButton onPress={handleFabPress} />
      
      <LiveChatModal visible={isChatVisible} onClose={() => setIsChatVisible(false)} />
    </ThemedView>
  );
}
