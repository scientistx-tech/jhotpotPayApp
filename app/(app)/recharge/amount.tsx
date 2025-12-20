import { ActionButton, RechargeDetailsModal, RechargeHeader, RecipientCard } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';


import { useGetRechargeOffersQuery } from '@/api/rechargeApi';
import { z } from 'zod';
const sim_type = z.enum(["PRE_PAID", "POST_PAID"]);
type SimType = z.infer<typeof sim_type>;
type AmountCategory = 'amount' | 'internet' | 'minute' | 'bundle' | 'call-rate';

type Offer = {
  id: string;
  amount: string;
  price: string;
  isNew?: boolean;
};

const AMOUNT_OFFERS: Offer[] = [
  { id: '1', amount: '30', price: 'BDT: 30', isNew: true },
  { id: '2', amount: '50', price: 'BDT: 50' },
  { id: '3', amount: '100', price: 'BDT: 100', isNew: true },
];

const CATEGORIES: { id: AmountCategory; label: string }[] = [
  { id: 'amount', label: 'Amount' },
  { id: 'internet', label: 'Internet' },
  { id: 'minute', label: 'Minute' },
  { id: 'bundle', label: 'Bundle' },
  { id: 'call-rate', label: 'Call Rate' },
];


export default function RechargeAmount() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const [simType, setSimType] = useState<SimType>('PRE_PAID');
  const [activeCategory, setActiveCategory] = useState<AmountCategory>('amount');
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Assume network_type is fixed for demo, or get from navigation params if available
  const networkType = 'GRAMEENPHONE';
  const { data, isLoading } = useGetRechargeOffersQuery({ sim_type: simType, network_type: networkType });
  const offers = data?.data || [];
  const minuteOffers = useMemo(() => offers.filter((offer) => offer.type === 'MINUTE'), [offers]);
  const bundleOffers = useMemo(() => offers.filter((offer) => offer.type === 'BUNDLE'), [offers]);
  const selectedMinuteOffer = useMemo(() => minuteOffers.find((offer) => offer.id === selectedOfferId), [minuteOffers, selectedOfferId]);
  const selectedBundleOffer = useMemo(() => bundleOffers.find((offer) => offer.id === selectedOfferId), [bundleOffers, selectedOfferId]);
  const selectedOffer = useMemo(() => AMOUNT_OFFERS.find((offer) => offer.id === selectedOfferId), [selectedOfferId]);

  const finalAmount = customAmount || selectedOffer?.amount || null;
  const finalPrice = customAmount ? `BDT: ${customAmount}` : selectedOffer?.price ?? null;

  const handleCategoryPress = (category: AmountCategory) => {
    setActiveCategory(category);
    if (category === 'internet') {
      router.replace('/(app)/recharge/internet');
    } else if (category === 'call-rate') {
      router.replace('/(app)/recharge/call-rate');
    } else if (category === 'minute') {
      router.replace('/(app)/recharge/minute');
    } else if (category === 'bundle') {
      router.replace('/(app)/recharge/bundle');
    }else if (category === 'amount') {
      router.replace('/(app)/recharge/amount');
    }
  };

  const handleProceedPress = () => {
    if (finalAmount) {
      setShowDetailsModal(true);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const canProceed = finalAmount !== null && finalAmount !== '';

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Mobile Recharge"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <RecipientCard name="MD. Mystogan Islam" phone="+880 123 345 678" />

          {/* TypeSelector replaced with simType selector */}
          <View style={{ marginVertical: 12, marginHorizontal: 16 }}>
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

        {/* Amount Tab */}
        {activeCategory === 'amount' && (
          <View style={styles.amountSelectionContainer}>
            <View style={styles.amountButtonsColumn}>
              {AMOUNT_OFFERS.map((offer) => {
                const isSelected = selectedOfferId === offer.id && !customAmount;
                return (
                  <TouchableOpacity
                    key={offer.id}
                    style={[styles.amountButton, isSelected && styles.amountButtonActive]}
                    onPress={() => {
                      setSelectedOfferId(offer.id);
                      setCustomAmount('');
                    }}
                  >
                    <ThemedText style={[styles.amountButtonText, isSelected && styles.amountButtonTextActive]}>
                      {offer.amount}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.typeAmountSection}>
              <TextInput
                placeholder="Type Amount..."
                value={customAmount}
                onChangeText={setCustomAmount}
                keyboardType="numeric"
                placeholderTextColor="#248AEF"
                style={styles.customAmountInput}
              />
            </View>
          </View>
        )}

        {/* Minute Tab */}
        {activeCategory === 'minute' && (
          <View style={styles.offerList}>
            {isLoading ? (
              <ThemedText>Loading...</ThemedText>
            ) : minuteOffers.length === 0 ? (
              <ThemedText>No offers found.</ThemedText>
            ) : (
              minuteOffers.map((offer) => {
                const isSelected = selectedOfferId === offer.id;
                return (
                  <TouchableOpacity
                    key={offer.id}
                    style={[styles.offerCard, isSelected && styles.offerCardActive]}
                    onPress={() => {
                      setSelectedOfferId(offer.id);
                      setCustomAmount('');
                    }}
                  >
                    <View style={styles.offerLeft}>
                      <View>
                        <View style={styles.offerTitleRow}>
                          <ThemedText style={styles.offerTitle}>{offer.name}</ThemedText>
                        </View>
                        <View style={styles.offerMetaRow}>
                          <ThemedText style={styles.metaText}>{offer.validity}</ThemedText>
                        </View>
                      </View>
                    </View>
                    <ThemedText style={styles.price}>{offer.price} BDT</ThemedText>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        )}

        {/* Bundle Tab */}
        {activeCategory === 'bundle' && (
          <View style={styles.offerList}>
            {isLoading ? (
              <ThemedText>Loading...</ThemedText>
            ) : bundleOffers.length === 0 ? (
              <ThemedText>No offers found.</ThemedText>
            ) : (
              bundleOffers.map((offer) => {
                const isSelected = selectedOfferId === offer.id;
                return (
                  <TouchableOpacity
                    key={offer.id}
                    style={[styles.offerCard, isSelected && styles.offerCardActive]}
                    onPress={() => {
                      setSelectedOfferId(offer.id);
                      setCustomAmount('');
                    }}
                  >
                    <View style={styles.offerLeft}>
                      <View>
                        <View style={styles.offerTitleRow}>
                          <ThemedText style={styles.offerTitle}>{offer.name}</ThemedText>
                        </View>
                        <View style={styles.offerMetaRow}>
                          <ThemedText style={styles.metaText}>{offer.validity}</ThemedText>
                        </View>
                      </View>
                    </View>
                    <ThemedText style={styles.price}>{offer.price} BDT</ThemedText>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        )}

        <View style={styles.availableBalanceContainer}>
          <ThemedText style={styles.availableBalanceText}>Available Balance: 20,000 BDT</ThemedText>
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
          <ActionButton label="Next" onPress={handleProceedPress} disabled={!canProceed} />
        </View>
      </View>
      }

      <RechargeDetailsModal
        visible={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        recipientName="MD. Mystogan Islam"
        recipientPhone="+880 123 345 678"
        amount={finalPrice ?? 'BDT: --'}
        availableBalance="20,000 BDT"
        onProceed={() => {
          setShowDetailsModal(false);
        }}
      />
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
    paddingBottom: 150,
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
  amountSelectionContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 16,
  },
  amountButtonsColumn: {
    gap: 10,
    justifyContent: 'flex-start',
  },
  amountButton: {
    backgroundColor: '#e8f0f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d0dfe8',
  },
  amountButtonActive: {
    backgroundColor: '#248AEF',
    borderColor: '#248AEF',
  },
  amountButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  amountButtonTextActive: {
    color: '#fff',
  },
  typeAmountSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  customAmountInput: {
    backgroundColor: '#f5f7fb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 50,
    fontSize: 16,
    fontWeight: '600',
    color: '#222B45',
    textAlign: 'center',
  },
  availableBalanceContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 20,
  },
  availableBalanceText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
