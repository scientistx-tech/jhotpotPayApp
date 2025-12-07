import { saveToken } from "@/utils/auth";
import { setAuth, UserResponse } from "../store/slices/authSlice";
import { baseApi } from "./baseApi";

interface LoginRequest {
  phone: string;
  password: string;
}

interface LoginResponseWrapped {
  success: boolean;
  message: string;
  meta: any;
  data: {
    token: string;
    user: UserResponse;
  };
}

interface SendOtpRequest {
  phone: string;
}

interface SendOtpResponse {
  success: boolean;
  message: string;
  meta: any;
  data: {
    phone: string;
  };
}

interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

interface VerifyOtpData {
  id: string;
  code: string;
  phone: string;
  updatedAt: string;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  meta: any;
  data: VerifyOtpData;
}

interface RegisterRequest {
  name: string;
  password: string;
  nid: string;
  email?: string | null;
  occupation: string;
  income: number;
  division: string;
  address: string;
  referralCode?: string | null;
  otpId: string;
}

interface RegisterResponseData {
  token: string;
  user: UserResponse;
}

interface RegisterResponseWrapped {
  success: boolean;
  message: string;
  meta: any;
  data: RegisterResponseData;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: (body) => ({ url: "/auth/send-otp", method: "POST", body }),
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({ url: "/auth/otp-verify", method: "POST", body }),
    }),

    register: builder.mutation<RegisterResponseWrapped, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data.token && data.data.user) {
            dispatch(setAuth(data.data.user));
            await saveToken(data.data.token);
          }
        } catch (error) {
          console.log("Register error:", error);
        }
      },
    }),

    login: builder.mutation<LoginResponseWrapped, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data.token && data.data.user) {
            dispatch(setAuth(data.data.user));
            await saveToken(data.data.token);
          }
        } catch (error) {
          console.log("Login error:", error);
        }
      },
    }),

    checkAuth: builder.query<UserResponse, void>({
      query: () => `/auth/check-auth`,
      async onQueryStarted(queryArgument, queryLifeCycleApi) {
        try {
          const { data } = await queryLifeCycleApi.queryFulfilled;
          queryLifeCycleApi.dispatch(setAuth(data));
        } catch (error) {
          console.log("Check Auth error:", error);
        }
      },
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation, useRegisterMutation, useLoginMutation, useCheckAuthQuery } = authApi;
