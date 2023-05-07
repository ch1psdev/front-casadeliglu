import plato_mariscos from '../../../assets/img/plato_mariscos.webp'

export const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <div className="row home__nosotros__caja">
            <div className="col-6 home__nosotros__img">
              <img src={ plato_mariscos } alt="" />
            </div>
            <div className="col-6 home__nosotros__texto">
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
