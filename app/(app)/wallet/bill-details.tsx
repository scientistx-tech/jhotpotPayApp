import RechargeHeader from '@/components/recharge/recharge-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BillDetails() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const handleBackPress = () => router.back();

  // Sample data for the bar chart
  const chartData = [
    { month: 'Oct \'25', value: 1000 },
    { month: 'Nov \'25', value: 500 },
    { month: 'Dec \'25', value: 550 },
    { month: 'Jan \'26', value: 500 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="পে বিল বিবরণী"
        showBack
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Range Section */}
        <View style={[styles.section, { backgroundColor: '#fff' }]}>
          <View style={styles.dateHeader}>
            <ThemedText style={styles.dateLabel}>বিবরণিত</ThemedText>
            <TouchableOpacity style={styles.dateButton}>
              <Ionicons name="calendar" size={20} color={tint} style={{ marginRight: 8 }} />
              <ThemedText style={[styles.dateButtonText, { color: tint }]}>গত ১২ মাস</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.dateUpdateInfo}>
            <ThemedText style={styles.dateUpdateLabel}>শেষ আপডেট: 02:00am 25/01/26</ThemedText>
          </View>
        </View>

        {/* Total Cost Section */}
        <View style={[styles.section, { backgroundColor: '#fff' }]}>
          <ThemedText style={styles.sectionLabel}>মোট খরচ</ThemedText>
          
          <View style={styles.costDisplay}>
            <ThemedText style={[styles.totalCost, { color: tint }]}>৳7,000.00</ThemedText>
          </View>

          <View style={styles.comparisonRow}>
            <Ionicons name="arrow-up" size={18} color="#FF4444" style={{ marginRight: 6 }} />
            <ThemedText style={styles.comparisonText}>
              পূর্বর্তী ১২ মাস <ThemedText style={[styles.comparisonAmount, { color: tint }]}>৳5,000.00</ThemedText>
            </ThemedText>
          </View>
        </View>

        {/* Chart Section */}
        <View style={[styles.section, { backgroundColor: '#fff' }]}>
          <View style={styles.chartContainer}>
            <View style={styles.chartYAxis}>
              <ThemedText style={styles.yAxisLabel}>৳1500</ThemedText>
              <ThemedText style={styles.yAxisLabel}>৳1200</ThemedText>
              <ThemedText style={styles.yAxisLabel}>৳900</ThemedText>
              <ThemedText style={styles.yAxisLabel}>৳600</ThemedText>
              <ThemedText style={styles.yAxisLabel}>৳300</ThemedText>
            </View>

            <View style={styles.chart}>
              <View style={styles.chartBars}>
                {chartData.map((data, index) => {
                  const height = (data.value / maxValue) * 220;
                  return (
                    <View key={index} style={styles.barContainer}>
                      <View
                        style={[
                          styles.bar,
                          {
                            height,
                            backgroundColor: tint,
                          },
                        ]}
                      />
                      <ThemedText style={styles.barLabel}>{data.month}</ThemedText>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Bill Type Section */}
        <View style={[styles.section, { backgroundColor: '#fff' }]}>
          <ThemedText style={styles.sectionLabel}>বিলের ধরন</ThemedText>

          <View style={styles.billTypeList}>
            <View style={styles.billTypeItem}>
              <View style={[styles.billTypeIcon, { backgroundColor: `${tint}15` }]}>
                <Ionicons name="flash" size={24} color={tint} />
              </View>
              <View style={styles.billTypeInfo}>
                <ThemedText style={styles.billTypeName}>বিদ্যুৎ</ThemedText>
                <ThemedText style={styles.billTypeAmount}>৳4,500.00</ThemedText>
              </View>
            </View>

            <View style={styles.billTypeItem}>
              <View style={[styles.billTypeIcon, { backgroundColor: `${tint}15` }]}>
                <Ionicons name="tv" size={24} color={tint} />
              </View>
              <View style={styles.billTypeInfo}>
                <ThemedText style={styles.billTypeName}>টিভি</ThemedText>
                <ThemedText style={styles.billTypeAmount}>৳1,200.00</ThemedText>
              </View>
            </View>

            <View style={styles.billTypeItem}>
              <View style={[styles.billTypeIcon, { backgroundColor: `${tint}15` }]}>
                <Ionicons name="wifi" size={24} color={tint} />
              </View>
              <View style={styles.billTypeInfo}>
                <ThemedText style={styles.billTypeName}>ইন্টারনেট</ThemedText>
                <ThemedText style={styles.billTypeAmount}>৳1,300.00</ThemedText>
              </View>
            </View>
          </View>
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
  section: {
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
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f5f7fb',
  },
  dateButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  dateUpdateInfo: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  dateUpdateLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  costDisplay: {
    marginVertical: 16,
  },
  totalCost: {
    fontSize: 36,
    fontWeight: '700',
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  comparisonText: {
    fontSize: 13,
    opacity: 0.7,
  },
  comparisonAmount: {
    fontWeight: '700',
    marginLeft: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    marginTop: 16,
    height: 260,
  },
  chartYAxis: {
    width: 50,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 10,
    opacity: 0.6,
  },
  chart: {
    flex: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#e0e0e0',
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  bar: {
    width: 32,
    borderRadius: 16,
  },
  barLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  billTypeList: {
    gap: 12,
    marginTop: 12,
  },
  billTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  billTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  billTypeInfo: {
    flex: 1,
    gap: 4,
  },
  billTypeName: {
    fontSize: 14,
    fontWeight: '600',
  },
  billTypeAmount: {
    fontSize: 13,
    opacity: 0.7,
  },
});
