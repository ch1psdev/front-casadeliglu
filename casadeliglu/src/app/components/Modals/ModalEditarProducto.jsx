import { createRef, useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import ReCAPTCHA from "react-google-recaptcha";
import { siteKey } from "../../../config/config";
import { postUpdateProductoService } from "../../services/mantenedor/mantenedorService";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

export const ModalEditarProducto = ({showModalProducto, setShowModalProducto, cerrarModalProducto, producto}) => {

    const token = useSelector(state => state.usuarioState.token);
    const recaptchaRef = createRef();

    const [formProducto, setFormProducto] = useState({
        codigo: producto?.codigo ? producto?.codigo : '',
        nombre: producto?.nombre ? producto?.nombre : '',
        familia: producto?.familia ? producto?.familia : '',
        subFamilia: producto?.subFamilia ? producto?.subFamilia : '',
        precioBruto: producto?.precioBruto ? producto?.precioBruto : '',
        stock: producto?.stock ? producto?.stock : '',
        foto: producto?.foto ? producto?.foto : ''
    })
    const [fotoProducto, setFotoProducto] = useState(null);

    const handleInput = (e) => {

        setFormProducto({
            ...formProducto,
            [e.target.name]: e.target.value
        })}
    

    const editarProducto = async(e) => {
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

        Swal.fire({
            title: 'Estás seguro de actualizar este producto?',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0C2695',
            showCloseButton: true,
            showCancelButton: true
          }).then((result)=>{
            if(result.isConfirmed){

                new Promise(async (resolve, reject)=>{
                    let res;
                    let inputProducto = formProducto;
                    inputProducto.captcha = tokenCaptcha;
                    try {
                        if(!fotoProducto == ''){
                            console.log('HAY FOTO')
                            const reader = new FileReader();
                            reader.readAsDataURL(fotoProducto);

                            reader.onloadend = async () => {
                                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                                
                                inputProducto.foto = {
                                    fileName: fotoProducto.name,
                                    fileType: fotoProducto.type,
                                    fileContent: base64String
                                }
                                
                                res = await postUpdateProductoService(token, inputProducto);

                                if(res.code == 200){
                                    resolve(res.code)
                                }else{
                                    reject('Hubo un problema al procesar la solicitud')
                                }
                                
                            }
    
                            }else{
                                console.log('NO HAY FOTO')
                                inputProducto.foto = null;
                                
                                
                                const res = await postUpdateProductoService(token, inputProducto);

                                    if(res.code == 200){
                                        resolve(res.code)
                                    }else{
                                        reject('Hubo un problema al procesar la solicitud')
                                    }
                            }
                        
                        
                        

                        
                    } catch (error) {
                        reject('Hubo un problema al procesar la solicitud')
                    }
                    return
                }).then((res)=>{
                    if(res == 200){
                        Swal.fire({
                          title: 'Producto actualizado correctamente',
                          icon: 'success',
                          confirmButtonText: 'Aceptar',
                          confirmButtonColor: '#0C2695',
                          showCloseButton: true,
                        }).then(()=>{
                            cerrarModalProducto();
                        })
                      }else{
                        Swal.fire({
                          title: 'Hubo un problema al procesar la solicitud',
                          icon: 'error',
                          confirmButtonText: 'Aceptar',
                          confirmButtonColor: '#0C2695',
                          showCloseButton: true,
                        })
                      }
                })
                
            }
          })
        // const res = await postUpdateProductoService(token, inputProducto);
        
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

    useEffect(() => {
        setFormProducto(producto)
    }, [producto])
    
    useEffect(() => {
        setFotoProducto(null)
    }, [])
    

  return (
    <>
        <Modal show={showModalProducto} onHide={cerrarModalProducto} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                producto &&
                <form className='contenedor__login' onSubmit={editarProducto}>
                <h2 className='contenedor__login__titulo'>Rellena los campos que deseas editar</h2>
                <div className='form-group contenedor__login__group'>
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

                <div className='form-group contenedor__login__group'>
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

                <div className='form-group contenedor__login__group'>
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

                <div className='form-group contenedor__login__group'>
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

                <div className='form-group contenedor__login__group'>
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

                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={siteKey}
                />
                <div className="contenedor__editarProducto__botones mt-4">
                    <button type="submit" className='contenedor__login__button boton'>Guardar</button>
                    <button type="button" className='contenedor__login__button boton-secundario' onClick={()=>cerrarModalProducto()}>Cancelar</button>
                </div>
            </form>
            }
        </Modal.Body>
      </Modal>
    </>
  )
}
