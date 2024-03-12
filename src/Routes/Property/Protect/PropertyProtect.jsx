import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PropertyProtect() {
    const loggedIn = localStorage.getItem('subAdminToken')
    if(loggedIn){
        return <Outlet />
    }else{
        return <Navigate to='/property/login' />
    }
}

export default PropertyProtect