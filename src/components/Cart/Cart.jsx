import { Link } from 'react-router-dom';
import { useCartContext} from '../../context/CartContext';
import '../../index.css'
import { useState } from 'react'

import { CartEmpty } from './CartEmpty'
import firebase from 'firebase'
import { getFirestore } from '../../service/fireBaseConfig'
import CompraFinalizada from '../CompraFinalizada/CompraFinalizada'
import Spiner from '../Spinner/Spinner'
import { bottom } from '@popperjs/core';

export const Cart = () => {
    const [orderId, setOrderId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')


    const { cartList, eraseCart, eraseItem, cantItem, totalPrice } = useCartContext()

    const generarOrden = (e) => {
        e.preventDefault();

        const order = {}


        order.buyer = { name, email, tel } //formData
        order.total = totalPrice()
        order.date = firebase.firestore.Timestamp.fromDate(new Date())
        order.items = cartList.map(cartItem => {
            const id = cartItem.id
            const title = cartItem.title
            const price = cartItem.price * cartItem.cantidad
            return { id, title, price }
        })



        const dbQ = getFirestore()
        const orders = dbQ.collection('orders')

        //* "Orders" en donde se ira guardando cada orden de compra
        orders.add(order)
        //* Guardarlo como estado
            .then((res) => {
                setOrderId(res.id) //No me actualiza el valor de orderID

            })
            .catch(err => console.log(err))


        //*Refresca todos los items que estan en Cart del cartContext
        const itemsToUpdate = dbQ.collection('items').where(firebase.firestore.FieldPath.documentId(), 'in', cartList.map(i => i.id))


        const batch = dbQ.batch();


        //*Restar del stock la cantidad de el carrito
        itemsToUpdate.get()
            .then(collection => {
                collection.docs.forEach(docSnapshot => {
                    batch.update(docSnapshot.ref, {
                        stock: docSnapshot.data().stock - cartList.find(item => item.id === docSnapshot.id).cantidad
                    })
                })
                batch.commit().then(res => {

                    console.log(`Stock actualizado`)
                })

            })

        console.log(order)
    }

        
    //*Borrar el carrito de compra
    const handleHide = () => {
        setShowModal(false)
        eraseCart()
    }


    console.log(cartList)

    return (
        <div>
  
            {cartList.length === 0 ? <CartEmpty h1="Su carro está vacio" /> :
            cartList.map(item =>
                <div className="w-50ms-md-5 ps-5 ">
                    <table class="table table-hover container">
                        <thead >
                            <tr>
                                <th scope="col" key={item.id}>Producto</th>
                                <th scope="col">Marca</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Sub total</th>
                                <th scope="col">
                                    <i className="bi bi-trash-fill text-dark deletBtn fs-3" onClick={() => eraseItem(item.id)}></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-active">                                
                                    <th scope="row">{item.title} </th>
                                    <td>{item.autor}</td>
                                    <td>{item.stock}</td>
                                    <td>${item.price}</td>
                                    <td>${item.price * item.cantidad}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                )}
                {
                cartList.length === 0 ? null :
                    <>
                        <button type="button" className="btn btn-outline-secondary ms-5 " onClick={eraseCart}>Eliminar carrito</button>

                        <div className="card container vw-100 mt-3 mb-5 text-center ">
                            <div className="card-body">
                                <h4 className="card-title">Comprar Carrito</h4>
                                <h6 className="card-subtitle mb-2 text-muted">Cantidad de productos: {cantItem()} </h6>
                                <p className="card-text">Total: {totalPrice()} </p>
                                <form onSubmit={generarOrden} className="container cartForm"></form>
                                    <div class="col-md-6 ">
                                        <label for="nombre" className="form-label">Nombre</label>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="nombre" />
                                    </div>

                                    <div class="col-md-6 ">
                                        <label for="email" className="form-label">Email</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" />
                                    </div>
                                    <div class="col-md-6 ">
                                        <label for="tel" className="form-label">Teléfono</label>
                                        <input type="text" value={tel} onChange={(e) => setTel(e.target.value)} className="form-control" id="tel" />
                                    </div>
                                <Link to='/checkOut' className="card-link">Terminar compra</Link>
                                <Link to='/' className="card-link">
                                    <bottom type="button" className="btn btn-outline-danger mt-2 mt-md-0 ms-md-5 ">Seguir comprando </bottom> 
                                </Link>
                    
                            </div>
                            <CompraFinalizada show={showModal} onHide={handleHide} orderId={orderId} total={totalPrice()} />
                        </div>
                    </>

             }

        </div>
    )
}
