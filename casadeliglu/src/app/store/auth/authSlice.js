import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        status: 'logout',
        products: null,
        info: {
            idUsuario: 0,
            nombre: '',
            apellido: '',
            contacto: 0,
            correo: '',
            clave: '',
            direccion: '',
            comuna: '',
            ciudad: ''
        }
},
    reducers: {
        // login: ( state ) => {
        //     state.status="login"
        // },
        login: ( state, {payload} ) => {
            state.status = "identificado"
            state.info.idUsuario = payload.idUsuario,
            state.info.nombre = payload.nombre,
            state.info.apellido = payload.apellido,
            state.info.contacto = payload.contacto,
            state.info.correo = payload.correo,
            state.info.clave = payload.clave,
            state.info.direccion = payload.direccion,
            state.info.comuna = payload.comuna,
            state.info.ciudad = payload.ciudad
        },
        cargarProductos: ( state, payload ) => {
            state.products = payload
        } 
    }
});

export const { login, cargarProductos } = authSlice.actions;
export default authSlice.reducer;