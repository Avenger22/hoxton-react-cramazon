// #region 'Importing'
import "./ProductItem.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import HeaderCommon from "../../Components/Common/HeaderCommon"
// #endregion

const randColour = ["green", "red", "blue", "yellow"][
    Math.floor(Math.random() * 4)
];

export default function ProductItemPage({user, setUser}) {

    const params = useParams()
    const navigate = useNavigate()
    const [productItem, setProductItem] = useState(null)
    
    function getIndividualProductFromServer () {

        fetch(`http://localhost:4000/items/${params.id}`)
            .then(resp => resp.json())
            .then(productFromServer => setProductItem(productFromServer))
    
    }

    useEffect(getIndividualProductFromServer, [])

    if (productItem === null) {
        return <main>Loading...</main>
    }

    if (productItem.name === undefined) {
        return <main>Item not found</main>
    }

    const type = productItem.type
    const name = productItem.name

    return (

        <>

            <HeaderCommon 
                user = {user}
                //@ts-ignore
                serUser = {setUser}
            />

            <section className='container-product-item'>

                <main className='main-container'>

                    <div className='product-ribbon'>
                        <span className='ribbon-span'>Products / </span>
                        <span className='ribbon-span'>{productItem.type} / </span>
                        <span className='ribbon-span'>{productItem.name}</span>
                    </div>

                    <section className="product-detail main-wrapper">

                        <img
                            src={productItem.image}
                            alt={productItem.description}
                        />

                        <div className="product-detail__side" style={{ borderColor: `var(--${randColour})` }}>

                            <h3>{productItem.name}</h3>

                            <h2><span className='special-product-span'>Product Name</span> : {productItem.name}</h2>

                            <p>
                                <span className='special-product-span'>Description</span> : {productItem.description}
                            </p>

                            <p>
                                <span className='special-product-span'>
                                    Item Price
                                </span> : ${productItem.price}
                            </p>

                            <p>
                                <span className='special-product-span'>
                                    Category : 
                                </span> : {productItem.type}
                            </p>

                            <p>
                                <span className='special-product-span'>
                                    In Stock
                                </span> : {productItem.stock}
                            </p>

                            <div className='button-wish-wrapper'>
                                
                                <button onClick={function (e) {
                                    e.stopPropagation()
                                    handleButtonAddBasket(productItem)
                                    navigate(`/bag`)
                                }}>
                                    Add to Bag
                                </button>

                            </div>

                        </div>

                    </section>

                </main>

            </section>

        </>
        
    )
    
}