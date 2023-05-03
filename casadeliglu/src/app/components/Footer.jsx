import footer_logo from '../../assets/img/footer_logo.webp'

export const Footer = () => {
  return (
    <>
        <div className="container-fluid footer">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-5"></div>
                <div className="col-5">
                    <div className="row">
                        <div className="col-6 footer__caja__contacto">
                            <h3>Contáctanos</h3>
                            <div className="footer__grilla__contacto">
                                <div className="footer__contacto">
                                    <p>Dirección:</p><br />
                                    <p>Número:</p>
                                    <p>Correo:</p>
                                </div>
                                <div className="footer__contacto--datos">
                                    <p>Av. Domingo santa maria 3595, LOCAL 3, RENCA</p>
                                    <p>+56987067940</p>
                                    <p>casadeliglu@correo.cl</p>
                                </div>
                            </div>
                            <div className="footer__contacto__iconos">
                                
                            </div>
                        </div>
                        <div className="col-6">
                            <img src={footer_logo} alt="" className='footer__contacto__logo' />
                        </div>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    </>
  )
}
