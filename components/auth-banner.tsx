import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

export type AuthBannerProps = {
  iconName?: string;
  size?: number;
  tintColor?: string;
  /** optional image to render inside the circular top box */
  imageSource?: ImageSourcePropType;
  /** show back button (default true) */
  showBack?: boolean;
};

export default function AuthBanner({
  iconName = 'circle-user',
  size = 40,
  tintColor,
  imageSource,
  showBack = true,
}: AuthBannerProps) {
  const tint = tintColor ?? useThemeColor({}, 'tint');
  const router = useRouter();

  return (
    <View>
      <View style={[styles.header, { backgroundColor: tint }]} />

      {showBack && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Back"
        >
          <Ionicons name="arrow-back" size={20} color={tint} />
        </TouchableOpacity>
      )}

      <View style={styles.topBox}>
        {imageSource ? (
          <Image source={imageSource} style={styles.topImage} resizeMode="contain" />
        ) : (
          <FontAwesome6 name={iconName as any} size={size} color={tint} />
        )}
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
  backBtn: {
    position: 'absolute',
    left: 12,
    top: 50,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 20,
  },
  topBox: {
    height: 120,
    width: 120,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: { height: 8, width: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    backgroundColor: '#fff',
    elevation: 6,
    position: 'absolute',
    top: 80,
    left: '50%',
    transform: [{ translateX: -60 }],
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    height: 56,
    width: 56,
  },
});
