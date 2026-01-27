import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { useGetBillHistoryQuery } from '@/api/payBillApi';
import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { RootState } from '@/store/store';
import { useCheckAuthQuery } from '@/api/authApi';

function StatusBadge({ status }: { status: string }) {
  const tint = useThemeColor({}, 'tint');
  const color = useMemo(() => {
    switch (status) {
      case 'PAID':
        return '#119a50';
      case 'REJECTED':
        return '#d32f2f';
      case 'PROCESSING':
        return '#f57c00';
      case 'PENDING':
      default:
        return tint;
    }
  }, [status, tint]);
  return (
    <View style={[styles.statusBadge, { borderColor: color }]}> 
      <ThemedText style={[styles.statusText, { color }]}>{status}</ThemedText>
    </View>
  );
}

function BillerIcon({ uri, fallbackName }: { uri?: string; fallbackName?: string }) {
  if (!uri) {
    return <Ionicons name="document-text-outline" size={26} color="#666" />;
  }
  const isSvg = uri.toLowerCase().endsWith('.svg');
  if (isSvg) {
    // Fallback for SVG icons in React Native
    const name = (fallbackName || '').toLowerCase();
    let icon: React.ComponentProps<typeof Ionicons>['name'] = 'document-text-outline';
    if (name.includes('electric') || name.includes('বিদ্যুৎ') || name.includes('nesco')) icon = 'flash-outline';
    else if (name.includes('tv')) icon = 'tv-outline';
    else if (name.includes('gas')) icon = 'flame-outline';
    else if (name.includes('water')) icon = 'water-outline';
    return <Ionicons name={icon} size={26} color="#666" />;
  }
  return (
    <Image source={{ uri }} style={{ width: 26, height: 26 }} resizeMode="contain" />
  );
}

function formatDate(iso?: string) {
  try {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  } catch {
    return iso || '';
  }
}

export default function BillDetails() {
  const router = useRouter();
  const bg = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  // const userId = useSelector((s: RootState) => s.auth.user?.id);
   const { data:userData } = useCheckAuthQuery();
  
    // user is likely UserResponse or null
    const userId = (userData as any)?.data?.id || 'User not found';

  const { data, isLoading, isFetching, refetch } = useGetBillHistoryQuery(
    { page: 1, limit: 10, userId: userId || '' },
    { skip: !userId }
  );

  const items = data?.data ?? [];

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleBackPress = () => router.back();

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader title="বিল বিবরণী" showBack onBackPress={handleBackPress} />

      {isLoading && !items.length ? (
        <View style={styles.center}>
          <ActivityIndicator color={tint} />
          <ThemedText style={{ marginTop: 8 }}>লোড হচ্ছে...</ThemedText>
        </View>
      ) : !userId ? (
        <View style={styles.center}>
          <Ionicons name="warning-outline" size={24} color={tint} />
          <ThemedText style={{ marginTop: 8 }}>ইউজার আইডি পাওয়া যায়নি</ThemedText>
        </View>
      ) : items.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="document-text-outline" size={24} color={tint} />
          <ThemedText style={{ marginTop: 8 }}>কোনো বিল ইতিহাস পাওয়া যায়নি</ThemedText>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingVertical: 20}}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: bg }]}> 
              <View style={styles.logoBox}>
                <BillerIcon uri={item.biller?.icon} fallbackName={item.biller?.name} />
              </View>
              <View style={styles.infoBox}>
                <ThemedText style={styles.title}>{item.biller?.name || 'অজানা বিলার'}</ThemedText>
                <ThemedText style={styles.subtitle}>পরিমাণ: ৳{item.amount} • চার্জ: ৳{item.charge}</ThemedText>
                <ThemedText style={styles.dateText}>{formatDate(item.createdAt)}</ThemedText>
                {/* Optional identifiers */}
                {(item.meter_no || item.subscription_id || item.sms_account_no || item.contact_no) && (
                  <View style={styles.tagsRow}>
                    {item.meter_no ? (
                      <ThemedText style={styles.tagText}>মিটার: {item.meter_no}</ThemedText>
                    ) : null}
                    {item.subscription_id ? (
                      <ThemedText style={styles.tagText}>সাবস্ক্রিপশন: {item.subscription_id}</ThemedText>
                    ) : null}
                    {item.sms_account_no ? (
                      <ThemedText style={styles.tagText}>বিল আইডি: {item.sms_account_no}</ThemedText>
                    ) : null}
                    {item.contact_no ? (
                      <ThemedText style={styles.tagText}>ফোন: {item.contact_no}</ThemedText>
                    ) : null}
                  </View>
                )}
              </View>
              <StatusBadge status={item.status} />
            </View>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f3f7',
  },
  infoBox: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.8,
  },
  dateText: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  tagText: {
    fontSize: 11,
    opacity: 0.8,
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});