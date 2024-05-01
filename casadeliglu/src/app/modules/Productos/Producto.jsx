import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ImgNotFound } from '../../../assets/Icons';
import { actualizarProducto, agregarProducto } from '../../store/shop/shopSlice';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import not_found from '../../../assets/img/productos/not-found.webp'

export const Producto = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [detalleProducto, setDetalleProducto] = useState();
    const [total, setTotal] = useState();
    const [cantidad, setCantidad] = useState(1);
    const dispatch = useDispatch();
    
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

    const { products } = useSelector((state) => state.carritoState);

    const irCategoria = () => {
        navigate('/productos', {state: detalleProducto.familia})
      }
      
    const sumarTotal = () => {
        if(cantidad < detalleProducto.stock){
            setCantidad(cantidad+1);
            setTotal(parseInt(total)+parseInt(detalleProducto?.precioBruto))
        }
        
    }

    const restarTotal = () => {
        if(cantidad > 1){
            setCantidad(cantidad-1);
            setTotal(total-detalleProducto?.precioBruto)
        }else{
            return
        }
        
    }

    const addProducto = () =>{
        const existe = products.find(data => data.idProducto == detalleProducto.idProducto);

        console.log(existe)
        
        // if(!((existe.cantidad + cantidad) <= detalleProducto.stock) ){
        //     notify('Producto supera el stock disponible');
        //     return;
        // }

        if(existe != undefined){
          let prod = {...existe,
            cantidad : parseInt(existe.cantidad) + parseInt(cantidad)
          }
          console.log(prod)
          dispatch(actualizarProducto(prod));
          notify('Producto agregado correctamente!');
          return;
        }
    
        
        const productos = {...detalleProducto,
          cantidad: 1  
        }
    
        dispatch(agregarProducto(productos));
        notify('Producto agregado correctamente!')
        Swal.fire({
          title: 'Producto añadido al carrito de compras!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0C2695'
        })
      }

    useEffect(() => {
        setDetalleProducto(location.state)
    }, [location])

    useEffect(() => {
      setTotal(detalleProducto?.precioBruto)
    }, [detalleProducto])

  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-12" style={{padding: '20px 0px'}}>
                            {
                                detalleProducto &&
                                <div className="miga">
                                    <span className="miga__ruta" onClick={() => navigate('/inicio')}>Inicio</span>
                                    <span> / </span>
                                    <span className="miga__ruta" onClick={() => navigate('/productos')}>Productos</span>
                                    <span> / </span>
                                    <span className="miga__activo">{detalleProducto.nombre}</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 producto">
                            {
                                detalleProducto != undefined &&
                                <>
                                <div className='producto__foto'>
                                {
                                    detalleProducto.foto ? 
                                    (
                                        <img src={detalleProducto.foto} alt="" />
                                    ):(
                                        <img src={not_found} alt="" />
                                    )
                                }
                                </div>
                                
                                <div className="producto__info">
                                    <div className="producto__info__desc">
                                        <a className='producto__info__desc--categoria' onClick={irCategoria}>{detalleProducto.familia}</a>
                                        <h1>{detalleProducto.nombre}</h1>
                                        <p className="producto__info__desc--precio">$ {detalleProducto.precioBruto}</p>
                                        <p className="producto__info__desc--stock">Stock disponible: {detalleProducto.stock}</p>
                                    </div>
                                    <div className='producto__info__cantidad-totalizar'>
                                        <div className='producto__info__cantidad'>
                                            <a className='producto__info__cantidad--sumar manito' onClick={restarTotal}>-</a><label>Cantidad: <span>{cantidad}</span></label><a className='producto__info__cantidad--restar manito' onClick={sumarTotal}>+</a>
                                        </div>
                                        <span>Total: $ {total}</span>
                                        <button className='producto__info__desc--carrito' onClick={addProducto}>Añadir al carrito</button>
                                    </div>
                                    
                                </div>
                                </>
                            }
                            
                        </div>
                    </div>
                    
                </div>
                <div className="col-1"></div>
            </div>
        </div>
        <ToastContainer />
    </>
  )
}
