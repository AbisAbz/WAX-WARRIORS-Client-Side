import React, {useState, useEffect} from 'react'
import { Typography, Button } from "@material-tailwind/react";
import { fetchPropertyToHome } from '../../Api/UserApi';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import './UserComponentCss/DisplayShops-HomePage.css'
import { GenerateError } from '../../Toast/Toast';
import { useNavigate } from 'react-router-dom';
import '../../Pages/UserPages/Home/Home.css'

function DisplayShopsHomePage() {
  const [propDatas, setPropDatas] = useState([])
  const [scroll,setScroll] = useState(0)
 
  useEffect(() => {
   const fetchProperty = async() => {
     try {
       const response = await fetchPropertyToHome()
       setPropDatas(response.data.data)
     } catch (error) {
      console.log(error);
     }
   }
   fetchProperty();
  },[])

  const navigate = useNavigate();

  const propertyScrollLeft = () =>{
    const container = document.getElementById("propertyScrollHandler")
    setScroll(scroll - container.offsetWidth * 0.4)
    container.scrollLeft -= container.offsetWidth * 0.4
  }
  const propertyScrollRight = () =>{
    const container = document.getElementById("propertyScrollHandler")
    setScroll(scroll + container.offsetWidth * 0.4)
    container.scrollLeft += container.offsetWidth * 0.4
  }

  return (
    <>
    <div className="main-sparation">
      <div className="contai-section">
        <div className="pb-6">
          <Typography className="text-[#1e1e1e] font-fmaily">
            Best rated
          </Typography>
        </div>
        <div className="flex gap-5 overflow-x-auto propertyScroll" id="propertyScrollHandler">
          {propDatas && propDatas.map((item, index) => {
            const { images, propertyName, state, district , mobile } = item;
            return (
             
                <div key={index} className=" sahdow flex-shrink-0 mt-5 max-w-[300px] shadow-lg shadow-black transition-transform  hover:scale-105 duration-300 bg-transparent  border-[#00000027] rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                  <img 
                  className="object-fill h-[210px] w-full rounded-t-md"
                  src={images[0]} 
                  alt=""
                />
                  </a>
                  <div className="p-5 mt-[2.5]">
                    <a href="#">
                      <h6 className="font-san mb-1 text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                        {propertyName}
                      </h6>
                    </a>
                    <p className="font-normal text-xs text-[#959595]">
                      {state},{district}
                    </p>
                    <div className="mt-7 flex justify-between items-center">
                      <div>
                        <h5 className="ont-san text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                          {mobile}
                        </h5>

                      </div>
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
        <div className="flex justify-between">
          <ChevronLeftIcon className=" invisible md:visible h-10 w-10 rounded-lg bg-[#0000008a] text-blue-gray-200 hover:bg-black -ms-5 -mt-44 z-30 border-2 border-blue-gray-200 cursor-pointer" onClick={propertyScrollLeft}/>
          <ChevronRightIcon className="invisible md:visible h-10 w-10 -mt-44 z-30 -me-5 rounded-lg bg-[#0000008a] text-blue-gray-200 hover:bg-black border-2 border-blue-gray-200 cursor-pointer" onClick={propertyScrollRight}/>
        </div>
      </div>
    </div>
    <div className='pt-5'>

    </div>
  </>
  
  )
}

export default DisplayShopsHomePage