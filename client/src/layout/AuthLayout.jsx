import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
      >
        
        <Outlet/>
        </form>
    </div>
  )
}

export default AuthLayout