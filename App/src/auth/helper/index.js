import { API } from "../../backend";

export const signin = (user) => {
  fetch("http://localhost:8080/signin", {
    method: "POST",
    headers: {
      //   Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log("json login response", response);
      response.json();
    })
    .catch((err) => console.log(err));
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("empJWT");
  }
};

export const authenticate = (next) => {
  if (typeof window !== "undefined") {
    var data = "empUser";
    localStorage.setItem("empJWT", data);
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("empJWT")) {
    return JSON.parse(localStorage.getItem("empJWT"));
  } else {
    return false;
  }
};

// fetch("http://localhost:8080/signin", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// })
//   // .then((response) => response.json())
//   .then((data) => {
//     if (data.error) {
//       console.log("error", data.error);
//     } else {
//       console.log(data);
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
