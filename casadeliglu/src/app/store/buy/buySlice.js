import { createSlice } from "@reduxjs/toolkit";

export const buySlice = createSlice({
    name: 'buy',
    initialState:{
        email:'',
        mobile: '',
        name: '',
        surname:'',
        currency: "CLP",
        total: 0,
        description: 'Compra online Casa del Iglú',
        expiration: '2023-09-19T03:15:48+00:00',
        ipAddress: '',
        locale: 'es_CL',
        userAgent:'',
        items:[],
        referecence:''
    },
    reducers: {

        actualizarCompra: ( state, payload ) => {
            state.items = payload.payload;
        },
        agregarDatosPersonales: ( state, payload ) =>{
            state.name = payload.payload.nombre,
            state.surname = payload.payload.apellidos,
            state.email = payload.payload.correo,
            state.mobile = payload.payload.numeroContacto.toString()
        },
        agregarInfoDevice: (state, payload ) =>{
            console.log(payload)
            state.ipAddress = payload.payload.ipAddress,
            state.userAgent = payload.payload.userAgent
        },
        agregarTotal: ( state, payload ) => {
            state.total = payload.payload
        },
        limpiarCompra: ( state ) => {
            state.email = '',
            state.mobile = '',
            state.name = '',
            state.surname = '',
            state.total = 0,
            state.expiration = '',
            state.ipAddress = '',
            state.userAgent = '',
            state.items = [],
            state.referecence = ''
        }

    }
});

export const { actualizarCompra, agregarDatosPersonales, agregarInfoDevice, agregarTotal, limpiarCompra } = buySlice.actions;
export default buySlice.reducer;