import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

export type RecipientCardProps = {
  name: string;
  phone: string;
  avatarSource?: ImageSourcePropType;
  onChangePress?: () => void;
  icon?: string;
  iconColor?: string;
};

export default function RecipientCard({
  name,
  phone,
  avatarSource,
  onChangePress,
  icon = 'phone',
  iconColor = '#248AEF',
}: RecipientCardProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <ThemedText style={styles.label}>Recipient</ThemedText>

      <View style={styles.card}>
        {avatarSource ? (
          <Image source={avatarSource} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: `${tint}20` }]}>
            <MaterialCommunityIcons name={icon as any} size={24} color={iconColor} />
          </View>
        )}

        <View style={styles.info}>
          <ThemedText type="defaultSemiBold" style={styles.name}>
            {name}
          </ThemedText>
          <ThemedText style={styles.phone}>{phone}</ThemedText>
        </View>

        <TouchableOpacity onPress={onChangePress} style={[styles.changeBtn, { backgroundColor: `${tint}15` }]}>
          <MaterialCommunityIcons name="pencil" size={20} color={tint} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
  },
  phone: {
    fontSize: 12,
    opacity: 0.7,
  },
  changeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
