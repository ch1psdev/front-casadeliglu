import { NavLink } from 'react-router-dom'
import { CarritoIcon } from '../../assets/Icons'
import logo from '../../assets/img/logo.webp'

export const Header = () => {
  return (
    <>
        <div className="container-fluid">
            <div className='row contenedor-header'>
                <div className="col-1"></div>
                <div className="col-2">
                    <img src={logo} alt="Logo tienda" className='header-logo' />
                </div>
                <div className="col-8">
                    <div className="row" style={{height:'100%'}}>
                        <div className="col-3"></div>
                        <div className="col-9">
                        <div className='header__menu'>
                        <NavLink
                            to="/inicio" 
                            className={({isActive}) => `header__menu__item ${isActive ? 'header__menu--active' : 'header__menu--non-active'}`}>
                                <div>
                                    Inicio
                                </div>
                        </NavLink>

                        <NavLink
                            to="/productos" 
                            className={({isActive}) => `header__menu__item ${isActive ? 'header__menu--active' : 'header__menu--non-active'}`}>
                                <div>
                                    Productos
                                </div>
                        </NavLink>

                        <NavLink
                            to="/quienes-somos" 
                            className={({isActive}) => `header__menu__item ${isActive ? 'header__menu--active' : 'header__menu--non-active'}`}>
                                <div>
                                    ¿Quiénes <br/>somos?
                                </div>
                        </NavLink>
                        
                        <NavLink
                            to="/contacto" 
                            className={({isActive}) => `header__menu__item ${isActive ? 'header__menu--active' : 'header__menu--non-active'}`}>
                                <div>
                                    Contacto    
                                </div>
                        </NavLink>
                        
                        <NavLink
                            to="/" >
                                <div>
                                    <CarritoIcon />    
                                </div>
                        </NavLink>
                        
                    </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    </>
  )
}
