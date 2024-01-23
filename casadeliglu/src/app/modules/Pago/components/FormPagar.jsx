import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actualizarCompra, agregarDatosPersonales } from "../../../store/buy/buySlice";
import { useEffect } from "react";

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

    const handleInput = (e) => {
        setInputForm({
            ...inputForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const confirmarDatosPersonales = () =>{
        dispatch(agregarDatosPersonales(inputForm));
        setPaso('paso3')
    }

    useEffect(() => {
        if(usuario.status == 'identificado'){
          setInputForm((inputPago)=>({
            ...inputPago,
            nombre: usuario.info.nombre,
            apellidos: usuario.info.apellido,
            // direccion: usuario.info.direccion,
            comuna: usuario.info.comuna,
            ciudad: usuario.info.ciudad,
            numeroContacto: usuario.info.contacto.toString(),
            correo: usuario.info.correo,
        }))
        }
      }, [usuario])

  return (
    <>
        <form onSubmit={handleSubmit}>

            <h1>Información de compra</h1>

            <div className="formPagoCampos">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombre" 
                        name="nombre"
                        onChange={handleInput}
                        value={inputForm.nombre}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apPaterno">Apellidos</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="apPaterno" 
                        name="apellidos"
                        onChange={handleInput}
                        value={inputForm.apellidos}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="direccion" 
                        name="direccion"
                        onChange={handleInput}
                        value={inputForm.direccion}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comuna">Comuna</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="comuna" 
                        name="comuna"
                        onChange={handleInput}
                        value={inputForm.comuna}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="ciudad" 
                        name="ciudad"
                        onChange={handleInput}
                        value={inputForm.ciudad}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nroContacto">Número de contacto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nroContacto" 
                        name="numeroContacto"
                        onChange={handleInput}
                        value={inputForm.numeroContacto}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="correo">Correo</label>
                    <input 
                        type="text" 
                        className="form-control" 
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
