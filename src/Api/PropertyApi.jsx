import {propertyAxiosIntreditInstance} from '../Utils/Api'

const subAdminApi = propertyAxiosIntreditInstance


export async function RegOwner(signupData) {
    try {
      
      const data = await subAdminApi.post("/propsignup", signupData);
      return data;

    } catch (err) {
      throw new Error(err)
  }
  }

  export async function EmailVerify(id, token){
    try {
      const data = await subAdminApi.get(`verifysub/${id}/${token}`)
      return data;
      
    } catch (err) {
      throw new Error(err);
    }
  }


  export async function propOwnLogin(propDetails){
     try {
      console.log("i reach in prop API first");
        const response = await subAdminApi.post('/proplogin', propDetails)
        console.log("i reach in response after waiting property API");
        return response;
     } catch (error) {
      throw new Error(err);
     }
  }

  export async function fetchOwnerData(){
    try {
      console.log("i reach in the fetchOwner API");
         const response = await subAdminApi.get('/api/prop')
         console.log("iam the response of the fetchowner API", response);
         return response;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  export async function RegProperty(propDAta){
    try {
      const response = await subAdminApi.post('/propreg', propDAta)
      return response;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  export async function fetchProperties(ownerData) {
    try {
      const response = await subAdminApi.post('/api/propdata', ownerData)
      return response;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  export async function propertyView(id){
    try {
      const response = await subAdminApi.post('/api/propview', {id})
      return response;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  export async function postService(data){
    try {
       console.log(" iam in the postservice api", data);
       const response = await subAdminApi.post('/api/service', data)
       return response;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  export async function fetchAllService(){
    try {
       console.log("i reach in api fetch all services ");
       const response = await subAdminApi.get('/api/fetchallservice')
       return response
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }