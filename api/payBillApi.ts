import { baseApi } from "./baseApi";

interface BillCategory {
	id: string;
	title: string;
	icon: string;
	createdAt: string;
}

interface BillCategoryResponse {
	success: boolean;
	message: string;
	data: BillCategory[];
}

interface Biller {
	id: string;
	name: string;
	categoryId: string;
	icon: string;
	createdAt: string;
}

interface BillerResponse {
	success: boolean;
	message: string;
	data: Biller[];
}

interface BillPayment {
	id: string;
	billerId: string;
	meter_no: string;
	contact_no: string;
	amount: number;
	sms_account_no: string;
	subscription_id: string;
	status: "PENDING" | "PAID" | "REJECTED" | "PROCESSING";
	userId: string;
	charge: number;
	createdAt: string;
	biller?: {
		id: string;
		name: string;
		icon: string;
	};
}

interface BillPaymentRequest {
	billerId: string;
	meter_no: string;
	contact_no: string;
	sms_account_no?: string;
	subscription_id?: string;
	amount: number;
}

interface BillPaymentResponse {
	success: boolean;
	message: string;
	data: BillPayment;
}

interface BillHistoryResponse {
	success: boolean;
	message: string;
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPage: number;
	};
	data: BillPayment[];
}

export const payBillApi = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		// Get all bill categories
		getBillCategories: builder.query<BillCategoryResponse, void>({
			query: () => ({
				url: "/bill/category",
				method: "GET",
			}),
			providesTags: ["BillCategories"],
		}),

		// Get billers by category
		getBillers: builder.query<BillerResponse, { categoryId: string }>({
			query: ({ categoryId }) => ({
				url: "/bill/biller",
				method: "GET",
				params: { categoryId },
			}),
			providesTags: ["Billers"],
		}),

		// Get bill payment history
		getBillHistory: builder.query<BillHistoryResponse, { page?: number; limit?: number; userId?: string }>({
			query: ({ page = 1, limit = 10, userId = "" }) => ({
				url: "/bill/history",
				method: "GET",
				params: { page, limit, userId },
			}),
			providesTags: ["BillHistory"],
		}),

		// Create bill payment
		payBill: builder.mutation<BillPaymentResponse, BillPaymentRequest>({
			query: (body) => ({
				url: "/bill/pay",
				method: "POST",
				body,
			}),
			invalidatesTags: ["BillHistory"],
		}),
	}),
});

export const {
	useGetBillCategoriesQuery,
	useGetBillersQuery,
	useGetBillHistoryQuery,
	usePayBillMutation,
} = payBillApi;
