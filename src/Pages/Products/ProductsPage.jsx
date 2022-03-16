import { useState, useEffect } from "react"
import Product from "../../Components/Products/Product"

export default function ProductsPage() {

    const [items, setItems] = useState([])

    function getItemsFromServer() {

        fetch(`http://localhost:4000/items`)
        .then(resp => resp.json())
        .then(itemsFromServer => setItems(itemsFromServer))

    }

    useEffect(getItemsFromServer, [])

    return (

        <>

            <section className="page-wrapper">

                <ul className="products-wrapper">

                    {

                        items.map(item => 
                            
                            <Product 
                                key = {item.id}
                                item = {item}
                            />
                            
                        )

                    }

                </ul>

            </section>
        
        </>

    )

}