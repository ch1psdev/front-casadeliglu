import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        status: 'logout',
        products: null,
        info: {
            nombre: '',
            apellido: '',
            contacto: 0,
            correo: '',
            direccion: '',
            comuna: '',
            ciudad: '',
            rol: null
        },
        token: ''
},
    reducers: {
        // login: ( state ) => {
        //     state.status="login"
        // },
        login: ( state, {payload} ) => {
            console.log(payload);
            state.status = "identificado"
            state.info.nombre = payload.nombre,
            state.info.apellido = payload.apellido,
            state.info.contacto = payload.contacto,
            state.info.correo = payload.correo,
            state.info.direccion = payload.direccion,
            state.info.comuna = payload.comuna,
            state.info.ciudad = payload.ciudad,
            state.token = payload.token
            state.rol = payload.rol
        },
        cargarProductos: ( state, payload ) => {
            state.products = payload
        },

        logout: ( state ) => {
            state.status = 'logout'
            state.products = null,
            state.info.nombre = '',
            state.info.apellido = '',
            state.info.contacto = 0,
            state.info.correo = '',
            state.info.direccion = '',
            state.info.comuna = '',
            state.info.ciudad = '',
            state.token = '',
            state.rol = null
        }
    }
});

export const { login, cargarProductos, logout } = authSlice.actions;
export default authSlice.reducer;