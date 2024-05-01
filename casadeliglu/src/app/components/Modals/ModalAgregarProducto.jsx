import { createRef, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import { siteKey } from "../../../config/config";
import { postAddProductoService, postUpdateProductoService } from "../../services/mantenedor/mantenedorService";

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

        let inputProducto = formProducto;
        inputProducto.captcha = tokenCaptcha;

        const res = await postAddProductoService(token, inputProducto);
        cerrarModalAgregarProducto();
    }
    
  return (
    <>
        <Modal show={showModalAgregarProducto} onHide={cerrarModalAgregarProducto} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <form className='contenedor__login' onSubmit={editarProducto}>
                <h2 className='contenedor__login__titulo'>Ingresa los datos del producto que quieres agregar</h2>

                <div className='form-group contenedor__login__group'>
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