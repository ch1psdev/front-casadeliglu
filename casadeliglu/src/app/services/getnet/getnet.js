import { urlApi } from "../../../config/config";

export const pagar = async (input) => {
    try{
      const res = await fetch(`${urlApi}/session`,{
          mode: 'cors',
          method: 'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(input)
      });
  
      const data = await res.json();
      return data;
          
      }catch(e){
          throw e;
      }
  }

  export const consultarPago = async (requestId) => {
    try{
      const res = await fetch(`${urlApi}/pago/${requestId}`,{
          mode: 'cors',
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      });
  
      const data = await res.json();
      return data;
          
      }catch(e){
          throw e;
      }
  }

  export const getNumeroCompra = async (pagoGetnet) => {
    try{
      const res = await fetch(`${urlApi}/pago/obtenerNumeroCompra/${pagoGetnet}`,{
          mode: 'cors',
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      });
  
      const data = await res.json();
      return data;
          
      }catch(e){
          throw e;
      }
  }

  export const getCostoEnvio = async (comuna) => {
    try{
      const res = await fetch(`${urlApi}/obtenerCostoEnvio/${comuna}`,{
          mode: 'cors',
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      });
  
      const data = await res.json();
      return data;
          
      }catch(e){
          throw e;
      }
  }