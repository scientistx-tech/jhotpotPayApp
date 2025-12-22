import { baseApi } from "./baseApi";

interface Product {
	id: string;
	name: string;
	unit: string;
	stock: number;
	price: number;
	note?: string;
	tax?: number;
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
			stock: number;
			price: number;
			note?: string;
			tax?: number;
			images?: File[];
		}>({
			query: (body) => {
				const formData = new FormData();
				if (body.images) {
					body.images.forEach((file) => formData.append("images", file));
				}
				formData.append("name", body.name);
				formData.append("unit", body.unit);
				formData.append("stock", String(body.stock));
				formData.append("price", String(body.price));
				if (body.note) formData.append("note", body.note);
				if (body.tax !== undefined) formData.append("tax", String(body.tax));
				return {
					url: "/product",
					method: "POST",
					body: formData,
				};
			},
		}),
		deleteProduct: builder.mutation<ProductResponse, { id: string }>({
			query: ({ id }) => ({
				url: `/product/${id}`,
				method: "DELETE",
			}),
		}),
		getProducts: builder.query<ProductListResponse, { page?: number; limit?: number; search?: string }>({
			query: ({ page = 1, limit = 10, search = "" }) => ({
				url: "/product",
				method: "GET",
				params: { page, limit, search },
			}),
		}),
		getProduct: builder.query<ProductResponse, { id: string }>({
			query: ({ id }) => ({
				url: `/product/${id}`,
				method: "GET",
			}),
		}),
		updateProduct: builder.mutation<ProductResponse, {
			id: string;
			name: string;
			unit: string;
			stock: number;
			price: number;
			note?: string;
			tax?: number;
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
				formData.append("stock", String(body.stock));
				formData.append("price", String(body.price));
				if (body.note) formData.append("note", body.note);
				if (body.tax !== undefined) formData.append("tax", String(body.tax));
				return {
					url: `/product/${body.id}`,
					method: "PATCH",
					body: formData,
				};
			},
		}),
	}),
});

export const {
	useAddProductMutation,
	useDeleteProductMutation,
	useGetProductsQuery,
	useGetProductQuery,
	useUpdateProductMutation,
} = productApi;
