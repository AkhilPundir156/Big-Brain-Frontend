import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChatMessage {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
}

interface ChatState {
    history: ChatMessage[];
    context: string[]; // retrieved chunks from vector DB
    loading: boolean;
}

const initialState: ChatState = {
    history: [],
    context: [],
    loading: false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.history.push(action.payload);
        },
        setContext: (state, action: PayloadAction<string[]>) => {
            state.context = action.payload;
        },
        clearChat: () => initialState,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { addMessage, setContext, clearChat, setLoading } =
    chatSlice.actions;
export default chatSlice.reducer;
