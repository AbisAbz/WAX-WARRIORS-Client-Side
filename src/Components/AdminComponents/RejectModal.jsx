import React,{useState} from "react";
import { rejectResponse } from '../../Api/AdminApi'
import { GenerateSuccess, GenerateError } from "../../Toast/Toast";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function DialogDefault(props) {
  const [open, setOpen] = React.useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
 
  const handleOpen = () => setOpen(!open);

  const rejectMailer = async() => {
    try {
      handleOpen();
        const response = await rejectResponse(props.id, rejectionReason)
        if(response) {
           props.rejectFunc(true)
          GenerateSuccess(response.data.message);}
        
    } catch (error) {
      console.error("Error in rejectMailer:", error);
      GenerateError("Error in rejectMailer")
    }
  }
 
  return (
    <>
      <Button onClick={handleOpen} className="bg-red-500 rounded-md font-medium " size="sm">
        Reject
      </Button>
      <Dialog open={open} handler={handleOpen}>
  <DialogHeader>Reject Property Request</DialogHeader>
  <DialogBody>
    Are you sure you want to{" "}
    <span className="font-extrabold text-deep-orange-700">Reject</span> this proposal?
    <input
      type="text"
      placeholder="Enter the reason for rejection..."
      className="mt-4 border p-2 w-full"
      value={rejectionReason}
      onChange={(e) => setRejectionReason(e.target.value)}
    />
  </DialogBody>
  <DialogFooter>
    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
      <span>Cancel</span>
    </Button>
    <Button variant="gradient" color="green" onClick={()=>rejectMailer()}>
      <span>Confirm</span>
    </Button>
  </DialogFooter>
</Dialog>

    </>
  );
}