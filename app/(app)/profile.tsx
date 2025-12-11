import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfilePage() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const [profileData, setProfileData] = useState({
    name: 'Omul Ahmed',
    email: 'omul@jhotpotpay.com',
    dateOfBirth: '01/01/1990',
    presentAddress: 'Dhaka, Bangladesh',
    permanentAddress: 'Chattogram, Bangladesh',
    occupation: 'Business',
    mobileNo: '+880 123 456 789',
    nidNo: '123456789012',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', profileData);
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
        <ThemedText style={styles.headerTitle}>My Profile</ThemedText>
        <TouchableOpacity
          onPress={() => setIsEditing(!isEditing)}
          style={styles.editButton}
        >
          <FontAwesome6 name="pen-to-square" size={20} color={tint} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=60' }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        {/* Plan Buttons */}
        <View style={styles.planButtonsSection}>
          <TouchableOpacity style={[styles.planButton, { backgroundColor: tint }]}>
            <ThemedText style={styles.planButtonText}>View Plan</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.planButton, { backgroundColor: '#E8F1FF', borderWidth: 1, borderColor: tint }]}
            onPress={() => router.push('/(app)/upgrade-plan')}
          >
            <ThemedText style={[styles.planButtonText, { color: tint }]}>Upgrade Plan</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Profile Fields */}
        <View style={[styles.card, { backgroundColor: bg }]}>
          {/* Name */}
          <View style={styles.fieldSection}>
            <ThemedText style={styles.fieldLabel}>Name:</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                value={profileData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                editable={isEditing}
              />
            ) : (
              <ThemedText style={styles.fieldValue}>{profileData.name}</ThemedText>
            )}
          </View>

          {/* Email */}
          <View style={styles.fieldSection}>
            <ThemedText style={styles.fieldLabel}>Email:</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                value={profileData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                editable={isEditing}
              />
            ) : (
              <ThemedText style={styles.fieldValue}>{profileData.email}</ThemedText>
            )}
          </View>

          {/* Date of Birth */}
          <View style={styles.fieldSection}>
            <ThemedText style={styles.fieldLabel}>Date of Birth:</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                value={profileData.dateOfBirth}
                onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                editable={isEditing}
              />
            ) : (
              <ThemedText style={styles.fieldValue}>{profileData.dateOfBirth}</ThemedText>
            )}
          </View>

          {/* Present Address */}
          <View style={styles.fieldSection}>
            <ThemedText style={styles.fieldLabel}>Present Address:</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                value={profileData.presentAddress}
                onChangeText={(value) => handleInputChange('presentAddress', value)}
                editable={isEditing}
              />
            ) : (
              <ThemedText style={styles.fieldValue}>{profileData.presentAddress}</ThemedText>
            )}
          </View>

          {/* Permanent Address */}
          <View style={styles.fieldSection}>
            <ThemedText style={styles.fieldLabel}>Permanent Address:</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                value={profileData.permanentAddress}
                onChangeText={(value) => handleInputChange('permanentAddress', value)}
                editable={isEditing}
              />
            ) : (
              <ThemedText style={styles.fieldValue}>{profileData.permanentAddress}</ThemedText>
            )}
          </View>

          {/* Occupation */}
          <View style={styles.fieldSection}>
            <ThemedText style={styles.fieldLabel}>Occupation:</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                value={profileData.occupation}
                onChangeText={(value) => handleInputChange('occupation', value)}
                editable={isEditing}
              />
            ) : (
              <ThemedText style={styles.fieldValue}>{profileData.occupation}</ThemedText>
            )}
          </View>

          {/* Mobile NO. */}
          <View style={styles.fieldSection}>
            <ThemedText style={styles.fieldLabel}>Mobile NO.:</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                value={profileData.mobileNo}
                onChangeText={(value) => handleInputChange('mobileNo', value)}
                editable={isEditing}
              />
            ) : (
              <ThemedText style={styles.fieldValue}>{profileData.mobileNo}</ThemedText>
            )}
          </View>

          {/* NID NO. */}
          <View style={[styles.fieldSection, { borderBottomWidth: 0 }]}>
            <ThemedText style={styles.fieldLabel}>NID NO.:</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                value={profileData.nidNo}
                onChangeText={(value) => handleInputChange('nidNo', value)}
                editable={isEditing}
              />
            ) : (
              <ThemedText style={styles.fieldValue}>{profileData.nidNo}</ThemedText>
            )}
          </View>
        </View>

        {/* Footer Links */}
        <View style={[styles.card, { backgroundColor: bg, marginTop: 20 }]}>
          <TouchableOpacity 
            style={[styles.linkSection, { borderBottomWidth: 1, borderBottomColor: '#E5E8ED' }]}
            onPress={() => router.push('/(app)/contact-us')}
          >
            <ThemedText style={styles.linkText}>Contact Us</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={tint} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.linkSection}
            onPress={() => router.push('/(app)/about-us')}
          >
            <ThemedText style={styles.linkText}>About Jhotpot Pay</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={tint} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Save Button */}
      {isEditing && (
        <View style={styles.bottomAction}>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: tint }]}
            onPress={handleSave}
          >
            <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
          </TouchableOpacity>
        </View>
      )}
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
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E8ED',
  },
  planButtonsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  planButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  fieldSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8ED',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 6,
  },
  fieldValue: {
    fontSize: 14,
    color: '#11181C',
  },
  fieldInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#F8FAFD',
  },
  linkSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#11181C',
  },
  bottomAction: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
