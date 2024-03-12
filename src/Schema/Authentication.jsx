import * as Yup from 'yup';

export const SignupSchema = Yup
        .object()
        .shape({
  name: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your Name'),
  email: Yup
        .string()
        .email('Invalid email')
        .required('Please enter your Email'),
  mobile: Yup
        .string()
        .matches(/^[0-9]+$/, 'Please enter only numbers')
        .min(10)
        .max(10, 'Please Enter Your Correct Number')
        .required('Please enter your Mobile No:'), 
  password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
        .required('Password is required'),
});

export const loginSchema = Yup
        .object()
        .shape({
  email: Yup
        .string()
        .email('Invalid email')
        .required('Please enter your Email'),
  password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
});

export const propertySchema = Yup
        .object()
        .shape({
  name:Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your Name'),
  slot:Yup
        .string()
        .matches(/^[0-9]+$/, 'Please enter only numbers')
        .min(1)
        .required('Please enter your slot count'),
  country:Yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your Country'),
  state:Yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your State'),
  district:Yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your District'),
  location:Yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your Location'),
 openingTime: Yup.string()
        .required("Please select a time"),
 closingTime: Yup.string()
        .required("Please select a time"),
mobile: Yup
        .string()
        .matches(/^[0-9]+$/, 'Please enter only numbers')
        .min(10)
        .max(10, 'Please Enter Your Correct Number')
        .required('Please enter your Mobile No:'),
  describe:Yup
        .string()
        .min(5, 'Too short!')
        .matches(/^[a-zA-Z\s!@#$%^&*()_:;'"+\-=\[\]{}|,.<>?\/]*$/, 'Invalid characters')
        .required('Please enter Description')
        })
        
        
        
        export const serviceSchema = Yup
        .object()
        .shape({
   name:Yup
        .string()
        .required('Please Select One Option'),
   price:Yup
        .number()
        .min(1)
        .required('Please enter your Price'),
 description:Yup
        .string()
        .min(5, 'Too short!')
        .matches(/^[a-zA-Z\s!@#$%^&*()_:;'"+\-=\[\]{}|,.<>?\/]*$/, 'Invalid characters')
        .required('Please enter Description')
        })


export const ProfileUbdate = Yup
        .object()
        .shape({
  name: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your Name'),
houseName: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your house name'),
 state: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your State'),
district: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Special characters are not allowed in the Name')
        .required('Please enter your district'),
 mobile: Yup
        .string()
        .matches(/^[0-9]+$/, 'Please enter only numbers')
        .min(10)
        .max(10, 'Please Enter Your Correct Number')
        .required('Please enter your Mobile No:'),
      })

export const ratingSchema = Yup
        .object()
        .shape({
 rating: Yup
        .number()
        .min(1, "Rating must be atleast 1")
        .required("please enter the rating"),
description: Yup
        .string()
        .max(1000, "Description must be at most 1000 characters")
        .required("please enter the description")

        })


export const bookingSchema = Yup
        .object()
        .shape({
 bookDate: Yup.date()
        .min(new Date(new Date().setHours(0, 0, 0, 0)), "Date must be today or later")
        .max(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "Date must be within the next 30 days")         
        .required("Please select a date"),
 bookTime: Yup.string()
         .required("Please select a time"),
bookServices: Yup.string()
         .required("Please select any Services "),
        });






