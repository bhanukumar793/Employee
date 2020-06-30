const express = require("express");
const app = express();
const multer = require("multer");
// const helpers = require("./helper/Helper");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public/uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
}).single("file");

let employees;

const empRead = fs.readFile("employee.json", (err, data) => {
  if (err) throw err;
  employees = JSON.parse(data);
});

// check login credentials
app.post("/signin", function (req, res) {
  if (req.body.username === "test" && req.body.password === "test") {
    res.json({ success: "success" });
  } else {
    res.json({ error: "Invalid Credentials" });
  }
});

// get all the employees list
app.get("/empList", function (req, res) {
  res.json(employees);
});

//get single employee details
let employeeDetails;
app.post("/empDetails", function (req, res) {
  employeeDetails = employees.find((data) => {
    return data.emp_id === req.body.id ? data : null;
  });
  res.send(employeeDetails);
});

// get results based on the department
app.post("/getEmployeeByCategory", (req, res) => {
  var empCatList = employees.filter((data) => {
    return data.emp_department === req.body.catgy;
  });
  if (empCatList.length > 0) {
    return res.send(empCatList);
  }
  return res.send(employees);
});

//add new employee
app.post("/newEmpList", (req, res) => {
  var checkEmp = employees.filter((data) => {
    return (
      data.emp_email === req.body.emp_email &&
      data.emp_mobile === req.body.emp_mobile
    );
  });
  if (checkEmp.length > 0) {
    res.send("Emp already exist");
  } else {
    var obj = employees;
    var id = uuidv4();
    var file = req.body.emp_photo_path;
    var fileObj = path.parse(file);
    var fileName = fileObj.name + fileObj.ext;
    obj.push({
      emp_id: id,
      emp_name: req.body.emp_name,
      emp_address: req.body.emp_address,
      emp_mobile: req.body.emp_mobile,
      emp_email: req.body.emp_email,
      emp_department: req.body.emp_department,
      emp_designation: req.body.emp_designation,
      emp_experience: req.body.emp_experience,
      emp_salary: req.body.emp_salary,
      emp_photo_path: fileName,
    });
    var newdata = JSON.stringify(obj);
    var imgPath = fileName;
    var result;
    fs.writeFile("employee.json", (imgPath, newdata), function (err, result) {
      if (err) throw err;
    });
    res.send("Details uploaded successfully");
  }
});

// upload image
app.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
  });
  res.send({ success: "File upload successfully" });
});

app.listen(8080, () => {
  console.log("App listening at port 8080");
  empRead;
});
