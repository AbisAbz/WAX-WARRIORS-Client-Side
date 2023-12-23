import React from 'react'
import Header from '../../Components/UserComponents/UserHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/UserComponents/UserFooter'
import { ToastContainer } from 'react-toastify'

function UserLayout() {
  return (

   <>
   <Header />
   <Outlet />
   <Footer />
   <ToastContainer />

   </>

  )
}

export default UserLayout