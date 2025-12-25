
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	userId: string;
	createdAt: string;
}

export interface CustomerState {
	customers: Customer[];
	loading: boolean;
	error: string | null;
}

const initialState: CustomerState = {
	customers: [],
	loading: false,
	error: null,
};

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		setCustomers: (state, action: PayloadAction<Customer[]>) => {
			state.customers = action.payload;
			state.loading = false;
			state.error = null;
		},
		addCustomer: (state, action: PayloadAction<Customer>) => {
			state.customers.push(action.payload);
			state.loading = false;
			state.error = null;
		},
		updateCustomer: (state, action: PayloadAction<Customer>) => {
			const idx = state.customers.findIndex(c => c.id === action.payload.id);
			if (idx !== -1) state.customers[idx] = action.payload;
			state.loading = false;
			state.error = null;
		},
		deleteCustomer: (state, action: PayloadAction<string>) => {
			state.customers = state.customers.filter(c => c.id !== action.payload);
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
		clearCustomers: (state) => {
			state.customers = [];
			state.error = null;
			state.loading = false;
		},
	},
});

export const {
	setCustomers,
	addCustomer,
	updateCustomer,
	deleteCustomer,
	setLoading,
	setError,
	clearCustomers,
} = customerSlice.actions;
export default customerSlice.reducer;
