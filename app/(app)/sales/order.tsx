import { useGetCustomersQuery } from '@/api/customerApi';
import { useGetProductsQuery } from '@/api/productApi';
import { useCreateSaleMutation } from '@/api/saleApi';
import { ActionButton, RechargeHeader } from '@/components/recharge';
import {
    CustomerInfoCard,
    OrderItemRow,
    ProductCard,
} from '@/components/sales';
import SelectInput from '@/components/select-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function SalesOrder() {
    const router = useRouter();
    const tint = useThemeColor({}, 'tint');
    const [customer, setCustomer] = useState<any | null>(null);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

    // Fetch customers and products from API
    const { data: customersData } = useGetCustomersQuery({ page: 1, limit: 100 });
    const { data: productsData } = useGetProductsQuery({ page: 1, limit: 100 });

    const customers = customersData?.data || [];
    const products = productsData?.data || [];

    // Image slider state for each product (auto-play)
    const imageIndexes = useRef<{ [id: string]: number }>({});
    const [, forceUpdate] = useState(0); // to trigger re-render

   useEffect(() => {
    const interval = setInterval(() => {
      products.forEach((item: any) => {
        const images = item.images && item.images.length > 0 ? item.images : [
        ];
        if (images.length > 1) {
          if (typeof imageIndexes.current[item.id] !== 'number') imageIndexes.current[item.id] = 0;
          imageIndexes.current[item.id] = (imageIndexes.current[item.id] + 1) % images.length;
        } else {
          imageIndexes.current[item.id] = 0;
        }
      });
      forceUpdate((n) => n + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);
    // Order items: [{ productId, name, quantity, price }]
    const [orderItems, setOrderItems] = useState<any[]>([]);


    // Discount, paid, due state
    const [discount, setDiscount] = useState<number>(0);
    const [paidAmount, setPaidAmount] = useState<number>(0);
    const [dueAmount, setDueAmount] = useState<number>(0);

    const subTotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Calculate total tax from selected products
    const tax = orderItems.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        const itemTax = product && product.tax ? Number(product.tax) : 0;
        return sum + itemTax * item.quantity;
    }, 0);
    const total = Math.max(0, subTotal - discount + tax);

    // Keep paid + due = total
    const handlePaidChange = (val: string) => {
        const paid = Math.max(0, parseInt(val.replace(/[^0-9]/g, '')) || 0);
        setPaidAmount(paid);
        setDueAmount(Math.max(0, total - paid));
    };
    const handleDueChange = (val: string) => {
        const due = Math.max(0, parseInt(val.replace(/[^0-9]/g, '')) || 0);
        setDueAmount(due);
        setPaidAmount(Math.max(0, total - due));
    };
    const handleDiscountChange = (val: string) => {
        const d = Math.max(0, parseInt(val.replace(/[^0-9]/g, '')) || 0);
        setDiscount(d);
        // Adjust paid/due if needed
        setDueAmount(Math.max(0, total - paidAmount));
    };

    const handleBackPress = () => {
        router.back();
    };


    // Add product to order
    const handleAddProductToOrder = (product: any) => {
        setOrderItems((prev) => {
            const exists = prev.find((item) => item.productId === product.id);
            if (exists) {
                // If already in order, increase quantity
                return prev.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Add new product to order
            return [
                ...prev,
                {
                    productId: product.id,
                    name: product.name,
                    quantity: 1,
                    price: Number(product.price),
                },
            ];
        });
    };

    const handleSelectCustomer = (customerId: string) => {
        setSelectedCustomerId(customerId);
        const selected = customers.find((c) => c.id === customerId);
        if (selected) {
            setCustomer(selected);
        }
    };

    // Sale mutation
    const [createSale] = useCreateSaleMutation();

    const handleProceed = async () => {
        if (!selectedCustomerId || orderItems.length === 0) {
            alert('Select customer and at least one product');
            return;
        }
        try {
            const body = {
                customerId: selectedCustomerId,
                discount,
                paid: paidAmount,
                due: dueAmount,
                products: orderItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            };
            const res = await createSale(body).unwrap();
            if (res.success) {
                alert('Sale created successfully!');
                // Optionally reset form or navigate
                setOrderItems([]);
                setDiscount(0);
                setPaidAmount(0);
                setDueAmount(0);
                // Redirect to sale history page
                router.replace('/(app)/sales/history');
            } else {
                alert(res.message || 'Failed to create sale');
            }
        } catch (e: any) {
            alert(e?.data?.message || 'Failed to create sale');
        }
    };

    const handleAddCustomer = () => {
        router.push('/(app)/sales/customer-add');
    };

    const handleCancelOrder = () => {
        router.back();
    };

    const customerOptions = customers.map((cust: any) => ({
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

          <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={[
                
                        { flexGrow: 1,  paddingBottom: 20 } 
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                        {/* Customer Selector */}
                <View style={styles.customerSelectorSection}>
                    <View style={{ width: '55%' }}>
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
                        {products.map((product: any) => {
                            const images = product.images && product.images.length > 0 ? product.images : [];
                            const currentIndex = imageIndexes.current[product.id] || 0;
                            return (
                                <ProductCard
                                    key={product.id}
                                    productName={product.name}
                                    price={product.price}
                                    imageUrl={images[currentIndex]}
                                    onFavoritePress={() => handleAddProductToOrder(product)}
                                />
                            );
                        })}
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
                        <ThemedText style={[styles.headerCell, { width: 40, marginLeft: 5 }]}>Delete</ThemedText>
                    </View>

                    {orderItems.map((item) => (
                        <OrderItemRow
                            key={item.productId}
                            itemName={item.name}
                            quantity={item.quantity}
                            price={`${item.price}`}
                            onDelete={() => setOrderItems(orderItems.filter((i) => i.productId !== item.productId))}
                            onQuantityChange={(qty) => setOrderItems(orderItems.map((i) => i.productId === item.productId ? { ...i, quantity: Math.max(1, qty) } : i))}
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
                            <TextInput
                                style={[styles.paymentInput, { width: 80 }]}
                                placeholder="0"
                                placeholderTextColor="#9AA8B2"
                                keyboardType="numeric"
                                value={discount.toString()}
                                onChangeText={handleDiscountChange}
                            />
                        </View>

                        <View style={styles.summaryRow}>
                            <ThemedText style={styles.summaryLabel}>Tax:</ThemedText>
                            <ThemedText style={styles.summaryValue}>BDT {tax.toLocaleString()}</ThemedText>
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
                                     value={paidAmount.toString()}
                                     onChangeText={handlePaidChange}
                                 />
                             </View>

                             <View style={styles.paymentInputWrapper}>
                                 <ThemedText style={styles.paymentLabel}>DUE:</ThemedText>
                                 <TextInput
                                     style={[styles.paymentInput, { borderColor: tint }]}
                                     placeholder="0"
                                     placeholderTextColor="#9AA8B2"
                                     keyboardType="numeric"
                                     value={dueAmount.toString()}
                                     onChangeText={handleDueChange}
                                 />
                             </View>
                         </View>
                    </View>


                </View>
               
                </ScrollView>
            </KeyboardAvoidingView>



                <View style={styles.bottomSection}>
                    <View style={{ flex: 1 }}>
                        <ActionButton label="Cancel Order" onPress={handleCancelOrder} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ActionButton label="Proceed" onPress={handleProceed} />
                    </View>
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
        paddingHorizontal: 2,
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
       screen: {
        paddingHorizontal: 20
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
        paddingBottom: 35,
        flexDirection: 'row',
        gap: 12,
    },
})

