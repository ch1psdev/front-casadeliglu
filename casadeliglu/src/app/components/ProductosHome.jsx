import { useNavigate } from 'react-router-dom';
import salmon from '../../assets/img/productos/salmon.jpg'
import { AddCart } from '../../assets/Icons';
import { useEffect } from 'react';
import { CardProducto } from './CardProducto';

export const ProductosHome = ({datos}) => {

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

  return (
    <>
        <div className="row pb-5" style={{maxWidth:'100%', marginLeft:'0',marginRight:'0'}}>
          <div className="col-1 d-none d-lg-block"></div>
          <div className="col-lg-10 col-12" style={{display: 'grid'}}>
            <div>
              <h1 style={{marginBottom: '40px'}}>Nuestros productos</h1>
            </div>
            <div className='cards-group' style={{display:'grid', gridAutoFlow:'column', justifyItems: 'center'}}>
                {
                  datos!=undefined &&
                    template()
                }
            </div>
            
            <button className='boton home__nosotros__boton' style={{alignSelf: 'end', marginTop:'40px'}} onClick={() => navigate('/productos')}>Ver más productos</button>
          </div>
          <div className="col-1 d-none d-lg-block"></div>
        </div>
    </>
  )
}
