import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import 'animate.css';
import iglu_header from '../../assets/img/iglu_header.png'
import { Register } from '../modules/auth/pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import { vaciarCarrito } from '../store/shop/shopSlice';
import { MenuHeaderDesktop } from './Header/MenuHeaderDesktop';
import { MenuHeaderMobile } from './Header/MenuHeaderMobile';
import { CarritoIcon, LogoutIcon, LupaIcon, MenuIcon, UserIcon } from '../../assets/Icons';
import { Login } from '../modules/auth/pages/Login';
import { toast } from "react-toastify";
import { limpiarFiltro } from '../store/product/productSilce';

export const Header = ({handleModalCarrito}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [buscador, setBuscador] = useState();
    const [contadorProductos, setContadorProductos] = useState(0);

    const usuario = useSelector( state => state.usuarioState);
    const { products } = useSelector((state) => state.carritoState);

    const notify = (texto) => {
        toast.success(texto, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleCloseLogin = () =>{
        setShowModalLogin(false);
    }

    const irProductosPorNombre = (data) => {
        navigate('/productos', {state: {nombreProducto: data.producto}})
    }

    const onShowUser = () => {
        document.getElementById('cerrarSesion').classList.toggle('d-none')
    }

    const onCerrarSesion = async() => {
        dispatch(logout());
        dispatch(vaciarCarrito());
        notify('Sesión finalizada!')
    }

    const onChangeBuscador = (event) =>{
        setBuscador(event.target.value);
    }

    const irRegistro = () => {
        setShowModalLogin(false);
        setMostrarRegistro(true);
    }

    const calcularContadorProductos = () =>{
        let contador = 0

        for (let i = 0; i < products.length; i++) {
            contador = contador + products[i].cantidad
        }

        setContadorProductos(contador);
    }
    
    useEffect(() => {
        calcularContadorProductos()
    }, [products])
    

  return (
    <>
        {/*HEADER NUEVO*/}
        <div className='header'>
            <div className='header__caja'>
                <div></div>
                <div className='header__caja__contenido'>
                    <div className='header__caja__contenido__menu'>

                        <nav className="header__caja__contenido__menu__desktop">
                            <ul className='header__caja__contenido__menu__desktop__lista'>
                            {
                                (usuario.status == 'identificado' && usuario.token && usuario.info.rol < 3) &&
                                <li className="header__caja__contenido__menu__desktop__lista__item">
                                    <NavLink
                                        to="/panel" 
                                        className={({isActive}) => `${isActive ? 'header__caja__menu__desktop__lista__item__active' : ''}`}>
                                            Panel
                                    </NavLink>
                                </li>
                            }
                                

                                <li className="header__caja__contenido__menu__desktop__lista__item">
                                    <input type="text" onChange={onChangeBuscador} placeholder='Buscar...' />
                                    <button onClick={() =>irProductosPorNombre({producto:buscador})}><LupaIcon/></button>
                                </li>

                                <li className="header__caja__contenido__menu__desktop__lista__item">
                                    <NavLink
                                        to="/productos" 
                                        onClick={()=>dispatch(limpiarFiltro())}
                                        className={({isActive}) => `${isActive ? 'header__caja__menu__desktop__lista__item__active' : ''}`}>
                                            Productos
                                    </NavLink>
                                </li>

                                <li className="header__caja__contenido__menu__desktop__lista__item">
                                    <NavLink
                                        to="/inicio" 
                                        className={({isActive}) => `${isActive ? 'header__caja__menu__desktop__lista__item__active' : ''}`}>
                                            Inicio
                                    </NavLink>
                                </li>

                                <li className="header__caja__contenido__menu__desktop__lista__item">
                                    <NavLink
                                        to="/quienes-somos" 
                                        className={({isActive}) => ` ${isActive ? 'header__caja__menu__desktop__lista__item__active' : ''}`}>
                                            Nosotros
                                    </NavLink>
                                </li>

                                <li className="header__caja__contenido__menu__desktop__lista__item">
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
                                                            <a onClick={() => navigate('/mi-perfil')}>Mi perfil</a>
                                                        </div>
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
                                    <div className='header__caja__menu__desktop__lista__icon__contador'>{contadorProductos}</div>
                                    <a className='manito' onClick={handleModalCarrito}>
                                            <div>
                                                <CarritoIcon />    
                                            </div>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                    </div>
                    <div className='header__caja__contenido__img'>
                        <img src={iglu_header} alt="" className='manito' onClick={() => navigate('/')} />
                    </div>
                    <div className='header2__grilla__contenido__div header__caja__contenido__menus'>
                        <MenuHeaderDesktop handleModalCarrito={handleModalCarrito} setShowModalLogin={setShowModalLogin} />
                        <div className='header__caja__contenido__menus__mobile d-grid d-md-none'>
                            <div className='header__caja__menu__desktop__lista__icon__contador'>{contadorProductos}</div>
                            <a onClick={()=>handleModalCarrito()}>
                                <CarritoIcon />
                            </a>
                            <a onClick={()=>setShowMenuMobile(!showMenuMobile)}>
                                <MenuIcon />
                            </a>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>

        <Register pshow={mostrarRegistro} setMostrarRegistro={setMostrarRegistro} />
        <Login show={showModalLogin} handleCloseLogin={handleCloseLogin} irRegistro={irRegistro} />
        
        {
            showMenuMobile && <MenuHeaderMobile showMenuMobile={showMenuMobile} setShowMenuMobile={setShowMenuMobile} />
        }
        
    </>
  )
}
