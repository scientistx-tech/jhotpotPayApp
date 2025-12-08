import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type SalesHeaderProps = {
  title: string;
  showBack?: boolean;
  rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onBackPress?: () => void;
  onRightIconPress?: () => void;
};

export default function SalesHeader({
  title,
  showBack = false,
  rightIcon,
  onBackPress,
  onRightIconPress,
}: SalesHeaderProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.content}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={tint} />
          </TouchableOpacity>
        )}

        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightBtn}>
            <MaterialCommunityIcons name={rightIcon} size={24} color={tint} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  rightBtn: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  title: {
    fontSize: 18,
  },
});
