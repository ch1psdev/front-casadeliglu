import { iniciarSesionService } from "../../services/login/loginService";
import { login } from "./authSlice";

export const loginThunk = ( usuario ) => {
    
    return async( dispatch ) => {

        const res = await iniciarSesionService(usuario);

        if(res.code == 0){
            await dispatch(login(res.data))
        }

        return res

    }
}