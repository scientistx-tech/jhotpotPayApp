import CustomButton from '@/components/custom-button';
import { RechargeHeader } from '@/components/recharge';
import AddCustomerModal from '@/components/sales/add-customer-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
};

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Name: Omuk Bhai',
    email: 'Email: omuk@gmail.com',
    phone: 'Phone Number : +880 123 456 789',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=60',
  },
  {
    id: '2',
    name: 'Name: Omuk Bhai',
    email: 'Email: omuk@gmail.com',
    phone: 'Phone Number : +880 123 456 789',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=80&q=60',
  },
  {
    id: '3',
    name: 'Name: Omuk Bhai',
    email: 'Email: omuk@gmail.com',
    phone: 'Phone Number : +880 123 456 789',
  },
  {
    id: '4',
    name: 'Name: Omuk Bhai',
    email: 'Email: omuk@gmail.com',
    phone: 'Phone Number : +880 123 456 789',
  },
];

export default function CustomerList() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [showModal, setShowModal] = useState(false);

  const handleBackPress = () => router.back();

  const handleAddCustomer = (customer: { name: string; email: string; phone: string; address: string }) => {
    const next: Customer = {
      id: `${Date.now()}`,
      name: `Name: ${customer.name}`,
      email: customer.email ? `Email: ${customer.email}` : 'Email: -',
      phone: `Phone Number : ${customer.phone}`,
    };
    setCustomers((prev) => [next, ...prev]);
    setShowModal(false);
  };

  const renderItem = ({ item }: { item: Customer }) => (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <View style={styles.cardRow}>
        <Image
          source={{ uri: item.avatar || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=60' }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <ThemedText style={styles.nameText}>{item.name}</ThemedText>
          <ThemedText style={styles.metaText}>{item.email}</ThemedText>
          <ThemedText style={styles.metaText}>{item.phone}</ThemedText>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: `${tint}15` }]}>
            <MaterialCommunityIcons name="square-edit-outline" size={18} color={tint} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: '#E8F0FE' }]}>
            <MaterialCommunityIcons name="trash-can-outline" size={18} color="#1E63F0" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Customer List"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <CustomButton title="Add New Customer" onPress={() => setShowModal(true)} />

        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 12, marginTop: 14 }}
        />

        <View style={{ height: 24 }} />
      </ScrollView>

      <View style={styles.bottomAction}>
        <CustomButton title="Update" onPress={() => console.log('Update customers')} />
      </View>

      <AddCustomerModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddCustomer}
      />
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
    gap: 12,
  },
  card: {
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E5E8ED',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#4B5563',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomAction: {
      paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 12,
  },
});
