import { iniciarSesionService } from "../../services/login/loginService";
import { cargarComuna, login } from "./authSlice";

export const loginThunk = ( usuario ) => {
    
    return async( dispatch ) => {

        const res = await iniciarSesionService(usuario)
            .then(({data, success})=>{
                if(success){
                    dispatch(login(data))
                    dispatch(cargarComuna(data.comuna))
                    return {data, success}
                }
            });

        return res

    }
}