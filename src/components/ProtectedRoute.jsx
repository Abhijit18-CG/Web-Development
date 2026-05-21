import {
  Navigate
} from "react-router-dom";

function ProtectedRoute({

  children

}) {

  // Check Login Status

  const isLoggedIn =

    localStorage.getItem(
      "isLoggedIn"
    );

  // If User Not Logged In

  if(
    isLoggedIn !== "true"
  ){

    return (

      <Navigate
        to="/login"
        replace
      />

    );
  }

  // If Logged In

  return children;
}

export default ProtectedRoute;