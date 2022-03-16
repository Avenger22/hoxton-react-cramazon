import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import SignUpPage from "./Pages/SignUp/SignUpPage"
import SignInPage from './Pages/SignIn/SignInPage'
import ProductsPage from './Pages/Products/ProductsPage'
import OrdersPage from './Pages/Orders/OrdersPage'
import ProductItemPage from './Pages/ProductItem/ProductItemPage'

function App() {

  return (

    <>

      <Routes>

        <Route 
            index 
            element={<Navigate replace to="/login" />} 
        />

        <Route 
          path = "/login" 
          element = {<SignInPage />}>
        </Route>

        <Route 
          path = "/products" 
          element = {<ProductsPage />}>
        </Route>

        <Route 
            path = "/products/:id" 
            element = {<ProductItemPage />}>
        </Route>

        <Route 
            path = "/orders" 
            element = {<OrdersPage />}>
        </Route>

        <Route 
            path = "/signup" 
            element = {<SignUpPage />}>
        </Route>

      </Routes>
    
    </>

  )

}

export default App