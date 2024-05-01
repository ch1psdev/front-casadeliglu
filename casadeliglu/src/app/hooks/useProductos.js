import { useEffect, useState } from "react"
import { getProductosService } from "../services/productos/productoService"
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";

export const useProductos = () => {

    const [listaProductos, setListaProductos] = useState([])
    const [ familias, setFamilias ] = useState([])
    const [productos, setProductos] = useState([])

    const location = useLocation();

    const obtenerProductos = async() => {
        getProductosService().then((data) => {

            setProductos(data.data);
    
            if(location.state?.categoria){
                setListaProductos(data.data.filter(p => p.familia == location.state?.categoria))
            }else if(location.state?.nombreProducto){
                setListaProductos(data.data.filter(p => p.nombre.toLowerCase().includes((location.state?.nombreProducto).toLowerCase())))
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
        
        let res = new Array();

        for (let i = 0; i < auxFamilias.length; i++) {
            if(!res.includes(auxFamilias[i])){
                res.push(auxFamilias[i]);
            }
        }

        setFamilias(res)
    }

    //Fitra los productos por Familia de productos
    const filtrarProductosPorFamilia = (familia) => {
        setListaProductos(productos.filter(p => p.familia == familia))
    }

    //Filtra los productos por nombre de producto
    const filtrarPorNombre = (nombreProducto = '') => {
        setListaProductos(productos.filter(p => p.nombre.includes(nombreProducto)))
    }

    const quitarFiltroPorCategoria = () => {
        obtenerProductos()
        console.log(productos)
        setListaProductos(productos);
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
    

    return[
        listaProductos,
        filtrarProductosPorFamilia,
        filtrarPorNombre,
        familias,
        ordenarPrecioDesc,
        ordenarPrecioAsc,
        quitarFiltroPorCategoria
    ]

}