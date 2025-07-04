import { useEffect, useState } from "react"
import { getProductosService } from "../services/productos/productoService"
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";

export const useProductos = () => {

    const [listaProductos, setListaProductos] = useState([])
    const [ familias, setFamilias ] = useState([])
    const [subFamilias, setSubFamilias] = useState([])
    const [productos, setProductos] = useState([])

    const { filtro } = useSelector( state => state.productoState)

    const obtenerProductos = async() => {
        getProductosService().then((data) => {

            setProductos(data.data);
    
            //Estos filtros aplican cuando salta desde el home hacia productos
            if(filtro.familia){
                 setListaProductos(data.data.filter(p => p.familia == filtro.familia))
                if(filtro.subFamilia){
                    setListaProductos(data.data.filter(p => p.subFamilia == filtro.subFamilia))
                }
            }else{
            
                setListaProductos(data.data)
            }

            data.data.length > 0 && obtenerFamilias(data.data);

        }).catch((error) => {
            Swal.fire({
                title: 'Hubo un error al intentar obtener los productos, por favor inténtelo más tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
        })

    }

    //Obtiene todas las familias de los productos y las guarda en familias sin repetirse
    const obtenerFamilias = (productos) => {
        const auxFamilias = productos.map(data => data.familia);
        const res = Array.from(new Set(auxFamilias));
        setFamilias(res)
    }

    //Fitra los productos por Familia de productos
    const filtrarProductosPorFamilia = (familia) => {
        console.log(familia)
        setListaProductos(productos.filter(p => p.familia == familia))
    }

    //Filtra los productos por nombre de producto
    const filtrarPorNombre = (nombreProducto = '') => {
        setListaProductos(productos.filter(p => p.nombre.includes(nombreProducto)))
        console.log(productos)
        console.log(nombreProducto)
    }

    const quitarFiltroPorCategoria = () => {
        obtenerProductos()
        console.log(productos)
        setListaProductos(productos);
    }

    const obtenerSubFamilias = (familia) => {
        const subfamilias = (productos.filter(data => data.familia == familia))
        
        let res = new Array();

        for (let i = 0; i < subfamilias.length; i++) {
            if(!res.includes(subfamilias[i].subFamilia) && subfamilias[i].subFamilia != '' && subfamilias[i].subFamilia != null){
                res.push(subfamilias[i].subFamilia);
            }
        }

    setSubFamilias(res);
    }

    const filtrarProductosPorSubFamilia = (sub) => {
        setListaProductos(productos.filter(p => p.subFamilia == sub))
    }

    const ordenarPrecioDesc = () => {

        let prods = listaProductos

        for (let i = 0; i < prods.length -1; i++) {
            for(let j = 0; j < prods.length -1 -i; j++){
                if(prods[j].precioBruto < prods[j+1].precioBruto){
                    const aux = prods[j];
                    prods[j] = prods[j+1];
                    prods[j+1] = aux;
                }
            }
        }

        setListaProductos(prods)
    } 

    const ordenarPrecioAsc = () => {

        let prods = listaProductos

        for (let i = 0; i < prods.length -1; i++) {
            for(let j = 0; j < prods.length -1 -i; j++){
                if(prods[j].precioBruto > prods[j+1].precioBruto){
                    const aux = prods[j];
                    prods[j] = prods[j+1];
                    prods[j+1] = aux;
                }
            }
        }
        setListaProductos(prods)
    }

    useEffect(() => {
      obtenerProductos()
    }, [])

    useEffect(() => {
        filtro.familia && setListaProductos(productos.filter(p => p.familia == filtro.familia))
        filtro.subFamilia && setListaProductos(productos.filter(p => p.subFamilia == filtro.subFamilia))
    }, [filtro])
    

    return[
        listaProductos,
        filtrarProductosPorFamilia,
        filtrarPorNombre,
        familias,
        ordenarPrecioDesc,
        ordenarPrecioAsc,
        quitarFiltroPorCategoria,
        obtenerSubFamilias,
        subFamilias,
        filtrarProductosPorSubFamilia
    ]

}