import React, {useState} from 'react'
import { 
  Typography,
  Tab,
  Tabs,
  TabsBody,
  TabsHeader,
  TabPanel,
  Rating
} from '@material-tailwind/react'
import SinglePropertyImages from './SinglePropertyImages'



function SinglePropertyDetails() {

  const [activeTab, setActiveTab] = useState()


  const data = [
     {
      label:"About",
      value: 1,
     },
     {
      label:"Services",
      value: 2,
     },
     {
      label:"Reviews",
      value: 3,
     },
     {
      label:"Add Reviews",
      value: 4,
     },

  ]
  return (
    <>
    <SinglePropertyImages />
    <div className="flex flex-col sm:flex-row justify-between items-center">
  <Typography variant="h4" color="deep-purple" className="mb-2 sm:mb-0">
    American Car Wash
  </Typography>
  <Rating />
</div>
<div >
  <Typography variant='small' color='black'>
    Kerala, Kozhikode
  </Typography>

</div>
<div className='mt-7'>
      <Tabs>
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </div>

    </>
  )
}

export default SinglePropertyDetails