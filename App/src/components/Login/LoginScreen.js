import React, { useState } from "react";
import "./LoginScreen.css";
import { Redirect } from "react-router-dom";

import { signin, authenticate } from "../../auth/helper";

const LoginScreen = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  const { username, password, error, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const userLoggin = (event) => {
    if (username != "" && password != "") {
      event.preventDefault();
      var data = { username, password };
      setValues({ ...values, error: false });
      fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({ ...values, didRedirect: true });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Enter user credentials");
    }
  };

  if (didRedirect) {
    return <Redirect to="/employee" />;
  }

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <div className="row col" style={{ padding: 0, margin: 0 }}>
          <div
            className="col-sm-12 col-md-6 col-lg-7 col-xl-7"
            style={{ padding: 0 }}
          >
            <img
              src="Images/loginscreenBg.jpg"
              alt=""
              style={{ width: "100%", height: "100vh" }}
            />
          </div>
          <div
            className="col-sm-12 col-md-6 col-lg-5 col-xl-5"
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10%",
            }}
          >
            <div className="text-center" style={{ margin: "auto" }}>
              <h4>Login to Continue</h4>
            </div>
            <div className="mt-5 text-center">
              <div>
                <input
                  type="text"
                  placeholder="UserName"
                  value={username}
                  onChange={handleChange("username")}
                  className="userDetails"
                />
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange("password")}
                  className="userDetails"
                />
              </div>
              <div>
                <button
                  className="btn btn-primary mt-3 loginBtn"
                  onClick={userLoggin}
                >
                  Login
                </button>
              </div>
              <div
                className="alert alert-danger"
                style={{
                  display: error ? "" : "none",
                  width: "80%",
                  position: "relative",
                  top: "20px",
                  margin: "auto",
                }}
              >
                {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
