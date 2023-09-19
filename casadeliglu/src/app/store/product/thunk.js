import { cargarProductos } from "./productSilce"

export const cargarProductosThunk = (productos) => {
    
    return async( dispatch ) => {

        console.log(productos)

        
        await dispatch(cargarProductos(productos));

        return;
    }
}