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

export const AppRouter = () => {

  const num = 1
  const { status} = useSelector( (state) => state.usuarioState);
  console.log(status)
  return (
    <>
    
    {
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
            <Routes>
              <Route path='/inicio' element={<Home />} />
              <Route path='/productos' element={<Productos />} />
              <Route path='/quienes-somos' element={<Nosotros />} />
              <Route path='/contacto' element={<Contacto />} />

              <Route path='/' element={<Navigate to='/inicio' />} />
              <Route path='/*' element={<Navigate to='/inicio' />} />
              <Route path='*' element={<Navigate to='/inicio' />} />
            </Routes>
          <Footer /> 
        </>
        
      )
    }
      
    </>
  )
}
