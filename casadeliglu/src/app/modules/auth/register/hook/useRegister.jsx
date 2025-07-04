import { useEffect, useRef, useState } from "react"
import Swal from 'sweetalert2'
import { encryptDecrypt, endcodeBase64 } from "../../../../helpers/validations"
import sha256 from "sha256"
import { registrarService } from "../../../../services/login/registerService"

export const useRegister = () => {

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        contacto: 0,
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
    const [errorClave, setErrorClave] = useState(false)
    const [errorClave2, setErrorClave2] = useState(false)

    const [viewPass, setViewPass] = useState(false)
    const [viewRePass, setViewRePass] = useState(false)
    const [repass, setRepass] = useState()

    const recaptchaRef = useRef();

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
        setErrorClave(false)
        setErrorClave2(false)
    }

    const onRegistrar = async(e, setMostrarLoader) => {
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
        // setLoader(false);
    }

    useEffect(() => {
        const inpPass = document.getElementById('clave')
  
        viewPass ? inpPass?.setAttribute('type', 'text') : inpPass?.setAttribute('type', 'password')
  
      }, [viewPass])

    useEffect(() => {
    const inpPass = document.getElementById('clave2')

    viewRePass ? inpPass?.setAttribute('type', 'text') : inpPass?.setAttribute('type', 'password')

    }, [viewRePass])

    useEffect(() => {
        cleanFields()
    }, [])

    return{
        form,
        setForm,
        errorNombre,
        errorApellido,
        errorContacto,
        errorCorreo,
        errorDireccion,
        errorClave,
        errorClave2,
        viewPass,
        setViewPass,
        viewRePass,
        setViewRePass,
        repass,
        setRepass,
        handleInput,
        recaptchaRef,
        onRegistrar
    }

}