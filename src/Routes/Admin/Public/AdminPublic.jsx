import { Navigate, Outlet } from "react-router-dom";


import React from 'react'

function AdminPublic() {
    const loggedIn = localStorage.getItem('adminToken')

    if(loggedIn){
        return <Navigate to='/admin' />;
    }else{
       return <Outlet />;
    }
}

export default AdminPublic