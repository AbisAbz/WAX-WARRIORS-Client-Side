import { adminAxiosIntreditInstance } from '../Utils/Api'

const adminApi = adminAxiosIntreditInstance;


export async function adminLogin(loginData) {
    try {
        const response = await adminApi.post('/adminLogin', loginData);
        return response;

    } catch (err) {
     throw new err(err)

    }
}


export async function fetchUsers() {
    try {          
      const response = await adminApi.get('/api/users');
      return response
      
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
      
    }
  }

  export async function userBlockApi(id) {
    try {
      const response = await adminApi.post('/userblock', id)
      return response
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
      
    }

  }


 export async function fetchPropData(){
  try {
     const response = await adminApi.get('/api/propertylist')
     return response
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
    
  }
 }

 export async function propAprove(id){
    try {
      const response = await adminApi.post('/api/aprove', {id})
      return response
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
 }

 export async function rejectResponse(id, rejectionReason){
    try {
      const response = await adminApi.post('/api/rejectmail', {id, rejectionReason})
      return response;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
 }

 export async function fetchDashBoardApi(){
  try {
    console.log("hahahahha");
    const data = await adminApi.get('/api/fetchdashboard')
    return data
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
 }



  