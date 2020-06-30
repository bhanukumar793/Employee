import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#566573" }}
      >
        <Link to="/employee">
          <img src="" alt="" />
        </Link>
        <button
          className="navbar-toggler navbar-dark"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav ml-auto">
            <li className="nav-item">
              <Link
                to="/employee"
                className="nav-link"
                style={{
                  backgroundColor: "#5DADE2",
                  color: "white",
                  margin: "0 10px",
                  borderRadius: "5px",
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/newEmp"
                className="nav-link"
                style={{
                  backgroundColor: "#5DADE2",
                  color: "white",
                  margin: "0 10px",
                  borderRadius: "5px",
                }}
              >
                Add Employee
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
