import { urlApi } from "../../../config/config";

export const getProductosMantenedorService = async (token) => {
    try{
      const res = await fetch(`${urlApi}/Admin/getProductos`,{
          mode: 'cors',
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + token
          }
      });
  
      const data = await res.json();
      return data;
          
      }catch(e){
          throw e;
      }
  }

  export const getToggleVigenciaProductosService = async (token, idProducto) => {
    try{
      const res = await fetch(`${urlApi}/Admin/toggleVigenciaProductos`,{
          mode: 'cors',
          method: 'PUT',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + token
          },
          body: idProducto
      });
  
      const data = await res.json();
      return data;
          
      }catch(e){
          throw e;
      }
  }

  export const postUpdateProductoService = async (token, producto) => {
    try{
      const res = await fetch(`${urlApi}/Admin/updateProducto`,{
          mode: 'cors',
          method: 'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + token
          },
          body: JSON.stringify(producto)
      });
  
      const data = await res.json();
      return data;
          
      }catch(e){
          throw e;
      }
  }

  export const postAddProductoService = async (token, producto) => {
    try{
      const res = await fetch(`${urlApi}/Admin/agregarProducto`,{
          mode: 'cors',
          method: 'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + token
          },
          body: JSON.stringify(producto)
      });
  
      const data = await res.json();
      return data;
          
      }catch(e){
          throw e;
      }
  }

  export const getVentasServices = async (token) => {
    try{
      const res = await fetch(`${urlApi}/Venta/obtenerVentas`,{
          mode: 'cors',
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + token
          }
      });
  
      const data = await res.json();

      return data;
          
      }catch(e){
          throw e;
      }
  }