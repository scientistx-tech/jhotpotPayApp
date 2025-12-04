import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

export type HeaderBarProps = {
  variant?: 'home' | 'buy' | 'sell' | string;
  userName?: string;
  onProfilePress?: () => void;
  onBellPress?: () => void;
  onMorePress?: () => void;
};

export default function HeaderBar({
  variant = 'home',
  userName = 'User',
  onProfilePress,
  onBellPress,
  onMorePress,
}: HeaderBarProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.profileWrapper} onPress={onProfilePress}>
          <Image source={require('@/assets/images/icon.png')} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.userBlock}>
          <ThemedText type="defaultSemiBold">{userName}</ThemedText>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: tint }]}>Top for Balance</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconBtn} onPress={onBellPress}>
            <Ionicons name="notifications-outline" size={20} color={tint} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={onMorePress}>
            <Ionicons name="ellipsis-vertical" size={20} color={tint} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileWrapper: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  avatar: { height: 34, width: 34, borderRadius: 8 },
  userBlock: { flex: 1, marginLeft: 6 },
  badge: { marginTop: 6, backgroundColor: '#eef6ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12 },
  actions: { flexDirection: 'row', gap: 8 },
  iconBtn: { marginLeft: 10, height: 36, width: 36, borderRadius: 18, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 4 },
});
