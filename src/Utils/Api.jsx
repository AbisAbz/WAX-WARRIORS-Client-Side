import axios from 'axios'
import { GenerateError } from '../Toast/Toast'


   
      //======= User Back-end Connect =========//
export const axiosIntreditInstance = axios.create({
  baseURL: 'http://localhost:3000/', 
});


       //======= Admin Back-end Connect =========//
export const adminAxiosIntreditInstance = axios.create({
    baseURL: 'http://localhost:3000/admin'
})


       //======= Property Back-end Connect =========//
export const propertyAxiosIntreditInstance = axios.create({
    baseURL: 'http://localhost:3000/property'
})



         //======= Token For Admin =========//
      adminAxiosIntreditInstance.interceptors.request.use((req) => {

       const adminToken = localStorage.getItem("adminToken");
       
       if(adminToken) {
        
        req.headers.Authorization = " Bearer " + adminToken;
    }

       return req;

        
    });

         //======= Token For subAdmin =========//
        adminAxiosIntreditInstance.interceptors.request.use((req) => {

         const propertyToken = localStorage.getItem("propertyToken");
         
         if(propertyToken) {
        
        req.headers.Authorization = " Bearer " + propertyToken
      }

         return req;

        
      });

         //======= Token For User =========//
         axiosIntreditInstance.interceptors.request.use((req) => {

          const userToken = localStorage.getItem("userToken");
          
          if(userToken) {
           
           req.headers.Authorization = " Bearer " + userToken;
       }
   
          return req;
   
           
       });


    //=========  User interceptors for error response  ======//
    axiosIntreditInstance.interceptors.response.use(
        (response) => response,
        (error) => {

      
          if (error.response && error.response.status === 400) {
            GenerateError(error.response.data.message);
          } else if (error.response && error.response.status === 500) {
            GenerateError(error.response.data.message);
            window.location = "/";
          } else if (error.response && error.response.status === 403) {
            GenerateError(error.response.data.message);
            window.location = "/";
          }
      
          return Promise.reject(error);
        }
      );

       //=========  Admin interceptors for error response  ======//
      
       adminAxiosIntreditInstance.interceptors.response.use(
        (response) => response,
        (error) => {

      
          if (error.response && error.response.status === 400) {
            GenerateError(error.response.data.message);

          }
      
          return Promise.reject(error);
        }
      );  

       //=========  Property interceptors for error response  ======//
      
       propertyAxiosIntreditInstance.interceptors.response.use(
        (response) => response,
        (error) => {

      
          if (error.response && error.response.status === 400) {
            GenerateError(error.response.data.message);

          }
      
          return Promise.reject(error);
        }
      ); 




