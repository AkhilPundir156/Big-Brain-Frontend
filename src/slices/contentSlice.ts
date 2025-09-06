import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Content {
    _id: string;
    title: string;
    description: string;
    type: "text" | "image";
    tags: string[];
    link?: string;
}

interface ContentState {
    items: Content[];
    activeItem: Content | null,
    loading: boolean;
    error: string | null;
}

const initialState: ContentState = {
    items: [],
    activeItem: null,
    loading: false,
    error: null,
};

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        setContents: (state, action: PayloadAction<Content[]>) => {
            state.items = action.payload;
        },
        addContent: (state, action: PayloadAction<Content>) => {
            state.items.push(action.payload);
        },
        removeContent: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((c) => c._id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setActiveItem: (state, action:PayloadAction<Content | null>)=>{
            state.activeItem = action.payload;
        }
    },
});

export const { setContents, addContent, removeContent, setLoading, setError, setActiveItem } =
    contentSlice.actions;
export default contentSlice.reducer;
