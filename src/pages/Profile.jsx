import {
  useState,
  useEffect
} from "react";

function Profile() {

  const role =
    localStorage.getItem("role");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [phone, setPhone] =
    useState("");

  useEffect(() => {

    const savedProfile =
      JSON.parse(
        localStorage.getItem("profile")
      );

    if(savedProfile){

      setName(savedProfile.name);

      setEmail(savedProfile.email);

      setDepartment(
        savedProfile.department
      );

      setPhone(savedProfile.phone);

    }

  }, []);

  const saveProfile = () => {

    const profileData = {

      name,

      email,

      department,

      phone

    };

    localStorage.setItem(
      "profile",
      JSON.stringify(profileData)
    );

    alert("Profile Saved");

  };

  return (

    <div>

      <h1>Employee Profile</h1>

      <div className="card">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <button onClick={saveProfile}>
          Save Profile
        </button>

      </div>

      <div className="card">

        <h3>Role Information</h3>

        <p>

          Current Role:

          {
            role === "admin"
            ? " Admin"

            : role === "manager"
            ? " Manager"

            : " Employee"
          }

        </p>

      </div>

    </div>
  );
}

export default Profile;