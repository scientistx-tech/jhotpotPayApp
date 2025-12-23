import { ThemedText } from '@/components/themed-text';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface SelectDropdownProps {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  style?: any;
}

export default function SelectDropdown({
  label,
  value,
  options,
  placeholder,
  onSelect,
  isOpen,
  setOpen,
  style,
}: SelectDropdownProps) {
  return (
    <View style={[styles.selectGroup, style]}>
      <ThemedText style={styles.selectLabel}>{label}</ThemedText>
      <TouchableOpacity
        style={[styles.selectBox, isOpen && { borderColor: '#248AEF' }]}
        onPress={() => setOpen(!isOpen)}
        activeOpacity={0.8}
      >
        <ThemedText style={[styles.selectText, !value && { color: '#9AA1B0' }]}> {value || placeholder} </ThemedText>
        <ThemedText style={styles.chevron}>{isOpen ? '▲' : '▼'}</ThemedText>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownMenu}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownOption}
              onPress={() => {
                onSelect(option);
                setOpen(false);
              }}
            >
              <ThemedText style={styles.dropdownText}>{option}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectGroup: { marginVertical: 6 },
  selectLabel: { fontSize: 13, fontWeight: '600', color: '#11181C', marginBottom: 8 },
  selectBox: {
    borderWidth: 1,
    borderRadius: 22,
    borderColor: '#248AEF',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: { fontSize: 14, color: '#11181C' },
  chevron: { fontSize: 14, color: '#4B5563' },
  dropdownMenu: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8ED',
  },
  dropdownText: { fontSize: 14, color: '#11181C' },
});
