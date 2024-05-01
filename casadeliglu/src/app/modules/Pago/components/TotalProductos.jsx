import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarTotal } from "../../../store/buy/buySlice";

export const TotalProductos = () => {

  const { products } = useSelector((state) => state.carritoState);
  const { total } = useSelector((state) => state.buyState); 
  const dispatch = useDispatch();

  // const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const calcularSubTotal = () =>{

    let totales = [];
    for (let i = 0; i < products.length; i++) {
      totales.push(products[i].precioBruto * products[i].cantidad)
    }

    const acumProductos = totales.reduce((acumulador, prd) => acumulador + prd, 0)

    setSubTotal(acumProductos)
    dispatch(agregarTotal(acumProductos))
    console.log('se ejecuto')

    return
  }

  useEffect(() => {
    calcularSubTotal()
  }, [])
  
  return (
    <>
        <div className="total__productos__caja">
          <h3>Tu pedido</h3>
          <div>
          {
            products.map((data, i) => (
              <div className="total__productos__productos" key={i}>
                <p>{data.nombre} <span style={{color: '#8c8c8c'}}>x { data.cantidad }</span></p>
                <p><b>$ { data.precioBruto * data.cantidad }</b></p>
              </div>
            ))
          }
          </div>

          <div className="total__productos__subtotal">
            <p>Subtotal:</p>
            <p><b>$ {subTotal}</b></p>
          </div>

          {/* <div>
            <div>
              <label htmlFor="btnEnvio">&nbsp;Envío a domicilio ($2.900)</label>
            </div>
            <div>
              <label htmlFor="btnRetiro">&nbsp;Retiro en local</label>
            </div>
          </div> */}

          <div className="total__productos__subtotal">
            <p>Total:</p>
            <p><b>$ {total}</b></p>
          </div>

          <div className="caja__getnet">
            <div className="caja__getnet__btn">
              <input type="radio" id="radioGetnet" name="radioGetnet" checked readOnly />
              <label htmlFor="radioGetnet">&nbsp;Tarjeta de crédito, débito o prepago.</label>
              <img src="https://banco.santander.cl/uploads/000/029/870/0620f532-9fc9-4248-b99e-78bae9f13e1d/original/Logo_WebCheckout_Getnet.svg" alt="Logo Getnet" style={{width: '145px'}} />
            </div>
            <p>Paga seguro todo lo que necesitas con Getnet utilizando tus tarjetas de crédito, débito y prepago, de todos los emisores nacionales e internacionales.</p>
          </div>
          {/* <div>
            <button className="boton" onClick={onPagar}>Pagar</button>
          </div> */}
        </div>
    </>
  )
}
