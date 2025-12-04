import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  backgroundColor?: string;
};

export default function BannerSection({ backgroundColor }: Props) {
  const tint = backgroundColor ?? useThemeColor({}, 'tint');

  return (
    <View style={styles.bannerContainer}>
      <View style={[styles.banner, { backgroundColor: tint }]}>
        <ThemedText style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
          BANNER SLIDER
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  banner: {
    height: 135,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
