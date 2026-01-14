import { useGetProductsQuery } from '@/api/productApi';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import ProductCard from './product-card';

export default function AddProductModal({ handleAddProductToOrder }:
    { handleAddProductToOrder: (product: any) => void }) {
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(20)
    const { data: productsData, isLoading } = useGetProductsQuery({ page: 1, limit: limit, search });
    const products = productsData?.data || [];
    //const imageIndexes = useRef<{ [id: string]: number }>({});
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20, gap: 20 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <TextInput value={search} onChangeText={setSearch} style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
                paddingHorizontal: 10,

            }} placeholder='Search by name' />
            {isLoading && (<ActivityIndicator color={"#0a7ea4"} />)}
            <ScrollView onMomentumScrollEnd={() => setLimit(v => v + 10)} style={{ flex: 1, flexGrow: 1 }}>
                <View style={{ flexDirection: "column", gap: 5, }}>
                    {products.map((product: any) => {
                        const images = product.images && product.images.length > 0 ? product.images : [];
                        //const currentIndex = imageIndexes.current[product.id] || 0;
                        return (
                            <ProductCard
                                key={product.id}
                                productName={product.name}
                                price={product.price}
                                imageUrl={images[0]}
                                onFavoritePress={() => handleAddProductToOrder(product)}
                            />
                        );
                    })}
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    )
}
