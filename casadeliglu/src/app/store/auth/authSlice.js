import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        status: 'logout',
        products: null
},
    reducers: {
        login: ( state ) => {
            state.status="login"
        },
        cargarProductos: ( state, payload ) => {
            state.products = payload
        } 
    }
});

export const { login, cargarProductos } = authSlice.actions;
export default authSlice.reducer;