import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { TouchableOpacity } from 'react-native';

export type ActionButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: any;
  disabled?: boolean;
};

export default function ActionButton({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled,
}: ActionButtonProps) {
  const tint = useThemeColor({}, 'tint');

  const baseStyle: any = {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const variantStyle =
    variant === 'primary'
      ? { backgroundColor: tint, opacity: disabled ? 0.5 : 1 }
      : variant === 'secondary'
        ? { backgroundColor: '#f0f0f0', opacity: disabled ? 0.5 : 1 }
        : { borderWidth: 1, borderColor: tint, opacity: disabled ? 0.5 : 1 };

  const textColor = variant === 'primary' ? '#fff' : variant === 'secondary' ? '#333' : tint;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[baseStyle, variantStyle, style]}
    >
      <ThemedText
        style={{
          color: textColor,
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}
