import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToStorage } from "../../utils/storage";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export interface UserResponse {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  occupation: string;
  income: number;
  division: string;
  address: string;
  referralCode?: string | null;
  role: UserRole;
  status: UserStatus;
  passwordChangedAt: string;
  createdAt: string;
}

const initialState: { user: UserResponse | null; isLoaded: boolean } = {
  user: null,
  isLoaded: false,
};

export interface AuthPayload {
  token: string;
  user: any;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload;
      saveToStorage("auth", action.payload);
    },
    logout: (state) => {
      state.user = null;
      saveToStorage("auth", null);
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { setAuth, logout, setLoaded } = authSlice.actions;
export default authSlice.reducer;
