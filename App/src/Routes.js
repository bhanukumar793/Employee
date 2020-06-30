import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/Login/LoginScreen";
import EmployeesList from "./components/employeesList/EmployeesList";
import NewEmployee from "./components/addEmployee/NewEmployee";
import EmployeeDetails from "./components/employeeDetails/EmployeeDetails";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <Route path="/employee" exact component={EmployeesList} />
        <Route path="/newEmp" exact component={NewEmployee} />
        <Route path="/employeedetails" exact component={EmployeeDetails} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
