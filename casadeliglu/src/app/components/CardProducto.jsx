import { AddCart, ImgNotFound } from '../../assets/Icons'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarProducto, agregarProducto } from '../store/shop/shopSlice';
import { abreviar } from '../helpers/textos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import not_found from '../../assets/img/productos/not-found.webp'

export const CardProducto = ({producto}) => {

  const navigate = useNavigate();
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
    navigate('/productos', {state: {categoria: producto.familia}})
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
              
            ):(
              <img src={not_found} alt="foto producto" className='card-img-top' />
            )
          }
          <div className="card-body">
            <div className='card__cuerpo__textos'>
              <span className='card-categoria manito' onClick={irCategoria}>{producto.familia}</span>
              <h5 className="card-title manito" onClick={irProducto}><abbr title={producto.nombre}>{abreviar(producto.nombre)}</abbr></h5>
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
