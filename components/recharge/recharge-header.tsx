import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

export type RechargeHeaderProps = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  rightImage?: ImageSourcePropType;
  onRightPress?: () => void;
};

export default function RechargeHeader({
  title = 'Mobile Recharge',
  showBack = true,
  onBackPress,
  rightIcon = 'phone',
  rightImage,
  onRightPress,
}: RechargeHeaderProps) {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const handleBackPress = () => {
    onBackPress ? onBackPress() : router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.header}>
        {showBack && (
          <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={tint} />
          </TouchableOpacity>
        )}

        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>

        {rightImage && (
          <TouchableOpacity onPress={onRightPress} style={styles.rightImageBtn}>
            <Image source={rightImage} style={styles.rightImage} resizeMode="contain" />
          </TouchableOpacity>
        )}

        {/* {!rightImage && rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={[styles.iconBtn, { backgroundColor: '#fff' }]}>
            <MaterialCommunityIcons name={rightIcon as any} size={24} color={tint} />
          </TouchableOpacity>
        )} */}
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
    logo: {
    width: 48,
    height: 48,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#222B45',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  rightImageBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  rightImage: {
    width: 28,
    height: 28,
  },
});
