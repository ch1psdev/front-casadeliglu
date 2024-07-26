import { NavLink, useNavigate } from "react-router-dom"

export const MenuToggle = () => {

    const navigate = useNavigate();
    
  return (
    <div className='menutoggle'>
        <div className="menutoggle__title">
            Panel administrativo
        </div>
        <div className="menutoggle__usuario">
            <p>Nombre usuario</p>
            <p>Correo usuario</p>
        </div>
        <div className="menutoggle__menu">
            <NavLink to={'/panel2/inventario'} className={({isActive})=>isActive?'menutoggle__menu__activo':''}>Inventario</NavLink>
            <NavLink to={'/panel2/ventas'} className={({isActive})=>isActive?'menutoggle__menu__activo':''}>Ventas</NavLink>
        </div>
        <div className="menutoggle__accesos">
            <button className='boton-secundario mantenedor__botones__volver' onClick={()=>navigate('/')}>Ir al sitio</button>
        </div>
    </div>
  )
}
