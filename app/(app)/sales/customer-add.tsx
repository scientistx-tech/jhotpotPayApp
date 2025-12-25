import { RechargeHeader } from '@/components/recharge';
import RoundedInput from '@/components/rounded-input';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';

import { useAddCustomerMutation } from '@/api/customerApi';

export default function ProductAdd() {
    const router = useRouter();
    const tint = useThemeColor({}, 'tint');

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');



    const [addCustomer, { isLoading }] = useAddCustomerMutation();

    const handleBackPress = () => router.back();

    const handleSubmit = async () => {
        if (!name || !email || !phone || !address) {
            Alert.alert('Validation', 'Please fill all required fields.');
            return;
        }
        try {

            const result = await addCustomer({
                name,
                email,
                phone,
                address,
            }).unwrap();

            if (result.success) {
                Alert.alert('Success', 'Customer added successfully!', [
                    { text: 'OK', onPress: () => router.back() },
                ]);
            } else {
                Alert.alert('Error', result.message || 'Failed to add customer.');
            }
        } catch (error: any) {

            Alert.alert('Error', error?.data?.message || 'Failed to add customer.');
        }
    };



    return (
        <ThemedView style={styles.container}>
            <RechargeHeader
                title="কাস্টমার বিবরণ"
                showBack={true}
                onBackPress={handleBackPress}
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{
                        ...styles.contentContainer,
                        // paddingBottom: 5
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <RoundedInput
                        label="কাস্টমার নাম *"
                        placeholder="কাস্টমার নাম লিখুন"
                        value={name}
                        onChangeText={setName}
                    />
                    <RoundedInput
                        label="ইমেইল *"
                        placeholder="ইমেইল লিখুন"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <RoundedInput
                        label="ফোন *"
                        placeholder="ফোন নম্বর লিখুন"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    <RoundedInput
                        label="ঠিকানা *"
                        placeholder="ঠিকানা লিখুন"
                        value={address}
                        onChangeText={setAddress}
                        multiline
                        style={styles.multiline}
                    />


                    <View style={styles.bottomAction}>
                        <TouchableOpacity
                            style={[styles.input, { backgroundColor: tint, alignItems: 'center' }]}
                            onPress={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16, marginTop: 8 }}>কাস্টমার যোগ করুন</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ height: 16 }} /> */}
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
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        // paddingBottom: 3,
        gap: 14,
    },
    card: {
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    rowBetween: {
        flexDirection: 'row',
        gap: 10,
    },
    inputBlock: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        opacity: 0.7,
        marginBottom: 6,
    },
    input: {
        height: 44,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E3E7ED',
        paddingHorizontal: 12,
        fontSize: 14,
        backgroundColor: '#F8FAFD',
    },
    dropdown: {
        height: 44,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E3E7ED',
        paddingHorizontal: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFD',
    },
    dropdownText: {
        fontSize: 14,
        color: '#11181C',
    },
    uploadBox: {
        minHeight: 80,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D5DBE3',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    uploadIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        fontSize: 14,
        color: '#11181C',
    },
    multiline: {
        height: 90,
        textAlignVertical: 'top',
    },
    bottomAction: {
        paddingHorizontal: 16,
        paddingBottom: 35,
        paddingTop: 12,
    },
});
