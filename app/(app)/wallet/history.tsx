import { useState } from 'react';

import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';

import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { useGetCreditsQuery } from '@/api/balanceApi';
import Pagination from '@/components/pagination';

export default function WalletHistory() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [userId, setUserId] = useState('');
  const { data, isLoading, isError, refetch, isFetching } = useGetCreditsQuery({ page, limit, transactionId, userId });
  const credits = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const handleBackPress = () => router.back();

  // Render each credit item
  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.card, { backgroundColor: bg }]}> 
      <View style={styles.cardContent}>
        {/* Avatar: Use first letter of bank_name */}
        <View style={[styles.avatar, { backgroundColor: '#E8F4F8' }]}> 
          <ThemedText style={[styles.avatarText, { color: '#248AEF' }]}> 
            {item.bank_name?.[0] || 'B'}
          </ThemedText>
        </View>
        {/* Details */}
        <View style={styles.details}>
          <ThemedText style={styles.title}>{item.bank_name} ({item.status})</ThemedText>
          <ThemedText style={styles.description}>
            Account: {item.account_number}{"\n"}Txn: {item.transaction_id}
          </ThemedText>
        </View>
        {/* Amount and Date */}
        <View style={styles.rightSection}>
          <ThemedText style={[styles.amount, { color: tint }]}>BDT {item.amount}</ThemedText>
          <ThemedText style={styles.dateTime}>{new Date(item.createdAt).toLocaleString()}</ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Transaction History"
        showBack={true}
        onBackPress={handleBackPress}
      />

      {/* Search Fields */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Transaction ID"
          value={transactionId}
          onChangeText={text => {
            setTransactionId(text);
            setPage(1);
          }}
          returnKeyType="search"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by User ID"
          value={userId}
          onChangeText={text => {
            setUserId(text);
            setPage(1);
          }}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            setTransactionId('');
            setUserId('');
            setPage(1);
          }}
        >
          <ThemedText style={styles.clearBtnText}>Clear</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={credits}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing || isFetching}
        onRefresh={async () => {
          setRefreshing(true);
          await refetch();
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
              No wallet credit history found.
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
