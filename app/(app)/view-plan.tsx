import { useCheckAuthQuery } from '@/api/authApi';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function ViewPlanPage() {
    const tint = useThemeColor({}, 'tint');
    const router = useRouter();
    const bg = useThemeColor({}, 'background');
    const { data, isLoading, error } = useCheckAuthQuery();

    const packageInfo = data?.data?.packageBuyers?.[0]?.package;
    const handleBackPress = () => router.back();

    return (
        <ThemedView style={styles.container}>
            <RechargeHeader
                title="প্ল্যানের বিস্তারিত"
                showBack={true}
                onBackPress={handleBackPress}
            />
            <ScrollView contentContainerStyle={styles.contentContainer}>
               
                {isLoading ? (
                    <ThemedText>লোড হচ্ছে...</ThemedText>
                ) : error ? (
                    <ThemedText>ডেটা আনতে সমস্যা হচ্ছে</ThemedText>
                ) : packageInfo ? (
                    <View style={styles.card}>
                        <ThemedText style={styles.planName}>{packageInfo.name}</ThemedText>
                        <ThemedText style={styles.planDetails}>{packageInfo.details} </ThemedText>
                        <View style={styles.infoRow}>
                            <ThemedText style={styles.label}>প্রোডাক্ট সীমা:</ThemedText>
                            <ThemedText style={styles.value}>{packageInfo.product_limit}</ThemedText>
                        </View>
                        <View style={styles.infoRow}>
                            <ThemedText style={styles.label}>রিচার্জ কমিশন:</ThemedText>
                            <ThemedText style={styles.value}>{packageInfo.recharge_commission}</ThemedText>
                        </View>
                        <View style={styles.infoRow}>
                            <ThemedText style={styles.label}>মূল্য:</ThemedText>
                            <ThemedText style={styles.value}>{packageInfo.price} টাকা</ThemedText>
                        </View>
                        <View style={styles.infoRow}>
                            
                        </View>
                    </View>
                ) : (
                    <ThemedText>কোনো প্ল্যান পাওয়া যায়নি</ThemedText>
                )}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
    },
    contentContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 24,
        color: '#11181C',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        width: '100%',
        maxWidth: 400,
    },
    planName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#2563eb',
        textAlign: 'center',
    },
    planDetails: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 16,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 15,
        color: '#11181C',
        fontWeight: '500',
    },
    value: {
        fontSize: 15,
        color: '#2563eb',
        fontWeight: '500',
    },
});
