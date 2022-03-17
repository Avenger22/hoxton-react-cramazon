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
          element = {<ProductsPage user = {user} setUser = {setUser} validateUser = {validateUser} />}>
        </Route>

        <Route 
            path = "/products/:id" 
            element = {<ProductItemPage user = {user} setUser = {setUser} validateUser = {validateUser}/>}>
        </Route>

        <Route 
            path = "/orders" 
            element = {<OrdersPage user = {user} setUser = {setUser} validateUser = {validateUser} />}>
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