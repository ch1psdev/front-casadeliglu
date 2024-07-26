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
    }
}

export const recoveryPasswordService = async (datos) => {
    try{
      const res = await fetch(`${urlApi}/Usuario/recuperarClave`,{
          mode: 'cors',
          method: 'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos)
      }).then(data=>{return data});
  
      const data = {
        status: res.status,
        text: await res.text()
      };
      return data;
          
      }catch(e){
          throw e;
      }
  }

  export const codeValidatorService = async (datos) => {
    try{
      const res = await fetch(`${urlApi}/Usuario/validarCodigo`,{
          mode: 'cors',
          method: 'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos)
      });
  
      const data = await res.text();
      return data;
          
      }catch(e){
          throw e;
      }
  }

  export const changePasswordService = async (datos) => {
    try{
      const res = await fetch(`${urlApi}/Usuario/cambiarClave`,{
          mode: 'cors',
          method: 'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos)
      });
  
      const data = await res.text();
      return data;
          
      }catch(e){
          throw e;
      }
  }