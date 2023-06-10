import { useNavigate } from 'react-router-dom'
import salmon from '../../../assets/img/productos/salmon.jpg'

export const Producto = ({nombre, categoria, precio, stock}) => {

    const navigate = useNavigate();

  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-12" style={{padding: '20px 0px'}}>
                            <div className="miga">
                                <span>Inicio</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 producto">
                            <img src={salmon} alt="" />
                            <div className="producto__info">
                                <div className="producto__info__desc">
                                    <a className='producto__info__desc--categoria' onClick={() => navigate('/productos')}>categoria</a>
                                    <h1>Pulpa de arándano</h1>
                                    <p className="producto__info__desc--precio">$ 2750</p>
                                    <p className="producto__info__desc--stock">Stock disponible: 14 unidades</p>
                                </div>
                                <div className='producto__info__cantidad-totalizar'>
                                    <div className='producto__info__cantidad'>
                                        <a className='producto__info__cantidad--sumar'>+</a><label>Cantidad: <span>1</span></label><a className='producto__info__cantidad--restar'>-</a>
                                    </div>
                                    <span>Total: $ 2750</span>
                                    <button className='producto__info__desc--carrito'>Añadir al carrito</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    </>
  )
}
