import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"
import HeaderCommon from "../../Components/Common/HeaderCommon"

export default function SignUpPage({user, setUser, validateUser}) {
    
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function getUsersFromServer() {
    
        fetch("http://localhost:4000/users")
            .then(resp => resp.json())
            .then(usersFromServer => {
            setUsers(usersFromServer)
        })
    
    }

    useEffect(() => {
        validateUser()
    }, [])

    if (user) {
        navigate("/orders")
    }

    function handleUserNameChangeSignUp(e) {
        setUserName(e.target.value)
    }

    function handleFormSubmitSignUp(e) {

        e.preventDefault()
        
        const formData = {
            fullName: fullName,
            userName: userName,
            email: email,
            password: password
        }

        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(data => {

            if (data.error) {
                alert('Oops, something went wrong.')
            } 
            
            else {
                // we managed to create our user!
                localStorage.setItem('token', data.token)
                setUser(data.user)
            }

        })

    }

    function handleFullNameChangeSignUp(e) {
        setFullName(e.target.value)
    }

    function handleEmailChangeSignUp(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChangeSignUp(e) {
        setPassword(e.target.value)
    }

    useEffect(getUsersFromServer, [])

    return (

        <>
        
            <HeaderCommon 
                user = {user}
                //@ts-ignore
                serUser = {setUser}
            />

            <section className="container-register">

                <form 
                    className="form-register"
                    onSubmit={function (e) {
                        e.preventDefault()
                        handleFormSubmitSignUp(e)
                        navigate(`/login`)
                    }}
                >

                    <div className="container-form-register">

                        <h1>Sign Up</h1>

                        <label>

                            <span>Full name : </span>
                            <input 
                                required 
                                name="fullname" 
                                type="text" 
                                placeholder="Enter your full name : " 
                                onChange={function (e) {
                                    handleFullNameChangeSignUp(e)
                                }}
                            />
                        
                        </label>

                        <label>

                            <span>Username : </span>
                            <input 
                                required 
                                name="username" 
                                type="text" 
                                placeholder="Enter your username: " 
                                onChange={function (e) {
                                    handleUserNameChangeSignUp(e)
                                }}
                            />
                        
                        </label>

                        <label>

                            <span>Email : </span>
                            <input 
                                required 
                                name="email" 
                                type="email" 
                                placeholder="Enter your email adress: " 
                                onChange={function (e) {
                                    handleEmailChangeSignUp(e)
                                }}
                            />
                        
                        </label>

                        <label>

                            <span>Password</span>
                            <input 
                                required 
                                name="password" 
                                type="password" 
                                placeholder="Enter your password: " 
                                onChange={function (e) {
                                    handlePasswordChangeSignUp(e)
                                }}
                            />
                        
                        </label>

                        <button type="submit">
                            Sign Up
                        </button>

                        <p>Already have an account, <Link to = "/login">sign in here</Link> !</p>

                    </div>

                </form>

            </section>
            
        </>

    )
    
}