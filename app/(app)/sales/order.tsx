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

export default function SalesOrder() {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { id: 1, icon: 'file-document-outline', label: 'বাকি খাতা', color: '#248AEF' },
    { id: 2, icon: 'file-document-edit-outline', label: 'বেচা বিক্রি', color: '#9C27B0' },
    { id: 3, icon: 'book-open-page-variant', label: 'বিক্রির খাতা', color: '#FFB74D' },
    { id: 4, icon: 'receipt-text-outline', label: 'Pay Bill', color: '#42A5F5' },
    { id: 5, icon: 'account-supervisor-outline', label: 'গ্রাহক তালিকা', color: '#66BB6A' },
    { id: 6, icon: 'history', label: 'History', color: '#26C6DA' },
    { id: 7, icon: 'package-variant-closed', label: 'Product Management', color: '#FF9800' },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
    console.log('Menu item pressed:', item.label);
    // Add navigation logic here
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <HomeHeader
        userName="Omuk Ahmed"
        userTitle="Top for Balance"
        greeting="স্বাগতম আবার!"
        onNotificationPress={() => console.log('Notifications pressed')}
        onSharePress={() => console.log('Share pressed')}
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
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
                <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
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
    paddingVertical: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
});
