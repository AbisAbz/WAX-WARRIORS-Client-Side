import { Navigate } from "react-router-dom";


import React from 'react'

export default function UserProtect() {
     
    if(localStorage.getItem('token')) return props.children

    else return <Navigate to='/' />

}

