import { useGetProductQuery, useUpdateProductMutation } from '@/api/productApi';
import ProductUnitDropdown from '@/components/ProductUnitDropdown';
import { RechargeHeader } from '@/components/recharge';
import RoundedInput from '@/components/rounded-input';
import { ThemedView } from '@/components/themed-view';
import { units } from '@/constants/units';
import { useThemeColor } from '@/hooks/use-theme-color';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const tint = useThemeColor({}, 'tint');

  

  // Fetch product details
  const { data, isLoading: isFetching } = useGetProductQuery({ id });
  const product = data?.data;

  // Form state
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [openUnit, setOpenUnit] = useState(false);
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [tax, setTax] = useState('');
  // Previous images (URLs)
  const [images, setImages] = useState<string[]>([]);
  // New images to upload
  const [newImages, setNewImages] = useState<{ uri: string; name: string; type: string }[]>([]);
  const [newImageUris, setNewImageUris] = useState<string[]>([]);

  // Helper to get correct MIME type
  const getMimeType = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
    if (ext === 'png') return 'image/png';
    return 'application/octet-stream';
  };

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setUnit(product.unit || '');
      setStock(product.stock !== undefined && product.stock !== null ? String(product.stock) : '');
      setPrice(product.price !== undefined && product.price !== null ? String(product.price) : '');
      setNote(product.note || '');
      setTax(product.tax !== undefined && product.tax !== null ? String(product.tax) : '');
      setImages(product.images || []);
      setNewImages([]);
      setNewImageUris([]);
    }
  }, [product]);

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleBackPress = () => router.back();

  const handleSubmit = async () => {
    try {
      // Prepare newImages for upload
      const imagesWithMime = newImages.map((img, idx) => ({
        uri: img.uri,
        name: img.name || `image_${idx}.jpg`,
        type: getMimeType(img.name || `image_${idx}.jpg`),
      }));
      const resualt = await updateProduct({
        id,
        name,
        unit,
        stock: stock || undefined,
        price,
        note: note || undefined,
        tax: tax || undefined,
        images: images.length > 0 ? images : [], // previous images (URLs)
        newImages: imagesWithMime.length > 0 ? imagesWithMime : undefined,
      }).unwrap();

      Alert.alert('Success', 'Product updated successfully');
      router.back();
    } catch (e) {
      Alert.alert('Error', 'Failed to update product');
    }
  };

  // Image picker handler for new images
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
      setNewImages(files);
      setNewImageUris(uris);
    }
  };

  // Remove a previous image (URL)
  const handleRemovePrevImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  // Remove a new image
  const handleRemoveNewImage = (uri: string) => {
    setNewImages((prev) => prev.filter((img) => img.uri !== uri));
    setNewImageUris((prev) => prev.filter((u) => u !== uri));
  };

  if (isFetching) {
    return (
      <View style={styles.centered}><ActivityIndicator size="large" color={tint} /></View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <RechargeHeader
        title="পণ্য সম্পাদনা"
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
          <RoundedInput label="পণ্যের নাম" value={name} onChangeText={setName} />
          <ProductUnitDropdown
            label="একক"
            value={unit}
            options={units.map(u => ({ label: u.name, value: u.code }))}
            placeholder="একক নির্বাচন করুন"
            onSelect={setUnit}
            isOpen={openUnit}
            setOpen={setOpenUnit}
          />
          <RoundedInput label="স্টক" value={stock} onChangeText={setStock} keyboardType="numeric" />
          <RoundedInput label="মূল্য" value={price} onChangeText={setPrice} keyboardType="numeric" />
          {/* <RoundedInput label="Note" value={note} onChangeText={setNote} multiline style={styles.input} /> */}
          <RoundedInput
            label={"নোট"}
            placeholder="অতিরিক্ত নোট"
            value={note}
            onChangeText={setNote}
            multiline
            style={styles.multiline}
          />
          <RoundedInput label="ট্যাক্স" value={tax} onChangeText={setTax} keyboardType="numeric" />
          {/* Previous Images */}
          <Text style={styles.label}>পূর্বের ছবি</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            {images.length === 0 && <Text style={{ color: '#888' }}>কোনো পূর্বের ছবি নেই</Text>}
            {images.map((img, idx) => (
              <View key={img} style={{ position: 'relative', marginRight: 8, marginBottom: 8 }}>
                <Image source={{ uri: img }} style={{ width: 60, height: 60, borderRadius: 8, backgroundColor: '#eee' }} />
                <TouchableOpacity
                  style={{ position: 'absolute', top: -8, right: -8, backgroundColor: '#fff', borderRadius: 10, padding: 2, borderWidth: 1, borderColor: '#ccc' }}
                  onPress={() => handleRemovePrevImage(img)}
                >
                  <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* New Images */}
          <Text style={styles.label}>নতুন ছবি যোগ করুন</Text>
          <TouchableOpacity style={[styles.uploadBox, { marginBottom: 10 }]} onPress={handlePickImages}>
            <Text style={styles.uploadText}>ছবি নির্বাচন করুন</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {newImages.length === 0 && <Text style={{ color: '#888' }}>কোনো নতুন ছবি নেই</Text>}
            {newImages.map((img, idx) => (
              <View key={idx} style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', backgroundColor: '#eee', marginTop: 10, position: 'relative' }}>
                <Image source={{ uri: img.uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                <TouchableOpacity
                  style={{ position: 'absolute', right: 7, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 4, paddingVertical: 1, borderWidth: 1, borderColor: '#ccc', zIndex: 2 }}
                  onPress={() => handleRemoveNewImage(img.uri)}
                >
                  <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
}

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
