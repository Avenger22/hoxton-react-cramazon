import { useEffect, useState } from "react"
import {useNavigate } from "react-router"
import Order from "../../Components/Orders/Order"
import "./Orders.css"
import HeaderCommon from "../../Components/Common/HeaderCommon"

export default function OrdersPage({user, setUser, validateUser}) {
      
    const navigate = useNavigate()

    useEffect(() => {
        validateUser()
    }, [])

    if (user === null) {
        return <main>Loading...</main>
    }

    function getOrderItem() {

        let newArray = []

        for (const order of user?.orders) {
            const item = order.item
            newArray.push(item)
        }

        return newArray

    }

    
    const orderItems = getOrderItem()
    console.log(orderItems)

    function calculateTotalBasket() {

        let total = 0

        for (const order of user?.orders) {
            total += order.item.price * Number(order.quantity)
        }

        return total.toFixed(2)

    }

    function filterTotalIndividual(productId) {
        const array = orderItems.filter(item => item.id === productId)
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

                            orderItems.map(product =>

                                <Order
                                    key={product.id}
                                    product={product}
                                    calculateTotalBasket={calculateTotalBasket}
                                    filterTotalIndividual={filterTotalIndividual}
                                />

                            )

                        }

                    </ul>

                    <h3>Your total: {calculateTotalBasket()}</h3>

                </section>

            </div>
      
        </>

    )
    
}