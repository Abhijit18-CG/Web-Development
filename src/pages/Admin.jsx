import { useEffect, useState } from "react";

function Admin() {

  const [entries, setEntries] =
    useState([]);

  useEffect(() => {

    const savedData =

      JSON.parse(
        localStorage.getItem(
          "timesheetEntries"
        )
      ) || [];

    setEntries(savedData);

  }, []);

  // Statistics

  const totalTasks =
    entries.length;

  const completedTasks =

    entries.filter(
      (item) =>
        item.status ===
        "Completed"
    ).length;

  const pendingTasks =

    entries.filter(
      (item) =>
        item.status ===
        "Pending"
    ).length;

  const totalHours =

    entries.reduce(

      (total, item) =>

        total +
        Number(item.hours),

      0
    );

  return (

    <div className="admin-container">

      <h1>
        Admin Panel
      </h1>

      {/* Cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h3>
            Total Tasks
          </h3>

          <p>
            {totalTasks}
          </p>

        </div>

        <div className="dashboard-card">

          <h3>
            Completed Tasks
          </h3>

          <p>
            {completedTasks}
          </p>

        </div>

        <div className="dashboard-card">

          <h3>
            Pending Tasks
          </h3>

          <p>
            {pendingTasks}
          </p>

        </div>

        <div className="dashboard-card">

          <h3>
            Total Hours
          </h3>

          <p>
            {totalHours}
          </p>

        </div>

      </div>

      {/* Task Table */}

      <div className="admin-table">

        <h2>
          All Tasks
        </h2>

        <table>

          <thead>

            <tr>

              <th>Task</th>

              <th>Status</th>

              <th>Priority</th>

              <th>Hours</th>

              <th>Due Date</th>

            </tr>

          </thead>

          <tbody>

            {
              entries.length === 0

              ?

              <tr>

                <td colSpan="5">

                  No Tasks Found

                </td>

              </tr>

              :

              entries.map(
                (item, index) => (

                <tr key={index}>

                  <td>
                    {item.task}
                  </td>

                  <td>
                    {item.status}
                  </td>

                  <td>
                    {item.priority}
                  </td>

                  <td>
                    {item.hours}
                  </td>

                  <td>
                    {item.dueDate}
                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Admin;