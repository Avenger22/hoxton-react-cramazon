import { useNavigate } from "react-router"
import "../Products/Product.css"

function Product({item, user, items, setItems}) {

    const navigate = useNavigate()

    function handleLiClickItem(e) {
        e.preventDefault()
        e.stopPropagation()
        navigate(`/products/${item.id}`)
    }

    function handleButtonAddBasket(item) {

        if (user) {

            let itemsCopy = JSON.parse(JSON.stringify(items))
            const index = itemsCopy.findIndex(target => target.id === item.id)
            const item = itemsCopy[index]

            if (item.stock > 0) {

                const newItem = {
                    ...item,
                    quantity: item.quantity ? item.quantity + 1 : 1,
                    stock: item.stock - 1
                }

                itemsCopy[index] = newItem
                setItems(itemsCopy)

            }

            else {
                alert('You cannot add an item in the bag with no stock')
            }

        }

        else {
            alert('You need to be signed in to add to bag')
        }

    }

    return (

        <>
        
            <li 
                className = "store-item-no-date"
                onClick={function (e) {
                    handleLiClickItem(e)}}
            >

                <img src={item.image} alt=""/>
                <h2>{item.name}</h2>

                <div className="span-wrapper-item">

                    <span className = "span-1">
                        Price: {item.price}
                    </span>


                    <span className="span-3-item">
                        Stock: {item.stock}
                    </span>

                    <span className="span-4-item">
                        Type: {item.type}
                    </span>
                
                </div>

                <button onClick={function (e) {
                    e.stopPropagation()
                    handleButtonAddBasket(item)
                }}>

                    <i className="fas fa-shopping-bag"></i>
                    <span>Add to cart</span>
                </button>
 
            </li>
            
        </>

    )

}

export default Product