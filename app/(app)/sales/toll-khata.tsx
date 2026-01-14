import { useGetSalesQuery, useUpdateSaleMutation } from '@/api/saleApi';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function TollKhata() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  // Edit modal state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editSale, setEditSale] = useState<any>(null);
  const [editPaid, setEditPaid] = useState('');

  const [updateSale, { isLoading: isUpdating }] = useUpdateSaleMutation();

  // Infinite scroll state
  const [allSales, setAllSales] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch sales from API
  const { data, isLoading, isError, refetch, isFetching } = useGetSalesQuery({ page, limit, due: true });
  const totalPages = data?.meta?.totalPages || 1;

  // Infinite scroll: append new data
  React.useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllSales(data.data);
      } else {
        setAllSales((prev) => {
          // Avoid duplicates
          const ids = new Set(prev.map((s) => s.id));
          return [...prev, ...data.data.filter((s: any) => !ids.has(s.id))];
        });
      }
      setHasMore(page < totalPages);
    }
  }, [data, page]);

  const handleBackPress = () => router.back();

  // Swipe-to-refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await refetch();
    setRefreshing(false);
  };

  // Infinite scroll handler for FlatList
  const handleEndReached = () => {
    if (!isLoading && hasMore && !refreshing && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  // Edit modal handlers
  const openEditModal = (sale: any) => {
    setEditSale(sale);
    setEditPaid(sale.paid.toString());
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
    setEditSale(null);
  };
  const handleEditSave = async () => {
    if (!editSale) return;
    try {
      await updateSale({
        id: editSale.id,
        paid: Number(editPaid),
        due: editSale.total - Number(editPaid),
      }).unwrap();
      refetch();
      closeEditModal();
    } catch (e) {
      alert('Failed to update sale');
    }
  };
  useEffect(() => {
    handleRefresh()
  }, [])

  // Sale card renderer
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={[styles.card, { backgroundColor: bg }]}>
        <View style={styles.cardRow}>
          <View style={{ flex: 1, gap: 6 }}>
            <ThemedText style={styles.metaText}> গ্রাহক: {item?.customer?.name}</ThemedText>
            <ThemedText style={styles.metaText}> গ্রাহক ইমেইল: {item?.customer?.email}</ThemedText>
            <ThemedText style={styles.metaText}> গ্রাহক ফোন: {item?.customer?.phone}</ThemedText>
            <ThemedText style={styles.metaText}>তারিখ: {new Date(item.createdAt).toLocaleString('bn-BD')}</ThemedText>
            <ThemedText style={styles.metaText}>সাবটোটাল: {item.subtotal} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>ডিসকাউন্ট: {item.discount} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>মোট: {item.total} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>পরিশোধ: {item.paid} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>বাকি: {item.due} টাকা</ThemedText>
            <ThemedText style={styles.metaText}>পণ্য সংখ্যা: {item.salesItems?.length || 0}</ThemedText>
          </View>
          <TouchableOpacity onPress={() => openEditModal(item)} style={{ marginLeft: 8 }}>
            <Icon name="edit" size={22} color={tint} />
          </TouchableOpacity>
        </View>
      </View>
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
        {/* Sale List with FlatList */}
        <FlatList
          data={allSales}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, marginTop: 14, paddingBottom: 40 }}
          ListEmptyComponent={<ThemedText style={{ textAlign: 'center', marginVertical: 29 }}>কোনো বিক্রির তথ্য পাওয়া যায়নি।</ThemedText>}
          ListFooterComponent={
            (isLoading || isFetching) && hasMore ? (
              <ActivityIndicator size="large" color={tint} style={{ marginVertical: 24 }} />
            ) : null
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
        />
        {/* Pagination removed for infinite scroll UX */}

        <View style={{ height: 24 }} />
      </View>

      {/* Edit Sale Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeEditModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, width: 320 }}>
            <ThemedText style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Edit Sale Payment</ThemedText>
            <View style={{ marginBottom: 12 }}>
              <ThemedText style={{ marginBottom: 4 }}>Paid Amount</ThemedText>
              <TextInput
                style={{ borderWidth: 1, borderColor: '#E5E8ED', borderRadius: 8, padding: 10, fontSize: 15 }}
                keyboardType="numeric"
                value={editPaid}
                onChangeText={setEditPaid}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={closeEditModal} style={{ padding: 10 }}>
                <ThemedText style={{ color: '#666' }}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEditSave} style={{ backgroundColor: tint, borderRadius: 8, padding: 10 }}>
                <ThemedText style={{ color: '#fff', fontWeight: '600' }}>{isUpdating ? 'Saving...' : 'Save'}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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