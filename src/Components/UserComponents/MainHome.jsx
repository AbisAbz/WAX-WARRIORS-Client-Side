import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from "@material-tailwind/react";
import image from "../../assets/UsserAssets/wax.png";
import image2 from "../../assets/UsserAssets/wax-2.png";

function MainHome() {
  const controls = useAnimation();
  const paragraphControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    // Animate the h1 element when the component mounts
    controls.start({ opacity: 1, x: 0, transition: { duration: 1.5, ease: 'easeOut' } });

    // Animate the p element when the component mounts
    paragraphControls.start({ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5, ease: 'easeOut' } });

    // Animate the button when the component mounts
    buttonControls.start({ opacity: 1, y: 0, transition: { duration: 1, delay: 1, ease: 'easeOut' } });
  }, [controls, paragraphControls, buttonControls]);

  return (
    <div className='bg-gradient-to-r from-gray-50 via-brown-200 to-black w-screen h-screen'>
      <div className='container mx-auto flex items-end'>
        <div className=' flex w-full flex-col' style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
          <motion.h1
            className="w-[30%] italic text-[10rem] font-[900] mt-16 ml-0"
            style={{ lineHeight: '10rem', letterSpacing: "-6px" }}
            initial={{ opacity: 0, x: -80 }}
            animate={controls}
          >
            LET'S DO IT.
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={paragraphControls}>
            <p className='w-[50%]'>
              Discover unmatched shine and protection with <strong>Wax Warriors</strong>. 
              Our expert detailing services bring out the best in your vehicle, ensuring it reigns supreme on the road. 
              Experience car care excellence like never before.
            </p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={buttonControls}>
          <Button size="sm" color="white" className="flex items-center gap-3">
            <img
              src={image}
              alt="metamask"
              style={{ height: '3rem', width: '6rem', objectFit: 'contain' }}
            />
            GO 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default MainHome;
