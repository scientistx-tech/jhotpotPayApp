import { useThemeColor } from '@/hooks/use-theme-color';
import { RootState } from '@/store/store';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

type HomeHeaderProps = {
  userName?: string;
  userTitle?: string;
  greeting?: string;
  onNotificationPress?: () => void;
  onSharePress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
};

export default function HomeHeader({

  showBackButton = false,
  onBackPress,
}: HomeHeaderProps) {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');

  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user)
  // user is likely UserResponse or null
  const userName = user?.data?.name || 'User';
  const balance = (user as any)?.data?.balance ?? 0;
  // Balance visibility state
  const [showBalance, setShowBalance] = useState(false);
  const handleBalancePress = () => {
    setShowBalance((prev) => !prev);
  };

  const handleNotificationPress = () => {
    router.push('/(app)/wallet/history');
  };

  const handleProfilePress = () => {
    router.push('/(app)/profile');
  };

  return (
    <View style={styles.container}>
      {/* Logo and User Info */}
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            accessibilityLabel="Go Back"
          >
            <Ionicons name="arrow-back" size={24} color={tint} />
          </TouchableOpacity>
        )}
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity
            style={styles.balanceButton}
            onPress={handleBalancePress}
            activeOpacity={0.7}
          >
            <FontAwesome6 name="dollar-sign" size={12} color={tint} style={styles.dollarIcon} />
            <Text style={[styles.badgeText, { color: tint, marginRight: 6 }]}>Balance</Text>
            <Text style={[styles.balanceText, { color: tint }]}> {showBalance ? `${balance} ৳` : '****'} </Text>
            <Ionicons
              name={showBalance ? 'eye-off' : 'eye'}
              size={16}
              color={tint}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>
        {/* Right Icons */}
        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleNotificationPress}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications" size={24} color={tint} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleProfilePress}
            accessibilityLabel="Profile"
          >
            <FontAwesome6 name="circle-user" size={20} color={tint} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  logo: {
    width: 48,
    height: 48,
  },
  userInfo: {
    gap: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
  },
  balanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 2,
    gap: 4,
  },
  balanceText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  dollarIcon: {
    marginTop: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});