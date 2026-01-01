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

interface DebitRequest {
	bank_name: string;
	account_number: string;
	amount: string;
}

interface DebitResponse {
	success: boolean;
	message: string;
	meta: any;
	data: any;
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
		debitBalance: builder.mutation<DebitResponse, DebitRequest>({
			query: (body) => ({
				url: "/balance/debit",
				method: "POST",
				body,
			}),
			invalidatesTags: ["BalanceCredits"],
		}),
		getUserCredit: builder.query<
			{ success: boolean; message: string; data: any },
			{ bank_name: string; account_type: string }
		>({
			query: ({ bank_name, account_type }) => ({
				url: `/balance/account/${bank_name}/${account_type}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useCreditBalanceMutation,
	useDebitBalanceMutation,
	useGetCreditsQuery,
	useGetUserCreditQuery,
} = balanceApi;
