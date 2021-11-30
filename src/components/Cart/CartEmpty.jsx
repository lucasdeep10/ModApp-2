import React from 'react'
import { Link } from 'react-router-dom'

import '../../index.css'
export const CartEmpty = ({ h1 }) => {

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1 className="align-self-center mt-2">{h1} </h1>
            <img src="https://i.postimg.cc/Zq7V1VdB/pixlr-bg-result.png" style={{ width: "400px", height: "350px" }} className="emptyCard mt-3 align-self-center" alt="Carrito de compra" />
            <Link to='/'>
                <button type="button" className="btn btn-outline-success mt-2">Ir al catálogo</button>
            </Link>
        </div>
    )
}
