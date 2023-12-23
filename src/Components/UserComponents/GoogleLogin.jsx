import React,{ useState, useEffect } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {GoogleLogin} from '../../Api/UserApi'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../Redux/UserSlice';
import axios from 'axios';


export default function GoogleSignup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ user, setUser ] = useState([]);
 
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    });


    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    });
    
                    setUser(response.data);

                  const resback =   await GoogleLogin(response.data);
                    
                    if(resback.status === 200){
                        localStorage.setItem("userToken", resback.data.userToken);
                        dispatch(setUserDetails({
                            id     : resback.data.exist._id,
                            name   : resback.data.exist.name,
                            email  : resback.data.exist.email,
                        }))
                        navigate('/')

                    }
    
                } catch (error) {
                    console.error('Error fetching user data or sending data to backend:', error);
                }
            }
        };
    
        fetchData();
    }, [user]);
    
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    console.log("iam the userState", user);
   
    return (
        <div>
        
        <button onClick={() => login()}>
  <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437', marginRight: '8px' }} />
  Sign in with Google 
</button>

     
        
    </div>
    )
    

}

