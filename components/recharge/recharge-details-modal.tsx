import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

export type RechargeDetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  recipientName: string;
  recipientPhone: string;
  amount: string;
  onProceed?: () => void;
  availableBalance?: string;
};

export default function RechargeDetailsModal({
  visible,
  onClose,
  recipientName,
  recipientPhone,
  amount,
  onProceed,
  availableBalance = '20,000 BDT',
}: RechargeDetailsModalProps) {
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
            <ThemedText style={styles.headerTitle}>Recharge Details</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={[styles.closeBtn, { color: '#FF6B6B' }]}>Close</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Recipient Info */}
          <View style={styles.section}>
            <View style={styles.recipientCard}>
              <View style={[styles.avatarPlaceholder, { backgroundColor: `${tint}20` }]}>
                <Ionicons name="person" size={24} color={tint} />
              </View>

              <View style={styles.recipientInfo}>
                <ThemedText type="defaultSemiBold" style={styles.recipientName}>
                  {recipientName}
                </ThemedText>
                <ThemedText style={styles.recipientPhone}>{recipientPhone}</ThemedText>
              </View>

              <TouchableOpacity style={[styles.editBtn, { backgroundColor: `${tint}15` }]}>
                <Ionicons name="network" size={16} color={tint} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Amount Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Amount</ThemedText>
            <ThemedText type="defaultSemiBold" style={[styles.amountText, { color: tint }]}>
              {amount}
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeBtn: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
  },
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    gap: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 14,
    marginBottom: 4,
  },
  recipientPhone: {
    fontSize: 12,
    opacity: 0.7,
  },
  editBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
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
