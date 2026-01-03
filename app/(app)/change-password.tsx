import { useChangePasswordMutation } from '@/api/authApi';
import CustomButton from '@/components/custom-button';
import FormInput from '@/components/form-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ScrollView } from 'react-native-gesture-handler';

export default function ChangePassword() {
  const router = useRouter();
   const tint = useThemeColor({}, 'tint');
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { control, handleSubmit } = useForm({ defaultValues: { oldPassword: '', newPassword: '', confirm: '' } });

  const handleChangePassword = async (data: { oldPassword: string; newPassword: string; confirm: string }) => {
    if (!data.oldPassword || !data.newPassword || !data.confirm) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'সব তথ্য দিন' });
      return;
    }
    if (data.newPassword !== data.confirm) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'নতুন পাসওয়ার্ড মিলছে না' });
      return;
    }
    try {
      const res = await changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword }).unwrap();
      if (res.success) {
        Toast.show({ type: 'success', text1: 'Success', text2: res.message || 'পাসওয়ার্ড পরিবর্তন হয়েছে' });
        // setTimeout(() => {
        //   router.replace('/(auth)/login');
        // }, 1200);
      } else {
        Toast.show({ type: 'error', text1: 'Error', text2: res.message || 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে' });
      }
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'Error', text2: err?.data?.message || 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে' });
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
         {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={tint} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Change Password</ThemedText>
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
            { flexGrow: 1,  paddingBottom: 80 }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <ThemedText type='title' style={{ textAlign: 'center', marginTop: 40 }}>পাসওয়ার্ড পরিবর্তন করুন</ThemedText>
          <View style={{ height: 24 }} />
          <FormInput name='oldPassword' control={control} label='পুরাতন পাসওয়ার্ড' placeholder='পুরাতন পাসওয়ার্ড দিন' secureTextEntry />
          <FormInput name='newPassword' control={control} label='নতুন পাসওয়ার্ড' placeholder='নতুন পাসওয়ার্ড দিন' secureTextEntry />
          <FormInput name='confirm' control={control} label='নতুন পাসওয়ার্ড নিশ্চিত করুন' placeholder='আবার দিন' secureTextEntry />
          <View style={{ height: 20 }} />
          <CustomButton isLoading={isLoading} title='পরিবর্তন করুন' onPress={handleSubmit(handleChangePassword)} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
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
   screen: {
    paddingHorizontal: 20
  }
});
