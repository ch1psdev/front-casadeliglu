import { InstagramIcon, MailIcon, TelefonoIcon, UbicacionIcon } from '../../assets/Icons'
import footer_logo from '../../assets/img/footer_logo.webp'

export const Footer = () => {
  return (
    <>
        <div className="container-fluid footer">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-md-2 footer__caja__logo">
                    <img src={footer_logo} alt="" className='footer__contacto__logo' />
                    <div className="footer__contacto__iconos">
                        <InstagramIcon />
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    
                    <div className='footer__menus d-lg-grid d-none'>
                        <h3>Productos</h3>
                        <div className='footer__menus__productos'>
                            <div>
                                <p>Fiambres</p>
                            </div>
                            <div>
                                <p>Fruta congelada</p>
                            </div>
                            <div>
                                <p>Hamburguesas y nuggets</p>
                            </div>
                            <div>
                                <p>Líquidos</p>
                            </div>
                            <div>
                                <p>Mariscos y pescados</p>
                            </div>
                            <div>
                                <p>Postres</p>
                            </div>
                            <div>
                                <p>Snacks</p>
                            </div>
                            <div>
                                <p>Verdura congelada</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
        
                <div className="col-12 col-md-5">
                    <div className="row">
                        <div className="col-8 col-md-6 footer__caja__contacto">
                            <h3>Contáctanos</h3>
                            <div className="footer__grilla__contacto">
                                <div className="footer__contacto">
                                    <p><UbicacionIcon /></p><br />
                                    <p><TelefonoIcon /></p>
                                    <p><MailIcon /></p>
                                </div>
                                <div className="footer__contacto--datos">
                                    <p>Av. Domingo santa maria 3595, LOCAL 3, RENCA</p>
                                    <a href='tel:+56984491140'>+56984491140</a><br />   
                                    <a href="mailto:congeladoshg@gmail.com">congeladoshg@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    </>
  )
}
