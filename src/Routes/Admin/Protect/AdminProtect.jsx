import { Navigate, Outlet } from "react-router-dom";

import React from 'react'

function AdminProtect() {
  const loggedIn  = localStorage.getItem('adminToken');
  if(loggedIn){
    return <Outlet />;
  }else{
    return  <Navigate to='/admin/login' />;
  }
}

export default AdminProtect