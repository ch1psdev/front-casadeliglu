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
import { changePasswordService, codeValidatorService, recoveryPasswordService } from "../../../services/login/loginService";


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
    const [recuperarClave, setRecuperarClave] = useState('');
    const [codigoEnviado, setCodigoEnviado] = useState(false);
    const [codigoRecuperacion, setCodigoRecuperacion] = useState('');
    const [codigo, setCodigo] = useState('');
    const [errorCodigo, setErrorCodigo] = useState({
        state: false,
        message: ''
    })
    const [pasoRecuperacion, setPasoRecuperacion] = useState(0)
    const [viewPass, setViewPass] = useState(false)

    const recaptchaRef = createRef();

    const passRef = useRef();

    const notify = (texto) => {
        toast.success(texto, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
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

    const obtenerCodigoRecuperacionClave = async(e) => {
        e.preventDefault();

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

        if(form.correo == ''){

            !form.correo ? setErrorCorreo(true) : setErrorCorreo(false)
        
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

        let input = {
            correo: form.correo,
            captcha: token
        }
        

        const codigo = await recoveryPasswordService(input).then(data=>{
                if(data.status == 200){
                    setPasoRecuperacion(2);
                }else if(data.status == 400){
                    Swal.fire({
                        title: data.text,
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0C2695'
                        })    
                }
                
            }).catch((error)=>{
                Swal.fire({
                    title: 'Ha ocurrido un error, inténtalo más tarde.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0C2695'
                    })     
            })
    }

    const handleInputCodigo = (e) => {
        if(/^[0-9]*$/.test(e.target.value) && e.target.value.length < 7){
            setCodigo(e.target.value)
        }
    }
    
    const enviarCodigoRecuperacion = async(e) => {
        e.preventDefault();

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

        if(codigo.length != 6){
            setErrorCodigo({
                state: true,
                message: 'El código ingresado no es válido.'
            })
            return
        }else{
            setErrorCodigo({
                state: false,
                message: ''
            })
        }

        let data = {
            correo: form.correo, 
            codigo: codigo,
            captcha: token
        }

        const res = await codeValidatorService(data)
            .then((data)=>{setPasoRecuperacion(3)})
    }

    const handleRecuperarPass = (e) =>{
        setRecuperarClave(e.target.value)
    }

    const cambiarPassword = async(e) => {
        e.preventDefault();

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

        const data = {
            correo: form.correo,
            password: endcodeBase64(encryptDecrypt(sha256(recuperarClave),
            token.substring(token.length - 10, token.length))),
            captcha: token
        }

        const res = await changePasswordService(data).then((data)=>{
            handleCloseLogin()
            Swal.fire({
                title: 'Contraseña cambiada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
        })
    }

    useEffect(() => {
        setErrorCorreo(false)
        setErrorCorreoFormato(false)
        setErrorPass(false)
    }, [])

    useEffect(() => {
        !show && setPasoRecuperacion(0);
    }, [show])

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
            {
                pasoRecuperacion === 0 &&
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
                            <a className="contenedor__login__group__recovery" onClick={()=>setPasoRecuperacion(1)}>¿Olvidaste tu contraseña?</a>
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
            }

            {
                pasoRecuperacion === 1 &&
                    <form className='contenedor__login' onSubmit={obtenerCodigoRecuperacionClave}>
                        <h2 className='contenedor__login__titulo'>Recuperar contraseña</h2>
                        <p>Ingresa tu correo electrónico en el cual recibirás un código para recuperar tu cuenta.</p>
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
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={siteKey}
                        />
                        <button type="submit" className='contenedor__login__button boton'>Obtener código</button>
                    </form>
            }

            {
                pasoRecuperacion === 2 &&
                    <form className='contenedor__login' onSubmit={enviarCodigoRecuperacion}>
                        <h2 className='contenedor__login__titulo'>Ingresar código</h2>
                        <p>Ingresa el código de recuperación que ha sido enviado a tu correo electrónico. Si no logras visualizar el correo, contáctate con nostros.</p>
                        <div className='form-group contenedor__login__group'>
                            <label htmlFor="codigo" className='contenedor__login__group__texto'>Código de recuperación</label>
                            <input 
                                name="codigo" 
                                type="text" 
                                className={`contenedor__login__group__campo form-control ${errorCorreo && 'input-error'}`}
                                value={codigo} 
                                onChange={handleInputCodigo}  
                            />
                            {/* <span className={`${errorCodigo.state ? 'd-block' : 'd-none'} spanInput`}>El código ha expirado.</span> */}
                            <span className={`${errorCodigo.state ? 'd-block' : 'd-none'} spanInput`}>{errorCodigo.message}</span>
                        </div>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={siteKey}
                        />
                        <button type="submit" className='contenedor__login__button boton'>Aceptar</button>
                    </form>
            }

            {
                pasoRecuperacion === 3 &&
                    <form className='contenedor__login' onSubmit={cambiarPassword}>
                        <h2 className='contenedor__login__titulo'>Cambiar contraseña</h2>
                        <p>Ingresa tu nueva contraseña.</p>

                        <div className='form-group contenedor__login__group'>
                            <label htmlFor="clave" className='contenedor__login__group__texto'>Contraseña</label>
                            <div className="d-flex">
                                <input 
                                    name='clave'
                                    type={`${viewPass ? 'text' : 'password'}`}
                                    id="clave"
                                    className={`contenedor__login__group__campo form-control`}
                                    value={recuperarClave} 
                                    onChange={handleRecuperarPass}  
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
                        <button type="submit" className='contenedor__login__button boton'>Aceptar</button>
                    </form>
            }
            
        </Modal.Body>
      </Modal>


      <LoaderComponent mostrarLoader={mostrarLoader} setMostrarLoader={setMostrarLoader} handleCloseLoader={handleClose} />
    </>
  )
}
