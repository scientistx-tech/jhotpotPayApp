import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

type Transaction = {
  id: string;
  type: 'cashout' | 'recharge' | 'commission' | 'bill';
  title: string;
  description: string;
  amount: number;
  time: string;
  date: string;
  avatar: string;
};

const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'cashout',
    title: 'Cashout',
    description: 'CHARGE ENTERPRISE\nTIME IS 20:30:07 AM',
    amount: 650,
    time: '7:00 PM',
    date: '11/21/2025',
    avatar: 'A',
  },
  {
    id: '2',
    type: 'cashout',
    title: 'Cashout',
    description: 'CHARGE ENTERPRISE\nTIME IS 20:30:07 AM',
    amount: 550,
    time: '7:00 PM',
    date: '11/21/2025',
    avatar: 'A',
  },
  {
    id: '3',
    type: 'cashout',
    title: 'Cashout',
    description: 'CHARGE ENTERPRISE\nTIME IS 20:30:07 AM',
    amount: 650,
    time: '7:00 PM',
    date: '11/21/2025',
    avatar: 'A',
  },
  {
    id: '4',
    type: 'recharge',
    title: 'Recharge',
    description: 'MOBILE RECHARGE\nTIME IS 18:45:30 AM',
    amount: 500,
    time: '6:45 PM',
    date: '11/20/2025',
    avatar: 'R',
  },
  {
    id: '5',
    type: 'commission',
    title: 'Commission',
    description: 'EARNING RECEIVED\nTIME IS 10:15:42 AM',
    amount: 1200,
    time: '10:15 AM',
    date: '11/20/2025',
    avatar: 'C',
  },
  {
    id: '6',
    type: 'bill',
    title: 'Bill Payment',
    description: 'UTILITY BILL PAID\nTIME IS 14:20:15 PM',
    amount: 850,
    time: '2:20 PM',
    date: '11/19/2025',
    avatar: 'B',
  },
];

export default function History() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const handleBackPress = () => router.back();

  const getAvatarColor = (type: string) => {
    switch (type) {
      case 'cashout':
        return '#E8F4F8';
      case 'recharge':
        return '#FFF3E0';
      case 'commission':
        return '#E8F5E9';
      case 'bill':
        return '#F3E5F5';
      default:
        return '#F0F2F5';
    }
  };

  const getAvatarTextColor = (type: string) => {
    switch (type) {
      case 'cashout':
        return '#248AEF';
      case 'recharge':
        return '#FF9800';
      case 'commission':
        return '#4CAF50';
      case 'bill':
        return '#9C27B0';
      default:
        return '#666';
    }
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <View style={styles.cardContent}>
        {/* Avatar */}
        <View
          style={[
            styles.avatar,
            { backgroundColor: getAvatarColor(item.type) },
          ]}
        >
          <ThemedText
            style={[
              styles.avatarText,
              { color: getAvatarTextColor(item.type) },
            ]}
          >
            {item.avatar}
          </ThemedText>
        </View>

        {/* Transaction Details */}
        <View style={styles.details}>
          <ThemedText style={styles.title}>{item.title}</ThemedText>
          <ThemedText style={styles.description}>{item.description}</ThemedText>
        </View>

        {/* Amount and Time */}
        <View style={styles.rightSection}>
          <ThemedText style={[styles.amount, { color: tint }]}>
            BDT {item.amount}
          </ThemedText>
          <ThemedText style={styles.dateTime}>
            {item.time} {item.date}
          </ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Transaction History"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <FlatList
        data={TRANSACTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 20,
    gap: 12,
  },
  card: {
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    opacity: 0.6,
    lineHeight: 16,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
    fontSize: 13,
    fontWeight: '600',
  },
  dateTime: {
    fontSize: 11,
    opacity: 0.6,
  },
});
