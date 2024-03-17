import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Avatar, 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  CardHeader, 
  Chip, 
  Typography, 
   } from "@material-tailwind/react";
import { fetchPropData } from '../../Api/AdminApi';
import { propAprove } from '../../Api/AdminApi'
import  DialogDefault from '../AdminComponents/RejectModal'
import {EyeIcon} from "@heroicons/react/24/solid"

function PropertyList() {
   const [status, setStatus] = useState(false)
   const [propData, setPropData] = useState([])
   const [switchbtn, setSwitchbtn] = useState("Approved") 
    const TABLE_HEAD = [" Property Name " , " Country ", "State", "View","Status", "Action"];

    useEffect(() => {

        const fetchData = async() => {
            try {
                const response = await fetchPropData()
                if(response) setPropData(response.data.filtredPropData);
                setStatus(false)

            } catch (error) {
                console.log("error in the useEffect ", error);
            }
        }
        fetchData();
         
    },[status, switchbtn])

    const aproveFunc = async(id) =>{
       try {
         const response = await propAprove(id)
          if(response) setStatus(true);

       } catch (error) {
        console.log("error in the useEffect ", error);
       }
    }

    function rejectFunc(rejectRes) {
      setStatus(rejectRes)
    }

    const handleTabClick = (newSwitchValue) => {
      setSwitchbtn(newSwitchValue);
    };


  return (
    <div>
         <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              PROPERTY LIST
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Properties
            </Typography>
          </div>

        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {propData.map((user) => (
              <tr key={user.propertyName}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.images[2]}  size="sm" />
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.propertyName}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.country}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.state}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
          <EyeIcon className='h-7 w-7 text-brown-500 cursor-pointer'/>

                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={user.status}
                      color={ user.status === 'approved' ? 'green' : user.status === 'Rejected' ? 'red' : ''
                    }
                    />
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                     {user.status === 'Pending' && (
                  <div className='flex'>
                             <div className="w-max">
                                 <Button
                    className="bg-light-green-600 rounded-md font-medium"
                    size="sm"
                    onClick={() => aproveFunc(user._id)}
                                 >
                                     Approve
                                 </Button>
                             </div>
                             <div className="w-max ml-8">
                                 <DialogDefault id={user._id} rejectFunc={rejectFunc} />
                             </div>
                         </div>
                     )}
                 </td>

                 
                </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default PropertyList