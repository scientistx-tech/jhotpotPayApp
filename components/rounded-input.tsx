import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

export type RoundedInputProps = TextInputProps & {
  label?: string;
};

export default function RoundedInput({ label, style, ...props }: RoundedInputProps) {
  const tint = useThemeColor({}, 'tint');
  useThemeColor({}, 'background');

  return (
    <View style={styles.wrapper}>
      {label ? <ThemedText type="defaultSemiBold" style={styles.label}>{label}</ThemedText> : null}
      <TextInput
        placeholderTextColor="#9AA8B2"
        {...props}
        style={[styles.input, { borderColor: tint, backgroundColor: '#FFFFFF' }, style]}
      />
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
    color:"#000"
  },
});
