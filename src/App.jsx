import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import SignUpPage from "./Pages/SignUp/SignUpPage"
import SignInPage from './Pages/SignIn/SignInPage'
import ProductsPage from './Pages/Products/ProductsPage'
import OrdersPage from './Pages/Orders/OrdersPage'
import ProductItemPage from './Pages/ProductItem/ProductItemPage'
import { useEffect, useState } from 'react'

function App() {

  const [user, setUser] = useState(null)
  
  useEffect(() => {

    if (localStorage.token) {

      fetch('http://localhost:4000/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: localStorage.token })
      })
        .then(resp => resp.json())
        .then(data => {

          if (data.error) {
            // token was not good, we got an error back
            alert('Invalid token!')
          } 
          
          else {
            // token is good, we get the user back
            setUser(data)
          }

        })

    }

  }, [])

  return (

    <>

      <Routes>

        <Route 
            index 
            element={<Navigate replace to="/login" />} 
        />

        <Route 
          path = "/login" 
          element = {<SignInPage user = {user} setUser = {setUser} />}>
        </Route>

        <Route 
          path = "/products" 
          element = {<ProductsPage user = {user} setUser = {setUser} />}>
        </Route>

        <Route 
            path = "/products/:id" 
            element = {<ProductItemPage user = {user} setUser = {setUser} />}>
        </Route>

        <Route 
            path = "/orders" 
            element = {<OrdersPage user = {user} setUser = {setUser} />}>
        </Route>

        <Route 
            path = "/signup" 
            element = {<SignUpPage user = {user} setUser = {setUser} />}>
        </Route>

      </Routes>
    
    </>

  )

}

export default App