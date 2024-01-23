import { useEffect } from 'react';
import { AddCart, ImgNotFound } from '../../assets/Icons'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarProducto, agregarProducto } from '../store/shop/shopSlice';
import { abreviar } from '../helpers/textos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CardProducto = ({producto}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.carritoState);

  const notify = (texto) => {
    toast.success(texto, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};
  
  const irProducto = () => {

    navigate('/productos/producto',{state: producto})
  }

  const irCategoria = () => {
    navigate('/productos', {state: producto.familia})
  }

  const addProducto = () =>{
    const existe = products.find(data => data.idProducto == producto.idProducto);

    if(existe != undefined){
      let prod = {...existe,
        cantidad : existe.cantidad + 1
      }
      dispatch(actualizarProducto(prod));
      return;
    }

    
    const productos = {...producto,
      cantidad: 1  
    }

    dispatch(agregarProducto(productos));
    notify('Producto agregado correctamente!');
  }
  
  return (
    <>
      {
        producto!=undefined &&
        <div className="card card-producto">
          {
            producto.foto ? 
            (
              <img src={producto.foto} className="card-img-top" alt="foto producto" />
              // <img src="https://casadeliglu.cl/public/kanikama.jpg" className="card-img-top" alt="foto producto" />
              
            ):(
              <ImgNotFound />
            )
          }
          <div className="card-body">
            <div className='card__cuerpo__textos'>
              <span className='card-categoria manito' onClick={irCategoria}>{producto.familia}</span>
              {/* <h5 className="card-title manito" onClick={irProducto}>{producto.nombre}</h5> */}
              <h5 className="card-title manito" onClick={irProducto}>{abreviar(producto.nombre)}</h5>
              <p className="card-text">$ {producto.precioBruto}</p>
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
      <ToastContainer />
    </>
  )
}
