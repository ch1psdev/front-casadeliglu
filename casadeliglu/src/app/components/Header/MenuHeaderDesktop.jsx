import { NavLink } from "react-router-dom"
import { CarritoIcon, LogoutIcon, UserIcon } from "../../../assets/Icons"
import { useDispatch, useSelector } from "react-redux";
import { capitalizar } from "../../helpers/textos";
import { logout } from "../../store/auth/authSlice";
import { vaciarCarrito } from "../../store/shop/shopSlice";
import { ToastContainer, toast } from "react-toastify";

export const MenuHeaderDesktop = ({handleModalCarrito, irProductos, setShowModalLogin}) => {

    const productos = useSelector( state => state.productoState);
    const usuario = useSelector( state => state.usuarioState);

    const dispatch = useDispatch()

    const notify = (texto) => {
        toast.success(texto, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const mapFamilias = (arr) =>{
        const familias = (productos.data.map( data => data.familia));
        let res = new Array();

        for (let i = 0; i < familias.length; i++) {
            if(!res.includes(familias[i])){
                res.push(familias[i]);
            }
        }

        return res;
    }

    const onShowUser = () => {
        document.getElementById('cerrarSesion').classList.toggle('d-none')
    }

    const onCerrarSesion = async() => {
        dispatch(logout());
        dispatch(vaciarCarrito());
        notify('Sesión finalizada!')
    }

  return (
    <>
        <nav className="header__caja__menu__desktop">
            <ul className='header__caja__menu__desktop__lista'>
                <li className="header__caja__menu__desktop__lista__item">
                    <NavLink
                        to="/inicio" 
                        className={({isActive}) => `${isActive ? 'header__caja__menu__desktop__lista__item__active' : ''}`}>
                            Inicio
                    </NavLink>
                </li>

                <li className="header__caja__menu__desktop__lista__item">
                    <NavLink
                        to="/productos" 
                        className={({isActive}) => `${isActive ? 'header__caja__menu__desktop__lista__item__active' : ''}`}>
                            Productos
                    </NavLink>
                    <ul>
                        {
                            productos.data.length > 0 &&
                            mapFamilias(productos.data).map((data,i)=>(
                                <a className='manito' onClick={() =>irProductos(data)} key={i}>
                                    {capitalizar(data)}
                                </a>
                            ))
                        }
                    </ul>
                </li>

                <li className="header__caja__menu__desktop__lista__item">
                    <NavLink
                        to="/quienes-somos" 
                        className={({isActive}) => ` ${isActive ? 'header__caja__menu__desktop__lista__item__active' : ''}`}>
                            Nosotros
                    </NavLink>
                </li>

                <li className="header__caja__menu__desktop__lista__item">
                    <NavLink
                        to="/contacto" 
                        className={({isActive}) => `header__caja__menu__item ${isActive ? 'header__caja__menu__desktop__lista__item__active' : ''}`}>
                            Contacto
                    </NavLink>
                </li>
                
                <li className='nav__login'>
                    {
                        usuario.status == 'identificado' ? (
                            <span style={{cursor:'initial'}}>
                                    <div onClick={() => onShowUser()} className='manito'>
                                        <UserIcon />
                                        <span className='nav__login__texto manito'>Hola {usuario.info.nombre}!</span>
                                    </div>
                                    <div className='contenedor__logout d-none' id='cerrarSesion'>
                                        <div className='manito contenedor__logout__contenido'>
                                            <LogoutIcon />
                                            <a onClick={() => onCerrarSesion()}>Cerrar sesión</a>
                                        </div>
                                    </div>
                                </span>
                        ):(
                            <>
                                <span>
                                    <div onClick={() => setShowModalLogin(true)}>
                                        <UserIcon />
                                        <span className='nav__login__texto'>Log In</span>
                                    </div>
                                </span>
                            </>
                        )
                    }   
                </li>

                <li className="header__caja__menu__desktop__lista__icon">
                    <a className='manito' onClick={handleModalCarrito}>
                            <div>
                                <CarritoIcon />    
                            </div>
                    </a>
                </li>
            </ul>
        </nav>
    </>
  )
}
