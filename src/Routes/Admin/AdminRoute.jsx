import { Routes, Route } from "react-router-dom";
import Login              from '../../Pages/AdminPages/Login/Login'
import React               from 'react'
import AdminLayout          from "../../Layouts/AdminLayout/AdminLayout";
import Home                from '../../Pages/AdminPages/Home/Home'
import UserList           from '../../Pages/AdminPages/UserListPage/UserListPage'
import AdminPublic      from "./Public/AdminPublic";
import AdminProtect   from "./Protect/AdminProtect";
import PropertyList from "../../Components/AdminComponents/PropertyList"
export default function AdminRoute() {
  return (
    
    <Routes>
       <Route element={<AdminPublic />}>
       <Route  path="/login" element={<Login />} />
       </Route>
       <Route element={<AdminProtect />}>
       <Route path="/" element={<AdminLayout/>} >
        <Route path="/" element={<Home />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/propertylist" element={<PropertyList />} />
        </Route>
        </Route>

    </Routes>
    
  )
}

