import { baseApi } from "./baseApi";
export interface RechargeOfferResponse {
  success: boolean;
  message: string;
  data: RechargeOffer[];
}

interface RechargeUser {
  name: string;
  phone: string;
  email: string;
}

interface RechargeOffer {
  id: string;
  type: string;
  sim_type: string;
  network_type: string;
  cash_back: number;
  price: number;
  offerId: string;
  offer: {
    id: string;
    title: string;
  };
  name: string;
  validity: string;
  createdAt: string;
}

interface RechargeItem {
  id: string;
  amount: number | null;
  phone: string;
  userId: string;
  status: string;
  bonus: number;
  network_type: string;
  sim_type: string;
  offerId: string | null;
  createdAt: string;
  offer: RechargeOffer | null;
  user: RechargeUser;
}

interface GetRechargesResponse {
  success: boolean;
  message: string;
  data: RechargeItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface RechargeRequest {
  amount?: number;
  network_type:
    | "GRAMEENPHONE"
    | "ROBI"
    | "AIRTEL"
    | "BANGLALINK"
    | "TELETALK"
    | "SKITTO";
  sim_type: "PRE_PAID" | "POST_PAID";
  offerId?: string;
  phone: string;
}

interface RechargeResponse {
  success: boolean;
  message: string;
  data: any;
}

export const rechargeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRechargeOffers: builder.query<
      RechargeOfferResponse,
      {
        sim_type?: string;
        network_type?: string;
        amount?: string;
      }
    >({
      query: ({ sim_type, network_type, amount }) => ({
        url: `/recharge/recharge-offer`,
        method: "GET",
        params: { sim_type, network_type, amount: amount || "" },
      }),
    }),
    recharge: builder.mutation<RechargeResponse, RechargeRequest>({
      query: (body) => ({
        url: "/recharge",
        method: "POST",
        body,
      }),
    }),

    getRecharges: builder.query<
      GetRechargesResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/recharge",
        method: "GET",
        params: { page, limit, search },
      }),
    }),
  }),
});

export const {
  useGetRechargeOffersQuery,
  useRechargeMutation,
  useGetRechargesQuery,
} = rechargeApi;
