import { useEffect, useState } from 'react';
import plato_mariscos from '../../../assets/img/plato_mariscos.webp'
import { Carousel } from 'primereact/carousel';
import { Galleria } from 'primereact/galleria';
import salmon from '../../../assets/img/productos/salmon.jpg'
import { ProductosHome } from '../../components/ProductosHome';
import { useNavigate } from 'react-router-dom';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import logo_whatsapp from '../../../assets/img/logo_whatsapp.png'
import { productos } from '../../../dummy/productos.js';
// import { Banner } from '../../components/Banner';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { cargarProductos } from '../../store/auth/authSlice';
import banner1 from '../../../assets/img/home/banner1.webp';
import banner2 from '../../../assets/img/home/banner2.webp';
import banner3 from '../../../assets/img/home/banner3.webp';
import banner4 from '../../../assets/img/home/banner4.webp';

export const Home = () => {

  const navigate = useNavigate();
  const [pr, setPr] = useState();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([
    {
      id: 1,
      nombre: 'banner1',
      imagen: banner1
    },
    {
      id: 2,
      nombre: 'banner2',
      imagen: banner2
    },
    {
      id: 3,
      nombre: 'banner3',
      imagen: banner3
    },
    {
      id: 4,
      nombre: 'banner4',
      imagen: banner4
    }
  ]);

  let prods;
  const obtenerProductos = async() => {
    setPr(productos);
    
  
  }
    // window.onscroll = () => {
    //   var y = window.scrollY;
    //   console.log(y)
    // }

    const productTemplate = (product) => {
      return (
          <div className="">
              <div className="mb-3 d-grid">
                  <img src={product.imagen} alt="" className='banner__img' />
              </div>
          </div>
      );
  };

  useEffect(() => {
    obtenerProductos();
      if (pr!=undefined) {
        dispatch(cargarProductos(pr));
      }
  }, [pr])
  

  return (
    <>
      <div className="container-fluid home p-0">
      
        <div className="row pb-5 m-0">
        <FloatingWhatsApp phoneNumber="+56984491140"
        accountName="Casa del iglú"
        allowEsc
        allowClickAway
        notification
        notificationSound
        statusMessage="Disponible"
        chatMessage="Hola, ¿en qué puedo ayudarte?"
        avatar={logo_whatsapp} />
          <div className="col-12" style={{padding:'0'}}>
            <div className="card" style={{border: '0'}}>
                <Galleria 
                  value={products} 
                  showItemNavigators={true} 
                  showThumbnails={false} 
                  showIndicators 
                  circular 
                  autoPlay 
                  transitionInterval={3000}
                  showIndicatorsOnItem={true} 
                  item={productTemplate} 
                />
            </div>
          </div>
        </div>

        {/* <Banner /> */}
        {
          pr != undefined &&
            <ProductosHome datos={pr} />
      }

        <div className='row pb-5 m-0'>
          <div className="col-1"></div>
          <div className="col-10">
            <div className="row home__nosotros__caja" style={{border:'2px solid #19A7CE', borderRadius:'15px'}}>
            <div className="col-12 col-md-6 home__nosotros__img">
              <img src={ plato_mariscos } alt="" />
            </div>
            <div className="col-12 col-md-6 home__nosotros__texto" style={{borderRadius:'15px'}}>
              <h2>Congelados "Casa del Iglú"</h2>
              <p>
              Somos Congelados HG limitada una empresa dedicada a la venta y distribución de alimentos congelados de  calidad y por sobretodo precios accesibles. Con casa matriz  en la comuna de renca. <br />
              Constituida y formada durante la pandemia con el nombre de fantasía  “Casa del iglú” para ayudar a las familias a la adquisición de alimentos con entrega directa a sus hogares ayudando a disminuir la exposición de las personas. 
              </p>
              <button className='boton home__nosotros__boton' onClick={() => navigate('/quienes-somos')}>
                Más sobre nosotros
              </button>
            </div>
          </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    
    </>
  )
}
