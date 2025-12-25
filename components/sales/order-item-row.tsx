import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export type OrderItemRowProps = {
  itemName: string;
  quantity: number;
  price: string;
  onDelete?: () => void;
  onQuantityChange?: (qty: number) => void;
};

export default function OrderItemRow({ itemName, quantity, price, onDelete, onQuantityChange }: OrderItemRowProps) {
  const tint = useThemeColor({}, 'tint');

  const handleQtyChange = (val: string) => {
    const num = parseInt(val.replace(/[^0-9]/g, '')) || 1;
    if (onQuantityChange) onQuantityChange(num);
  };

  return (
    <View style={styles.row}>
      <ThemedText style={styles.itemName}>{itemName}</ThemedText>
      <View style={styles.qtyControl}>
        <TouchableOpacity
          onPress={() => onQuantityChange && onQuantityChange(Math.max(1, quantity - 1))}
          style={styles.qtyBtn}
        >
          <MaterialCommunityIcons name="minus" size={18} color={tint} />
        </TouchableOpacity>
        <TextInput
          style={styles.qtyInput}
          value={quantity.toString()}
          keyboardType="numeric"
          onChangeText={handleQtyChange}
        />
        <TouchableOpacity
          onPress={() => onQuantityChange && onQuantityChange(quantity + 1)}
          style={styles.qtyBtn}
        >
          <MaterialCommunityIcons name="plus" size={18} color={tint} />
        </TouchableOpacity>
      </View>
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
  qtyControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  qtyBtn: {
    padding: 2,
  },
  qtyInput: {
    width: 36,
    height: 28,
    borderWidth: 1,
    borderColor: '#E5E8ED',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 13,
    marginHorizontal: 2,
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: '#222',
    backgroundColor: '#fff',
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
