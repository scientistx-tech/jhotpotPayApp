import { useCheckAuthQuery } from "@/api/authApi";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

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
  headerTitle = "রিচার্জ বিস্তারিত",
  price,
  onProceed,
}: OfferDetailsModalProps) {
  const tint = useThemeColor({}, "tint");
  const bg = useThemeColor({}, "background");

  const { data } = useCheckAuthQuery();
  const userData = (data as any)?.data || {};

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
              <ThemedText style={[styles.closeBtn, { color: "#FF6B6B" }]}>
                বন্ধ করুন
              </ThemedText>
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
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={styles.metaRow}>
                {offerTitle && (
                  <View style={styles.metaItem}>
                    <View style={styles.dot} />
                    <ThemedText style={styles.metaLabel}>
                      {offerTitle}
                    </ThemedText>
                  </View>
                )}
                {validity && (
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color="#999" />
                    <ThemedText style={styles.metaLabel}>{validity}</ThemedText>
                  </View>
                )}
                {!validity && !offerTitle && (
                  <ThemedText>Recharge Amount</ThemedText>
                )}
              </View>
            </View>

            <ThemedText style={[styles.price, { color: tint }]}>
              {price}
            </ThemedText>
          </View>

          {/* Available Balance */}
          <View
            style={[styles.balanceSection, { backgroundColor: `${tint}08` }]}
          >
            <ThemedText style={styles.balanceLabel}>
              উপলব্ধ ব্যালেন্স
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.balanceAmount}>
              {`৳${userData.balance || "0"} টাকা`}
            </ThemedText>
          </View>

          {/* Proceed Button */}
          <TouchableOpacity
            onPress={onProceed}
            style={[styles.proceedBtn, { backgroundColor: tint }]}
          >
            <ThemedText style={styles.proceedBtnText}>এগিয়ে যান</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",

    // marginBottom: 20,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 30,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#C4CAD4",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  closeBtn: {
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginBottom: 20,
  },
  offerMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
  },
  metaItem: {
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 13,
    opacity: 0.8,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: "#e0e0e0",
  },
  priceSection: {
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "700",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  cardLeft: {
    flex: 1,
  },
  balanceSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    // marginBottom: 20,
    paddingBottom: 35,
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
    justifyContent: "center",
    alignItems: "center",
  },
  proceedBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
