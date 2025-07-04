import { Modal } from "react-bootstrap"
import { registrarService } from "../../../services/login/registerService";
import Swal from 'sweetalert2'
import { encryptDecrypt, endcodeBase64 } from "../../../helpers/validations";
import sha256 from "sha256";

export const Register = () => {

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
        // setLoader(false);
    }

      //////////////////////////////////////////////////////////////////////////////////////////////
      function initMap(){
        var input = document.getElementById('residencia');
        var autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.setComponentRestrictions({
            'country': 'CL'
        });

        autocomplete.addListener('placed_changed', function() {
            var place = autocomplete.getPlace();

            console.log(place.formatted_address)
        })
      }

  return (
    <>
        <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Crea tu usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input
            type="text"
            placeholder="Search a place"
            id="residencia"
            style={{ width: '100%', padding: '8px' }}
            onChange={(e)=>initMap()}
        />
        </Modal.Body>
      </Modal>
    </>
  )
}
