import { useState, useEffect } from "react"
import Product from "../../Components/Products/Product"
import HeaderCommon from "../../Components/Common/HeaderCommon"

export default function ProductsPage({user, setUser, validateUser}) {

    useEffect(() => {
        validateUser()
    }, [])
    
    const [items, setItems] = useState([])
    const [orders, setOrders] = useState([])

    function getOrdersFromServer() {

        fetch(`http://localhost:4000/orders`)
        .then(resp => resp.json())
        .then(ordersFromServer => setOrders(ordersFromServer))

    }

    useEffect(getOrdersFromServer, [])

    return (

        <>

            <HeaderCommon 
                user = {user}
                //@ts-ignore
                serUser = {setUser}
            />

            <section className="page-wrapper">

                <ul className="products-wrapper">

                    {

                        items.map(item => 
                            
                            <Product 
                                key = {item.id}
                                item = {item}
                                user = {user}
                                items = {items}
                                setItems = {setItems}
                                orders = {orders}
                                setOrders = {setOrders}
                            />
                            
                        )

                    }

                </ul>

            </section>
        
        </>

    )

}