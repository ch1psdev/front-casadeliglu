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
          return;
      }
  }