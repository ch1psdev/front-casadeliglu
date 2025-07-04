import { useEffect, useState } from "react"
import { ThreeCircles } from "react-loader-spinner"
import { useLocation, useNavigate } from "react-router-dom"
import { consultarPago, getNumeroCompra } from "../../../../services/getnet/getnet"
import { vaciarCarrito } from "../../../../store/shop/shopSlice"
import { limpiarCompra } from "../../../../store/buy/buySlice"
import iglu_header from '../../../../../assets/img/iglu_header.png'
import { useDispatch, useSelector } from "react-redux"
import html2canvas from "html2canvas"
import { cargarComuna } from "../../../../store/auth/authSlice"

export const PagoEnEspera = () => {

    const location = useLocation()
    const [resuelto, setResuelto] = useState(false);
    const navigate = useNavigate();
    const [resPago, setResPago] = useState();
    const [espera, setEspera] = useState(true);
    const dispatch = useDispatch();

    const {comuna} = useSelector((state) => state.usuarioState.info);

    const verEstadoSolicitud = async() =>{
        const res = consultarPago(location.state).then((data)=>{
            if(data.data.status.status!=='PENDING'){
                setResuelto(!resuelto);
                setResPago(data);
                setEspera(false);
            }else{
                setEspera(true);
            }
        });
    }

    const descargarComprobante = (element) => {
       html2canvas(document.getElementById(element), {
        scrollX: 0,
        scrollY: 0,
        allowTaint: false,
        useCORS: true,
        onrendered: function(element){
          document.body.appendChild(element);
        }
       })
       .then((canvas) => {
          var imageBase64 = canvas.toDataURL('image/png');
          var downloadLink = document.createElement('a');
          downloadLink.src = imageBase64;
          downloadLink.download = "recibo" + ".png";
          canvas.toBlob(function(blob){
            downloadLink.href = URL.createObjectURL(blob)
            downloadLink.click();
          })
       })
    }

    useEffect(() => {
        if (!resuelto) {
            const intervalId = setInterval(verEstadoSolicitud, 20000);
      
            return () => clearInterval(intervalId);
          }
    }, [resuelto])

    useEffect(() => {
        if(resPago?.data?.status?.reason=='00'){
          dispatch(vaciarCarrito())
          dispatch(limpiarCompra())
          dispatch(cargarComuna(comuna))
        }
      }, [resPago])
    
  return (
    <>
    {
        espera == true &&
        <div className="pagar__procesando">
        <div className="pagar__procesando__contenido">
            <div className="pagar__procesando__contenido__texto">
                <h1>Procesando pago...</h1>
            </div>
            <div className="pagar__procesando__loader">
                <ThreeCircles
                    height="100"
                    width="100"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor="#0C2695"
                    innerCircleColor="#0C2695"
                    middleCircleColor="#0C2695"
                />
            </div>
        </div>
        
    </div>
    }
    
    {
        espera == false &&
        <div className='pagado'>
    
      {
        resPago?.data?.status?.reason=='00' ?(
          <>
            <div className='pagado__aprobado' id="pagado__aprobado">
              <img className='pagado__aprobado__img' src={iglu_header} alt="" />
              <h2 className='pagado__aprobado__titulo'>Pago realizado con éxito</h2>
              <div className='pagado__aprobado__datos'>
                <p><b>N° compra:</b> {resPago?.data?.numeroCompra}</p>
                <p><b>Fecha compra:</b> {resPago?.data?.status?.date}</p>
              </div>
              <div className='pagado__aprobado__items'>
                {
                  resPago?.data?.items.map((data, i)=>(
                    
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
                  {
                    resPago?.data?.delivery == true &&
                    <>
                      <p>Delivery</p>
                      <p>{}</p>
                    </>
                  }
                <div className='pagado__aprobado__total'>
                  <b>Total:</b>
                  <b>$ {resPago?.data?.total}</b>
                </div>
                  
                </div>
            </div>
            <div className='pagado__rechazado__btn'>
              <button className='boton-secundario' onClick={()=>descargarComprobante('pagado__aprobado')}>Descargar comprobante</button>
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
    }
    
    </>
  )
}
