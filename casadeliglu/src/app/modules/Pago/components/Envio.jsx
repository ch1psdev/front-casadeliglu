import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { obtenerFechaYHoraActual } from "../../../helpers/textos";
import { pagar } from "../../../services/getnet/getnet";
import { useNavigate } from "react-router-dom";

export const Envio = () => {

  const { total } = useSelector((state) => state.buyState); 
  const compra = useSelector((state) => state.buyState);

  const [radioEnvio, setRadioEnvio] = useState();
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

  const irAlPago = async() => {

    let input = compra;
    let fechaActual = new Date();
    fechaActual.setMinutes(fechaActual.getMinutes() + 15);

    const fechaFormateada = fechaActual.toISOString().substring(0,19)+'+00:00';

    input = {...input, total:total + parseInt(radioEnvio), reference: obtenerFechaYHoraActual(), expiration: fechaFormateada}
    console.log(input, 'INPUT')

    const res = await pagar(input);

    if(res.status.status == 'OK'){
      console.log(res.processUrl)
      window.open(res.processUrl);
      navigate('/pagar/procesando', {state: res.requestId});
    }

    console.log(res)
  }
  
  // const obtenerMesActual = () => {
  //   const fecha = new Date();
  //   const opciones = { month: 'long' };
  //   const mesEnEspanol = fecha.toLocaleDateString('es-ES', opciones);
  //   return mesEnEspanol;
  // };
  
  // // Ejemplo de uso
  // const mesActual = obtenerMesActual();
  // console.log(mesActual); // Imprimirá el nombre del mes actual en español

  return (
    <>
    <div className="envio" id="envio">
      <div className="envio__textos">
        <p>
          Su producto será enviado el día <b>Lunes 22 de Enero de 2024</b> 
        </p>
        <p><b>Dirección:</b> Av escuela agrícola 1710, Macul</p>
      </div>
      <div className="envio__valor">
        <p><b>Valor:</b> $ 2.900</p>
        <input type="radio" name="formaEntrega" id='envio' value={2900} onChange={()=>selectMedioPago()} />
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
    </>
  )
}
