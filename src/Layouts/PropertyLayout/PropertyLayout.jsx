import React from 'react'
import DefaultSidebar from '../../Components/PropertyComponents/PropertySidebar'
import Header from '../../Components/PropertyComponents/PropertyHeader'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


function AdminLayout() {
  return (
    <>
    <div className='h-screen grid grid-rows-[5rem] md:grid-rows-[5rem, 1fr]'>
      <div>
        <Header />
      </div>
      <div className='md:grid md:grid-cols-[18.7rem,1fr]'>
        <div className='hidden md:flex md:justify-center md:items-center'>
          <DefaultSidebar />
        </div>
        <div className='md:ml-4 md:items-center'>
          <div className='h-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>

    <ToastContainer />
  </>
  )
}

export default AdminLayout