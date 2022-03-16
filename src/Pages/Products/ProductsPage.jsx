import { useState, useEffect } from "react"
import Product from "../../Components/Products/Product"
import HeaderCommon from "../../Components/Common/HeaderCommon"

export default function ProductsPage({user, setUser}) {

    const [items, setItems] = useState([])

    function getItemsFromServer() {

        fetch(`http://localhost:4000/items`)
        .then(resp => resp.json())
        .then(itemsFromServer => setItems(itemsFromServer))

    }

    useEffect(getItemsFromServer, [])

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
                            />
                            
                        )

                    }

                </ul>

            </section>
        
        </>

    )

}