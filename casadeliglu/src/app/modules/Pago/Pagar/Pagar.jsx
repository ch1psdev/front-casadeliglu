import { useDispatch } from "react-redux";
import { FormPagar, TablaProductos, TotalProductos } from "../components";
import { useEffect, useRef, useState } from "react";
import VisitorAPI from "visitorapi";
import { Envio } from "../components/Envio";
import { agregarInfoDevice } from "../../../store/buy/buySlice";

export const Pagar = () => {

  const dispatch = useDispatch();
  const [paso, setPaso] = useState('paso1');

  useEffect(() => {
    VisitorAPI(
      "wFGZiJrh8oZfQLJ3NIwV",
      data => {
        const dataInfoDevice = {
          ipAddress: data.ipAddress,
          userAgent:data.browser
        }
        dispatch(agregarInfoDevice(dataInfoDevice));
      }
    );
  },[]);

  return (
    <>
      <div className="pagar">
        <div className="pagar__seccion__productos">
          {
            paso == 'paso1' && (
              <TablaProductos setPaso={setPaso} />
            ) 
          }

          { 
            paso == 'paso2' &&
            (
              <FormPagar setPaso={setPaso} />
            )
          }   
          { 
            paso == 'paso3' &&
            (
              <Envio />
            )
          }   

        </div>
        <div className="pagar__seccion__total d-none d-lg-grid">
          <TotalProductos />
        </div>
      </div>
    </>
  )
}
