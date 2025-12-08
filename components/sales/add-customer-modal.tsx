import FormInput from '@/components/form-input';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { customerSchema } from '@/schemas/authSchema';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export type AddCustomerModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (customer: { name: string; email: string; phone: string; address: string }) => void;
};

export default function AddCustomerModal({ visible, onClose, onSave }: AddCustomerModalProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  const onSubmit = (data: any) => {
    onSave({ 
      name: data.name, 
      email: data.email || '', 
      phone: data.phone, 
      address: data.address 
    });
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: bg }]}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>Add New Customer</ThemedText>
            <TouchableOpacity onPress={handleClose} style={[styles.closeBtn, { backgroundColor: tint }]}>
              <MaterialCommunityIcons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 20 }}>
            <FormInput 
              name="name" 
              control={control} 
              label="গ্রাহক নাম" 
              placeholder="গ্রাহক নাম দিন"
            />

            <FormInput
              name="phone"
              control={control}
              label="মোবাইল নম্বর"
              placeholder="মোবাইল নম্বর দিন"
              keyboardType="phone-pad"
            />

            <FormInput
              name="email"
              control={control}
              label="ইমেইল (ঐচ্ছিক)"
              placeholder="ইমেইল দিন"
              keyboardType="email-address"
            />

            <FormInput
              name="address"
              control={control}
              label="ঠিকানা"
              placeholder="ঠিকানা দিন"
            />

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={[styles.saveBtn, { backgroundColor: tint }]}
            >
              <ThemedText style={styles.saveBtnText}>Save Customer</ThemedText>
            </TouchableOpacity>
          </ScrollView>
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
    maxHeight: '90%',
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
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
