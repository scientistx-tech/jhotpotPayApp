import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function PayBill() {
  const router = useRouter();
  const bg = useThemeColor({}, 'background');

  const handleBackPress = () => router.back();

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Pay Bill"
        showBack
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.comingSoonContainer}>
          <ThemedText style={styles.comingSoonLabel}>This Feature is</ThemedText>
          <ThemedText style={styles.comingSoonTitle}>COMING SOON</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  comingSoonContainer: {
    alignItems: 'center',
    gap: 8,
  },
  comingSoonLabel: {
    fontSize: 16,
    color: '#4B5563',
  },
  comingSoonTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#248AEF',
  },
});
