import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import shopSlice from "./shop/shopSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['usuarioState', 'carritoState']
}

const rootReducer = combineReducers({
    usuarioState: authReducer,
    carritoState: shopSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: [thunk]
});