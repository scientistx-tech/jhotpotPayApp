import { baseApi } from "./baseApi";

interface Product {
	id: string;
	name: string;
	unit: string;
	stock: string;
	price: string;
	note?: string;
	tax?: string;
	images?: string[];
}

interface ProductListResponse {
	success: boolean;
	message: string;
	data: Product[];
	meta?: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

interface ProductResponse {
	success: boolean;
	message: string;
	data: Product;
}

export const productApi = baseApi.injectEndpoints({
  overrideExisting: true,
	endpoints: (builder) => ({
		addProduct: builder.mutation<ProductResponse, {
			name: string;
			unit: string;
			stock?: string;
			price: string;
			note?: string;
			tax?: string;
			images?: { uri: string; name: string; type: string }[];
		}>({
			query: (body) => {
				const formData = new FormData();
				if (body.images) {
					body.images.forEach((file) => formData.append("images", file));
				}
				formData.append("name", body.name);
				formData.append("unit", body.unit);
				if (body?.stock) formData.append("stock", body.stock);
				formData.append("price", body.price);
				if (body.note) formData.append("note", body.note);
				if (body.tax !== undefined && body.tax !== null) formData.append("tax", body.tax);
				return {
					url: "/product",
					method: "POST",
					body: formData,
				};
			},
			invalidatesTags: ["Products"],
		}),
		deleteProduct: builder.mutation<ProductResponse, { id: string }>({
			query: ({ id }) => ({
				url: `/product/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),
		getProducts: builder.query<ProductListResponse, { page?: number; limit?: number; search?: string }>({
			query: ({ page = 1, limit = 10, search = "" }) => ({
				url: "/product",
				method: "GET",
				params: { page, limit, search },
			}),
			providesTags: ["Products"],
		}),
		getProduct: builder.query<ProductResponse, { id: string }>({
			query: ({ id }) => ({
				url: `/product/${id}`,
				method: "GET",
			}),
		providesTags: (result, error, arg) => [
			{ type: "Product", id: arg.id }
		],
		}),
		toggleStock: builder.mutation<ProductResponse, { id: string }>({
			query: ({ id }) => ({
				url: `/product/toggle-stock-product/${id}`,
				method: "GET",
			}),
			invalidatesTags: ["Products"],
		}),
		updateProduct: builder.mutation<ProductResponse, {
			id: string;
			name: string;
			unit: string;
			stock?: string;
			price: string;
			note?: string;
			tax?: string;
			images?: string[];
			newImages?: File[];
		}>({
			query: (body) => {
				const formData = new FormData();
				if (body.images) {
					body.images.forEach((img) => formData.append("images", img));
				}
				if (body.newImages) {
					body.newImages.forEach((file) => formData.append("newImages", file));
				}
				formData.append("name", body.name);
				formData.append("unit", body.unit);
				if (body?.stock) formData.append("stock", body.stock);
				formData.append("price", body.price);
				if (body.note) formData.append("note", body.note);
				if (body.tax !== undefined && body.tax !== null) formData.append("tax", body.tax);
				return {
					url: `/product/${body.id}`,
					method: "PATCH",
					body: formData,
				};
			},
			invalidatesTags: (result, error, arg) => [
				"Products",
				{ type: "Product", id: arg.id }
			],
		}),
	}),
});

export const {
	useAddProductMutation,
	useDeleteProductMutation,
	useGetProductsQuery,
	useGetProductQuery,
		useToggleStockMutation,
	useUpdateProductMutation,
} = productApi;
