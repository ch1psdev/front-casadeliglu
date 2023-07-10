import { NavLink, useNavigate } from 'react-router-dom'
import { CarritoIcon, MenuIcon } from '../../assets/Icons'
import logo from '../../assets/img/logo.webp'
import { useState } from 'react';
import 'animate.css';
import iglu_header from '../../assets/img/iglu_header.png'
import { PanelCarrito } from './panelCarrito';

export const Header = () => {

    const navigate = useNavigate();
    const [mostrarMenu, setmostrarMenu] = useState(false);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);


  return (
    <>
        {/*HEADER NUEVO*/}
        <div className='header'>
            <div className='header2__grilla'>
                <div></div>
                <div className='header2__grilla__contenido'>
                    <div>
                        <img src={iglu_header} alt="" className='manito' onClick={() => navigate('/')} />
                    </div>
                    <div>
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
                                            <li>
                                                <NavLink
                                                    to="/productos"
                                                    className=''>
                                                        Fiambres
                                                </NavLink>
                                                <ul>
                                                    <li>
                                                    <NavLink
                                                        to="/productos" 
                                                        className=''>
                                                            Jamón
                                                    </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/productos" 
                                                    className=''>
                                                        Fruta congelada
                                                </NavLink>
                                                <ul>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Pulpas
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Fruta en trozos
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/productos" 
                                                    className=''>
                                                        Hamburguesas y nuggets
                                                </NavLink>
                                                <ul>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Vacuno
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Pollo
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Vegetarianos
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/productos" 
                                                    className=''>
                                                        Líquidos
                                                </NavLink>
                                                <ul>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Bebidas
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Energéticas
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Aguas
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/productos" 
                                                    className=''>
                                                        Mariscos y pescados
                                                </NavLink>
                                                <ul>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Pescados
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Camarones
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Otros
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/productos" 
                                                    className=''>
                                                        Postres
                                                </NavLink>
                                                <ul>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Helados
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/productos" 
                                                    className=''>
                                                        Snacks
                                                </NavLink>
                                                <ul>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Arrollados
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Pizzas
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Empanadas
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Otros
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/productos" 
                                                    className=''>
                                                        Verdura congelada
                                                </NavLink>
                                                <ul>
                                                    <li>
                                                        <NavLink
                                                            to="/productos" 
                                                            className=''>
                                                                Papas
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/quienes-somos" 
                                            className={({isActive}) => `header__menu__item ${isActive ? 'header__menu--active' : 'header__menu--non-active'}`}>
                                                ¿Quiénes somos?
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
                                        <a className='manito' onClick={() => setMostrarCarrito(!mostrarCarrito)}>
                                                <div>
                                                    <CarritoIcon />    
                                                </div>
                                        </a>
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
        
    </>
  )
}
