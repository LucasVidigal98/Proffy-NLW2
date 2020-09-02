import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import TeacherList from "../pages/TeacherList";
import TeacherForm from "../pages/TeacherForm";
import Profile from "../pages/Profile";
import ClassSuccessfull from "../pages/ClassSuccessfull";

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" render={(props) => <Landing {...props} />} />
      <Route path="/study" component={TeacherList} />
      <Route
        path="/give-classes"
        render={(props) => <TeacherForm {...props} />}
      />
      <Route path="/profile" render={(props) => <Profile {...props} />} />
      <Route path="/class-successfull" component={ClassSuccessfull} />
    </BrowserRouter>
  );
};

export default AuthRoutes;
