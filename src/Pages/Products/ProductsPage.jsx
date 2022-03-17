import { useState, useEffect } from "react"
import Product from "../../Components/Products/Product"
import HeaderCommon from "../../Components/Common/HeaderCommon"
import './ProductsPage.css'

export default function ProductsPage(
{user, setUser, validateUser, createOrder, handleButtonAddBasket, items, orders}
    
) {

    useEffect(() => {
        validateUser()
    }, [])
    
    return (

        <>

            <HeaderCommon 
                user = {user}
                //@ts-ignore
                setUser = {setUser}
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
                                orders = {orders}
                                createOrder = {createOrder}
                                handleButtonAddBasket = {handleButtonAddBasket}
                            />
                            
                        )

                    }

                </ul>

            </section>
        
        </>

    )

}