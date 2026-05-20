import "./App.css";

import {

  useState,
  useEffect

} from "react";

import {

  Routes,
  Route,
  Navigate

} from "react-router-dom";

/* Pages */

import Dashboard from "./pages/Dashboard";

import Reports from "./pages/Reports";

import WeeklyEntry from "./pages/WeeklyEntry";

import Login from "./pages/Login";

import Notifications from "./pages/Notifications";

import Settings from "./pages/Settings";

import Projects from "./pages/Projects";

import Attendance from "./pages/Attendance";

import Leave from "./pages/Leave";

import Profile from "./pages/Profile";

import Admin from "./pages/Admin";

/* Layout */

import MainLayout from "./layouts/MainLayout";

/* Protected Route */

import ProtectedRoute
from "./components/ProtectedRoute";

/* Toastify */

import {

  ToastContainer

} from "react-toastify";

import
"react-toastify/dist/ReactToastify.css";

function App() {

  /* Dark Mode State */

  const [darkMode, setDarkMode] =

    useState(() => {

      return JSON.parse(

        localStorage.getItem(
          "darkMode"
        )

      ) || false;

    });

  /* Save Dark Mode */

  useEffect(() => {

    localStorage.setItem(

      "darkMode",

      JSON.stringify(darkMode)

    );

  }, [darkMode]);

  /* User Role */

  const role =

    localStorage.getItem("role");

  /* Login Status */

  const isLoggedIn =

    localStorage.getItem(
      "isLoggedIn"
    );

  return (

    <div

      className={

        darkMode

        ?

        "dark-theme"

        :

        "light-theme"

      }

    >

      {/* Theme Toggle Button */}

      <button

        className="theme-btn"

        onClick={() =>

          setDarkMode(
            !darkMode
          )

        }

      >

        {

          darkMode

          ?

          "☀ Light Mode"

          :

          "🌙 Dark Mode"

        }

      </button>

      {/* Toast Notification */}

      <ToastContainer

        position="top-right"

        autoClose={3000}

        hideProgressBar={false}

        newestOnTop={true}

        closeOnClick

        pauseOnHover

        draggable

        theme={

          darkMode

          ?

          "dark"

          :

          "light"

        }

      />

      {/* Application Routes */}

      <Routes>

        {/* Login Page */}

        <Route

          path="/login"

          element={

            isLoggedIn === "true"

            ?

            <Navigate to="/" />

            :

            <Login />

          }

        />

        {/* Protected Routes */}

        <Route

          path="/"

          element={

            <ProtectedRoute>

              <MainLayout />

            </ProtectedRoute>

          }

        >

          {/* Dashboard */}

          <Route

            index

            element={<Dashboard />}

          />

          {/* Weekly Entry */}

          <Route

            path="weekly"

            element={<WeeklyEntry />}

          />

          {/* Reports */}

          <Route

            path="reports"

            element={<Reports />}

          />

          {/* Notifications */}

          <Route

            path="notifications"

            element={<Notifications />}

          />

          {/* Projects */}

          <Route

            path="projects"

            element={<Projects />}

          />

          {/* Attendance */}

          <Route

            path="attendance"

            element={<Attendance />}

          />

          {/* Leave */}

          <Route

            path="leave"

            element={<Leave />}

          />

          {/* Profile */}

          <Route

            path="profile"

            element={<Profile />}

          />

          {/* Settings */}

          <Route

            path="settings"

            element={<Settings />}

          />

          {/* Admin Panel */}

          <Route

            path="admin"

            element={

              role === "admin"

              ?

              <Admin />

              :

              <Navigate to="/" />

            }

          />

        </Route>

        {/* Invalid Route Redirect */}

        <Route

          path="*"

          element={
            <Navigate to="/" />
          }

        />

      </Routes>

    </div>

  );
}

export default App;