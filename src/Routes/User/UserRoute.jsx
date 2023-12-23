import { Routes, Route } from "react-router-dom";
import Signup from '../../Pages/UserPages/Signup/Signup'
import Login from '../../Pages/UserPages/Login/Login'
import UserPublic from './Public/UserPublic'
import Home from '../../Pages/UserPages/Home/Home'
import UserLayout from "../../Layouts/UserLayout/UserLayout";
import MainHome from "../../Components/UserComponents/MainHome";
import React from 'react'

export default function UserRoute() {
  return (
    <Routes>
      <Route   element={<UserPublic />} > 
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Route>
      
      <Route path="/profile" element={<MainHome />} /> 
      <Route path="/" element={<UserLayout />} > 
      <Route path="/" element={<Home />} /> 

      <Route path="/:id/:token" element={<Home />} /> 
      </Route>

    </Routes>
  );
}




