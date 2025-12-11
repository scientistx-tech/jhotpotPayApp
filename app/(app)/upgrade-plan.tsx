import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function UpgradePlanPage() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const [formData, setFormData] = useState({
    selectedPackage: '',
    selectedAgent: '',
    amountField: '',
    transactionId: '',
    name: '',
    phoneNumber: '',
    email: '',
    description: '',
  });

  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  const packages = ['Basic Plan', 'Premium Plan', 'Enterprise Plan'];
  const agents = ['Agent 1', 'Agent 2', 'Agent 3'];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDropdown = (field: string) => {
    setExpandedDropdown(expandedDropdown === field ? null : field);
  };

  const selectOption = (field: string, value: string) => {
    handleInputChange(field, value);
    setExpandedDropdown(null);
  };

  const handleConfirm = () => {
    console.log('Upgrade plan submitted:', formData);
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
        <ThemedText style={styles.headerTitle}>Upgrade Plan</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Select Package */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Select Package</ThemedText>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => toggleDropdown('selectedPackage')}
          >
            <ThemedText style={styles.dropdownText}>
              {formData.selectedPackage || 'Select a package'}
            </ThemedText>
            <Ionicons
              name={expandedDropdown === 'selectedPackage' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={tint}
            />
          </TouchableOpacity>
          {expandedDropdown === 'selectedPackage' && (
            <View style={styles.dropdownMenu}>
              {packages.map((pkg) => (
                <TouchableOpacity
                  key={pkg}
                  style={styles.dropdownOption}
                  onPress={() => selectOption('selectedPackage', pkg)}
                >
                  <ThemedText style={styles.dropdownOptionText}>{pkg}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Select Agent */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Select Agent</ThemedText>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => toggleDropdown('selectedAgent')}
          >
            <ThemedText style={styles.dropdownText}>
              {formData.selectedAgent || 'Select an agent'}
            </ThemedText>
            <Ionicons
              name={expandedDropdown === 'selectedAgent' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={tint}
            />
          </TouchableOpacity>
          {expandedDropdown === 'selectedAgent' && (
            <View style={styles.dropdownMenu}>
              {agents.map((agent) => (
                <TouchableOpacity
                  key={agent}
                  style={styles.dropdownOption}
                  onPress={() => selectOption('selectedAgent', agent)}
                >
                  <ThemedText style={styles.dropdownOptionText}>{agent}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Amount Field */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Amount Field</ThemedText>
          <TextInput
            style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
            placeholder="Enter amount"
            value={formData.amountField}
            onChangeText={(value) => handleInputChange('amountField', value)}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Transaction ID */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Transaction ID</ThemedText>
          <TextInput
            style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
            placeholder="Enter transaction ID"
            value={formData.transactionId}
            onChangeText={(value) => handleInputChange('transactionId', value)}
          />
        </View>

        {/* Name */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Name</ThemedText>
          <TextInput
            style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
        </View>

        {/* Phone Number */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Phone Number</ThemedText>
          <TextInput
            style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Email (Optional) */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Email (Optional)</ThemedText>
          <TextInput
            style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
            placeholder="Enter email address"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
          />
        </View>

        {/* Description */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Description</ThemedText>
          <TextInput
            style={[styles.descriptionInput, { color: '#11181C', borderColor: tint }]}
            placeholder="Enter description"
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Plan & Coverage */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Plan & Coverage</ThemedText>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => toggleDropdown('planCoverage')}
          >
            <ThemedText style={styles.dropdownText}>Select coverage type</ThemedText>
            <Ionicons
              name={expandedDropdown === 'planCoverage' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={tint}
            />
          </TouchableOpacity>
          {expandedDropdown === 'planCoverage' && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownOption}>
                <ThemedText style={styles.dropdownOptionText}>Comprehensive Coverage</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownOption}>
                <ThemedText style={styles.dropdownOptionText}>Basic Coverage</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownOption}>
                <ThemedText style={styles.dropdownOptionText}>Extended Coverage</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Charges */}
        <View style={{ marginBottom: 16 }} >
          <ThemedText style={styles.fieldLabel}>Charges</ThemedText>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => toggleDropdown('charges')}
          >
            <ThemedText style={styles.dropdownText}>View charges</ThemedText>
            <Ionicons
              name={expandedDropdown === 'charges' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={tint}
            />
          </TouchableOpacity>
          {expandedDropdown === 'charges' && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownOption}>
                <ThemedText style={styles.dropdownOptionText}>Standard Charges</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownOption}>
                <ThemedText style={styles.dropdownOptionText}>Premium Charges</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownOption}>
                <ThemedText style={styles.dropdownOptionText}>Discount Available</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Payout */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={styles.fieldLabel}>Payout</ThemedText>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => toggleDropdown('payout')}
          >
            <ThemedText style={styles.dropdownText}>Select payout option</ThemedText>
            <Ionicons
              name={expandedDropdown === 'payout' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={tint}
            />
          </TouchableOpacity>
          {expandedDropdown === 'payout' && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownOption}>
                <ThemedText style={styles.dropdownOptionText}>Bank Transfer</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownOption}>
                <ThemedText style={styles.dropdownOptionText}>Mobile Money</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownOption}>
                <ThemedText style={styles.dropdownOptionText}>Wallet Credit</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={[styles.confirmButton, { backgroundColor: tint }]}
          onPress={handleConfirm}
        >
          <ThemedText style={styles.confirmButtonText}>Confirm</ThemedText>
        </TouchableOpacity>
      </View>
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
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
//   card: {
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  fieldInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#F8FAFD',
  },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#F8FAFD',
    textAlignVertical: 'top',
    height: 90,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E3E7ED',
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFD',
  },
  dropdownText: {
    fontSize: 14,
    color: '#11181C',
  },
  dropdownMenu: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E7ED',
  },
  dropdownOptionText: {
    fontSize: 13,
    color: '#11181C',
  },
  bottomAction: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  confirmButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
