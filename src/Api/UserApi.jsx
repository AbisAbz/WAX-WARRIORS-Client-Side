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

export async function fetchPropertiesApi(){
  try {
     const data = await userApi.post('/api/fetchprop')
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
    
   }
}

export async function updateProfileApi(id, values){
  try {
     console.log("aim in the api of update profile", values);
     const data = await userApi.post('/api/updateuserdetail', {id,values})
     return data
  } catch (error) {
    
  }
}