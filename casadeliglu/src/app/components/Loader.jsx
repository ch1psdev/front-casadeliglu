import React from 'react'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ThreeCircles } from 'react-loader-spinner';

export const Loader = () => {

    const [open, setOpen] = useState(true);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

  return (
    // <div>
    //   <button onClick={onOpenModal} hidden>Open modal</button>
    //   <Modal open={open} onClose={onCloseModal} center>
    //     <ThreeCircles
    //         height="100"
    //         width="100"
    //         color="#4fa94d"
    //         wrapperStyle={{}}
    //         wrapperClass=""
    //         visible={true}
    //         ariaLabel="three-circles-rotating"
    //         outerCircleColor=""
    //         innerCircleColor=""
    //         middleCircleColor=""
    //     />
    //   </Modal>
    // </div>

    <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-body">
                    <ThreeCircles
                        height="100"
                        width="100"
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
