import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDetails.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Menu from "../Header/Menu";
import GoogleMap from "../GoogleMap/GoogleMap";
import GeoCode from "../../GeoCode/GeoCode";

const EmployeeDetails = (props) => {
  const [empId, setEmpId] = useState("");
  const [empDetails, setEmpDetails] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    setEmpId(props.location.state.empId);
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8080/empDetails", { id: empId })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setEmpDetails(data);
        setAddress(data.emp_address);
      })
      .catch((error) => console.log(error));
  }, [empId]);

  function generateImagePath(path) {
    return "http://localhost:8080/" + path;
  }

  return (
    <div>
      <Menu />
      <h5 style={{ marginTop: "1%", textAlign: "center" }}>Employee Details</h5>
      <div
        style={{
          border: "1px solid grey",
          margin: "2% auto",
          width: "40%",
        }}
      >
        <div className="empMainBg">
          <div
            style={{
              textAlign: "center",
            }}
          >
            {console.log("image", empDetails.emp_photo_path)}
            <img
              src={generateImagePath(empDetails.emp_photo_path)}
              alt=""
              style={{ width: "6rem", height: "15vh", borderRadius: "50%" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {empDetails.emp_name}
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "0.8rem",
            }}
          >
            {empDetails.emp_designation}
          </div>
        </div>
        <div>
          <Tabs>
            <TabList>
              <Tab>Details</Tab>
              <Tab>Hierarchy</Tab>
            </TabList>
            <div style={{ overflow: "auto" }}>
              <TabPanel>
                <div className="empDeatils">
                  <div className="empDeatilsHead">Name</div>
                  <div className="empDeatilsBody">{empDetails.emp_name}</div>
                </div>
                <div className="empDeatils">
                  <div className="empDeatilsHead">Email</div>
                  <div className="empDeatilsBody">{empDetails.emp_email}</div>
                </div>
                <div className="empDeatils">
                  <div className="empDeatilsHead">Mobile</div>
                  <div className="empDeatilsBody">{empDetails.emp_mobile}</div>
                </div>
                <div className="empDeatils">
                  <div className="empDeatilsHead">Department</div>
                  <div className="empDeatilsBody">
                    {empDetails.emp_department}
                  </div>
                </div>
                <div className="empDeatils">
                  <div className="empDeatilsHead">Experience</div>
                  <div className="empDeatilsBody">
                    {empDetails.emp_experience}
                  </div>
                </div>
                <div className="empDeatils">
                  <div className="empDeatilsHead">Designation</div>
                  <div className="empDeatilsBody">
                    {empDetails.emp_designation}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>There are no details</TabPanel>
            </div>
          </Tabs>
        </div>
        {/* <GeoCode state={empDetails.emp_address} /> */}
      </div>
    </div>
  );
};

export default EmployeeDetails;
