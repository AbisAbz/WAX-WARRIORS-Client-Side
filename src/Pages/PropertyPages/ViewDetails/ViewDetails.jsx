import React from 'react'
import PropertyViewDetails from '../../../Components/PropertyComponents/PropertyViewDetails'
import ServiceList from '../../../Components/PropertyComponents/ServiceList'

function ViewDetails() {
  return (
    <div >
      <PropertyViewDetails />
      <div className='mt-10 '>
      <ServiceList />
      </div>
      

    </div>
  )
}

export default ViewDetails