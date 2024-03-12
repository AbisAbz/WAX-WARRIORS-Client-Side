import React,{useState, useEffect} from 'react'
import { Typography, Button, Chip } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import { summaryViewDataApi } from '../../../Api/UserApi';
import { cancelBookingApi } from '../../../Api/UserApi';
import { GenerateSuccess } from '../../../Toast/Toast';



function SummaryViewDetails() {

  const { state } = useLocation();
  const { bookingId }  = state;
  const [summaryViewData, setSummaryViewData] = useState(null)
  const [cancel, setCancel] = useState(true);

  useEffect(() => {
    const bookingViewData = async() => {
      try {
        const response = await summaryViewDataApi({bookingId : bookingId})
        console.log("iam the response ", response.data.data);
        setCancel(false);
        setSummaryViewData(response.data.data)
        
      } catch (error) {
        console.log(error);
      }
    
    }
    bookingViewData();
  },[bookingId, cancel])

  const handleBookingCancel = async () => {
    try {
      const response = await cancelBookingApi({bookingId: bookingId});
      if (response) {
        setCancel(true);
        GenerateSuccess(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {summaryViewData && summaryViewData.propertyId ? (
          <div className="bg-white  overflow-hidden">
            <div className="px-6 py-8">
              <Typography
                variant="h3"
                className="text-gray-800 text-2xl font-extralight mb-6"
              >
                Transaction ID: {summaryViewData.TransactionId}
              </Typography>
              <hr className="border-1 border-gray-300 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div>
                    <Typography variant="h5" className="mb-5 text-gray-800">
                      Checking Details
                    </Typography>
                    <p className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-gray-600">
                      {summaryViewData.propertyId.propertyName}
                    </p>
                    <p className="mb-4 font-normal text-gray-600 dark:text-gray-400">
                      {summaryViewData.propertyId.district},
                      {summaryViewData.propertyId.State}
                    </p>

                    <div className="flex flex-col gap-4">
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Booked Date :{" "}
                        {summaryViewData.date}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Booked Time :{" "}
                        {summaryViewData.time}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Service You Booked : {summaryViewData.bookingService}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Your Payment Through : {summaryViewData.paymentMethode}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Typography variant="h5" className="mb-5 text-gray-800">
                      User Details
                    </Typography>
                    <div className="flex flex-col gap-5">
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Name : {summaryViewData.UsersId.name}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Email : {summaryViewData.UsersId.email}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Number : {summaryViewData.UsersId.mobile}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        House : {summaryViewData.UsersId.houseName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <img
                    className="object-fill w-full h-[13rem] rounded-lg"
                   
                    src={
                      summaryViewData.propertyId &&
                      summaryViewData.propertyId.images &&
                      summaryViewData.propertyId.images[2]
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center gap-2">
                <Typography variant="h5" className="text-gray-800">
                  Total Amount :
                </Typography>
                <p className="text-lg font-bold">Rs. {summaryViewData.TotalRate}</p>
              </div>
              <div className="flex items-center gap-2">
                <Typography variant="h5" className="text-gray-800">
                  Booking Status :
                </Typography>
                <Chip
                  variant="ghost"
                  size="sm"
                  value={
                    summaryViewData.bookingStatus === "success"
                      ? "success"
                      : "cancel"
                  }
                  color={
                    summaryViewData.bookingStatus === "success" ? "green" : "red"
                  }
                  className="text-center"
                />
              </div>
              <div className="flex justify-end">
                {summaryViewData.bookingStatus === "success" ? (
                  <Button
                    color="red"
                    buttonType="filled"
                    size="lg"
                    onClick={() => handleBookingCancel(summaryViewData._id)}
                  >
                    Cancel Booking
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[80vh] flex justify-center items-center">
            No booking is available
          </div>
        )}
      </div>
    </div>
    
    </>
  )
}

export default SummaryViewDetails