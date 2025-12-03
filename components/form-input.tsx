import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import RoundedInput from './rounded-input';
import { ThemedText } from './themed-text';

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
};

export default function FormInput({ name, control, label, placeholder, secureTextEntry, keyboardType }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }: { field: any; fieldState: any }) => {
        const { onChange, onBlur, value } = field;
        return (
          <View style={styles.wrapper}>
            <RoundedInput
              label={label}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
            />
            {fieldState.error && <ThemedText style={styles.error}>{fieldState.error.message?.toString()}</ThemedText>}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: { marginVertical: 6 },
  error: { color: '#e53935', marginTop: 6, fontSize: 13 },
});
