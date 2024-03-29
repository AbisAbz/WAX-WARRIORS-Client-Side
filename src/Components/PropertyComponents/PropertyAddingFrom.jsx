import React,{ useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { propertySchema } from '../../Schema/Authentication'
import {  useFormik } from "formik";
import { RegProperty } from "../../Api/PropertyApi";
import { useSelector } from "react-redux";



function PropertyAddingFrom(propFunc) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const propid = useSelector((state) => state.owner.id);

  let timesAvailable = ["06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
  ]

  const formik = useFormik({
    initialValues: {
      id: propid,
      name: '',
      slot: '',
      country: '',
      state: '',
      district: '',
      location: '',
      openingTime: '',
      closingTime: '',
      mobile: '',
      images: [],
      describe: '',
      status: 'Pending',
    },
    validationSchema: propertySchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("id", values.id);
        formData.append("name", values.name);
        formData.append("slot", values.slot);
        formData.append("country", values.country);
        formData.append("state", values.state);
        formData.append("district", values.district);
        formData.append("location", values.location);
        formData.append("openingTime", values.openingTime);
        formData.append("closingTime", values.closingTime);
        formData.append("mobile", values.mobile);
        formData.append("describe", values.describe);
        formData.append("status", values.status);
  
        for (let i = 0; i < values.images.length; i++) {
          formData.append("images", values.images[i]);
        }

        
        const response = await RegProperty(formData);
        handleOpen();
        propFunc.propFunc(true);
      } catch (error) {
        console.log("iam the error in the onsubmit propreg ", error);
      }
    }
  });
  
    

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log(" iam the images of regprop ", selectedFiles);
    formik.setFieldValue("images", selectedFiles);
  };
  

  return (
    <>
    <Button  variant="gradient" onClick={handleOpen}>
      Add Property
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
              Property name
            </Typography>
            <Input
              name = "name"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
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
              Select your property Country
            </Typography>

            <Input
              name="country"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={formik.handleChange}
              value={formik.values.country}
              onBlur={formik.handleBlur}
            />
             {formik.touched.country && formik.errors.country && (
             <div className="text-pink-900 text-sm ">{formik.errors.country}</div>
           )}
            <div className="my-4 grid grid-cols-2  gap-4">
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Number of Slot
                </Typography>
                <Input
                  type="number"
                  name="slot"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  onChange={formik.handleChange}
                  value={formik.values.slot}
                  onBlur={formik.handleBlur}
                />
                 {formik.touched.slot && formik.errors.slot && (
             <div className="text-pink-900 text-sm ">{formik.errors.slot}</div>
           )}
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                 Select your property State
                </Typography>
                <Input
                  type="text"
                  name="state"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  onBlur={formik.handleBlur}
                />
                 {formik.touched.state && formik.errors.state && (
             <div className="text-pink-900 text-sm ">{formik.errors.state}</div>
           )}
              </div>
            </div>
            <div className="my-4 grid grid-cols-2  gap-4">
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Select your property District
                </Typography>
                <Input
                  name="district"
                  type="text"
                  className="block appearance-none w-full bg-white border border-gray-500 hover:border-gray-400 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline"
                  onChange={formik.handleChange}
                  value={formik.values.district}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.district && formik.errors.district && (
             <div className="text-pink-900 text-sm ">{formik.errors.district}</div>
           )}
            
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Select your property location
                </Typography>
                <Input
                  type="text"
                  name="location"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  onBlur={formik.handleBlur}
                />
             {formik.touched.location && formik.errors.location && (
             <div className="text-pink-900 text-sm ">{formik.errors.location}</div>
             )}

              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Select your  Opening Time
                </Typography>
                <Select
            variant="standard"
            name="openingTime"
            onChange={(time) => formik.setFieldValue('openingTime', time)}
            onBlur={formik.handleBlur}
            value={formik.values.openingTime}
          >
            {timesAvailable
              .map((time) => (
                <Option key={time} value={time}>{time}</Option>
              ))}
          </Select>
             {formik.touched.openingTime && formik.errors.openingTime && (
             <div className="text-pink-900 text-sm ">{formik.errors.openingTime}</div>
             )}

              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Select your Closing Time
                </Typography>
                <Select
            variant="standard"
            name="closingTime"
            onChange={(time) => formik.setFieldValue('closingTime', time)}
            onBlur={formik.handleBlur}
            value={formik.values.closingTime}
          >
            {timesAvailable.map((time) => (
                <Option key={time} value={time}>{time}</Option>
              ))}
          </Select>
             {formik.touched.closingTime && formik.errors.closingTime && (
             <div className="text-pink-900 text-sm ">{formik.errors.closingTime}</div>
             )}

              </div>

              <div>
                <Typography  
                 variant="small"
                 color="blue-gray"
                 className="mb-2 font-medium"
                >
                   Select the images
                </Typography>
                
                <input 
                type="file" 
                accept="image/*"
                multiple
                onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2  gap-4">
             
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Mobile number
                </Typography>
                <Input
                  type="tel"
                  name="mobile"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile&& formik.errors.mobile && (
             <div className="text-pink-900 text-sm ">{formik.errors.mobile}</div>
              )}
              </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Describe your property
              </Typography>
              <Textarea
                name="describe"
                value={formik.values.describe}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.describe && formik.errors.describe && (
                <p className="pt-2 text-xs italic text-red-500">
                  {formik.errors.describe}
                </p>
              )}
            </div>
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
  );
}

export default PropertyAddingFrom