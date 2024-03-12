import {  Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayementDetailsApi } from "../../../Api/UserApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentProcedure from "./PaymentProcedure";
import moment from "moment-timezone";

const PUBLIC_KEY = "pk_test_51ODm4bSHaENjV1jr6QBv93m7yUjiUR2bCql3CNylL2bhvGcr3Fr8ZUEzlInPA3zAyDN8k8EUUUzGChUNHKWZXzAh00Q4Z4tzgS"
const stripePromise = loadStripe(PUBLIC_KEY);

export default function CheckOutForm() {
    const { state } = useLocation();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    // const [paymentMethode, setPaymentMethode] = useState("");
    const navigate = useNavigate()
    const { bookingData, propertyData, userDetails} = state;

    


    useEffect(() => {
      const showBookingData = async () => {
        try {
          const response = await PayementDetailsApi(bookingData);
          if (response.status === 200) {
            setLoading(true);
            setClientSecret(response.data.clientSecret);
          }
        } catch (err) {
          console.log(err);
        }
      };
      showBookingData();
    }, [bookingData,loading]);

    const appearance = {
      theme: "stripe",
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    const handlePaymentOption = (e) => {
      setPaymentMethode(e.target.value);
    };


     
  return (
    <>
    {loading ? (
      <div className="py-9">
        <div className="contai-section">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3">
              <div className="mb-6">
                <Typography
                  variant="h3"
                  className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                >
                  Check in details
                </Typography>

                <div className="flex w-full mt-2 flex-col md:flex-row items-start bg-white   rounded-lg md:rounded-none md:rounded-s-lg">
                  <img
                    className="object-fill w-full h-96 md:h-[13rem] md:w-60"
                    src={propertyData.images[2]}
                    alt=""
                  />

                  <div className="flex flex-col  justify-start p-4 leading-normal">
                    <h6 className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                      {propertyData.propertyName}
                    </h6>
                    <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                      {propertyData.district},
                      {propertyData.State}
                    </p>
                    <div className="flex gap-16 my-3">
                      <div>
                        <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                          Booked Date
                        </p>
                        <p className="mt-2">
                          {moment(bookingData.date, "DD-MM-YYYY").format("MMM Do YY")}
                        </p>

                      </div>
                      <div>
                        <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                          Service Youe Booked
                        </p>
                        <p className="mt-2">
                       {bookingData.time}
                        </p>
                      </div>
                    </div>
                    <p className="font-normal mt-2 leading-3 tracking-tighter text-[#959595]">
                      {bookingData.bookingService} 
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <Typography
                  variant="h3"
                  className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                >
                  Your details
                </Typography>
                <div className="mt-2">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex gap-2 mb-3 items-center">
                        <h6 className="font-san  text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                          Name :
                        </h6>
                        <p className="text-gray-700">
                          {userDetails.name}
                        </p>
                      </div>
                      <div className="flex w-full mb-3  gap-2 items-center">
                        <h6 className="font-san  text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                          Email :
                        </h6>
                        <p className="text-gray-700">
                          {userDetails.email}
                        </p>
                      </div>
                      <div className="flex gap-2  mb-3  items-center">
                        <p className="font-san  text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                          Mobile :
                        </p>
                        <p className="text-gray-700">
                          {userDetails.mobile}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="h-[225px] bg-[#f3f0f0] mt-[5rem] border border-gray-800 px-5 py-5 shadow-lg rounded-md flex flex-col justify-between">
                <h5 className="mt-2 font-san text-2xl font-normal leading-6 tracking-tight text-[#1e1e1ed2]">
                  Price details
                </h5>
                <div className="pb-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="onlinePayment"
                    />
                    <span className="ml-2 font-san text-lg">
                      Online Payment
                    </span>
                  </label>
                </div>
                <div className="flex justify-between">
                  <h5 className="font-san text-2xl font-normal leading-6 tracking-tight text-[#1e1e1edc]">
                    Total Amount :
                  </h5>
                  <h5 className="font-san text-2xl  font-normal leading-6 tracking-tight text-[#1e1e1edc]">
                    ₹ {bookingData.TotalRate}
                  </h5>
                </div>
              </div>
              <div className="w-full mt-8 mb-5">
              {clientSecret && (<Elements stripe={stripePromise} options={options}>
                    <PaymentProcedure
                      bookingId={bookingData._id}
                      fee={bookingData.TotalRate}
                    />
                  </Elements>)}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    ) : (
      <div className="w-full h-screen flex justify-center items-center">
        Loading.......
      </div>
    )}
  </>

  )
}
