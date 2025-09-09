import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    theme: "light" | "dark";
    modal: string | null;
    navbarItem: string | null;
    notification: string | null;
    userIconClicked: Boolean;
    showPassword: Boolean;
    isLoading: Boolean;
}

const initialState: UIState = {
    theme: "dark",
    modal: null,
    navbarItem:null,
    notification: null,
    userIconClicked: false,
    showPassword: false,
    isLoading:false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<"light" | "dark">) => {
            state.theme = action.payload;
        },
        setModal: (state, action: PayloadAction<string | null>) => {
            state.modal = action.payload;
        },
        setNotification: (state, action: PayloadAction<string | null>) => {
            state.notification = action.payload;
        },
        setNavbarItem: (state, action: PayloadAction<string | null>) => {
            state.navbarItem = action.payload;
        },
        setUserIconClicked: (state, action: PayloadAction<Boolean>) => {
            state.userIconClicked = action.payload;
        },
        setShowPassword: (state, action: PayloadAction<Boolean>) => {
            state.showPassword = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<Boolean>)=>{
            state.isLoading = action.payload
        }
    },
});

export const { setTheme, setIsLoading,setModal, setNotification, setNavbarItem, setUserIconClicked, setShowPassword } = uiSlice.actions;
export default uiSlice.reducer;
