import { urlApi } from "../../../config/config"

export const iniciarSesionService = async (usuario) => {
    try{
        const res = await fetch(`${urlApi}/Auth/login`,{
            mode: 'cors',
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario)
        });

        let data = res.ok && await res.json()

        return data;
  
    }catch(e){
        throw e;
    }
}

export const recoveryPasswordService = async (datos) => {
    try{
      const res = await fetch(`${urlApi}/Auth/recuperarClave`,{
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
      const res = await fetch(`${urlApi}/Auth/validarCodigo`,{
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
      const res = await fetch(`${urlApi}/Auth/cambiarClave`,{
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