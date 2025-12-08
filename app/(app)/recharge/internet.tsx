import { ActionButton, OfferDetailsModal, RechargeHeader, RecipientCard, TypeSelector } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type RechargeType = 'prepaid' | 'postpaid' | 'skitto';
type AmountCategory = 'amount' | 'internet' | 'minute' | 'bundle' | 'call-rate';

type Offer = {
  id: string;
  title: string;
  validity: string;
  cashback?: string;
  price: string;
  isNew?: boolean;
};

const INTERNET_OFFERS: Offer[] = [
  { id: '1', title: '30 GB', validity: '30 Days', cashback: '50 Taka Cashback', price: 'BDT: 550' },
  { id: '2', title: '30 GB', validity: '30 Days', cashback: '50 Taka Cashback', price: 'BDT: 550', isNew: true },
  { id: '3', title: '30 GB', validity: '30 Days', cashback: '50 Taka Cashback', price: 'BDT: 550' },
  { id: '4', title: '30 GB', validity: '30 Days', cashback: '50 Taka Cashback', price: 'BDT: 550' },
  { id: '5', title: '30 GB', validity: '30 Days', cashback: '50 Taka Cashback', price: 'BDT: 550' },
  { id: '6', title: '30 GB', validity: '30 Days', cashback: '50 Taka Cashback', price: 'BDT: 550' },
];

const CATEGORIES: { id: AmountCategory; label: string }[] = [
  { id: 'amount', label: 'Amount' },
  { id: 'internet', label: 'Internet' },
  { id: 'minute', label: 'Minute' },
  { id: 'bundle', label: 'Bundle' },
  { id: 'call-rate', label: 'Call Rate' },
];

export default function RechargeInternet() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const [rechargeType, setRechargeType] = useState<RechargeType>('prepaid');
  const [activeCategory, setActiveCategory] = useState<AmountCategory>('internet');
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const selectedOffer = useMemo(
    () => INTERNET_OFFERS.find((offer) => offer.id === selectedOfferId),
    [selectedOfferId],
  );

  const handleCategoryPress = (category: AmountCategory) => {
    setActiveCategory(category);
    if (category === 'call-rate') {
      router.replace('/recharge/call-rate');
    } else if (category === 'amount') {
      router.replace('/recharge/amount');
    }
  };

  const handleProceedPress = () => {
    if (selectedOfferId) {
      setShowDetailsModal(true);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

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

          <TypeSelector selectedType={rechargeType} onTypeChange={setRechargeType} />

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

        <View style={styles.offerList}>
          {INTERNET_OFFERS.map((offer) => {
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
                      {offer.isNew && (
                        <View style={[styles.badge, { backgroundColor: `${tint}20` }]}>
                          <ThemedText style={[styles.badgeText, { color: tint }]}>New Offer</ThemedText>
                        </View>
                      )}
                      <ThemedText style={styles.offerTitle}>{offer.title}</ThemedText>
                    </View>

                    <View style={styles.offerMetaRow}>
                      <ThemedText style={styles.metaText}>{offer.validity}</ThemedText>
                      {offer.cashback ? (
                        <ThemedText style={styles.metaText}>{offer.cashback}</ThemedText>
                      ) : null}
                    </View>
                  </View>
                </View>

                <ThemedText style={[styles.price, { color: tint }]}>{offer.price}</ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.spacer} />
      </ScrollView>

     {
      !showDetailsModal &&  <View style={styles.bottomSection}>
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

      <OfferDetailsModal
        visible={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        recipientName="MD. Mystogan Islam"
        recipientPhone="+880 123 345 678"
        offerTitle={selectedOffer?.title ?? 'N/A'}
        validity={selectedOffer?.validity ?? ''}
        cashback={selectedOffer?.cashback}
        price={selectedOffer?.price ?? 'BDT: --'}
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
