import React, { useState, useEffect } from 'react';
import {  useGoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { SignUpGoogle } from '../../Api/UserApi';
import {setUserDetails} from '../../Redux/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GenerateSuccess } from '../../Toast/Toast';
import axios from 'axios';

export default function GoogleSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      if (codeResponse.access_token) {
        fetchData(codeResponse.access_token);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    // Fetch data function
    const fetchData = async (accessToken) => {
      try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        });

        setUser(response.data);

        const resback = await SignUpGoogle(response.data);
        console.log("iam resback", resback);

        if (resback.status === 200) {
          localStorage.setItem('userToken', resback.data.userToken);
          GenerateSuccess(resback.data.message);
          
          dispatch(
            setUserDetails({
              id: resback.data.userData._id,
              name: resback.data.userData.name,
              email: resback.data.userData.email,
            })
          );
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user data or sending data to backend:', error);
      }
    };

 
    if (user && user.access_token) {
      fetchData(user.access_token);
    }
  }, [user]); 



  return (
    <div>
      <button onClick={() => login()}>
        <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437', marginRight: '8px' }} />
        Sign in with Google
      </button>
    </div>
  );
}
