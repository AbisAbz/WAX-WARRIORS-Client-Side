import React from 'react'
import Profile from '../../../Components/PropertyComponents/Profile'
import PropertyList from '../../../Components/PropertyComponents/PropertyList'

function ProfilePage() {
  return (
    <div >
      <Profile />
      <div className='mt-10 '>
      <PropertyList />
      </div>
      

    </div>
  )
}

export default ProfilePage