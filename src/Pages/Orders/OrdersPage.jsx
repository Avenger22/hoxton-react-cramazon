import { useState } from "react"
import {useNavigate } from "react-router"
import OrderItem from "../../Components/Orders/Order"
import "./Orders.css"

export default function OrdersPage() {

    const [items, setItems] = useState([])
    const navigate = useNavigate()
    const bagItemsFiltered = items.filter(item => item?.quantity > 0)

    function calculateTotalBasket(baskedProductsParam) {

        let total = 0

        for (const product of baskedProductsParam) {
            total += Number(product.price) * Number(product.quantity)
        }

        return total.toFixed(2)

    }

    function filterTotalIndividual(productId) {
        const array = bagItemsFiltered.filter(item => item.id === productId)
        return array
    }

    return (

        <>

            <div className="bag-menus-wrapper">

                <section className="basket-container">

                    <h2>Your Shopping Bag</h2>

                    <ul>

                        {

                            bagItemsFiltered.map(product =>

                                <Order
                                    key={product.id}
                                    product={product}
                                    calculateTotalBasket={calculateTotalBasket}
                                    filterTotalIndividual={filterTotalIndividual}
                                />

                            )

                        }

                    </ul>

                    <h3>Your total: {calculateTotalBasket(bagItemsFiltered)}</h3>

                </section>

            </div>
      
        </>

    )
    
}