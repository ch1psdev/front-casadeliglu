import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap"
import ReCAPTCHA from "react-google-recaptcha";
import { siteKey } from "../../../../config/config";
import { registrarService } from "../../../services/login/registerService";
import Swal from 'sweetalert2'
import { encryptDecrypt, endcodeBase64 } from "../../../helpers/validations";
import sha256 from "sha256";
import { ThreeCircles } from "react-loader-spinner";

export const Register = ({pshow, setMostrarRegistro}) => {

    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        contacto: '',
        correo: '',
        clave: '',
        direccion: '',
        comuna: '',
        ciudad: ''
    })
    const [repass, setRepass] = useState()
    // const [loader, setLoader] = useState(false);

    const recaptchaRef = useRef();

    const handleClose = () =>{
        setShow(false);
        setMostrarRegistro(false);
    } 
    const handleShow = () => setShow(true);

    const handleInput = (e) => {

        if(e.target.name=="nombre"||e.target.name=="apellido"){
            if(/^$|^[A-Za-z\u00C0-\u017F\s'-]+$/.test(e.target.value)){
                setForm({
                    ...form,
                    [e.target.name]: e.target.value
                })
            }else{
                return
            }
        }

        if(e.target.name=="contacto"){
            if(/^$|^[0-9]+$/.test(e.target.value)){
                setForm({
                    ...form,
                    [e.target.name]: e.target.value
                })
            }else{
                return
            }
        }

        if(e.target.name=="correo"){
            if(/^[a-zA-Z0-9._%+-@]+$/.test(e.target.value)){
                setForm({
                    ...form,
                    [e.target.name]: e.target.value
                })
            }else{
                return
            }
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async(e) => {
        // setLoader(true);
        e.preventDefault();

        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset()
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

        let inputRegistro = {
            nombre: form.nombre,
            apellido: form.apellido,
            contacto: form.contacto,
            correo: form.correo,
            clave: endcodeBase64(encryptDecrypt(sha256(form.clave),
            token.substring(token.length - 10, token.length))),
            direccion: form.direccion,
            comuna: form.comuna,
            ciudad: form.ciudad,
            captcha: token
        }

        await registrar(inputRegistro);
    }

    const registrar = async(usuario) => {
        await registrarService(usuario);
        handleClose();
        // setLoader(false);
    }
    
    useEffect(() => {
      setShow(pshow)
    }, [pshow])
     

  return (
    <>
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Crea tu usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={onSubmit}>
                <div className='form-group contenedor__login__group'>
                    <label htmlFor="nombre" className='contenedor__login__group__texto'>Nombre</label>
                    <input 
                        name="nombre" 
                        type="text" 
                        className='contenedor__login__group__campo form-control'
                        value={form.nombre} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="apellido" className='contenedor__login__group__texto'>Apellido</label>
                    <input 
                        name='apellido' 
                        type='text' 
                        className='contenedor__login__group__campo form-control'
                        value={form.apellido} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="contacto" className='contenedor__login__group__texto'>Contacto</label>
                    <input 
                        name='contacto' 
                        type='text' 
                        className='contenedor__login__group__campo form-control'
                        value={form.contacto} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="correo" className='contenedor__login__group__texto'>Correo</label>
                    <input 
                        name='correo' 
                        type='text' 
                        className='contenedor__login__group__campo form-control'
                        value={form.correo} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="direccion" className='contenedor__login__group__texto'>Dirección</label>
                    <input 
                        name='direccion' 
                        type='text' 
                        className='contenedor__login__group__campo form-control'
                        value={form.direccion} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="comuna" className='contenedor__login__group__texto'>Comuna</label>
                    <input 
                        name='comuna' 
                        type='text' 
                        className='contenedor__login__group__campo form-control'
                        value={form.comuna} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="ciudad" className='contenedor__login__group__texto'>Ciudad</label>
                    <input 
                        name='ciudad' 
                        type='text' 
                        className='contenedor__login__group__campo form-control'
                        value={form.ciudad} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="clave" className='contenedor__login__group__texto'>Contraseña</label>
                    <input 
                        name='clave' 
                        type='password' 
                        className='contenedor__login__group__campo form-control'
                        value={form.clave} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="clave2" className='contenedor__login__group__texto'>Repita su contraseña</label>
                    <input 
                        name='clave2' 
                        type='password' 
                        className='contenedor__login__group__campo form-control'
                        value={repass} 
                        onChange={(e) => setRepass(e.target.value)}  
                    />
                </div>

                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={siteKey}
                />

                <div className="contenedor__login__cont__button">
                    <button className='contenedor__login__button boton' onClick={handleClose}>Cerrar</button>
                    <button type="submit" className="boton-secundario">Registrar</button>
                </div>
                
            </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
