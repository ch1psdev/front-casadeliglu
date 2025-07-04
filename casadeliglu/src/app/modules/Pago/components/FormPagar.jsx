import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarDatosPersonales } from "../../../store/buy/buySlice";
import { useEffect } from "react";
import { cargarComuna } from "../../../store/auth/authSlice";

export const FormPagar = ({setPaso}) => {

    const usuario = useSelector((state) => state.usuarioState);

    const dispatch = useDispatch();

    const [inputForm, setInputForm] = useState({
        nombre:'',
        apellidos:'',
        direccion:'',
        comuna: '',
        ciudad: '',
        numeroContacto:'',
        correo:'',
        comentario:''
      });

      const [errorNombre, setErrorNombre] = useState(false);
      const [errorApellidos, setErrorApellidos] = useState(false);
      const [errorDireccion, setErrorDireccion] = useState(false);
      const [errorContacto, setErrorContacto] = useState(false);
      const [errorCorreo, setErrorCorreo] = useState(false);

    const handleInput = (e) => {
        setInputForm({
            ...inputForm,
            [e.target.name]: e.target.value
        })
    }

    function initMap(){
        var input = document.getElementById('direccion');
        var autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.setComponentRestrictions({
            'country': 'CL'
        });

        autocomplete.addListener('place_changed', function() {

            var place = autocomplete.getPlace();

            let city = '';
            let commune = '';

            if (place.address_components) {
                place.address_components.forEach(component => {
                    const types = component.types;
                    if (types.includes('administrative_area_level_2')) {
                    city = component.long_name;
                    }
                    if (types.includes('locality') || types.includes('neighborhood')) {
                    commune = component.long_name;
                    }
                });
            }

            setInputForm({
                ...inputForm,
                direccion: place.formatted_address,
                comuna: commune,
                ciudad: city
            })

            dispatch(cargarComuna(commune))
            
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const confirmarDatosPersonales = () =>{

        if(!inputForm.nombre || !inputForm.apellidos || !inputForm.direccion || !inputForm.comuna || !inputForm.ciudad || !inputForm.numeroContacto || !inputForm.correo){
            !inputForm.nombre ? setErrorNombre(true) : setErrorNombre(false);
            !inputForm.apellidos ? setErrorApellidos(true) : setErrorApellidos(false)
            !inputForm.direccion ? setErrorDireccion(true) : setErrorDireccion(false);
            !inputForm.numeroContacto ? setErrorContacto(true) : setErrorContacto(false);
            !inputForm.correo ? setErrorCorreo(true) : setErrorCorreo(false);

            return;
        }
        

        dispatch(agregarDatosPersonales(inputForm));
        setPaso('paso3')
    }

    useEffect(() => {
        if(usuario.status == 'identificado'){
          setInputForm((inputPago)=>({
            ...inputPago,
            nombre: usuario.info.nombre,
            apellidos: usuario.info.apellido,
            direccion: usuario.info.direccion,
            comuna: usuario.info.comuna,
            ciudad: usuario.info.ciudad,
            numeroContacto: usuario.info.contacto.toString(),
            correo: usuario.info.correo,
        }))
        }

        document.querySelector('#direccion').value = usuario.info.direccion
      }, [usuario.status])

  return (
    <>
        <form onSubmit={handleSubmit}>

            <h1>Información de compra</h1>

            <div className="formPagoCampos">
                <div className="form-group">
                    <label htmlFor="nombre"><span className="formPagoCampos__obligatorio">*</span>Nombre</label>
                    <input 
                        type="text" 
                        className={`form-control ${errorNombre ? 'input-error' : ''}`} 
                        id="nombre" 
                        name="nombre"
                        onChange={handleInput}
                        value={inputForm.nombre}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apPaterno"><span className="formPagoCampos__obligatorio">*</span>Apellidos</label>
                    <input 
                        type="text" 
                        className={`form-control ${errorApellidos ? 'input-error' : ''}`} 
                        id="apPaterno" 
                        name="apellidos"
                        onChange={handleInput}
                        value={inputForm.apellidos}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion"><span className="formPagoCampos__obligatorio">*</span>Dirección</label>
                    <input 
                        type="text" 
                        className={`form-control ${errorDireccion ? 'input-error' : ''}`} 
                        id="direccion" 
                        name="direccion"
                        onChange={(e)=>initMap()}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nroContacto"><span className="formPagoCampos__obligatorio">*</span>Número de contacto</label>
                    <input 
                        type="text" 
                        className={`form-control ${errorContacto ? 'input-error' : ''}`} 
                        id="nroContacto" 
                        name="numeroContacto"
                        onChange={handleInput}
                        value={inputForm.numeroContacto}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="correo"><span className="formPagoCampos__obligatorio">*</span>Correo</label>
                    <input 
                        type="text" 
                        className={`form-control ${errorCorreo ? 'input-error' : ''}`} 
                        id="correo" 
                        name="correo"
                        onChange={handleInput}
                        value={inputForm.correo}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comentario">Comentario adicional</label>
                    <textarea 
                        type="text" 
                        className="form-control" 
                        id="comentario" 
                        rows={3} 
                        name="comentario"
                        onChange={handleInput}
                        value={inputForm.comentario}
                    />
                </div>
            </div>

            <div className="pagar__seccion__productos__boxBoton">
                <button type="button" className="boton-secundario" onClick={()=>setPaso('paso1')}>Atrás</button>
                <button type="submit" className="boton" onClick={()=>confirmarDatosPersonales()}>Continuar</button>
            </div>
        </form>
    </>
  )
}
