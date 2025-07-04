import ReCAPTCHA from "react-google-recaptcha"
import { useRegister } from "./hook/useRegister";
import { siteKey } from "../../../../config/config";
import { useState } from "react";
import visible from './../../../../assets/icons/visible.svg'
import notvisible from './../../../../assets/icons/not-visible.svg'
import { LoaderComponent } from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = mbxGeocoding({accessToken: 'pk.eyJ1IjoiY2hpcHNkZXYiLCJhIjoiY21iOGMyMnl6MDRpczJqcHI5OW52YTZrMiJ9.Zu7WaUbGOB1Z86C1Cfd39A'})

export const Register = () => {

    const {form,
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
        onRegistrar} = useRegister();

    const [mostrarLoader, setMostrarLoader] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const navigate = useNavigate();

    const handleInputChange = async (e) => {
        const value = e.target.value;

        setQuery(value);

        if(value.length < 3){
            setSuggestions([]);
            return;
        }

        const response = await geocodingClient
            .forwardGeocode({
                query: value,
                autocomplete: true,
                limit: 5,
                countries: ['cl']
            })
            .send();

        setSuggestions(response.body.features);
    };

    const handleSelect = (place) => {
        setQuery(place.place_name);
        setSuggestions([]);

        setForm({
            ...form,
            direccion: place.place_name,
            comuna: place.context[2].text,
            ciudad: place.context[3].text
        })
    }

    const handleCloseLoader = () => {
        setMostrarLoader(false)
      }

      const onSubmit = (e) => {

        e.preventDefault();
        console.log(form)

        onRegistrar(e, setMostrarLoader);

        setQuery('');
      }

  return (
    <>
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

            <div className='form-group contenedor__login__group' style={{position:'relative'}}>
                <label htmlFor="direccion" className='contenedor__login__group__texto'>Dirección</label>
                <input 
                    name='direccion' 
                    type='text' 
                    id="direccion"
                    value={query}
                    className={`contenedor__login__group__campo ${errorDireccion && 'input-error'} form-control`}
                    onChange={handleInputChange}  
                />
                {
                    suggestions.length > 0 && (
                        <ul className="absolute bg-white border w-full z-10 max-h-60 overflow-y-auto">
                            { suggestions.map((place) => (
                                <li className="p-2 hover:bg-gray-100 cursor-pointer" key={place.id} onClick={() => handleSelect(place)}>
                                    { place.place_name }
                                </li>
                            ))}
                        </ul>
                    )
                }
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
                <button className='contenedor__login__button boton' onClick={()=>navigate(-1)}>Volver</button>
                <button type="submit" className="boton-secundario">Registrar</button>
            </div>
        </form>

        <LoaderComponent mostrarLoader={mostrarLoader} setMostrarLoader={setMostrarLoader} handleCloseLoader={handleCloseLoader} />
    </>
  )
}
