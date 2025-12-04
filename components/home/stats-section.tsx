import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
        marginTop: 10,
        fontWeight: '500',
        textAlign: 'center',
      }}
    >
      {label}
    </ThemedText>
  </View>
);

export default function StatsSection({ firstRowStats, secondRowStats }: Props) {
  return (
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
  );
}

const styles = StyleSheet.create({
  statsWrapper: {
    marginHorizontal: 16,
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statsRowContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  statsCardItem: {
    flex: 1,
    alignItems: 'center',
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
});
