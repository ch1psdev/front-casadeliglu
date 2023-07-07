import { useSelector } from "react-redux"
import { FilterIcon, LupaIcon } from "../../../assets/Icons"
import { useEffect, useMemo, useState } from "react"
import { CardProducto } from "../../components/CardProducto";
import { useLocation } from "react-router-dom";

export const Productos = () => {

  const [busqueda, setBusqueda] = useState('');
  const [datos, setDatos] = useState();
  const location = useLocation();
  const productos = useSelector( (state) => state.usuarioState.products.payload);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  }

  const onBusqueda = (e) => {
    setDatos(productos.filter( (data) => data.nombre.includes(busqueda)));
  }

  const filtrarDatos = () => {

    if(location.state != undefined || location.state != null){
      setDatos(productos.filter( (data) => data.categoria.includes(location.state) ))
    }else{
      setDatos(productos);
    }
  }

  // const template = (products) => {
  //   let tm = [];
  //   for (let i = 0; i < products.payload.length; i++) {
  //     tm.push(
  //       <div key={i}>
  //         <CardProducto producto={products.payload[i]} />
  //       </div>
  //     )
      
  //   }
  //   return tm;
  // }

  // useEffect(() => {
  //   template(products);
  // }, [products.payload])

  useEffect(() => {
    // setDatos(productos);
    filtrarDatos();
  }, [location.state])
  
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
                    <form onSubmit={onBusqueda}>
                      <input type="text" placeholder="¿Qué estás buscando?" value={busqueda} onChange={handleBusqueda} />
                      <button className="botonLupa" type="submit" onClick={() => {onBusqueda()}}><LupaIcon/></button>
                    </form>
                    
                    <div className="filtrar">
                      <button className="filtro__btn__filtrar">Filtrar <FilterIcon/></button>
                    </div>
                  </div>
                  <div>
                      <div className="productos__lista">
                          {
                          // template(products)
                          datos!=undefined &&
                          datos.map((data, i) =>(
                            
                              <div key={i}>
                                <CardProducto producto={data} />
                              </div>
                            ))
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
