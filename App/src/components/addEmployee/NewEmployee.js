import React, { useState } from "react";
import axios from "axios";
import Menu from "../Header/Menu";
import "./NewEmployee.css";

const NewEmployee = () => {
  const [details, setDetails] = useState({
    emp_name: "",
    emp_address: "",
    emp_mobile: "",
    emp_email: "",
    emp_department: "",
    emp_designation: "",
    emp_experience: "",
    emp_salary: "",
  });
  const [empImage, setEmpImage] = useState(null);
  const [empStatus, setEmpStatus] = useState();

  const handleChange = (name) => (event) => {
    const value =
      name === "emp_photo_path" ? event.target.files[0] : event.target.value;
    setDetails({ ...details, [name]: value });
  };

  const resetForm = () => {
    document.getElementById("emp-form").reset();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let form = document.forms[0];
    details.emp_name = form["emp_name"].value;
    details.emp_address = form["emp_address"].value;
    details.emp_mobile = form["emp_mobile"].value;
    details.emp_email = form["emp_email"].value;
    details.emp_department = form["emp_department"].value;
    details.emp_designation = form["emp_designation"].value;
    details.emp_experience = form["emp_experience"].value;
    details.emp_salary = form["emp_salary"].value;
    details.emp_photo_path = form["file"].value;

    if (
      details.emp_name !== "" &&
      details.emp_address !== "" &&
      details.emp_mobile !== "" &&
      details.emp_email !== "" &&
      details.emp_designation !== "" &&
      details.emp_experience !== "" &&
      details.emp_salary !== "" &&
      details.emp_photo_path !== ""
    ) {
      axios
        .post("http://localhost:8080/newEmpList", details)
        .then((response) => {
          if (response.data === "Emp already exist") {
            setEmpStatus("Employee already exits");
          } else {
            onClickHandler();
            setEmpStatus("Employee details inserted Successfull");
            setEmpStatus("");
            resetForm();
          }
        })
        .catch((err) => console.log(err));
    } else {
      setEmpStatus("All fields are manditory");
    }
  };

  const onChangeHandler = (event) => {
    setEmpImage(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", empImage);
    axios.post("http://localhost:8080/upload", data, {}).then((res) => {});
  };

  const handleErrorClick = () => {
    setEmpStatus("");
  };

  return (
    <div>
      <Menu />
      <h4 className="text-center">Employee Registration</h4>
      <div
        className="alert alert-danger"
        style={{
          display: empStatus ? "" : "none",
          width: "30%",
          position: "relative",
          top: "20px",
          margin: "auto",
        }}
      >
        {empStatus}
      </div>
      <div
        style={{
          width: "40%",
          margin: "20px auto",
          border: "0.5px solid grey",
          padding: "10px 0",
        }}
      >
        <form id="emp-form">
          <div className="row col empDetails">
            <div className="col-6">Name</div>
            <div className="col-6">
              <input type="text" name="emp_name" />
            </div>
          </div>
          <div className="row col empDetails">
            <div className="col-6">Address</div>
            <div className="col-6">
              <input type="text" name="emp_address" />
            </div>
          </div>
          <div className="row col empDetails">
            <div className="col-6">Mobile</div>
            <div className="col-6">
              <input type="tel" name="emp_mobile" />
            </div>
          </div>
          <div className="row col empDetails">
            <div className="col-6">Email</div>
            <div className="col-6">
              <input type="email" name="emp_email" />
            </div>
          </div>
          <div className="row col empDetails">
            <div className="col-6">Department</div>
            <div className="col-6">
              <select
                name="emp_department"
                id=""
                defaultValue={"Select Department"}
                style={{ width: "77%" }}
              >
                <option value="Select Department">Select Department</option>
                <option value="Accounts and Finance">
                  Accounts and Finance
                </option>
                <option value="HR">HR</option>
                <option value="Development">Development</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="IT Services">IT Services</option>
              </select>
            </div>
          </div>
          <div className="row col empDetails">
            <div className="col-6">Designation</div>
            <div className="col-6">
              <input type="text" name="emp_designation" />
            </div>
          </div>
          <div className="row col empDetails">
            <div className="col-6">Experience</div>
            <div className="col-6">
              <input type="text" name="emp_experience" />
            </div>
          </div>
          <div className="row col empDetails">
            <div className="col-6">Salray</div>
            <div className="col-6">
              <input type="number" name="emp_salary" />
            </div>
          </div>
          <div className="row col empDetails">
            <div className="col-6">Image</div>
            <div className="col-6">
              <input type="file" name="file" onChange={onChangeHandler} />
            </div>
          </div>
          <div className="row col">
            <button className="btn btn-success ml-auto mt-5" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </form>
        {document.body.addEventListener("click", handleErrorClick)}
      </div>
    </div>
  );
};

export default NewEmployee;
