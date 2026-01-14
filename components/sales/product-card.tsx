import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export type ProductCardProps = {
  productName: string;
  price: string;
  imageUrl?: string;
  onFavoritePress?: () => void;
};

export default function ProductCard({
  productName,
  price,
  imageUrl,
  onFavoritePress,
}: ProductCardProps) {
  const tint = useThemeColor({}, 'tint');

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: '#E5E8ED' }]}>
            <MaterialCommunityIcons name="image-outline" size={40} color="#999" />
          </View>
        )}
        <TouchableOpacity
          style={[styles.favoriteBtn, { backgroundColor: 'rgba(255,255,255,0.9)' }]}
          onPress={onFavoritePress}
        >
          <MaterialCommunityIcons name="cart-plus" size={20} color={tint} />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <ThemedText style={styles.productName}>{productName}</ThemedText>
        <ThemedText style={[styles.price, { color: tint }]}>{price}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 110,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: 8,
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 11,
    fontWeight: '700',
  },
});
