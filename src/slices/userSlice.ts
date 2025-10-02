import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  _id: string | null;
  name: string;
  email: string;
  theme: string;
  profilePic?: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  _id: null,
  name: "",
  email: "",
  theme:"",
  profilePic: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
    updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    updateTheme: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    clearUser: () => ({ ...initialState }),
  },
});

export const { setUser, updateProfile, updateTheme, clearUser } = userSlice.actions;
export default userSlice.reducer;
