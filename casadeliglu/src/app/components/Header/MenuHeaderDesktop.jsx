import { useSelector } from "react-redux";
import { capitalizar } from "../../helpers/textos";

export const MenuHeaderDesktop = ({irProductos}) => {

    const productos = useSelector( state => state.productoState);

    const mapFamilias = () =>{
        const familias = (productos.data.map( data => data.familia));
        
        let res = new Array();

        for (let i = 0; i < familias.length; i++) {
            if(!res.includes(familias[i])){
                res.push(familias[i]);
            }
        }

        return res;
    }

    const obtenerSubFamilias = (produs) =>{
        const subfamilias = (productos.data.filter(data => data.familia == produs))

        let res = new Array();

        for (let i = 0; i < subfamilias.length; i++) {
            if((!res.includes(subfamilias[i].subFamilia)) && subfamilias[i].subFamilia != 'none' && subfamilias[i].subFamilia != ''){
                res.push(subfamilias[i].subFamilia);
            }
        }

        return res;
    }

  return (
    <>
        <div className="header__productos">
            <ul className="header__productos__lista">
            {
                productos.data.length > 0 &&
                mapFamilias(productos.data).map((data,i)=>(
                    
                    <li key={i} className="header__productos__lista__familia">
                        <a className='manito' onClick={() =>irProductos(data)} >
                            {capitalizar(data)}
                        </a>
                        {
                            obtenerSubFamilias(data).length > 0 &&
                                <ul className="header__productos__lista__familia__subfamilia">
                                    {
                                        obtenerSubFamilias(data).map((data2, i)=>(
                                            <li key={i}>{capitalizar(data2)}</li>
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
