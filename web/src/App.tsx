import React from "react";

import { AuthProvider } from "./contexts/auth";
import Routes from "./routes/routes";

import "./assets/styles/global.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
