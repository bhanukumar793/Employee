import React, { useState, useEffect } from "react";
import "./EmployeeList.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Menu from "../Header/Menu";

const EmployeesList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [doRedirect, setDoRedirect] = useState(false);
  const [idSelected, setIdSelected] = useState("");
  const [newEmpData, setNewEmpData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/empList")
      .then((response) => response.json())
      .then((data) => setEmployeeList(data));
  }, []);

  useEffect(() => {
    setEmployeeList(newEmpData);
  }, [newEmpData]);

  const handleClick = (id) => {
    setIdSelected(id);
    setDoRedirect(true);
  };
  if (doRedirect) {
    return (
      <Redirect
        to={{ pathname: "/employeedetails", state: { empId: idSelected } }}
      />
    );
  }

  function generateImagePath(path) {
    return "http://localhost:8080/" + path;
  }

  const changeDepart = (e) => {
    axios
      .post("http://localhost:8080/getEmployeeByCategory", {
        catgy: e.target.value,
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setNewEmpData(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Menu />
      <h5 style={{ marginTop: "2%", textAlign: "center" }}>Employees List</h5>
      <div style={{ width: "40%", textAlign: "center", margin: "1% auto" }}>
        <label style={{ marginRight: "20px" }}>Filter by Department</label>
        <select
          name=""
          id=""
          defaultValue={"All"}
          onChange={(e) => changeDepart(e)}
        >
          <option value="All">All</option>
          <option value="Accounts and Finance">Accounts and Finance</option>
          <option value="HR">HR</option>
          <option value="Development">Development</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="IT Services">IT Services</option>
        </select>
      </div>
      {employeeList && employeeList.length > 0 ? (
        <div className="empMainList">
          {employeeList.map((data) => (
            <div
              key={data.emp_id}
              onClick={() => handleClick(data.emp_id)}
              className="empList"
            >
              <div className="row col">
                <div>
                  <img src="" alt="" />
                </div>
                <div className="row col">
                  <div className="col-sm-4 col-md-4 col-lg-3 col-xl-3">
                    <p style={{ margin: "20% auto" }}>
                      <img
                        src={generateImagePath(data.emp_photo_path)}
                        alt=""
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                        }}
                      />
                    </p>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-6 col-xl-6">
                    <p> {data.emp_name}</p>
                    <p> {data.emp_department}</p>
                    <p> {data.emp_designation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default EmployeesList;
