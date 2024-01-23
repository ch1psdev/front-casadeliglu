import { urlApi } from "../../../config/config";

export const getProductosService = async () => {
    try{
      const res = await fetch(`${urlApi}/Producto/obtenerProductos`,{
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
          return;
      }
  }