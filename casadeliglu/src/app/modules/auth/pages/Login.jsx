import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../../store/auth/authSlice"
import * as CryptoJS from 'crypto-js';
import { createRef, useState } from "react";
import { loginKey, loginUser, loginValue, siteKey } from "../../../../config/config";
import { iniciarSesion } from "../../../helpers/Login/IniciarSesionHelper";
import Swal from 'sweetalert2'
import ReCAPTCHA from "react-google-recaptcha";

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        correo:'',
        clave:'',
        captcha: siteKey 
    });

    const recaptchaRef = createRef()

    const logear = async() => {
        
        if(form.clave == '' || form.correo == ''){
            Swal.fire({
                title: 'Debes completar todos los campos',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
            return
        }

        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset()
        if(!token){
            Swal.fire({
                title: 'No se ha podido validar el captcha',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
        return
        }

        const input = {
            correo: form.correo,
            clave: form.clave,
            captcha: token 
        }

        // let res1 = CryptoJS.AES.decrypt(loginValue, loginKey).toString(CryptoJS.enc.Utf8);
        
        // if(form.usuario != loginUser || form.password != res1){
        //     Swal.fire({
        //         title: 'Los datos ingresados con incorrectos',
        //         icon: 'error',
        //         confirmButtonText: 'Aceptar',
        //         confirmButtonColor: '#0C2695'
        //       })
        //     return
        // }else{
             dispatch(login());
             window.location.reload()
        // }

        let data = await iniciarSesion(input);
        
    }

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    

  return (
    <>
        <div className="content-fluid login">
            <div className="caja__login">
                <h1>Iniciar sesión</h1>
                <div className="caja__inputs">
                    <input 
                        type="text" 
                        placeholder="correo" 
                        name="correo"
                        className="form-control" 
                        value={form.correo} 
                        onChange={handleInput} 
                    />
                    <input 
                        type="clave" 
                        placeholder="Contraseña" 
                        name="clave" 
                        className="form-control" 
                        value={form.clave} 
                        onChange={handleInput} 
                    />
                </div>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={siteKey}
                />
                <button className="boton" onClick={() => logear()}>Ingresar</button>
            </div>
            <div>
                <a onClick={() => navigate(-1)} className="manito">Volver</a>
            </div>
            
        </div>
    </>
  )
}
