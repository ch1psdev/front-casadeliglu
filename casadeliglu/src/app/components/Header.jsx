import { useNavigate } from 'react-router-dom'
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
import { CarritoIcon, MenuIcon } from '../../assets/Icons';
import { Login } from '../modules/auth/pages/Login';

export const Header = ({handleModalCarrito}) => {

    const navigate = useNavigate();
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showModalLogin, setShowModalLogin] = useState(false);

    const usuario = useSelector( state => state.usuarioState);
    // const productos = useSelector( state => state.productoState);
    
    const login = useRef();

    const handleCloseModalCarrito = () =>{
        setShowModalCarrito(false)
      }

    const handleCloseLogin = () =>{
        setShowModalLogin(false);
    }

    const onShowLogin = () => {
        login.current.classList.toggle('d-none');
    }

    const irProductos = (data) => {
        navigate('/productos', {state: data})
    }
    
  return (
    <>
        {/*HEADER NUEVO*/}
        <div className='header'>
            <div className='header__caja'>
                <div></div>
                <div className='header__caja__contenido'>
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
