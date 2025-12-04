import { ThemedText } from '@/components/themed-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type TollKhataItem = {
  id: number;
  icon: string;
  label: string;
  color: string;
};

type Props = {
  items: TollKhataItem[];
  onItemPress?: (item: TollKhataItem) => void;
};

export default function TollKhataSection({ items, onItemPress }: Props) {
  return (
    <View style={styles.section}>
      <ThemedText type="title" style={{ fontSize: 18, marginBottom: 16 }}>
        Toll Khata Section
      </ThemedText>
      <View style={styles.gridContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridItem}
            onPress={() => onItemPress?.(item)}
          >
            <View style={[styles.iconCircle, { backgroundColor: `${item.color}20` }]}>
              <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
            </View>
            <ThemedText style={{ fontSize: 12, marginTop: 8, textAlign: 'center' }}>
              {item.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    paddingVertical: 12,
  },
  gridItem: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
