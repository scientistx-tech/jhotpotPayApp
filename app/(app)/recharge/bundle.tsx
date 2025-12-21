import { useGetRechargeOffersQuery, useRechargeMutation } from '@/api/rechargeApi';
import { ActionButton, RechargeHeader, RecipientCard } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { usePhone } from '../../../context/PhoneContext';
type SimType = 'PRE_PAID' | 'POST_PAID';
type AmountCategory = 'amount' | 'internet' | 'minute' | 'bundle' | 'call-rate';

const CATEGORIES: { id: AmountCategory; label: string }[] = [
  { id: 'amount', label: 'Amount' },
  { id: 'internet', label: 'Internet' },
  { id: 'minute', label: 'Minute' },
  { id: 'bundle', label: 'Bundle' },
  { id: 'call-rate', label: 'Call Rate' },
];

export default function RechargeBundle() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  // Get params from navigation
  const params = typeof router === 'object' && 'params' in router ? (router as any).params : (router as any)?.getCurrentRoute?.()?.params;
  const { phone: phoneContext } = usePhone();
  const phone = params?.phone || phoneContext;
  const initialSimType = params?.sim_type || 'PRE_PAID';
  const initialNetworkType = params?.network_type || 'GRAMEENPHONE';
  const [simType, setSimType] = useState<SimType>(initialSimType);
  const [activeCategory, setActiveCategory] = useState<AmountCategory>('bundle');
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [recharge, { isLoading: isRechargeLoading, isSuccess: isRechargeSuccess, isError: isRechargeError, error: rechargeError }] = useRechargeMutation();
  const [rechargeResult, setRechargeResult] = useState<any>(null);

  const networkType = initialNetworkType;
  const { data, isLoading } = useGetRechargeOffersQuery({ sim_type: simType, network_type: networkType });
  const filteredOffers = useMemo(() => {
    const offers = data?.data || [];
    return offers.filter((offer) => offer.type === 'BUNDLE');
  }, [data]);

  const handleCategoryPress = (category: AmountCategory) => {
    setActiveCategory(category);
    const navParams = { phone, network_type: params?.network_type, sim_type: params?.sim_type };
    if (category === 'amount') {
      router.replace({ pathname: '/(app)/recharge/amount', params: navParams });
    } else if (category === 'internet') {
      router.replace({ pathname: '/(app)/recharge/internet', params: navParams });
    } else if (category === 'minute') {
      router.replace({ pathname: '/(app)/recharge/minute', params: navParams });
    } else if (category === 'call-rate') {
      router.replace({ pathname: '/(app)/recharge/call-rate', params: navParams });
    }
  };


  const handleProceedPress = () => {
    if (selectedOfferId) {
      setShowDetailsModal(true);
    }
  };

  const handleRecharge = async () => {
    if (!selectedOfferId) return;
    if (!phone) {
      alert('Phone number is required.');
      return;
    }
    let payload: any = {
      sim_type: simType,
      network_type: networkType,
      phone,
      offerId: selectedOfferId,
    };
    try {
      const result = await recharge(payload).unwrap();
      setRechargeResult(result);
      setShowDetailsModal(false);
      alert('Recharge request created successfully!');
      // Optionally, navigate or reset state here
    } catch (e: any) {
      // Error handled by isRechargeError
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Bundle Offers"
        showBack={true}
        rightIcon="wallet-plus"
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <RecipientCard name="MD. Mystogan Islam" phone={phone || ''} />

          <View style={{ marginVertical: 12 , paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              {["PRE_PAID", "POST_PAID"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                  onPress={() => setSimType(type as SimType)}
                >
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: tint,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {simType === type && (
                      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tint }} />
                    )}
                  </View>
                  <ThemedText style={{ fontSize: 14, fontWeight: '500' }}>{type === 'PRE_PAID' ? 'Prepaid' : 'Postpaid'}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => handleCategoryPress(cat.id)}
                  style={styles.categoryBtn}
                >
                  <ThemedText style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                    {cat.label}
                  </ThemedText>
                  {isActive && <View style={[styles.activeBar, { backgroundColor: tint }]} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.offerList, { flexDirection: 'column' }]}> 
          {isLoading ? (
            <ThemedText>Loading...</ThemedText>
          ) : filteredOffers.length === 0 ? (
            <ThemedText>No offers found.</ThemedText>
          ) : (
            filteredOffers.map((offer) => {
              const isSelected = selectedOfferId === offer.id;
              return (
                <TouchableOpacity
                  key={offer.id}
                  style={[styles.offerCard, isSelected && styles.offerCardActive]}
                  onPress={() => setSelectedOfferId(offer.id)}
                >
                  <View style={styles.offerLeft}>
                    <View style={[styles.radio, { borderColor: tint }]}> 
                      {isSelected ? <View style={[styles.radioDot, { backgroundColor: tint }]} /> : null}
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.offerTitleRow}>
                        <ThemedText style={styles.offerTitle}>{offer.name}</ThemedText>
                      </View>
                      <View style={styles.offerMetaRow}>
                        <ThemedText style={styles.metaText}>{offer.validity}</ThemedText>
                        {offer.cash_back ? (
                          <ThemedText style={styles.metaText}>{offer.cash_back} Taka Cashback</ThemedText>
                        ) : null}
                      </View>
                    </View>
                  </View>
                  <ThemedText style={[styles.price, { color: tint }]}>{offer.price} BDT</ThemedText>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {
        !showDetailsModal && <View style={styles.bottomSection}>
          <View style={{ flex: 1 }}>
            <ActionButton
              label="Back"
              onPress={handleBackPress}
              variant="secondary"
            />
          </View>
          <View style={{ flex: 1 }}>
            <ActionButton label="Next" onPress={handleProceedPress} disabled={!selectedOfferId} />
          </View>
        </View>
      }

      {/* You can add a modal for offer details if needed */}
      {/* Modal for recharge confirmation */}
      {showDetailsModal && (
        <>
          <RechargeHeader
            title="Confirm Recharge"
            showBack={true}
            onBackPress={() => setShowDetailsModal(false)}
          />
          {/* You can use a custom modal or reuse an existing one. For now, use alert/confirm style. */}
          <View style={{ position: 'absolute', top: 100, left: 0, right: 0, backgroundColor: '#fff', margin: 24, padding: 24, borderRadius: 16, elevation: 8 }}>
            <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Proceed with recharge?</ThemedText>
            <ThemedText>Phone: {phone}</ThemedText>
            <ThemedText>Offer: {filteredOffers.find(o => o.id === selectedOfferId)?.name}</ThemedText>
            <ThemedText>Price: {filteredOffers.find(o => o.id === selectedOfferId)?.price} BDT</ThemedText>
            {isRechargeError && <ThemedText style={{ color: 'red', marginTop: 8 }}>{rechargeError?.data?.message || 'Recharge failed'}</ThemedText>}
            <View style={{ flexDirection: 'row', marginTop: 16, gap: 12 }}>
              <ActionButton label="Cancel" onPress={() => setShowDetailsModal(false)} variant="secondary" />
              <ActionButton label={isRechargeLoading ? 'Processing...' : 'Confirm'} onPress={handleRecharge} disabled={isRechargeLoading} />
            </View>
          </View>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    justifyContent: 'space-between',
  },
  categoryBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    flex: 1,
  },
  categoryLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  categoryLabelActive: {
    opacity: 1,
    fontWeight: '600',
  },
  activeBar: {
    height: 3,
    width: '80%',
    borderRadius: 12,
    marginTop: 8,
  },
  offerList: {
    marginTop: 16,
    gap: 12,
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  offerCardActive: {
    borderWidth: 1,
    borderColor: '#248AEF',
  },
  offerLeft: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  offerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  offerMetaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.7,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
});
