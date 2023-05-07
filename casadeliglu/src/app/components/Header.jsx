import { NavLink } from 'react-router-dom'
import { CarritoIcon } from '../../assets/Icons'
import logo from '../../assets/img/logo.webp'

export const Header = () => {

    const funn = (e) => {
        console.log(e.target.onmousemove);
    }

    const mostrarSubmenu = (submenu) => {
        const foco = document.querySelector(`.${submenu}`);

        foco.classList.remove('ocultar');
        
    }

    const ocultarSubmenu = (submenu) => {
        const foco = document.querySelector(`.${submenu}`);

        foco.classList.add('ocultar');
        
    }

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
                                <div onMouseOver={() => mostrarSubmenu('contenedor-subheader')} onMouseOut={() => ocultarSubmenu('contenedor-subheader')}>
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
            <div className='row contenedor-subheader ocultar'>
            <div className="col-1"></div>
                <div className="col-2">
                </div>
                <div className="col-8">
                    <div className="row" style={{height:'100%'}}>
                        <div className="col-3"></div>
                        <div className="col-9">
                        <div className='header__subMenu'>
                        <div></div>
                        <div className='header__subMenuProductos'>
                            <div className='header__subMenuProductos__maincat'>
                                <div onMouseOver={() => mostrarSubmenu('subcat__fiambres')} onMouseOut={() => ocultarSubmenu('subcat__fiambres')}><p>Fiambres</p></div>
                                <div onMouseOver={() => mostrarSubmenu('subcat__fruta')} onMouseOut={() => ocultarSubmenu('subcat__fruta')}><p>Fruta congelada</p></div>
                                <div onMouseOver={() => mostrarSubmenu('subcat__burgers')} onMouseOut={() => ocultarSubmenu('subcat__burgers')}><p>Hamburgeusas y nuggets</p></div>
                                <div onMouseOver={() => mostrarSubmenu('subcat__liquidos')} onMouseOut={() => ocultarSubmenu('subcat__liquidos')}><p>Líquidos</p></div>
                                <div onMouseOver={() => mostrarSubmenu('subcat__mariscos')} onMouseOut={() => ocultarSubmenu('subcat__mariscos')}><p>Mariscos y pescados</p></div>
                                <div onMouseOver={() => mostrarSubmenu('subcat__postres')} onMouseOut={() => ocultarSubmenu('subcat__postres')}><p>Postres</p></div>
                                <div onMouseOver={() => mostrarSubmenu('subcat__snacks')} onMouseOut={() => ocultarSubmenu('subcat__snacks')}><p>Snacks</p></div>
                                <div onMouseOver={() => mostrarSubmenu('subcat__verduras')} onMouseOut={() => ocultarSubmenu('subcat__verduras')}><p>Verdura congelada</p></div>
                            </div>
                            <div className='header__subMenuProductos__subcat'>
                                <div className='subcat__fiambres ocultar'>
                                    <div><p>Jamon</p></div>
                                </div>
                                <div className='subcat__fruta ocultar'>
                                    <div><p>pulpas</p></div>
                                    <div><p>Fruta en trozos</p></div>
                                </div>
                                <div className='subcat__burgers ocultar'>
                                    <div><p>Vacuno</p></div>
                                    <div><p>Pollo</p></div>
                                    <div><p>Vegetarianos</p></div>
                                </div>
                                <div className='subcat__liquidos ocultar'>
                                    <div><p>Bebidas</p></div>
                                    <div><p>Energéticas</p></div>
                                    <div><p>Aguas</p></div>
                                </div>
                                <div className='subcat__mariscos ocultar'>
                                    <div><p>Pescados</p></div>
                                    <div><p>Camarones</p></div>
                                    <div><p>Otros</p></div>
                                </div>
                                <div className='subcat__postres ocultar'>
                                    <div><p>Helados</p></div>
                                </div>
                                <div className='subcat__snacks ocultar'>
                                    <div><p>Arrollados</p></div>
                                    <div><p>Pizzas</p></div>
                                    <div><p>Empanadas</p></div>
                                    <div><p>Otros</p></div>
                                </div>
                                <div className='subcat__verduras ocultar'>
                                    <div><p>Papas</p></div>
                                </div>
                            </div>
                        </div>

                        <div></div>
                        
                        <div></div>
                        
                        <div></div>
                        
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
