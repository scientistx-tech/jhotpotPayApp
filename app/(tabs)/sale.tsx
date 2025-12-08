import HomeHeader from '@/components/home-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type MenuItem = {
  id: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  color: string;
};

export default function Sale() {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { id: 1, icon: 'store', label: 'বাকি খাতা', color: '#248AEF' },
    { id: 2, icon: 'file-document', label: 'বেচা বিক্রি', color: '#FF6B6B' },
    { id: 3, icon: 'book-open-variant', label: 'বিক্রির খাতা', color: '#FFD93D' },
    { id: 4, icon: 'receipt', label: 'Pay Bill', color: '#6BCB77' },
    { id: 5, icon: 'account-multiple', label: 'গ্রাহক তালিকা', color: '#4D96FF' },
    { id: 6, icon: 'history', label: 'History', color: '#9B59B6' },
    { id: 7, icon: 'package-variant', label: 'Product Management', color: '#E67E22' },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
   if (item.label === 'বেচা বিক্রি') {
      router.push('/(app)/sales/order');
    } else {
      console.log('Toll Khata item pressed:', item.label);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <HomeHeader
        userName="Omul Ahmed"
        userTitle="Top for Shubaera"
        greeting="স্বাগতম আবার!"
        onNotificationPress={() => console.log('Notifications pressed')}
        onSharePress={() => console.log('Share pressed')}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            বেচা বিক্রি
          </ThemedText>
          <View style={styles.gridContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                onPress={() => handleMenuItemPress(item)}
              >
                <View style={[styles.iconCircle, { backgroundColor: `${item.color}20` }]}>
                  <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
                </View>
                <ThemedText style={styles.itemLabel}>{item.label}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    paddingVertical: 12,
  },
  gridItem: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
});