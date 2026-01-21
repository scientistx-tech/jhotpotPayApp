import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, } from 'react-native';
import { useCreateContactMutation } from '../../api/contactApi';

export default function ContactUsPage() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [createContact] = useCreateContactMutation();

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phoneNumber') {
      setFormData((prev) => ({
        ...prev,
        phone: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.message) {
      alert('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।');
      return;
    }
    try {
      const payload: any = {
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      };
      if (formData.email && formData.email.trim() !== "") {
        payload.email = formData.email;
      }
      const res = await createContact(payload).unwrap();
      console.log({ res });
      alert('আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Error submitting contact form:', err);
      alert('বার্তা পাঠাতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={tint} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>যোগাযোগ করুন</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.screen,
            { flexGrow: 1, paddingTop: 50 }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Get In Touch Section */}
          <View style={[styles.card, { backgroundColor: bg }]}>
            <ThemedText style={styles.sectionTitle}>যোগাযোগ করুন</ThemedText>

            {/* Your Name */}
            <View style={styles.fieldGroup}>
              <ThemedText style={styles.fieldLabel}>আপনার নাম</ThemedText>
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                placeholder="আপনার নাম লিখুন"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholderTextColor="#999"
              />
            </View>

            {/* Your Email */}
            <View style={styles.fieldGroup}>
              <ThemedText style={styles.fieldLabel}>আপনার ইমেইল (ঐচ্ছিক)</ThemedText>
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                placeholder="আপনার ইমেইল লিখুন (ঐচ্ছিক)"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>

            {/* Phone Number */}
            <View style={styles.fieldGroup}>
              <ThemedText style={styles.fieldLabel}>ফোন নম্বর</ThemedText>
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                placeholder="আপনার ফোন নম্বর লিখুন"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>

            {/* Your Message */}
            <View style={styles.fieldGroup}>
              <ThemedText style={styles.fieldLabel}>আপনার বার্তা</ThemedText>
              <TextInput
                style={[styles.messageInput, { color: '#11181C', borderColor: tint }]}
                placeholder="আপনার বার্তা লিখুন"
                value={formData.message}
                onChangeText={(value) => handleInputChange('message', value)}
                multiline
                numberOfLines={5}
                placeholderTextColor="#999"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: tint }]}
              onPress={handleSubmit}
            >
              <ThemedText style={styles.submitButtonText}>জমা দিন</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
   screen: {
        paddingHorizontal: 20
    },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#248AEF',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8ED',
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 8,
  },
  fieldInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#F8FAFD',
  },
  messageInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#F8FAFD',
    textAlignVertical: 'top',
    height: 120,
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
