import { ActionButton, RechargeDetailsModal, RechargeHeader, RecipientCard, TypeSelector } from '@/components/recharge';
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
  rate: string;
  validity: string;
  price: string;
  isNew?: boolean;
};

const CALL_RATE_OFFERS: Offer[] = [
  { id: '1', rate: '1P/sec', validity: '3 Days', price: 'BDT: 29', isNew: true },
  { id: '2', rate: '1P/sec', validity: '3 Days', price: 'BDT: 29' },
  { id: '3', rate: '1P/sec', validity: '3 Days', price: 'BDT: 29', isNew: true },
  { id: '4', rate: '1P/sec', validity: '3 Days', price: 'BDT: 29' },
  { id: '5', rate: '1P/sec', validity: '3 Days', price: 'BDT: 29' },
  { id: '6', rate: '1P/sec', validity: '3 Days', price: 'BDT: 29', isNew: true },
];

const CATEGORIES: { id: AmountCategory; label: string }[] = [
  { id: 'amount', label: 'Amount' },
  { id: 'internet', label: 'Internet' },
  { id: 'minute', label: 'Minute' },
  { id: 'bundle', label: 'Bundle' },
  { id: 'call-rate', label: 'Call Rate' },
];

export default function RechargeCallRate() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const [rechargeType, setRechargeType] = useState<RechargeType>('prepaid');
  const [activeCategory, setActiveCategory] = useState<AmountCategory>('call-rate');
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const selectedOffer = useMemo(
    () => CALL_RATE_OFFERS.find((offer) => offer.id === selectedOfferId),
    [selectedOfferId],
  );

  const handleCategoryPress = (category: AmountCategory) => {
    setActiveCategory(category);
    if (category === 'internet') {
      router.replace('/recharge_internet');
    }
  };

  const handleProceedPress = () => {
    if (selectedOfferId) {
      setShowDetailsModal(true);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader title="Call Rate" showBack={true} rightIcon="wallet-plus" />

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
          {CALL_RATE_OFFERS.map((offer) => {
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
                      <ThemedText style={styles.offerTitle}>{offer.rate}</ThemedText>
                    </View>

                    <View style={styles.offerMetaRow}>
                      <ThemedText style={styles.metaText}>{offer.validity}</ThemedText>
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

      <View style={styles.bottomSection}>
        <ActionButton
          label="Back"
          onPress={() => router.back()}
          variant="secondary"
          style={{ marginBottom: 12 }}
        />
        <ActionButton label="Proceed" onPress={handleProceedPress} disabled={!selectedOfferId} />
      </View>

      <RechargeDetailsModal
        visible={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        recipientName="MD. Mystogan Islam"
        recipientPhone="+880 123 345 678"
        amount={selectedOffer?.price ?? 'BDT: --'}
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
    gap: 12,
  },
});