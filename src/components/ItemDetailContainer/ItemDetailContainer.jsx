import { getFirestore } from '../../service/fireBaseConfig'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spiner from '../Spinner/Spinner';
import ItemDetail from './ItemDetail';


const ItemDetailContainer = () => {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
       const bdQuery = getFirestore()

       // -- Busca por id y trae un solo elemento --
       bdQuery.collection('items').doc(id).get()
            .then(resp => setItem({id: resp.id, ...resp.data() }))
            .catch(err => console.log(err))
            .finally(()=> setLoading(false))

    }, [id])

    console.log(id)

    return (
        <div>

            {loading ? <Spiner mensaje="Cargando Producto....." /> : <ItemDetail item={item}  key={id}/>}
        </div>
    )
}

export default ItemDetailContainer
