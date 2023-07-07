import iglu_working from '../../../assets/img/iglu_working.png'

export const Nosotros = () => {

  return (
    <>
      <div className="container-fluid mb-5 nosotros__caja">
        <div className="row">
          <div className="col-12 col-md-2"></div>
          <div className="col-12 col-md-8">
            <div className="nosotros">
              <div className="nosotros__logo">
                <img src={iglu_working} alt="" />
              </div>
              <div className="nosotros__texto">
                <p>Somos Congelados HG limitada una empresa dedicada a la venta y distribución de alimentos congelados de  calidad y por sobretodo precios accesibles. Con casa matriz  en la comuna de renca. </p>
                <p>Constituida y formada durante la pandemia con el nombre de fantasía  “Casa del iglú” para ayudar a las familias a la adquisición de alimentos con entrega directa a sus hogares ayudando a disminuir la exposición de las personas. </p>
                <p>En nuestra empresa valoramos la calidad de nuestros productos, por eso trabajamos con proveedores que otorgan altísimos estándares  en producción y manipulación de alimentos.</p>
                <p>Nos encantaría escuchar y leer tus comentarios y sugerencias. Puedes contactarnos a través de nuestro correo electrónico congeladoshg@gmail.com, vía WhatsApp al +569 87067940 o redes sociales (enlace a Instagram y Facebook) y puedes visitarnos en nuestra tienda física ubicada en Av. Domingo Santa María 3595, local 3, comuna de Renca de lunes a viernes de 11:00 a 14:00 hrs y 15:30 a 19:30 hrs. Sábados y domingo de 11:00 a 15:00 hrs.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-2"></div>
        </div>
      </div>
    </>
  )
}
