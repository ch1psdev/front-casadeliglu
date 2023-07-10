import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { actualizarProducto, eliminarProducto, vaciarCarrito } from "../store/shop/shopSlice";

export const PanelCarrito = ({setMostrarCarrito, mostrarCarrito}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.carritoState);
  console.log(products)

  const pagar = () => {
    setMostrarCarrito(!mostrarCarrito)
    navigate('/pagar')
  }

  const limpiarCarro = () => {
    dispatch(vaciarCarrito())
  }

  const handleCantidad = (data,e) => {
    let prod = {...data,
      cantidad : parseInt(e.target.value)
    }
    dispatch(actualizarProducto(prod));
  }

  const btnSumar = (i,data) => {
    let elemento = document.getElementById('cantidad'+i).value;
    elemento = parseInt(elemento) + 1;
    let prod = {...data,
      cantidad : elemento
    }
    dispatch(actualizarProducto(prod));
  }

  const btnRestar = (i,data) => {
    let elemento = document.getElementById('cantidad'+i).value;
    elemento = parseInt(elemento) - 1;
    let prod = {...data,
      cantidad : elemento
    }
    dispatch(actualizarProducto(prod));
  }

  const eliminarElemento = (index) => {
    dispatch(eliminarProducto(index));
  }

  return (
    <div className="carrito">
      <h1>Carro de compras</h1>
      <span>Cantidad de productos: {products.length}</span>
      {
        products.length == 0 ? (
          <div>Su carro está vacío</div>
        ) : (
          <div>
            {
              products.map((data, i) => (
                <div key={i} className="carrito__productos">
                  <div>
                    <img src={data.payload.foto} alt="" className="carrito__productos__foto" />
                  </div>
                  <div>
                    <p className="carrito__productos__titulo"><b>{data.payload.nombre}</b></p>
                    <span>$ {data.payload.precio}</span>
                    <br /><a className="manito carrito__productos__eliminar" onClick={() => eliminarElemento(i)}>Eliminar</a>
                  </div>
                  <div>
                    <b className="carrito__productos__titulo">$ {data.payload.precio * data.payload.cantidad}</b>
                    <div className="carrito__productos__contador">
                      <button onClick={() => btnRestar(i, data.payload)}>-</button>
                      <div>
                        <input type="number" id={`cantidad${i}`} name="cantidad" className="carrito__cantidad" value={data.payload.cantidad} onChange={(e) => handleCantidad(data.payload, e)} />
                      </div>
                      <button onClick={() => btnSumar(i, data.payload)}>+</button>
                    </div>
                  </div>
                </div>
              ))
            }
            <a className="manito" onClick={limpiarCarro}>Vaciar Carrito</a>
          </div>          
        )
      }
      <h2>Total: $ 0</h2>
      <button className="boton" onClick={pagar}>Ir a Pagar</button>
    </div>
  )
}
