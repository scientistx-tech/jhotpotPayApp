import { useState } from 'react';

import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { RootState } from '@/store/store';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

import { useGetCreditsQuery, useGetDebitsQuery } from '@/api/balanceApi';
import { useGetRechargesQuery } from '@/api/rechargeApi';
import Pagination from '@/components/pagination';

export default function WalletHistory() {
  const [page, setPage] = useState(1);
  const user = useSelector((state: RootState) => state.auth.user);
  const [limit] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [search, setSearch] = useState('');
  const [historyType, setHistoryType] = useState<'recharge' | 'credit' | 'debit'>('recharge');

  // Queries
  const {
    data: rechargeData,
    isLoading: rechargeLoading,
    refetch: rechargeRefetch,
    isFetching: rechargeFetching,
  } = useGetRechargesQuery({ page, limit, search });

  const {
    data: creditData,
    isLoading: creditLoading,
    refetch: creditRefetch,
    isFetching: creditFetching,
  } = useGetCreditsQuery({ page, limit, transactionId, userId: user?.id || '' });

  const {
    data: debitData,
    isLoading: debitLoading,
    refetch: debitRefetch,
    isFetching: debitFetching,
  } = useGetDebitsQuery({ page, limit, search });

  // Data selection
  let items: any[] = [];
  let totalPages = 1;
  let isLoading = false;
  let isFetching = false;
  let refetchFn = () => {};
  let emptyText = '';

  if (historyType === 'recharge') {
    items = rechargeData?.data || [];
    totalPages = rechargeData?.meta?.totalPages || 1;
    isLoading = rechargeLoading;
    isFetching = rechargeFetching;
    refetchFn = rechargeRefetch;
    emptyText = 'কোনো রিচার্জ ইতিহাস পাওয়া যায়নি।';
  } else if (historyType === 'credit') {
    items = creditData?.data || [];
    totalPages = creditData?.meta?.totalPages || 1;
    isLoading = creditLoading;
    isFetching = creditFetching;
    refetchFn = creditRefetch;
    emptyText = 'কোনো জমা ইতিহাস পাওয়া যায়নি।';
  } else {
    items = debitData?.data || [];
    totalPages = debitData?.meta?.totalPage || 1;
    isLoading = debitLoading;
    isFetching = debitFetching;
    refetchFn = debitRefetch;
    emptyText = 'কোনো উত্তোলন ইতিহাস পাওয়া যায়নি।';
  }

  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const handleBackPress = () => router.back();

  // Render item for each type
  const renderItem = ({ item }: { item: any }) => {
    if (historyType === 'recharge') {
      return (
        <View style={[styles.card, { backgroundColor: bg }]}> 
          <View style={styles.cardContent}>
            {/* Avatar: Use first letter of network_type */}
            <View style={[styles.avatar, { backgroundColor: '#E8F4F8' }]}> 
              <ThemedText style={[styles.avatarText, { color: '#248AEF' }]}> 
                {item.network_type?.[0] || 'R'}
              </ThemedText>
            </View>
            <View style={styles.details}>
              <ThemedText style={styles.title}>{item.network_type} ({item.status})</ThemedText>
              <ThemedText style={styles.description}>
                Phone: {item.phone}{"\n"}Offer: {item.offer?.name || 'N/A'}
              </ThemedText>
            </View>
            <View style={styles.rightSection}>
              <ThemedText style={[styles.amount, { color: tint }]}>BDT {item.amount ?? 'N/A'}</ThemedText>
              <ThemedText style={styles.dateTime}>{new Date(item.createdAt).toLocaleString()}</ThemedText>
            </View>
          </View>
        </View>
      );
    } else if (historyType === 'credit') {
      return (
        <View style={[styles.card, { backgroundColor: bg }]}> 
          <View style={styles.cardContent}>
            <View style={[styles.avatar, { backgroundColor: '#E8F4F8' }]}> 
              <ThemedText style={[styles.avatarText, { color: '#248AEF' }]}> 
                {item.bank_name?.[0] || 'B'}
              </ThemedText>
            </View>
            <View style={styles.details}>
              <ThemedText style={styles.title}>{item.bank_name} ({item.status})</ThemedText>
              <ThemedText style={styles.description}>
                Account: {item.account_number}{"\n"}Txn: {item.transaction_id}
              </ThemedText>
            </View>
            <View style={styles.rightSection}>
              <ThemedText style={[styles.amount, { color: tint }]}>BDT {item.amount}</ThemedText>
              <ThemedText style={styles.dateTime}>{new Date(item.createdAt).toLocaleString()}</ThemedText>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.card, { backgroundColor: bg }]}> 
          <View style={styles.cardContent}>
            <View style={[styles.avatar, { backgroundColor: '#E8F4F8' }]}> 
              <ThemedText style={[styles.avatarText, { color: '#248AEF' }]}> 
                {item.bank_name?.[0] || 'B'}
              </ThemedText>
            </View>
            <View style={styles.details}>
              <ThemedText style={styles.title}>{item.bank_name} ({item.status})</ThemedText>
              <ThemedText style={styles.description}>
                Account: {item.account_number}{"\n"}Txn: {item.transaction_id}
              </ThemedText>
            </View>
            <View style={styles.rightSection}>
              <ThemedText style={[styles.amount, { color: tint }]}>BDT {item.amount}</ThemedText>
              <ThemedText style={styles.dateTime}>{new Date(item.createdAt).toLocaleString()}</ThemedText>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="হিস্টোরি"
        showBack={true}
        onBackPress={handleBackPress}
      />

      {/* History Type Selector */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, paddingHorizontal: 12, marginTop: 12 }}>
        <View style={{ flex: 1 }}>
          <ThemedText
            style={{
              textAlign: 'center',
              padding: 10,
              backgroundColor: historyType === 'recharge' ? '#248AEF' : '#E3E7ED',
              color: historyType === 'recharge' ? '#fff' : '#248AEF',
              borderRadius: 8,
              fontWeight: 'bold',
            }}
            onPress={() => { setHistoryType('recharge'); setPage(1); }}
          >রিচার্জ</ThemedText>
        </View>
        <View style={{ flex: 1 }}>
          <ThemedText
            style={{
              textAlign: 'center',
              padding: 10,
              backgroundColor: historyType === 'credit' ? '#248AEF' : '#E3E7ED',
              color: historyType === 'credit' ? '#fff' : '#248AEF',
              borderRadius: 8,
              fontWeight: 'bold',
            }}
            onPress={() => { setHistoryType('credit'); setPage(1); }}
          >জমা</ThemedText>
        </View>
        <View style={{ flex: 1 }}>
          <ThemedText
            style={{
              textAlign: 'center',
              padding: 10,
              backgroundColor: historyType === 'debit' ? '#248AEF' : '#E3E7ED',
              color: historyType === 'debit' ? '#fff' : '#248AEF',
              borderRadius: 8,
              fontWeight: 'bold',
            }}
            onPress={() => { setHistoryType('debit'); setPage(1); }}
          >উত্তোলন</ThemedText>
        </View>
      </View>

      {/* Search Fields */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={historyType === 'recharge' ? 'ফোন নম্বর/অফার দিয়ে অনুসন্ধান করুন' : 'লেনদেন আইডি/ব্যাংক দিয়ে অনুসন্ধান করুন'}
          value={historyType === 'credit' ? transactionId : search}
          onChangeText={text => {
            if (historyType === 'credit') {
              setTransactionId(text);
            } else {
              setSearch(text);
            }
            setPage(1);
          }}
          returnKeyType="search"
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing || isFetching}
        onRefresh={async () => {
          setRefreshing(true);
          await refetchFn();
          setRefreshing(false);
        }}
        onEndReached={() => {
          if (!isLoading && page < totalPages) setPage((prev) => prev + 1);
        }}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={
          isLoading ? (
            <View style={{ marginVertical: 24 }}><ThemedText>Loading...</ThemedText></View>
          ) : (
            <ThemedText style={{ textAlign: 'center', marginVertical: 29 }}>
              {emptyText}
            </ThemedText>
          )
        }
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <View style={styles.paginationContainer}>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </View>
      )}

      <View style={{ height: 24 }} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  searchContainer: {
    paddingHorizontal: 16,
    
    paddingTop: 16,
    marginTop: 8,
    paddingBottom: 8,
    backgroundColor: '#f5f7fb',
    gap: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#248AEF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    height: 48,
  },
  clearBtn: {
    alignSelf: 'flex-end',
    marginTop: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E3E7ED',
    borderRadius: 8,
  },
  clearBtnText: {
    color: '#248AEF',
    fontWeight: '600',
    fontSize: 13,
  },
  paginationContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 20,
    gap: 12,
  },
  card: {
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    opacity: 0.6,
    lineHeight: 16,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
    fontSize: 13,
    fontWeight: '600',
  },
  dateTime: {
    fontSize: 11,
    opacity: 0.6,
  },
});
