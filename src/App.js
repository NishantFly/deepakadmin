import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "../src/Components/Home/Home";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import EmailVerify from "./Components/AdminLogin/EmailVerify";
import Resetpassword from "./Components/AdminLogin/Resetpassword";






//for notification
import ReactNotification from "react-notifications-component";

import "react-notifications-component/dist/theme.css";
import ProtectedRoute from "./Components/utils/ProtectedRoute";
import User from "./Components/Pages/User";
import CreateUser from "./Components/Pages/User/CreateUser";
import OtpSend from "./Components/Pages/User/OtpSend";
import OtpVarify from "./Components/Pages/User/OtpVarify";
import UserLogin from "./Components/Pages/User/userLogin";
import UserLoginVarify from "./Components/Pages/User/userLoginverify";
import DocumentsUpload from "./Components/Pages/User/DocumentsUpload";
import Documents from "./Components/Pages/User/Documents";
import UserDocuments from "./Components/Pages/Documents/";
import Insurance from "./Components/Pages/Insurance"
import AddInsurance from "./Components/Pages/Insurance/AddInsurance"
import Vehicle from "./Components/Pages/Vehcal";
import AddVechile from "./Components/Pages/Vehcal/addvehicle"
import Station from "./Components/Pages/Station"



function App() {
  return (
    <>
      <ReactNotification />
      <Switch>
        <Route exact path="/" component={AdminLogin} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/emailverify" component={EmailVerify} />
        <Route exact path="/resetpassword" component={Resetpassword} />
        <Route exact path="/user" component={User} />
        <Route exact path="/createuser" component ={CreateUser} />
        <Route exact path="/otp/send" component={OtpSend} />
        <Route exact path="/varify/otp" component={OtpVarify} />
        <Route exact path="/user/login" component={UserLogin} />
        <Route eaxct path="/user/login/varify" component={UserLoginVarify} />
        <Route exact path="/upload/documents" component={DocumentsUpload} />
        <Route exact path="/documents" component={Documents} />
        <Route exact path="/admin/documents" component={UserDocuments} />
        <Route exact path="/admin/insurance" component={Insurance} />
        <Route exact path="/add/insurance" component={AddInsurance} />
        <Route exact path="/get/vehicle" component={Vehicle} />
        <Route exact path="/add/vehicle" component={AddVechile} />
        <Route exact path="/get/station" component={Station} />
      </Switch>
    </>
  );
}

export default App;
