   import React, { useEffect, useState } from "react";
   import {
   Button,
   Dialog,
   DialogHeader,
   DialogBody,
   DialogFooter,
   Select,
   Option,
   } from "@material-tailwind/react";
   import { useFormik } from "formik";
   import DatePicker from 'react-datepicker'
   import { bookingSchema } from "../../../Schema/Authentication";
   import { slotBookingApi } from "../../../Api/UserApi";
   import { useNavigate } from "react-router-dom";
  import moment from "moment-timezone";
   import { GenerateError } from "../../../Toast/Toast";
   import { fetchAllAvailableTimesApi } from "../../../Api/UserApi";
  //  import {  }

   import 'react-datepicker/dist/react-datepicker.css'
                                                                                 

  export default function DialogSizes({service, userId, item, notAvailableSlots}) {
   const [size, setSize] = React.useState(null);
   const [serviceAmount, setServiceAmount] = useState(0)
   const [userBookedDate, setuserBookedDate] = useState(null)
   const [timesAvailable, settimesAvailable] = useState([])

  const navigate = useNavigate();
                                                                                                                                               

       useEffect(() => {
         if(userBookedDate !== null){
        const fetchAllAvailableTimes = async() => {
          try {
            console.log("user booked date", userBookedDate);
            const rightUserBookedDate = moment(userBookedDate).format('DD-MM-YYYY');
            console.log("rechanged the user booked date ", rightUserBookedDate);
  const response = await fetchAllAvailableTimesApi({date:rightUserBookedDate, slot:item.slot, openingTime:item.openingTime, closingTime:item.closingTime, propId:item._id })   
    settimesAvailable(response.data.availableTimes)     
          } catch (error) {
            console.log("iam the error in the Date fetching ", error);
          }
        }

        fetchAllAvailableTimes()
      }
       },[userBookedDate])




  function amount(servicePrice){
    setServiceAmount(servicePrice)
  }
 

                                                                             
const formik = useFormik({
  initialValues:{
    bookDate: '',
    bookTime: '',
    bookServices: '',
    userId: userId,
    propId: item._id,
    PropertyAdminId: item.subAdminId,
    price: null,
  },
  validationSchema:bookingSchema,
  onSubmit:async(values) => {
    try {
      values.bookDate = moment(values.bookDate).format('DD-MM-YYYY');
      values.price = serviceAmount
      const response = await slotBookingApi(values)
      console.log("iam the response booked slot ", response.status);
       if( response.status === 200){
        navigate(`/checkoutpage`, { state: { bookingData: response.data.saveBooking, propertyData: response.data.propertyData , userDetails:response.data.userDetails} });
       }

    } catch (error) {
      console.log("iam the error in the onsubmit Booking ", error);
    }
  }
})
                                                                               

  const handleOpen = (value) => setSize(value);


                                                                                       

  return (
    <>
      <div className="mb-3 flex gap-3 ">
        <Button onClick={() => handleOpen("xxl")} variant="outlinedt"> 
         Book Your Slot 
        </Button>
      </div>
      <Dialog
        open = { size === "xxl" }
        handler={handleOpen}
      >
        <DialogHeader>Book Your Slot ...</DialogHeader>
        <form  className="flex flex-col gap-3" onSubmit={formik.handleSubmit} >
        <DialogBody className="max-h-[400px] overflow-y-auto">
          <div className="col-span-2 row-span-5 col-start-4">
            <div className="h-auto bg-[#EDE3E3] px-5 py-5 shadow-lg rounded-md">

               <div className="my-4 grid grid-cols-2  gap-4">
               
               <div>
              <div className="grid grid-cols-2 w-full rounded-none gap-6">
                <div className="w-52 h-[80px] bg-white hover:bg-gray-200 rounded-md shadow-sm">
                  <div className="m-3">
                  <span className="text-gray-700">Select Your Date </span>
                  <div className="flex">
                  <DatePicker 
                      name="bookDate"
                      selected={formik.values.bookDate}
                      onChange={(date) => {formik.setFieldValue('bookDate', date), setuserBookedDate(date)}}
                      onBlur={formik.handleBlur}
                      className="bg-white mt-1 hover:bg-gray-200 outline-none shadow-sm"
                      minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                      maxDate={new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)}
                    />

                  </div>
                  </div>
                  </div>
                  </div>
                  {formik.touched.bookDate && formik.errors.bookDate && (
                     <div className="text-pink-900 text-sm ml-2">{formik.errors.bookDate}</div>
                   )}
                                  
               </div>
                  
               <div>
  <div className="grid grid-cols-2 w-full rounded-none gap-6">
    <div className="w-52 h-[80px] bg-white hover:bg-gray-200 rounded-md shadow-sm">
      <div className="m-3">
        <span className="text-gray-700"> Select Your Time </span>
        <div className="flex">
          <Select
            variant="standard"
            name="bookTime"
            onChange={(time) => formik.setFieldValue('bookTime', time)}
            onBlur={formik.handleBlur}
            value={formik.values.bookTime}
          >
          {timesAvailable.length > 0 ? (
               timesAvailable.map((time) => (
                 <Option key={time} value={time}>{time}</Option>
               ))
             ) : (
               <div className="bg-black text-white shadow-xl">Please select the date first</div>
             )}

              
          </Select>
        </div>
      </div>
    </div>
  </div>
  {formik.touched.bookTime && formik.errors.bookTime && (
    <div className="text-pink-900 text-sm ml-2">{formik.errors.bookTime}</div>
  )}
</div>

                  </div>


                  <div>
                  <div className="grid grid-cols-2 w-full rounded-none gap-6 pt-10">
                <div className="w-52 h-[80px] bg-white hover:bg-gray-200 rounded-md shadow-sm">
                  <div className="m-3">
                  <span className="text-gray-700"> Select Your Services </span>
                  <div className="flex">
                  <Select
                    variant="standard"
                    name="bookServices"
                    onChange={(selectedOption) => {
                      formik.setFieldValue('bookServices', selectedOption.serviceName);
                      formik.setFieldValue('price', selectedOption.price);
                      amount(selectedOption.price);
                    }}
                     onBlur={formik.handleBlur}
                    value={formik.values.bookServices} 
                  >
                    {service && service.map((item, index) => (
                      <Option key={index} value={{ serviceName: item.serviceName, price: item.price }}>
                        {item.serviceName}
                      </Option>
                    ))}
                  </Select>


                  </div>
                  </div>
                  </div>
                  </div>
                  {formik.touched.bookServices && formik.errors.bookServices && (
                    <div className="text-pink-900 text-sm ml-2">{formik.errors.bookServices}</div>
                  )}
                  </div>

                  <div >
                  <h5 className="ont-san text-2xl mt-12 font-normal leading-6 tracking-tight text-[#1e1e1e]">
                Total Amount : ₹ {serviceAmount}
              </h5>

                  </div>

              </div>

          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
          type="submit"
            variant="gradient"
            color="green"
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
