import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function DialogDefault({data}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Read More......
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{data.serviceName}</DialogHeader>
        <DialogBody>
          {data.description}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="purple"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Back</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}