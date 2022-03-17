import { useState } from "react"
import { useNavigate } from "react-router"

function Order({product, calculateTotalBasket, filterTotalIndividual}) {

    // const totalIndividualArray = filterTotalIndividual(product.id)
    const navigate = useNavigate()

    function handleRedirectBack() {
        navigate(`/products/${product.id}`)
    }

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
                    {/* <span>Quantity: </span> */}
                    {/* <span>{product.quantity}</span> */}
                    <button>+</button>
                    <button>-</button>
                </p>
                
                <span>Stock: {product.stock}</span>
                <p>Item total: {calculateTotalBasket()}</p>
                
                <button 
                onClick={handleRedirectBack}>
                    Go to product
                </button>
                
                <button onClick={function () {
                    // handleButtonRemoveBasket(product)
                }}>X</button>

            </article>

        </li>

    )

}

export default Order