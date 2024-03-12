import { Route, Routes }   from  'react-router-dom';
import Login              from '../../Pages/PropertyPages/Login/Login'
import Signup            from '../../Pages/PropertyPages/Signup/Signup'
import PropertyPublic   from '../Property/Public/PropertyPublic';
import PropertyProtect from '../Property/Protect/PropertyProtect';
import PropertyLayout from '../../Layouts/PropertyLayout/PropertyLayout'
import Home          from '../../Pages/PropertyPages/Home/Home'
import Profile      from '../../Pages/PropertyPages/Profile/ProfilePage'
import ViewDetails from '../../Pages/PropertyPages/ViewDetails/ViewDetails';
import BookingsListPage from '../../Pages/PropertyPages/BookingList/BookingsListPage';
import DashboardPage from '../../Pages/PropertyPages/Dashboard/DashboardPage';
import React from 'react'
               
export default function PropertyRoute() {
    return(
     
        <Routes>
            <Route element={<PropertyPublic />} >
           <Route path="/login" element={<Login />}/>
           <Route path="/signup" element={<Signup />} />
           </Route>
           
           <Route element={<PropertyProtect />}>

            <Route path="/" element={<PropertyLayout />}>
            <Route  path="/" element={<DashboardPage />}/>
            <Route path="/:id/:token" element={<DashboardPage />} /> 
            <Route path='/profile' element={<Profile />} />
            <Route path='/view' element={<ViewDetails />} />
            <Route path='/bookinglist' element={<BookingsListPage />} />
             
            </Route>
           

           </Route>

        </Routes>



    )
 
}

