import { useSelector } from "react-redux";

export const TablaProductos = ({setPaso}) => {

    const { products } = useSelector((state) => state.carritoState);

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
            <button className="boton" onClick={() => setPaso('paso2')}>Continuar</button>
          </div>
    </>
  )
}
