import { useNavigate } from "react-router"
import "../Products/Product.css"

function Product({item, user, items, setItems, orders, setOrders}) {

    const navigate = useNavigate()

    function handleLiClickItem(e) {
        e.preventDefault()
        e.stopPropagation()
        navigate(`/products/${item.id}`)
    }

    function createOrder(item) {

        let combination = false

        for (const order of orders) {

            if (order.userId === user.id && order.itemId === item.id) {
                combination = true
            }

        }

        if (combination === false) {
            
            const orderData = {
                quantity: 1,
                userId: user.id,
                itemId: item.id
            }

            fetch('http://localhost:4000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
                body: JSON.stringify(orderData)
            })
            .then(resp => resp.json())
            .then(data => {
            
                if (data.error) {
                    alert(data.error)
                } 
                
                else {
                    setItems(data)
                    navigate('/orders')
                }

            })

        }

        else {
            alert("You cant add again from here, go to the bag and + button")
        }

    }

    function handleButtonAddBasket(item) {

        if (user) {
            createOrder(item)
            navigate("/orders")
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