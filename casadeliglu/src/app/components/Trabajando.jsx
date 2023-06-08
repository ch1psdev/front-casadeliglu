import { useNavigate } from 'react-router-dom'
import iglu_working from '../../assets/img/iglu_working.png'

export const Trabajando = () => {
    const navigate = useNavigate()
  return (
    <>
        <div className="caja__trabajando">
            <img src={iglu_working} alt="" />
            <h1>
                Estamos trabajando en un hermoso sitio!
            </h1>
            <a onClick={() => navigate('/login')} className='manito'>Soy admin</a>
        </div>
    </>
  )
}
