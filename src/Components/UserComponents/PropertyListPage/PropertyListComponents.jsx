import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GenerateError } from '../../../Toast/Toast'
import "./PropertyListComponents.css"


export default function PropertyListComponents({propData}) {

  const navigate = useNavigate();

  const isLogin = () => {
    console.log("iam abis abz ");
     const userLogin = localStorage.getItem('userToken')
     if(userLogin)  navigate('/singleproperty2');
     else GenerateError('You must be need to Login')
  }

  return (
    <>
      {propData && propData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-x-2 main-sectioon mb-8 mt-5 mx-auto md:mx-14">
          {propData.map((item, index) => (
            <div
              key={index}
              className="max-w-sm bg-white shadow-lg transition-transform hover:scale-105 duration-300 border border-[#00000027] rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <img 
                  className="object-fill h-[210px] w-full rounded-t-md"
                  src={item.images[1]} 
                  alt=""
                />
              </div>
              <div className="p-5">
                <h6 className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                  {item.propertyName} 
                </h6>
                <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                  {item.state}, {item.district}, {item.location} 
                </p>
                <span className="font-normal text-sm leading-3 tracking-tighter text-[#959595]">
                  {item.mobile}
                </span>
                <div className="mt-4">
                  <hr className="border-1 border-gray-400" />
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <div className="pt-3 sm:pt-0">
                    <Button
                      className="h-10 border-solid rounded-md border border-[#000] transition ease-in-out delay-10  hover:bg-[#000] hover:text-white duration-20"
                      size="sm"
                      variant="text"
                      onClick={isLogin}
                    >
                      View property
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
       )}
    </>
  );
  
}
