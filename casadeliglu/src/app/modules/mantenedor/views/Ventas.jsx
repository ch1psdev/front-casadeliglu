import React, { useEffect, useState } from 'react'
import { getVentasServices } from '../../../services/mantenedor/mantenedorService'
import { useSelector } from 'react-redux';

export const Ventas = () => {

  const [ventas, setVentas] = useState();
  const [filtro, setFiltro] = useState({
    codigo: '',
    nombre: '',
    delivery: ''
  })

  const handleInput = (e) => {
    setFiltro({
      ...filtro,
      [e.target.name]: e.target.value
    })
  }

  const token = useSelector(state => state.usuarioState.token);

    const obtenerVentas = async() =>{
        const res = await getVentasServices(token);
          setVentas(JSON.parse(res))
        }

  useEffect(() => {
    obtenerVentas();
  }, [])
  

  return (
    <>
      <div className="inventario">
      <h1 className="mb-0">Ventas</h1>

      {/* <div className="inventario__tabla__filtros mb-3">
            <div className="inventario__tabla__filtros__primero">
                <div className="inventario__tabla__filtros__campos">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" name="codigo" id="codigo" className="form-control" value={filtro.codigo} onChange={handleInput} />
                </div>
                <div className="inventario__tabla__filtros__campos">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" className="form-control" value={filtro.nombre} onChange={handleInput} />
                </div>
                <div className="inventario__tabla__filtros__campos">
                    <label htmlFor="familia">Correo</label>
                    <input type="text" name="familia" id="familia" className="form-control" value={filtro.correo} onChange={handleInput} />
                </div>
            </div>
            <div className="inventario__tabla__filtros__segundo">
                
                
                <div className="inventario__tabla__filtros__campos">
                    <label htmlFor="activo">Delivery</label>
                    <select name="activo" id="" className="form-select" value={filtro.delivery} onChange={handleInput}>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div></div>
                <button className="boton-secundario">Limpiar</button>
                <button className="boton">Filtrar</button>
            </div>
        </div> */}

      <div className="inventario__tabla">
        <table className="table table-hover table-bordered table-striped">
            <thead>
            <tr>
                <th scope="col">N°</th>
                <th scope="col">N° GetNet</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Total</th>
                <th scope="col">Delivery</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {
                
                ventas &&
                ventas.reverse().map((data, i)=>(
                <tr key={i}>
                    <th scope="row">{data.id}</th>
                    <td>{data.idPagoGetnet}</td>
                    <td>{data.nombre}</td>
                    <td>{data.email}</td>
                    <td>{data.mobile}</td>
                    <td>{data.total}</td>
                    <td>{data.delivery ? 'Si' : 'No'}</td>
                    <td>{data.status}</td>
                    <td></td>
                </tr>
                ))
            }
            </tbody>
        </table>
      </div>
      </div>
    </>
  )
}
