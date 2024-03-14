import { Button, Rating } from "@material-tailwind/react";
import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { GenerateError } from '../../../Toast/Toast'
import { fetchAllPropRatingApi } from "../../../Api/UserApi";
import image1 from '../../../assets/UsserAssets/loading-bar_4461744.png'
import "./PropertyListComponents.css"


export default function PropertyListComponents({propertyList}) {
 

  const navigate = useNavigate();

  

  return (
    <>
      {propertyList ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-x-2 main-sectioon mb-8 mt-10 mx-auto md:mx-14">
          {propertyList.map((item, index) => {
            const { images, propertyName, state, district, location , mobile,_id, avgRating } = item;
            return (
              <div
                key={index}
                className="max-w-sm bg-white shadow-lg transition-transform hover:scale-105 duration-300 border border-[#00000027] rounded-md dark:bg-gray-800 dark:border-gray-700"
              >
                <div>
                  <img 
                    className="object-fill h-[210px] w-full rounded-t-md"
                    src={images[0]} 
                    alt=""
                  />
                </div>
                <div className="p-5">
                  <h6 className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                    {propertyName} 
                  </h6>
                  <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                    {state}, {district}, {location} 
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <span className="font-normal text-sm leading-3 tracking-tighter text-[#959595]">
                      {mobile}
                    </span>
                    <Rating value={avgRating}/>
                  </div>
                  <div className="mt-4">
                    <hr className="border-1 border-gray-400" />
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <div className="pt-3 sm:pt-0">
                      <Button
                        className="h-10 border-solid rounded-md border border-[#000] transition ease-in-out delay-10  hover:bg-[#000] hover:text-white duration-20"
                        size="sm"
                        variant="text"
                        onClick={() => {
                          if (localStorage.getItem("userToken")) {
                            navigate(`/singleproperty`, { state: { item } });
                          } else {
                            GenerateError("you must be need to  login");
                          }
                        }}
                      >
                        View property
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <img 
            className="h-36 w-36"
            src={image1} alt="" 
          />
        </div>
      )}
    </>
);
  
}
