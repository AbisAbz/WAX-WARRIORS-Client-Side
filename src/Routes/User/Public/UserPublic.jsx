import { Navigate, Outlet } from 'react-router-dom';

export default function UserPublic() {
  const isLoggedIn = localStorage.getItem('userToken');

  if (isLoggedIn) {
  return <Navigate to='/' />;
  } else {
    return <Outlet />;
  }
}

