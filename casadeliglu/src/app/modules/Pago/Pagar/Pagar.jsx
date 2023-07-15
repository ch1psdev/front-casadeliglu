import { useSelector } from "react-redux";

export const Pagar = () => {

  const { products } = useSelector((state) => state.carritoState);

  return (
    <>
      <div className="pagar">
        <div className="pagar__seccion__productos">
          <table className="table table-hover">
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
                    <td>{data.payload.nombre}</td>
                    <td>{data.payload.precio}</td>
                    <td>{data.payload.cantidad}</td>
                    <td>{data.payload.precio * data.payload.cantidad}</td>
                  </tr>
                ))
              }
              
            </tbody>
          </table>
        </div>
        <div className="pagar__seccion_total">TOTAL</div>
      </div>
    </>
  )
}
