import { useUpdateProfileMutation } from '@/api/authApi';
import LogoutButton from '@/components/logout-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { RootState } from '@/store/store';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');
  const user = useSelector((state: RootState) => state.auth.user);
  // user is likely { data: { ...user fields... }, ... }
  const userData = user?.data || {};
  console.log("user profile:", userData);

  const [profileData, setProfileData] = useState({
    name: userData.name || '',
    nid: userData.nid || '',
    email: userData.email || '',
    occupation: userData.occupation || '',
    income: userData.income || '',
    division: userData.division || '',
    address: userData.address || '',
    referralCode: userData.referralCode || '',
    // Non-editable fields
    mobileNo: userData.phone || '',
    balance: userData.balance || '',
    status: userData.status || '',
  });

  console.log("profile data:", profileData);

  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        name: profileData.name,
        nid: profileData.nid,
        email: profileData.email,
        occupation: profileData.occupation,
        income: Number(profileData.income) || 0,
        division: profileData.division,
        address: profileData.address,
        referralCode: profileData.referralCode,
      }).unwrap();
      setIsEditing(false);
      console.log('Profile updated:', profileData);
    } catch (error) {
      console.log('Profile update error:', error);
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

        {/* Profile Fields - Only editable for allowed fields */}
        <View style={[styles.card, { backgroundColor: bg }]}> 
          {Object.entries(profileData).map(([key, value], idx, arr) => {
            const editableFields = [
              'name',
              'nid',
              'email',
              'occupation',
              'income',
              'division',
              'address',
              'referralCode',
            ];
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('No', 'No');
            return (
              <View
                key={key}
                style={[
                  styles.fieldSection,
                  idx === arr.length - 1 ? { borderBottomWidth: 0 } : null,
                ]}
              >
                <ThemedText style={styles.fieldLabel}>{label}:</ThemedText>
                {isEditing && editableFields.includes(key) ? (
                  <TextInput
                    style={[styles.fieldInput, { color: '#11181C', borderColor: tint }]}
                    value={value?.toString() || ''}
                    onChangeText={(val) => handleInputChange(key, val)}
                    editable={true}
                  />
                ) : (
                  <ThemedText style={styles.fieldValue}>{value?.toString() || ''}</ThemedText>
                )}
              </View>
            );
          })}
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

          <View style={{ marginTop: 10 , borderTopWidth: 1, borderTopColor: '#E5E8ED', paddingTop: 10 }}>
            <LogoutButton />
          </View>
        </View>
        

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Save Button */}
      {isEditing && (
        <View style={styles.bottomAction}>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: tint, opacity: isUpdating ? 0.6 : 1 }]}
            onPress={handleSave}
            disabled={isUpdating}
          >
            <ThemedText style={styles.saveButtonText}>{isUpdating ? 'Saving...' : 'Save Changes'}</ThemedText>
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
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
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
