import { capitalizar } from "../../helpers/textos";
import { useEffect, useState } from "react";
import { getMenuProductsService } from "../../services/productos/productoService";
import { filtrarProductosSubFamilia } from "../../store/product/productSilce";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const MenuHeaderDesktop = () => {

    const [menu, setMenu] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mapFamilias = () =>{
        const familias = (menu.map( data => data.Familia));
        
        let res = new Array();

        for (let i = 0; i < familias.length; i++) {
            if(!res.includes(familias[i])){
                res.push(familias[i]);
            }
        }

        return res;
    }

    const obtenerSubFamilias = (produs) =>{
        const subfamilias = (menu.filter(data => data.Familia == produs))
        let res = new Array();

        for (let i = 0; i < subfamilias[0].Subfamilias.length; i++) {
            if(!res.includes(subfamilias[0].Subfamilias[i].Subfamilia) && subfamilias[0].Subfamilias[i].Subfamilia != '' && subfamilias[0].Subfamilias[i].Subfamilia != null){
                res.push(subfamilias[0].Subfamilias[i].Subfamilia);
            }
        }
        return res;
    }

    const filtrarProductosSubFamilias = (familia, subFamilia) =>{
        dispatch(filtrarProductosSubFamilia({familia, subFamilia}))
        navigate('/productos')
    }

    useEffect(() => {
      const res = getMenuProductsService().then((data)=>{
        console.log(JSON.parse(data).Familias)
        setMenu(JSON.parse(data).Familias)
    })
    }, [])
    

  return (
    <>
        <div className="header__productos">
            <ul className="header__productos__lista">
            {
                menu.length > 0 &&
                mapFamilias(menu).map((data,i)=>(
                    
                    <li key={i} className="header__productos__lista__familia">
                        <a className='manito' onClick={() =>filtrarProductosSubFamilias(data, '')} >
                            {capitalizar(data)}
                        </a>
                        {
                            obtenerSubFamilias(data).length > 0 &&
                                <ul className="header__productos__lista__familia__subfamilia">
                                    {
                                        obtenerSubFamilias(data).map((data2, i)=>(
                                            data2 != null && <li key={i} onClick={() =>filtrarProductosSubFamilias(data, data2)}>{capitalizar(data2)}</li>
                                        ))
                                    }
                                </ul>
                        }
                    </li>
                ))
            }
            </ul>
        </div>
    </>
  )
}
