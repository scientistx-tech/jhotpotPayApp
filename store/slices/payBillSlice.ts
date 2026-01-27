import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BillCategory {
	id: string;
	title: string;
	icon: string;
	createdAt: string;
}

export interface Biller {
	id: string;
	name: string;
	categoryId: string;
	icon: string;
	createdAt: string;
}

export interface BillPayment {
	id: string;
	billerId: string;
	meter_no: string;
	contact_no: string;
	amount: number;
	sms_account_no: string;
	subscription_id: string;
	status: "PENDING" | "PAID" | "REJECTED" | "PROCESSING";
	userId: string;
	charge: number;
	createdAt: string;
	biller?: {
		id: string;
		name: string;
		icon: string;
	};
}

export interface PayBillState {
	categories: BillCategory[];
	billers: Biller[];
	payments: BillPayment[];
	selectedCategory: BillCategory | null;
	selectedBiller: Biller | null;
	loading: boolean;
	error: string | null;
}

const initialState: PayBillState = {
	categories: [],
	billers: [],
	payments: [],
	selectedCategory: null,
	selectedBiller: null,
	loading: false,
	error: null,
};

const payBillSlice = createSlice({
	name: "payBill",
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<BillCategory[]>) => {
			state.categories = action.payload;
			state.loading = false;
			state.error = null;
		},
		setBillers: (state, action: PayloadAction<Biller[]>) => {
			state.billers = action.payload;
			state.loading = false;
			state.error = null;
		},
		setPayments: (state, action: PayloadAction<BillPayment[]>) => {
			state.payments = action.payload;
			state.loading = false;
			state.error = null;
		},
		addPayment: (state, action: PayloadAction<BillPayment>) => {
			state.payments.unshift(action.payload);
			state.loading = false;
			state.error = null;
		},
		setSelectedCategory: (state, action: PayloadAction<BillCategory | null>) => {
			state.selectedCategory = action.payload;
			state.billers = [];
			state.selectedBiller = null;
		},
		setSelectedBiller: (state, action: PayloadAction<Biller | null>) => {
			state.selectedBiller = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
			state.loading = false;
		},
		clearPayments: (state) => {
			state.payments = [];
			state.error = null;
			state.loading = false;
		},
		clearSelection: (state) => {
			state.selectedCategory = null;
			state.selectedBiller = null;
		},
	},
});

export const {
	setCategories,
	setBillers,
	setPayments,
	addPayment,
	setSelectedCategory,
	setSelectedBiller,
	setLoading,
	setError,
	clearPayments,
	clearSelection,
} = payBillSlice.actions;
export default payBillSlice.reducer;
