
export const Contacto = () => {
  return (
    <>
      <div className="container-fluid contacto">
        <div className="row">
        <div className="col-1"></div>
          <div className="col-10">
          <div className="row contacto__caja">
          <div className="col-6">
            <div className="contacto__caja__info">
              <div>
                <h2>Contáctanos</h2>
              </div>
              <div className="d-grid">
              <h3>Dirección:</h3>
              <p>Av. Domingo santa maria 3595, LOCAL 3, RENCA</p>
            </div>
            <div className="d-grid">
              <h3>Horario:</h3>
              <p>Lunes a Viernes: 11:00 am - 19:30 pm<br/>Sábados y domingos: 11:00 am - 15:00 pm</p>
            </div>
            <div className="d-grid">
              <h3>Teléfono:</h3>
              <p>+56984491140</p>
            </div>
            <div className="d-grid">
              <h3>Correo:</h3>
              <p>congeladoshg@gmail.com</p>
            </div>
            </div>
          </div>
          <div className="col-6 p-0">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.5672424397344!2d-70.69713962348264!3d-33.408452795364134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c6a03ff852c1%3A0x837343980a4c4de4!2sAv.%20Domingo%20Sta.%20Mar%C3%ADa%203595%2C%208640722%20Renca%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1684119866929!5m2!1ses-419!2scl" width="100%" height="350" style={{border:'0',borderRadius: '15px'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
          </div>
          <div className="col-1"></div>
        </div>
        
      </div>
    </>
  )
}
