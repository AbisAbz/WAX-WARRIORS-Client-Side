import { Button, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import React,{ useState, useEffect } from 'react'
import PropertyAddingFrom from './PropertyAddingFrom';
import { useSelector } from 'react-redux';
import { fetchProperties } from '../../Api/PropertyApi'



export default function PropertyList() {
  const Navigate = useNavigate();
  const owner = useSelector((state) => state.owner)
  const [propList, setPropList] = useState(false)
  const [propertyData, setPropData] = useState([])
  
   function propFunc(para){
    setPropList(para)
  }

  useEffect(() => {
     const fetchProp = async() => {
       try {
          const response = await fetchProperties(owner)
          if(response) setPropData(response.data.data)
          setPropList(false)
       } catch (error) {
        console.log(error);
        
       }
     }
     fetchProp();
  },[propList]) 

  return (
    <div className="px-4 pb-5">
      <div className="px-4 rounded-md dark:border-gray-700">
        <div className="w-full grid grid-cols-1  bg-white border border-gray-200 rounded-lg shadow">
          <div className="p-5 flex justify-end">
    <PropertyAddingFrom  propFunc={propFunc}/>
    </div>
          <div className="p-3 px-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {propertyData.map((items, index) => {
              const {
                images,
                _id,
                propertyName,
                state,
                country,
                status,
              } = items;
              return (
                <div
                  key={index}
                  className="max-w-sm  bg-white   border border-[#00000027] rounded-md  dark:bg-gray-800 dark:border-gray-700"
                >
                   <div>
                     <img
                       className="object-fill h-[210px] w-full rounded-t-md"
                       src={images[0]}
                       alt=""
                     />
                    
                  </div>
                   <Chip
                    variant="ghost"
                    size="sm"
                    value={status}
                    color={ "red"}
                    className="rounded-none"
                  />
                  <div className="p-5">
                    <h6 className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                      {propertyName}
                   
                    </h6>
                    <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                      {country}
                    </p>
                   
                    <div className="mt-4">
                      <hr className="border-1 border-gray-400" />
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                      <div> 
                        <h5 className="ont-san text-2xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                           {state}
                        </h5>
                      </div>
                      <div className="pt-3 sm:pt-0">
                        <Button
                          className="h-10 border-solid rounded-md border border-[#000] transition ease-in-out delay-10  hover:bg-[#000] hover:text-white duration-20"
                          size="sm"
                          variant="text"
                          onClick={() =>
                            Navigate(`/property/view/`, { state: { _id } })
                          }
                        >
                          View details
                        </Button>
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


