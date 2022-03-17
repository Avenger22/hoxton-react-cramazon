import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignIn.css'
import HeaderCommon from "../../Components/Common/HeaderCommon"

export default function SignInPage({user, setUser, validateUser}) {

    useEffect(() => {
        validateUser()
    }, [])
    
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function handleEmailChangeSignIn(e) {
        e.preventDefault()
        const email = e.target.value 
        setEmail(email)
    }

    function handlePasswordChangeSignIn(e) {
        e.preventDefault()
        const password = e.target.value 
        setPassword(password)
    }

    function handleFormSubmitSignIn(e) {

        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value
        
        const formData = {
            email:  email,
            password: password
        }
        
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(data => {
        
            if (data.error) {
                alert(data.error)
            } 
            
            else {
                // we managed to sign in!
                localStorage.setItem('token', data.token)
                setUser(data.user)
                navigate('/orders')
            }

        })

    }

    if (user) {
        navigate("/orders")
    }
    
    return (

        <>
        
            <HeaderCommon 
                user = {user}
                //@ts-ignore
                setUser = {setUser}
            />

            <section className="container-login">

                <form className="form-login" 
                    onSubmit={function (e) {
                        handleFormSubmitSignIn(e)
                    }}
                >

                    <div className="container-form">

                        <h1>Sign In</h1>

                        <label>

                            <span>Email: </span>
                            
                            <input 
                                // defaultValue = {userName} 
                                required 
                                name="email" 
                                type="text" 
                                placeholder="Enter your email: " 
                                onChange={function (e) {
                                    handleEmailChangeSignIn(e)
                                }}
                            />

                        </label>

                        <label>

                            <span>Password: </span>

                            <input
                                // defaultValue={password} 
                                required 
                                name="password" 
                                type="password" 
                                placeholder="Enter your password: "
                                onChange={function (e) {
                                    handlePasswordChangeSignIn(e)
                                }} 
                            />
                        
                        </label>

                        <button type="submit">
                            Sign In
                        </button>

                        <p>If you don't have an account, <Link to = {'/signup'}>sign up here</Link> !</p>

                    </div>

                </form>

            </section>
            
        </>

    )
    
}