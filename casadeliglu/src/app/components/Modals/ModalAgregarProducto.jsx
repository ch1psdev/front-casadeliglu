import { createRef, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import { siteKey } from "../../../config/config";
import { postAddProductoService, postUpdateProductoService } from "../../services/mantenedor/mantenedorService";
import Swal from 'sweetalert2';

export const ModalAgregarProducto = ({showModalAgregarProducto, setShowModalAgregarProducto, cerrarModalAgregarProducto}) => {

    const token = useSelector(state => state.usuarioState.token);
    const recaptchaRef = createRef();

    const [formProducto, setFormProducto] = useState({
        codigo: '',
        nombre: '',
        familia: '',
        subFamilia: '',
        precioBruto: '',
        stock: '',
        foto: ''
    })
    const [fotoProducto, setFotoProducto] = useState(null);

    const handleInput = (e) => {

        setFormProducto({
            ...formProducto,
            [e.target.name]: e.target.value
        })
    }

    const handleFoto = (e) => {

        if(e.target.files.length>0){
            if(e.target.files[0].type == 'image/webp'){

                setFotoProducto(e.target.files[0])
            }else{
                e.target.value = ''
                Swal.fire({
                    title: 'Recuerda que la imagen debe tener un formato WEBP',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0C2695'
                  })
                return
            }
        }
    }
    

    const agregarProducto = async(e) => {
        e.preventDefault()
        const tokenCaptcha = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        if(!tokenCaptcha){
            Swal.fire({
                title: 'No se ha podido validar el captcha',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0C2695'
              })
            //   setLoader(false);
        return
        }

        let inputProducto = formProducto;
        inputProducto.captcha = tokenCaptcha;

        if(fotoProducto != null){
            const reader = new FileReader();
            reader.readAsDataURL(fotoProducto);
            reader.onloadend = async () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                
                inputProducto.foto = {
                    fileName: fotoProducto.name,
                    fileType: fotoProducto.type,
                    fileContent: base64String
                }
                
                await postAddProductoService(token, inputProducto);
            }
        }else{
            inputProducto.foto = null
            await postAddProductoService(token, inputProducto);
        }

        
        
        cerrarModalAgregarProducto();
    }

    useEffect(() => {
        setFormProducto({
            codigo: '',
            nombre: '',
            familia: '',
            subFamilia: '',
            precioBruto: '',
            stock: '',
            foto: ''
        })
        setFotoProducto(null)
    }, [])
    
    
  return (
    <>
        <Modal show={showModalAgregarProducto} onHide={cerrarModalAgregarProducto} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='contenedor__login' onSubmit={agregarProducto}>
                <h2 className='contenedor__login__titulo'>Ingresa los datos del producto que quieres agregar</h2>
                <div className="mantenedor__agregarProducto__contenido">
                    <div className="mantenedor__agregarProducto__contenido__primero">
                        <div className='form-group mantenedor__agregarProducto__contenido__campos'>
                            <label htmlFor="codigo" className='contenedor__login__group__texto'>Código</label>
                            <input 
                                name="codigo" 
                                type="text" 
                                className='contenedor__login__group__campo form-control'
                                value={formProducto?.codigo} 
                                onChange={handleInput}  
                            />
                            {/* <span className={`${errorCorreo ? 'd-block' : 'd-none'} spanInput`}>El correo ingresado no es válido</span> */}
                        </div>

                        <div className='form-group mantenedor__agregarProducto__contenido__campos'>
                            <label htmlFor="nombre" className='contenedor__login__group__texto'>Nombre</label>
                            <input 
                                name="nombre" 
                                type="text" 
                                className='contenedor__login__group__campo form-control'
                                value={formProducto?.nombre} 
                                onChange={handleInput}  
                            />
                            {/* <span className={`${errorCorreo ? 'd-block' : 'd-none'} spanInput`}>El correo ingresado no es válido</span> */}
                        </div>

                        <div className='form-group mantenedor__agregarProducto__contenido__campos'>
                            <label htmlFor="familia" className='contenedor__login__group__texto'>Familia</label>
                            <input 
                                name='familia' 
                                type='text' 
                                className='contenedor__login__group__campo form-control'
                                value={formProducto?.familia} 
                                onChange={handleInput}  
                            />
                        </div>
                        {/* <span className={`${errorPass ? 'd-block' : 'd-none'} spanInput`}>La contraseña ingresada no es válida</span> */}

                        <div className='form-group mantenedor__agregarProducto__contenido__campos'>
                            <label htmlFor="subFamilia" className='contenedor__login__group__texto'>Sub-familia</label>
                            <input 
                                name='subFamilia' 
                                type='text' 
                                className='contenedor__login__group__campo form-control'
                                value={formProducto?.subFamilia} 
                                onChange={handleInput}  
                            />
                        </div>
                        {/* <span className={`${errorPass ? 'd-block' : 'd-none'} spanInput`}>La contraseña ingresada no es válida</span> */}
                    </div>

                    <div className="mantenedor__agregarProducto__contenido__segundo">
                        <div className='form-group mantenedor__agregarProducto__contenido__campos'>
                            <label htmlFor="precioBruto" className='contenedor__login__group__texto'>Precio</label>
                            <input 
                                name='precioBruto' 
                                type='text' 
                                className='contenedor__login__group__campo form-control'
                                value={formProducto?.precioBruto} 
                                onChange={handleInput}  
                            />
                        </div>
                        {/* <span className={`${errorPass ? 'd-block' : 'd-none'} spanInput`}>La contraseña ingresada no es válida</span> */}

                        <div className='form-group mantenedor__agregarProducto__contenido__campos'>
                            <label htmlFor="stock" className='contenedor__login__group__texto'>Stock</label>
                            <input 
                                name='stock' 
                                type='text' 
                                className='contenedor__login__group__campo form-control'
                                value={formProducto?.stock} 
                                onChange={handleInput}  
                            />
                        </div>

                        <div className='form-group mantenedor__agregarProducto__contenido__campos'>
                            <label htmlFor="foto" className='contenedor__login__group__texto'>Foto</label>
                            <input 
                                name='foto' 
                                type='file' 
                                className='contenedor__login__group__campo form-control'
                                onChange={handleFoto}  
                            />
                        </div>
                    </div>
                </div>
                
                
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={siteKey}
                />

                <button type="submit" className='contenedor__login__button boton'>Guardar</button>
                <button type="button" className='contenedor__login__button boton'>Cancelar</button>
            </form>
            
        </Modal.Body>
      </Modal>
    </>
  )
}