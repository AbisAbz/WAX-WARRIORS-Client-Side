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


 export async function fetchPropData(switchbtn){
  try {
     const response = await adminApi.post('/api/propertylist', {message:switchbtn})
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



  