import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Successfull from "../pages/Successfull";
import ResetPassword from "../pages/ResetPassword";
import ResetSuccessfull from "../pages/ResetSuccessfull";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/sucessfull" component={Successfull} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/reset-successfull" component={ResetSuccessfull} />
    </BrowserRouter>
  );
};

export default AppRoutes;
