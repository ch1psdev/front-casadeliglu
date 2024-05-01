import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actualizarProducto, eliminarProducto, vaciarCarrito } from "../../store/shop/shopSlice";
import { CloseIcon, ImgNotFound } from "../../../assets/Icons";

export const ModalCarrito = ({showModalCarrito, handleCloseModalCarrito}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.carritoState);

    const pagar = () => {
        handleCloseModalCarrito();
        navigate('/pagar');
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
        if(parseInt(elemento) > 1){
            elemento = parseInt(elemento) - 1;
            let prod = {...data,
            cantidad : elemento
            }
            dispatch(actualizarProducto(prod));
        }
    }

    const eliminarElemento = (index) => {
        dispatch(eliminarProducto(index));
    }

    const calcularTotal = () =>{

        let totales = [];
        for (let i = 0; i < products.length; i++) {
        totales.push(products[i].precioBruto * products[i].cantidad)
        }

        const acumProductos = totales.reduce((acumulador, prd) => acumulador + prd, 0)

        return acumProductos
    }

  return (
    <>
        <Modal 
            show={showModalCarrito}
            className="modal__carrito"
            onHide={handleCloseModalCarrito}
            backdrop={true}
            backdropClassName="modal__carrito__opacidad"
        >
            <Modal.Header>
                <a onClick={handleCloseModalCarrito}>
                    <CloseIcon />
                </a>
            </Modal.Header>
            <Modal.Body>
                <div className="modal__carrito__carrito">
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
                                    {
                                    data.foto ? 
                                    (
                                        <img src={data?.foto} alt="" className="carrito__productos__foto" />
                                    ):(
                                        <ImgNotFound />
                                    )
                                    }
                                </div>
                                <div>
                                    <p className="carrito__productos__titulo"><b>{data.nombre}</b></p>
                                    <span>$ {data.precioBruto}</span>
                                    <br /><a className="manito carrito__productos__eliminar" onClick={() => eliminarElemento(i)}>Eliminar</a>
                                </div>
                                <div>
                                    <b className="carrito__productos__titulo">$ {data.precioBruto * data.cantidad}</b>
                                    <div className="carrito__productos__contador">
                                    <button onClick={() => btnRestar(i, data)}>-</button>
                                    <div>
                                        <input type="number" id={`cantidad${i}`} name="cantidad" className="carrito__cantidad" value={data.cantidad} onChange={(e) => handleCantidad(data, e)} />
                                    </div>
                                    <button onClick={() => btnSumar(i, data)}>+</button>
                                    </div>
                                </div>
                                </div>
                            ))
                            }
                            <a className="manito" onClick={limpiarCarro}>Vaciar Carrito</a>
                        </div>          
                        )
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                {
                    products.length != 0 &&
                    <>
                        <h2>Total: $ {calcularTotal()}</h2>
                        <button className="boton" onClick={pagar}>Ir a Pagar</button>
                    </>
                }
            </Modal.Footer>
        </Modal>
    </>
  )
}
