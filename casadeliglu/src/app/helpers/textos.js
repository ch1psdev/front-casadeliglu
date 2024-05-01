export const abreviar = (texto) =>{
    if(texto.length > 20){
        return texto.substring(0,22)+'...';
    }else{
        return texto
    }
}

export const capitalizar = (texto) => {
    
    let res;
    
    if(texto != null){
        res = texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

    return res;
}

export const obtenerFechaYHoraActual = () => {
    const fecha = new Date();
    
    const anio = fecha.getFullYear();
    const mes = agregarCero(fecha.getMonth() + 1);
    const dia = agregarCero(fecha.getDate());
    
    const horas = agregarCero(fecha.getHours());
    const minutos = agregarCero(fecha.getMinutes());
    const segundos = agregarCero(fecha.getSeconds());
    const milisegundos = fecha.getMilliseconds();
  
    // Concatenar los valores en un string
    const fechaYHora = `${anio}${mes}${dia}${horas}${minutos}${segundos}${milisegundos}`;
  
    return fechaYHora;
  };
  
  const agregarCero = (valor) => {
    return valor < 10 ? `0${valor}` : valor;
  };