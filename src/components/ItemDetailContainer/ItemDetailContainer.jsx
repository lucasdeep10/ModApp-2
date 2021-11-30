import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spiner from '../Spinner/Spinner';
import ItemDetail from './ItemDetail';
import getItem from '../../Gets/getItem';


const ItemDetailContainer = () => {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const itemsG = getItem(id, setItem, setLoading)
        },[id])
   
    return (
        <div>

            {loading ? <Spiner mensaje="Cargando Producto....." /> : <ItemDetail item={item}  key={id}/>}
        </div>
    )
}

export default ItemDetailContainer
