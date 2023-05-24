import { useNavigate } from 'react-router-dom';
import salmon from '../../assets/img/productos/salmon.jpg'

export const ProductosHome = () => {

  const navigate = useNavigate();

    const template = () => {
        let tm = [];

        for (let i = 0; i < 12; i++) {
           
            tm.push(<div key={i} className="card card-producto manito">
            <img src={salmon} className="card-img-top" alt="foto producto" />
            <div className="card-body">
              <span className='card-categoria'>Pescados</span>
              <h5 className="card-title">Nombre <br /> producto</h5>
              <br />
              <p className="card-text">$ 2000</p>
            </div>
          </div>)
            
        }

        return tm;
    }

  return (
    <>
        <div className="row pb-5" style={{maxWidth:'100%', marginLeft:'0',marginRight:'0'}}>
          <div className="col-1 d-none d-lg-block"></div>
          <div className="col-md-10 col-12" style={{display: 'grid'}}>
            <div>
              <h1 style={{marginBottom: '40px'}}>Nuestros productos</h1>
            </div>
            <div className='cards-group' style={{display:'grid', gridAutoFlow:'column', justifyItems: 'center'}}>
                {
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
