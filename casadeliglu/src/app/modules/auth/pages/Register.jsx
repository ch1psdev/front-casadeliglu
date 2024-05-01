import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap"
import ReCAPTCHA from "react-google-recaptcha";
import { siteKey } from "../../../../config/config";
import { registrarService } from "../../../services/login/registerService";
import Swal from 'sweetalert2'
import { encryptDecrypt, endcodeBase64 } from "../../../helpers/validations";
import sha256 from "sha256";
import { LoaderComponent } from "../../../components/Loader";
import visible from '../../../../assets/icons/visible.svg';
import notvisible from '../../../../assets/icons/not-visible.svg';

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

    const [errorNombre, setErrorNombre] = useState(false) 
    const [errorApellido, setErrorApellido] = useState(false)
    const [errorContacto, setErrorContacto] = useState(false)
    const [errorCorreo, setErrorCorreo] = useState(false)
    const [errorDireccion, setErrorDireccion] = useState(false)
    const [errorComuna, setErrorComuna] = useState(false)
    const [errorCiudad, setErrorCiudad] = useState(false)
    const [errorClave, setErrorClave] = useState(false)
    const [errorClave2, setErrorClave2] = useState(false)

    const [viewPass, setViewPass] = useState(false)
    const [viewRePass, setViewRePass] = useState(false)

    const [mostrarLoader, setMostrarLoader] = useState(false);
    const [repass, setRepass] = useState()
    const handleCloseLoader = () => {
        setMostrarLoader(false)
      }
    // const [loader, setLoader] = useState(false);

    const recaptchaRef = useRef();

    const handleClose = () =>{
        cleanFields()
        setShow(false);
        setMostrarRegistro(false);
    } 
    // const handleShow = () => setShow(true);

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
        setMostrarLoader(true)

        if(!form.nombre || !form.apellido || !form.contacto || !form.correo || !form.direccion || !form.comuna || !form.ciudad || !form.clave){

            !form.nombre ? setErrorNombre(true) : setErrorNombre(false)
            !form.apellido ? setErrorApellido(true) : setErrorApellido(false)
            !form.contacto ? setErrorContacto(true) : setErrorContacto(false)
            !form.correo ? setErrorCorreo(true) : setErrorCorreo(false)
            !form.direccion ? setErrorDireccion(true) : setErrorDireccion(false)
            !form.comuna ? setErrorComuna(true) : setErrorComuna(false)
            !form.ciudad ? setErrorCiudad(true) : setErrorCiudad(false)
            !form.clave ? setErrorClave(true) : setErrorClave(false)
            !repass ? setErrorClave2(true) : setErrorClave2(false)


            Swal.fire({
                title: 'Debe llenar todos los campos.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
              setMostrarLoader(false)
            return
        }

        if(form.clave != repass){
            Swal.fire({
                title: 'Las contraseñas ingresadas no coinciden.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
              setMostrarLoader(false)
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

        cleanFields()

        setMostrarLoader(false)
    }

    const registrar = async(usuario) => {
        await registrarService(usuario);
        handleClose();
        // setLoader(false);
    }

    const cleanFields = () => {
        setForm({
            nombre:'',
            apellido: '',
            contacto: '',
            correo: '',
            clave: '',
            direccion: '',
            comuna: '',
            ciudad: ''
        })

        setErrorNombre(false) 
        setErrorApellido(false)
        setErrorContacto(false)
        setErrorCorreo(false)
        setErrorDireccion(false)
        setErrorComuna(false)
        setErrorCiudad(false)
        setErrorClave(false)
        setErrorClave2(false)
    }
    
    useEffect(() => {
      setShow(pshow)
    }, [pshow])

    useEffect(() => {
        cleanFields()
    }, [])
    
    useEffect(() => {
        const inpPass = document.getElementById('clave')
  
        viewPass ? inpPass?.setAttribute('type', 'text') : inpPass?.setAttribute('type', 'password')
  
      }, [viewPass])

      useEffect(() => {
        const inpPass = document.getElementById('clave2')
  
        viewRePass ? inpPass?.setAttribute('type', 'text') : inpPass?.setAttribute('type', 'password')
  
      }, [viewRePass])

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
                        className={`contenedor__login__group__campo ${errorNombre && 'input-error'} form-control`}
                        value={form.nombre} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="apellido" className='contenedor__login__group__texto'>Apellido</label>
                    <input 
                        name='apellido' 
                        type='text' 
                        className={`contenedor__login__group__campo ${errorApellido && 'input-error'} form-control`}
                        value={form.apellido} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="contacto" className='contenedor__login__group__texto'>Contacto</label>
                    <input 
                        name='contacto' 
                        type='text' 
                        className={`contenedor__login__group__campo ${errorContacto && 'input-error'} form-control`}
                        value={form.contacto} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="correo" className='contenedor__login__group__texto'>Correo</label>
                    <input 
                        name='correo' 
                        type='text' 
                        className={`contenedor__login__group__campo ${errorCorreo && 'input-error'} form-control`}
                        value={form.correo} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="direccion" className='contenedor__login__group__texto'>Dirección</label>
                    <input 
                        name='direccion' 
                        type='text' 
                        id="direccion"
                        className={`contenedor__login__group__campo ${errorDireccion && 'input-error'} form-control`}
                        value={form.direccion} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="comuna" className='contenedor__login__group__texto'>Comuna</label>
                    <input 
                        name='comuna' 
                        type='text' 
                        className={`contenedor__login__group__campo ${errorComuna && 'input-error'} form-control`}
                        value={form.comuna} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="ciudad" className='contenedor__login__group__texto'>Ciudad</label>
                    <input 
                        name='ciudad' 
                        type='text' 
                        className={`contenedor__login__group__campo ${errorCiudad && 'input-error'} form-control`}
                        value={form.ciudad} 
                        onChange={handleInput}  
                    />
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="clave" className='contenedor__login__group__texto'>Contraseña</label>
                    <div className="d-flex">
                        <input 
                            name='clave' 
                            type='password' 
                            id="clave"
                            className={`contenedor__login__group__campo ${errorClave && 'input-error'} form-control`}
                            value={form.clave} 
                            onChange={handleInput}  
                        />
                        <button className="magic-eye" type="button" onClick={()=>setViewPass(!viewPass)}>
                            {
                                viewPass ? (<img src={visible} alt="visible" />) : (<img src={notvisible} alt="not visible" />)
                            }
                            
                            
                        </button>
                    </div>
                </div>

                <div className='form-group contenedor__login__group'>
                    <label htmlFor="clave2" className='contenedor__login__group__texto'>Repita su contraseña</label>
                    
                    <div className="d-flex">
                        <input 
                            name='clave2' 
                            type='password' 
                            id="clave2"
                            className={`contenedor__login__group__campo ${errorClave2 && 'input-error'} form-control`}
                            value={repass} 
                            onChange={(e) => setRepass(e.target.value)}  
                        />
                        <button className="magic-eye" type="button" onClick={()=>setViewRePass(!viewRePass)}>
                            {
                                viewRePass ? (<img src={visible} alt="visible" />) : (<img src={notvisible} alt="not visible" />)
                            }
                            
                            
                        </button>
                    </div>
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

      <LoaderComponent mostrarLoader={mostrarLoader} setMostrarLoader={setMostrarLoader} handleCloseLoader={handleCloseLoader} />
    </>
  )
}
