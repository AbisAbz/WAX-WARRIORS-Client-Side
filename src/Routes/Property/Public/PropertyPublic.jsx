import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PropertyPublic() {
   const loggedIn = localStorage.getItem('subAdminToken')
   if(loggedIn){
        return <Navigate to='/property' />
   }else{
     return <Outlet />
   }
}

export default PropertyPublic 