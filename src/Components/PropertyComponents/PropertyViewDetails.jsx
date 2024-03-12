import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import { propertyView } from '../../Api/PropertyApi'; // Assuming propertyView is correctly implemented
import ServiceList from './ServiceList';
import EditPropertyDetails from './EditPropertyDetails';
import { hidePropertyApi } from '../../Api/PropertyApi';
import { GenerateSuccess } from '../../Toast/Toast';
import eventBus from './EvenyBus';

const ProductViewPage = () => {
  const [propDetails, setPropDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { _id } = state;

  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchPropData = async () => {
      try {
        const response = await propertyView(_id)
        if (response && response.data && response.data.data) {
          setPropDetails(response.data.data);
          setLoading(true);
          setRefresh(false)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPropData();
  }, [_id, refresh])

  const receiveDataFromChild = (data) => {
    setRefresh(data);
  };

  useEffect(() => {
    const onDataEvent = (data1, data2) => {
      setRefresh(data1);
    };
  
    eventBus.addListener('dataEvent', onDataEvent);
  
    return () => {
      eventBus.removeListener('dataEvent', onDataEvent);
    };
  }, []);

  const hideProperty = async() => {
    const response = await hidePropertyApi({id: _id})
    GenerateSuccess(response.data.message)
    setRefresh(true)

     
  }
  

  return (
    <>
      {loading ? (
        <div>
        <div className="p-4  shadow-lg shadow-blue-gray-200 md::ml-64">
          <div className="p-4 rounded-lg dark:border-gray-700 md::mt-16">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:rounded-lg">
              <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="p-6 grid grid-cols-2 gap-3">
                  <div>
                    <Typography
                      variant="h5"
                      className="font-san mb-2 font-normal leading-6 tracking-tight text-[#1e1e1e]"
                    >
                      Property name
                    </Typography>
                    <Typography className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                      {propDetails.propertyName}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-san mb-2 font-normal leading-6 tracking-tight text-[#1e1e1e]"
                    >
                      District
                    </Typography>
                    <Typography className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                      {propDetails.district}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-san mb-2 font-normal leading-6 tracking-tight text-[#cc5656]"
                    >
                      Opening Time
                    </Typography>
                    <Typography className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      {propDetails.openingTime}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-san mb-2 font-normal leading-6 tracking-tight text-[#1e1e1e]"
                    >
                      Mobile number
                    </Typography>
                    <Typography className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      {propDetails.mobile}
                    </Typography>
                  </div>
                  <div>
                  <Typography
                      variant="h5"
                      className="font-san mb-2 font-normal leading-6 tracking-tight text-[#1e1e1e]"
                    >
                      State
                    </Typography>
                    <Typography className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                      {propDetails.state}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-san mb-2 font-normal leading-6 tracking-tight text-[#1e1e1e]"
                    >
                      Number of Slot
                    </Typography>
                    <Typography className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                      {propDetails.slot}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-san mb-2 font-normal leading-6 tracking-tight text-[#c44d4d]"
                    >
                      Closing Time
                    </Typography>
                    <Typography className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      {propDetails.closingTime}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-san mb-2 font-normal leading-6 tracking-tight text-[#1e1e1e]"
                    >
                      Location
                    </Typography>
                    <Typography className="mb-4 font-light text-gray-700 dark:text-gray-400">
                      {propDetails.location}
                    </Typography>
                  </div>
                </div>
                <div className="pl-6 pb-5 flex gap-4">
                   <EditPropertyDetails  propDetails={propDetails} sendDataToChild={receiveDataFromChild}/>
                  {propDetails.is_visible  ?(
                                      <Button variant="outlined" 
                                      className='hover:ring-offset-red-300 shadow-lg shadow-transparent'
                                      onClick={hideProperty}
                                      >
                                        Hide property
                                      </Button>
                  ) : (
                    <Button variant="outlined" 
                    className='hover:ring-offset-red-300 shadow-lg shadow-transparent'
                    onClick={hideProperty}
                    >
                      Visible Property
                    </Button>

                  )}
                </div>
              </div>
              <div className="sm:col-span-1">
                <img
                  className="object-cover w-full h-full  md:w-full"
                  src={propDetails.images[1]}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

              <div >
                     <ServiceList  id={_id}/>
                     </div>
              </div>

      ) : (
        <div className="p-4 sm:ml-64 shadow-lg shadow-blue-gray-200">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};

export default ProductViewPage;
