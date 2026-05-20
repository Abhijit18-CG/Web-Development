import {

  NavLink,
  Outlet,
  useNavigate

} from "react-router-dom";

import {

  useState

} from "react";

function MainLayout() {

  const navigate =

    useNavigate();

  /* Sidebar Toggle */

  const [sidebarOpen, setSidebarOpen] =

    useState(false);

  /* Role */

  const role =

    localStorage.getItem("role");

  /* Notifications */

  const notifications =

    JSON.parse(

      localStorage.getItem(
        "notifications"
      )

    ) || [];

  const notificationCount =

    notifications.length;

  /* User Name */

  const userName =

    role === "admin"

    ? "Abhijit Admin"

    : role === "manager"

    ? "Manager User"

    : "Employee User";

  /* Role Label */

  const roleLabel =

    role === "admin"

    ? "Admin Panel"

    : role === "manager"

    ? "Manager Panel"

    : "Employee Panel";

  /* Logout Function */

  const handleLogout = () => {

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "notifications"
    );

    setSidebarOpen(false);

    navigate("/login");

  };

  /* Close Sidebar */

  const closeSidebar = () => {

    setSidebarOpen(false);

  };

  return (

    <div className="dashboard">

      {/* Mobile Menu Button */}

      <button

        className="menu-toggle-btn"

        onClick={() =>

          setSidebarOpen(
            !sidebarOpen
          )

        }

      >

        {

          sidebarOpen

          ?

          "✖ Close"

          :

          "☰ Menu"

        }

      </button>

      {/* Sidebar */}

      <div

        className={

          sidebarOpen

          ?

          "sidebar active-sidebar"

          :

          "sidebar"

        }

      >

        {/* Logo Section */}

        <div className="logo-section">

          <h2>

            ⏱ TimeSheet

          </h2>

          <p>

            Work Management System

          </p>

        </div>

        {/* User Info */}

        <div className="sidebar-user">

          <div className="user-avatar">

            {

              userName.charAt(0)

            }

          </div>

          <h3>

            {userName}

          </h3>

          <p>

            {roleLabel}

          </p>

        </div>

        {/* Navigation */}

        <ul>

          {/* Dashboard */}

          <li>

            <NavLink

              to="/"

              onClick={closeSidebar}

              className={({ isActive }) =>

                isActive

                ?

                "active-menu"

                :

                ""

              }

            >

              📊 Dashboard

            </NavLink>

          </li>

          {/* Weekly Entry */}

          <li>

            <NavLink

              to="/weekly"

              onClick={closeSidebar}

              className={({ isActive }) =>

                isActive

                ?

                "active-menu"

                :

                ""

              }

            >

              📝 Weekly Entry

            </NavLink>

          </li>

          {/* Reports */}

          <li>

            <NavLink

              to="/reports"

              onClick={closeSidebar}

              className={({ isActive }) =>

                isActive

                ?

                "active-menu"

                :

                ""

              }

            >

              📈 Reports

            </NavLink>

          </li>

          {/* Notifications */}

          <li>

            <NavLink

              to="/notifications"

              onClick={closeSidebar}

              className={({ isActive }) =>

                isActive

                ?

                "active-menu"

                :

                ""

              }

            >

              🔔 Notifications

              {

                notificationCount > 0

                &&

                <span
                  className="notification-badge"
                >

                  {notificationCount}

                </span>

              }

            </NavLink>

          </li>

          {/* Projects */}

          <li>

            <NavLink

              to="/projects"

              onClick={closeSidebar}

              className={({ isActive }) =>

                isActive

                ?

                "active-menu"

                :

                ""

              }

            >

              💼 Projects

            </NavLink>

          </li>

          {/* Attendance */}

          <li>

            <NavLink

              to="/attendance"

              onClick={closeSidebar}

              className={({ isActive }) =>

                isActive

                ?

                "active-menu"

                :

                ""

              }

            >

              📅 Attendance

            </NavLink>

          </li>

          {/* Leave */}

          <li>

            <NavLink

              to="/leave"

              onClick={closeSidebar}

              className={({ isActive }) =>

                isActive

                ?

                "active-menu"

                :

                ""

              }

            >

              🌴 Leave

            </NavLink>

          </li>

          {/* Profile */}

          <li>

            <NavLink

              to="/profile"

              onClick={closeSidebar}

              className={({ isActive }) =>

                isActive

                ?

                "active-menu"

                :

                ""

              }

            >

              👤 Profile

            </NavLink>

          </li>

          {/* Settings */}

          <li>

            <NavLink

              to="/settings"

              onClick={closeSidebar}

              className={({ isActive }) =>

                isActive

                ?

                "active-menu"

                :

                ""

              }

            >

              ⚙ Settings

            </NavLink>

          </li>

          {/* Admin Panel */}

          {

            role === "admin"

            &&

            <li>

              <NavLink

                to="/admin"

                onClick={closeSidebar}

                className={({ isActive }) =>

                  isActive

                  ?

                  "active-menu"

                  :

                  ""

                }

              >

                🛡 Admin Panel

              </NavLink>

            </li>

          }

        </ul>

        {/* Logout */}

        <button

          className="logout-btn"

          onClick={handleLogout}

        >

          🚪 Logout

        </button>

      </div>

      {/* Main Content */}

      <div className="main-content">

        <Outlet />

      </div>

    </div>

  );
}

export default MainLayout;