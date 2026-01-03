import { useDeleteProductMutation, useGetProductsQuery } from '@/api/productApi';
import CustomButton from '@/components/custom-button';
import Pagination from '@/components/pagination';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ConfirmModal from '@/components/ui/confirm-modal';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Product } from '@/store/slices/productSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function ProductList() {
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
  const { data, isLoading, isError, refetch, isFetching } = useGetProductsQuery({ page, limit, search });
  const products = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  // Delete mutation
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Track toggling state for each product
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [toggleStates, setToggleStates] = useState<{ [id: string]: boolean }>({});

  const handleBackPress = () => router.back();

  const handleAddProduct = () => {
    router.push('/(app)/sales/product-add');
  };

  const handleEditProduct = (product: Product) => {
    router.push({
      pathname: '/(app)/sales/product-edit',
      params: { id: product.id },
    });
  };

  const handleViewProduct = (product: Product) => {
    router.push({
      pathname: '/(app)/sales/product-detail',
      params: { id: product.id },
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setDeleteId(productId);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct({ id: deleteId }).unwrap();
      setConfirmVisible(false);
      setDeleteId(null);
      refetch();
    } catch (e) {
      // Optionally show error
      setConfirmVisible(false);
      setDeleteId(null);
    }
  };


  // Image slider state for each product
  const imageIndexes = useRef<{ [id: string]: number }>({});
  const [, forceUpdate] = useState(0); // to trigger re-render

  useEffect(() => {
    const interval = setInterval(() => {
      products.forEach((item: any) => {
        const images = item.images && item.images.length > 0 ? item.images : [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=80&q=60',
        ];
        if (images.length > 1) {
          if (typeof imageIndexes.current[item.id] !== 'number') imageIndexes.current[item.id] = 0;
          imageIndexes.current[item.id] = (imageIndexes.current[item.id] + 1) % images.length;
        } else {
          imageIndexes.current[item.id] = 0;
        }
      });
      forceUpdate((n) => n + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [products]);

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
    const images = item.images && item.images.length > 0 ? item.images : [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=80&q=60',
    ];
    const currentIndex = imageIndexes.current[item.id] || 0;
    // Use local toggle state if available, else from item
    const isStock = typeof toggleStates[item.id] === 'boolean' ? toggleStates[item.id] : item.isStock;

    const handleToggleStock = async () => {
      setTogglingId(item.id);
      try {
        const res = await fetch(
          `http://api.jhotpotpay.com/api/v1/product/toggle-stock-product/${item.id}`,
          {
            method: 'GET',
            headers: {
              'Authorization': '',
            },
          }
        );
        const data = await res.json();
        if (data?.success && data?.data) {
          console.log(data)
          setToggleStates((prev) => ({ ...prev, [item.id]: data.data.isStock }));
        }
      } catch (e) {}
      setTogglingId(null);
    };

    return (
      <View style={[styles.card, { backgroundColor: bg }]}> 
        <View style={styles.cardRow}>
          <View style={styles.sliderContainer}>
            <Image
              source={{ uri: images[currentIndex] }}
              style={styles.productImage}
            />
            {images.length > 1 && (
                <View style={styles.sliderDots}>
                {images.map((_: string, idx: number) => (
                  <View
                  key={idx}
                  style={[styles.dot, currentIndex === idx && styles.activeDot]}
                  />
                ))}
                </View>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.nameText}>{item.name}</ThemedText>
            <ThemedText style={styles.metaText}>একক: {item.unit}</ThemedText>
            <ThemedText style={styles.metaText}>স্টক: {item.stock}</ThemedText>
            <ThemedText style={styles.metaText}>মূল্য: {item.price} টাকা</ThemedText>
            <View style={{ marginTop: 10, alignItems: 'flex-start' }}>
              <TouchableOpacity
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 7,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    backgroundColor: isStock ? '#E8F9F1' : '#FFF1F3',
                    borderWidth: 1.5,
                    borderColor: isStock ? '#12B76A' : '#F04438',
                    shadowColor: isStock ? '#12B76A' : '#F04438',
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 2,
                  },
                ]}
                onPress={handleToggleStock}
                disabled={togglingId === item.id}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name={isStock ? 'check-circle' : 'close-circle'}
                  size={22}
                  color={isStock ? '#12B76A' : '#F04438'}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: isStock ? '#12B76A' : '#F04438',
                    fontWeight: '700',
                    fontSize: 15,
                    letterSpacing: 0.2,
                  }}
                >
                  {togglingId === item.id ? 'Updating...' : isStock ? 'Stock In' : 'Stock Out'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: '#E3F6FF' }]}
              onPress={() => handleViewProduct(item)}
            >
              <MaterialCommunityIcons name="eye-outline" size={18} color={tint} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: `${tint}15` }]}
              onPress={() => handleEditProduct(item)}
            >
              <MaterialCommunityIcons name="square-edit-outline" size={18} color={tint} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: '#E8F0FE' }]}
              onPress={() => handleDeleteProduct(item.id)}
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
        title="পণ্যের তালিকা"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <View style={styles.content}>
        <CustomButton title="নতুন পণ্য যোগ করুন" onPress={handleAddProduct} />

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="পণ্য অনুসন্ধান করুন..."
            value={search}
            onChangeText={text => {
              setSearch(text);
              setPage(1);
            }}
            returnKeyType="search"
          />
        </View>

        {/* Product List with FlatList */}
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, marginTop: 14, paddingBottom: 40 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 29 }}>কোনো পণ্য পাওয়া যায়নি।</Text>}
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
          message={isDeleting ? 'পণ্য মুছে ফেলা হচ্ছে...' : 'আপনি কি নিশ্চিতভাবে এই পণ্যটি মুছে ফেলতে চান?'}
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
    flexDirection: 'row',
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
