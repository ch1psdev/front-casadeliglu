import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import iglu_header from '../../../../../assets/img/iglu_header.png'
import { useDispatch } from 'react-redux';
import { vaciarCarrito } from '../../../../store/shop/shopSlice';
import { limpiarCompra } from '../../../../store/buy/buySlice';

export const PagoFinalizado = () => {
        
  return (
    <>
      <div>
        <p>Has finalizado el proceso de pago, puedes cerrar esta ventana.</p>
      </div>
    </>

  )
}
