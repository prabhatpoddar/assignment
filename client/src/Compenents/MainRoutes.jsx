import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Employee from '../Pages/Employee'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'

const MainRoutes = () => {
  const Token = (child) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    if (token != null && isAdmin === "admin") {
      return child;
    } else {

      return <Navigate to="/login" />
    }}
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/employee" element={Token(<Employee/>)}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default MainRoutes
