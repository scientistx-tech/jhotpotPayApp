import { baseApi } from "./baseApi";

interface BalanceCredit {
	id: string;
	bank_name: string;
	account_number: string;
	amount: string;
	transaction_id: string;
	online_pay: boolean;
	status: string;
	userId: string;
	createdAt: string;
}

interface CreditRequest {
	bank_name: string;
	account_number: string;
	amount: string;
	transaction_id: string;
	online_pay: boolean;
	password: string;
}

interface CreditResponse {
	success: boolean;
	message: string;
	meta: any;
	data: BalanceCredit;
}

interface CreditListResponse {
	success: boolean;
	message: string;
	meta?: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	data: BalanceCredit[];
}

export const balanceApi = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		creditBalance: builder.mutation<CreditResponse, CreditRequest>({
			query: (body) => ({
				url: "/balance/credit",
				method: "POST",
				body,
			}),
			invalidatesTags: ["BalanceCredits"],
		}),
		getCredits: builder.query<CreditListResponse, { page?: number; limit?: number; transactionId?: string; userId?: string }>({
			query: ({ page = 1, limit = 10, transactionId = "", userId = "" }) => ({
				url: "/balance/credits",
				method: "GET",
				params: { page, limit, transactionId, userId },
			}),
			providesTags: ["BalanceCredits"],
		}),
	}),
});

export const {
	useCreditBalanceMutation,
	useGetCreditsQuery,
} = balanceApi;
