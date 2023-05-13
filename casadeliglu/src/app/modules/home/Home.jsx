import { useEffect, useState } from 'react';
import plato_mariscos from '../../../assets/img/plato_mariscos.webp'
import { Carousel } from 'primereact/carousel';
import { Galleria } from 'primereact/galleria';
import salmon from '../../../assets/img/productos/salmon.jpg'

export const Home = () => {

  const [products, setProducts] = useState([
    {
      id: 1,
      nombre: 'uno',
      imagen: 'https://m.media-amazon.com/images/I/517MRPeJfKL._AC_UF894,1000_QL80_.jpg'
    },
    {
      id: 2,
      nombre: 'dos',
      imagen: 'https://previews.123rf.com/images/almoond/almoond1208/almoond120800060/14897448-banner-hecho-de-ilustración-colorida-verduras-frescas.jpg'
    }
  ]);
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ]

    const productTemplate = (product) => {
      return (
          <div className="">
              <div className="mb-3 d-grid">
                  <img src={product.imagen} alt="" style={{maxHeight:'300px', margin:'auto', width:'100%'}} />
              </div>
          </div>
      );
  };

  return (
    <>
      <div className="container-fluid home">
        <div className="row pb-5">
          <div className="col-12" style={{padding:'0'}}>
            <div className="card" style={{border: '0'}}>
                {/* <Carousel value={products} numVisible={1} numScroll={3} showIndicatorsOnItem={true} responsiveOptions={responsiveOptions} className="custom-carousel" circular autoplayInterval={3000} itemTemplate={productTemplate} /> */}
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

        <div className="row pb-5">
          <div className="col-1"></div>
          <div className="col-10" style={{display: 'grid'}}>
            <div>
              <h1 style={{marginBottom: '40px'}}>Nuestros productos</h1>
            </div>
            <div className='cards-group' style={{display:'grid', gridAutoFlow:'column', justifyItems: 'center'}}>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            <div class="card card-producto">
              <img src={salmon} class="card-img-top" alt="foto producto" />
              <div class="card-body">
                <span className='card-categoria'>Pescados</span>
                <h5 class="card-title">Nombre <br /> producto</h5>
                <br />
                <p class="card-text">$ 2000</p>
              </div>
            </div>
            </div>
            
            <button className='boton home__nosotros__boton' style={{alignSelf: 'end', marginTop:'40px'}}>Ver más productos</button>
          </div>
          <div className="col-1"></div>
        </div>

        <div className='row pb-5'>
          <div className="col-1"></div>
          <div className="col-10">
            <div className="row home__nosotros__caja" style={{border:'2px solid #19A7CE', borderRadius:'15px'}}>
            <div className="col-6 home__nosotros__img">
              <img src={ plato_mariscos } alt="" />
            </div>
            <div className="col-6 home__nosotros__texto" style={{borderRadius:'15px'}}>
              <h2>Congelados "Casa del Iglú"</h2>
              <p>
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form
              </p>
              <button className='boton home__nosotros__boton'>
                Ver productos
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
