import React, { useEffect, useState } from 'react'
import { getProductosMantenedorService, getToggleVigenciaProductosService } from '../../../services/mantenedor/mantenedorService';
import { useSelector } from 'react-redux';
import { EditarIcon } from '../../../../assets/Icons';
import { ModalEditarProducto } from '../../../components/Modals/ModalEditarProducto';
import { useNavigate } from 'react-router-dom';
import { ModalAgregarProducto } from '../../../components/Modals/ModalAgregarProducto';
import Swal from 'sweetalert2';

export const Mantenedor = () => {

  const token = useSelector(state => state.usuarioState.token);

  const navigate = useNavigate();

  const [productos, setProductos] = useState();
  const [producto, setProducto] = useState();
  const [showModalProducto, setShowModalProducto] = useState(false);
  const [showModalAgregarProducto, setShowModalAgregarProducto] = useState(false);

  const obtenerProductos = async() =>{
    const res = await getProductosMantenedorService(token);
    if(res.code == 200){
      setProductos(res.data)
      // console.log(res.data)
    }
  }

  const productoVigenteToggle = async(idProducto) => {

     Swal.fire({
      title: 'Estás seguro de activar/desactivar este producto?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0C2695',
      showCloseButton: true,
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        
        new Promise(async (resolve, reject)=>{
          try {
            const res = await getToggleVigenciaProductosService(token, idProducto)   
            
            if(res.code == 200){
              resolve(res.code)
            }else{
              reject('Hubo un problema al procesar la solicitud')
            }
          } catch (e) {
            reject('Hubo un problema al procesar la solicitud')
          }

          return 
        }).then((res)=>{
          console.log(res)
          if(res == 200){
            Swal.fire({
              title: 'Producto actualizado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#0C2695',
              showCloseButton: true,
            }).then(()=>{
              obtenerProductos()
            })
          }else{
            Swal.fire({
              title: 'Hubo un problema al procesar la solicitud',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#0C2695',
              showCloseButton: true,
            }).then(()=>{
              document.getElementById('flexSwitchCheckDefault').checked = !document.getElementById('flexSwitchCheckDefault').checked
            })
          }
        })
      }else if(result.isDismissed){
        document.getElementById('flexSwitchCheckDefault').checked = !document.getElementById('flexSwitchCheckDefault').checked
      }
    })

    
  }

  const cerrarModalProducto = () => {
    setShowModalProducto(false);
    obtenerProductos();
  }

  const cerrarModalAgregarProducto = () => {
    setShowModalAgregarProducto(false);
    obtenerProductos();
  }

  const abrirModalProducto = (producto) => {
    setShowModalProducto(true);
    setProducto(producto)
  }

  const abrirModalAgregarProducto = () => {
    setShowModalAgregarProducto(true);
  }

  useEffect(() => {
    obtenerProductos()
  }, [])
  

  return (
    <>
        <div className='mantenedor'>
          <h1>Administración Casa del Iglú</h1>
          <div className='mantenedor__contenido'>
            <div className='mantenedor__contenido__botones'>
              <button className='boton mantenedor__botones__agregar' onClick={abrirModalAgregarProducto}>Agregar producto</button>
              <button className='boton-secundario mantenedor__botones__volver' onClick={()=>navigate('/')}>Ir al sitio</button>
            </div>
            
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Familia</th>
                <th scope="col">Subfamilia</th>
                <th scope="col">Precio</th>
                <th scope="col">Stock</th>
                <th scope="col">Foto</th>
                <th scope="col">Act/Desc</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {
                
                productos &&
                productos.map((data, i)=>(
                  <tr key={i}>
                    <th scope="row">{data.codigo}</th>
                    <td>{data.nombre}</td>
                    <td>{data.familia}</td>
                    <td>{data.subFamilia}</td>
                    <td>{data.precioBruto}</td>
                    <td>{data.stock}</td>
                    {
                      data.foto == null ? (
                        <td>Sin foto</td>
                      ) : (
                        <td><a href={data.foto} target='_blank'>Ver Foto</a></td>
                      )
                    }
                    <td>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={data.vigente} onClick={() => productoVigenteToggle(data.idProducto)} />
                        {/* <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label> */}
                      </div>
                    </td>
                    <td><a onClick={()=>abrirModalProducto(data)}><EditarIcon clase="editar__icono" /></a></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          </div>
        </div>

        <ModalEditarProducto showModalProducto={showModalProducto} setShowModalProducto={setShowModalProducto} cerrarModalProducto={cerrarModalProducto} producto={producto} />
        <ModalAgregarProducto showModalAgregarProducto={showModalAgregarProducto} setShowModalAgregarProducto={setShowModalAgregarProducto} cerrarModalAgregarProducto={cerrarModalAgregarProducto} />
    </>
  )
}
