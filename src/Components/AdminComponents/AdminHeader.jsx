import React from "react";
import {
  Navbar,
  Button,
} from "@material-tailwind/react";

import  ProfileMenu from './AdminProfileMenu'


 
export default function NavList() {
  return (
    <>
    <Navbar className="w-full p-2 h-max max-w-full">
  <div className="flex items-center justify-between text-blue-gray-900">
    <div className="ml-auto flex items-center space-x-4">
      <Button size="sm" variant="text">
        <span>Log In</span>
      </Button>
      <ProfileMenu />
    </div>
  </div>
</Navbar>

    </>
  );
}