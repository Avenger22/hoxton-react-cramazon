import { useState } from "react"
import { useNavigate } from "react-router"

function Order({product, calculateTotalBasket, handleButtonRemoveBasket, calculateIndividualItemBasket, getOrder}) {

    const navigate = useNavigate()

    function handleRedirectBack() {
        navigate(`/products/${product.id}`)
    }

    const itemOrder = getOrder(product.id)
    console.log(itemOrder)

    return (

        <li>

            <article className="basket-container__item">

                <img
                    src = {product.image}
                    // alt = {product.description}
                    width="90"
                />

                <p>{product.name}</p>

                <p>
                    <span>Quantity: </span>
                    <span>{itemOrder.quantity}</span> 
                    <button>+</button>
                    <button>-</button>
                </p>
                
                <span>Stock: {product.stock}</span>
                <p>Item total: {calculateIndividualItemBasket(product.id)}</p>
                
                <button 
                onClick={handleRedirectBack}>
                    Go to product
                </button>
                
                <button onClick={function () {
                    handleButtonRemoveBasket(product)
                }}>X</button>

            </article>

        </li>

    )

}

export default Order