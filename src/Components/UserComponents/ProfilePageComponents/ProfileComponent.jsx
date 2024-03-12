import React, {useState, useEffect} from 'react'
import image1 from '../../../assets/UsserAssets/Untitled-3 (3).png'
import './ProfileComponent.css'
import { fetchUserDetailsApi } from '../../../Api/UserApi';
import { ToastContainer } from 'react-toastify'; 
import { useFormik } from 'formik'; 
import { ProfileUbdate } from '../../../Schema/Authentication'
import { useDispatch, useSelector } from 'react-redux'; 
import { setUserDetails }  from '../../../Redux/UserSlice'
import { updateProfileApi } from '../../../Api/UserApi'; 
import { GenerateSuccess } from '../../../Toast/Toast'; 

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

function ProfileComponent() {
  const {id, name, email, mobile, houseName,state, district} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async() => {
       try {
        const response = await fetchUserDetailsApi();
        if (response) {
          dispatch(setUserDetails({
            id     : response.data.data._id,
            name   : response.data.data.name,
            email  : response.data.data.email,
            mobile : response.data.data.mobile,
            houseName : response.data.data.houseName,
            state  : response.data.data.state,
            district : response.data.data.district,
         }))
          setProfile(false);
        }
       } catch (error) {
        console.log(error);
       }
    }
    fetchUserDetails();
  },[profile])



  const formik = useFormik({
    initialValues:{
      name: name,
      email: email,
      mobile: mobile,
      houseName: houseName,
      state: state,
      district: district,

    },
    validationSchema:ProfileUbdate,
    onSubmit:async(values) => {
      try {
        const response = await updateProfileApi(id, values)
        console.log("iam the response of the update ", response.data.message);
        setProfile(true);
        GenerateSuccess(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }

  })

    return (
        <>
         <div className='container mx-auto'>
    <div className=' md:w-[750px] sm:w-[550px]  bg-gradient-to-br from-gray-300 to-blue-gray-100 mx-auto my-28 shadow-2xl'>
            <div className="flex justify-center items-end mx-auto">
    <div className="w-28 md:w-36 lg:w-44 h-28 md:h-36 lg:h-44 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
        <img src={image1} alt="avatar" className="w-full h-full object-cover" />
    </div>
</div>
                <Card className="mt-10 md:w-[650px] sm:w-[450px]  mx-auto">
                    <CardBody>
                        <div className="container-section">
                            <div className="container-section pt-12">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="flex flex-col items-center gap-7">
                                        <div className="w-full ">
                                            <Input
                                                size="lg"
                                                label="Full Name"
                                                name="name"
                                                value={ formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                             {formik.touched.name && formik.errors.name && (
                                       <div className="text-pink-900 text-sm ">{formik.errors.name}</div>
                                     )}
                                        </div>
                                        <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-4">
                                            <div>
                                                <Input
                                                    size="lg"
                                                    label="House name"
                                                    name="houseName"
                                                    value={formik.values.houseName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                 {formik.touched.houseName && formik.errors.houseName && (
                                      <div className="text-pink-900 text-sm ">{formik.errors.houseName}</div>
                                    )}
                                            </div>
                                            <div>
                                                <Input
                                                    size="lg"
                                                    label="State"
                                                    name="state"
                                                    value={ formik.values.state}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.state && formik.errors.state && (
                                                 <div className="text-pink-900 text-sm ">{formik.errors.state}</div>
                                               )}
                                            </div>
                                        </div>
                                        <div className="w-full ">
                                            <Input
                                                size="lg"
                                                label="District"
                                                name="district"
                                                value={ formik.values.district}
                                                onChange={formik.handleChange}
                                                 onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.district && formik.errors.district && (
                                         <div className="text-pink-900 text-sm ">{formik.errors.district}</div>
                                       )}
                                        </div>
                                        <div className="w-full ">
                                            <Input
                                                size="lg"
                                                label="Email Id"
                                                name="email"
                                                value={ email}
                                            />
                                        </div>
                                        <div className="w-full ">
                                            <Input
                                                size="lg"
                                                label="Mobile"
                                                name="mobile"
                                                value={ formik.values.mobile}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.mobile && formik.errors.mobile && (
                                           <div className="text-pink-900 text-sm ">{formik.errors.mobile}</div>
                                         )}
                                        </div>
                                        <Button type="submit" className="w-full md:w-1/2">
                                            Update Profile
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
        <ToastContainer />
</>
    )
}

export default ProfileComponent