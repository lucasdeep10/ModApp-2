import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from "./ItemList"
import Spiner from '../Spinner/Spinner'
import { getFirestore } from '../../service/fireBaseConfig.js'



const ItemListContainer = () => {
    
    const [items, setItems] = useState([])

    const [loading, setLoading] = useState(true)  

    const { categoryId } = useParams();


    useEffect(() => {
        const bdQuery = getFirestore() // Traer todo
        

        if (categoryId ===  undefined) {
            bdQuery.collection('items').get()
                .then(data => setItems(data.docs.map(i => ({ id: i.id, ...i.data() }))))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        } else {
            bdQuery.collection('items').where('categoryId', '==',  categoryId ).get()
                .then(data => setItems(data.docs.map(i => ({ id: i.id, ...i.data() }))))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))

        }
      
      

    }, [categoryId])


    console.log(items)

       
   

    return (
        <div>
                    
            {loading ? <Spiner mensaje="Buscando productos....."/>: <ItemList items={items} />}
         
        </div>
    )
}

export default ItemListContainer


