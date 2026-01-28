import { baseApi } from "./baseApi";

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
  due?: number;
  createdAt: string;
  userId: string;
  salesItems: SaleItem[];
}

export interface SaleListResponse {
  success: boolean;
  message: string;
  data: Sale[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SaleResponse {
  success: boolean;
  message: string;
  data: Sale;
}

export type UserSales = {
  total: number;
  due: number;
  paid: number;
};

export type UserSaleItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  userId: string;
  createdAt: string; // ISO date string
  sales: UserSales;
};

export type UserSalesResponse = {
  success: boolean;
  message: string;
  data: UserSaleItem[];
};

export const saleApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createSale: builder.mutation<
      SaleResponse,
      {
        customerId: string;
        discount: number;
        paid: number;
        due: number;
        products: { productId: string; quantity: number }[];
      }
    >({
      query: (body) => ({
        url: "/product/sales",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sales"],
    }),
    updateSale: builder.mutation<
      SaleResponse,
      {
        id: string;
        paid: number;
        due: number;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/product/sales/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Sales", id: arg.id },
        { type: "Sales", id: "LIST" },
      ],
    }),
    getSales: builder.query<
      SaleListResponse,
      { page?: number; limit?: number; due?: boolean }
    >({
      query: ({ page = 1, limit = 10, due }) => ({
        url: "/product/sales",
        method: "GET",
        params: { page, limit, due },
      }),
      providesTags: ["Sales"],
    }),
    getUserSales: builder.query<UserSalesResponse, void>({
      query: () => ({
        url: "/product/sale/user",
        method: "GET",
      }),
      providesTags: ["Sales"],
    }),
  }),
});

export const {
  useCreateSaleMutation,
  useUpdateSaleMutation,
  useGetSalesQuery,
  useGetUserSalesQuery,
} = saleApi;
