import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type RechargeType = 'prepaid' | 'postpaid' | 'skitto';

export type TypeSelectorProps = {
  selectedType: RechargeType;
  onTypeChange: (type: RechargeType) => void;
};

export default function TypeSelector({ selectedType, onTypeChange }: TypeSelectorProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const types: { id: RechargeType; label: string }[] = [
    { id: 'prepaid', label: 'Prepaid' },
    { id: 'postpaid', label: 'Postpaid' },
    { id: 'skitto', label: 'Skitto' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.selectorGroup}>
        {types.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={styles.radioContainer}
            onPress={() => onTypeChange(type.id)}
          >
            <View style={[styles.radio, { borderColor: tint }]}>
              {selectedType === type.id && (
                <View style={[styles.radioDot, { backgroundColor: tint }]} />
              )}
            </View>
            <ThemedText style={styles.label}>{type.label}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectorGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
