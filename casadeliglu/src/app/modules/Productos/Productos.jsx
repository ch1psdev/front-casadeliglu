import { useSelector } from "react-redux"
import { FilterIcon, LupaIcon } from "../../../assets/Icons"
import { useMemo } from "react"
import { CardProducto } from "../../components/CardProducto";


export const Productos = () => {

  const { products } = useSelector( (state) => state.usuarioState);

  let template = (products) => {
    let tm = [];
    for (let i = 0; i < products.payload.length; i++) {
      tm.push(
        <div key={i}>
          <CardProducto producto={products.payload[i]} />
        </div>
      )
      
    }
    return tm;
  }
  

  return (
    <>
      <div className="container-fluid" style={{padding:'0'}}>
        <div className="row">
          <div className="col-12 productos__banner" style={{backgroundImage: 'url("src/assets/img/productos/bannerProductos.webp")'}}>
            <h1>Productos</h1>
          </div>
        </div>
        <div className="productos__cuerpo">
          <div className=''></div>
          <div className=''>
            <div className="row">
              <div className="col-12">
                <div className="miga">
                  <span>Inicio</span>
                </div>
              </div>
            </div>
            <div className="productos__filtro">
              <div className="">
                <div className="filtro">
                  <div className="filtro__titulo">
                    <h3>Categorías</h3>
                  </div>
                </div>
              </div>
              <div className="productos__cuerpo__caja">
                  <div className="productos__barraBusqueda">
                    <input type="text" placeholder="¿Qué estás buscando?" />
                    <button className="botonLupa"><LupaIcon/></button>
                    <div className="filtrar">
                      <button className="filtro__btn__filtrar">Filtrar <FilterIcon/></button>
                    </div>
                  </div>
                  <div>
                      <div className="productos__lista">
                        {
                          template(products)
                        }
                        {/* <button onClick={()=>console.log(products.payload)}></button> */}
                      </div>
                  </div>
              </div>
            </div>
          </div>
          
          <div className=''></div>
        </div>
      </div>
    </>
  )
}
