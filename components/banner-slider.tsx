import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BannerSlider() {
  const tint = useThemeColor({}, 'tint');
  return (
    <View style={[styles.banner, { backgroundColor: tint }] }>
      <Text style={styles.text}>BANNER SLIDER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
  },
  text: { color: '#fff', fontSize: 22, fontWeight: '700' },
});
