import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import 'animate.css';
import iglu_header from '../../assets/img/iglu_header.png'
import { useRef } from 'react';
import { Register } from '../modules/auth/pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import { logout } from '../store/auth/authSlice';
import { vaciarCarrito } from '../store/shop/shopSlice';
import { MenuHeaderDesktop } from './Header/MenuHeaderDesktop';
import { MenuHeaderMobile } from './Header/MenuHeaderMobile';
import { CarritoIcon, LogoutIcon, MenuIcon, UserIcon } from '../../assets/Icons';
import { Login } from '../modules/auth/pages/Login';
import { toast } from "react-toastify";

export const Header = ({handleModalCarrito}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showModalLogin, setShowModalLogin] = useState(false);

    const usuario = useSelector( state => state.usuarioState);
    
    const login = useRef();

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

    const handleCloseLogin = () =>{
        setShowModalLogin(false);
    }

    const irProductos = (data) => {
        navigate('/productos', {state: data})
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
        {/*HEADER NUEVO*/}
        <div className='header'>
            <div className='header__caja'>
                <div></div>
                <div className='header__caja__contenido'>
                    <div className='header__caja__contenido__menu'>

                        <nav className="header__caja__contenido__menu__desktop">
                            <ul className='header__caja__contenido__menu__desktop__lista'>
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
                        <MenuHeaderDesktop handleModalCarrito={handleModalCarrito} irProductos={irProductos} setShowModalLogin={setShowModalLogin} />
                        <div className='header__caja__contenido__menus__mobile d-grid d-md-none'>
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
        <Login show={showModalLogin} handleCloseLogin={handleCloseLogin} />
        
        {
            showMenuMobile && <MenuHeaderMobile showMenuMobile={showMenuMobile} setShowMenuMobile={setShowMenuMobile} />
        }
        
    </>
  )
}
