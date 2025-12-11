import CustomButton from '@/components/custom-button';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type Product = {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: string;
  image?: string;
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Product - 01',
    category: 'Category: Electronics',
    stock: 50,
    price: 'Price: 5,000 BDT',
    image: 'https://images.unsplash.com/photo-1542293787938-4d273c54e3e9?auto=format&fit=crop&w=80&q=60',
  },
  {
    id: '2',
    name: 'Product - 02',
    category: 'Category: Accessories',
    stock: 30,
    price: 'Price: 2,500 BDT',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=80&q=60',
  },
  {
    id: '3',
    name: 'Product - 03',
    category: 'Category: Home',
    stock: 20,
    price: 'Price: 3,000 BDT',
  },
];

export default function ProductList() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const handleBackPress = () => router.back();

  const handleAddProduct = () => {
    router.push('/(app)/sales/product-management');
  };

  const handleEditProduct = (product: Product) => {
    console.log('Edit product:', product.name);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <View style={styles.cardRow}>
        <Image
          source={{ uri: item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=80&q=60' }}
          style={styles.productImage}
        />
        <View style={{ flex: 1 }}>
          <ThemedText style={styles.nameText}>{item.name}</ThemedText>
          <ThemedText style={styles.metaText}>{item.category}</ThemedText>
          <ThemedText style={styles.metaText}>Stock: {item.stock}</ThemedText>
          <ThemedText style={styles.metaText}>{item.price}</ThemedText>
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

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 12, marginTop: 14 }}
        />

        <View style={{ height: 24 }} />
      </ScrollView>

      <View style={styles.bottomAction}>
        <CustomButton title="Done" onPress={() => router.back()} />
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
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
    gap: 12,
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
