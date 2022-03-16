import { Link, NavLink, useNavigate } from "react-router-dom";
import './HeaderCommon.css'

export default function HeaderCommon({user, setUser}) {

    // const navigate = useNavigate()

    function handleLogOut(e) {
        e.preventDefault()
        localStorage.removeItem('token')
        setUser(null)
    }

    return (

        <>

            <header className="header">

                <div className="header-group-1">
                    
                    <ul className="ul-header-1">
                        
                        <li id="special-logo">

                            <Link to = "/products">
                                E-commerce APP
                            </Link>

                        </li>
                        
                        <li><NavLink to = "/products">Products</NavLink></li>
                        <li><NavLink to = "/orders">Orders Bag</NavLink></li>
                    
                    </ul>

                </div>

                <div className="void"></div>

                <div className="header-group-2">

                    <ul className="ul-header-2">

                        {user === null ? (

                            <>
                                <li className = "sign-links"><Link to = "/login">Sign In</Link></li>
                                <li className = "sign-links"><Link to = "/signup">Sign Up</Link></li>
                            </>

                        ): (

                                <>

                                    <div className="dropdown">

                                        <li className="dropbtn">
                                            <i className="fas fa-user"></i>
                                            {user.fullName}
                                        </li>

                                        <div className="dropdown-content">

                                            <button className="log-out" onClick={(e) => {
                                                handleLogOut(e)
                                            }}>

                                                <span>Log Out</span>
                                                
                                            </button>

                                        </div>

                                    </div>

                                </>

                            )
                            
                        }

                    </ul>

                </div>

            </header>
            
        </>

    )

}