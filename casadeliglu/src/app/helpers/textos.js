export const abreviar = (texto) =>{
    if(texto.length > 20){
        return texto.substring(0,19)+'...';
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