import { useEffect, useState } from "react"
import {useNavigate } from "react-router"
import Order from "../../Components/Orders/Order"
import "./Orders.css"
import HeaderCommon from "../../Components/Common/HeaderCommon"

export default function OrdersPage({user, setUser}) {

    // useEffect(() => {

    //     if (localStorage.token) {
    
    //       fetch('http://localhost:4000/validate', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ token: localStorage.token })
    //       })
    //         .then(resp => resp.json())
    //         .then(data => {
    
    //           if (data.error) {
    //             // token was not good, we got an error back
    //             alert('Invalid token!')
    //           } 
              
    //           else {
    //             // token is good, we get the user back
    //             setUser(data)
    //           }
    
    //         })
    
    //     }
    
    // }, [])
      
    const navigate = useNavigate()

    function getOrderItem() {

        let newArray = []

        for (const order of user.orders) {
            const item = order.item
            newArray.push(item)
        }

        return newArray

    }

    
    const orderItems = getOrderItem()
    console.log(orderItems)

    function calculateTotalBasket() {

        let total = 0

        for (const order of user.orders) {
            total += Number(order.item.price) * Number(order.quantity)
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