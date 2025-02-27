import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './toasts';
import userReducer from './user'


export const store = configureStore({
    reducer: {
        user: userReducer,
        toast: toastReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
