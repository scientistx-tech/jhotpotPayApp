import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Banner {
	id: string;
	imageUrl: string;
	createdAt: string;
}

export interface BannerState {
	banners: Banner[];
	loading: boolean;
	error: string | null;
}

const initialState: BannerState = {
	banners: [],
	loading: false,
	error: null,
};

const bannerSlice = createSlice({
	name: "banner",
	initialState,
	reducers: {
		setBanners: (state, action: PayloadAction<Banner[]>) => {
			state.banners = action.payload;
			state.loading = false;
			state.error = null;
		},
		addBanner: (state, action: PayloadAction<Banner>) => {
			state.banners.push(action.payload);
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
		clearBanners: (state) => {
			state.banners = [];
			state.error = null;
			state.loading = false;
		},
	},
});

export const {
	setBanners,
	addBanner,
	setLoading,
	setError,
	clearBanners,
} = bannerSlice.actions;
export default bannerSlice.reducer;
