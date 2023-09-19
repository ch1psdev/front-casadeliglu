import { useSelector } from "react-redux"
import { FilterIcon, LupaIcon } from "../../../assets/Icons"
import { useEffect, useState } from "react"
import { CardProducto } from "../../components/CardProducto";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { capitalizar } from "../../helpers/textos";

export const Productos = () => {

  const [busqueda, setBusqueda] = useState('');
  const [datos, setDatos] = useState();
  const [datosFiltrados, setDatosFiltrados] = useState();
  const [seleccionados, setSeleccionados] = useState([]);
  const [categorias, setCategorias] = useState();
  
  const location = useLocation();
  const navigate = useNavigate();
  const productos = useSelector( (state) => state.productoState.data);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  }

  const onBusqueda = (e) => {
    setDatos(productos.filter( (data) => data.nombre.includes(busqueda)));
  }

  const filtrarDatos = () => {

    if(location.state != undefined || location.state != null){
      setDatos(productos.filter( (data) => data.familia.includes(location.state) ))
    }else{
      setDatos(productos);
    }
  }

  const filtrarPorCategorias = (dato) => {

    if(dato != null){
      setDatos(productos.filter( (data) => data.familia.includes(dato) ))
      const cat = categorias.filter(x => x !== dato)
      const sel = seleccionados.concat(dato);
      setSeleccionados(sel)
      setCategorias(cat)
    }
  }

  const eliminarCategoria = (inp) => {
    if(inp != null){
      setDatos(productos.filter( (data) => data.familia.includes(inp) ))
      const sel = seleccionados.filter(x => x !== inp);
      const cat = categorias.concat(inp);
      setSeleccionados(sel)
      setCategorias(cat)
    }
  }

  const mapFamilias = () =>{
    const familias = (productos.map( data => data.familia));
    let res = new Array();

    for (let i = 0; i < familias.length; i++) {
        if(!res.includes(familias[i])){
            res.push(familias[i]);
        }
    }

    return res;
}

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, i) => (
            <div key={i}>
              <CardProducto producto={item} />
            </div>
          ))}
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 16;
  const currentItems = datos?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(datos?.length / 16);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 16) % datos.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    filtrarDatos();
  }, [location.state])

  useEffect(() => {
    setCategorias(mapFamilias());
  }, [productos])
  
  
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
                      seleccionados.sort().map((data, i) => (
                        <div key={i} >
                          <p>{capitalizar(data)}</p>
                          <label onClick={() => eliminarCategoria(data)}>X</label>
                        </div>
                      ))
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
                              categorias != undefined &&
                              (categorias.length > 0) &&
                              categorias.sort().map((data,i)=>(
                                <li key={i} onClick={() => filtrarPorCategorias(data)}>
                                    {capitalizar(data)}
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                          Sub-familia
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                          
                        </div>
                      </div>
                    </div>
                  </div>

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
                          {/* {
                          // template(products)
                          datos!=undefined &&
                          datos.map((data, i) =>(
                            
                              <div key={i}>
                                <CardProducto producto={data} />
                              </div>
                            ))
                        } */}
                        {/* <button onClick={()=>console.log(products.payload)}></button> */}
                        <Items currentItems={currentItems} />
                        
                      </div>

                      <ReactPaginate
                          breakLabel="..."
                          nextLabel=">"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={3}
                          pageCount={pageCount}
                          previousLabel="<"
                          previousClassName={'previousPagination'}
                          renderOnZeroPageCount={null}
                          disabledClassName= {'disabled'}
                          nextClassName= {'nextPagination'}
                          activeClassName= {'selected'}
                          containerClassName="containerPagination"
                        />
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
