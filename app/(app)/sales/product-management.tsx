import CustomButton from '@/components/custom-button';
import { RechargeHeader } from '@/components/recharge';
import { SalesHeader } from '@/components/sales';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type Product = {
    id: string;
    name: string;
    stock: number;
    stockValue: string;
    image?: string;
};

type StatItem = {
    id: string;
    label: string;
    value: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    tint: string;
};

const STATS: StatItem[] = [
    { id: 'stock', label: 'Total Stock', value: '50', icon: 'briefcase-variant', tint: '#FFD93D' },
    { id: 'value', label: 'Stock Value', value: '5,00,000 BDT', icon: 'cash-multiple', tint: '#8FD2FF' },
];

const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Product - 01',
        stock: 50,
        stockValue: '5,00,000 BDT',
        image: 'https://images.unsplash.com/photo-1542293787938-4d273c54e3e9?auto=format&fit=crop&w=200&q=60',
    },
];

export default function ProductManagement() {
    const router = useRouter();
    const bg = useThemeColor({}, 'background');

    const handleBackPress = () => router.back();
    const handleAddProduct = () => {
        router.push('/(app)/sales/product-add');
    };
    const handleProductPress = (product: Product) => {
        console.log('Open product details', product.name);
    };

    return (
        <ThemedView style={styles.container}>
            <RechargeHeader
                title="Product List"
                showBack={true}
                onBackPress={handleBackPress}
            />

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.statsRow}>
                    {STATS.map((item) => (
                        <View key={item.id} style={[styles.statCard, { backgroundColor: bg }]}>
                            <View style={[styles.statIcon, { backgroundColor: `${item.tint}33` }]}>
                                <MaterialCommunityIcons name={item.icon} size={26} color={item.tint} />
                            </View>
                            <View>
                                <ThemedText style={styles.statLabel}>{item.label}</ThemedText>
                                <ThemedText type="defaultSemiBold" style={styles.statValue}>{item.value}</ThemedText>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={[styles.searchBar, { backgroundColor: bg }]}>
                    <Ionicons name="search" size={20} color="#8AA0B4" style={{ marginRight: 8 }} />
                    <TextInput
                        placeholder="Product Search"
                        placeholderTextColor="#8AA0B4"
                        style={styles.searchInput}
                    />
                </View>

                {PRODUCTS.map((product) => (
                    <TouchableOpacity
                        key={product.id}
                        onPress={() => handleProductPress(product)}
                        style={[styles.productCard, { backgroundColor: bg }]}
                        activeOpacity={0.9}
                    >
                        <View style={styles.productTopRow}>
                            <Image
                                source={{ uri: product.image }}
                                style={styles.productImage}
                            />
                            <View style={styles.productInfo}>
                                <ThemedText type="defaultSemiBold" style={styles.productName}>
                                    {product.name}
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.productBottomRow}>
                            <ThemedText style={styles.stockText}>Current Stock: {product.stock}</ThemedText>
                            <View style={styles.stockActions}>
                                <TouchableOpacity style={[styles.pillButton, styles.pillIn]}>
                                    <MaterialCommunityIcons name="plus" size={14} color="#fff" />
                                    <ThemedText style={styles.pillText}>In</ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.pillButton, styles.pillOut]}>
                                    <MaterialCommunityIcons name="minus" size={14} color="#fff" />
                                    <ThemedText style={styles.pillText}>Out</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={{ height: 20 }} />
            </ScrollView>

            <View style={styles.bottomAction}>
                <CustomButton title="Add New Product" onPress={handleAddProduct} />
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
        paddingBottom: 40,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    statCard: {
        flex: 1,
        borderRadius: 12,
        padding: 14,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    statIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 12,
        opacity: 0.7,
    },
    statValue: {
        fontSize: 14,
        marginTop: 4,
    },
    searchBar: {
        marginTop: 14,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 46,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#11181C',
    },
    productCard: {
        marginTop: 16,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    productTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#E5E8ED',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
    },
    productBottomRow: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: '#EEF3FA',
    },
    stockText: {
        fontSize: 12,
        opacity: 0.8,
    },
    stockActions: {
        flexDirection: 'row',
        gap: 8,
    },
    pillButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    pillIn: {
        backgroundColor: '#4CAF50',
    },
    pillOut: {
        backgroundColor: '#F05454',
    },
    pillText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    bottomAction: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        paddingTop: 12,
    },
});
