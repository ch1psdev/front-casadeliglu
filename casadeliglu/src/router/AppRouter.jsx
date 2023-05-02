import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../app/modules/home/Home'
import { Header } from '../app/components/Header'

export const AppRouter = () => {
  return (
    <>
    <Header />
        <Routes>
            <Route path='/inicio' element={<Home />} />
            <Route path='/' element={<Navigate to='/inicio' />} />
        </Routes>
    </>
  )
}
