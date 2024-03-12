import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { GenerateSuccess } from "../../Toast/Toast";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from '../../Redux/UserSlice'
import { Link, useNavigate, useParams } from "react-router-dom";
import { EmailVerify } from '../../Api/UserApi'
import { Navbar, Typography, Button } from "@material-tailwind/react";
import waxicon from '../../assets/Icon/Wax Warriors Logo car-no name- RED New.ico'
import { ToastContainer } from "react-toastify";

const NavbarDefault = () => {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.user);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        if (id && token) {
          const response = await EmailVerify(id, token);
          if (response.status === 200) {
            localStorage.setItem("userToken", response.data.userToken);

            setTimeout(() => {
              GenerateSuccess(response.data.message);
            }, 300);

            dispatch(
              setUserDetails({
                id: response.data.userData._id,
                name: response.data.userData.name,
                email: response.data.userData.email,
                mobile: response.data.userData.mobile,
              })
            );
          }

        }
      } catch (error) {
        console.error(error);
      }
    };

    verifyEmailUrl();

  }, [id, token, dispatch]);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`sticky top-0 z-50 bg-white shadow-md ${isSticky ? 'bg-opacity-75' : ''}`}>
      <Navbar className="w-full mx-auto px-4 py-2 lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900 lg:px-4">

        <Typography
  as="a"
  href="#"
  className="mr-4 cursor-pointer py-1.5 font-medium flex flex-col items-center lg:flex-row lg:items-center"
>
  <span className="order-1 lg:order-1 lg:mr-1">Wax</span>
  <span className="order-2 lg:order-2">Warrior</span>
</Typography>

            
          <img
              src={waxicon}
              alt="Wax Warriors Logo"
              className="h-14 w-24 object-contain mr-2 ml-4"
            />
          <div className="flex items-center gap-x-1">
            {localStorage.getItem("userToken") ? (
              <>
                <span>{name.toUpperCase()}</span>
                <ProfileMenu />
              </>
            ) : (
              <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                <Link to="/login"><span>Log In</span></Link>
              </Button>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarDefault;
