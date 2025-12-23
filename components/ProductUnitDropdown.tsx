import { ThemedText } from '@/components/themed-text';
import { FlatList, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

export interface ProductUnitOption {
  label: string;
  value: string;
}

interface ProductUnitDropdownProps {
  label: string;
  value: string;
  options: ProductUnitOption[];
  placeholder: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  style?: any;
}

export default function ProductUnitDropdown({
  label,
  value,
  options,
  placeholder,
  onSelect,
  isOpen,
  setOpen,
  style,
}: ProductUnitDropdownProps) {
  const selectedLabel = options.find(o => o.value === value)?.label;
  return (
    <View style={[styles.selectGroup, style]}>
      <ThemedText style={styles.selectLabel}>{label}</ThemedText>
      <TouchableOpacity
        style={[styles.selectBox, isOpen && { borderColor: '#248AEF' }]}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <ThemedText style={[styles.selectText, !value && { color: '#9AA1B0' }]}> {selectedLabel || placeholder} </ThemedText>
        <ThemedText style={styles.chevron}>{isOpen ? '▲' : '▼'}</ThemedText>
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => {
                    onSelect(item.value);
                    setOpen(false);
                  }}
                >
                  <ThemedText style={styles.dropdownText}>{item.label}</ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selectGroup: { marginVertical: 6 },
  selectLabel: { fontSize: 13, fontWeight: '600', color: '#11181C', marginBottom: 8 },
  selectBox: {
    borderWidth: 1,
    borderColor: '#248AEF',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#F8FAFD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: { fontSize: 14, color: '#11181C' },
  chevron: { fontSize: 14, color: '#9AA1B0', marginLeft: 8 },
  // Removed dropdownMenu, replaced with modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    // minWidth: 220,
    // maxWidth: 320,
     position:'absolute',
    width:'80%',
    maxHeight: 350,
    backgroundColor: '#fff',
    marginHorizontal: 20,
     top: '35%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#248AEF',
    paddingVertical: 8,
    paddingHorizontal: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  dropdownOption: {
   
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  dropdownText: { fontSize: 14, color: '#11181C' },
});
