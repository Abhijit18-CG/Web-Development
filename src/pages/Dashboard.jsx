import {

  useEffect,
  useState

} from "react";

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid

} from "recharts";

function Dashboard() {

  /* Entries */

  const [entries, setEntries] =

    useState([]);

  /* Live Time */

  const [currentTime, setCurrentTime] =

    useState(new Date());

  /* Role */

  const role =

    localStorage.getItem("role");

  /* User Name */

  const userName =

    role === "admin"

    ? "Abhijit Admin"

    : role === "manager"

    ? "Manager User"

    : "Employee User";

  /* Dashboard Title */

  const dashboardTitle =

    role === "admin"

    ? "Admin Dashboard"

    : role === "manager"

    ? "Manager Dashboard"

    : "Employee Dashboard";

  /* Load Entries */

  useEffect(() => {

    const loadEntries = () => {

      try {

        const savedData =

          localStorage.getItem(
            "timesheetEntries"
          );

        if(savedData){

          setEntries(
            JSON.parse(savedData)
          );

        } else {

          setEntries([]);

        }

      } catch(error){

        console.log(
          "LocalStorage Error",
          error
        );

        setEntries([]);

      }

    };

    /* Initial Load */

    loadEntries();

    /* Auto Refresh */

    const interval = setInterval(() => {

      loadEntries();

    }, 1000);

    /* Storage Listener */

    window.addEventListener(
      "storage",
      loadEntries
    );

    return () => {

      clearInterval(interval);

      window.removeEventListener(
        "storage",
        loadEntries
      );

    };

  }, []);

  /* Live Clock */

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentTime(
        new Date()
      );

    }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  /* Dashboard Stats */

  const totalHours =

    entries.reduce(

      (total, item) =>

        total +
        Number(item.hours),

      0

    );

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

  const inProgressTasks =

    entries.filter(

      (item) =>

        item.status ===
        "In Progress"

    ).length;

  const highPriorityTasks =

    entries.filter(

      (item) =>

        item.priority ===
        "High"

    ).length;

  const completedHours =

    entries

      .filter(

        (item) =>

          item.status ===
          "Completed"

      )

      .reduce(

        (total, item) =>

          total +
          Number(item.hours),

        0

      );

  /* Pie Chart Data */

  const chartData = [

    {

      name: "Completed",

      value: completedTasks

    },

    {

      name: "Pending",

      value: pendingTasks

    },

    {

      name: "In Progress",

      value: inProgressTasks

    }

  ];

  /* Empty Chart Fix */

  const finalChartData =

    totalTasks === 0

    ?

    [

      {

        name: "No Data",

        value: 1

      }

    ]

    :

    chartData;

  /* Bar Chart Data */

  const hoursData = [

    {

      name: "Total Hours",

      hours: totalHours

    },

    {

      name: "Completed Hours",

      hours: completedHours

    }

  ];

  /* Colors */

  const COLORS = [

    "#00C49F",
    "#FFBB28",
    "#0088FE"

  ];

  /* Recent Tasks */

  const recentTasks =

    [...entries].reverse();

  return (

    <div className="dashboard-container">

      {/* Header */}

      <div className="dashboard-header">

        <div>

          <h1>

            {dashboardTitle}

          </h1>

          <p>

            {

              currentTime.toDateString()

            }

          </p>

        </div>

        {/* Live Clock */}

        <div className="live-clock">

          {

            currentTime.toLocaleTimeString()

          }

        </div>

      </div>

      {/* Welcome Card */}

      <div className="profile-card">

        <h2>

          Welcome,
          {" "}
          {userName}

        </h2>

        <p>

          Role:
          {" "}
          {role}

        </p>

        <p>

          Manage your daily tasks
          and reports easily 😄

        </p>

      </div>

      {/* Dashboard Cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h3>Total Hours</h3>

          <p>

            {totalHours}

          </p>

        </div>

        <div className="dashboard-card">

          <h3>Total Tasks</h3>

          <p>

            {totalTasks}

          </p>

        </div>

        <div className="dashboard-card">

          <h3>Completed</h3>

          <p>

            {completedTasks}

          </p>

        </div>

        <div className="dashboard-card">

          <h3>Pending</h3>

          <p>

            {pendingTasks}

          </p>

        </div>

        <div className="dashboard-card">

          <h3>In Progress</h3>

          <p>

            {inProgressTasks}

          </p>

        </div>

        <div className="dashboard-card">

          <h3>High Priority</h3>

          <p>

            {highPriorityTasks}

          </p>

        </div>

      </div>

      {/* Charts */}

      <div className="charts-wrapper">

        {/* Pie Chart */}

        <div className="chart-box">

          <h2>

            Task Statistics

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie

                data={finalChartData}

                cx="50%"

                cy="50%"

                outerRadius={90}

                dataKey="value"

                label

              >

                {

                  finalChartData.map(

                    (entry, index) => (

                      <Cell

                        key={index}

                        fill={

                          COLORS[
                            index %
                            COLORS.length
                          ]

                        }

                      />

                    )

                  )

                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Bar Chart */}

        <div className="chart-box">

          <h2>

            Hours Analytics

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={hoursData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="hours"
                fill="#2563eb"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Recent Tasks */}

      <div className="recent-task-section">

        <h2>

          Recent Tasks

        </h2>

        <table>

          <thead>

            <tr>

              <th>Task</th>

              <th>Status</th>

              <th>Priority</th>

              <th>Due Date</th>

            </tr>

          </thead>

          <tbody>

            {

              recentTasks.length === 0

              ?

              <tr>

                <td colSpan="4">

                  No Tasks Found

                </td>

              </tr>

              :

              recentTasks

                .slice(0, 5)

                .map((item, index) => (

                  <tr key={index}>

                    <td>

                      {item.task}

                    </td>

                    <td>

                      <span

                        className={

                          item.status ===
                          "Completed"

                          ?

                          "status-completed"

                          :

                          item.status ===
                          "In Progress"

                          ?

                          "status-progress"

                          :

                          "status-pending"

                        }

                      >

                        {item.status}

                      </span>

                    </td>

                    <td>

                      <span

                        className={

                          item.priority ===
                          "High"

                          ?

                          "priority-high"

                          :

                          item.priority ===
                          "Medium"

                          ?

                          "priority-medium"

                          :

                          "priority-low"

                        }

                      >

                        {item.priority}

                      </span>

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

export default Dashboard;