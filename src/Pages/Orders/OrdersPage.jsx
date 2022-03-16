import { useState } from "react"
import {useNavigate } from "react-router"
import Order from "../../Components/Orders/Order"
import "./Orders.css"
import HeaderCommon from "../../Components/Common/HeaderCommon"

export default function OrdersPage({user, setUser}) {

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

            <HeaderCommon 
                user = {user}
                //@ts-ignore
                serUser = {setUser}
            />

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