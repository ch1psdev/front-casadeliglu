import { iniciarSesionService } from "../../services/login/loginService"

export const iniciarSesion = async(inputLogin) => {

    const data = await iniciarSesionService(inputLogin);
    return data;
}