import { useState } from "react";

import {
  useNavigate,
  Navigate
} from "react-router-dom";

import { toast } from "react-toastify";

function Login() {

  /* Already Logged In */

  const isLoggedIn =
    localStorage.getItem(
      "isLoggedIn"
    );

  /* States */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  /* Redirect */

  if(isLoggedIn){

    return <Navigate to="/" />;
  }

  /* Login Function */

  const handleLogin = () => {

    /* Empty Validation */

    if(
      email.trim() === ""
      ||
      password.trim() === ""
    ){

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    /* Email Validation */

    const emailPattern =

      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(
      !emailPattern.test(email)
    ){

      toast.error(
        "Please enter valid email"
      );

      return;
    }

    /* Loading Start */

    setLoading(true);

    setTimeout(() => {

      /* Admin Login */

      if(
        email ===
        "admin@gmail.com"
        &&
        password ===
        "12345"
      ){

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "role",
          "admin"
        );

        localStorage.setItem(
          "userEmail",
          email
        );

        localStorage.setItem(
          "userName",
          "Abhijit Admin"
        );

        toast.success(
          "Admin Login Successful"
        );

        navigate("/");
      }

      /* Manager Login */

      else if(
        email ===
        "manager@gmail.com"
        &&
        password ===
        "12345"
      ){

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "role",
          "manager"
        );

        localStorage.setItem(
          "userEmail",
          email
        );

        localStorage.setItem(
          "userName",
          "Manager User"
        );

        toast.success(
          "Manager Login Successful"
        );

        navigate("/");
      }

      /* Employee Login */

      else if(
        email ===
        "employee@gmail.com"
        &&
        password ===
        "12345"
      ){

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "role",
          "employee"
        );

        localStorage.setItem(
          "userEmail",
          email
        );

        localStorage.setItem(
          "userName",
          "Employee User"
        );

        toast.success(
          "Employee Login Successful"
        );

        navigate("/");
      }

      /* Invalid Login */

      else{

        toast.error(
          "Invalid Email or Password"
        );

      }

      /* Loading End */

      setLoading(false);

    }, 1000);

  };

  return (

    <div className="login-page">

      <div className="login-box">

        {/* Heading */}

        <h1>
          ⏱ TimeSheet Login
        </h1>

        <p className="login-text">
          Welcome Back 👋
        </p>

        {/* Email */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {/* Password */}

        <div className="password-box">

          <input
            type={
              showPassword
              ?
              "text"
              :
              "password"
            }
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="button"
            className="show-btn"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >

            {
              showPassword
              ?
              "Hide"
              :
              "Show"
            }

          </button>

        </div>

        {/* Login Button */}

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >

          {
            loading
            ?
            "Logging In..."
            :
            "Login"
          }

        </button>

        {/* Demo Credentials */}

        <div className="demo-login">

          <h3>
            Demo Login
          </h3>

          <p>
            👑 Admin :
            admin@gmail.com
          </p>

          <p>
            🧑‍💼 Manager :
            manager@gmail.com
          </p>

          <p>
            👨‍💻 Employee :
            employee@gmail.com
          </p>

          <p>
            🔑 Password :
            12345
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
