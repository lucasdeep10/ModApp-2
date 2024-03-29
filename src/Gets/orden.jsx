import firebase from 'firebase'
import { getFirestore } from '../service/fireBaseConfig'

const postOrder = (order, setOrderId, cartList) => {

    const db = getFirestore()
    const orders = db.collection('orders')

    orders.add(order)
        .then((res) => { setOrderId(res.id) })
        .catch(err => console.log(err))


    //* -- Actualiza todos los items --
    const itemsToUpdate = db.collection('items').where(firebase.firestore.FieldPath.documentId(), 'in', cartList.map(i => i.id))
    const batch = db.batch();


    //* -- Restar del stock la cantidad de el carrito --
    itemsToUpdate.get()
        .then(collection => {
            collection.docs.forEach(docSnapshot => {
                batch.update(docSnapshot.ref, { stock: docSnapshot.data().stock - cartList.find(item => item.id === docSnapshot.id).cantidad })
            })
            batch.commit().then(res => {
                console.log(`Stock actualizado`)
            })

        })
}

export default postOrder