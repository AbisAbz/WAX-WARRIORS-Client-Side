import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { userBlockApi } from "../../Api/AdminApi";
import { GenerateSuccess } from "../../Toast/Toast";


// eslint-disable-next-line react/prop-types
export default function DialogDefault(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);


  const userBlock = async() => {
    console.log("i reach in block function");
      const response = await userBlockApi(props)
      if(response) props.statusFunction(true);
      setOpen(!open)
      GenerateSuccess(response.data.message)

  }


  return (
    <>
    {props.is_block ?  <Button
        className="bg-green-400 rounded-md font-medium"
        size="sm"
        onClick={handleOpen}
      >
      UnBlock
          
      </Button> :

      <Button
        className="bg-red-500 rounded-md font-medium"
        size="sm"
        onClick={handleOpen}
      >
      Block
          
      </Button>
}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a user block confirm dialog.</DialogHeader>
        <DialogBody>Are you sure you want to blog user </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={userBlock}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
