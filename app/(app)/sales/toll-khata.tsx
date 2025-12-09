import { SalesHeader } from '@/components/sales';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type Customer = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  totalBill?: string;
  paid?: string;
  due?: string;
  billingDate?: string;
  avatar?: string;
};

const CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Customer Name',
    billingDate: 'Billing Date: DD/MM/YYYY',
    totalBill: 'Total Bill: 50,000 BDT',
    paid: 'Paid: 20,000 BDT',
    due: 'Total Due: 30,000 BDT',
  },
  {
    id: '2',
    name: 'Customer Name',
    billingDate: 'Billing Date: DD/MM/YYYY',
    totalBill: 'Total Bill: 50,000 BDT',
    paid: 'Paid: 20,000 BDT',
    due: 'Total Due: 30,000 BDT',
  },
  {
    id: '3',
    name: 'Customer Name',
    billingDate: 'Billing Date: DD/MM/YYYY',
    totalBill: 'Total Bill: 50,000 BDT',
    paid: 'Paid: 20,000 BDT',
    due: 'Total Due: 30,000 BDT',
  },
  {
    id: '4',
    name: 'Customer Name',
    billingDate: 'Billing Date: DD/MM/YYYY',
    totalBill: 'Total Bill: 50,000 BDT',
    paid: 'Paid: 20,000 BDT',
    due: 'Total Due: 30,000 BDT',
  },
  {
    id: '5',
    name: 'Customer Name',
    billingDate: 'Billing Date: DD/MM/YYYY',
    totalBill: 'Total Bill: 50,000 BDT',
    paid: 'Paid: 20,000 BDT',
    due: 'Total Due: 30,000 BDT',
  },
  {
    id: '6',
    name: 'Customer Name',
    billingDate: 'Billing Date: DD/MM/YYYY',
    totalBill: 'Total Bill: 50,000 BDT',
    paid: 'Paid: 20,000 BDT',
    due: 'Total Due: 30,000 BDT',
  },
  {
    id: '7',
    name: 'Customer Name',
    billingDate: 'Billing Date: DD/MM/YYYY',
    totalBill: 'Total Bill: 50,000 BDT',
    paid: 'Paid: 20,000 BDT',
    due: 'Total Due: 30,000 BDT',
  },
];

export default function TollKhata() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleCustomerPress = (customer: Customer) => {
    // Navigate to customer details or edit screen
    console.log('Customer pressed:', customer.name);
  };

  return (
    <ThemedView style={styles.container}>
      <SalesHeader
        title="বাকি খাতা"
        showBack={true}
        rightIcon="bell"
        onBackPress={handleBackPress}
        onRightIconPress={() => console.log('Notification pressed')}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {CUSTOMERS.map((customer) => (
          <TouchableOpacity
            key={customer.id}
            style={styles.customerCard}
            onPress={() => handleCustomerPress(customer)}
          >
            <View style={styles.cardContent}>
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <MaterialCommunityIcons name="account" size={28} color="#fff" />
                </View>
              </View>

              {/* Customer Info */}
              <View style={styles.infoSection}>
                <ThemedText type="defaultSemiBold" style={styles.customerName}>
                  {customer.name}
                </ThemedText>
                <ThemedText style={styles.billingDate}>
                  {customer.billingDate}
                </ThemedText>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Bill Details */}
            <View style={styles.billDetails}>
              <View style={styles.billRow}>
                <ThemedText style={styles.billLabel}>{customer.totalBill}</ThemedText>
              </View>
              <View style={styles.billRow}>
                <ThemedText style={styles.billLabel}>{customer.paid}</ThemedText>
              </View>
              <View style={styles.billRow}>
                <ThemedText style={[styles.billLabel, styles.dueLabel]}>
                  {customer.due}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  customerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9B9B9B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    marginBottom: 4,
  },
  billingDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 12,
  },
  billDetails: {
    gap: 6,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  dueLabel: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});
