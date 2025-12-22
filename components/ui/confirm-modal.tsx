import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

export interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

export default function ConfirmModal({ visible, onClose, onConfirm, message }: ConfirmModalProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: bg }]}>  
          <ThemedText style={styles.message}>{message || 'Are you sure?'}</ThemedText>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#E3E7ED' }]} onPress={onClose}>
              <ThemedText style={[styles.buttonText, { color: '#11181C' }]}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: tint }]} onPress={onConfirm}>
              <ThemedText style={styles.buttonText}>Delete</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
