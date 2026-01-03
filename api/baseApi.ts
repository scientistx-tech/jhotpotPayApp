import { getToken } from "@/utils/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../store/slices/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://api.jhotpotpay.com/api/v1",
  prepareHeaders: async (headers) => {
    const token = await getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});


const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth", "Products", "Product", "Customers", "Customer","Sales","BalanceCredits", "Packages"],
  endpoints: () => ({}),
});
