import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../app/modules/home/Home'
import { Header } from '../app/components/Header'
import { Productos } from '../app/modules/Productos/Productos'
import { Nosotros } from '../app/modules/Nosotros/Nosotros'
import { Contacto } from '../app/modules/contacto/Contacto'
import { Footer } from '../app/components/Footer'
import { Trabajando } from '../app/components/Trabajando'
import { Login } from '../app/modules/auth/pages/Login'
import { useSelector } from 'react-redux'
import { Producto } from '../app/modules/Productos/Producto'
import { InRoutes } from '../app/routes/InRoutes'
import { Pagar } from '../app/modules/Pago/Pagar/Pagar'
import { PagoEnEspera } from '../app/modules/Pago/Pagar/Pages/PagoEnEspera'
import { PagoFinalizado } from '../app/modules/Pago/Pagar/Pages/PagoFinalizado'
import { Layout } from '../app/Layouts/Layout'

export const AppRouter = () => {

  const num = 1
  const { status} = useSelector( (state) => state.usuarioState);
  return (
    <>
    
    {/* {
      status=='logout' ? (
        <Routes>
          <Route path='/inicio' element={<Trabajando />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Navigate to='/inicio' />} />
          <Route path='/*' element={<Navigate to='/inicio' />} />
          <Route path='*' element={<Navigate to='/inicio' />} />
        </Routes>
      ):(
        <>
          <Header />
              <InRoutes />
          <Footer /> 
        </>
        
      )
    } */}
    <>
      <Routes>
        <Route path='/inicio' element={<Layout><Home /></Layout>} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/productos/producto' element={<Producto />} />
        <Route path='/quienes-somos' element={<Nosotros />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/pagar' element={<Pagar />} />
        <Route path='/pagar/procesando' element={<PagoEnEspera />} />
        <Route path='/pagar/resuelto' element={<PagoFinalizado />} />

        <Route path='/' element={<Navigate to='/inicio' />} />
        <Route path='/*' element={<Navigate to='/inicio' />} />
        <Route path='*' element={<Navigate to='/inicio' />} />
      </Routes>
      
    </>
      
    </>
  )
}
