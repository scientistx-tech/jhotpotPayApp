import { useGetBannersQuery } from '@/api/bannerApi';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

type Props = {
  backgroundColor?: string;
};

export default function BannerSection({ backgroundColor }: Props) {
  const tint = backgroundColor ?? useThemeColor({}, 'tint');
  const { width } = useWindowDimensions();
  const slideWidth = width - 40; // account for horizontal padding
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, error } = useGetBannersQuery();
  const banners = data?.data || [];

  useEffect(() => {
    if (!banners.length) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % banners.length;
        scrollRef.current?.scrollTo({ x: next * slideWidth, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length, slideWidth]);

  if (isLoading) {
    return (
      <View style={[styles.bannerContainer, { alignItems: 'center', justifyContent: 'center', height: 135 }]}> 
        <ActivityIndicator size="large" color={tint} />
      </View>
    );
  }

  if (error || !banners.length) {
    return null;
  }

  return (
    <View style={styles.bannerContainer}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{ columnGap: 10 }}
        style={{ flexGrow: 0 }}
      >
        {banners.map((banner) => (
          <View key={banner.id} style={[styles.banner, { backgroundColor: tint, width: slideWidth, padding: 0 }]}> 
            <Image
              source={{ uri: banner.imageUrl }}
              style={{ width: '100%', height: '100%', borderRadius: 16, resizeMode: 'cover' }}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {banners.map((banner, idx) => (
          <View
            key={banner.id}
            style={[
              styles.dot,
              { opacity: idx === currentIndex ? 1 : 0.3, width: idx === currentIndex ? 18 : 8 },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    paddingHorizontal: 10,
    marginTop: 30,
  },
  banner: {
    height: 135,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#11181C',
  },
});
