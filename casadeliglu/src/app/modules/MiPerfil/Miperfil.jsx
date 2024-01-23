import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Miperfil = () => {

    const { info } = useSelector( (state) => state.usuarioState);
    const navigate = useNavigate();

    const [perfil, setPerfil] = useState({
        nombre: info.nombre ? info.nombre : '',
        apellido: info.apellido ? info.apellido : '',
        direccion: info.direccion ? info.direccion : '',
        comuna: info.comuna ? info.comuna : '',
        ciudad: info.ciudad ? info.ciudad : '',
        telefono: info.telefono ? info.telefono : '',        
    })

    const handleInput = (e) => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        })
    }

    const actualizarPerfil = (e) => {
        e.preventDefault();
        console.log(perfil)
    }

  return (
    <>
        <div className="row miperfil">
            <div className="col-12">
                <h1>Mi perfil</h1>
            </div>
            <div className='col-12 col-md-6 col-xl-4'>
                <form className='miperfil__formulario'>
                    <div className='col-12 mt-3'>
                        <label htmlFor="nombre">Nombre(s)</label>
                        <input type="text" name='nombre' className='form-control' value={perfil.nombre} onChange={handleInput} />
                    </div>

                    <div className='col-12 mt-3'>
                        <label htmlFor="apellido">Apellidos</label>
                        <input type="text" name='apellido' className='form-control' value={perfil.apellido} onChange={handleInput} />
                    </div>

                    <div className='col-12 mt-3'>
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" name='direccion' className='form-control' value={perfil.direccion} onChange={handleInput} />
                    </div>

                    <div className='col-12 mt-3'>
                        <label htmlFor="comuna">Comuna</label>
                        <input type="text" name='comuna' className='form-control' value={perfil.comuna} onChange={handleInput} />
                    </div>

                    <div className='col-12 mt-3'>
                        <label htmlFor="ciudad">Ciudad</label>
                        <input type="text" name='ciudad' className='form-control' value={perfil.ciudad} onChange={handleInput} />
                    </div>

                    <div className='col-12 mt-3'> 
                        <label htmlFor="telefono">Número de contacto</label>
                        <input type="text" name='telefono' className='form-control' value={perfil.telefono} onChange={handleInput} />
                    </div>

                    <div className='col-12 mt-3'>
                        <label htmlFor="correo">Correo electrónico</label>
                        <input type="text" name='correo' className='form-control' disabled placeholder='correo' value={info.correo} />
                    </div>

                    <div className='col-12 mt-5 mb-5'>
                        <div >
                            <button onClick={()=>navigate('/inicio')}>Ir al inicio</button>
                            <button onClick={actualizarPerfil}>Guardar cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
