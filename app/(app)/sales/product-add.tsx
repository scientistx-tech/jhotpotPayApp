import CustomButton from '@/components/custom-button';
import { RechargeHeader } from '@/components/recharge';
import { SalesHeader } from '@/components/sales';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProductAdd() {
    const router = useRouter();
    const bg = useThemeColor({}, 'background');
    const tint = useThemeColor({}, 'tint');

    const handleBackPress = () => router.back();
    const handleSubmit = () => {
        console.log('Submit new product');
    };

    return (
        <ThemedView style={styles.container}>
            <RechargeHeader
                title="Product Details"
                showBack={true}
                onBackPress={handleBackPress}
            />

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Name + Date */}
                <View style={[styles.card, { backgroundColor: bg }]}>
                    <View style={styles.rowBetween}>
                        <View style={styles.inputBlock}>
                            <ThemedText style={styles.label}>Name</ThemedText>
                            <TextInput style={styles.input} placeholder="" />
                        </View>
                        <View style={styles.inputBlock}>
                            <ThemedText style={styles.label}>Date: MM/DD/YYYY</ThemedText>
                            <TextInput style={styles.input} placeholder="" />
                        </View>
                    </View>
                </View>

                {/* Unit */}
                <View style={[styles.card, { backgroundColor: bg }]}>
                    <ThemedText style={styles.label}>Unit</ThemedText>
                    <TouchableOpacity style={styles.dropdown} activeOpacity={0.8}>
                        <ThemedText style={styles.dropdownText}>Pcs</ThemedText>
                        <MaterialCommunityIcons name="chevron-down" size={22} color="#9AA3AF" />
                    </TouchableOpacity>
                </View>

                {/* Stock */}
                <View style={[styles.card, { backgroundColor: bg }]}>
                    <View style={styles.rowBetween}>
                        <View style={styles.inputBlock}>
                            <ThemedText style={styles.label}>Unit Price</ThemedText>
                            <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
                        </View>
                        <View style={styles.inputBlock}>
                            <ThemedText style={styles.label}>Tax</ThemedText>
                            <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
                        </View>
                    </View>
                </View>

                {/* Upload Images */}
                <View style={[styles.card, { backgroundColor: bg }]}>
                    <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
                        <View style={[styles.uploadIcon, { borderColor: tint }]}>
                            <MaterialCommunityIcons name="plus" size={20} color={tint} />
                        </View>
                        <ThemedText style={styles.uploadText}>Upload Images (upto 5)</ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Note */}
                <View style={[styles.card, { backgroundColor: bg }]}>
                    <ThemedText style={styles.label}>Note (Optional)</ThemedText>
                    <TextInput
                        style={[styles.input, styles.multiline]}
                        placeholder=""
                        multiline
                        numberOfLines={3}
                    />
                </View>

                <View style={{ height: 16 }} />
            </ScrollView>

            <View style={styles.bottomAction}>
                <CustomButton title="Add Product" onPress={handleSubmit} />
            </View>
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
        paddingVertical: 16,
        paddingBottom: 32,
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
        paddingBottom: 40,
        paddingTop: 12,
    },
});
