import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
} from "redux-persist";
import userReducer from "./user/userSlice";

// Custom storage implementation that works with redux-persist v6
const storage = {
    getItem: (key: string) => {
        try {
            const value = localStorage.getItem(key);
            return Promise.resolve(value);
        } catch (err) {
            return Promise.reject(err);
        }
    },
    setItem: (key: string, value: string) => {
        try {
            localStorage.setItem(key, value);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    },
    removeItem: (key: string) => {
        try {
            localStorage.removeItem(key);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    },
};

const persistConfig = {
    key: "root",
    storage,
    // Optional: Whitelist specific reducers to persist
    // whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;