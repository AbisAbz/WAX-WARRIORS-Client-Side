import React,{useState, useEffect} from "react";
import { fetchPropertyOwner } from '../../Api/PropertyApi'
import { Carousel } from '@material-tailwind/react'

function dummyImage() {

    const [ownerPropDatas, setOwnerPropDatas] = useState([])
    console.log("iam the ownerPropDatas state ", ownerPropDatas);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("iam in the useEffect ");
                const response = await fetchPropertyOwner();
                setOwnerPropDatas(response.data.data);

                // Process the response as needed
            } catch (error) {
                console.log("Error from the fetchPropertyOwner ", error);
            }
        }
    
        fetchData();  // Invoke the fetchData function
    
    }, []);
    

  return (

    <div>
    <h1>Hello Abis</h1>
    {ownerPropDatas.length > 0 && (
        <div>
            <h2>{ownerPropDatas[0].propertyName}</h2>
            <h2>{ownerPropDatas[0].mobile}</h2>
            <Carousel loop={true} autoplay={true} className="rounded-xl">
            {ownerPropDatas[0].images.length > 0 && (
    ownerPropDatas[0].images.map((image, index) => (
        <img key={index} src={image} alt={`Property Image ${index + 1}`} />
    ))
)}

</Carousel>

        </div>
    )}
</div>


  )
}

export default dummyImage

