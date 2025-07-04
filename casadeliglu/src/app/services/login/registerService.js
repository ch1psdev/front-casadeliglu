import { urlApi } from "../../../config/config";

export const registrarService = async (usuario) => {
    try{
        console.log(usuario)
      const res = await fetch(`${urlApi}/Auth/registrar`,{
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
      }
  }