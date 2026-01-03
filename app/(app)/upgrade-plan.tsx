
// import { useBuyPackageMutation, useGetPackagesQuery } from '@/api/packageApi';
// import { useThemeColor } from '@/hooks/use-theme-color';
// import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const UpgradePlan = () => {
//   const tint = useThemeColor({}, 'tint');
//   const bg = useThemeColor({}, 'background');
//   const { data, isLoading, isError, refetch } = useGetPackagesQuery();
//   const [buyPackage, { isLoading: isBuying }] = useBuyPackageMutation();

//   const handleBuy = async (packageId: string) => {
//     try {
//       const res = await buyPackage({ packageId }).unwrap();
//       if (res.success) {
//         Alert.alert('Success', res.message || 'Package purchased successfully');
//         refetch();
//       } else {
//         Alert.alert('Error', res.message || 'Could not buy package');
//       }
//     } catch (err: any) {
//       Alert.alert('Error', err?.message || 'Could not buy package');
//     }
//   };

//   const packages = data?.data || [];

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <Text style={styles.header}>Upgrade Plan</Text>
//       {isLoading ? (
//         <ActivityIndicator size="large" color={tint} style={{ marginTop: 32 }} />
//       ) : isError ? (
//         <Text style={styles.error}>Could not load plans.</Text>
//       ) : packages.length === 0 ? (
//         <Text style={styles.empty}>No plans found.</Text>
//       ) : (
//         packages.map(pkg => (
//           <View key={pkg.id} style={[styles.card, { backgroundColor: bg }]}> 
//             <Text style={styles.title}>{pkg.name}</Text>
//             <Text style={styles.details}>{pkg.details}</Text>
//             <View style={styles.infoRow}>
//               <Text style={styles.info}>Product Limit: {pkg.product_limit}</Text>
//               <Text style={styles.info}>Recharge Commission: {pkg.recharge_commission}%</Text>
//             </View>
//             <Text style={styles.price}>Price: BDT {pkg.price}</Text>
// <TouchableOpacity
//   style={[styles.buyButton, { backgroundColor: tint, opacity: isBuying ? 0.6 : 1 }]}
//   onPress={() => handleBuy(pkg.id)}
//   disabled={isBuying}
// >
//   <Text style={styles.buyButtonText}>{isBuying ? 'Processing...' : 'Buy'}</Text>
// </TouchableOpacity>
//           </View>
//         ))
//       )}
//       <View style={{ height: 32 }} />
//     </ScrollView>
//   );
// };


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
    setProcessingId(packageId);
    try {
      const res = await buyPackage({ packageId }).unwrap();
      if (res.success) {
        Alert.alert('Success', res.message || 'Package purchased successfully');
        refetch();
      } else {
        Alert.alert('Error', res.message || 'Could not buy package');
      }
    } catch (err: any) {
      if (err?.err?.statusCode === 400 || err?.status === 400) {
        Alert.alert('Low Balance', 'Please add balance to continue.');
        router.replace('/(app)/wallet/add-balance');
      } else {
        Alert.alert('Error', err?.message || 'Could not buy package');
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
            <ThemedText style={styles.metaText}>Product Limit: {item.product_limit}</ThemedText>
            <ThemedText style={styles.metaText}>Recharge Commission: {item.recharge_commission}</ThemedText>
            <ThemedText style={styles.metaText}>Price: BDT {item.price}</ThemedText>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[{ backgroundColor: tint, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 2, opacity: isProcessing ? 0.6 : 1 }]}
              onPress={() => handleBuyPackage(item.id)}
              disabled={isProcessing}
            >
              <ThemedText style={{ color: 'white' }}>{isProcessing ? 'Processing...' : 'Buy'}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };



  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Upgrade Plan"
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
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 29 }}>No Upgrade Plan.</Text>}
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
