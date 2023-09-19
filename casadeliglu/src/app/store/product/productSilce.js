import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState:{
        data: []
},
    reducers: {
        cargarProductos: ( state, payload ) => {
            state.data = payload.payload
        }
    }
});

export const { cargarProductos } = productSlice.actions;
export default productSlice.reducer;