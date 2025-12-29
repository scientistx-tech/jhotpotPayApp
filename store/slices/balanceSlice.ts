import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BalanceCredit {
	id: string;
	bank_name: string;
	account_number: string;
	amount: string;
	transaction_id: string;
	online_pay: boolean;
	status: string;
	userId: string;
	createdAt: string;
}

export interface BalanceState {
	credits: BalanceCredit[];
	loading: boolean;
	error: string | null;
}

const initialState: BalanceState = {
	credits: [],
	loading: false,
	error: null,
};

const balanceSlice = createSlice({
	name: "balance",
	initialState,
	reducers: {
		setCredits: (state, action: PayloadAction<BalanceCredit[]>) => {
			state.credits = action.payload;
			state.loading = false;
			state.error = null;
		},
		addCredit: (state, action: PayloadAction<BalanceCredit>) => {
			state.credits.unshift(action.payload);
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
		clearCredits: (state) => {
			state.credits = [];
			state.error = null;
			state.loading = false;
		},
	},
});

export const {
	setCredits,
	addCredit,
	setLoading,
	setError,
	clearCredits,
} = balanceSlice.actions;
export default balanceSlice.reducer;
