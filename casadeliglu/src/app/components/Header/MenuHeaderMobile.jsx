import { useNavigate } from "react-router-dom"

export const MenuHeaderMobile = ({showMenuMobile, setShowMenuMobile}) => {

  const navigate = useNavigate();

  const onNavegar = (ruta) =>{
    navigate(ruta)
    setShowMenuMobile(false)
  }

  return (
    <>
        <div className="header__caja__menu__mobile d-md-none d-block">
          <ul>
            <li><a onClick={() => onNavegar('/inicio')}>Inicio</a></li>
            <li><a onClick={() => onNavegar('/productos')}>Productos</a></li>
            <li><a onClick={() => onNavegar('/quienes-somos')}> Nosotros</a></li>
            <li><a onClick={() => onNavegar('/contacto')}>Contacto</a></li>
          </ul>
        </div>
    </>
  )
}
