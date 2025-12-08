import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, View } from 'react-native';

export type CustomerInfoCardProps = {
  name?: string;
  phoneNumber?: string;
};

export default function CustomerInfoCard({ name, phoneNumber }: CustomerInfoCardProps) {
  const bg = useThemeColor({}, 'background');

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      
      <View style={styles.card}>
        <ThemedText type="defaultSemiBold" style={{marginBottom:12}}>
        Customer Information
      </ThemedText>

        <View style={styles.row}>
          <ThemedText style={styles.label}>Name:</ThemedText>
          <ThemedText style={styles.value}>{name || '-'}</ThemedText>
        </View>

        <View style={styles.row}>
          <ThemedText style={styles.label}>Phone Number:</ThemedText>
          <ThemedText style={styles.value}>{phoneNumber || '-'}</ThemedText>
        </View>
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
  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    opacity: 0.7,
    minWidth: 100,
  },
  value: {
    fontSize: 13,
    flex: 1,
  },
});
