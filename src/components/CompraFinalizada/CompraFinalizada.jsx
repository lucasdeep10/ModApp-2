import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const CompraFinalizada = (props) => {

    
    return (
        <div>
            <Modal
                {...props}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Compra finalizada con éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-success fs-5 bg-dark"> El id de su orden es: {props.orderId} y el total es ${props.total} <br />
                    ¡Gracias por su compra!</Modal.Body>
                
               
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        
        </div>
    )
}

export default CompraFinalizada