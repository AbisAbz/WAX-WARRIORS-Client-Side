import React, { useState, useEffect } from 'react'
import {
  Typography,
  Tab,
  Tabs,
  TabsBody,
  TabsHeader,
  TabPanel,
  Rating,
  Textarea,
  Button,
} from '@material-tailwind/react'
import SinglePropertyImages from './SinglePropertyImages'
import SimpleCard from './Services'
import { fetchServiceApi } from '../../../Api/UserApi'
import { useFormik } from 'formik' 
import { ratingSchema } from '../../../Schema/Authentication' 
import { postRatingApi } from '../../../Api/UserApi'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { GenerateSuccess } from '../../../Toast/Toast'
import  DialogSizes from './SlotBookingModal'



function SinglePropertyDetails() {

  const { state } = useLocation()
  const { item }  = state
  const   userId    = useSelector(state =>  state.user.id)
  


  const [activeTab, setActiveTab] = useState(1)
  const [service, setService] = useState()
  const [allRating, SetAllRating] = useState({ratingData: null, avgRating: -1})
  const [refresh, SetAllRefresh] = useState(true)
  const [notAvailableSlots, SetnotAvailableSlots] = useState([])

  



  const data = [
    {
      label: "About",
      value: 1,
    },
    {
      label: "Services",
      value: 2,
    },
    {
      label: "Reviews",
      value: 3,
    },
    {
      label: "Add Reviews",
      value: 4,
    },

  ]

  useEffect(() => {
    const fetchService = async () => {
      try {
        const id = item._id
        const response = await fetchServiceApi({id})
        SetnotAvailableSlots(response.data.slotNotAvailable);
        SetAllRefresh(false)
        setService(response.data.serviceData);
        SetAllRating({ ratingData: response.data.ratingData, avgRating: response.data.avgRating });

      } catch (error) {
        console.log("iam the error in the fetchservice ", error);
      }
    }
  
    fetchService()
  }, [refresh])



const formik = useFormik({
  initialValues:{
    rating:null,
    description:"",
    propertyId:item._id,
    UsersId:userId
  },
  validationSchema:ratingSchema,
  onSubmit:async(values) => {
    try {
      const response = await postRatingApi(values)
      if(response.status === 200){
        GenerateSuccess("Review has been successfully updated")
        SetAllRefresh(true)
      }
    } catch (error) {
      console.log( error);
    }
  }

})


const handleRatingChange = (newValue) => {
  formik.handleChange({
    target: {
      name: "rating",
      value: newValue,
    },
  });
};

  return (
    <>
                                                                             
      <SinglePropertyImages images={item.images}/>
                                                                             
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <Typography variant="h4" color="deep-purple" className="mb-2 sm:mb-0">
        {item.propertyName}
        </Typography>
        
        {allRating.avgRating >= 0 && <Rating value={allRating.avgRating}/>}

       
      </div>
      <div >
        <Typography variant='small' color='black'>
          {item.state}, {item.location}        </Typography>

      </div>
      <div className='flex justify-end pt-10'>

                       {/*  Booking Component  */}         
                                                                             
          <DialogSizes  service={service} userId={userId} item={item}  notAvailableSlots={notAvailableSlots} />
                                                                             

</div>
      <div className='  mt-7 '>
        <div>
          <Tabs value={activeTab}>
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}
                  onClick={() => setActiveTab(value)}
                >
                  {value === 4 && window.innerWidth < 600 ? 'Add' : label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              <TabPanel value={activeTab}>

                <div style={{ display: activeTab !== null ? "block" : "none" }}>
                                                                                                                           
                                                                                                                           
                  {activeTab === 1 && (
                     <div>
                    <div className="mb-3">
                      <Typography
                        variant="h3"
                        className="py-5 cursor-pointer text-gray-800 sm:text-xl sm:font-extralight"
                      >
                        Explore Your Stay
                      </Typography>
                      <span>{item.description}</span>
                    </div>
                    <div className={allRating?.ratingData?.length > 0 ? `newClass h-[300px] overflow-y-scroll` : ''}>
                     <Typography
                       variant="h3"
                       className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                     >
                       Reviews
                     </Typography>
                     <div>
                     {allRating?.ratingData?.map((item, index) => {
                            return (
                           <article className="pb-3"  key={index}>
                             <div className="flex items-center mb-4">
                               <img
                                 className="w-10 h-10 me-4 rounded-full"
                                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                 alt=""
                               />
                               <div className="font-medium dark:text-white">
                                 <p>
                                 {item.UsersId?.name}
                                   <time
                                     dateTime="2014-08-16 19:00"
                                     className="block text-sm text-gray-500 dark:text-gray-400"
                                   >
                                     {item.UsersId?.email}
                                   </time>
                                 </p>
                               </div>
                             </div>
                             <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                             <Rating value={item.ReviewRating} readonly />
                             </div>
                             <p className="mb-2 text-gray-500 dark:text-gray-400">
                             {item?.ReviewDescription}
                             </p>
                           </article>
                             );
                            })}
                     </div>
                   </div>
                   </div>
                  )}
                                                                                                                                   
                                                                                                                                   
                  {activeTab === 2 && (
                   <div className="px-4 sm:px-6 lg:px-8">
                   <div className="py-5 sm:py-8">
                     <Typography variant="h3" className="text-gray-800 text-xl sm:text-2xl lg:text-3xl font-light mb-5 sm:mb-8">
                       Choose Your Services
                     </Typography>
                     <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mx-auto max-w-7xl ">
                       <SimpleCard service={service} />
                     </div>
                   </div>
                 </div>
                 
                                                                                                                                     
                                                                                                                                     
                  )}
                    {activeTab === 3 && (
                     <div className={allRating?.ratingData?.length > 0 ? `newClass h-[300px] overflow-y-scroll` : ''}>
                     <Typography
                       variant="h3"
                       className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                     >
                       Reviews
                     </Typography>
                     <div>
                     {allRating?.ratingData?.map((item, index) => {
                            return (
                           <article className="pb-3"  key={index}>
                             <div className="flex items-center mb-4">
                               <img
                                 className="w-10 h-10 me-4 rounded-full"
                                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                 alt=""
                               />
                               <div className="font-medium dark:text-white">
                                 <p>
                                 {item.UsersId?.name}
                                   <time
                                     dateTime="2014-08-16 19:00"
                                     className="block text-sm text-gray-500 dark:text-gray-400"
                                   >
                                     {item.UsersId?.email}
                                   </time>
                                 </p>
                               </div>
                             </div>
                             <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                             <Rating value={item.ReviewRating} readonly />
                             </div>
                             <p className="mb-2 text-gray-500 dark:text-gray-400">
                             {item?.ReviewDescription}
                             </p>
                           </article>
                             );
                            })}
                     </div>
                   </div>
                  )}
                                                                                                                                       
                                                                                                                                       
                  {activeTab === 4 && (
                    <div className="mb-3">
                      <Typography
                        variant="h3"
                        className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                      >
                        Add Reviews
                      </Typography>
                      <div>
                        <form onSubmit={formik.handleSubmit} action="">
                          <div className="mb-3">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="mb-2 font-medium"
                            >
                              Review Rating
                            </Typography>
                            <Rating
                            onChange={(value) => handleRatingChange(value)}
                            value={formik.values.rating}
                            onBlur={formik.handleBlur}
                           />
                              {formik.touched.rating && formik.errors.rating && (
                                <p className="pt-2 text-xs italic text-red-500">
                                  {formik.errors.rating}
                                </p>
                              )}
                          
                          </div>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="mb-2 font-medium"
                            >
                              Review Description
                            </Typography>

                            <Textarea
                              name="description"
                              className="w-full rounded-md h-[80px] border border-gray-700 shadow-md"
                              value={formik.values.description}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                              {formik.touched.description && formik.errors.description && (
                                <p className="pt-2 text-xs italic text-red-500">
                                  {formik.errors.description}
                                </p>
                              )}
                            
                          </div>
                          <div className="flex justify-end mt-3">
                            <Button type="submit">Add Review</Button>
                          </div>
                        </form>
                      </div>
                    </div>

                  )}
                </div>


              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>



    </>
  )
}

export default SinglePropertyDetails