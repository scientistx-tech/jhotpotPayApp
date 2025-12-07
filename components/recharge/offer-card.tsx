import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type OfferCardProps = {
  duration: string;
  validity: string;
  price: string;
  isNew?: boolean;
  onPress?: () => void;
};

export default function OfferCard({ duration, validity, price, isNew, onPress }: OfferCardProps) {
  const tint = useThemeColor({}, 'tint');

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: '#fff' }]}>
      <View style={styles.leftContent}>
        <View style={[styles.iconCircle, { backgroundColor: `${tint}20` }]}>
          <MaterialCommunityIcons name="wifi" size={18} color={tint} />
        </View>
        <View style={styles.textContent}>
          <ThemedText type="defaultSemiBold" style={styles.duration}>
            {duration}
          </ThemedText>
          <View style={styles.validityRow}>
            <MaterialCommunityIcons name="calendar" size={12} color="#999" />
            <ThemedText style={styles.validity}>{validity}</ThemedText>
          </View>
        </View>
      </View>

      {isNew && (
        <View style={[styles.newBadge, { backgroundColor: `${tint}20` }]}>
          <ThemedText style={[styles.newBadgeText, { color: tint }]}>New Offer</ThemedText>
        </View>
      )}

      <ThemedText type="defaultSemiBold" style={[styles.price, { color: tint }]}>
        {price}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    gap: 4,
  },
  duration: {
    fontSize: 13,
  },
  validityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  validity: {
    fontSize: 11,
    opacity: 0.7,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
  },
});
