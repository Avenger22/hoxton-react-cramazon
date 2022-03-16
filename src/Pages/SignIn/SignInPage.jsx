import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignIn.css'
import HeaderCommon from "../../Components/Common/HeaderCommon"

export default function SignInPage({user, setUser}) {

    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    function handleUserNameChangeSignIn(e) {
        e.preventDefault()
        const userName = e.target.value 
        setUserName(userName)
    }

    function handlePasswordChangeSignIn(e) {
        e.preventDefault()
        const password = e.target.value 
        setPassword(password)
    }

    function handleFormSubmitSignIn(e) {

        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value
        
        const formData = {
            username: username,
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

    return (

        <>
        
            <HeaderCommon 
                user = {user}
                //@ts-ignore
                serUser = {setUser}
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

                            <span>UserName : </span>
                            
                            <input 
                                // defaultValue = {userName} 
                                required 
                                name="username" 
                                type="text" 
                                placeholder="Enter your username: " 
                                onChange={function (e) {
                                    handleUserNameChangeSignIn(e)
                                }}
                            />

                        </label>

                        <label>

                            <span>Password</span>

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