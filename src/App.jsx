import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import './App.css'
import SignUpPage from "./Pages/SignUp/SignUpPage"
import SignInPage from './Pages/SignIn/SignInPage'
import ProductsPage from './Pages/Products/ProductsPage'
import OrdersPage from './Pages/Orders/OrdersPage'
import ProductItemPage from './Pages/ProductItem/ProductItemPage'
import { useEffect, useState } from 'react'

function App() {

  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [items, setItems] = useState([])

  const navigate = useNavigate()
  
  function getOrdersFromServer() {

    fetch(`http://localhost:4000/orders`)
    .then(resp => resp.json())
    .then(ordersFromServer => setOrders(ordersFromServer))

  }

  function getItemsFromServer() {

    fetch(`http://localhost:4000/items`)
    .then(resp => resp.json())
    .then(itemsFromServer => setItems(itemsFromServer))

  }

  useEffect(getOrdersFromServer, [])
  useEffect(getItemsFromServer, [])

  function validateUser () {

    if (localStorage.token) {
        
        fetch('http://localhost:4000/validate', {
          headers: {
              Authorization: localStorage.token
          }
        })
        .then(resp => resp.json())
        .then(data => {

            if (data.error) {
              console.log('Validation failed.')
            } 
            
            else {
              setUser(data)
            }

        })

    }

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
            'Content-Type': 'application/json',
            Authorization: localStorage.token
        },
        body: JSON.stringify(orderData)
      })
      .then(resp => resp.json())
      .then(data => {
      
          if (data.error) {
              alert(data.error)
          } 
          
          else {
              const newArray = [...orders, data]
              setOrders(newArray)
              navigate('/orders')
          }

      })

    }

    else {
        alert("You cant add again from here, go to the bag and + button")
    }

  }

  function deleteOrder(item) {
    
    const ordersArray = [...orders]
    const getOrder = ordersArray.find(order => order.itemId === item.id && order.userId === user.id)
    
    fetch(`http://localhost:4000/orders/${getOrder.id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token
      }
    })
    .then(resp => resp.json())
    .then(data => {
    
      if (data.error) {
        alert(data.error)
      } 
        
      else {
        // const filteredDeleted = orders.filter(item => item.id !== data.id)
        console.log(data)
        setOrders(data)
        navigate('/orders')
      }

    })

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

  function handleButtonRemoveBasket(item) {

    if (user) {
      deleteOrder(item)
    }

    else {
      alert('You need to be signed in to add to bag')
    }

  }
  
  return (

    <>

      <Routes>

        <Route 
            index 
            element={<Navigate replace to="/login" />} 
        />

        <Route 
          path = "/login" 
          element = {<SignInPage user = {user} setUser = {setUser} validateUser = {validateUser} />}>
        </Route>

        <Route 
          path = "/products" 
          element = {
            <ProductsPage 
              user = {user} 
              setUser = {setUser} 
              validateUser = {validateUser} 
              createOrder = {createOrder} 
              handleButtonAddBasket = {handleButtonAddBasket} 
              //@ts-ignore
              items = {items}
              orders = {orders} 
            />}>
        </Route>

        <Route 
            path = "/products/:id" 
            element = {
              <ProductItemPage 
                user = {user} 
                setUser = {setUser} 
                validateUser = {validateUser}
                //@ts-ignore 
                createOrder = {createOrder} 
                handleButtonAddBasket = {handleButtonAddBasket} 
              />}>
        </Route>

        <Route 
            path = "/orders" 
            element = {<OrdersPage user = {user} setUser = {setUser} validateUser = {validateUser}  handleButtonRemoveBasket = {handleButtonRemoveBasket} />}>
        </Route>

        <Route 
            path = "/signup" 
            element = {<SignUpPage user = {user} setUser = {setUser} validateUser = {validateUser} />}>
        </Route>

      </Routes>
    
    </>

  )

}

export default App