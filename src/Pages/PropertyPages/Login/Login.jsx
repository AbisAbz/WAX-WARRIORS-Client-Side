import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../../Schema/Authentication';
import { propOwnLogin } from '../../../Api/PropertyApi';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setPropOwnerDetails }  from '../../../Redux/PropertySlice'

import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";


export default function SimpleRegistrationForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const formik = useFormik({
      validationSchema:loginSchema,
      initialValues:{ email: "", password: "" },
      onSubmit:async(values) => {
        try {
          const response = await propOwnLogin(values)
          console.log("i came back after the awaiting over", response);
  
          if(response.status === 200){
            console.log("iam in the response status", response.status);
            localStorage.setItem("propertyToken", response.data.propertyToken)
            dispatch(setPropOwnerDetails({
               id     : response.data.exist._id,
               name   : response.data.exist.name,
               email  : response.data.exist.email,
               mobile : response.data.exist.mobile,
            }))
            navigate('/property')
            
          }
        } catch (error) {
          console.log(error);
        }
      }
    })

  return (
    <>
    <div className="flex flex-col md:flex-row items-center justify-center md:mt-10 h-screen">
  <div className="grid grid-cols-1 md:grid-cols-2 md:h-full w-full md:w-[100rem]">
    <div className="md:w-full md:h-full flex-col flex justify-center items-center">
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="black" className="text-xl md:text-2xl lg:text-3xl font-bold">
        Sign In
        </Typography>

          <Typography color="gray" className="mt-1 font-normal">
          Enter your email address to get started
          </Typography>

            
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
             Email Address
            </Typography>
              <Input
               name="email"
               size="lg"
               placeholder="Your email address"
               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
                onChange = {formik.handleChange}
                value    = {formik.values.email}
                onBlur   = {formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-pink-900 text-sm ">{formik.errors.email}</div>
              )}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Password
            </Typography>  
              <Input
                  name="password"
                  type="password"
                  size="lg"
                  placeholder="Your password"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                 onChange = {formik.handleChange}
                 value    = {formik.values.password}
                 onBlur   = {formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-pink-900 text-sm ">{formik.errors.password}</div>
              )}
            </div>
           
            <Button type='submit' className="mt-6" fullWidth>
              sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Not Registered?{" "}
              <a href="/signup" className="font-medium text-gray-900">
                Sign Up
              </a>
            </Typography>
          </form>
        </Card>      
      </div>
      <div className="h-full w-full md:w-2/2 md:flex md:bg-cover md:bg-center" id='signinimg'></div>
    </div>
    </div>   
    <ToastContainer />
    </>
  );
}
