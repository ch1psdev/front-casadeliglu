import { InstagramIcon, MailIcon, TelefonoIcon, UbicacionIcon, WhatsappIcon } from '../../assets/Icons'
import footer_logo from '../../assets/img/footer_logo.webp'

export const Footer = () => {
  return (
    <>
        <div className="footer">
            <div className="caja__footer">
                <div className="footer__caja__logo">
                    <img src={footer_logo} alt="" className='footer__contacto__logo' />
                    <div className="footer__contacto__iconos">
                        <InstagramIcon />
                        <WhatsappIcon />
                    </div>
                </div>
                <div className="footer__columna__menus">
                    
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
        
                <div className="footer__datos__contacto">
                        <div className="footer__caja__contacto">
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
                <div className="footer__contenedor__goolemap">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.5672424397344!2d-70.69713962348264!3d-33.408452795364134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c6a03ff852c1%3A0x837343980a4c4de4!2sAv.%20Domingo%20Sta.%20Mar%C3%ADa%203595%2C%208640722%20Renca%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1684119866929!5m2!1ses-419!2scl" width="100%" height="220" style={{border:'0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
        <div className='footer__creditos'>
            <h1>Desarrollado por Matías Moncada - matias.monc@gmail.com</h1>
        </div>
    </>
  )
}
