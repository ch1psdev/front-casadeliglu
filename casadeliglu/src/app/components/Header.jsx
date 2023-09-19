import { NavLink, useNavigate } from 'react-router-dom'
import { CarritoIcon, MenuIcon, UserIcon } from '../../assets/Icons'
import { useState } from 'react';
import 'animate.css';
import iglu_header from '../../assets/img/iglu_header.png'
import { PanelCarrito } from './panelCarrito';
import { useRef } from 'react';
import { Login } from '../modules/auth/pages/Login';
import { Register } from '../modules/auth/pages/Register';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import { capitalizar } from '../helpers/textos';

export const Header = () => {

    const navigate = useNavigate();
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [familias, setFamilias] = useState();

    const usuario = useSelector( state => state.usuarioState);
    const productos = useSelector( state => state.productoState);
    
    const login = useRef();

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
                                        <a className='manito nav__icon' onClick={() => setMostrarCarrito(!mostrarCarrito)}>
                                                <div>
                                                    <CarritoIcon />    
                                                </div>
                                        </a>
                                    </li>
                                    <li className='nav__login'>
                                        
                                            {
                                                usuario.status == 'identificado' ? (
                                                    <span style={{cursor:'initial'}}>
                                                        <div>
                                                            <UserIcon />
                                                            <span className='nav__login__texto' style={{cursor:'initial'}}>Hola {usuario.info.nombre}!</span>
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
            mostrarCarrito &&
                <PanelCarrito setMostrarCarrito={setMostrarCarrito} mostrarCarrito={mostrarCarrito} />
        }
        

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
        
        
    </>
  )
}
