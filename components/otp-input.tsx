import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  length?: number;
  value: string;
  onChange: (v: string) => void;
};

export default function OTPInput({ length = 6, value, onChange }: Props) {
  const tint = useThemeColor({}, 'tint');
  const ref = useRef<TextInput | null>(null);

  useEffect(() => {
    // auto focus when mounted
    setTimeout(() => ref.current?.focus(), 250);
  }, []);

  const cells = Array.from({ length }).map((_, i) => value[i] || '');

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => ref.current?.focus()}>
      <View style={styles.row}>
        {cells.map((ch, i) => (
          <View key={i} style={[styles.cell, { borderColor: tint, backgroundColor: '#fff' }]}> 
            <Text style={styles.cellText}>{ch}</Text>
          </View>
        ))}
      </View>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={(t) => onChange(t.slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hidden}
        caretHidden
        autoFocus
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    elevation: 2,
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 18,
  },
  hidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
