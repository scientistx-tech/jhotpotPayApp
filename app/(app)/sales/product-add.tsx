import { RechargeHeader } from '@/components/recharge';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';





import { useAddProductMutation } from '@/api/productApi';

export default function ProductAdd() {
    const router = useRouter();
    // const bg = useThemeColor({}, 'background');
    const tint = useThemeColor({}, 'tint');

    // Form state
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');
    const [tax, setTax] = useState('');
    // Images must be { uri, name, type }
    const [images, setImages] = useState<{ uri: string; name: string; type: string }[]>([]);
    const [imageUris, setImageUris] = useState<string[]>([]);
    // Helper to get correct MIME type
    const getMimeType = (filename: string) => {
        const ext = filename.split('.').pop()?.toLowerCase();
        if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
        if (ext === 'png') return 'image/png';
        return 'application/octet-stream';
    };


    const [addProduct, { isLoading }] = useAddProductMutation();

    const handleBackPress = () => router.back();

    const handleSubmit = async () => {
        if (!name || !unit || !stock || !price) {
            Alert.alert('Validation', 'Please fill all required fields.');
            return;
        }
        try {
            // Ensure images have correct MIME type
            const imagesWithMime = images.map((img, idx) => ({
                uri: img.uri,
                name: img.name || `image_${idx}.jpg`,
                type: getMimeType(img.name || `image_${idx}.jpg`),
            }));
            const result = await addProduct({
                name,
                unit,
                stock,
                price,
                note: note || undefined,
                tax,
                images: imagesWithMime.length > 0 ? imagesWithMime : undefined,
            }).unwrap();
        
            if (result.success) {
                Alert.alert('Success', 'Product added successfully!', [
                    { text: 'OK', onPress: () => router.back() },
                ]);
            } else {
                Alert.alert('Error', result.message || 'Failed to add product.');
            }
        } catch (error: any) {
     
            Alert.alert('Error', error?.data?.message || 'Failed to add product.');
        }
    };

    // Image picker handler
    const handlePickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.8,
        });
        if (!result.canceled) {
            const assets = result.assets || [];
            const files: { uri: string; name: string; type: string }[] = [];
            const uris: string[] = [];
            for (const [idx, asset] of assets.entries()) {
                uris.push(asset.uri);
                files.push({
                    uri: asset.uri,
                    name: asset.fileName || `image_${idx}.jpg`,
                    type: getMimeType(asset.fileName || `image_${idx}.jpg`),
                });
            }
            setImages(files);
            setImageUris(uris);
        }
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
                <View >
                    <Text style={styles.label}>Product Name *</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter product name"
                    />
                </View>
                <View >
                    <Text style={styles.label}>Unit *</Text>
                    <TextInput
                        style={styles.input}
                        value={unit}
                        onChangeText={setUnit}
                        placeholder="e.g. pcs, kg, box"
                    />
                </View>
                <View style={styles.rowBetween}>
                    <View style={[styles.inputBlock]}>
                        <Text style={styles.label}>Stock *</Text>
                        <TextInput
                            style={styles.input}
                            value={stock}
                            onChangeText={setStock}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.inputBlock]}>
                        <Text style={styles.label}>Price *</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={setPrice}
                            placeholder="0.00"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View >
                    <Text style={styles.label}>Note</Text>
                    <TextInput
                        style={[styles.input, styles.multiline]}
                        value={note}
                        onChangeText={setNote}
                        placeholder="Additional notes"
                        multiline
                        numberOfLines={3}
                    />
                </View>
                <View >
                    <Text style={styles.label}>Tax (%)</Text>
                    <TextInput
                        style={styles.input}
                        value={tax}
                        onChangeText={setTax}
                        placeholder="0"
                        keyboardType="numeric"
                    />
                </View>
                {/* Image upload UI can be added here */}
                <View >
                    <Text style={styles.label}>Product Images</Text>
                    <TouchableOpacity style={styles.uploadBox} onPress={handlePickImages}>
                        <View style={[styles.uploadIcon, { borderColor: tint }]}>
                            <Text style={{ color: tint, fontWeight: 'bold', fontSize: 18 }}>+</Text>
                        </View>
                        <Text style={styles.uploadText}>Upload Images (up to 5)</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 8 }}>
                        {imageUris.map((uri, idx) => (
                            <View key={idx} style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', backgroundColor: '#eee' }}>
                                <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                            </View>
                        ))}
                    </View>
                </View>
                <View style={{ height: 16 }} />
            </ScrollView>

            <View style={styles.bottomAction}>
                <TouchableOpacity
                    style={[styles.input, { backgroundColor: tint, alignItems: 'center' }]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Add Product</Text>
                    )}
                </TouchableOpacity>
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
