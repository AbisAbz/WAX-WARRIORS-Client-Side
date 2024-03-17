import react,{ useState, useEffect } from 'react';
import { Rating } from "@material-tailwind/react";
import PropertyListComponents from './PropertyListComponents';
import { fetchPropertiesApi } from '../../../Api/UserApi';
import { GenerateError } from '../../../Toast/Toast';



function PropertySortComponents({ search }) {
  const [propertyList, setPropertylist] = useState()
  const [rating, SetRating]  =useState(0)
  
  useEffect(() => {
     const fetchProperties = async() => {
       try {
          const response = await fetchPropertiesApi({rating:rating, search:search})
          GenerateError(response.data.message)
          setPropertylist(response.data.data)

       } catch (error) {
        console.log("error from the useEffect of FetchProp ", error);
       }
     }
     fetchProperties();
  },[rating, search])

    const [activeLowToHighButton, setActiveLowToHighButton] = useState(true)
    // const [activeHighToLowButton, setActiveHighToLowhButton] = useState(false)
  return (
    <>
   <div className="flex flex-col md:flex-row items-center md:items-start justify-between md:ml-8 mt-10">
  <div className="md:mr-4 mb-2 md:mb-0 flex">
    Sort by Rating : 
    <div className='h-8 w-32 bg-white border border-brown-100  ml-3 shadow-md flex items-center justify-center'>
    <Rating 
    onChange={(value) => SetRating(value)}
    value={rating} 
    />
    </div>
     
  </div>

</div>
 <PropertyListComponents  propertyList={propertyList} />
    </>
  );
}

export default PropertySortComponents;
