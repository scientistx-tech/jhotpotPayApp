import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type BillCategory = {
  id: string;
  label: string;
  icon: string;
  iconType: 'ionicons' | 'material' | 'material-community';
};

const BILL_CATEGORIES: BillCategory[] = [
  { id: 'electricity', label: 'বিদ্যুৎ', icon: 'flash', iconType: 'ionicons' },
  { id: 'gas', label: 'গ্যাস', icon: 'gas-cylinder', iconType: 'material-community' },
  { id: 'tv', label: 'টিভি', icon: 'tv', iconType: 'ionicons' },

];

type BillInstitution = {
  id: string;
  name: string;
  nameEn: string;
  type: string;
  categoryId: string;
  meterId?: string;
  icon: string;
};

const RECENT_BILLS: BillInstitution[] = [
  // Electricity
  {
    id: '1',
    name: 'বিদ্যুৎ',
    nameEn: 'Palli Bidyut (Prepaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    meterId: '40510477344',
    icon: 'flash',
  },
  {
    id: '2',
    name: 'বিদ্যুৎ',
    nameEn: 'Palli Bidyut (Postpaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
  {
    id: '3',
    name: 'বিদ্যুৎ',
    nameEn: 'DESCO (Prepaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
  {
    id: '4',
    name: 'বিদ্যুৎ',
    nameEn: 'DESCO (Postpaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
  {
    id: '5',
    name: 'বিদ্যুৎ',
    nameEn: 'DPDC (Prepaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
  {
    id: '6',
    name: 'বিদ্যুৎ',
    nameEn: 'DPDC (Postpaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
  {
    id: '68',
    name: 'বিদ্যুৎ',
    nameEn: 'DPDC (Miscellaneous)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
  {
    id: '8',
    name: 'বিদ্যুৎ',
    nameEn: 'NESCO (Prepaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
   {
    id: '9',
    name: 'বিদ্যুৎ',
    nameEn: 'NESCO (Postpaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
   {
    id: '10',
    name: 'বিদ্যুৎ',
    nameEn: 'BPDB (Postpaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
   {
    id: '11',
    name: 'বিদ্যুৎ',
    nameEn: 'BPDB (Prepaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
   {
    id: '12',
    name: 'বিদ্যুৎ',
    nameEn: 'BPDB (Prepaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
   {
    id: '132',
    name: 'বিদ্যুৎ',
    nameEn: 'BPDB (Miscellaneous)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
   {
    id: '13',
    name: 'বিদ্যুৎ',
    nameEn: 'Westzone (Prepaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
   {
    id: '888',
    name: 'বিদ্যুৎ',
    nameEn: 'Westzone (Postpaid)',
    type: 'বিদ্যুৎ',
    categoryId: 'electricity',
    icon: 'flash',
  },
  // TV
  {
    id: '7',
    name: 'টিভি',
    nameEn: 'AKASH Digital TV',
    type: 'টিভি',
    categoryId: 'tv',
    icon: 'tv',
  },
 //gas
 {
    id: '14',
    name: 'গ্যাস',
    nameEn: 'Titas Gas Postpaid(Non-metered)',
    type: 'গ্যাস',
    categoryId: 'gas',
    icon: 'gas-cylinder',
 },
 {
    id: '15',
    name: 'গ্যাস',
    nameEn: 'Titas Gas Postpaid(Metered)',
    type: 'গ্যাস',
    categoryId: 'gas',
    icon: 'gas-cylinder',
 },
 {
    id: '16',
    name: 'গ্যাস',
    nameEn: 'Karnaphuli Gas',
    type: 'গ্যাস',
    categoryId: 'gas',
    icon: 'gas-cylinder',
 },
 {
    id: '17',
    name: 'গ্যাস',
    nameEn: 'Pashchimanchal Gas',
    type: 'গ্যাস',
    categoryId: 'gas',
    icon: 'gas-cylinder',
 },
 {
    id: '18',
    name: 'গ্যাস',
    nameEn: 'Jalalabad Gas',
    type: 'গ্যাস',
    categoryId: 'gas',
    icon: 'gas-cylinder',
 },
 {
    id: '19',
    name: 'গ্যাস',
    nameEn: 'Bakhrabad Gas',
    type: 'গ্যাস',
    categoryId: 'gas',
    icon: 'gas-cylinder',
 },
 {
    id: '8888',
    name: 'গ্যাস',
    nameEn: 'Sundarban Gas',
    type: 'গ্যাস',
    categoryId: 'gas',
    icon: 'gas-cylinder',
 },
 {
    id: '20',
    name: 'গ্যাস',
    nameEn: 'Orange Energy Gas Ltd(Metered)',
    type: 'গ্যাস',
    categoryId: 'gas',
    icon: 'gas-cylinder',
 },
 {
    id: '21',
    name: 'গ্যাস',
    nameEn: 'Universal Energy Gas Ltd',
    type: 'গ্যাস',
    categoryId: 'gas',
    icon: 'gas-cylinder',
 },
];

export default function PayBill() {
  const router = useRouter();
  const bg = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleBackPress = () => router.back();

  // Filter bills by selected category and search query
  const filteredBills = RECENT_BILLS.filter(bill => {
    const matchesCategory = selectedCategory
      ? bill.categoryId === selectedCategory
      : bill.categoryId === 'electricity'; // Default to electricity
    
    const matchesSearch = searchQuery
      ? bill.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.name.includes(searchQuery) ||
        bill.type.includes(searchQuery)
      : true;
    
    return matchesCategory && matchesSearch;
  });

  const renderIcon = (category: BillCategory, isSelected: boolean = false) => {
    const iconColor = isSelected ? '#fff' : tint;
    const iconProps = { size: 28, color: iconColor };
    
    if (category.iconType === 'material') {
      return <MaterialIcons name={category.icon as any} {...iconProps} />;
    } else if (category.iconType === 'material-community') {
      return <MaterialCommunityIcons name={category.icon as any} {...iconProps} />;
    } else {
      return <Ionicons name={category.icon as any} {...iconProps} />;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="পে বিল"
        showBack
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Section */}
        <View style={[styles.searchSection, { backgroundColor: '#fff' }]}>
          <ThemedText style={styles.sectionLabel}>প্রতিষ্ঠান খুঁজুন</ThemedText>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="প্রতিষ্ঠানের নাম বা ধরন দিন"
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity>
              <Ionicons name="arrow-forward" size={18} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* My Institution Section */}
        <View style={[styles.myInstitutionSection, { backgroundColor: '#fff' }]}>
         

        

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/(app)/wallet/receipt-token')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: `${tint}15` }]}>
                <Ionicons name="receipt-outline" size={32} color={tint} />
              </View>
              <ThemedText style={styles.actionButtonText}>রিসিট এবং{'\n'}টোকেন</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/(app)/wallet/bill-details')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: `${tint}15` }]}>
                <Ionicons name="stats-chart-outline" size={32} color={tint} />
              </View>
              <ThemedText style={styles.actionButtonText}>পে বিল বিবরণী</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* All Institutions Section */}
        <View style={[styles.allInstitutionsSection, { backgroundColor: '#fff' }]}>
          <ThemedText style={styles.sectionTitle}>প্রতিষ্ঠানের ধরন</ThemedText>
          
          <View style={styles.categoriesGrid}>
            {BILL_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id || (selectedCategory === null && category.id === 'electricity');
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    isSelected && styles.categoryItemSelected,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <View style={[
                    styles.categoryIconContainer,
                    { backgroundColor: isSelected ? tint : '#FFF0F5' }
                  ]}>
                    {renderIcon(category, isSelected)}
                  </View>
                  <ThemedText style={[
                    styles.categoryLabel,
                    isSelected && styles.categoryLabelSelected
                  ]}>
                    {category.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Filtered Bills List */}
        {filteredBills.length > 0 && (
          <View style={styles.recentBillsSection}>
            <ThemedText style={styles.sectionTitle}>সব প্রতিষ্ঠান</ThemedText>
            {filteredBills.map((bill) => (
              <TouchableOpacity
                key={bill.id}
                style={[styles.recentBillCard, { backgroundColor: '#fff' }]}
                onPress={() => router.push({
                  pathname: '/(app)/wallet/bill-payment',
                  params: {
                    institutionName: bill.nameEn,
                    institutionType: bill.type,
                    categoryId: bill.categoryId,
                  }
                })}
              >
                <View style={[styles.recentBillLogo, { backgroundColor: `${tint}15` }]}>
                  <Ionicons name={bill.icon as any} size={20} color={tint} />
                </View>
                <View style={styles.recentBillInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.recentBillName}>
                    {bill.nameEn}
                  </ThemedText>
                  <ThemedText style={styles.recentBillType}>{bill.type}</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 1,
  },
  sectionLabel: {
    fontSize: 13,
    marginBottom: 10,
    opacity: 0.6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  myInstitutionSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    marginBottom: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  manageLink: {
    fontSize: 12,
    fontWeight: '600',
  },
  institutionCard: {
    borderRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 0,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  institutionLogo: {
    width: 44,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  institutionInfo: {
    flex: 1,
    gap: 3,
  },
  institutionName: {
    fontSize: 14,
    fontWeight: '600',
  },
  institutionMeta: {
    fontSize: 11,
    opacity: 0.6,
  },
  institutionDate: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 15,
  },
  allInstitutionsSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    marginBottom: 1,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '23%',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  categoryItemSelected: {
    // Selected state indicator
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  categoryLabelSelected: {
    fontWeight: '700',
    color: '#248AEF',
  },
  recentBillsSection: {
    paddingVertical: 10,
        paddingHorizontal: 20,
  },
  recentBillCard: {
    marginHorizontal: 0,
    marginTop: 0,
    borderRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recentBillLogo: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  recentBillInfo: {
    flex: 1,
    gap: 3,
  },
  recentBillName: {
    fontSize: 14,
    fontWeight: '600',
  },
  recentBillType: {
    fontSize: 11,
    opacity: 0.6,
  },
});
