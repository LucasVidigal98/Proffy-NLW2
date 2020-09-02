import React, { useContext } from "react";

import AuthContext from "../contexts/auth";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
  const { signed } = useContext(AuthContext);

  return signed ? <AuthRoutes /> : <AppRoutes />;
}

export default Routes;
