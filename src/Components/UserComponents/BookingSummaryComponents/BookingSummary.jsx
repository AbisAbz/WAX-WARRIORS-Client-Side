import React,{useState, useEffect} from 'react'
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useSelector } from 'react-redux';
import { fetchAllUserSummaryApi } from '../../../Api/UserApi';
import { useNavigate } from 'react-router-dom';


function BookingSummary() {
    const id = useSelector(state => state.user.id);
    const [summaryDatas, setSummaryDatas] = useState([])
    const [active, setActive] = React.useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPage, settotalPage] = useState()

    const navigate = useNavigate();
    
    

    useEffect(() => {
        const fetchBookedDatas = async() => {
             try {
                const response = await fetchAllUserSummaryApi(id,active)
                setLoading(true);
                settotalPage(response.data.totalPages)
                setSummaryDatas(response.data.bookingSummeryData)
             } catch (error) {
                console.log(error);
             }

        }
        fetchBookedDatas();
    },[id, active])


    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
      });
    
      const next = () => {
        if (active === totalPage) return;
    
        setActive(active + 1);
      };
    
      const prev = () => {
        if (active === 1) return;
    
        setActive(active - 1);
      };


  return (
    <>
  {loading ? (
    <div>
      <div className="py-9">
        <div className="contai-section">
          <Typography
            variant="h3"
            className="mr-4 ml-2 cursor-pointer py-1.5 text-gray-800 sm:text-2xl sm:font-extralight"
          >
            Bookings
          </Typography>
          <hr className="border-1 border-gray-400" />
          <div className="contai-section">
            {summaryDatas &&
              summaryDatas?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="p-3 w-full flex flex-col md:flex-row justify-between items-center bg-white border-b border-gray-500  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="md:flex items-center gap-4">
                      <img
                        className="object-fill w-full rounded-t-lg h-[8rem] md:w-36 md:rounded-none md:rounded-l-lg"
                        src={
                          item.propertyId &&
                          item.propertyId.images &&
                          item.propertyId.images[1]
                        }
                        alt=""
                      />

                      <div className="p-3 leading-normal">
                        <h6 className="font-san mb-5 text-xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                          Booking on {item.date}
                        </h6>
                        <h6 className="font-san mb-5 text-xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                          Booking on {item.time}
                        </h6>
                        <h6 className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-gray-700">
                          {item.propertyId?.propertyName}
                        </h6>
                        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                          {item.propertyId?.district},{" "}
                          {item.propertyId?.state}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button onClick={() => navigate(`/summaryview`, { state: { bookingId: item._id} })}>
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-7 items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPage }).map((_, index) => (
            <IconButton key={index} {...getItemProps(index + 1)}>
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === totalPage}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      Loading.......
    </div>
  )}
</>

  )
}

export default BookingSummary