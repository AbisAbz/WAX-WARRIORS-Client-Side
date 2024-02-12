import react,{ useState, useEffect } from 'react';
import { Rating } from "@material-tailwind/react";
import PropertyListComponents from './PropertyListComponents';
import { fetchPropertiesApi } from '../../../Api/UserApi';



function PropertySortComponents() {
  const [propertyList, setPropertylist] = useState()
  
  useEffect(() => {
     const fetchProperties = async() => {
       try {
         const response = await fetchPropertiesApi()
         setPropertylist(response.data.data)

       } catch (error) {
        console.log("error from the useEffect of FetchProp ", error);
       }
     }
     fetchProperties();
  },[])

    const [activeLowToHighButton, setActiveLowToHighButton] = useState(true)
    // const [activeHighToLowButton, setActiveHighToLowhButton] = useState(false)
  return (
    <>
   <div className="flex flex-col md:flex-row items-center md:items-start justify-between md:ml-8 mt-10">
  <div className="md:mr-4 mb-2 md:mb-0 flex">
    Sort by Rating : 
    <div className='h-8 w-32 bg-white border border-brown-100  ml-3 shadow-md flex items-center justify-center'>
    <Rating />
    </div>
     
  </div>

  {/* For screens below 280 x 653 */}
  <div className="lg:mr-6 xl:mr-6 s mb-2">
  <div className="mb-2 flex items-center">
    <div className="mr-2">Sort by Price :</div>
    <button
  onClick={() => setActiveLowToHighButton(true)}
  className={`bg-white border ${
    activeLowToHighButton
      ? "border-blue-500 bg-blue-200"
      : "border-gray-500 hover:border-gray-400"
  } px-4 py-2 rounded-md leading-tight focus:outline-none focus:shadow-outline`}
>
  Low to High
</button>
<button
  onClick={() => setActiveLowToHighButton(false)}
  className={`ml-2 bg-white border ${
    activeLowToHighButton
      ? "border-gray-500 hover:border-gray-400"
      : " border-blue-500 bg-blue-200"
  } px-4 py-2 rounded-md leading-tight focus:outline-none focus:shadow-outline`}
>
  High to Low
</button>

  </div>
</div>  
</div>
 <PropertyListComponents  propData={propertyList} />
    </>
  );
}

export default PropertySortComponents;
