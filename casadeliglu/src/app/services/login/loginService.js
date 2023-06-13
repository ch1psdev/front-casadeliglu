import { urlApi } from "../../../config/config"

export const iniciarSesionService = async (usuario) => {
  try{
    const res = await fetch(`${urlApi}/Usuario/login`,{
        mode: 'cors',
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    });

    const data = await res.json();
    return data;
        
    }catch(e){
        throw e;
        return;
    }
}
