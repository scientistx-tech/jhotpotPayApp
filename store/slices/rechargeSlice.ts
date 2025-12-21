import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RechargeOffer {
  id: string;
  type: string;
  sim_type: string;
  network_type: string;
  cash_back: number;
  price: number;
  offerId: string;
  name: string;
  validity: string;
  createdAt: string;
  offer: {
    id: string;
    title: string;
    createdAt: string;
  };
}

export interface RechargeState {
  offers: RechargeOffer[];
  loading: boolean;
  error: string | null;
}

const initialState: RechargeState = {
  offers: [],
  loading: false,
  error: null,
};

const rechargeSlice = createSlice({
  name: "recharge",
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<RechargeOffer[]>) => {
      state.offers = action.payload;
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
    clearOffers: (state) => {
      state.offers = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setOffers, setLoading, setError, clearOffers } = rechargeSlice.actions;
export default rechargeSlice.reducer;