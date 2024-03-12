import React,{useEffect, useState} from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import { fetchAllService } from '../../Api/PropertyApi'
import AddServices from './AddServices';
import DialogDefault from './PropertyFullDetails-Service';

function ServiceList({id}) {
       const [serviceData, setServiceData] = useState([])



       useEffect(() => {
        const fetchServiceData = async() => {
            try {
                const response = await fetchAllService({id:id});
                 if(response) setServiceData(response.data.data);
            } catch (error) {
                console.log('iam the error in the useEffect ', error);
            }
        }
        fetchServiceData();
       },[id])

       
  return (
    <>
     {serviceData.length < 4 && <AddServices id={id} serviceData={serviceData} />}
     <div className="flex gap-5 overflow-x-auto propertyScroll" id="propertyScrollHandler">
    {serviceData &&
      serviceData.map((item, index) => (
        <Card key={index} className="mt-6 w-96 shadow-xl bg-brown-50 shadow-black" style={{ maxWidth: '300px' }}>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.serviceName}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              ₹ {item.price}
            </Typography>
            <Typography>
              {item.description.split(' ').slice(0, 30).join(' ')}
              {item.description.split(' ').length > 30 ? '...' : ''}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <DialogDefault data={item} />
          </CardFooter>
        </Card>
      ))
    }
    </div>

  </>
 )
  }

export default ServiceList