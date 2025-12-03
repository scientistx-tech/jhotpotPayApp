import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export type AuthBannerProps = {
  iconName?: string;
  size?: number;
  tintColor?: string;
};

export default function AuthBanner({ iconName = 'circle-user', size = 40, tintColor }: AuthBannerProps) {
  const tint = tintColor ?? useThemeColor({}, 'tint');

  return (
    <View>
      <View style={[styles.header, { backgroundColor: tint }]} />

      <View style={styles.topBox}>
        <FontAwesome6 name={iconName as any} size={size} color={tint} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  topBox: {
    height: 120,
    width: 120,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: { height: 8, width: 8 },
    shadowOpacity: 6,
    shadowRadius: 10,
    backgroundColor: '#fff',
    elevation: 6,
    position: 'absolute',
    top: 80,
    left: '50%',
    transform: [{ translateX: -60 }],
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
