import { useBuyPackageMutation, useGetPackagesQuery } from '@/api/packageApi';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function UpgradePlan() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');


  const handleBackPress = () => router.back();
  const [refreshing, setRefreshing] = useState(false);


  const { data, isLoading, isError, refetch } = useGetPackagesQuery();
  
  const [buyPackage] = useBuyPackageMutation();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleBuyPackage = async (packageId: string) => {
    try {
      const res = await buyPackage({ packageId }).unwrap();
      console.log(res);

      if (res.success) {
        Alert.alert('Success', res.message || 'Package purchased successfully');
        refetch();
      } else {
        Alert.alert('Error', res.message || 'Could not buy package');
      }
    } catch (err: any) {
      console.log(err)
      console.log(err?.data?.message)
      if (err?.err?.statusCode === 400 || err?.status === 400) {
        Alert.alert('Error', err?.data?.message || 'Please add balance to continue.');
        router.replace('/(app)/wallet/add-balance');
      } else {
        Alert.alert('Error', err?.data?.message || 'Could not buy package');
      }
    } finally {
      setProcessingId(null);
    }
  };

  const packages = data?.data || [];






  // Swipe-to-refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };


  const renderItem = ({ item }: { item: any }) => {
    const isProcessing = processingId === item.id;
    return (
      <View style={[styles.card, { backgroundColor: bg }]}> 
        <View style={styles.cardRow}>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.nameText}>{item.name}</ThemedText>
            <ThemedText style={styles.nameText}>{item.details}</ThemedText>
            <ThemedText style={styles.metaText}>সীমা: {item.product_limit}</ThemedText>
            <ThemedText style={styles.metaText}>রিচার্জ কমিশন: {item.recharge_commission}</ThemedText>
            <ThemedText style={styles.metaText}>মূল্য: {item.price} টাকা</ThemedText>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[{ backgroundColor: tint, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 2, opacity: isProcessing ? 0.6 : 1 }]}
              onPress={() => handleBuyPackage(item.id)}
              disabled={isProcessing}
            >
              <ThemedText style={{ color: 'white' }}>{isProcessing ? 'প্রসেস হচ্ছে...' : 'কিনুন'}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };



  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="প্ল্যান আপগ্রেড"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <View style={styles.content}>


        {/* Product List with FlatList */}
        <FlatList
          data={packages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, marginTop: 14, paddingBottom: 40 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 29 }}>কোনো আপগ্রেড প্ল্যান নেই।</Text>}
          ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={tint} style={{ marginVertical: 24 }} /> : null}
          refreshing={refreshing || isLoading}
          onRefresh={handleRefresh}

          onEndReachedThreshold={0.2}

          showsVerticalScrollIndicator={false}
        />


        <View style={{ height: 24 }} />


      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
    gap: 12,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#248AEF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    height: 55,
  },
  card: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    borderWidth: 1,
    marginBottom: 8,
    borderColor: '#E3E7ED',
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sliderContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    justifyContent: 'center',
    gap: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E3E7ED',
    marginHorizontal: 1,
  },
  activeDot: {
    backgroundColor: '#248AEF',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
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
