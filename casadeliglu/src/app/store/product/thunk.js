import { cargarProductos } from "./productSilce"

export const cargarProductosThunk = (productos) => {
    
    return async( dispatch ) => {
        
        await dispatch(cargarProductos(productos));

        return;
    }
}