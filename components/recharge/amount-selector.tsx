import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export type AmountCategory = 'amount' | 'internet' | 'minute' | 'bundle' | 'call-rate';

export type AmountOption = {
  id: string;
  label: string;
  price: string;
  duration?: string;
  isNew?: boolean;
};

export type AmountSelectorProps = {
  selectedCategory: AmountCategory;
  onCategoryChange: (category: AmountCategory) => void;
  selectedAmount?: string;
  onAmountSelect: (amount: AmountOption) => void;
  amounts: AmountOption[];
};

export default function AmountSelector({
  selectedCategory,
  onCategoryChange,
  selectedAmount,
  onAmountSelect,
  amounts,
}: AmountSelectorProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const categories: { id: AmountCategory; label: string }[] = [
    { id: 'amount', label: 'Amount' },
    { id: 'internet', label: 'Internet' },
    { id: 'minute', label: 'Minute' },
    { id: 'bundle', label: 'Bundle' },
    { id: 'call-rate', label: 'Call Rate' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => onCategoryChange(category.id)}
            style={[
              styles.categoryBtn,
              selectedCategory === category.id && { borderBottomColor: tint, borderBottomWidth: 2 },
            ]}
          >
            <ThemedText
              style={[
                styles.categoryLabel,
                selectedCategory === category.id && { color: tint, fontWeight: '600' },
              ]}
            >
              {category.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Amount Grid */}
      <View style={styles.amountGrid}>
        {amounts.map((amount) => (
          <TouchableOpacity
            key={amount.id}
            onPress={() => onAmountSelect(amount)}
            style={[
              styles.amountCard,
              selectedAmount === amount.id && { borderColor: tint, borderWidth: 2 },
              { backgroundColor: selectedAmount === amount.id ? `${tint}10` : '#fff' },
            ]}
          >
            {amount.isNew && (
              <View style={[styles.badge, { backgroundColor: tint }]}>
                <ThemedText style={styles.badgeText}>New</ThemedText>
              </View>
            )}
            <View style={styles.amountCardContent}>
              <ThemedText style={styles.amountPrice}>{amount.price}</ThemedText>
              {amount.duration && (
                <ThemedText style={styles.amountDuration}>{amount.duration}</ThemedText>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoriesContent: {
    gap: 20,
  },
  categoryBtn: {
    paddingBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  amountCard: {
    width: '31%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',
  },
  amountCardContent: {
    alignItems: 'center',
  },
  amountPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  amountDuration: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
});
