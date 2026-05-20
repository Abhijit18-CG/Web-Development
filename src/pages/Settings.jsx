function Settings() {

  const role =
    localStorage.getItem("role");

  return (

    <div>

      <h1>Settings</h1>

      <div className="card">

        <h3>Profile Information</h3>

        <p>
          User Role:
          {
            role === "admin"
            ? " Admin"

            : role === "manager"
            ? " Manager"

            : " Employee"
          }
        </p>

        <p>
          Application:
          TimeSheet Management System
        </p>

      </div>

      <div className="card">

        <h3>Theme Settings</h3>

        <p>
          You can switch between
          dark and light mode.
        </p>

      </div>

      <div className="card">

        <h3>Account Settings</h3>

        <p>
          Manage your account access
          and preferences.
        </p>

      </div>

    </div>
  );
}

export default Settings;