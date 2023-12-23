import React from "react";
import { useFormik } from 'formik';
import { SignupSchema } from '../../../Schema/Authentication';
import { RegOwner } from "../../../Api/PropertyApi";
import { ToastContainer, toast } from 'react-toastify'
import { GenerateSuccess } from '../../../Toast/Toast'
import 'react-toastify/dist/ReactToastify.css';

import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function SimpleRegistrationForm() {
  const formik = useFormik({
    initialValues: {
      name     : '',
      email    : '',
      mobile   : '',
      password : '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const response   = await RegOwner(values) 
        if (response.status === 200) {
          GenerateSuccess(response.data.message)
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  });

  


  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center md:mt-10 h-screen">
  <div className="grid grid-cols-1 md:grid-cols-2 md:h-full w-full md:w-[100rem]">
  <div className="md:w-full md:h-full flex-col flex justify-center items-center">
            <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="black" className="text-xl md:text-2xl lg:text-3xl font-bold">
                Sign Up
              </Typography>
              <Typography className="text-gray-900 mt-1 font-normal">
                Enter your details to Register.
              </Typography>

              <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-4 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                  </Typography>
                  <Input
                    name        = "name"
                    type        = "text"
                    size        = "lg"
                    placeholder = "Your name"
                    className   = "!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps  = {{
                      className: "before:content-none after:content-none",
                    }}
                    onChange    = {formik.handleChange}
                    value       = {formik.values.name}
                    onBlur      = {formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-pink-900 text-sm ">{formik.errors.name}</div>
                  )}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                   Email Address
                 </Typography>
                  <Input
                    name        = "email"
                    size        = "lg"
                    placeholder = "Your email address"
                    className   = "!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps  ={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange    = {formik.handleChange}
                    value       = {formik.values.email}
                    onBlur      = {formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-pink-900 text-sm ">{formik.errors.email}</div>
                  )}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Mobile
                 </Typography>
                  <Input
                     name        = "mobile"
                     type        = "tel"
                     size        = "lg"
                     placeholder = "Your mobile"
                     className   = "!border-t-blue-gray-200 focus:!border-t-gray-900"
                     labelProps  = {{
                       className: "before:content-none after:content-none",
                     }}
                    onChange     = {formik.handleChange}
                    value        = {formik.values.mobile}
                    onBlur       = {formik.handleBlur}
                  />
                  {formik.touched.mobile && formik.errors.mobile && (
                    <div className="text-pink-900 text-sm ">{formik.errors.mobile}</div>
                  )}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Password
                 </Typography>
                  <Input
                     name        = "password"
                     type        = "password"
                     size        = "lg"
                     placeholder = "Your password"
                     className   = "!border-t-blue-gray-200 focus:!border-t-gray-900"
                     labelProps  = {{
                       className: "before:content-none after:content-none",
                     }}
                    onChange     = {formik.handleChange}
                    value        = {formik.values.password}
                    onBlur       = {formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-pink-900 text-sm ">{formik.errors.password}</div>
                  )}
                </div>

                <Button className="mt-6" type="submit" fullWidth>
                  Register
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                  Already have an account?{" "}
                  <a href="#" className="font-bold text-gray-900 ">
                    Login In
                  </a>
                </Typography>
              </form>
            </Card>
          </div>
          <div className="h-full w-full md:w-2/2 md:flex md:bg-cover md:bg-center" id='adminSignInimg'></div>
        </div>

      </div>
      <ToastContainer />
    </>

  );
}
