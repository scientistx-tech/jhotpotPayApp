import { ActionButton, RechargeHeader, RecipientCard } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { usePhone } from '../../../context/PhoneContext';


import { useRechargeMutation } from '@/api/rechargeApi';
import OfferDetailsModal from '@/components/recharge/offer-details-modal';
import { z } from 'zod';

import { useCheckAuthQuery } from '@/api/authApi';


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

];

const CATEGORIES: { id: AmountCategory; label: string }[] = [
  { id: 'amount', label: 'টাকা' },
  { id: 'internet', label: 'ইন্টারনেট' },
  { id: 'minute', label: 'মিনিট' },
  { id: 'bundle', label: 'বান্ডেল' },
  { id: 'call-rate', label: 'কল রেট' },
];


export default function RechargeAmount() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  
   const { data, refetch } = useCheckAuthQuery();
    const userData = (data as any)?.data || {};

  // Get params from navigation
  const params = typeof router === 'object' && 'params' in router ? (router as any).params : (router as any)?.getCurrentRoute?.()?.params;
  const { phone: phoneContext } = usePhone();
  const phone = params?.phone || phoneContext;
  const initialSimType = params?.sim_type || 'PRE_PAID';
  const initialNetworkType = params?.network_type || 'GRAMEENPHONE';
  const [simType, setSimType] = useState<SimType>(initialSimType);
  const [activeCategory, setActiveCategory] = useState<AmountCategory>('amount');
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [recharge, { isLoading: isRechargeLoading, isSuccess: isRechargeSuccess, isError: isRechargeError, error: rechargeError }] = useRechargeMutation();
  const [rechargeResult, setRechargeResult] = useState<any>(null);

  const networkType = initialNetworkType;

  const finalAmount = useMemo(() => customAmount || null, [customAmount]);
  const finalPrice = useMemo(() => customAmount ? `BDT: ${customAmount}` : null, [customAmount]);

  const handleCategoryPress = (category: AmountCategory) => {
    setActiveCategory(category);
    const navParams = { phone, network_type: params?.network_type, sim_type: params?.sim_type };
    if (category === 'internet') {
      router.replace({ pathname: '/(app)/recharge/internet', params: navParams });
    } else if (category === 'call-rate') {
      router.replace({ pathname: '/(app)/recharge/call-rate', params: navParams });
    } else if (category === 'minute') {
      router.replace({ pathname: '/(app)/recharge/minute', params: navParams });
    } else if (category === 'bundle') {
      router.replace({ pathname: '/(app)/recharge/bundle', params: navParams });
    }
  };


  const handleProceedPress = () => {

    if (canProceed) {
      setShowDetailsModal(true);
    }
  };

  const handleRecharge = async () => {
    if (!canProceed) return;
    if (!phone) {
      alert('Phone number is required.');
      return;
    }
    let payload: any = {
      sim_type: simType,
      network_type: networkType,
      phone,
    };

    if (customAmount) {
      payload.amount = Number(customAmount);
    }

    // Never send both amount and offerId
    try {
      const result = await recharge(payload).unwrap();
      setRechargeResult(result);
      if (result?.success) {
        await refetch();
        setShowDetailsModal(false);
        alert(result?.message || 'Recharge successful!');
        router.replace('/(tabs)'); // Navigate to home page
      }
    } catch (e: any) {
      // Error handled by isRechargeError
      console.log(e)
      alert(e?.data?.message || 'Recharge failed. Please try again.');
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const canProceed = useMemo(() => finalAmount !== null && finalAmount !== '', [finalAmount]);

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="Mobile Recharge"
        showBack={true}
        onBackPress={handleBackPress}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.screen,
            { flexGrow: 1}
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <RecipientCard name="" phone={phone} />

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

          <View style={{ flex: 1, justifyContent: 'space-between', gap: 5 }}>
            <View >
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
                      placeholder="এখানে পরিমাণ লিখুন..."
                      value={customAmount}
                      onChangeText={(text) => {
                      setCustomAmount(text);
                      if (text !== '') setSelectedOfferId(null);
                      }}
                      keyboardType="numeric"
                      placeholderTextColor="#248AEF"
                      style={styles.customAmountInput}
                    />
                    </View>
                </View>
              )}

              {/*  */}
              <View style={styles.availableBalanceContainer}>
                <ThemedText style={styles.availableBalanceText}>উপলব্ধ ব্যালেন্স: ৳{userData.balance || '0'} টাকা</ThemedText>
              </View>

            </View>
           
          </View>
        </ScrollView>



      </KeyboardAvoidingView>

       {/* <View style={styles.spacer} /> */}
            <View style={{ marginTop: 90 }}>
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
            </View>

      <OfferDetailsModal
        visible={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        recipientName="MD. Mystogan Islam"
        recipientPhone={phone || ''}
        offerTitle={customAmount ? `${customAmount} Amount` : 'N/A'}
        validity={''}
        cashback={undefined}
        price={finalPrice ?? 'BDT: --'}
        availableBalance="20,000 BDT"
        onProceed={handleRecharge}
        loading={isRechargeLoading}
        error={isRechargeError ? (rechargeError?.data?.message || 'Recharge failed') : undefined}
        headerTitle="Recharge Details"
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
  amountSelectionContainer: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  amountButtonsColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  amountButtonActive: {
    borderColor: '#248AEF',
  },
  amountButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
  },
  amountButtonTextActive: {
    color: '#248AEF',
  },
  typeAmountSection: {
    marginTop: 12,
    marginBottom: 8,
  },
  customAmountInput: {
    backgroundColor: '#F8FAFD',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
  },
  availableBalanceContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  availableBalanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#248AEF',
  },
  spacer: {
    height: 1050,
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
    screen: {
        paddingHorizontal: 20
    }
});


