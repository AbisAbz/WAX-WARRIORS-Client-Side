import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import waxicon from '../../../assets/Icon/Wax Warriors Logo car-no name- RED New.ico'
import backgroundImage from '../../../assets/UsserAssets/view-3d-car.jpg';;
  
  function MainHome() {
    const controls = useAnimation();
    const paragraphControls = useAnimation();
    const buttonControls = useAnimation();
    const navigate = useNavigate();
  
    useEffect(() => {
      // Animate the h1 element when the component mounts
      controls.start({ opacity: 1, x: 0, transition: { duration: 1.5, ease: 'easeOut' } });
  
      // Animate the p element when the component mounts
      paragraphControls.start({ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5, ease: 'easeOut' } });
  
      // Animate the button when the component mounts
      buttonControls.start({ opacity: 1, y: 0, transition: { duration: 1, delay: 1, ease: 'easeOut' } });
    }, [controls, paragraphControls, buttonControls]);
  
    return (
      <div className='bg-gradient-to-r from-blue-500 via-red-200 to-black max-w-full h-screen flex justify-center items-center' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='container mx-auto'>
        <div className='flex flex-col items-center text-center' style={{ fontFamily: 'Nunito Sans, sans-serif', color: 'white' }}>
        <motion.h1
  className="text-5xl md:text-7xl lg:text-9xl italic font-bold mt-16 shadow-lg  shadow-deep-orange-200"
  initial={{ opacity: 0, x: -80 }}
  animate={controls}
  style={{ color: 'steelblue' }}
>
  LET'S DO IT.
</motion.h1>

  <motion.div initial={{ opacity: 0, y: 20 }} animate={paragraphControls}>
    <p className='text-lg md:text-xl lg:text-2xl mt-8 px-4 '>
      Discover unmatched shine and protection with <strong>Wax Warriors</strong>. 
      Our expert detailing services bring out the best in your vehicle, ensuring it reigns supreme on the road. 
      Experience car care excellence like never before.
    </p>
  </motion.div>
</div>

  
          <motion.div className='mt-8 flex justify-center w-full' initial={{ opacity: 0, y: 20 }} animate={buttonControls}>
          <Button className='h-16 w-32 shadow-xl shadow-blue-gray-100 rounded-xl' color="black"  onClick={() => navigate('/propertylist')}>
            <img
              src={waxicon}
              alt="Wax Warriors Logo"
              className="h-8 w-8 object-contain mr-2 ml-4"
            />
            <div className='flex justify-center h-8 w-20 ml-2 '>
            GO
            
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6 inline-block ml-2 pb-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
            </div>
          </Button>
          </motion.div>
        </div>
      </div>
    );
  }
  
  export default MainHome;