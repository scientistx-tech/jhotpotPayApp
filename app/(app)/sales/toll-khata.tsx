import { useGetUserSalesQuery } from '@/api/saleApi';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TollKhata() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const [refreshing, setRefreshing] = useState(false);

  // Fetch user sales from API
  const { data, isLoading, isError, refetch, isFetching } = useGetUserSalesQuery();

  const handleBackPress = () => router.back();

  // Swipe-to-refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Navigate to customer sales detail
  const handleCustomerPress = (customer: any) => {
    router.push({
      pathname: '/(app)/sales/customer-sales',
      params: {
        customerId: customer.id,
        customerName: customer.name,
        totalSales: customer.sales.total.toString(),
        dueSales: customer.sales.due.toString(),
        paidSales: customer.sales.paid.toString(),
      },
    });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  // Customer card renderer
  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: bg }]}
        onPress={() => handleCustomerPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardRow}>
          <View style={{ flex: 1, gap: 6 }}>
            <ThemedText style={styles.nameText}>গ্রাহক: {item.name}</ThemedText>
            {item.email ? (
              <ThemedText style={styles.metaText}>ইমেইল: {item.email}</ThemedText>
            ) : null}
            <ThemedText style={styles.metaText}>ফোন: {item.phone}</ThemedText>
            {item.address ? (
              <ThemedText style={styles.metaText}>ঠিকানা: {item.address}</ThemedText>
            ) : null}
            <View style={styles.divider} />
            <ThemedText style={[styles.metaText, { fontWeight: '600', color: tint }]}>
              মোট বিক্রয়: {item.sales.total} টাকা
            </ThemedText>
            <ThemedText style={[styles.metaText, { color: '#10B981' }]}>
              পরিশোধিত: {item.sales.paid} টাকা
            </ThemedText>
            <ThemedText style={[styles.metaText, { color: '#EF4444', fontWeight: '600' }]}>
              বাকি: {item.sales.due} টাকা
            </ThemedText>
            <ThemedText style={styles.metaText}>
              তারিখ: {new Date(item.createdAt).toLocaleString('bn-BD')}
            </ThemedText>
          </View>
          <Icon name="chevron-right" size={24} color={tint} />
        </View>
      </TouchableOpacity>
    );
  };



  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="বাকি খাতা"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <View style={styles.content}>
        {/* Customer List with FlatList */}
        <FlatList
          data={data?.data || []}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, marginTop: 14, paddingBottom: 40 }}
          ListEmptyComponent={
            <ThemedText style={{ textAlign: 'center', marginVertical: 29 }}>
              কোনো গ্রাহকের তথ্য পাওয়া যায়নি।
            </ThemedText>
          }
          ListFooterComponent={
            isLoading || isFetching ? (
              <ActivityIndicator size="large" color={tint} style={{ marginVertical: 24 }} />
            ) : null
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
        />

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
  divider: {
    height: 1,
    backgroundColor: '#E5E8ED',
    marginVertical: 6,
  },
});