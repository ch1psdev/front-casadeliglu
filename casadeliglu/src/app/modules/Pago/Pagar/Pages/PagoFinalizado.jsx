import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import iglu_header from '../../../../../assets/img/iglu_header.png'
import { useDispatch } from 'react-redux';
import { vaciarCarrito } from '../../../../store/shop/shopSlice';

// // ../../assets/img/iglu_header.png

export const PagoFinalizado = () => {

    const location = useLocation();

    const [resPago, setResPago] = useState();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    

    console.log(resPago)

    useEffect(() => {
      setResPago(location.state)
    }, [location.state])

    useEffect(() => {
      if(resPago?.data?.status?.reason=='00'){
        dispatch(vaciarCarrito())
      }
    }, [])
    
    

  return (
    <>
      <div className='pagado'>
    
      {
        resPago?.data?.status?.reason=='00' ?(
          <>
            <div className='pagado__aprobado'>
              <img className='pagado__aprobado__img' src={iglu_header} alt="" />
              <h2 className='pagado__aprobado__titulo'>Pago realizado con éxito</h2>
              <div className='pagado__aprobado__datos'>
                <p><b>Id compra:</b> {}</p>
                <p><b>Referencia:</b> {resPago?.data?.payment[0].reference}</p>
                <p><b>Fecha compra:</b> {resPago?.data?.status?.date}</p>
              </div>
              <div className='pagado__aprobado__items'>
                {
                  resPago?.data?.request?.payment.items.map((data, i)=>(
                    
                      <div key={i} className='pagado__aprobado__items__caja'>
                        <div className='pagado__aprobado__items__caja__nompri'>
                          <p><b>{data.name}</b> x {data.qty}</p>
                          <p>$ {data.price}</p>
                        </div>
                        <p className='pagado__aprobado__items__caja__sku'>{data.sku}</p>
                      </div>
                    
                  ))
                }
                </div>
                <div>
                  <p>Delivery</p>
                  <p>{}</p>
                <div className='pagado__aprobado__total'>
                  <b>Total:</b>
                  <b>{resPago?.data?.request?.payment.amount.total}</b>
                </div>
                  
                </div>
            </div>
            <div className='pagado__rechazado__btn'>
              <button className='boton-secundario'>Descargar comprobante</button>
              <button className='boton home__nosotros__boton' onClick={()=>navigate('/inicio')}>Volver al inicio</button>

            </div>
          </>
        ):(
          <div>
            <div className='pagado__rechazado'>
              <h1 className='pagado__aprobado__titulo'>Pago rechazado</h1>
              <p className='pagado__rechazado__motivo'>Motivo</p>
              <p className='pagado__rechazado__desc'>{resPago?.data?.status?.message}</p>
            </div>
            <div className='pagado__rechazado__btn'>
              <button className='boton home__nosotros__boton' onClick={()=>navigate('/inicio')}>Volver al inicio</button>
            </div>
          </div>
        )
      }
</div>
  </>

  )
}
