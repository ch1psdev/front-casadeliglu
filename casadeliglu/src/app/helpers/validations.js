import Swal from 'sweetalert2'
import {Buffer} from 'buffer'

export const validaCorreo = (correo) =>{
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!regexCorreo.test(correo)){

        Swal.fire({
            title: 'El correo ingresado no es válido',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0C2695'
        });

        return false;
    }

    return true;
}

export function endcodeBase64(data){
    return Buffer.from(data).toString('base64');
}

export function encryptDecrypt(password, keyPass){
    
    var key = keyPass.split("");
    var output = [];

    for(var i = 0; i < password.length; i++){
        var charCode = password.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
        output.push(String.fromCharCode(charCode));
    }
    return output.join("");
}