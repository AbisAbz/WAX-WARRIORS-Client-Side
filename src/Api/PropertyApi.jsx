import { propertyAxiosIntreditInstance } from '../Utils/Api'

const subAdminApi = propertyAxiosIntreditInstance

export async function RegOwner(signupData) {
  try {
    const data = await subAdminApi.post("/propsignup", signupData);
    return data;

  } catch (err) {
    throw new Error(err)
  }
}

export async function EmailVerify(id, token) {
  try {
    const data = await subAdminApi.get(`verifysub/${id}/${token}`)
    return data;

  } catch (err) {
    throw new Error(err);
  }
}

export async function propOwnLogin(propDetails) {
  try {
    const response = await subAdminApi.post('/proplogin', propDetails)
    return response;
  } catch (error) {
    throw new Error(err);
  }
}

export async function fetchOwnerData() {
  try {
    const response = await subAdminApi.get('/api/prop')
    return response;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

export async function RegProperty(propData) {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      withCredentials: true,  
    };
    
    const response = await subAdminApi.post('/propreg',propData,config);
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

export async function propertyView(id) {
  try {
    const response = await subAdminApi.post('/api/propview', { id })
    return response;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

export async function postService(data) {
  try {
    const response = await subAdminApi.post('/api/postservice', data)
    return response;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

export async function fetchAllService(id) {
  try {
    const response = await subAdminApi.post('/api/fetchallservice', id)
    return response
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

export async function fetchPropertyOwner() {
  try {
      const data = await subAdminApi.get('/api/fetchPropertyOwner')
      return data
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}


export async function EditProperty(propData) {
  try {  
    const data = await subAdminApi.post('/api/editprop',propData);
    return data;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

export async function hidePropertyApi(propId){
  try {
    const data = await subAdminApi.post("/api/hideproperty", propId)
    return data;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

export async function fetchAllBookingsApi(id){
  try {
    const data = await subAdminApi.post('/api/fetchbookings',id)
    return data
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

export async function fetchAllDatasDashboardApi(id) {
   try {
     const data = await subAdminApi.post('/api/fetchalldatadash',id)
     return data
   } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
   }
}

