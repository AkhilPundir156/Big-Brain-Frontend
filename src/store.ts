import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import contentReducer from "./slices/contentSlice";
import chatReducer from "./slices/chatSlice";
import uiReducer from "./slices/uiSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    content: contentReducer,
    chat: chatReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;