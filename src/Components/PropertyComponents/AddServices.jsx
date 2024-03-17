import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { serviceSchema } from '../../Schema/Authentication'
import { postService } from '../../Api/PropertyApi'
import { GenerateSuccess } from '../../Toast/Toast';
import eventBus from './EvenyBus';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
    Textarea,
  } from "@material-tailwind/react";


export default function AddServices({id, serviceData}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [emitter, setEmitter] = useState(false)


    useEffect(() => {
      if(emitter === true){
      const sendDataToParent = () => {
        eventBus.emit('dataEvent', emitter, abis);
      };
      sendDataToParent()
    }

    },[emitter])
  

    const formik = useFormik({
        initialValues:{
            id:id,
            name:'',
            price:'',
            description:'',
              },
          validationSchema:serviceSchema,
          onSubmit:async(values) => {
             handleOpen();
            try {
              const response = await postService(values)
              if(response) {
                GenerateSuccess("Your service has been created")
                setEmitter(true)
              }
            } catch (error) {
              
            }
          }

    })


  return (
    <>
    <Button  variant="gradient" onClick={handleOpen} className="mt-10">
      Add Service
    </Button>
    <Dialog    open={open} handler={handleOpen}>
      <DialogHeader className="">Register your Property</DialogHeader>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <DialogBody className="max-h-[400px] overflow-y-auto">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Select Your Service
            </Typography>
            <select
  name="name"
  className="border-t border-b border-l border-r border-gray-300 rounded-md p-2"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.name}
>
  <option value="" disabled>Select an option</option>
  <option value="Normal Wash" disabled={serviceData.some((e) => e.serviceName === "Normal Wash")}>
    Normal Wash
  </option>
  <option value="Body Wash" disabled={serviceData.some((e) => e.serviceName === "Body Wash")}>
    Body Wash
  </option>
  <option value="Interior Wash" disabled={serviceData.some((e) => e.serviceName === "Interior Wash")}>
    Interior Wash
  </option>
  <option value="Full Body Wash" disabled={serviceData.some((e) => e.serviceName === "Full Body Wash")}>
    Full Body Wash
  </option>
</select>



             {formik.touched.name && formik.errors.name && (
             <div className="text-pink-900 text-sm ">{formik.errors.name}</div>
           )}
          </div>
          <div className="my-3">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium "
            >
              Price
            </Typography>

            <Input
              name="price"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
             {formik.touched.price && formik.errors.price && (
             <div className="text-pink-900 text-sm ">{formik.errors.price}</div>
           )}
           </div>

            <div className="grid grid-cols-2  gap-4">
             
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Describe your property
              </Typography>
              <Textarea
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
               {formik.touched.description && formik.errors.description && (
             <div className="text-pink-900 text-sm ">{formik.errors.description}</div>
           )}
            </div>
            </div>
      
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            className="mr-1"
            onClick={handleOpen}
          >
            <span>Cancel</span>
          </Button>
          <Button type="submit" variant="gradient" color="green">
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  </>
  )
 }

