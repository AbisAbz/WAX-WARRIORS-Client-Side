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
      console.log("iam the googledata i reached here Login API ");
      const response = await userApi.post('/api/googlelogin', googleData)
      console.log("iam the response of googlelogin from back-end ", response);
      return response
  } catch (error) {
    throw new Error(err); 
  }
}