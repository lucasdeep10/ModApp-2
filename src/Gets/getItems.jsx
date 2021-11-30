import { getFirestore } from '../service/fireBaseConfig'
const getItems = (categoria, setItems, setLoading) => { 
        const db = getFirestore()
        const dbGetQueary = categoria ? db.collection('items').where('categoria', '==', categoria) : db.collection('items')
       
        dbGetQueary.get()
        .then(data => setItems(data.docs.map(i => ({ id: i.id, ...i.data() }))))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
}

export default getItems