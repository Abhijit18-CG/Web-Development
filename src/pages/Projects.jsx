import {
  useState,
  useEffect
} from "react";

function Projects() {

  const role =
    localStorage.getItem("role");

  const userEmail =
    localStorage.getItem("userEmail");

  /* =========================
     FORM STATES
  ========================= */

  const [projectName, setProjectName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [employeeEmail, setEmployeeEmail] =
    useState("");

  const [deadline, setDeadline] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [status, setStatus] =
    useState("Pending Approval");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [searchProject, setSearchProject] =
    useState("");

  /* =========================
     PROJECTS STATE
  ========================= */

  const [projects, setProjects] =
    useState(() => {

      try{

        const savedProjects =
          localStorage.getItem(
            "projects"
          );

        return savedProjects
          ? JSON.parse(savedProjects)
          : [];

      }catch(error){

        return [];

      }

    });

  /* =========================
     SAVE LOCAL STORAGE
  ========================= */

  useEffect(() => {

    localStorage.setItem(
      "projects",
      JSON.stringify(projects)
    );

  }, [projects]);

  /* =========================
     PROJECT STATISTICS
  ========================= */

  const totalProjects =
    projects.length;

  const completedProjects =
    projects.filter(
      (item) =>
        item.status ===
        "Completed"
    ).length;

  const pendingProjects =
    projects.filter(
      (item) =>
        item.status ===
        "Pending Approval"
    ).length;

  const progressProjects =
    projects.filter(
      (item) =>
        item.status ===
        "In Progress"
    ).length;

  /* =========================
     ADD PROJECT
  ========================= */

  const addProject = () => {

    /* SECURITY */

    if(
      role !== "admin"
      &&
      role !== "manager"
    ){

      alert(
        "Unauthorized Access"
      );

      return;
    }

    /* VALIDATION */

    if(
      projectName.trim() === ""
      ||
      description.trim() === ""
      ||
      employeeEmail === ""
      ||
      deadline === ""
    ){

      alert(
        "Please Fill All Fields"
      );

      return;
    }

    /* DEADLINE VALIDATION */

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    if(deadline < today){

      alert(
        "Deadline Cannot Be Past Date"
      );

      return;
    }

    /* DUPLICATE CHECK */

    const duplicateProject =
      projects.find(
        (item) =>

          (
            item.projectName || ""
          )

          .toLowerCase()

          ===

          projectName
            .toLowerCase()

          &&

          item.assignedTo
          ===
          employeeEmail
      );

    if(duplicateProject){

      alert(
        "Project Already Assigned"
      );

      return;
    }

    /* TO & CC */

    let ccPerson = "";

    if(role === "admin"){

      ccPerson =
        "manager@gmail.com";

    }

    else if(
      role === "manager"
    ){

      ccPerson =
        "admin@gmail.com";

    }

    /* CREATE PROJECT */

    const newProject = {

      id:
        Date.now(),

      projectName:
        projectName,

      description:
        description,

      assignedTo:
        employeeEmail,

      assignedBy:
        userEmail,

      cc:
        ccPerson,

      deadline:
        deadline,

      priority:
        priority,

      status:
        "Pending Approval",

      createdAt:
        new Date().toLocaleString(),

      progress:
        0

    };

    setProjects([
      ...projects,
      newProject
    ]);

    /* RESET */

    setProjectName("");

    setDescription("");

    setEmployeeEmail("");

    setDeadline("");

    setPriority("Medium");

    setStatus(
      "Pending Approval"
    );

    alert(
      "Project Assigned Successfully"
    );

  };

  /* =========================
     DELETE PROJECT
  ========================= */

  const deleteProject = (id) => {

    const confirmDelete =
      window.confirm(
        "Delete This Project?"
      );

    if(!confirmDelete){

      return;
    }

    const updatedProjects =
      projects.filter(
        (item) =>
          item.id !== id
      );

    setProjects(
      updatedProjects
    );

  };

  /* =========================
     UPDATE STATUS
  ========================= */

  const updateProjectStatus = (
    id,
    newStatus
  ) => {

    const updatedProjects =
      projects.map((item) => {

        if(item.id === id){

          return {

            ...item,

            status:
              newStatus,

            progress:

              newStatus ===
              "Completed"

              ?

              100

              :

              newStatus ===
              "In Progress"

              ?

              50

              :

              0
          };
        }

        return item;

      });

    setProjects(
      updatedProjects
    );

  };

  /* =========================
     FILTER PROJECTS
  ========================= */

  const filteredProjects =
    projects

    .filter((item) => {

      /* EMPLOYEE ONLY */

      if(
        role === "employee"
      ){

        return (
          item.assignedTo
          ===
          userEmail
        );
      }

      return true;

    })

    .filter((item) => {

      /* STATUS FILTER */

      if(
        filterStatus === "All"
      ){

        return true;
      }

      return (
        item.status
        ===
        filterStatus
      );

    })

    .filter((item) =>

      (
        item.projectName || ""
      )

      .toLowerCase()

      .includes(
        searchProject
          .toLowerCase()
      )

    );

  return (

    <div className="projects-container">

      {/* =========================
          HEADER
      ========================= */}

      <div className="project-header">

        <h1>
          Project Management
        </h1>

      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="stats-container">

        <div className="stats-card">

          <h3>
            Total Projects
          </h3>

          <p>
            {totalProjects}
          </p>

        </div>

        <div className="stats-card">

          <h3>
            Pending
          </h3>

          <p>
            {pendingProjects}
          </p>

        </div>

        <div className="stats-card">

          <h3>
            In Progress
          </h3>

          <p>
            {progressProjects}
          </p>

        </div>

        <div className="stats-card">

          <h3>
            Completed
          </h3>

          <p>
            {completedProjects}
          </p>

        </div>

      </div>

      {/* =========================
          PROJECT FORM
      ========================= */}

      {
        (
          role === "admin"
          ||
          role === "manager"
        )

        &&

        <div className="project-form">

          <h2>
            Assign New Project
          </h2>

          {/* PROJECT NAME */}

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(
                e.target.value
              )
            }
          />

          {/* DESCRIPTION */}

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          {/* EMPLOYEE */}

          <select
            value={employeeEmail}
            onChange={(e) =>
              setEmployeeEmail(
                e.target.value
              )
            }
          >

            <option value="">
              Select Employee
            </option>

            <option value="employee@gmail.com">
              employee@gmail.com
            </option>

          </select>

          {/* DEADLINE */}

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(
                e.target.value
              )
            }
          />

          {/* PRIORITY */}

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
          >

            <option value="Low">
              Low Priority
            </option>

            <option value="Medium">
              Medium Priority
            </option>

            <option value="High">
              High Priority
            </option>

          </select>

          <button
            onClick={addProject}
          >

            Assign Project

          </button>

        </div>
      }

      {/* =========================
          SEARCH & FILTER
      ========================= */}

      <div className="project-filter">

        <input
          type="text"
          placeholder="Search Project"
          value={searchProject}
          onChange={(e) =>
            setSearchProject(
              e.target.value
            )
          }
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
        >

          <option value="All">
            All Projects
          </option>

          <option value="Pending Approval">
            Pending Approval
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Rejected">
            Rejected
          </option>

        </select>

      </div>

      {/* =========================
          PROJECT LIST
      ========================= */}

      <div className="project-list">

        {
          filteredProjects.length === 0

          ?

          <p>
            No Projects Found
          </p>

          :

          filteredProjects.map(
            (item) => (

            <div
              key={item.id}
              className="project-card"
            >

              <div className="project-info">

                <h3>
                  {
                    item.projectName
                    || "Untitled Project"
                  }
                </h3>

                <p>

                  <strong>
                    Description:
                  </strong>

                  {" "}

                  {
                    item.description
                    || "No Description"
                  }

                </p>

                <p>

                  <strong>
                    TO:
                  </strong>

                  {" "}

                  {
                    item.assignedTo
                    || "N/A"
                  }

                </p>

                <p>

                  <strong>
                    CC:
                  </strong>

                  {" "}

                  {
                    item.cc
                    || "N/A"
                  }

                </p>

                <p>

                  <strong>
                    Assigned By:
                  </strong>

                  {" "}

                  {
                    item.assignedBy
                    || "N/A"
                  }

                </p>

                <p>

                  <strong>
                    Deadline:
                  </strong>

                  {" "}

                  {
                    item.deadline
                    || "N/A"
                  }

                </p>

                <p>

                  <strong>
                    Priority:
                  </strong>

                  {" "}

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

                    {
                      item.priority
                      || "Low"
                    }

                  </span>

                </p>

                <p>

                  <strong>
                    Created:
                  </strong>

                  {" "}

                  {
                    item.createdAt
                    || "N/A"
                  }

                </p>

                {/* STATUS */}

                <p>

                  <strong>
                    Status:
                  </strong>

                  {" "}

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

                      item.status ===
                      "Rejected"

                      ?

                      "priority-high"

                      :

                      "status-pending"
                    }
                  >

                    {
                      item.status
                      || "Pending"
                    }

                  </span>

                </p>

                {/* PROGRESS */}

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width:
                        `${item.progress || 0}%`
                    }}
                  >

                    {item.progress || 0}%

                  </div>

                </div>

              </div>

              {/* =========================
                  ACTION BUTTONS
              ========================= */}

              <div className="project-actions">

                {/* EMPLOYEE ACTIONS */}

                {
                  role === "employee"

                  &&

                  item.assignedTo
                  ===
                  userEmail

                  &&

                  item.status ===
                  "Pending Approval"

                  &&

                  <>

                    <button
                      className="completed-btn"
                      onClick={() =>
                        updateProjectStatus(
                          item.id,
                          "In Progress"
                        )
                      }
                    >

                      Accept

                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        updateProjectStatus(
                          item.id,
                          "Rejected"
                        )
                      }
                    >

                      Reject

                    </button>

                  </>
                }

                {/* COMPLETE BUTTON */}

                {
                  role === "employee"

                  &&

                  item.assignedTo
                  ===
                  userEmail

                  &&

                  item.status ===
                  "In Progress"

                  &&

                  <button
                    className="export-btn"
                    onClick={() =>
                      updateProjectStatus(
                        item.id,
                        "Completed"
                      )
                    }
                  >

                    Mark Completed

                  </button>
                }

                {/* DELETE */}

                {
                  (
                    role === "admin"
                    ||

                    (
                      role === "manager"
                      &&
                      item.assignedBy
                      ===
                      userEmail
                    )
                  )

                  &&

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProject(
                        item.id
                      )
                    }
                  >

                    Delete

                  </button>
                }

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Projects;