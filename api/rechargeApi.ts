import { baseApi } from "./baseApi";

interface RechargeOfferResponse {
  success: boolean;
  message: string;
  data: any[];
}

interface RechargeRequest {
  amount?: number;
  network_type: "GRAMEENPHONE" | "ROBI" | "AIRTEL" | "BANGLALINK" | "TELETALK" | "SKITTO";
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
    getRechargeOffers: builder.query<RechargeOfferResponse, { sim_type: string; network_type: string }>(
      {
        query: ({ sim_type, network_type }) => ({
          url: `/recharge/recharge-offer`,
          method: "GET",
          params: { sim_type, network_type },
        }),
      }
    ),
    recharge: builder.mutation<RechargeResponse, RechargeRequest>({
      query: (body) => ({
        url: "/recharge",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetRechargeOffersQuery, useRechargeMutation } = rechargeApi;