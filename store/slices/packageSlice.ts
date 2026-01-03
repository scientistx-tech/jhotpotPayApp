
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Package {
	id: string;
	name: string;
	details: string;
	product_limit: number;
	recharge_commission: number;
	price: number;
}

export interface PackageState {
	packages: Package[];
	loading: boolean;
	error: string | null;
}

const initialState: PackageState = {
	packages: [],
	loading: false,
	error: null,
};

const packageSlice = createSlice({
	name: "package",
	initialState,
	reducers: {
		setPackages: (state, action: PayloadAction<Package[]>) => {
			state.packages = action.payload;
			state.loading = false;
			state.error = null;
		},
		addPackage: (state, action: PayloadAction<Package>) => {
			state.packages.push(action.payload);
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
		clearPackages: (state) => {
			state.packages = [];
			state.error = null;
			state.loading = false;
		},
	},
});

export const {
	setPackages,
	addPackage,
	setLoading,
	setError,
	clearPackages,
} = packageSlice.actions;
export default packageSlice.reducer;
