import { useSelector } from "react-redux";
import { FormPagar, TablaProductos, TotalProductos } from "../components";
import { useEffect, useRef, useState } from "react";
import VisitorAPI from "visitorapi";
import { pagar } from "../../../services/getnet/getnet";
import { useNavigate } from "react-router-dom";
import { Envio } from "../components/Envio";

export const Pagar = () => {

  // const VisitorAPI = require("visitorapi");

  const usuario = useSelector((state) => state.usuarioState);
  const carrito = useSelector((state) => state.carritoState);

  const [visitorData, setVisitorData] = useState({});
const [paso, setPaso] = useState('paso1');
const [inputForm, setInputForm] = useState({
  nombre:'',
  apellidos:'',
  direccion:'',
  comuna: '',
  ciudad: '',
  numeroContacto:'',
  correo:'',
  comentario:''
});
const [total, setTotal] = useState(0);

const [inputPago, setInputPago] = useState({
  email:'',
  mobile: '',
  name: '',
  surname:'',
  currency: "CLP",
  total: 0,
  description: 'Compra online Casa del Iglú',
  expiration: '2023-09-19T03:15:48+00:00',
  ipAddress: '',
  locale: 'es_CL',
  userAgent:'',
  items:[]
});

const navigate = useNavigate();


useEffect(() => {
  setInputPago((inputPago)=>({
    ...inputPago,
      name: inputForm.nombre,
      surname: inputForm.apellidos,
      email: inputForm.correo,
      mobile: inputForm.numeroContacto.toString(),
      // direccion: inputForm.direccion+', '+inputForm.comuna+', '+inputForm.ciudad
    
  }))
}, [inputForm])

useEffect(() => {
  setInputPago((inputPago)=>({
    ...inputPago,
      description: 'Compra online Casa del Iglú',
      currency: "CLP",
      total: total
  }))
}, [total])

useEffect(() => {
  if(usuario.status == 'identificado'){
    setInputForm((inputPago)=>({
      ...inputPago,
      nombre: usuario.info.nombre,
      apellidos: usuario.info.apellido,
      // direccion: usuario.info.direccion,
      comuna: usuario.info.comuna,
      ciudad: usuario.info.ciudad,
      numeroContacto: usuario.info.contacto.toString(),
      correo: usuario.info.correo,
  }))
  }
}, [usuario])

useEffect(() => {
  VisitorAPI(
    "wFGZiJrh8oZfQLJ3NIwV",
    data => {
      setVisitorData(data);
      setInputPago((inputPago)=>({
        ...inputPago,
        ipAddress: data.ipAddress,
        userAgent:data.browser
    }));
    }
  );
},[]);

const onPagar = async() => {

  let productos=[];

  for (let i = 0; i < carrito.products.length; i++) {
    productos.push({
      sku: carrito.products[i].codigo,
      name: carrito.products[i].nombre,
      category: carrito.products[i].familia,
      qty: carrito.products[i].cantidad,
      price: carrito.products[i].precioBruto,
      tax: 0
    }) 
    
  }

  let fechaActual = new Date();
  fechaActual.setMinutes(fechaActual.getMinutes() + 15);

  const fechaFormateada = fechaActual.toISOString().substring(0,19)+'+00:00';

  inputPago.expiration = fechaFormateada;
  inputPago.items = productos;

  setInputPago((inputPago)=>({
    ...inputPago,
    expiration: fechaFormateada,
    items: productos
  }));



  irAlPago();
}

const irAlPago = async() => {
  console.log(inputPago)

  const res = await pagar(inputPago);
  console.log(res);

  if(res.status.status == 'OK'){
    console.log(res.processUrl)
    window.open(res.processUrl);
    navigate('/pagar/procesando', {state: res.requestId});
  }
}

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
              <FormPagar setPaso={setPaso} setInputForm={setInputForm} inputForm={inputForm} />
            )
          }   
          { 
            paso == 'paso3' &&
            (
              <Envio />
            )
          }   

        </div>
        <div className="pagar__seccion__total">
          <TotalProductos onPagar={onPagar} total={total} setTotal={setTotal} />
        </div>
      </div>
    </>
  )
}
