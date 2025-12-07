import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

export type CallRateDetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  rate: string;
  validity: string;
  price: string;
  isNew?: boolean;
  availableBalance?: string;
  onProceed?: () => void;
};

export default function CallRateDetailsModal({
  visible,
  onClose,
  rate,
  validity,
  price,
  isNew,
  availableBalance = '20,000 BDT',
  onProceed,
}: CallRateDetailsModalProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: bg }]}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>Offer Details</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={[styles.closeBtn, { color: '#FF6B6B' }]}>Close</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Offer card */}
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              {isNew ? (
                <View style={[styles.badge, { backgroundColor: `${tint}15` }]}> 
                  <ThemedText style={[styles.badgeText, { color: tint }]}>New Offer</ThemedText>
                </View>
              ) : null}

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <View style={styles.dot} />
                  <ThemedText style={styles.metaLabel}>{rate}</ThemedText>
                </View>

                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={16} color="#999" />
                  <ThemedText style={styles.metaLabel}>{validity}</ThemedText>
                </View>
              </View>
            </View>

            <ThemedText style={[styles.price, { color: tint }]}>{price}</ThemedText>
          </View>

          {/* Available Balance */}
          <View style={styles.balanceContainer}>
            <ThemedText style={styles.balanceText}>Available Balance: {availableBalance}</ThemedText>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Proceed Button */}
          <TouchableOpacity
            onPress={onProceed}
            style={[styles.proceedBtn, { backgroundColor: tint }]}
          >
            <ThemedText style={styles.proceedBtnText}>Proceed</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 24,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9EA5B1',
  },
  closeBtn: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  cardLeft: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#C4CAD4',
  },
  metaLabel: {
    fontSize: 13,
    color: '#7B8291',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  },
  balanceContainer: {
    marginTop: 16,
  },
  balanceText: {
    fontSize: 12,
    color: '#7B8291',
  },
  divider: {
    marginVertical: 16,
    height: 1,
    backgroundColor: '#E5E8ED',
  },
  proceedBtn: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
