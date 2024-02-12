import { Routes, Route } from "react-router-dom";
import Signup from '../../Pages/UserPages/Signup/Signup'
import Login from '../../Pages/UserPages/Login/Login'
import UserPublic from './Public/UserPublic'
import Home from "../../Pages/UserPages/Home/Home2";
import UserLayout from "../../Layouts/UserLayout/UserLayout";
import PropertyList from "../../Pages/UserPages/PropertyList/PropertyList";
import SinglePropertyIMage from "../../Pages/UserPages/SingleProperty/SinglePropertyIMage";
import SinglePropertyPage from "../../Pages/UserPages/SingleProperty/SinglePropertyPage";
import ProfileComponent from "../../Components/UserComponents/ProfilePageComponents/ProfileComponent";
import StudyComponents from "../../Components/UserComponents/StudyComponents";
import React from 'react'

export default function UserRoute() {
  return (
    <Routes>
      <Route   element={<UserPublic />} > 
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Route>
      
      <Route path="/study" element={<StudyComponents />} /> 
      <Route path="/" element={<UserLayout />} > 

      <Route path="/" element={<Home />} /> 
      <Route path="/profile" element={<ProfileComponent />} /> 
      <Route path="/propertylist" element={<PropertyList />} /> 
      <Route path="/singleproperty" element={<SinglePropertyPage />} /> 
      <Route path="/singleproperty4" element={<SinglePropertyIMage />} /> 
      <Route path="/:id/:token" element={<Home />} /> 

      </Route>

    </Routes>
  );
}




