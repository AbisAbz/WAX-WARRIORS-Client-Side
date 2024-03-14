import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import { FaCommentAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import {
  PresentationChartBarIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
 
export default function DefaultSidebar() {
  const navigate = useNavigate(); 
 
 const adminLogout = () => {
  
      localStorage.removeItem('adminToken')
      navigate('/admin/login')
 }

  return (
    <Card className="h-screen md:h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-black sticky top-0">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin"><span>Your Dashboard</span></Link>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/userlist"><span >Your Userlist</span></Link>
          <ListItemSuffix></ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaCommentAlt className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/propertylist"><span >Property List</span></Link>
         
        </ListItem>
        <ListItem onClick={adminLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix >
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
