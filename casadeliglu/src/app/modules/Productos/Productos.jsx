import { useState } from "react"
import { useSelector } from "react-redux"
import { FilterIcon, LupaIcon } from "../../../assets/Icons"
import { CardProducto } from "../../components/CardProducto";
import { useNavigate } from "react-router-dom";
import { capitalizar } from "../../helpers/textos";
import Pagination from '@mui/material/Pagination';
import { LoaderComponent } from "../../components/Loader";
import { useProductos } from "../../hooks/useProductos";
import { usePagination } from "../../hooks/usePagination";

export const Productos = () => {

  const [busqueda, setBusqueda] = useState('');
  const [datos, setDatos] = useState();
  const [datosFiltrados, setDatosFiltrados] = useState();
  const [seleccionados, setSeleccionados] = useState('');
  const [showFiltros, setShowFiltros] = useState(false);

  const [listaProductos, filtrarProductosPorFamilia, filtrarPorNombre, familias, ordenarPrecioDesc, ordenarPrecioAsc, quitarFiltroPorCategoria] = useProductos();
  const [currentItems, numberOfPages, handlePageClick] = usePagination(listaProductos,16)

  const [mostrarLoader, setMostrarLoader] = useState(false);

  const handleClose = () => {
    setMostrarLoader(false)
  }

  const navigate = useNavigate();
  const productos = useSelector( (state) => state.productoState.data);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  }
  

  const onBusqueda = (e) => {
    setDatos(productos.filter( (data) => data.nombre.includes(busqueda)));
  }


  const filtrarPorCategorias = (dato) => {
    filtrarProductosPorFamilia(dato);
    setSeleccionados(dato);
  }

  const eliminarCategoria = () => {
    quitarFiltroPorCategoria();
    setSeleccionados('')
  }

  function Items({ current }) {
    return (
      <>
        {current &&
          current.map((item, i) => (
            <div key={i}>
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

  const ordenarAlfab = () =>{
    datosFiltrados.sort((a,b)=>{
      const nombreA = a.nombre.toUpperCase();
      const nombreB = b.nombre.toUpperCase();

      if(nombreA < nombreB){
        return -1;
      }

      if(nombreA > nombreB){
        return 1;
      }

      return 0;
    });

    setShowFiltros(false);
  }

  const ordenarReverse = () => {

    const arrayOrdenado = [...datosFiltrados];
    arrayOrdenado.sort((a,b)=>{

      const nombreA = a.nombre.toUpperCase();
      const nombreB = b.nombre.toUpperCase();

      if(nombreA > nombreB){
        return -1;
      }

      if(nombreA < nombreB){
        return 1;
      }

      return 0;
    });
    setDatosFiltrados(arrayOrdenado);
    setShowFiltros(false);
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
                    {
                      seleccionados &&
                      
                        <div >
                          <p>{seleccionados}</p>
                          <label onClick={() => eliminarCategoria()}>X</label>
                        </div>
                    }
                  </div>
                  <div className="productos__categorias__caja__detalle">

                  <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                          Familia
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body p-0">
                          <ul className="productos__categorias__caja__detalle__categorias">
                            {
                              // familias != undefined &&
                              (familias != undefined && familias.length > 0) &&
                              familias.sort().map((data,i)=>(
                                <li key={i} onClick={() => filtrarPorCategorias(data)}>
                                    {capitalizar(data)}
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>
                </div>
              </div>
              <div className="productos__cuerpo__caja">
                  <div className="productos__barraBusqueda productos__filtrar">
                    <form onSubmit={onBusqueda}>
                      <input type="text" placeholder="¿Qué estás buscando?" value={busqueda} onChange={handleBusqueda} />
                      <button className="botonLupa" type="submit" onClick={() => {onBusqueda()}}><LupaIcon/></button>
                    </form>
                    
                    <div className="productos__filtrar__filtro">
                      <button onClick={mostrarOpcFiltrar}>Filtrar <FilterIcon/></button>
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
