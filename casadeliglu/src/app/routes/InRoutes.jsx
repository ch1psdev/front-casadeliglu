import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../modules/home/Home'
import { Productos } from '../modules/Productos/Productos'
import { Producto } from '../modules/Productos/Producto'
import { Nosotros } from '../modules/Nosotros/Nosotros'
import { Contacto } from '../modules/contacto/Contacto'
import { Pagar } from '../modules/Pago/Pagar/Pagar'

export const InRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/inicio' element={<Home />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/productos/producto' element={<Producto />} />
        <Route path='/quienes-somos' element={<Nosotros />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/pagar' element={<Pagar />} />

        <Route path='/' element={<Navigate to='/inicio' />} />
        <Route path='/*' element={<Navigate to='/inicio' />} />
        <Route path='*' element={<Navigate to='/inicio' />} />
      </Routes>
    </>
  )
}
