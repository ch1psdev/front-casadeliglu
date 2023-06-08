import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../../store/auth/authSlice"
import * as CryptoJS from 'crypto-js';
import { useState } from "react";
import { loginKey, loginUser, loginValue } from "../../../../config/config";
import Swal from 'sweetalert2'

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        usuario:'',
        password:''
    });

    const logear = () => {
        
        if(form.password == '' || form.usuario == ''){
            Swal.fire({
                title: 'Debes completar todos los campos',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
            return
        }

        let res1 = CryptoJS.AES.decrypt(loginValue, loginKey).toString(CryptoJS.enc.Utf8);
        
        if(form.usuario != loginUser || form.password != res1){
            Swal.fire({
                title: 'Los datos ingresados con incorrectos',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
            return
        }else{
            dispatch(login());
            window.location.reload()
        }

        
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
                        placeholder="Usuario" 
                        name="usuario"
                        className="form-control" 
                        value={form.usuario} 
                        onChange={handleInput} 
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        name="password" 
                        className="form-control" 
                        value={form.password} 
                        onChange={handleInput} 
                    />
                </div>
                <button className="boton" onClick={() => logear()}>Ingresar</button>
            </div>
            <div>
                <a onClick={() => navigate(-1)} className="manito">Volver</a>
            </div>
            
        </div>
    </>
  )
}
