import { FilterIcon, LupaIcon } from "../../../assets/Icons"


export const Productos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 productos__banner" style={{backgroundImage: 'url("src/assets/img/productos/bannerProductos.webp")'}}>
            <h1>Productos</h1>
          </div>
        </div>
        <div className="row">
          <div className='col-1'></div>
          <div className='col-10'>
            <div className="row">
              <div className="col-12">
                <div className="miga">
                  <span>Inicio</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <div className="filtro">
                  <div className="filtro__titulo">
                    <h3>Categorías</h3>
                  </div>
                </div>
              </div>
              <div className="col-10">
                  <div className="productos__barraBusqueda">
                    <input type="text" placeholder="¿Qué estás buscando?" />
                    <button className="botonLupa"><LupaIcon/></button>
                    <div className="filtrar">
                      <button className="filtro__btn__filtrar">Filtrar <FilterIcon/></button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          
          <div className='col-1'></div>
        </div>
      </div>
    </>
  )
}
