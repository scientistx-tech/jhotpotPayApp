import { useGetCustomersQuery, useUpdateCustomerMutation } from '@/api/customerApi';
import { RechargeHeader } from '@/components/recharge';
import RoundedInput from '@/components/rounded-input';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomerEdit = () => {
    const router = useRouter();
    const tint = useThemeColor({}, 'tint');

    const params = useLocalSearchParams();
    // Expecting navigation to pass only customer id as param
    const { id } = params;

    // Fetch all customers (could be paginated, so may need to fetch all pages in a real app)
    const { data, isLoading: isFetching } = useGetCustomersQuery({ page: 1, limit: 100 });
    const customers = data?.data || [];
    const customer = customers.find((c) => c.id === id);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (customer) {
            setName(customer.name || '');
            setEmail(customer.email || '');
            setPhone(customer.phone || '');
            setAddress(customer.address || '');
        }
    }, [customer]);

    const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();

    const handleBackPress = () => router.back();

    const handleSubmit = async () => {
        if (!name || !phone || !address || !email) {
            Alert.alert('Validation', 'সব প্রয়োজনীয় তথ্য দিন।');
            return;
        }
        try {
            const result = await updateCustomer({ id, name, email, phone, address }).unwrap();
            if (result.success) {
                Alert.alert('Success', 'কাস্টমার সফলভাবে আপডেট হয়েছে!', [
                    { text: 'OK', onPress: () => router.back() },
                ]);
             
            } else {
                Alert.alert('Error', result.message || 'কাস্টমার আপডেট করা যায়নি।');
            }
        } catch (error: any) {
            Alert.alert('Error', error?.data?.message || 'কাস্টমার আপডেট করা যায়নি।');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <RechargeHeader
                title="কাস্টমার এডিট করুন"
                showBack={true}
                onBackPress={handleBackPress}
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
            >
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{
                        ...styles.contentContainer,
                        // paddingBottom: 5
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled">
                    <RoundedInput label="কাস্টমার নাম" value={name} onChangeText={setName} />
                    <RoundedInput label="ইমেইল" value={email} onChangeText={setEmail} />
                    <RoundedInput label="ফোন" value={phone} onChangeText={setPhone} />
                    <RoundedInput label="ঠিকানা" multiline
                        style={styles.multiline} value={address} onChangeText={setAddress} />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#E3E7ED' }]} onPress={handleBackPress}>
                            <Text style={[styles.buttonText, { color: '#11181C' }]}>বাতিল</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: tint }]} onPress={handleSubmit} disabled={isLoading}>
                            <Text style={styles.buttonText}>{isLoading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',

    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 14,
    },
    label: {
        fontSize: 12,
        opacity: 0.7,
        marginBottom: 6,
    },
    multiline: {
        height: 90,
        textAlignVertical: 'top',
    },
    input: {
        height: 44,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E3E7ED',
        paddingHorizontal: 12,
        fontSize: 14,
        backgroundColor: '#F8FAFD',
        marginBottom: 10,
    },
    uploadBox: {
        minHeight: 60,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D5DBE3',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    uploadText: {
        fontSize: 14,
        color: '#11181C',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        marginBottom: 30,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomerEdit;