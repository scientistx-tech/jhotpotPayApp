
import { baseApi } from "./baseApi";

export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	userId: string;
	createdAt: string;
}

export interface CustomerListResponse {
	success: boolean;
	message: string;
	data: Customer[];
	meta?: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface CustomerResponse {
	success: boolean;
	message: string;
	data: Customer;
}


export const customerApi = baseApi.injectEndpoints({
  overrideExisting: true,
	endpoints: (builder) => ({
		addCustomer: builder.mutation<CustomerResponse, {
			name: string;
			email: string;
			phone: string;
			address: string;
		}>({
			query: (body) => ({
				url: "/product/customers",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Customers"],
		}),
		updateCustomer: builder.mutation<CustomerResponse, {
			id: string;
			name: string;
			email: string;
			phone: string;
			address: string;
		}>({
			query: ({ id, ...body }) => ({
				url: `/product/customers/${id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, arg) => [
				"Customers",
				{ type: "Customer", id: arg.id },
			],
		}),
		deleteCustomer: builder.mutation<CustomerResponse, { id: string }>({
			query: ({ id }) => ({
				url: `/product/customers/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Customers"],
		}),
		getCustomers: builder.query<CustomerListResponse, { page?: number; limit?: number; search?: string }>({
			query: ({ page = 1, limit = 10, search = "" }) => ({
				url: "/product/customers",
				method: "GET",
				params: { page, limit, search },
			}),
			providesTags: ["Customers"],
		}),
		getCustomer: builder.query<CustomerResponse, { id: string }>({
			query: ({ id }) => ({
				url: `/product/customers/${id}`,
				method: "GET",
			}),
			providesTags: (result, error, arg) => [
				{ type: "Customer", id: arg.id },
			],
		}),
	}),
});

export const {
	useAddCustomerMutation,
	useUpdateCustomerMutation,
	useDeleteCustomerMutation,
	useGetCustomersQuery,
	useGetCustomerQuery,
} = customerApi;
