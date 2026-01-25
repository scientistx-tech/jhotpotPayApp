import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import React from 'react';

type TabType = 'receipt' | 'token';

export default function ReceiptToken() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');
  const [activeTab, setActiveTab] = React.useState<TabType>('receipt');

  const handleBackPress = () => router.back();

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="রিসিট এবং টোকেন"
        showBack
        onBackPress={handleBackPress}
      />

      {/* Tab Navigation */}
      <View style={[styles.tabContainer, { backgroundColor: '#fff' }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'receipt' && [styles.tabActive, { borderBottomColor: tint }],
          ]}
          onPress={() => setActiveTab('receipt')}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === 'receipt' && [styles.tabTextActive, { color: tint }],
            ]}
          >
            রিসিট
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'token' && [styles.tabActive, { borderBottomColor: tint }],
          ]}
          onPress={() => setActiveTab('token')}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === 'token' && [styles.tabTextActive, { color: tint }],
            ]}
          >
            টোকেন
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'receipt' ? (
          // Receipt Tab Content
          <>
            {/* Receipt Item 1 */}
            <View style={[styles.receiptCard, { backgroundColor: '#fff' }]}>
              <View style={styles.receiptHeader}>
                <View style={[styles.receiptIconContainer, { backgroundColor: `${tint}15` }]}>
                  <Ionicons name="receipt" size={24} color={tint} />
                </View>
                <View style={styles.receiptHeaderInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.receiptTitle}>
                    Palli Bidyut (Prepaid)
                  </ThemedText>
                  <ThemedText style={styles.receiptDate}>শেষ আপডেট: 08/01/26</ThemedText>
                </View>
                <TouchableOpacity>
                  <Ionicons name="download" size={22} color={tint} />
                </TouchableOpacity>
              </View>

              <View style={styles.receiptDetails}>
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailLabel}>মিটার নাম্বার:</ThemedText>
                  <ThemedText style={styles.detailValue}>40510477344</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailLabel}>রিসিট নাম্বার:</ThemedText>
                  <ThemedText style={styles.detailValue}>RCP-2026-001</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailLabel}>পরিমাণ:</ThemedText>
                  <ThemedText style={[styles.detailValue, { color: tint, fontWeight: '600' }]}>
                    ৳500.00
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Receipt Item 2 */}
            <View style={[styles.receiptCard, { backgroundColor: '#fff' }]}>
              <View style={styles.receiptHeader}>
                <View style={[styles.receiptIconContainer, { backgroundColor: `${tint}15` }]}>
                  <Ionicons name="receipt" size={24} color={tint} />
                </View>
                <View style={styles.receiptHeaderInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.receiptTitle}>
                    AKASH Digital TV
                  </ThemedText>
                  <ThemedText style={styles.receiptDate}>শেষ আপডেট: 15/12/25</ThemedText>
                </View>
                <TouchableOpacity>
                  <Ionicons name="download" size={22} color={tint} />
                </TouchableOpacity>
              </View>

              <View style={styles.receiptDetails}>
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailLabel}>গ্রাহক আইডি:</ThemedText>
                  <ThemedText style={styles.detailValue}>TV-123456</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailLabel}>রিসিট নাম্বার:</ThemedText>
                  <ThemedText style={styles.detailValue}>RCP-2025-542</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailLabel}>পরিমাণ:</ThemedText>
                  <ThemedText style={[styles.detailValue, { color: tint, fontWeight: '600' }]}>
                    ৳1,200.00
                  </ThemedText>
                </View>
              </View>
            </View>
          </>
        ) : (
          // Token Tab Content
          <>
            {/* Token Item 1 */}
            <View style={[styles.tokenCard, { backgroundColor: '#fff' }]}>
              <View style={styles.tokenHeader}>
                <View style={[styles.tokenIconContainer, { backgroundColor: `${tint}15` }]}>
                  <Ionicons name="key" size={24} color={tint} />
                </View>
                <View style={styles.tokenHeaderInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.tokenTitle}>
                    Palli Bidyut Token
                  </ThemedText>
                  <ThemedText style={styles.tokenDate}>তৈরি: 08/01/26</ThemedText>
                </View>
                <TouchableOpacity>
                  <Ionicons name="copy" size={22} color={tint} />
                </TouchableOpacity>
              </View>

              <View style={styles.tokenCode}>
                <View style={[styles.tokenCodeBox, { borderColor: tint }]}>
                  <ThemedText style={[styles.tokenCodeText, { color: tint }]}>
                    1234567890123456
                  </ThemedText>
                </View>
              </View>

              <View style={styles.tokenInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={{ marginRight: 8 }} />
                  <ThemedText style={styles.infoText}>সক্রিয়</ThemedText>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="hourglass" size={16} color={tint} style={{ marginRight: 8 }} />
                  <ThemedText style={styles.infoText}>মেয়াদ উত্তীর্ণ: 08/02/26</ThemedText>
                </View>
              </View>
            </View>

            {/* Token Item 2 */}
            <View style={[styles.tokenCard, { backgroundColor: '#fff' }]}>
              <View style={styles.tokenHeader}>
                <View style={[styles.tokenIconContainer, { backgroundColor: `${tint}15` }]}>
                  <Ionicons name="key" size={24} color={tint} />
                </View>
                <View style={styles.tokenHeaderInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.tokenTitle}>
                    AKASH TV Token
                  </ThemedText>
                  <ThemedText style={styles.tokenDate}>তৈরি: 15/12/25</ThemedText>
                </View>
                <TouchableOpacity>
                  <Ionicons name="copy" size={22} color={tint} />
                </TouchableOpacity>
              </View>

              <View style={styles.tokenCode}>
                <View style={[styles.tokenCodeBox, { borderColor: tint }]}>
                  <ThemedText style={[styles.tokenCodeText, { color: tint }]}>
                    9876543210987654
                  </ThemedText>
                </View>
              </View>

              <View style={styles.tokenInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="alert-circle" size={16} color="#FF9800" style={{ marginRight: 8 }} />
                  <ThemedText style={styles.infoText}>শীঘ্রই মেয়াদ উত্তীর্ণ হবে</ThemedText>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="hourglass" size={16} color={tint} style={{ marginRight: 8 }} />
                  <ThemedText style={styles.infoText}>মেয়াদ উত্তীর্ণ: 20/01/26</ThemedText>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.6,
  },
  tabTextActive: {
    opacity: 1,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  // Receipt Styles
  receiptCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  receiptIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptHeaderInfo: {
    flex: 1,
    gap: 3,
  },
  receiptTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  receiptDate: {
    fontSize: 11,
    opacity: 0.6,
  },
  receiptDetails: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Token Styles
  tokenCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tokenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tokenIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenHeaderInfo: {
    flex: 1,
    gap: 3,
  },
  tokenTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  tokenDate: {
    fontSize: 11,
    opacity: 0.6,
  },
  tokenCode: {
    marginVertical: 16,
  },
  tokenCodeBox: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenCodeText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  tokenInfo: {
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
