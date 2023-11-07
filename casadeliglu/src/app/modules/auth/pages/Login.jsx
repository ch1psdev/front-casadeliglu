import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { login } from "../../../store/auth/authSlice"
import { createRef, useEffect, useState } from "react";
import { siteKey } from "../../../../config/config";
import { iniciarSesion } from "../../../helpers/Login/IniciarSesionHelper";
import Swal from 'sweetalert2'
import ReCAPTCHA from "react-google-recaptcha";
import { encryptDecrypt, endcodeBase64, validaCorreo } from "../../../helpers/validations";
import sha256 from "sha256";
import { loginThunk } from "../../../store/auth/thunks";
import { ToastContainer, toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { Loader } from "../../../components/Loader";
import { Modal } from "react-bootstrap";

export const Login = ({show, handleCloseLogin}) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        correo:'',
        password:'',
        captcha: siteKey 
    });
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorPass, setErrorPass] = useState(false);

    const recaptchaRef = createRef();

    const notify = (texto) => {
        toast.success(texto, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleInput = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onLogin = async(e) => {
        // setLoader(true);
        e.preventDefault();

        if(form.clave == '' || form.correo == ''){
            Swal.fire({
                title: 'Debes completar todos los campos',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
            //   setLoader(false);
            return
        }
        const resCorreo = validaCorreo(form.correo);

        if (!resCorreo){
            setErrorCorreo(true)
            // setLoader(false);
            return;
        }

        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        if(!token){
            Swal.fire({
                title: 'No se ha podido validar el captcha',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
            //   setLoader(false);
        return
        }

        const input = {
            correo: form.correo,
            clave: endcodeBase64(encryptDecrypt(sha256(form.password),
                token.substring(token.length - 10, token.length))),
            captcha: token 
        }

        const res = await dispatch(loginThunk(input))

        if(res == 0){
            notify('Sesión iniciada correctamente!');
            handleCloseLogin();
        }
    }

    useEffect(() => {
        setErrorCorreo(false)
    }, [])
    

  return (
    <>
    <Modal show={show} onHide={handleCloseLogin} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Crea tu usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='contenedor__login' onSubmit={onLogin}>
                <h2 className='contenedor__login__titulo'>Inicia sesión</h2>
                <div className='form-group contenedor__login__group'>
                    <label htmlFor="correo" className='contenedor__login__group__texto'>Correo</label>
                    <input 
                        name="correo" 
                        type="text" 
                        className='contenedor__login__group__campo form-control'
                        value={form.correo} 
                        onChange={handleInput}  
                    />
                    <span className={`${errorCorreo ? 'd-block' : 'd-none'} spanInput`}>El correo ingresado no es válido</span>
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="password" className='contenedor__login__group__texto'>Contraseña</label>
                    <input 
                        name='password' 
                        type='password' 
                        className='contenedor__login__group__campo form-control'
                        value={form.password} 
                        onChange={handleInput}  
                    />
                </div>
                <span className={`${errorPass ? 'd-block' : 'd-none'} spanInput`}>La contraseña ingresada no es válida</span>

                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={siteKey}
                />

                <button type="submit" className='contenedor__login__button boton'>Iniciar sesión</button>
                <Link className="contenedor__login__registrar" onClick={()=>setMostrarRegistro(true)}>
                    Regístrate aquí
                </Link>
            </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
