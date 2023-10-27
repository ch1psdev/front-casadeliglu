import { useState } from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { ModalCarrito } from "../components/Pago/ModalCarrito"

export const Layout = ({children}) => {

    const [showModalCarrito, setShowModalCarrito] = useState(false);

    const handleCloseModalCarrito = () => {
        setShowModalCarrito(false)
    }

    const handleModalCarrito = () => {
        setShowModalCarrito(!showModalCarrito)
    }

  return (
    <>
        <div className="layout">
            <div className="layout__header">
                <Header handleModalCarrito={handleModalCarrito} />
            </div>
            <div className="layout__body">
                {children}
            </div>
            <div className="layout__footer">
                <Footer />
            </div>
        </div>

        <ModalCarrito 
            showModalCarrito={showModalCarrito} 
            handleCloseModalCarrito={handleCloseModalCarrito} 
        />
    </>
  )
}
