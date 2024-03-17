import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPropOwnerDetails } from "../../Redux/PropertySlice";
import { useParams } from "react-router-dom";
import { EmailVerify } from '../../Api/PropertyApi'
import waxicon from '../../assets/Icon/Wax Warriors Logo car-no name- RED New.ico'
import { Link } from "react-router-dom";
import { GenerateSuccess } from "../../Toast/Toast";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import ProfileMenu from './PropertyProfileMenu'

export default function ComplexNavbar() {
    const [isSticky, setIsSticky] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const  name  = useSelector((state) => {
      return state.owner.name;
    });
    

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                if (params.id && params.token) {
                    const response = await EmailVerify(params.id, params.token);
                    if (response.status === 200) {
                        localStorage.setItem("subAdminToken", response.data.propertyToken);
                        setTimeout(() => {
                            GenerateSuccess(response.data.message);
                        }, 300);
                        dispatch(
                            setPropOwnerDetails({
                                id: response.data.propOwnerData._id,
                                name: response.data.propOwnerData.name,
                                email: response.data.propOwnerData.email,
                                mobile: response.data.propOwnerData.mobile,
                                image: response.data.propOwnerData.image,
                            })
                        );
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        verifyEmailUrl();
    }, [dispatch, params.id, params.token]);

    return (
        <div className={`sticky top-0 z-50 ${isSticky ? 'bg-white shadow-xl shadow-black'  : 'bg-opacity-75'}`}>
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
                        {localStorage.getItem("subAdminToken") ? (
                            <>
                                <span>{name.toUpperCase()}</span>
                                <ProfileMenu />
                            </>
                        ) : (
                            <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                                <Link to="/property/login"><span>Log In</span></Link>
                            </Button>
                        )}
                    </div>
                </div>
            </Navbar>
        </div>
    );
}
