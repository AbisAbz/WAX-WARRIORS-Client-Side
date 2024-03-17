import { axiosIntreditInstance } from "../Utils/Api";

const userApi = axiosIntreditInstance


export async function RegUser(signupData) {
    try {    
      const data = await userApi.post("/signup", signupData);
      return data;

    } catch (err) {
      throw new err(err)
  }
  }

export async function UserLogin(loginData){
    try {
         const data = await userApi.post('/login', loginData)
         return data

    } catch (error) {
       throw new error(error)
    }
}

export async function EmailVerify(id, token){
  try {
    const data = await userApi.get(`verify/${id}/${token}`)
    return data;
    
  } catch (err) {
    throw new err(err);
  }
}

export async function SignUpGoogle(googleData) {
  try {

    const response = await userApi.post('/api/googlesignup', googleData);
    return response;

  } catch (error) {
    throw new Error("Error in SignUpGoogle");
  }
}


export async function GoogleLogin(googleData){
  try {
      const response = await userApi.post('/api/googlelogin', googleData)
      return response
  } catch (error) {
    throw new Error(err); 
  }
}

export async function fetchPropertyToHome(){
  try {
     const data = await userApi.get('/api/fetchprophome')
     return data
  } catch (error) {
    throw new Error(err); 
  }
}

export async function fetchPropertiesApi(propData){
  try {
     const data = await userApi.post('/api/fetchprop',propData)
     return data
  } catch (error) {
    throw new Error(err);
  }

}

export async function fetchUserDetailsApi(){
   try {
    const data = await userApi.post('/api/fetchuser')
    return data
   } catch (error) {
    throw new Error(err);
   }
}

export async function updateProfileApi(id, values){
  try {
     const data = await userApi.post('/api/updateuserdetail', {id,values})
     return data
  } catch (error) {
    throw new Error(err);
  }
}

export async function fetchAllPropRatingApi(){
  try {
    const data = await userApi.get('/api/fetchrating')
    return data
  } catch (error) {
    throw new Error(err);
  }
}

export async function fetchServiceApi(id){
  try {
    const data = await userApi.post('/api/fetchservice', id)
    return data
  } catch (error) {
    throw new Error(err);
  }
}

export async function postRatingApi(ratingData){
  try {
    const response = await userApi.post('/api/postrating', ratingData)
    return response;
  } catch (error) {
    throw new Error(err);
  }
}


export async function slotBookingApi(bookingData){
  try {
    const response = await userApi.post('/api/postbookingdata', bookingData)
    return response
    
  } catch (error) {
    throw new Error(err);
  }
}

export async function fetchAllAvailableTimesApi(userBookedDate){
  try {
    const data = await userApi.post('/api/fetchAllAvailableTimes', userBookedDate )
    return data
    
  } catch (error) {
    throw new Error(err);
  }


}

export async function PayementDetailsApi(bookingData){
  try {
    const data = await userApi.post('/api/payementprocedure',bookingData )
    return data
  } catch (error) {
    throw new Error(err);
  }
}

export async function stripeSuccesApi(bookData){
   try {
    const data = await userApi.put('/api/paymentsuccess', bookData)
    return data
   } catch (error) {
    throw new Error(err);
   }
}

export async function fetchAllUserSummaryApi(id,active){
  try {
     const data = await userApi.get(`/bookingsummery/${id}/${active}`)
     return data
  } catch (error) {
    throw new Error(err);
  }
}

export async function summaryViewDataApi(bookedId){
  try {
    const data = await userApi.post("/api/summaryViewData", bookedId)
    return data;
  } catch (error) {
    throw new Error(err);
  }
}

export async function cancelBookingApi(bookingId){
  try {
    const data = await userApi.post('/api/cancelbooking',bookingId)
    return data
  } catch (error) {
    throw new Error(err);
  }
}