import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import productos from "../../db/items" //Array de productos(api)
import Spiner from '../Spinner/Spinner';
import ItemDetail from './ItemDetail';


const getItem = new Promise((res, rej) => {
    const condition = true;

    if (condition) {
        setTimeout(() => {
            res(productos)
        }, 2000)
    } else {
        rej('404 Not found')
    }


})


const ItemDetailContainer = () => {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getItem
                .then(res => setItem(res.find(element => element.id === id)))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))

        } else {
            getItem
                .then(res => setItem(res))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))

        }

    }, [id])


    return (
        <div>

            {loading ? <Spiner mensaje="Cargando Producto....." /> : <ItemDetail item={item} />}
        </div>
    )
}

export default ItemDetailContainer
