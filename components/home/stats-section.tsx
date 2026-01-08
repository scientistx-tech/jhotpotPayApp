import { ThemedText } from '@/components/themed-text';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type StatItem = {
  id: number;
  amount: string;
  label: string;
  bgColor: string;
  fontSize: number;
};

type Props = {
  firstRowStats: StatItem[];
  secondRowStats: StatItem[];
  sort: 'day' | 'month' | 'year';
  onSortChange: (sort: 'day' | 'month' | 'year') => void;
};

const StatsCard = ({ amount, label, bgColor }: StatItem) => (
  <View style={styles.statsCardItem}>
    <View style={[styles.amountBox, { backgroundColor: '#E3F2FD' }]}>
      <ThemedText style={{ fontSize: 13, fontWeight: '700', color: bgColor }}>
        {amount}
      </ThemedText>
    </View>
    <ThemedText
      style={{
        fontSize: 10,
        color: '#11181C',
        marginTop: 3,
        fontWeight: '500',
        textAlign: 'left',
      }}
    >
      {label}
    </ThemedText>
  </View>
);

export default function StatsSection({ firstRowStats, secondRowStats, sort, onSortChange }: Props) {
  return (
    <View style={styles.section}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <ThemedText type="title" style={{ fontSize: 18, flex: 1 }}>
          আপডেট​
        </ThemedText>
        <View style={styles.sortTabsContainer}>
          {[
            { label: 'দিন', value: 'day' },
            { label: 'মাস', value: 'month' },
            { label: 'বছর', value: 'year' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.value}
              style={[
                styles.sortTab,
                sort === tab.value && styles.sortTabActive,
              ]}
              onPress={() => onSortChange(tab.value as 'day' | 'month' | 'year')}
            >
              <ThemedText style={{ color: sort === tab.value ? '#fff' : '#248AEF', fontWeight: 'bold', fontSize: 14 }}>
                {tab.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.statsWrapper}>
        {/* First Row */}
        <View style={styles.statsRowContainer}>
          {firstRowStats.map((stat) => (
            <StatsCard key={stat.id} {...stat} />
          ))}
        </View>
        {/* Second Row */}
        <View style={[styles.statsRowContainer, { marginTop: 12 }]}>
          {secondRowStats.map((stat) => (
            <StatsCard key={stat.id} {...stat} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  statsRowContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  statsCardItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountBox: {
    backgroundColor: '#248AEF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 70,
  },
  sortTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 2,
    alignItems: 'center',
    marginLeft: 12,
  },
  sortTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 2,
    backgroundColor: 'transparent',
  },
  sortTabActive: {
    backgroundColor: '#248AEF',
  },
});
