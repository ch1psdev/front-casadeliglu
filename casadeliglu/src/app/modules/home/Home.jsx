import { useEffect, useState } from 'react';
import plato_mariscos from '../../../assets/img/plato_mariscos.webp'
import { ProductosHome } from '../../components/ProductosHome';
import { useNavigate } from 'react-router-dom';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import logo_whatsapp from '../../../assets/img/logo_whatsapp.png'
import { useDispatch } from 'react-redux';
import { cargarProductos } from '../../store/auth/authSlice';
import { getProductosService } from '../../services/productos/productoService';
import { cargarProductosThunk } from '../../store/product/thunk';

export const Home = () => {

  const navigate = useNavigate();
  const [pr, setPr] = useState();
  const dispatch = useDispatch();
  const [productos, setProductos] = useState();

  const obtenerProductos = async() => {
    setPr(productos);
  }

  useEffect(() => {
    obtenerProductos();
      if (pr!=undefined) {
        dispatch(cargarProductos(pr));
      }
  }, [pr])

  useEffect(() => {
    getProductosService().then(data=>setProductos(data.data))
  }, [])

  useEffect(() => {
    if(productos!=undefined){
      dispatch(cargarProductosThunk(productos))
    }
  }, [productos])

  return (
    <>
      <div className="container-fluid home p-0">
      
        <div className="row pb-5 m-0">

          {/*BOTÓN FLOTANTE DE WHATSAPP */}
          <FloatingWhatsApp 
            phoneNumber="+56984491140"
            accountName="Casa del iglú"
            allowEsc
            allowClickAway
            notification
            notificationSound
            statusMessage="Disponible"
            chatMessage="Hola, ¿en qué puedo ayudarte?"
            avatar={logo_whatsapp} 
          />
        </div>

        {/*SLIDER DE CARDS */}
        {
          productos != undefined &&
            <ProductosHome datos={productos} />
      }

        {/*INFORMACIÓN SOBRE NOSOTROS */}
        <div className='row pb-5 m-0'>
          <div className="col-12 col-lg-1"></div>
          <div className="col-12 col-lg-10">
            <div className="row home__nosotros__caja" style={{border:'2px solid #19A7CE', borderRadius:'15px'}}>
            <div className="col-12 col-md-6 home__nosotros__img">
              <img src={ plato_mariscos } alt="" />
            </div>
            <div className="col-12 col-md-6 home__nosotros__texto" style={{borderRadius:'0px 15px 15px 0px'}}>
              <h2>Congelados "Casa del Iglú"</h2>
              <p>
              Somos Congelados HG limitada una empresa dedicada a la venta y distribución de alimentos congelados de  calidad y por sobretodo precios accesibles. Con casa matriz  en la comuna de renca. <br />
              Constituida y formada durante la pandemia con el nombre de fantasía  “Casa del iglú” para ayudar a las familias. 
              </p>
              <button className='boton home__nosotros__boton' onClick={() => navigate('/quienes-somos')}>
                Más sobre nosotros
              </button>
            </div>
          </div>
          </div>
          <div className="col-12 col-lg-1"></div>
        </div>
      </div>
    </>
  )
}
