import { useEffect, useState } from "react"
import {useNavigate } from "react-router"
import Order from "../../Components/Orders/Order"
import "./Orders.css"
import HeaderCommon from "../../Components/Common/HeaderCommon"

export default function OrdersPage({user, setUser, validateUser, handleButtonRemoveBasket}) {
      
    useEffect(() => {
        validateUser()
    }, [])

    if (user === null) {
        return <main>Loading.....</main>
    }

    function getOrdersItems() {

        let newArray = []

        for (const order of user.orders) {
            const item = order.item
            newArray.push(item)
        }

        return newArray

    }

    function getOrder(productId) {

        let newArray = []

        for (const order of user.orders) {

            if (order.itemId === productId) {
                newArray.push(order)
            }

        }

        return newArray

    }

    
    const orderItems = getOrdersItems()

    function calculateTotalBasket() {

        let total = 0

        for (const order of user?.orders) {
            total += order.item.price * Number(order.quantity)
        }

        return total.toFixed(2)

    }

    function filterTotalIndividual(productId) {

        const newOrderItems = [...orderItems]
        const array = newOrderItems.filter(item => item.itemId === productId)
        return array
        
    }

    function calculateIndividualItemBasket(productId) {

        let total = 0
        const arrayFiltered = filterTotalIndividual(productId)

        for (const order of arrayFiltered) {
            total += order.item.price * order.quantity
        }

        console.log(total)

        return total.toFixed(2)

    }

    return (

        <>

            <HeaderCommon 
                user = {user}
                //@ts-ignore
                setUser = {setUser}
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
                                    //@ts-ignore
                                    calculateIndividualItemBasket={calculateIndividualItemBasket}
                                    //@ts-ignore
                                    handleButtonRemoveBasket = {handleButtonRemoveBasket}
                                    getOrder = {getOrder}
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