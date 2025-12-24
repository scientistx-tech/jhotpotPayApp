import { useGetProductQuery } from '@/api/productApi';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const { data, isLoading } = useGetProductQuery({ id });
  const product = data?.data;

  // Image slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product?.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
  ];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 2000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length]);

  if (isLoading) {
    return (
      <View style={styles.centered}><ActivityIndicator size="large" color={tint} /></View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}><Text>পণ্য খুঁজে পাওয়া যায়নি।</Text></View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="পণ্যের বিস্তারিত"
        showBack={true}
        onBackPress={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cardShadow}>
          <View style={styles.imageCarousel}>
            <Image
              source={{ uri: images[currentIndex] }}
              style={styles.productImage}
              resizeMode="cover"
            />
            {images.length > 1 && (
              <View style={styles.sliderDots}>
                {images.map((_:string, idx:number) => (
                  <View
                    key={idx}
                    style={[styles.dot, currentIndex === idx && styles.activeDot]}
                  />
                ))}
              </View>
            )}
          </View>
          <View style={styles.infoSection}>
            <ThemedText style={styles.productName}>{product.name}</ThemedText>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>একক:</ThemedText>
              <ThemedText style={styles.metaValue}>{product.unit}</ThemedText>
            </View>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>স্টক:</ThemedText>
              <ThemedText style={styles.metaValue}>{product.stock}</ThemedText>
            </View>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>স্টক আছে:</ThemedText>
              <ThemedText style={styles.metaValue}>{product.isStock ? 'হ্যাঁ' : 'না'}</ThemedText>
            </View>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>মূল্য:</ThemedText>
              <ThemedText style={[styles.metaValue, { color: tint, fontWeight: 'bold', fontSize: 18 }]}>{product.price} টাকা</ThemedText>
            </View>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>ট্যাক্স:</ThemedText>
              <ThemedText style={styles.metaValue}>{product.tax}</ThemedText>
            </View>
            {!!product.note && (
              <View style={styles.noteBox}>
                <ThemedText style={styles.noteLabel}>নোট:</ThemedText>
                <ThemedText style={styles.noteText}>{product.note}</ThemedText>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  contentContainer: {
    padding: 18,
    alignItems: 'center',
  },
  cardShadow: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    marginTop: 10,
    paddingBottom: 24,
  },
  imageCarousel: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#f0f4fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  sliderDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E3E7ED',
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#248AEF',
  },
  productImage: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  infoSection: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaLabel: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  noteBox: {
    marginTop: 16,
    backgroundColor: '#F3F6FB',
    borderRadius: 10,
    padding: 12,
  },
  noteLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 15,
    color: '#222',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
