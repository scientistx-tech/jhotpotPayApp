import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  onPress?: () => void;
  backgroundColor?: string;
};

export default function FloatingActionButton({ onPress, backgroundColor }: Props) {
  const tint = backgroundColor ?? useThemeColor({}, 'tint');

  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: tint }]}
      onPress={onPress}
      accessibilityLabel="Chat"
    >
      <FontAwesome6 name="comment" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
