import { useGetSalesQuery } from '@/api/saleApi';
import Pagination from '@/components/pagination';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

export default function SaleHistory() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch sales from API
  const { data, isLoading, isError, refetch, isFetching } = useGetSalesQuery({ page, limit });
  const sales = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  const handleBackPress = () => router.back();

  // Swipe-to-refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Pagination handler for FlatList
  const handleEndReached = () => {
    if (!isLoading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Sale card renderer
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={[styles.card, { backgroundColor: bg }]}> 
        <View style={styles.cardRow}>
          <View style={{ flex: 1, gap: 6 }}>
            <ThemedText style={styles.nameText}>সেল আইডি: {item.id}</ThemedText>
            <ThemedText style={styles.metaText}>তারিখ: {new Date(item.createdAt).toLocaleString('bn-BD')}</ThemedText>
            <ThemedText style={styles.metaText}>সাবটোটাল: {item.subtotal} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>ডিসকাউন্ট: {item.discount} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>মোট: {item.total} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>পরিশোধ: {item.paid} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>বাকি: {item.due} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>পণ্য সংখ্যা: {item.salesItems?.length || 0}</ThemedText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="বিক্রির ইতিহাস"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <View style={styles.content}>
        {/* Sale List with FlatList */}
        <FlatList
          data={sales}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, marginTop: 14, paddingBottom: 40 }}
          ListEmptyComponent={<ThemedText style={{ textAlign: 'center', marginVertical: 29 }}>কোনো বিক্রির তথ্য পাওয়া যায়নি।</ThemedText>}
          ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={tint} style={{ marginVertical: 24 }} /> : null}
          refreshing={refreshing || isFetching}
          onRefresh={handleRefresh}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          onScrollEndDrag={handleEndReached}
          onMomentumScrollEnd={handleEndReached}
          showsVerticalScrollIndicator={false}
        />

        {/* Pagination (optional, if you want manual page control) */}
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        <View style={{ height: 24 }} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    borderWidth: 1,
    marginBottom: 8,
    borderColor: '#E3E7ED',
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#4B5563',
  },
});