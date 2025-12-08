import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type OrderItemRowProps = {
  itemName: string;
  quantity: number;
  price: string;
  onDelete?: () => void;
};

export default function OrderItemRow({ itemName, quantity, price, onDelete }: OrderItemRowProps) {
  const tint = useThemeColor({}, 'tint');

  return (
    <View style={styles.row}>
      <ThemedText style={styles.itemName}>{itemName}</ThemedText>
      <ThemedText style={styles.quantity}>{quantity}</ThemedText>
      <ThemedText style={styles.price}>{price}</ThemedText>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <MaterialCommunityIcons name="delete-outline" size={18} color={tint} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8ED',
  },
  itemName: {
    flex: 2,
    fontSize: 13,
  },
  quantity: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
  },
  price: {
    flex: 1,
    fontSize: 13,
    textAlign: 'right',
  },
  deleteBtn: {
    marginLeft: 12,
    padding: 4,
  },
});
