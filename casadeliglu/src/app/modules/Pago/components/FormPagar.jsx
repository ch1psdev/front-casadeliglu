import { useState } from "react";

export const FormPagar = ({setPaso, setInputForm, inputForm}) => {

    const handleInput = (e) => {
        setInputForm({
            ...inputForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
                <button type="submit" className="boton" onClick={()=>setPaso('paso3')}>Continuar</button>
            </div>
        </form>
    </>
  )
}
