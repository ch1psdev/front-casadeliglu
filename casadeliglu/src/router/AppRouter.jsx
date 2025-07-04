import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../app/modules/home/Home'
import { Productos } from '../app/modules/Productos/Productos'
import { Nosotros } from '../app/modules/Nosotros/Nosotros'
import { Contacto } from '../app/modules/contacto/Contacto'
import { useSelector } from 'react-redux'
import { Producto } from '../app/modules/Productos/Producto'
import { Pagar } from '../app/modules/Pago/Pagar/Pagar'
import { PagoEnEspera } from '../app/modules/Pago/Pagar/Pages/PagoEnEspera'
import { PagoFinalizado } from '../app/modules/Pago/Pagar/Pages/PagoFinalizado'
import { Layout } from '../app/Layouts/Layout'
import { Miperfil } from '../app/modules/MiPerfil/Miperfil'
import { Mantenedor } from '../app/modules/mantenedor/views/mantenedor'
import { Inventario } from '../app/modules/mantenedor/views/Inventario'
import { Ventas } from '../app/modules/mantenedor/views/Ventas'
import { Register } from '../app/modules/auth/register/Register'

export const AppRouter = () => {

  const num = 1
  const { status, token, info } = useSelector( (state) => state.usuarioState);
  return (
    <>
      <Routes>
        {
          (status == 'identificado' && token && info.rol < 3) &&
          <>
          <Route path='/panel' element={<Mantenedor />} />
          <Route path='/panel2' element={<Mantenedor />}>
                <Route path='/panel2/inventario' element={<Inventario />}/>
                <Route path='/panel2/ventas' element={<Ventas />}/>
            </Route>
          <Route path='/mi-perfil' element={<Layout><Miperfil /></Layout>} />
          </>
        }
        <Route path='/inicio' element={<Layout><Home /></Layout>} />
        <Route path='/productos' element={<Layout><Productos /></Layout>} />
        <Route path='/productos/producto' element={<Layout><Producto /></Layout>} />
        <Route path='/quienes-somos' element={<Layout><Nosotros /></Layout>} />
        <Route path='/contacto' element={<Layout><Contacto /></Layout>} />
        <Route path='/pagar' element={<Layout><Pagar /></Layout>} />
        <Route path='/pagar/procesando' element={<Layout><PagoEnEspera /></Layout>} />
        <Route path='/pagar/resuelto' element={<Layout><PagoFinalizado /></Layout>} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<Navigate to='/inicio' />} />
        <Route path='/*' element={<Navigate to='/inicio' />} />
        <Route path='*' element={<Navigate to='/inicio' />} />
      </Routes>
      
    </>
  )
}
