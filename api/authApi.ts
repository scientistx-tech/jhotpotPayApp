import { saveToken } from "@/utils/auth";
import { setAuth, UserResponse } from "../store/slices/authSlice";
import { baseApi } from "./baseApi";

interface LoginRequest {
  phone: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: UserResponse;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data.user));
          await saveToken(data.token);
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

export const { useLoginMutation, useCheckAuthQuery } = authApi;
