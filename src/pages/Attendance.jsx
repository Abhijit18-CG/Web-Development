import {
  useState,
  useEffect
} from "react";

import {
  toast
} from "react-toastify";

function Attendance() {

  const role =
    localStorage.getItem("role");

  const userEmail =
    localStorage.getItem("userEmail");

  const [attendanceData, setAttendanceData] =
    useState(() => {

      const savedData =
        localStorage.getItem(
          "attendanceData"
        );

      return savedData
        ? JSON.parse(savedData)
        : [];

    });

  const [loginPhoto, setLoginPhoto] =
    useState(null);

  const [logoutPhoto, setLogoutPhoto] =
    useState(null);

  useEffect(() => {

    localStorage.setItem(

      "attendanceData",

      JSON.stringify(attendanceData)

    );

  }, [attendanceData]);

  /* Current Date */

  const currentDate =
    new Date().toLocaleDateString();

  /* Current Time */

  const currentTime =
    new Date();

  /* Login Time Limit */

  const loginDeadline =
    new Date();

  loginDeadline.setHours(9);
  loginDeadline.setMinutes(35);

  /* Logout Time Limit */

  const logoutDeadline =
    new Date();

  logoutDeadline.setHours(17);
  logoutDeadline.setMinutes(30);

  /* Today's Attendance */

  const todayAttendance =
    attendanceData.find(

      (item) =>

        item.email === userEmail

        &&

        item.date === currentDate

    );

  /* Convert Image */

  const convertToBase64 = (file, callback) => {

    const reader =
      new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {

      callback(reader.result);

    };

  };

  /* Handle Login */

  const handleLogin = () => {

    if(!loginPhoto){

      toast.error(
        "Please Upload Login Photo"
      );

      return;
    }

    if(todayAttendance){

      toast.warning(
        "Already Logged In Today"
      );

      return;
    }

    const isLate =
      currentTime > loginDeadline;

    const newAttendance = {

      email: userEmail,

      role: role,

      date: currentDate,

      loginTime:
        currentTime.toLocaleTimeString(),

      logoutTime: "",

      loginPhoto: loginPhoto,

      logoutPhoto: "",

      status: "Present",

      anomaly:

        isLate
        ? "Late Login"
        : "No Anomaly"

    };

    setAttendanceData([
      ...attendanceData,
      newAttendance
    ]);

    toast.success(
      "Login Successful"
    );

  };

  /* Handle Logout */

  const handleLogout = () => {

    if(!logoutPhoto){

      toast.error(
        "Please Upload Logout Photo"
      );

      return;
    }

    const updatedAttendance =
      attendanceData.map((item) => {

        if(

          item.email === userEmail

          &&

          item.date === currentDate

        ){

          const isEarlyLogout =
            currentTime < logoutDeadline;

          return {

            ...item,

            logoutTime:
              currentTime.toLocaleTimeString(),

            logoutPhoto:
              logoutPhoto,

            anomaly:

              item.anomaly ===
              "Late Login"

              &&

              isEarlyLogout

              ?

              "Late Login + Early Logout"

              :

              isEarlyLogout

              ?

              "Early Logout"

              :

              item.anomaly

          };

        }

        return item;

      });

    setAttendanceData(
      updatedAttendance
    );

    toast.success(
      "Logout Successful"
    );

  };

  return (

    <div className="attendance-container">

      <h1>
        Attendance System
      </h1>

      {/* Employee & Manager */}

      {
        role !== "admin"

        &&

        <div className="attendance-card">

          <h2>
            Daily Attendance
          </h2>

          {/* Login Photo */}

          <div className="photo-upload-box">

            <label>
              Upload Login Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>

                convertToBase64(

                  e.target.files[0],

                  (base64) =>

                    setLoginPhoto(base64)

                )

              }
            />

          </div>

          <button
            className="attendance-btn"
            onClick={handleLogin}
          >

            Check In

          </button>

          {/* Logout Photo */}

          <div className="photo-upload-box">

            <label>
              Upload Logout Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>

                convertToBase64(

                  e.target.files[0],

                  (base64) =>

                    setLogoutPhoto(base64)

                )

              }
            />

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            Check Out

          </button>

        </div>
      }

      {/* Attendance History */}

      <div className="attendance-history">

        <h2>
          Attendance History
        </h2>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>Email</th>

                <th>Role</th>

                <th>Date</th>

                <th>Login</th>

                <th>Logout</th>

                <th>Status</th>

                <th>Anomaly</th>

                <th>Login Photo</th>

                <th>Logout Photo</th>

              </tr>

            </thead>

            <tbody>

              {
                attendanceData.length === 0

                ?

                <tr>

                  <td colSpan="9">
                    No Attendance Found
                  </td>

                </tr>

                :

                attendanceData

                  .filter((item) =>

                    role === "admin"

                    ||

                    item.email === userEmail

                  )

                  .map((item, index) => (

                    <tr key={index}>

                      <td>
                        {item.email}
                      </td>

                      <td>
                        {item.role}
                      </td>

                      <td>
                        {item.date}
                      </td>

                      <td>
                        {item.loginTime}
                      </td>

                      <td>
                        {item.logoutTime || "----"}
                      </td>

                      <td>
                        {item.status}
                      </td>

                      <td>

                        <span
                          className={
                            item.anomaly !==
                            "No Anomaly"

                            ?

                            "anomaly-text"

                            :

                            "normal-text"
                          }
                        >

                          {item.anomaly}

                        </span>

                      </td>

                      <td>

                        {
                          item.loginPhoto

                          &&

                          <img
                            src={item.loginPhoto}
                            alt="login"
                            width="60"
                          />
                        }

                      </td>

                      <td>

                        {
                          item.logoutPhoto

                          &&

                          <img
                            src={item.logoutPhoto}
                            alt="logout"
                            width="60"
                          />
                        }

                      </td>

                    </tr>

                  ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Attendance;