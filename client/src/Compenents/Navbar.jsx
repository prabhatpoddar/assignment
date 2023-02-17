import React from 'react'
import { Link } from 'react-router-dom'
import "../Style/Navbar.css"

const Navbar = () => {
    const user = localStorage.getItem("user")
    return (
        <div className='MainContainer'>
            <div>
                <h5> Employee Management</h5>
            </div>
            <div id="links">
                <Link to="/">Home</Link>
                <Link to="/employee">Employee</Link>
                {
                    user == null ? <Link to="/signup">Resister</Link> : <Link to="/"></Link>

                }

                {
                    user == null ? <Link to="/login">Login</Link> : <Link onClick={()=>{
                        localStorage.clear()
                        window.location.reload()
                    }}>Logout</Link>

                }
            </div>
        </div>
    )
}

export default Navbar
