import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { obtenerFechaYHoraActual } from "../../../helpers/textos";
import { getCostoEnvio, pagar } from "../../../services/getnet/getnet";
import { useNavigate } from "react-router-dom";
import { LoaderComponent } from "../../../components/Loader";

export const Envio = () => {

  const { total } = useSelector((state) => state.buyState); 
  const compra = useSelector((state) => state.buyState);
  const {envio} = useSelector((state) => state.usuarioState)

  //STATES
  const [radioEnvio, setRadioEnvio] = useState();
  const [mostrarLoader, setMostrarLoader] = useState(false);
  const [costoEnvio, setCostoEnvio] = useState(2900);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectMedioPago = (id) =>{

    const elementos = document.querySelectorAll('input[name="formaEntrega"]')

    elementos.forEach((radioButton) => {
         if(radioButton.checked == true){
          document.getElementById(radioButton.id).classList.add('envio__selected')
          setRadioEnvio(radioButton.value);
          
         }else{
          document.getElementById(radioButton.id).classList.remove('envio__selected')
         }
      })
    
  } 

  const handleCloseLoader = () => {
    setMostrarLoader(false)
  }

  const irAlPago = async() => {

    setMostrarLoader(true);

    let input = compra;
    let fechaActual = new Date();
    fechaActual.setMinutes(fechaActual.getMinutes() + 15);

    const fechaFormateada = fechaActual.toISOString().substring(0,19)+'+00:00';

    let conenvio = radioEnvio > 0 ? true : false;

    input = {...input, total:total + parseInt(radioEnvio), reference: obtenerFechaYHoraActual(), expiration: fechaFormateada, delivery: conenvio}
    console.log(input, 'INPUT')

    const res = await pagar(input);

    console.log(res)

    if(res.status.status == 'OK'){
      window.open(res.processUrl);
      navigate('/pagar/procesando', {state: res.requestId});
    }

    setMostrarLoader(false)
  }

  useEffect(() => {
    setMostrarLoader(true)
    getCostoEnvio(envio)
      .then((data) => data)
      .then((data) => setCostoEnvio(data[0]))
      .finally(()=> setMostrarLoader(false))
  }, [])
  

  return (
    <>
    <div className="envio" id="envio">
      <div className="envio__textos">
        <p>
        Su compra será entregada en un <b>máximo de 48 horas.</b> 
        </p>
        <p><b>Dirección: </b>{compra.direccion}</p>
      </div>
      <div className="envio__valor">
        <p><b>Valor:</b> $ {costoEnvio}</p>
        <input type="radio" name="formaEntrega" id='envio' value={costoEnvio} onChange={()=>selectMedioPago()} />
      </div>
    </div>
    <br /> <br />
    <div className="envio" id="retiro">
      <div className="envio__textos">
        <p>
          Su producto estará listo para retirarlo a partir de <b>48 horas desde la fecha de compra.</b> 
        </p>
        <p><b>Dirección:</b> Av. Domingo santa maria 3595, LOCAL 3, RENCA</p>
      </div>
      <div className="envio__valor">
        <p><b>Valor:</b> $ 0</p>
        <input type="radio" name="formaEntrega" id="retiro" value={0} onChange={()=>selectMedioPago()} />
      </div>
    </div>

    <div className="envio__boton">
      <button className="boton" onClick={() => irAlPago()}>Pagar</button>
    </div>

    <LoaderComponent mostrarLoader={mostrarLoader} setMostrarLoader={setMostrarLoader} handleCloseLoader={handleCloseLoader} />
    </>
  )
}
