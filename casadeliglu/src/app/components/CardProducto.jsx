import { useEffect } from 'react';
import { AddCart } from '../../assets/Icons'
import salmon from '../../assets/img/productos/salmon.jpg'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';import Swal from 'sweetalert2'

export const CardProducto = ({producto}) => {

  const navigate = useNavigate();
  const location = useLocation();
  
  const irProducto = () => {

    navigate('/productos/producto',{state: producto})
  }

  const irCategoria = () => {
    navigate('/productos', {state: producto.categoria})
  }

  const addProducto = () =>{
    Swal.fire({
      title: 'Producto añadido al carrito de compras!',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0C2695'
    })
  }

  return (
    <>
      {
        producto!=undefined &&
        <div className="card card-producto">
          <img src={producto.foto} className="card-img-top" alt="foto producto" />
          <div className="card-body">
            <div className='card__cuerpo__textos'>
              <span className='card-categoria manito' onClick={irCategoria}>{producto.categoria}</span>
              <h5 className="card-title manito" onClick={irProducto}>{producto.nombre}</h5>
              <p className="card-text">$ {producto.precio}</p>
            </div>
            <div className='card__opciones manito'>
              <div className='card__opc__ver' onClick={irProducto}>
                <p>Ver</p>
              </div>
              <div className='card__img__cart' onClick={addProducto}>
                <AddCart />
              </div>
            </div>
          </div>
        </div>
      }
      
    </>
  )
}
