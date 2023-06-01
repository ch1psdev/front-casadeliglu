import { useNavigate } from 'react-router-dom';
import salmon from '../../assets/img/productos/salmon.jpg'
import { AddCart } from '../../assets/Icons';
import Swal from 'sweetalert2'

export const ProductosHome = () => {

  const navigate = useNavigate();

  const irProducto = () =>{
    navigate('/productos')
  }

  const irCategoria = () =>{
    navigate('/productos')
  }

  const addProducto = () =>{
    Swal.fire({
      title: 'Producto añadido al carrito de compras!',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0C2695'
    })
  }

    const template = () => {
        let tm = [];

        for (let i = 0; i < 12; i++) {
           
            tm.push(<div key={i} className="card card-producto">
            <img src={salmon} className="card-img-top" alt="foto producto" />
            <div className="card-body">
              <div className='card__cuerpo__textos'>
                <span className='card-categoria manito' onClick={irCategoria} >Pescados</span>
                <h5 className="card-title manito" onClick={irProducto} >Nombre <br /> producto</h5>
                <br />
                <p className="card-text">$ 2000</p>
              </div>
              <div className='card__opciones manito'>
                <div className='card__opc__ver'>
                  <p>Ver</p>
                </div>
                <div className='card__img__cart' onClick={addProducto}>
                  <AddCart />
                </div>
              </div>
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
