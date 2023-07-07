import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import salmon from '../../../assets/img/productos/salmon.jpg'
import { useEffect } from 'react';
import { useState } from 'react';

export const Producto = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [detalleProducto, setDetalleProducto] = useState();
    const [total, setTotal] = useState(location.state.precio);
    const [cantidad, setCantidad] = useState(1);

    const irCategoria = () => {
        navigate('/productos', {state: detalleProducto.categoria})
      }
      
    const sumarTotal = () => {
        setCantidad(cantidad+1);
        setTotal(total+location.state.precio)
    }

    const restarTotal = () => {
        if(cantidad > 1){
            setCantidad(cantidad-1);
            setTotal(total-location.state.precio)
        }else{
            return
        }
        
    }

    useEffect(() => {
        setDetalleProducto(location.state)
    }, [location])
    

  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-12" style={{padding: '20px 0px'}}>
                            <div className="miga">
                                <span>Inicio</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 producto">
                            {
                                detalleProducto != undefined &&
                                <>
                                <img src={detalleProducto.foto} alt="" />
                                <div className="producto__info">
                                    <div className="producto__info__desc">
                                        <a className='producto__info__desc--categoria' onClick={irCategoria}>{detalleProducto.categoria}</a>
                                        <h1>{detalleProducto.nombre}</h1>
                                        <p className="producto__info__desc--precio">$ {detalleProducto.precio}</p>
                                        <p className="producto__info__desc--stock">Stock disponible: 14 unidades</p>
                                    </div>
                                    <div className='producto__info__cantidad-totalizar'>
                                        <div className='producto__info__cantidad'>
                                            <a className='producto__info__cantidad--sumar manito' onClick={restarTotal}>-</a><label>Cantidad: <span>{cantidad}</span></label><a className='producto__info__cantidad--restar manito' onClick={sumarTotal}>+</a>
                                        </div>
                                        <span>Total: $ {total}</span>
                                        <button className='producto__info__desc--carrito'>Añadir al carrito</button>
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
    </>
  )
}
