import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SaleItem {
	id: string;
	productId: string;
	quantity: number;
	saleId: string;
	createdAt: string;
}

export interface Sale {
	id: string;
	customerId: string;
	subtotal: number;
	discount: number;
	total: number;
	tax: number;
	paid: number;
	due: number;
	createdAt: string;
	userId: string;
	salesItems: SaleItem[];
}

export interface SaleState {
	sales: Sale[];
	loading: boolean;
	error: string | null;
}

const initialState: SaleState = {
	sales: [],
	loading: false,
	error: null,
};

const saleSlice = createSlice({
	name: "sale",
	initialState,
	reducers: {
		setSales: (state, action: PayloadAction<Sale[]>) => {
			state.sales = action.payload;
			state.loading = false;
			state.error = null;
		},
		addSale: (state, action: PayloadAction<Sale>) => {
			state.sales.push(action.payload);
			state.loading = false;
			state.error = null;
		},
		updateSale: (state, action: PayloadAction<Sale>) => {
			const idx = state.sales.findIndex(s => s.id === action.payload.id);
			if (idx !== -1) state.sales[idx] = action.payload;
			state.loading = false;
			state.error = null;
		},
		deleteSale: (state, action: PayloadAction<string>) => {
			state.sales = state.sales.filter(s => s.id !== action.payload);
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
		clearSales: (state) => {
			state.sales = [];
			state.error = null;
			state.loading = false;
		},
	},
});

export const {
	setSales,
	addSale,
	updateSale,
	deleteSale,
	setLoading,
	setError,
	clearSales,
} = saleSlice.actions;
export default saleSlice.reducer;
