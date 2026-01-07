import { baseApi } from "./baseApi";

interface BalanceCredit {
	id: string;
	bank_name: string;
	account_number: string;
	amount: string;
	transaction_id: string | null;
	online_pay?: boolean;
	status: string;
	userId?: string;
	createdAt: string;
	user?: {
		id: string;
		name: string;
		phone: string;
	};
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

interface DebitListResponse {
	success: boolean;
	message: string;
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPage: number;
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

		// Online pay via bKash
		bkashOnlinePay: builder.mutation<{ success: boolean; message: string; data: any }, { amount: string }>({
			query: (body) => ({
				url: "/balance/bkash/create",
				method: "POST",
				body,
			}),
		}),
		getCredits: builder.query<CreditListResponse, { page?: number; limit?: number; transactionId?: string; userId?: string }>({
			query: ({ page = 1, limit = 10, transactionId = "", userId = "" }) => ({
				url: "/balance/credits",
				method: "GET",
				params: { page, limit, transactionId, userId },
			}),
			providesTags: ["BalanceCredits"],
		}),

		getDebits: builder.query<DebitListResponse, { page?: number; limit?: number; search?: string; status?: string }>({
			query: ({ page = 1, limit = 10, search = "", status = "" }) => ({
				url: "/balance/debits",
				method: "GET",
				params: { page, limit, search, status },
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
	useGetDebitsQuery,
	useGetUserCreditQuery,
	useBkashOnlinePayMutation,
} = balanceApi;
