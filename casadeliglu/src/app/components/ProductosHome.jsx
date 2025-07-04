import { useNavigate } from 'react-router-dom';
import { CardProducto } from './CardProducto';
import { useEffect, useState } from 'react';
import { getDeviceType } from 'device-type-detector';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export const ProductosHome = ({datos}) => {

  const [ device, setDevice ] = useState('');
  const [ items, setItems ] = useState([]);

  const navigate = useNavigate();

    const template = () => {
        let tm = [];

        for (let i = 0; i < 12; i++) {
          tm.push(
            <div key={i}>
              <CardProducto producto={datos[i]} />
            </div>
          )
        }

        return tm;
    }

    const templateMobile = () => {
      
      return datos.map((data, i) => (
        <div key={i}>
          <CardProducto producto={data} />
        </div>
      ));
    }

    const responsive = {
      0: { items: 1}
    }

    useEffect(() => {
      const type = getDeviceType();
      setDevice(type)
      console.log(typeof(templateMobile()))
    }, [])
    

  return (
    <>
        <div className="row pb-5" style={{maxWidth:'100%', marginLeft:'0',marginRight:'0'}}>
          <div className="col-1 d-none d-lg-block"></div>
          <div className="col-lg-10 col-12" style={{display: 'grid'}}>
            <div>
              <h1 style={{marginBottom: '40px'}}>Nuestros productos</h1>
            </div>

           
                <div className='cards-group'>
                  {
                    datos!=undefined &&
                      template()
                  }
                </div>
            
            {/* {
              (device === 'mobile') &&
                (<AliceCarousel
                  items={templateMobile()}
                  responsive={responsive}
                />)
            } */}
            

            <button className='boton home__nosotros__boton' style={{marginTop:'40px'}} onClick={() => navigate('/productos')}>Ver más productos</button>
          </div>
          <div className="col-1 d-none d-lg-block"></div>
        </div>
    </>
  )
}
