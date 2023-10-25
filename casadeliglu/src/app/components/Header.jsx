import { NavLink, useNavigate } from 'react-router-dom'
import { CarritoIcon, LogoutIcon, MenuIcon, UserIcon } from '../../assets/Icons'
import { useState } from 'react';
import 'animate.css';
import iglu_header from '../../assets/img/iglu_header.png'
import { useRef } from 'react';
import { Login } from '../modules/auth/pages/Login';
import { Register } from '../modules/auth/pages/Register';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import { capitalizar } from '../helpers/textos';
import { logout } from '../store/auth/authSlice';
import { vaciarCarrito } from '../store/shop/shopSlice';
import { ModalCarrito } from './Pago/ModalCarrito';

export const Header = () => {

    const navigate = useNavigate();
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [familias, setFamilias] = useState();
    const [showModalCarrito, setShowModalCarrito] = useState(false)

    const dispatch = useDispatch()

    const usuario = useSelector( state => state.usuarioState);
    const productos = useSelector( state => state.productoState);
    
    const login = useRef();

    const handleCloseModalCarrito = () =>{
        setShowModalCarrito(false)
      }

    const onShowLogin = () => {
        login.current.classList.toggle('d-none');
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

    const irProductos = (data) => {
        navigate('/productos', {state: data})
    }

    const onCerrarSesion = async() => {
        dispatch(logout());
        dispatch(vaciarCarrito());
    }

    const onShowUser = () => {
        document.getElementById('cerrarSesion').classList.toggle('d-none')
    }
    
  return (
    <>
        {/*HEADER NUEVO*/}
        <div className='header'>
            <div className='header2__grilla'>
                <div></div>
                <div className='header2__grilla__contenido'>
                    <div className='header2__grilla__contenido__div'>
                        <img src={iglu_header} alt="" className='manito' onClick={() => navigate('/')} />
                    </div>
                    <div className='header2__grilla__contenido__div'>
                    <nav style={{height:'100%'}}>
                                <ul className='header__menu'>
                                    <li>
                                        <NavLink
                                            to="/inicio" 
                                            className={({isActive}) => `header__menu__item ${isActive ? 'header__menu--active' : 'header__menu--non-active'}`}>
                                                Inicio
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/productos" 
                                            className={({isActive}) => `header__menu__item ${isActive ? 'header__menu--active' : 'header__menu--non-active'}`}>
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

                                    <li>
                                        <NavLink
                                            to="/quienes-somos" 
                                            className={({isActive}) => `header__menu__item ${isActive ? 'header__menu--active' : 'header__menu--non-active'}`}>
                                                Nosotros
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/contacto" 
                                            className={({isActive}) => `header__menu__item ${isActive ? 'header__menu--active' : 'header__menu--non-active'}`}>
                                                Contacto
                                        </NavLink>
                                    </li>

                                    <li>
                                        <a className='manito nav__icon' onClick={() => setShowModalCarrito(!showModalCarrito)}>
                                                <div>
                                                    <CarritoIcon />    
                                                </div>
                                        </a>
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
                                                                <a onClick={onCerrarSesion}>Cerrar sesión</a>
                                                            </div>
                                                        </div>
                                                    </span>
                                                ):(
                                                    <>
                                                    <span>
                                                        <div onClick={() => onShowLogin()}>
                                                            <UserIcon />
                                                            <span className='nav__login__texto'>Log In</span>
                                                        </div>
                                                        <Login referencia={login} setMostrarRegistro={setMostrarRegistro} />
                                                        </span>
                                                    </>
                                                )
                                            }
                                            
                                    </li>
                                </ul>
                            </nav>
                    </div>
                </div>
                <div></div>
            </div>
        </div>

        {
            mostrarMenu &&
            <div className='menu__mobile animate__animated animate__fadeInRight animate__faster' id='menuMobile'>
                <div>Hamburguesas y nuggets</div>
                <div>Verduras</div>
                <div>Frutas y pulpas</div>
                <div>Veggan food</div>
                <div>Carnes</div>
                <div>Pescados y mariscos</div>
                <div>Pizzas y platos listos</div>
                <div>Conservas y salsas</div>
                <div>Masa, coocktail y snack</div>
                <div>Postres y bebidas</div>
            </div>
        }

        <Register pshow={mostrarRegistro} setMostrarRegistro={setMostrarRegistro} />
        
        <ModalCarrito showModalCarrito={showModalCarrito} handleCloseModalCarrito={handleCloseModalCarrito} />
    </>
  )
}
