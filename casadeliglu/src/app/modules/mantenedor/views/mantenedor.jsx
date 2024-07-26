import React, { useEffect, useState } from 'react'
import { getProductosMantenedorService, getToggleVigenciaProductosService } from '../../../services/mantenedor/mantenedorService';
import { useSelector } from 'react-redux';
import { EditarIcon } from '../../../../assets/Icons';
import { ModalEditarProducto } from '../../../components/Modals/ModalEditarProducto';
import { Outlet, useNavigate } from 'react-router-dom';
import { ModalAgregarProducto } from '../../../components/Modals/ModalAgregarProducto';
import Swal from 'sweetalert2';
import { MenuToggle } from '../components/MenuToggle';
import { Inventario } from '../components/Inventario';

export const Mantenedor = () => {

  const token = useSelector(state => state.usuarioState.token);

  const navigate = useNavigate();

  const [productos, setProductos] = useState();
  const [producto, setProducto] = useState();
  const [showModalProducto, setShowModalProducto] = useState(false);
  const [showModalAgregarProducto, setShowModalAgregarProducto] = useState(false);

  const [contenido, setContenido] = useState('')

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
      <div className='mantenedor2'>
        <div className='mantenedor2__menu'>
          {<MenuToggle />}
        </div>
        <div className='mantenedor2__contenido'>
          {
            <Outlet />
          }
        </div>
      </div>
    </>
  )
}
