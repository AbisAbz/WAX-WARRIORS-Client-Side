import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { fetchAllBookingsApi } from '../../Api/PropertyApi';
import img from '../../assets/UsserAssets/bohemian-man-with-his-arms-crossed.jpg'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
 

 
const TABLE_HEAD = ["CUSTOMER", "PROPERTY NAME", "PROPERTY LOCATION", "CUSTOMER NO:", "SERVICE", "DATE", "TIME", "STATUS"];
 
 
export default function BookingsList() {
const [allBooking, setAllBookings] = useState()
const [loading, setLoading] = useState(false)
const  { id}  = useSelector((state) => state.owner);





    useEffect(() => {
        const fetchAllBookings = async() => {
           const response = await fetchAllBookingsApi({id:id});
           console.log("iam the response ", response.data.data);
           setAllBookings(response.data.data)
           setLoading(true)

        }
        fetchAllBookings();
    },[id])

    
  return (
    <>
    {loading ? (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Your Booking List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all property bookings
            </Typography>
          </div>
        </div>
      </CardHeader >
      <CardBody className="overflow-scroll px-0 pt-0">
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
            {allBooking && allBooking.map((item, index) => {
                const isLast = index === allBooking.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt="" size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.UsersId.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {item.UsersId.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.propertyId.propertyName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.propertyId.location}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.UsersId.mobile}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.bookingService}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.date}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.time}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <Typography
                        variant="small"
                        color={
                          item.bookingStatus === "success" ? "green" : "red"
                        }
                        className="font-normal"
                        value={
                          item.bookingStatus === "success"
                            ? "success"
                            : "cancel"
                        }
                      >
                        {item.bookingStatus }
                      </Typography>
                    </td>
                  </tr>
                );
              },
            )}
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
    ) : (
        <div className="w-full h-screen flex justify-center items-center">
  <h1>Loading...</h1>
</div>


    )}
    </>
  );
}
