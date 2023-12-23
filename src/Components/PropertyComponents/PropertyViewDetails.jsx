import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { propertyView } from '../../Api/PropertyApi'
import AddServices from '../../Components/PropertyComponents/AddServices'

const products = [
  {
    id: 1,
    name: 'Car Wash Service',
    description: 'Premium car wash service with interior detailing.',
    price: '$29.99',
    country: 'United States',
    state: 'California',
    location: 'San Francisco',
    district: 'SF District',
    slot: 3,
  },
  {
    id: 2,
    name: 'Oil Change',
    description: 'Quick and efficient oil change service for your vehicle.',
    price: '$39.99',
    country: 'United States',
    state: 'New York',
    location: 'New York City',
    district: 'NYC District',
    slot: 2,
  },
  // Add more products as needed
];

const ProductViewPage = () => { 
  const [propDetails, setPropDetails] = useState()
  const { state } = useLocation();
  const { _id }  = state;
  
  
  useEffect(() => {
    const fetchpropData = async() =>{
      try {
        const response = await propertyView(_id)
        if(response) setPropDetails(response.data.data)

      } catch (error) {
        console.log(error);
      }
    }
    fetchpropData();
  },[]) 


  const [selectedProductId, setSelectedProductId] = useState(1);
  const selectedProduct = products.find((product) => product.id === selectedProductId);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-md shadow-md">
        {propDetails ? (
          <>
            <h2 className="text-3xl font-bold mb-4">{propDetails.propertyName}</h2>
            <p className="text-gray-500 mb-2">{propDetails.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 mb-2">Country: {propDetails.country}</p>
                <p className="text-gray-500 mb-2">State: {propDetails.state}</p>
                <p className="text-gray-500 mb-2">Location: {propDetails.location}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-2">District: {propDetails.district}</p>
                <p className="text-gray-500 mb-2">Slot: {propDetails.slot}</p>
                <p className="text-gray-500 mb-2">Mobile: {propDetails.mobile}</p>
                
              </div>
            </div>
            <AddServices  id={propDetails._id}/>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductViewPage;
