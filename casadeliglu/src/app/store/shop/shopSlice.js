import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: 'shop',
    initialState:{
        products: [],
        total: 0
},
    reducers: {
        agregarProducto: ( state, payload ) => {
            state.products.push(payload);
        },

        actualizarProducto: ( state, payload ) => {
            const index = state.products.findIndex(data => data.payload.id == payload.payload.id);
            state.products[index] = payload;
        },

        eliminarProducto: ( state, payload ) => {
            state.products.splice(payload,1)
        },

        vaciarCarrito: ( state ) => {
            state.products = [];
            state.total = 0;                                                                             0;
        }
    }
});

export const { agregarProducto, actualizarProducto, eliminarProducto, vaciarCarrito } = shopSlice.actions;
export default shopSlice.reducer;