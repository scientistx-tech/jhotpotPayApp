import { ActionButton, RechargeHeader } from '@/components/recharge';
import {
    AddCustomerModal,
    CustomerInfoCard,
    OrderItemRow,
    ProductCard,
    SalesHeader,
} from '@/components/sales';
import SelectInput from '@/components/select-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type Customer = {
    name: string;
    email: string;
    phone: string;
    address: string;
};

type OrderItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
};

type Product = {
    id: string;
    name: string;
    price: string;
    imageUrl?: string;
};

const PRODUCTS: Product[] = [
    { id: '1', name: 'Product Name', price: 'BDT' },
    { id: '2', name: 'Product Name', price: 'BDT' },
    { id: '3', name: 'Product Name', price: 'BDT' },
];

export default function SalesOrder() {
    const router = useRouter();
    const tint = useThemeColor({}, 'tint');
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
    const [customers, setCustomers] = useState<(Customer & { id: string })[]>([
        { id: '1', name: 'সায়েম আহমেদ', email: 'sayem@example.com', phone: '01712345678', address: 'ঢাকা' },
        { id: '2', name: 'ফাতিমা খান', email: 'fatima@example.com', phone: '01798765432', address: 'চট্টগ্রাম' },
        { id: '3', name: 'করিম আলী', email: 'karim@example.com', phone: '01654321987', address: 'সিলেট' },
    ]);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        { id: '1', name: 'Item - 1', quantity: 1, price: 100 },
        { id: '2', name: 'Item - 1', quantity: 1, price: 100 },
        { id: '3', name: 'Item - 1', quantity: 1, price: 100 },
    ]);

    const [paymentStatus, setPaymentStatus] = useState<'paid' | 'due'>('paid');
    const [paidAmount, setPaidAmount] = useState<string>('');
    const [dueAmount, setDueAmount] = useState<string>('');

    const subTotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 3000;
    const tax = 0;
    const total = subTotal - discount + tax;

    const handleBackPress = () => {
        router.back();
    };

    const handleAddCustomer = () => {
        setShowCustomerModal(true);
    };

    const handleSaveCustomer = (newCustomer: Customer) => {
        const customerId = Date.now().toString();
        const customerWithId = { ...newCustomer, id: customerId };
        setCustomers([...customers, customerWithId]);
        setSelectedCustomerId(customerId);
        setCustomer(newCustomer);
        setShowCustomerModal(false);
    };

    const handleSelectCustomer = (customerId: string) => {
        setSelectedCustomerId(customerId);
        const selected = customers.find((c) => c.id === customerId);
        if (selected) {
            const { id, ...customerData } = selected;
            setCustomer(customerData);
        }
    };

    const handleDeleteItem = (id: string) => {
        setOrderItems(orderItems.filter((item) => item.id !== id));
    };

    const handleCancelOrder = () => {
        router.back();
    };

    const handleProceed = () => {
        console.log('Order placed');
    };

    const customerOptions = customers.map((cust) => ({
        label: cust.name,
        value: cust.id,
    }));

    return (
        <ThemedView style={styles.container}>

            <RechargeHeader
                title="বেচা বিক্রি"
                showBack={true}
                rightIcon="wallet-plus"
                onBackPress={handleBackPress}
            />

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Customer Selector */}
                <View style={styles.customerSelectorSection}>
                    <View style={{ width: '55%'}}>
                        <SelectInput
                            // label="গ্রাহক নির্বাচন করুন"
                            placeholder="Select Customer"
                            
                            value={selectedCustomerId}
                            onChange={(customerId) => handleSelectCustomer(customerId)}
                            options={customerOptions}
                        />
                    </View>

                    <View style={{ width: '50%' }}>
                        <ActionButton label="Add New Customer" onPress={handleAddCustomer} />
                    </View>
                </View>

                {/* Customer Info */}
                {customer && <CustomerInfoCard name={customer.name} phoneNumber={customer.phone} />}

                {/* <View style={styles.section}>
            <ThemedText >Customer Information</ThemedText>
            <ThemedText >Name:</ThemedText>
            <ThemedText >Phone Number:</ThemedText>
          
        </View> */}

                {/* Product List */}
                <View style={styles.section}>
                    <ThemedText type="defaultSemiBold" >
                        Product List
                    </ThemedText>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productList}
                    >
                        {PRODUCTS.map((product) => (
                            <ProductCard
                                key={product.id}
                                productName={product.name}
                                price={product.price}
                                onFavoritePress={() => console.log('Favorite', product.id)}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Order Items Table */}
                <View style={styles.section}>
                    <View style={styles.tableHeader}>
                        <ThemedText style={[styles.headerCell, { flex: 2 }]}>Item</ThemedText>
                        <ThemedText style={[styles.headerCell, { flex: 1, textAlign: 'center' }]}>
                            QTY
                        </ThemedText>
                        <ThemedText style={[styles.headerCell, { flex: 1, textAlign: 'right' }]}>
                            Price
                        </ThemedText>
                        <ThemedText style={[styles.headerCell, { width: 40 }]}>Delete</ThemedText>
                    </View>

                    {orderItems.map((item) => (
                        <OrderItemRow
                            key={item.id}
                            itemName={item.name}
                            quantity={item.quantity}
                            price={`BDT ${item.price}`}
                            onDelete={() => handleDeleteItem(item.id)}
                        />
                    ))}
                </View>

                <View style={styles.section}>
                    {/* Order Summary */}
                    <View style={styles.summarySection}>
                        <View style={styles.summaryRow}>
                            <ThemedText style={styles.summaryLabel}>Sub-Total:</ThemedText>
                            <ThemedText style={styles.summaryValue}>BDT {subTotal.toLocaleString()}</ThemedText>
                        </View>

                        <View style={styles.summaryRow}>
                            <ThemedText style={styles.summaryLabel}>Discount:</ThemedText>
                            <ThemedText style={styles.summaryValue}>BDT {discount.toLocaleString()}</ThemedText>
                        </View>

                        <View style={styles.summaryRow}>
                            <ThemedText style={styles.summaryLabel}>Tax:</ThemedText>
                            <ThemedText style={styles.summaryValue}>{tax}</ThemedText>
                        </View>

                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <ThemedText style={[styles.summaryLabel, styles.totalLabel]}>Total:</ThemedText>
                            <ThemedText style={[styles.summaryValue, styles.totalValue]}>
                                BDT: {total.toLocaleString()}
                            </ThemedText>
                        </View>
                    </View>

                    {/* Payment Status */}
                    <View style={styles.paymentSection}>
                        <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
                            Payment Status:
                        </ThemedText>

                        <View style={styles.paymentInputsContainer}>
                            <View style={styles.paymentInputWrapper}>
                                <ThemedText style={styles.paymentLabel}>PAID:</ThemedText>
                                <TextInput
                                    style={[styles.paymentInput, { borderColor: tint }]}
                                    placeholder="0"
                                    placeholderTextColor="#9AA8B2"
                                    keyboardType="numeric"
                                    value={paidAmount}
                                    onChangeText={setPaidAmount}
                                />
                            </View>

                            <View style={styles.paymentInputWrapper}>
                                <ThemedText style={styles.paymentLabel}>DUE:</ThemedText>
                                <TextInput
                                    style={[styles.paymentInput, { borderColor: tint }]}
                                    placeholder="0"
                                    placeholderTextColor="#9AA8B2"
                                    keyboardType="numeric"
                                    value={dueAmount}
                                    onChangeText={setDueAmount}
                                />
                            </View>
                        </View>
                    </View>


                </View>
                <View style={styles.spacer} />
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomSection}>
                <View style={{ flex: 1 }}>
                    <ActionButton label="Cancel Order" onPress={handleCancelOrder} />
                </View>
                <View style={{ flex: 1 }}>
                    <ActionButton label="Proceed" onPress={handleProceed} />
                </View>
            </View>

            <AddCustomerModal
                visible={showCustomerModal}
                onClose={() => setShowCustomerModal(false)}
                onSave={handleSaveCustomer}
            />
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
        paddingBottom: 120,
    },
    customerSelectorSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        gap: 6,
    },
    dropdownBtn: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#E5E8ED',
    },
    dropdownText: {
        fontSize: 14,
    },

    addCustomerBtnText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginHorizontal: 10,
        marginVertical: 20,
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    productList: {
        display: 'flex',
        gap: 8,
        paddingVertical: 5,
    },

    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#E5E8ED',
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    headerCell: {
        fontSize: 13,
        fontWeight: '600',
    },
    summarySection: {
        paddingHorizontal: 16,
        marginTop: 20,
        gap: 8,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 14,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    totalRow: {
        borderTopWidth: 2,
        borderTopColor: '#E5E8ED',
        marginTop: 8,
        paddingTop: 16,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '700',
    },
    paymentSection: {
        paddingHorizontal: 16,
        marginTop: 20,
    },
    paymentInputsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentInputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    paymentLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
    paymentInput: {
        borderWidth: 1,
        width: 100,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        backgroundColor: '#fff',
    },
    paymentOptions: {
        flexDirection: 'row',
        gap: 12,
    },
    paymentBtn: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#E5E8ED',
        alignItems: 'center',
    },
    paymentBtnActive: {
        backgroundColor: '#248AEF',
    },
    paymentBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    paymentBtnTextActive: {
        color: '#fff',
    },
    spacer: {
        height: 20,
    },
    bottomSection: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 24,
        flexDirection: 'row',
        gap: 12,
    },
});
