import { useCreateSaleMutation, useDeleteSaleMutation, useGetSalesQuery, useUpdateSaleMutation } from '@/api/saleApi';
import CustomButton from '@/components/custom-button';
import { RechargeHeader } from '@/components/recharge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CustomerSales() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const tint = useThemeColor({}, 'tint');
    const bg = useThemeColor({}, 'background');

    const customerId = params.customerId as string;
    const customerName = params.customerName as string;
    const totalSales = params.totalSales as string;
    const dueSales = params.dueSales as string;
    const paidSales = params.paidSales as string;

    // Pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [refreshing, setRefreshing] = useState(false);

    // Edit modal state
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editSale, setEditSale] = useState<any>(null);
    const [editPaid, setEditPaid] = useState('');

    // New sale input fields with default values from customer data
    const [dilam, setDilam] = useState(dueSales || '');
    const [pelam, setPelam] = useState('');

    const [createSale, { isLoading: isCreating }] = useCreateSaleMutation();
    const [updateSale, { isLoading: isUpdating }] = useUpdateSaleMutation();
    const [deleteSale, { isLoading: isDeleting }] = useDeleteSaleMutation();

    // Infinite scroll state
    const [allSales, setAllSales] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    // Fetch sales from API - filter by customer if needed
    const { data, isLoading, isError, refetch, isFetching } = useGetSalesQuery({ page, limit });
    const totalPages = data?.meta?.totalPages || 1;

    // Filter sales by customerId
    React.useEffect(() => {
        if (data?.data) {
            const filteredSales = customerId
                ? data.data.filter((sale: any) => sale.customerId === customerId)
                : data.data;

            if (page === 1) {
                setAllSales(filteredSales);
            } else {
                setAllSales((prev) => {
                    const ids = new Set(prev.map((s) => s.id));
                    return [...prev, ...filteredSales.filter((s: any) => !ids.has(s.id))];
                });
            }
            setHasMore(page < totalPages);
        }
    }, [data, page, customerId]);

    const handleBackPress = () => router.back();

    // Swipe-to-refresh handler
    const handleRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        await refetch();
        setRefreshing(false);
    };

    // Infinite scroll handler for FlatList
    const handleEndReached = () => {
        if (!isLoading && hasMore && !refreshing && !isFetching) {
            setPage((prev) => prev + 1);
        }
    };

    // Edit modal handlers
    const openEditModal = (sale: any) => {
        setEditSale(sale);
        setEditPaid(sale.paid.toString());
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
        setEditSale(null);
    };

    const handleEditSave = async () => {
        if (!editSale) return;
        try {
            await updateSale({
                id: editSale.id,
                paid: Number(editPaid),
                due: editSale.total - Number(editPaid),
            }).unwrap();
            refetch();
            closeEditModal();
            Alert.alert('সফল', 'বিক্রয় সফলভাবে আপডেট করা হয়েছে');
        } catch (e: any) {
            Alert.alert('ত্রুটি', e?.data?.message || 'বিক্রয় আপডেট করতে ব্যর্থ');
        }
    };

    // Delete handler
    const handleDelete = (saleId: string) => {
        Alert.alert(
            'নিশ্চিত করুন',
            'আপনি কি এই বিক্রয়টি মুছে ফেলতে চান?',
            [
                {
                    text: 'বাতিল',
                    style: 'cancel',
                },
                {
                    text: 'মুছুন',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteSale(saleId).unwrap();
                            refetch();
                            Alert.alert('সফল', 'বিক্রয় মুছে ফেলা হয়েছে');
                        } catch (e) {
                            Alert.alert('ত্রুটি', 'বিক্রয় মুছতে ব্যর্থ');
                        }
                    },
                },
            ]
        );
    };

    // Handle create new sale
    const handleCreateSale = async () => {
        const dilamAmount = Number(dilam); // দিলাম = Subtotal (মোট বিল)
        const pelamAmount = Number(pelam); // পেলাম = Paid (পরিশোধিত টাকা)

        if (!dilamAmount || dilamAmount <= 0) {
            Alert.alert('ত্রুটি', 'দয়া করে দিলাম পরিমাণ লিখুন');
            return;
        }

        if (pelamAmount < 0) {
            Alert.alert('ত্রুটি', 'পেলাম পরিমাণ সঠিক নয়');
            return;
        }

        if (!customerId) {
            Alert.alert('ত্রুটি', 'গ্রাহক খুঁজে পাওয়া যায়নি');
            return;
        }

        try {
            await createSale({
                customerId,
                subtotal: dilamAmount, // মোট বিল
                discount: 0,
                paid: pelamAmount, // পরিশোধিত টাকা
                due: dilamAmount - pelamAmount, // বাকি টাকা = দিলাম - পেলাম
                tax: 0,
                products: [], // Empty products array as this is a direct payment entry
            }).unwrap();

            // Clear input fields
            setDilam('');
            setPelam('');

            // Refresh the list
            refetch();
            Alert.alert('সফল', 'বিক্রয় যোগ করা হয়েছে');
        } catch (e: any) {
            Alert.alert('ত্রুটি', e?.data?.message || 'বিক্রয় যোগ করতে ব্যর্থ');
        }
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    // Sale card renderer
    const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={[styles.card, { backgroundColor: bg }]}>
                <View style={styles.cardRow}>
                    <View style={{ flex: 1, gap: 6 }}>
                        <ThemedText style={styles.metaText}>গ্রাহক: {item?.customer?.name}</ThemedText>
                        <ThemedText style={styles.metaText}>গ্রাহক ইমেইল: {item?.customer?.email}</ThemedText>
                        <ThemedText style={styles.metaText}>গ্রাহক ফোন: {item?.customer?.phone}</ThemedText>
                        <ThemedText style={styles.metaText}>তারিখ: {new Date(item.createdAt).toLocaleString('bn-BD')}</ThemedText>
                        <ThemedText style={styles.metaText}>সাবটোটাল: {item.subtotal} টাকা</ThemedText>
                        <ThemedText style={styles.metaText}>ডিসকাউন্ট: {item.discount} টাকা</ThemedText>
                        <ThemedText style={styles.metaText}>মোট: {item.total} টাকা</ThemedText>
                        <ThemedText style={styles.metaText}>পরিশোধ: {item.paid} টাকা</ThemedText>
                        <ThemedText style={styles.metaText}>বাকি: {item.due} টাকা</ThemedText>
                        <ThemedText style={styles.metaText}>পণ্য সংখ্যা: {item.salesItems?.length || 0}</ThemedText>
                    </View>
                    <View style={{ gap: 8 }}>
                        {item.due > 0 && (
                            <TouchableOpacity onPress={() => openEditModal(item)} style={styles.iconButton}>
                                <Icon name="edit" size={22} color={tint} />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
                            <Icon name="delete" size={22} color="#EF4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <RechargeHeader
                title={customerName ? `${customerName} - বিক্রয় তালিকা` : 'বিক্রয় তালিকা'}
                showBack={true}
                onBackPress={handleBackPress}
            />

            <View style={styles.content}>
                {/* Input Section */}
                <View style={styles.inputSection}>
                    <View style={styles.inputRow}>
                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.inputLabel}>দিলাম</ThemedText>
                            <TextInput
                                style={[styles.input, { borderColor: '#E5E8ED' }]}
                                keyboardType="numeric"
                                placeholder="০"
                                value={dilam}
                                onChangeText={setDilam}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.inputLabel}>পেলাম</ThemedText>
                            <TextInput
                                style={[styles.input, { borderColor: '#E5E8ED' }]}
                                keyboardType="numeric"
                                placeholder="০"
                                value={pelam}
                                onChangeText={setPelam}
                            />
                        </View>
                    </View>

                </View>

                {/* Sale List */}
                <FlatList
                    data={allSales}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ gap: 12, marginTop: 14, paddingBottom: 40 }}
                    ListEmptyComponent={
                        <ThemedText style={{ textAlign: 'center', marginVertical: 29 }}>
                            কোনো বিক্রির তথ্য পাওয়া যায়নি।
                        </ThemedText>
                    }
                    ListFooterComponent={
                        (isLoading || isFetching) && hasMore ? (
                            <ActivityIndicator size="large" color={tint} style={{ marginVertical: 24 }} />
                        ) : null
                    }
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                />

                <View style={{ height: 24 }} />
            </View>

            <View
                style={[styles.addButton]}

            >
                {/* <ThemedText style={styles.addButtonText}>
                    {isCreating ? 'নিশ্চিত...' : 'নিশ্চিত'}
                </ThemedText> */}
                <CustomButton title={isCreating ? 'নিশ্চিত...' : 'নিশ্চিত'} onPress={handleCreateSale} isLoading={isCreating} />
            </View>

            {/* Edit Sale Modal */}
            <Modal
                visible={editModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeEditModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ThemedText style={styles.modalTitle}>বিক্রয় পেমেন্ট সম্পাদনা</ThemedText>
                        <View style={{ marginBottom: 12 }}>
                            <ThemedText style={{ marginBottom: 4 }}>পরিশোধিত পরিমাণ</ThemedText>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={editPaid}
                                onChangeText={setEditPaid}
                            />
                        </View>
                        {editSale && (
                            <View style={{ marginBottom: 12 }}>
                                <ThemedText style={{ fontSize: 12, color: '#666' }}>
                                    মোট: {editSale.total} টাকা
                                </ThemedText>
                                <ThemedText style={{ fontSize: 12, color: '#666' }}>
                                    বাকি: {editSale.total - Number(editPaid || 0)} টাকা
                                </ThemedText>
                            </View>
                        )}
                        <View style={styles.modalActions}>
                            <TouchableOpacity onPress={closeEditModal} style={{ padding: 10 }}>
                                <ThemedText style={{ color: '#666' }}>বাতিল</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleEditSave}
                                style={[styles.saveButton, { backgroundColor: tint }]}
                                disabled={isUpdating}
                            >
                                <ThemedText style={{ color: '#fff', fontWeight: '600' }}>
                                    {isUpdating ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'}
                                </ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    card: {
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        borderWidth: 1,
        marginBottom: 8,
        borderColor: '#E3E7ED',
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    nameText: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    metaText: {
        fontSize: 12,
        color: '#4B5563',
    },
    inputSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E3E7ED',
    },
    inputRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    inputContainer: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
    },
    addButton: {
        paddingHorizontal: 16,
        paddingBottom: 30,
        // paddingTop: 12,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    iconButton: {
        padding: 4,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        width: 320,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E8ED',
        borderRadius: 8,
        padding: 10,
        fontSize: 15,
    },
    modalActions: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'flex-end',
    },
    saveButton: {
        borderRadius: 8,
        padding: 10,
    },
});
