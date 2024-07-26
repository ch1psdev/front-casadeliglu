import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState:{
        data: [],
        filtro: {
            nombre: '',
            familia: '',
            subFamilia: ''
        }
},
    reducers: {
        cargarProductos: ( state, payload ) => {
            state.data = payload.payload
        },

        filtrarProductosSubFamilia: ( state, {payload}) => {
            state.filtro.familia = payload.familia
            state.filtro.subFamilia = payload.subFamilia
        },

        limpiarFiltro: ( state ) => {
            state.filtro.nombre = '',
            state.filtro.familia = '',
            state.filtro.subFamilia = ''
        }
    }
});

export const { cargarProductos, filtrarProductosSubFamilia, limpiarFiltro } = productSlice.actions;
export default productSlice.reducer;