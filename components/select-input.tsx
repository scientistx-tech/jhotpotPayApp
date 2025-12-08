import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    <View style={styles.wrapper}>
      {label ? (
        <ThemedText type="defaultSemiBold" style={styles.label}>
          {label}
        </ThemedText>
      ) : null}

      <TouchableOpacity
        style={[styles.input, { borderColor: tint, backgroundColor: '#FFFFFF' }, style]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <ThemedText style={[styles.inputText, !value && styles.placeholderText]}>
          {selectedLabel}
        </ThemedText>
        <MaterialCommunityIcons name="chevron-down" size={24} color={tint} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { backgroundColor: bg }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              scrollEnabled={options.length > 6}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    value === item.value && [styles.optionActive, { backgroundColor: '#E5F2FF' }],
                  ]}
                  onPress={() => handleSelect(item.value, item.label)}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      value === item.value && { color: tint, fontWeight: '600' },
                    ]}
                  >
                    {item.label}
                  </ThemedText>
                  {value === item.value && (
                    <MaterialCommunityIcons name="check" size={20} color={tint} />
                  )}
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
  wrapper: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 6,
    fontSize: 13,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 16,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    flex: 1,
  },
  placeholderText: {
    color: '#9AA8B2',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  dropdown: {
    marginHorizontal: 16,
    borderRadius: 16,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8ED',
  },
  optionActive: {
    backgroundColor: '#E5F2FF',
  },
  optionText: {
    fontSize: 14,
    flex: 1,
  },
});
