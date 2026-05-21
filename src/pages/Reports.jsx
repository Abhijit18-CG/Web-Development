import { useState, useEffect } from "react";

function Reports() {

  const [entries, setEntries] =
    useState([]);

  useEffect(() => {

    const savedData =
      localStorage.getItem(
        "timesheetEntries"
      );

    if(savedData){

      setEntries(
        JSON.parse(savedData)
      );

    }

  }, []);

  const downloadCSV = () => {

    let csvContent =

      "Task,Hours\n";

    entries.forEach((item) => {

      csvContent +=

        `${item.task},${item.hours}\n`;

    });

    const blob = new Blob(

      [csvContent],

      { type: "text/csv" }

    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "Timesheet_Report.csv";

    link.click();

  };

  return (

    <div>

      <h1>Reports</h1>

      <div className="card">

        <h3>Download Report</h3>

        <button
          onClick={downloadCSV}
        >
          Export CSV
        </button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Task</th>

            <th>Hours</th>

          </tr>

        </thead>

        <tbody>

          {entries.map((item, index) => (

            <tr key={index}>

              <td>{item.task}</td>

              <td>{item.hours}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Reports;