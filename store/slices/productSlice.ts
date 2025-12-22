import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
	id: string;
	name: string;
	unit: string;
	stock: string;
	price: string;
	note?: string;
	tax?: string;
	images?: string[];
}

export interface ProductState {
	products: Product[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	loading: false,
	error: null,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
			state.loading = false;
			state.error = null;
		},
		addProduct: (state, action: PayloadAction<Product>) => {
			state.products.push(action.payload);
			state.loading = false;
			state.error = null;
		},
		updateProduct: (state, action: PayloadAction<Product>) => {
			const idx = state.products.findIndex(p => p.id === action.payload.id);
			if (idx !== -1) state.products[idx] = action.payload;
			state.loading = false;
			state.error = null;
		},
		deleteProduct: (state, action: PayloadAction<string>) => {
			state.products = state.products.filter(p => p.id !== action.payload);
			state.loading = false;
			state.error = null;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
			state.loading = false;
		},
		clearProducts: (state) => {
			state.products = [];
			state.error = null;
			state.loading = false;
		},
	},
});

export const {
	setProducts,
	addProduct,
	updateProduct,
	deleteProduct,
	setLoading,
	setError,
	clearProducts,
} = productSlice.actions;
export default productSlice.reducer;
