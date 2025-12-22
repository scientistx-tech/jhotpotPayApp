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
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function ProductList() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');


  // Pagination and search state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');

  // Delete modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  // Fetch products from API
  const { data, isLoading, isError, refetch } = useGetProductsQuery({ page, limit, search });
  const products = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  // Delete mutation
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleBackPress = () => router.back();

  const handleAddProduct = () => {
    router.push('/(app)/sales/product-add');
  };

  const handleEditProduct = (product: Product) => {
    console.log('Edit product:', product.name);
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

  const renderItem = ({ item }: { item: any }) => {
    const images = item.images && item.images.length > 0 ? item.images : [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=80&q=60',
    ];
    const currentIndex = imageIndexes.current[item.id] || 0;
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
            <ThemedText style={styles.metaText}>Unit: {item.unit}</ThemedText>
            <ThemedText style={styles.metaText}>Stock: {item.stock}</ThemedText>
            <ThemedText style={styles.metaText}>Price: {item.price} BDT</ThemedText>
          </View>
          <View style={styles.actions}>
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
        title="Product List"
        showBack={true}
        onBackPress={handleBackPress}
      />


      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <CustomButton title="Add New Product" onPress={handleAddProduct} />

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={search}
            onChangeText={text => {
              setSearch(text);
              setPage(1);
            }}
            returnKeyType="search"
          />
        </View>

        {/* Loading/Error State */}
        {isLoading ? (
          <ActivityIndicator size="large" color={tint} style={{ marginVertical: 24 }} />
        ) : isError ? (
          <Text style={{ color: 'red', marginVertical: 24 }}>Failed to load products.</Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 12, marginTop: 14 }}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 24 }}>No products found.</Text>}
          />
        )}


        {/* Pagination */}
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
          message={isDeleting ? 'Deleting product...' : 'Are you sure you want to delete this product?'}
        />
      </ScrollView>
{/* 
      <View style={styles.bottomAction}>
        <CustomButton title="Done" onPress={() => router.back()} />
      </View> */}
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
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
    gap: 12,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 4,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  card: {
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
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
