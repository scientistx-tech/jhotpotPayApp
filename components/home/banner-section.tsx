import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

type Props = {
  backgroundColor?: string;
};

export default function BannerSection({ backgroundColor }: Props) {
  const tint = backgroundColor ?? useThemeColor({}, 'tint');
  const { width } = useWindowDimensions();
  const slideWidth = width - 40; // account for horizontal padding
  const slides = [
    { id: '1', title: 'Instant Recharge', color: tint },
    { id: '2', title: 'Earn Commission', color: '#4CAF50' },
    { id: '3', title: 'Pay Bills Fast', color: '#FFB74D' },
  ];

  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % slides.length;
        scrollRef.current?.scrollTo({ x: next * slideWidth, animated: true });
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length, slideWidth]);

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
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.banner, { backgroundColor: slide.color, width: slideWidth }]}>
            <ThemedText style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
              {slide.title}
            </ThemedText>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {slides.map((slide, idx) => (
          <View
            key={slide.id}
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
