import { useEffect, useState } from "react";
import { ModalEditarProducto } from "../../../components/Modals/ModalEditarProducto";
import { ModalAgregarProducto } from "../../../components/Modals/ModalAgregarProducto";
import { getProductosMantenedorService, getToggleVigenciaProductosService } from "../../../services/mantenedor/mantenedorService";
import { useSelector } from "react-redux";
import { EditarIcon } from "../../../../assets/Icons";
import Swal from 'sweetalert2';
import { capitalizar } from "../../../helpers/textos";

export const Inventario = () => {

    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState();
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [showModalProducto, setShowModalProducto] = useState(false);
    const [showModalAgregarProducto, setShowModalAgregarProducto] = useState(false);
    const [formFiltro, setFormFiltro] = useState({
      codigo: '',
      nombre: '',
      familia: '',
      precio: '',
      stock: '',
      activo: true
    })
    const [familias, setFamilias] = useState([])

    const token = useSelector(state => state.usuarioState.token);

    const obtenerProductos = async() =>{
        const res = await getProductosMantenedorService(token);
        if(res.code == 200){
          console.log(res.data)
          setProductos(res.data)
          setProductosFiltrados(res.data)
        }
    }

    const handleInput = (e) => {
      setFormFiltro({
        ...formFiltro,
        [e.target.name]: e.target.value
    })
    console.log(e.target.value)
    }

    const productoVigenteToggle = async(idProducto) => {

        Swal.fire({
         title: 'Estás seguro de activar/desactivar este producto?',
         icon: 'warning',
         confirmButtonText: 'Aceptar',
         confirmButtonColor: '#0C2695',
         showCloseButton: true,
         showCancelButton: true
       }).then((result)=>{
         if(result.isConfirmed){
           
           new Promise(async (resolve, reject)=>{
             try {
               const res = await getToggleVigenciaProductosService(token, idProducto)   
               console.log(res)
               if(res.code == 200){
                 resolve(res.code)
               }else{
                 reject('Hubo un problema al procesar la solicitud')
               }
             } catch (e) {
               reject('Hubo un problema al procesar la solicitud')
             }
   
             return 
           }).then((res)=>{
             console.log(res)
             if(res == 200){
               Swal.fire({
                 title: 'Producto actualizado correctamente',
                 icon: 'success',
                 confirmButtonText: 'Aceptar',
                 confirmButtonColor: '#0C2695',
                 showCloseButton: true,
               }).then(()=>{
                 obtenerProductos()
               })
             }else{
               Swal.fire({
                 title: 'Hubo un problema al procesar la solicitud',
                 icon: 'error',
                 confirmButtonText: 'Aceptar',
                 confirmButtonColor: '#0C2695',
                 showCloseButton: true,
               }).then(()=>{
                 document.getElementById('flexSwitchCheckDefault').checked = !document.getElementById('flexSwitchCheckDefault').checked
               })
             }
           })
         }else if(result.isDismissed){
           document.getElementById('flexSwitchCheckDefault').checked = !document.getElementById('flexSwitchCheckDefault').checked
         }
       })
   
       
     }

     const cerrarModalProducto = () => {
        setShowModalProducto(false);
        obtenerProductos();
      }
    
      const cerrarModalAgregarProducto = () => {
        setShowModalAgregarProducto(false);
        obtenerProductos();
      }
    
      const abrirModalProducto = (producto) => {
        setShowModalProducto(true);
        setProducto(producto)
      }
    
      const abrirModalAgregarProducto = () => {
        setShowModalAgregarProducto(true);
      }

      const filtrarProductos = () => {
        let productosActuales = productos;
        console.log(formFiltro.activo)

        productosActuales = productos.filter(p => 
          p.codigo.includes(formFiltro.codigo) &&
          p.nombre.toLowerCase().includes(formFiltro.nombre.toLowerCase()) &&
          p.familia.toLowerCase().includes(formFiltro.familia.toLowerCase()) &&
          p.vigente === formFiltro.activo
        )

        console.log(productosActuales)
        setProductosFiltrados(productosActuales)

        console.log(typeof productosActuales.vigente)
      }

      const limpiarFiltros = () => {
        setProductosFiltrados(productos)
        console.log(productos)
        setFormFiltro({
          codigo: '',
          nombre: '',
          familia: '',
          precio: '',
          stock: '',
          activo: true
        })
      }

    useEffect(() => {
        obtenerProductos()
    }, [])

    useEffect(()=>{
      if(productos){
        const auxFamilias = productos.map(data => data.familia);
        
        let res = new Array();

        for (let i = 0; i < auxFamilias.length; i++) {
            if(!res.includes(auxFamilias[i])){
                res.push(auxFamilias[i]);
            }
        }
        setFamilias(res)
      }
    }, [productos])
    

    return (
      <div className="inventario">
        <h1 className="mb-0">Inventario</h1>
        <div>
            <button className='boton mantenedor__botones__agregar' onClick={abrirModalAgregarProducto}>Agregar producto</button>
        </div>
        <div className="inventario__tabla__filtros mb-3">
            <div className="inventario__tabla__filtros__primero">
                <div className="inventario__tabla__filtros__campos">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" name="codigo" id="codigo" className="form-control" value={formFiltro.codigo} onChange={handleInput} />
                </div>
                <div className="inventario__tabla__filtros__campos">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" className="form-control" value={formFiltro.nombre} onChange={handleInput} />
                </div>
                <div className="inventario__tabla__filtros__campos">
                    <label htmlFor="familia">Familia</label>
                    {/* <input type="text" name="familia" id="familia" className="form-control" value={formFiltro.familia} onChange={handleInput} /> */}
                    <select name="familia" className="form-select" onChange={handleInput} value={formFiltro.familia}>
                      <option value="" disabled>Seleccione...</option>
                      {
                        (familias && familias.length > 0) &&
                        familias.map((data)=>(
                          <option value={data} key={data}>{capitalizar(data)}</option>
                        ))
                      }
                    </select>
                </div>
            </div>
            <div className="inventario__tabla__filtros__segundo">
                
                
                <div className="inventario__tabla__filtros__campos">
                    <label htmlFor="activo">Activo</label>
                    <select name="activo" id="" className="form-select" value={formFiltro.activo} onChange={handleInput}>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div></div>
                <button className="boton-secundario" onClick={limpiarFiltros}>Limpiar</button>
                <button className="boton" onClick={filtrarProductos}>Filtrar</button>
            </div>
        </div>
        <div className="inventario__tabla">
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Familia</th>
                        <th scope="col">Subfamilia</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Act/Desc</th>
                        <th scope="col">Editar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        
                        productosFiltrados &&
                        productosFiltrados.map((data, i)=>(
                        <tr key={i}>
                            <th scope="row">{data.codigo}</th>
                            <td>{capitalizar(data.nombre)}</td>
                            <td>{capitalizar(data.familia)}</td>
                            <td>{capitalizar(data.subFamilia)}</td>
                            <td>{data.precioBruto}</td>
                            <td>{data.stock}</td>
                            {
                            data.foto == null ? (
                                <td>Sin foto</td>
                            ) : (
                                <td><a href={data.foto} target='_blank'>Ver Foto</a></td>
                            )
                            }
                            <td>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={data.vigente} onClick={() => productoVigenteToggle(data.idProducto)} />
                            </div>
                            </td>
                            <td><a onClick={()=>abrirModalProducto(data)}><EditarIcon clase="editar__icono" /></a></td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
        </div>
        <ModalEditarProducto showModalProducto={showModalProducto} setShowModalProducto={setShowModalProducto} cerrarModalProducto={cerrarModalProducto} producto={producto} />
        <ModalAgregarProducto showModalAgregarProducto={showModalAgregarProducto} setShowModalAgregarProducto={setShowModalAgregarProducto} cerrarModalAgregarProducto={cerrarModalAgregarProducto} />
      </div>

    )
  }
  