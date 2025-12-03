import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  length?: number;
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
};

export default function PinPad({ length = 4, value, onChange, onSubmit }: Props) {
  const tint = useThemeColor({}, 'tint');

  const addDigit = (d: string) => {
    if (value.length >= length) return;
    onChange(value + d);
    if (value.length + 1 === length) {
      setTimeout(() => onSubmit?.(), 200);
    }
  };

  const del = () => onChange(value.slice(0, -1));

  const rows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0'],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        {Array.from({ length }).map((_, i) => (
          <View key={i} style={[styles.dot, { backgroundColor: i < value.length ? tint : '#e6e6e6' }]} />
        ))}
      </View>

      <View style={styles.pad}>
        {rows.map((r, ri) => (
          <View key={ri} style={styles.padRow}>
            {r.map((k) => (
              <TouchableOpacity key={k} style={styles.key} onPress={() => addDigit(k)}>
                <Text style={styles.keyText}>{k}</Text>
              </TouchableOpacity>
            ))}
            {ri === 3 && (
              <TouchableOpacity style={[styles.key, styles.backKey]} onPress={del}>
                <Ionicons name="backspace" size={20} color="#223" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dotsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  pad: {},
  padRow: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginVertical: 8 },
  key: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  keyText: { fontSize: 20 },
  backKey: { backgroundColor: '#fff' },
});
