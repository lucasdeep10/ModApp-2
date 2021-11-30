import React from 'react'
import { Link } from 'react-router-dom'



const Item = ({ id, title, price, pictureUrl, stock, talle }) => {
    
    return (

        <div className="animate__animated animate__zoomIn col-sm-12 col-md-6 col-lg-4"
            id={id}>
                <div className="card mb-3">
                    <p className="card-header text-dark"><b>{title} </b></p>
                <img src={pictureUrl} className="card-img-top container mb-3 mt-2"
                    style={{ width: "250px", height: "auto" }} alt="img" />
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-dark"><i>Precio: $ {price} </i></li>
                        <li className="list-group-item text-dark"><i>Talles: {talle} </i></li>
                        {stock === 0 ? <li className="list-group-item" style={{color:'red'}}>Fuera de stock </li> :
                        <li className="list-group-item " style={{ color: 'green' }}>Stock: {stock} </li>
                    }
                    </ul>
                <Link to={`/item/${id}`}
                    type="button"
                    className="btn btn-outline-success text-dark"><b>Ver</b></Link>
                </div>
        </div>

    )
}

export default Item
