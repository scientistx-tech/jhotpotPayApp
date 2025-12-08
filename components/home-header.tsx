import { useThemeColor } from '@/hooks/use-theme-color';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  userName = 'Omuk Ahmed',
  userTitle = 'Top for Balance',
  greeting = 'স্বাগতম আবার!',
  onNotificationPress,
  onSharePress,
  showBackButton = false,
  onBackPress,
}: HomeHeaderProps) {
  const tint = useThemeColor({}, 'tint');

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
          <View style={[styles.badge, { backgroundColor: '#E3F2FD' }]}>
            <FontAwesome6 name="dollar-sign" size={12} color={tint} style={styles.dollarIcon} />
            <Text style={[styles.badgeText, { color: tint }]}>{userTitle}</Text>
          </View>
        </View>
      </View>

      {/* Right Icons */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationPress}
          accessibilityLabel="Notifications"
        >
          <Ionicons name="notifications" size={24} color={tint} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onSharePress}
          accessibilityLabel="Share"
        >
          <FontAwesome6 name="circle-user" size={20} color={tint} />
        </TouchableOpacity>
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
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
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