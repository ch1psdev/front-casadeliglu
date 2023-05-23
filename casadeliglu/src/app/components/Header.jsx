import { NavLink } from 'react-router-dom'
import { CarritoIcon } from '../../assets/Icons'
import logo from '../../assets/img/logo.webp'

export const Header = () => {

  return (
    <>
        <div className="container-fluid header">
            <div className='row contenedor-header'>
                <div className="col-1 d-none d-lg-block"></div>
                <div className="col-2">
                    <img src={logo} alt="Logo tienda" className='header-logo' />
                </div>
                <div className="col-10 col-md-8">
                    <div className="row header__caja__menu" style={{height:'100%'}}>
                        <div className="col-3"></div>
                        <div className="col-9">
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
                                        <NavLink
                                            to="/" >
                                                <div>
                                                    <CarritoIcon />    
                                                </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    
                </div>
                <div className="col-1 d-none d-lg-block"></div>
            </div>
        </div>
    </>
  )
}
