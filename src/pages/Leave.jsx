import {
  useState,
  useEffect
} from "react";

function Leave() {

  const role =
    localStorage.getItem("role");

  const [leaveType, setLeaveType] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [leaves, setLeaves] =
    useState(() => {

      const savedLeaves =
        localStorage.getItem("leaves");

      return savedLeaves
        ? JSON.parse(savedLeaves)
        : [];

    });

  useEffect(() => {

    localStorage.setItem(
      "leaves",
      JSON.stringify(leaves)
    );

  }, [leaves]);

  const applyLeave = () => {

    if(
      leaveType === ""
      ||
      reason === ""
    ){
      alert("Fill all fields");
      return;
    }

    const newLeave = {

      type: leaveType,

      reason: reason,

      status: "Pending"

    };

    setLeaves([
      ...leaves,
      newLeave
    ]);

    setLeaveType("");

    setReason("");

  };

  return (

    <div>

      <h1>Leave Management</h1>

      {
        role === "employee" &&

        <div className="card">

          <h3>Apply Leave</h3>

          <select
            value={leaveType}
            onChange={(e) =>
              setLeaveType(e.target.value)
            }
          >

            <option value="">
              Select Leave Type
            </option>

            <option value="Sick Leave">
              Sick Leave
            </option>

            <option value="Casual Leave">
              Casual Leave
            </option>

          </select>

          <input
            type="text"
            placeholder="Reason"
            value={reason}
            onChange={(e) =>
              setReason(e.target.value)
            }
          />

          <button
            onClick={applyLeave}
          >
            Apply Leave
          </button>

        </div>
      }

      <div className="employee-list">

        <h2>Leave History</h2>

        {
          leaves.map((item, index) => (

            <div
              key={index}
              className="employee-card"
            >

              <p>

                <strong>Type:</strong>

                {item.type}

              </p>

              <p>

                <strong>Reason:</strong>

                {item.reason}

              </p>

              <p>

                <strong>Status:</strong>

                {item.status}

              </p>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Leave;