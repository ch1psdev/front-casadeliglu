import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../app/modules/home/Home'
import { Header } from '../app/components/Header'
import { Productos } from '../app/modules/Productos/Productos'
import { Nosotros } from '../app/modules/Nosotros/Nosotros'
import { Contacto } from '../app/modules/contacto/Contacto'
import { Footer } from '../app/components/Footer'

export const AppRouter = () => {
  return (
    <>
    <Header />
        <Routes>
            <Route path='/inicio' element={<Home />} />
            <Route path='/productos' element={<Productos />} />
            <Route path='/quienes-somos' element={<Nosotros />} />
            <Route path='/contacto' element={<Contacto />} />

            <Route path='/' element={<Navigate to='/inicio' />} />
        </Routes>
      <Footer />
    </>
  )
}
