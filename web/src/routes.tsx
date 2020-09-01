import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import TeacherList from "./pages/TeacherList";
import TeacherForm from "./pages/TeacherForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Successfull from "./pages/Successfull";
import ResetPassword from "./pages/ResetPassword";
import ResetSuccessfull from "./pages/ResetSuccessfull";
import Profile from "./pages/Profile";
import ClassSuccessfull from "./pages/ClassSuccessfull";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/sucessfull" component={Successfull} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/reset-successfull" component={ResetSuccessfull} />
      <Route path="/landing" render={(props) => <Landing {...props} />} />
      <Route path="/study" component={TeacherList} />
      <Route
        path="/give-classes"
        render={(props) => <TeacherForm {...props} />}
      />
      <Route path="/profile" render={(props) => <Profile {...props} />} />
      <Route path="/class-successfull" component={ClassSuccessfull} />
    </BrowserRouter>
  );
}

export default Routes;
