import { Customer, useDeleteCustomerMutation, useGetCustomersQuery } from '@/api/customerApi';
import CustomButton from '@/components/custom-button';
import Pagination from '@/components/pagination';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ConfirmModal from '@/components/ui/confirm-modal';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function CustomerList() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');



  // Pagination and search state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Delete modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);


  // Fetch products from API
  const { data, isLoading, isError, refetch, isFetching } = useGetCustomersQuery({ page, limit, search });
  const customers = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  // Delete mutation
  const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();

  const handleBackPress = () => router.back();

  const handleAddCustomer = () => {
    router.push('/(app)/sales/customer-add');
  };

  const handleEditCustomer = (customer: Customer) => {
    router.push({
      pathname: '/(app)/sales/customer-edit',
      params: { id: customer.id },
    });
  };

  const handleViewCustomer = (customer: Customer) => {
    router.push({
      pathname: '/(app)/sales/customer-detail',
      params: { id: customer.id },
    });
  };

  const handleDeleteCustomer = (customerId: string) => {
    setDeleteId(customerId);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCustomer({ id: deleteId }).unwrap();
      setConfirmVisible(false);
      setDeleteId(null);
      refetch();
    } catch (e) {
      // Optionally show error
      setConfirmVisible(false);
      setDeleteId(null);
    }
  };



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

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={[styles.card, { backgroundColor: bg }]}> 
        <View style={styles.cardRow}>
          <View style={styles.sliderContainer} />
          <View style={{ flex: 1, gap: 6 }}>
            <ThemedText style={styles.nameText}>{item.name}</ThemedText>
            <ThemedText style={styles.metaText}>ইমেইল: {item.email}</ThemedText>
            <ThemedText style={styles.metaText}>ফোন: {item.phone}</ThemedText>
            <ThemedText style={styles.metaText}>ঠিকানা: {item.address}</ThemedText>
           
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: '#E3F6FF' }]}
              onPress={() => handleViewCustomer(item)}
            >
              <MaterialCommunityIcons name="eye-outline" size={18} color={tint} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: `${tint}15` }]}
              onPress={() => handleEditCustomer(item)}
            >
              <MaterialCommunityIcons name="square-edit-outline" size={18} color={tint} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: '#E8F0FE' }]}
              onPress={() => handleDeleteCustomer(item.id)}
            >
              <MaterialCommunityIcons name="trash-can-outline" size={18} color="#1E63F0" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="কাস্টমার তালিকা"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <View style={styles.content}>
        <CustomButton title="নতুন কাস্টমার যোগ করুন" onPress={handleAddCustomer} />

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="কাস্টমার অনুসন্ধান করুন..."
            value={search}
            onChangeText={text => {
              setSearch(text);
              setPage(1);
            }}
            returnKeyType="search"
          />
        </View>

        {/* Customer List with FlatList */}
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, marginTop: 14, paddingBottom: 40 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 29 }}>কোনো কাস্টমার পাওয়া যায়নি।</Text>}
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

        {/* Confirm Delete Modal */}
        <ConfirmModal
          visible={confirmVisible}
          onClose={() => { setConfirmVisible(false); setDeleteId(null); }}
          onConfirm={handleConfirmDelete}
          message={isDeleting ? 'কাস্টমার মুছে ফেলা হচ্ছে...' : 'আপনি কি নিশ্চিতভাবে এই কাস্টমারটি মুছে ফেলতে চান?'}
        />
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
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
    gap: 12,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#248AEF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    height: 55,
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
  sliderContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    justifyContent: 'center',
    gap: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E3E7ED',
    marginHorizontal: 1,
  },
  activeDot: {
    backgroundColor: '#248AEF',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#E5E8ED',
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
  actions: {
    flexDirection: 'column',
    gap: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomAction: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 12,
  },
});
