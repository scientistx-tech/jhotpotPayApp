import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

export type OfferDetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  recipientName: string;
  recipientPhone: string;
  offerTitle: string;
  validity: string;
  cashback?: string;
  price: string;
  onProceed?: () => void;
  availableBalance?: string;
  headerTitle?: string;
};

export default function OfferDetailsModal({
  visible,
  onClose,
  recipientName,
  recipientPhone,
  offerTitle,
  validity,
  cashback,
  headerTitle="Offer Details",
  price,
  onProceed,
  availableBalance = '20,000 BDT',
}: OfferDetailsModalProps) {
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
            <ThemedText style={styles.headerTitle}>{headerTitle}</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={[styles.closeBtn, { color: '#FF6B6B' }]}>Close</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Offer Details Section */}
          <View style={styles.section}>
            <View style={styles.offerMetaRow}>
              {/* <View style={styles.metaItem}>
                <ThemedText style={styles.metaLabel}>30 GB</ThemedText>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <ThemedText style={styles.metaLabel}>30 Days</ThemedText>
              </View> */}
              {cashback && (
                <>
                  <View style={styles.metaDivider} />
                  <View style={styles.metaItem}>
                    <ThemedText style={styles.metaLabel}>{cashback}</ThemedText>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <ThemedText type="defaultSemiBold" style={[styles.priceText, { color: tint }]}>
              {price}
            </ThemedText>
          </View>

          {/* Available Balance */}
          <View style={[styles.balanceSection, { backgroundColor: `${tint}08` }]}>
            <ThemedText style={styles.balanceLabel}>Available Balance</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.balanceAmount}>
              {availableBalance}
            </ThemedText>
          </View>

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
    
    // marginBottom: 20,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 30,
    maxHeight: '85%',
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeBtn: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  offerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 13,
    opacity: 0.8,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#e0e0e0',
  },
  priceSection: {
    marginBottom: 20,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '700',
  },
  balanceSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 16,
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
