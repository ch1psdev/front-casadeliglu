import { useState } from "react"
import { Modal } from "react-bootstrap"
import { ThreeCircles } from "react-loader-spinner";

export const LoaderComponent = ({mostrarLoader, setMostrarLoader, handleCloseLoader}) => {

  return (
    <>
        <Modal show={mostrarLoader} onHide={handleCloseLoader} backdrop="static" centered keyboard={false} className="loader">
          
        <Modal.Body style={{display:'grid', justifyContent:'center'}}>
          <ThreeCircles
            height="50"
            width="50"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#0C2695"
            innerCircleColor="#0C2695"
            middleCircleColor="#0C2695"
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
