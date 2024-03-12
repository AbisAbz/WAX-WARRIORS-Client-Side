import React, { useState } from 'react';
import MultiLevelSidebar from '../../Components/PropertyComponents/PropertySidebar';
import Header from '../../Components/PropertyComponents/PropertyHeader';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function AdminLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const hideSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <div className='h-screen flex flex-col'>
        <Header />
        <div className='flex-1 flex flex-col md:flex-row'>
          <button
            className='md:hidden bg-black shadow-xl shadow-blue-gray-900 text-white px-3 py-2'
            onClick={toggleSidebar}
          >
            {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
          <div className={`md:flex ${showSidebar ? '' : 'hidden'}`} onClick={hideSidebar}>
            <MultiLevelSidebar />
          </div>
          <div className='flex-1 overflow-y-auto p-4 md:pl-8'>
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AdminLayout;
