import React from 'react'
import { Outlet } from 'react-router-dom';
import { Login } from '../../pages/auth/Login';

export const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <div>{ isAuthenticated ? <Outlet/> : <Login/> }</div>
  )
}
