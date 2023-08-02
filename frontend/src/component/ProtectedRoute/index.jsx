import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("jwtToken") !== null;

  // useEffect(() => {
  //   console.log("isAuthenticated-tokennnnn: ", isAuthenticated);
  // });

  // If the user is authenticated, render the component
  if (isAuthenticated) {
    return element;
  }

  // If the user is not authenticated, redirect to the login page
  return <Navigate to="/login" />;
};

// Define prop types for the ProtectedRoute component
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
