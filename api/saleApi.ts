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
	due: number;
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

export const saleApi = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		createSale: builder.mutation<SaleResponse, {
			customerId: string;
			discount: number;
			paid: number;
			due: number;
			products: { productId: string; quantity: number }[];
		}>({
			query: (body) => ({
				url: "/product/sales",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Sales"],
		}),
		updateSale: builder.mutation<SaleResponse, {
			id: string;
			paid: number;
			due: number;
		}>({
			query: ({ id, ...body }) => ({
				url: `/product/sales/${id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, arg) => [
				"Sales",
				{ type: "Sale", id: arg.id },
			],
		}),
		getSales: builder.query<SaleListResponse, { page?: number; limit?: number }>({
			query: ({ page = 1, limit = 10 }) => ({
				url: "/product/sales",
				method: "GET",
				params: { page, limit },
			}),
			providesTags: ["Sales"],
		}),
		getSale: builder.query<SaleResponse, { id: string }>({
			query: ({ id }) => ({
				url: `/product/sales/${id}`,
				method: "GET",
			}),
			providesTags: (result, error, arg) => [
				{ type: "Sale", id: arg.id },
			],
		}),
	}),
});

export const {
	useCreateSaleMutation,
	useUpdateSaleMutation,
	useGetSalesQuery,
	useGetSaleQuery,
} = saleApi;
