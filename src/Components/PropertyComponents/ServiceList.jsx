import React,{useEffect, useState} from 'react'
import { Button, Chip } from "@material-tailwind/react";
import { fetchAllService } from '../../Api/PropertyApi'

function ServiceList() {
       const [serviceData, setServiceData] = useState([])
        const [status, setStatus] = useState(false)

        function propFunc(){
            setStatus(true)
        }

       useEffect(() => {
        const fetchServiceData = async() => {
            try {
                const response = await fetchAllService();
                 if(response) setServiceData(response.data.data);
                 setStatus(false);
            } catch (error) {
                console.log('iam the error in the useEffect ', error);
            }
        }
        fetchServiceData();
       },[status])
       
  return (
    <div className="px-4 pb-5">
    <div className="px-4 rounded-md dark:border-gray-700">
      <div className="w-full grid grid-cols-1 bg-white border border-gray-200 rounded-lg shadow">

        <div className="p-3 px-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {serviceData.map((items, index) => {
              const {
                serviceName,
                price,
                description,
              } = items;
              return (
                <div
                  key={index}
                  className="max-w-sm  bg-white   border border-[#00000027] rounded-md  dark:bg-gray-800 dark:border-gray-700"
                >
                   <Chip
                    variant="ghost"
                    size="sm"
                    color={ "red"}
                    className="rounded-none"
                  />
            <div className="p-5">
              <h6 className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
              {serviceName}
              </h6>
              <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
              {price}
              </p>

              <div className="mt-4">
                <hr className="border-1 border-gray-400" />
              </div>
              <div className="mt-5 flex justify-between items-center">
                <div>
                  <h5 className="ont-san text-2xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                  {description}
                  </h5>
                </div>
              </div>
            </div>
          </div>
                        );
                    })}
        </div>
      </div>
    </div>
  </div>
 )
  }

export default ServiceList