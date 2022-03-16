// #region 'Importing'
import "./ProductItem.css"
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
// #endregion

const randColour = ["green", "red", "blue", "yellow"][
    Math.floor(Math.random() * 4)
];

export default function ProductItemPage() {

    const params = useParams()
    const navigate = useNavigate()

    function getIndividualProductFromServer () {

        fetch(`https://albvitafitness.glitch.me/items/${params.id}`)
            .then(resp => resp.json())
            .then(productFromServer => setProductItem(productFromServer))
    
    }

    function getInitialRelatedItemsFromServer () {
    
        fetch("https://albvitafitness.glitch.me/items")
            .then(resp => resp.json())
            .then(itemsFromServer => setInitialRelatedItems(itemsFromServer))
    }

    useEffect(getIndividualProductFromServer, [])
    useEffect(getInitialRelatedItemsFromServer, [])

    if (productItem === null) {
        return <main>Loading...</main>
    }

    if (productItem.name === undefined) {
        return <main>Item not found</main>
    }

    const type = productItem.type
    const name = productItem.name

    function filterCategory() {
        return initialRelatedItems.filter(item => item.type === type && item.name !== name)
    }
    
    const itemsCategory = filterCategory()

    return (

        <>

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

                                <button onClick={function (e) {
                                    e.stopPropagation()
                                    handleButtonAddFavorite(productItem)
                                    navigate(`/favorites`)
                                }}>
                                    Add to Wishlist
                                </button>

                            </div>

                        </div>

                    </section>

                </main>

            </section>

        </>
        
    )
    
}