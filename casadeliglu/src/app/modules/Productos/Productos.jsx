import { useState } from "react"
import { FilterIcon, LupaIcon } from "../../../assets/Icons"
import { CardProducto } from "../../components/CardProducto";
import { useNavigate } from "react-router-dom";
import { capitalizar } from "../../helpers/textos";
import Pagination from '@mui/material/Pagination';
import { LoaderComponent } from "../../components/Loader";
import { useProductos } from "../../hooks/useProductos";
import { usePagination } from "../../hooks/usePagination";

export const Productos = () => {

  const [seleccionados, setSeleccionados] = useState('');
  const [showFiltros, setShowFiltros] = useState(false);

  const [listaProductos, filtrarProductosPorFamilia, filtrarPorNombre, familias, ordenarPrecioDesc, ordenarPrecioAsc, quitarFiltroPorCategoria, obtenerSubFamilias, subFamilias, filtrarProductosPorSubFamilia ] = useProductos();
  const [currentItems, numberOfPages, handlePageClick] = usePagination(listaProductos,16)

  const [mostrarLoader, setMostrarLoader] = useState(false);

  const [subFamilyValue, setSubFamilyValue] = useState("");

  const handleClose = () => {
    setMostrarLoader(false)
  }

  const navigate = useNavigate();

  const onBusqueda = (e) => {
    e.preventDefault();
    const prd = document.getElementById("inpBusqueda").value;
    filtrarPorNombre(prd)
  }

  const onSelectFamilia = (e) =>{
    filtrarProductosPorFamilia(e.target.value);
    setSeleccionados(e.target.value);
    selectSubFamilias(e.target.value)
    setSubFamilyValue("");
  }

  function Items({ current }) {
    return (
      <>
        {current &&
          current.map((item, i) => (
            <div key={i} className="lista-productos">
              <CardProducto producto={item} />
            </div>
          ))}
      </>
    );
  }

  const mostrarOpcFiltrar = () =>{
    setShowFiltros(!showFiltros);
  }

  const ejecutarFuncionFiltro = (fun) => {
    fun();
    setShowFiltros(false);
  }

  const selectSubFamilias = (familia) =>{
    
      return obtenerSubFamilias(familia);
}

const onSelectSubFamilia = (e) => {
  setSubFamilyValue(e.target.value)
  filtrarProductosPorSubFamilia(e.target.value)
}

  return (
    <>
      <div className="container-fluid" style={{padding:'0'}}>
        <div className="row">
          <div className="col-12 productos__banner">
            <h1>Productos</h1>
          </div>
        </div>
        <div className="productos__cuerpo">
          <div className=''></div>
          <div className=''>
            <div className="row">
              <div className="col-12">
                <div className="miga">
                  <span className="miga__ruta" onClick={() => navigate('/inicio')}>Inicio</span>
                  <span> / </span>
                  <span className="miga__activo">Productos</span>
                </div>
              </div>
            </div>
            <div className="productos__filtro">
              <div className="productos__categorias">
                <div className="productos__categorias__caja">
                  <div className="productos__categorias__caja__titulo">
                    <h3>Categorías</h3>
                  </div>
                  <div className="mt-4 mb-4 productos__categorias__caja__seleccionados">
                  </div>
                  <div className="productos__categorias__caja__detalle">
                    <h3>Familia</h3>
                    <select name="selectFamilias" id="selectFamilias" className="form-select" value={seleccionados} onChange={onSelectFamilia}>
                      <option value="" disabled>Seleccione...</option>
                      {
                        familias.map((data) => (
                          <option key={data} value={data}>{capitalizar(data)}</option>
                        ))
                      }
                    </select>
                    <br />
                    <h3>Sub-familia</h3>
                    <select name="selectSubFamilias" id="selectSubFamilias" className="form-select" value={subFamilyValue} onChange={onSelectSubFamilia}>
                      <option value="" disabled>Seleccione...</option>
                      {
                        subFamilias.map((data) => (
                          
                          <option key={data} value={data}>{capitalizar(data)}</option>
                          
                        ))
                      }
                    </select>
               

                  </div>
                </div>
              </div>
              <div className="productos__cuerpo__caja">
                  <div className="productos__barraBusqueda productos__filtrar">
                    <form onSubmit={onBusqueda}>
                      <input type="text" placeholder="¿Qué estás buscando?" id="inpBusqueda" />
                      <button className="botonLupa" type="submit"><LupaIcon/></button>
                    </form>
                    
                    <div className="productos__filtrar__filtro">
                      <button >Filtrar <FilterIcon/></button>
                      {
                        showFiltros &&
                        <div>
                          <ul>
                            <li onClick={ordenarAlfab}>A - Z</li>
                            <li onClick={ordenarReverse}>Z - A</li>
                            <li onClick={()=>ejecutarFuncionFiltro(ordenarPrecioAsc)}>Precio min. - max.</li>
                            <li onClick={()=>ejecutarFuncionFiltro(ordenarPrecioDesc)}>Precio max. - min.</li>
                          </ul>
                        </div>
                      }
                    </div>
                  </div>
                  <div>
                      <div className="productos__lista">
                          {
                            currentItems.length > 0 &&
                            <Items current={currentItems} />
                          }
                        
                      </div>
                        <div style={{display:'grid', justifyContent:'center', padding: '20px 0px 40px 0px'}}>
                          <Pagination 
                            count={numberOfPages}
                            defaultPage={1} 
                            siblingCount={0} 
                            boundaryCount={2} 
                            showFirstButton 
                            showLastButton
                            onChange={(e,page) => handlePageClick(e, page)}
                          />
                          
                        </div>
                        
                  </div>
              </div>
            </div>
          </div>
          
          <div className=''></div>
        </div>
      </div>     

      <LoaderComponent mostrarLoader={mostrarLoader} setMostrarLoader={setMostrarLoader} handleCloseLoader={handleClose} /> 
    </>
  )
}
