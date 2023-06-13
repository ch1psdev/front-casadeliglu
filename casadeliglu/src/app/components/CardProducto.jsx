import { AddCart } from '../../assets/Icons'
import salmon from '../../assets/img/productos/salmon.jpg'

export const CardProducto = ({producto}) => {

  return (
    <>
      {
        producto!=undefined &&
        <div className="card card-producto">
          <img src={salmon} className="card-img-top" alt="foto producto" />
          <div className="card-body">
            <div className='card__cuerpo__textos'>
              <span className='card-categoria manito'>{producto.categoria}</span>
              <h5 className="card-title manito">{producto.nombre}</h5>
              <p className="card-text">$ {producto.precio}</p>
            </div>
            <div className='card__opciones manito'>
              <div className='card__opc__ver'>
                <p>Ver</p>
              </div>
              <div className='card__img__cart'>
                <AddCart />
              </div>
            </div>
          </div>
        </div>
      }
      
    </>
  )
}
