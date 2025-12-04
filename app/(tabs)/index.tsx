import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useThemeColor } from '@/hooks/use-theme-color'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
  const tint = useThemeColor({}, 'tint')

  const walletItems = [
    { id: 1, icon: 'wallet-plus', label: 'Add Balance', color: '#248AEF' },
    { id: 2, icon: 'cash-multiple', label: 'Cash Out', color: '#FF6B6B' },
    { id: 3, icon: 'phone', label: 'Recharge', color: '#FFD93D' },
    { id: 4, icon: 'receipt', label: 'Pay Bill', color: '#6BCB77' },
    { id: 5, icon: 'qrcode', label: 'PIN Change', color: '#4D96FF' },
    { id: 6, icon: 'history', label: 'History', color: '#9B59B6' },
  ]

  const tollKhataItems = [
    { id: 1, icon: 'store', label: 'দোকান খোলা', color: '#248AEF' },
    { id: 2, icon: 'file-document', label: 'ডেটা হিসাব', color: '#FF6B6B' },
    { id: 3, icon: 'account-multiple', label: 'সাথীদের সাথে', color: '#FFD93D' },
    { id: 4, icon: 'receipt', label: 'Pay Bill', color: '#6BCB77' },
    { id: 5, icon: 'account-voice', label: 'অংশীদারি', color: '#4D96FF' },
    { id: 6, icon: 'history', label: 'History', color: '#9B59B6' },
  ]

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.headerContainer, { backgroundColor: tint }]}>
          <View style={styles.headerContent}>
            <View>
              <ThemedText style={{ color: '#fff', fontSize: 14 }}>স্বাগতম আবার!</ThemedText>
              <ThemedText type='defaultSemiBold' style={{ color: '#fff', fontSize: 20 }}>Omul Ahmed</ThemedText>
              <ThemedText style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Top for Shubaera</ThemedText>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconBtn}>
                <FontAwesome6 name='bell' size={20} color='#fff' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <FontAwesome6 name='share' size={20} color='#fff' />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold', color: tint }}>500 TK</ThemedText>
            <ThemedText style={{ fontSize: 12, color: '#666' }}>Total Recharge</ThemedText>
          </View>
          <View style={styles.statsCard}>
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold', color: tint }}>100 TK</ThemedText>
            <ThemedText style={{ fontSize: 12, color: '#666' }}>Total Commission</ThemedText>
          </View>
        </View>

        {/* Transaction Status */}
        <View style={styles.transactionStatus}>
          <View style={styles.statusItem}>
            <ThemedText style={{ fontSize: 12, color: '#4CAF50' }}>প্রসেস হোক</ThemedText>
            <ThemedText type='defaultSemiBold' style={{ fontSize: 16 }}>100 TK</ThemedText>
          </View>
          <View style={styles.statusDivider} />
          <View style={styles.statusItem}>
            <ThemedText style={{ fontSize: 12, color: '#FF6B6B' }}>বাতিল হোক</ThemedText>
            <ThemedText type='defaultSemiBold' style={{ fontSize: 16 }}>200 TK</ThemedText>
          </View>
          <View style={styles.statusDivider} />
          <View style={styles.statusItem}>
            <ThemedText style={{ fontSize: 12, color: '#FFD93D' }}>লেনদেন চলছে</ThemedText>
            <ThemedText type='defaultSemiBold' style={{ fontSize: 16 }}>50 TK</ThemedText>
          </View>
        </View>

        {/* Banner Slider */}
        <View style={styles.bannerContainer}>
          <View style={[styles.banner, { backgroundColor: tint }]}>
            <ThemedText style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
              BANNER SLIDER
            </ThemedText>
          </View>
        </View>

        {/* Wallet Section */}
        <View style={styles.section}>
          <ThemedText type='title' style={{ fontSize: 18, marginBottom: 16 }}>Wallet Section</ThemedText>
          <View style={styles.gridContainer}>
            {walletItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <View style={[styles.iconCircle ,{ backgroundColor: `${item.color}20` }]}>
                  <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                </View>
                <ThemedText style={{ fontSize: 12, marginTop: 8, textAlign: 'center' }}>
                  {item.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Toll Khata Section */}
        <View style={styles.section}>
          <ThemedText type='title' style={{ fontSize: 18, marginBottom: 16 }}>Toll Khata Section</ThemedText>
          <View style={styles.gridContainer}>
            {tollKhataItems.map((item) => (
              <TouchableOpacity key={item.id}  style={styles.gridItem}>
                <View style={[styles.iconCircle, { backgroundColor: `${item.color}20` }]}>
                  <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                </View>
                <ThemedText style={{ fontSize: 12, marginTop: 8, textAlign: 'center' }}>
                  {item.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity style={[styles.fab, { backgroundColor: tint }]}>
          <FontAwesome6 name='comment' size={24} color='#fff' />
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionStatus: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
  },
  statusDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  banner: {
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    paddingVertical: 12,

  },
  gridItem: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
})