import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ItemList from "./ItemList"
import Spiner from '../Spinner/Spinner'
import getItems from '../../Gets/getItems'



const ItemListContainer = () => {
    
    const [items, setItems] = useState([])

    const [loading, setLoading] = useState(true)  

    const { categoria } = useParams();


    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const items = getItems(categoria, setItems, setLoading)
        },[categoria])

    return (
        <div>
                    
            {loading ? <Spiner mensaje="Buscando productos....."/>: <ItemList items={items} />}
         
        </div>
    )
}

export default ItemListContainer


