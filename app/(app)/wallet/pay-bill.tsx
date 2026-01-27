import { useGetBillCategoriesQuery, useGetBillersQuery } from '@/api/payBillApi';
import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function PayBill() {
  const router = useRouter();
  const bg = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categoryData, isLoading: isCategoryLoading } = useGetBillCategoriesQuery();
  const categories = categoryData?.data ?? [];

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const { data: billerData, isLoading: isBillerLoading } = useGetBillersQuery(
    { categoryId: selectedCategory || '' },
    { skip: !selectedCategory }
  );
  const billers = billerData?.data ?? [];

  const categoryTitleMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((cat) => {
      map[cat.id] = cat.title;
    });
    return map;
  }, [categories]);

  const handleBackPress = () => router.back();

  // Filter bills by selected category and search query
  const filteredBills = billers.filter((bill) => {
    const matchesSearch = searchQuery
      ? bill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        categoryTitleMap[bill.categoryId]?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesSearch;
  });

  const renderIcon = (iconUri: string, categoryTitle: string, isSelected: boolean = false) => {
    // SVG files won't render with Image component in React Native
    const isSvg = iconUri.toLowerCase().endsWith('.svg');
    const iconColor = isSelected ? '#fff' : tint;

    if (isSvg) {
      // Use fallback icons for SVG files
      let iconName: any = 'document-outline';
      if (categoryTitle.includes('বিদ্যুৎ')) iconName = 'flash';
      else if (categoryTitle.includes('টিভি')) iconName = 'tv';
      else if (categoryTitle.includes('water') || categoryTitle.includes('পানি')) iconName = 'water';
      else if (categoryTitle.includes('গ্যাস')) iconName = 'flame';

      return <Ionicons name={iconName} size={28} color={iconColor} />;
    }

    return (
      <Image
        source={{ uri: iconUri }}
        style={{ width: 28, height: 28 }}
        resizeMode="contain"
      />
    );
  };

  const renderBillerIcon = (iconUri: string, billerName: string) => {
    const isSvg = iconUri.toLowerCase().endsWith('.svg');

    if (isSvg) {
      // Use fallback icons for SVG files
      let iconName: any = 'business-outline';
      if (billerName.toLowerCase().includes('nesco') || billerName.toLowerCase().includes('desco') || 
          billerName.toLowerCase().includes('dpdc') || billerName.toLowerCase().includes('palli')) {
        iconName = 'flash';
      } else if (billerName.toLowerCase().includes('akash') || billerName.toLowerCase().includes('tv')) {
        iconName = 'tv';
      } else if (billerName.toLowerCase().includes('gas') || billerName.toLowerCase().includes('titas')) {
        iconName = 'flame';
      }

      return <Ionicons name={iconName} size={26} color={tint} />;
    }

    return (
      <Image
        source={{ uri: iconUri }}
        style={{ width: 26, height: 26 }}
        resizeMode="contain"
      />
    );
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
            {isCategoryLoading && (
              <ThemedText style={styles.sectionLabel}>লোড হচ্ছে...</ThemedText>
            )}
            {!isCategoryLoading && categories.length === 0 && (
              <ThemedText style={styles.sectionLabel}>কোনো ক্যাটাগরি পাওয়া যায়নি</ThemedText>
            )}
            {!isCategoryLoading && categories.map((category) => {
              const isSelected = selectedCategory === category.id;
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
                    {renderIcon(category.icon, category.title, isSelected)}
                  </View>
                  <ThemedText style={[
                    styles.categoryLabel,
                    isSelected && styles.categoryLabelSelected
                  ]}>
                    {category.title}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Filtered Bills List */}
        <View style={styles.recentBillsSection}>
          <ThemedText style={styles.sectionTitle}>সব প্রতিষ্ঠান</ThemedText>
          {isBillerLoading && (
            <ThemedText style={styles.sectionLabel}>লোড হচ্ছে...</ThemedText>
          )}
          {!isBillerLoading && filteredBills.length === 0 && (
            <ThemedText style={styles.sectionLabel}>কোনো প্রতিষ্ঠান পাওয়া যায়নি</ThemedText>
          )}
          {!isBillerLoading && filteredBills.map((bill) => (
            <TouchableOpacity
              key={bill.id}
              style={[styles.recentBillCard, { backgroundColor: '#fff' }]}
              onPress={() => router.push({
                pathname: '/(app)/wallet/bill-payment',
                params: {
                  institutionName: bill.name,
                  institutionType: categoryTitleMap[bill.categoryId] || 'বিল',
                  categoryId: bill.categoryId,
                  billerId: bill.id,
                }
              })}
            >
              <View style={[styles.recentBillLogo, { backgroundColor: `${tint}15` }]}>
                {renderBillerIcon(bill.icon, bill.name)}
              </View>
              <View style={styles.recentBillInfo}>
                <ThemedText type="defaultSemiBold" style={styles.recentBillName}>
                  {bill.name}
                </ThemedText>
                <ThemedText style={styles.recentBillType}>{categoryTitleMap[bill.categoryId] || ''}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
