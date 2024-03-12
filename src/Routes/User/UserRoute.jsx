import { Routes, Route } from "react-router-dom";
import Signup from '../../Pages/UserPages/Signup/Signup'
import Login from '../../Pages/UserPages/Login/Login'
import UserPublic from './Public/UserPublic'
import UserProtect from "./Protect/UserProtect";
import Home from "../../Pages/UserPages/Home/Home2";
import UserLayout from "../../Layouts/UserLayout/UserLayout";
import PropertyList from "../../Pages/UserPages/PropertyList/PropertyList";
import SinglePropertyPage from "../../Pages/UserPages/SingleProperty/SinglePropertyPage";
import UserProfile from "../../Pages/UserPages/Profile/UserProfile";
import CheckOutFormPage from "../../Pages/UserPages/CheckOutForm/CheckOutFormPage";
import SuccessPage from "../../Pages/UserPages/SuccesPage/SuccessPage";
import BookingSummary from "../../Components/UserComponents/BookingSummaryComponents/BookingSummary";
import SummaryViewDetailsPage from "../../Pages/UserPages/SummaryViewDetailsPage/SummaryViewDetailsPage";
import React from 'react'

export default function UserRoute() {
  return (
    <Routes>
      <Route   element={<UserPublic />} > 
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Route>
                                                                   
      <Route path="/" element={<UserLayout />} > 
                                                                   
      <Route path="/" element={<Home />} /> 
      <Route path="/profile" element={<UserProtect> <UserProfile /> </UserProtect> } /> 
      <Route path="/propertylist" element={ <UserProtect> <PropertyList />  </UserProtect>} /> 
      <Route path="/singleproperty" element={ <UserProtect><SinglePropertyPage /></UserProtect>} /> 
      <Route path="/checkoutpage" element={ <UserProtect><CheckOutFormPage />  </UserProtect>} /> 
      <Route path="/success" element={ <UserProtect><SuccessPage />  </UserProtect>} /> 
      <Route path="/summary" element={ <UserProtect><BookingSummary />  </UserProtect>} /> 
      <Route path="/summaryview" element={ <UserProtect><SummaryViewDetailsPage />  </UserProtect>} /> 
      <Route path="/:id/:token" element={<Home />} /> 
                                                                   
      </Route>
                                                                   
    </Routes>
  );
}




