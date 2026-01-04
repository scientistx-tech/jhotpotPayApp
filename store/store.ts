
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";


import authReducer from "./slices/authSlice";
import balanceReducer from "./slices/balanceSlice";
import customerReducer from "./slices/customerSlice";
import packageReducer from "./slices/packageSlice";
import productReducer from "./slices/productSlice";
import rechargeReducer from "./slices/rechargeSlice";
import saleReducer from "./slices/saleSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    recharge: rechargeReducer,
    sale: saleReducer,
    balance: balanceReducer,
    package: packageReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
