import { useEffect, useState } from "react"
import { ThreeCircles } from "react-loader-spinner"
import { useLocation, useNavigate } from "react-router-dom"
import { consultarPago } from "../../../../services/getnet/getnet"

export const PagoEnEspera = () => {

    const location = useLocation()
    const [resuelto, setResuelto] = useState(false);
    const navigate = useNavigate();

    console.log(location.state);

    const verEstadoSolicitud = () =>{
        const res = consultarPago(location.state).then((data)=>{
            if(data.data.status.status!=='PENDING'){
                setResuelto(!resuelto);
                navigate('/pagar/resuelto', {state:data});
            }
            console.log(data.data.status.status);
        });
    }

    useEffect(() => {
        if (!resuelto) {
            const intervalId = setInterval(verEstadoSolicitud, 10000);
      
            return () => clearInterval(intervalId);
          }
    }, [resuelto])
    
  return (
    <>
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
    </>
  )
}
