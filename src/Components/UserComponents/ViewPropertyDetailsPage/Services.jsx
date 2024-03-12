import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import DialogDefault from './FullServiceDetails';

export default function SimpleCard({ service }) {

  return (
    <>
      {service &&
        service.map((item, index) => (
          <Card key={index} className="mt-6 w-96 shadow-xl bg-brown-50 " style={{ maxWidth: '300px' }}>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {item.serviceName}
              </Typography>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                ₹ {item.price}
              </Typography>
              <Typography>
                {item.description.split(' ').slice(0, 30).join(' ')}
                {item.description.split(' ').length > 30 ? '...' : ''}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <DialogDefault data={item} />
            </CardFooter>
          </Card>
        ))
      }
    </>
  );
}


