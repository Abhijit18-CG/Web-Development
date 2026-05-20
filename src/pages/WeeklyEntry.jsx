import { useState, useEffect } from "react";

import {
  toast
} from "react-toastify";

function WeeklyEntry() {

  /* =========================
     STATES
  ========================= */

  const [task, setTask] =
    useState("");

  const [hours, setHours] =
    useState("");

  const [status, setStatus] =
    useState("Pending");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [sortType, setSortType] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("");

  const [filterPriority, setFilterPriority] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [category, setCategory] =
    useState("Development");

  const [error, setError] =
    useState("");

  const [showCompletedOnly, setShowCompletedOnly] =
    useState(false);

  const [editIndex, setEditIndex] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const entriesPerPage = 5;

  /* =========================
     DARK MODE
  ========================= */

  const [darkMode, setDarkMode] =
    useState(() => {

      return JSON.parse(
        localStorage.getItem("darkMode")
      ) || false;

    });

  /* =========================
     LOAD DATA
  ========================= */

  const [entries, setEntries] =
    useState(() => {

      const savedData =
        localStorage.getItem(
          "timesheetEntries"
        );

      return savedData
        ? JSON.parse(savedData)
        : [];

    });

  /* =========================
     SAVE DARK MODE
  ========================= */

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);

  /* =========================
     SAVE ENTRIES
  ========================= */

  useEffect(() => {

    localStorage.setItem(
      "timesheetEntries",
      JSON.stringify(entries)
    );

  }, [entries]);

  /* =========================
     RESET PAGINATION
  ========================= */

  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    filterStatus,
    filterPriority,
    sortType,
    showCompletedOnly
  ]);

  /* =========================
     STATISTICS
  ========================= */

  const completedTasks =

    entries.filter(
      (item) =>
        item.status === "Completed"
    ).length;

  const pendingTasks =

    entries.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  const inProgressTasks =

    entries.filter(
      (item) =>
        item.status === "In Progress"
    ).length;

  const highPriorityTasks =

    entries.filter(
      (item) =>
        item.priority === "High"
    ).length;

  const completedHours =

    entries
      .filter(
        (item) =>
          item.status === "Completed"
      )
      .reduce(
        (total, item) =>
          total + Number(item.hours),
        0
      );

  const pendingHours =

    entries
      .filter(
        (item) =>
          item.status === "Pending"
      )
      .reduce(
        (total, item) =>
          total + Number(item.hours),
        0
      );

  const progressPercentage =

    entries.length > 0

    ?

    (
      completedTasks /
      entries.length
    ) * 100

    : 0;

  /* =========================
     SEARCH + FILTER + SORT
  ========================= */

  const filteredEntries =
    [...entries]

      .filter((item) =>

        item.task
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        &&

        (
          filterStatus === ""

          ||

          item.status ===
          filterStatus
        )

        &&

        (
          filterPriority === ""

          ||

          item.priority ===
          filterPriority
        )

        &&

        (
          showCompletedOnly === false

          ||

          item.status ===
          "Completed"
        )

      )

      .sort((a, b) => {

        if(sortType === "priority"){

          const priorityOrder = {

            High: 1,
            Medium: 2,
            Low: 3

          };

          return (
            priorityOrder[a.priority]
            -
            priorityOrder[b.priority]
          );
        }

        if(sortType === "status"){

          return a.status.localeCompare(
            b.status
          );
        }

        if(sortType === "date"){

          return (
            new Date(a.dueDate)
            -
            new Date(b.dueDate)
          );
        }

        return 0;

      });

  /* =========================
     PAGINATION
  ========================= */

  const totalPages =
    Math.ceil(
      filteredEntries.length /
      entriesPerPage
    );

  const lastIndex =
    currentPage * entriesPerPage;

  const firstIndex =
    lastIndex - entriesPerPage;

  const currentEntries =
    filteredEntries.slice(
      firstIndex,
      lastIndex
    );

  /* =========================
     TOTAL HOURS
  ========================= */

  const totalHours =
    filteredEntries.reduce(

      (total, item) =>

        total + Number(item.hours),

      0
    );

  /* =========================
     EXPORT CSV
  ========================= */

  const exportCSV = () => {

    const headers = [

      "Task",
      "Hours",
      "Due Date",
      "Status",
      "Priority",
      "Category",
      "Notes"

    ];

    const rows = entries.map(
      (item) => [

        item.task,
        item.hours,
        item.dueDate,
        item.status,
        item.priority,
        item.category,
        item.notes

      ]
    );

    const csvContent =

      [
        headers,
        ...rows
      ]

      .map((e) =>
        e.join(",")
      )

      .join("\n");

    const blob = new Blob(

      [csvContent],

      {
        type:
        "text/csv;charset=utf-8;"
      }

    );

    const link =
      document.createElement("a");

    const url =
      URL.createObjectURL(blob);

    link.setAttribute(
      "href",
      url
    );

    link.setAttribute(
      "download",
      "timesheet_report.csv"
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    toast.success(
      "CSV Exported Successfully"
    );

  };

  /* =========================
     ADD / UPDATE ENTRY
  ========================= */

  const addEntry = () => {

    if(
      task.trim() === ""
      ||
      hours === ""
      ||
      dueDate === ""
    ){

      setError(
        "Please fill all fields"
      );

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    if(Number(hours) <= 0){

      toast.error(
        "Hours must be greater than 0"
      );

      return;
    }

    const duplicateTask =
      entries.find(
        (item, index) =>

          item.task.toLowerCase() ===
          task.toLowerCase()

          &&

          index !== editIndex
      );

    if(duplicateTask){

      setError(
        "Task already exists"
      );

      toast.warning(
        "Task already exists"
      );

      return;
    }

    const newEntry = {

      id: Date.now(),

      task: task,

      hours: hours,

      status: status,

      priority: priority,

      dueDate: dueDate,

      notes: notes,

      category: category,

      createdAt:
        new Date().toLocaleString()

    };

    if(editIndex !== null){

      const updatedEntries =
        [...entries];

      updatedEntries[editIndex] =
        {
          ...newEntry,
          id:
            entries[editIndex].id
        };

      setEntries(updatedEntries);

      setEditIndex(null);

      toast.info(
        "Task Updated Successfully"
      );

    }else{

      setEntries([
        ...entries,
        newEntry
      ]);

      toast.success(
        "Task Added Successfully"
      );

    }

    /* RESET FORM */

    setTask("");

    setHours("");

    setStatus("Pending");

    setPriority("Medium");

    setDueDate("");

    setNotes("");

    setCategory("Development");

    setError("");

  };

  /* =========================
     DELETE ENTRY
  ========================= */

  const deleteEntry = (
    actualIndex
  ) => {

    const confirmDelete =
      window.confirm(
        "Do you want to delete this task?"
      );

    if(!confirmDelete){

      return;
    }

    const updatedEntries =
      entries.filter(

        (item, index) =>

          index !== actualIndex

      );

    setEntries(updatedEntries);

    toast.error(
      "Task Deleted Successfully"
    );

  };

  /* =========================
     EDIT ENTRY
  ========================= */

  const editEntry = (
    actualIndex
  ) => {

    const selectedEntry =
      entries[actualIndex];

    setTask(
      selectedEntry.task
    );

    setHours(
      selectedEntry.hours
    );

    setStatus(
      selectedEntry.status
    );

    setPriority(
      selectedEntry.priority
    );

    setDueDate(
      selectedEntry.dueDate
    );

    setNotes(
      selectedEntry.notes
    );

    setCategory(
      selectedEntry.category
    );

    setEditIndex(actualIndex);

    toast.info(
      "Edit Mode Enabled"
    );

  };

  /* =========================
     CLEAR ALL TASKS
  ========================= */

  const clearAllTasks = () => {

    const confirmDelete =
      window.confirm(
        "Are you sure to clear all tasks?"
      );

    if(confirmDelete){

      setEntries([]);

      localStorage.removeItem(
        "timesheetEntries"
      );

      toast.warning(
        "All Tasks Cleared"
      );

    }

  };

  /* =========================
     RESET FILTERS
  ========================= */

  const resetFilters = () => {

    setSearch("");

    setFilterStatus("");

    setFilterPriority("");

    setSortType("");

    setShowCompletedOnly(false);

    toast.success(
      "Filters Reset Successfully"
    );

  };

  return (

    <div
      className={
        darkMode
        ?
        "weekly-container dark-mode"
        :
        "weekly-container"
      }
    >

      {/* TOP BAR */}

      <div className="top-bar">

        <h1>
          Weekly Entry
        </h1>

        <button
          className="dark-btn"
          onClick={() =>
            setDarkMode(!darkMode)
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

      </div>

      {/* ERROR */}

      {
        error !== ""

        &&

        <p className="error-text">
          {error}
        </p>
      }

      {/* STATISTICS */}

      <div className="stats-container">

        <div className="stats-card">
          <h3>Total Tasks</h3>
          <p>{entries.length}</p>
        </div>

        <div className="stats-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="stats-card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>

        <div className="stats-card">
          <h3>In Progress</h3>
          <p>{inProgressTasks}</p>
        </div>

        <div className="stats-card">
          <h3>High Priority</h3>
          <p>{highPriorityTasks}</p>
        </div>

        <div className="stats-card">
          <h3>Completed Hours</h3>
          <p>{completedHours}</p>
        </div>

      </div>

      {/* FORM */}

      <div className="form-box">

        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Enter Hours"
          value={hours}
          onChange={(e) =>
            setHours(e.target.value)
          }
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
        />

        <textarea
          placeholder="Task Notes"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="Development">
            Development
          </option>

          <option value="Design">
            Design
          </option>

          <option value="Testing">
            Testing
          </option>

          <option value="Meeting">
            Meeting
          </option>

        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >

          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

        </select>

        <button onClick={addEntry}>

          {
            editIndex !== null
            ? "Update Entry"
            : "Add Entry"
          }

        </button>

      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search Task"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-box"
      />

      {/* FILTER */}

      <div className="filter-box">

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
        >

          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

        <select
          value={filterPriority}
          onChange={(e) =>
            setFilterPriority(
              e.target.value
            )
          }
        >

          <option value="">
            All Priority
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>

        </select>

        <button
          className="completed-btn"
          onClick={() =>
            setShowCompletedOnly(
              !showCompletedOnly
            )
          }
        >

          {
            showCompletedOnly
            ? "Show All"
            : "Completed Only"
          }

        </button>

        <button
          className="reset-btn"
          onClick={resetFilters}
        >

          Reset Filters

        </button>

      </div>

      {/* SORT */}

      <select
        value={sortType}
        onChange={(e) =>
          setSortType(
            e.target.value
          )
        }
        className="search-box"
      >

        <option value="">
          Sort By
        </option>

        <option value="priority">
          Priority
        </option>

        <option value="status">
          Status
        </option>

        <option value="date">
          Due Date
        </option>

      </select>

      {/* PROGRESS */}

      <div className="progress-section">

        <h2>
          Task Progress
        </h2>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width:
                `${progressPercentage}%`
            }}
          >

            {
              progressPercentage.toFixed(0)
            }%

          </div>

        </div>

      </div>

      {/* ACTION BUTTONS */}

      <div className="action-buttons">

        <button
          className="export-btn"
          onClick={exportCSV}
        >

          Export CSV

        </button>

        <button
          className="clear-btn"
          onClick={clearAllTasks}
        >

          Clear All Tasks

        </button>

      </div>

      {/* SUMMARY */}

      <div className="summary-card">

        <h2>Total Hours</h2>

        <p>
          {totalHours} Hours
        </p>

      </div>

      {/* TABLE */}

      <table>

        <thead>

          <tr>

            <th>Task</th>
            <th>Category</th>
            <th>Notes</th>
            <th>Hours</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {
            currentEntries.length === 0

            ?

            <tr>

              <td colSpan="9">
                No Tasks Found
              </td>

            </tr>

            :

            currentEntries.map(
              (item, index) => {

                const actualIndex =
                  entries.findIndex(
                    (entry) =>
                      entry.id ===
                      item.id
                  );

                return (

                  <tr
                    key={item.id}

                    className={

                      item.priority ===
                      "High"

                      ?

                      "priority-row"

                      :

                      ""

                    }
                  >

                    <td>

                      {item.task}

                      {
                        index ===
                        currentEntries.length - 1

                        &&

                        <span
                          className="recent-badge"
                        >
                          New
                        </span>
                      }

                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td>
                      {item.notes}
                    </td>

                    <td>
                      {item.hours}
                    </td>

                    <td>

                      {item.dueDate}

                      {

                        new Date(item.dueDate)
                        <
                        new Date()

                        &&

                        item.status !==
                        "Completed"

                        &&

                        <p className="deadline-warning">
                          Deadline Passed
                        </p>

                      }

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
                      {item.createdAt}
                    </td>

                    <td>

                      <button
                        onClick={() =>
                          editEntry(actualIndex)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteEntry(actualIndex)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                );

              })
          }

        </tbody>

      </table>

      {/* PAGINATION */}

      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages
            ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default WeeklyEntry;

