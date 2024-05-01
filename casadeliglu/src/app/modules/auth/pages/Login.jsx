import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { createRef, useEffect, useRef, useState } from "react";
import { siteKey } from "../../../../config/config";
import Swal from 'sweetalert2'
import ReCAPTCHA from "react-google-recaptcha";
import { encryptDecrypt, endcodeBase64, validaCorreo } from "../../../helpers/validations";
import sha256 from "sha256";
import { loginThunk } from "../../../store/auth/thunks";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { LoaderComponent } from "../../../components/Loader";
import visible from '../../../../assets/icons/visible.svg';
import notvisible from '../../../../assets/icons/not-visible.svg';

export const Login = ({show, handleCloseLogin, irRegistro}) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        correo:'',
        password:'',
        captcha: siteKey 
    });
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorCorreoFormato, setErrorCorreoFormato] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [mostrarLoader, setMostrarLoader] = useState(false);

    const [viewPass, setViewPass] = useState(false)

    const recaptchaRef = createRef();

    const passRef = useRef();

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

    const handleClose = () => {
        setMostrarLoader(false)
      }

    const handleInput = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onLogin = async(e) => {
        e.preventDefault();
        

        if(form.password == '' || form.correo == ''){

            !form.correo ? setErrorCorreo(true) : setErrorCorreo(false)
            !form.password ? setErrorPass(true) : setErrorPass(false)

            Swal.fire({
                title: 'Debes completar todos los campos',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
              
            return
        }
        const resCorreo = validaCorreo(form.correo);

        if (!resCorreo){
            setErrorCorreoFormato(true)
            
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
              
        return
        }
        setMostrarLoader(true);

        const input = {
            correo: form.correo,
            clave: endcodeBase64(encryptDecrypt(sha256(form.password),
                token.substring(token.length - 10, token.length))),
            captcha: token 
        }

        const res = await dispatch(loginThunk(input))

        if(res.code == 0){
            notify('Sesión iniciada correctamente!');
            handleCloseLogin();
        }else{
            Swal.fire({
                title: res.data,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
        }
        setMostrarLoader(false);
        
    }

    useEffect(() => {
        setErrorCorreo(false)
        setErrorCorreoFormato(false)
        setErrorPass(false)
    }, [])

    useEffect(() => {
      const inpPass = document.getElementById('password')

      viewPass ? inpPass?.setAttribute('type', 'text') : inpPass?.setAttribute('type', 'password')

    }, [viewPass])
    
    

  return (
    <>
    <Modal show={show} onHide={handleCloseLogin} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='contenedor__login' onSubmit={onLogin}>
                <h2 className='contenedor__login__titulo'>Inicia sesión</h2>
                <div className='form-group contenedor__login__group'>
                    <label htmlFor="correo" className='contenedor__login__group__texto'>Correo</label>
                    <input 
                        name="correo" 
                        type="text" 
                        className={`contenedor__login__group__campo form-control ${errorCorreo && 'input-error'}`}
                        value={form.correo} 
                        onChange={handleInput}  
                    />
                    <span className={`${errorCorreoFormato ? 'd-block' : 'd-none'} spanInput`}>El correo ingresado no es válido</span>
                </div>

                <div className='form-group contenedor__login__group'>
                    
                    <label htmlFor="password" className='contenedor__login__group__texto'>Contraseña</label>
                    <div className="d-flex">
                        <input 
                            name='password' 
                            type='password'
                            id="password" 
                            ref={passRef}
                            className={`contenedor__login__group__campo form-control ${errorPass && 'input-error'}`}
                            value={form.password} 
                            onChange={handleInput}  
                        />
                        <button className="magic-eye" type="button" onClick={()=>setViewPass(!viewPass)}>
                            {
                                viewPass ? (<img src={visible} alt="visible" />) : (<img src={notvisible} alt="not visible" />)
                            }
                            
                            
                        </button>
                    </div>
                </div>

                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={siteKey}
                />

                <button type="submit" className='contenedor__login__button boton'>Iniciar sesión</button>
                <Link className="contenedor__login__registrar" onClick={irRegistro}>
                    Regístrate aquí
                </Link>
            </form>
        </Modal.Body>
      </Modal>


      <LoaderComponent mostrarLoader={mostrarLoader} setMostrarLoader={setMostrarLoader} handleCloseLoader={handleClose} />
    </>
  )
}
