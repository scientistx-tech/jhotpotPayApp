import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useState } from 'react';
import { FlatList, Modal, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

export type SelectInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string, label: string) => void;
  options: { label: string; value: string }[];
  style?: StyleProp<ViewStyle>;
};

export default function SelectInput({
  label,
  placeholder = 'Select an option',
  value,
  onChange,
  options,
  style,
}: SelectInputProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');
  const [visible, setVisible] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  const handleSelect = (optValue: string, optLabel: string) => {
    onChange(optValue, optLabel);
    setVisible(false);
  };

  return (
    <View style={[styles.selectGroup, style]}>
      {label ? (
        <ThemedText style={styles.selectLabel}>{label}</ThemedText>
      ) : null}
      <TouchableOpacity
        style={[styles.selectBox, visible && { borderColor: '#248AEF' }]}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <ThemedText style={[styles.selectText, !value && { color: '#9AA1B0' }]}>
          {selectedLabel}
        </ThemedText>
        <ThemedText style={styles.chevron}>{visible ? '▲' : '▼'}</ThemedText>
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => handleSelect(item.value, item.label)}
                >
                  <ThemedText style={styles.dropdownText}>{item.label}</ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
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
