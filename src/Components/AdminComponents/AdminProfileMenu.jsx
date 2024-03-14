import React from "react";
import { useNavigate } from "react-router-dom";

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
  } from "@material-tailwind/react";
   
  export default function ProfileMenu() {
    const navigate = useNavigate(); 
   
   const adminLogout = () => {
    
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
   }

    return (
      <Menu>
        <MenuHandler>
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointer"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </MenuHandler>
        <MenuList>
          <MenuItem className="flex items-center gap-2">

            <Typography variant="small" className="font-medium" onClick={adminLogout}>
              Sign Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }