import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthRedirect = ({ children }) => {
  const isAuthenticated = localStorage.getItem("jwtToken") !== null;

  // If the JWT token exists and is not empty, redirect to the home page
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  // If the JWT token does not exist or is empty, render the children components
  return children;
};

export default AuthRedirect;
