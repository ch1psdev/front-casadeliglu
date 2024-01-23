import { useDispatch, useSelector } from "react-redux";
import { actualizarCompra } from "../../../store/buy/buySlice";

export const TablaProductos = ({setPaso}) => {

    const { products } = useSelector((state) => state.carritoState);
    const carrito = useSelector((state) => state.carritoState);
    const dispatch = useDispatch();

    const confirmarProductos = () =>{
      let productos=[];

      for (let i = 0; i < carrito.products.length; i++) {
          productos.push({
          sku: carrito.products[i].codigo,
          name: carrito.products[i].nombre,
          category: carrito.products[i].familia,
          qty: carrito.products[i].cantidad,
          price: carrito.products[i].precioBruto,
          tax: 0
          });
      }

      dispatch(actualizarCompra(productos));
      setPaso('paso2')

  }

  return (
    <>
        <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Cant.</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((data, i) => (
                  <tr key={i}>
                    <td className="manito">X</td>
                    <th scope="row">{i+1}</th>
                    <td>{data.nombre}</td>
                    <td>{data.precioBruto}</td>
                    <td>{data.cantidad}</td>
                    <td>{data.precioBruto * data.cantidad}</td>
                  </tr>
                ))
              }
              
            </tbody>
          </table>
          <div className="pagar__seccion__productos__boxBoton">
            <button className="boton" onClick={()=>confirmarProductos()}>Continuar</button>
          </div>
    </>
  )
}
