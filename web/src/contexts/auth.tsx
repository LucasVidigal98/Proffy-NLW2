import React, { createContext, useState, useEffect } from "react";

import { LogIn } from "../services/auth";

interface AuthContextProps {
  userId: number;
  signed: boolean;
  loading: boolean;
  failLogin: boolean;
  LogInAuth(email: string, passwd: string): Promise<void>;
  LogOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [failLogin, setFailLogin] = useState(false);

  useEffect(() => {
    function loadStorage() {
      if (localStorage.getItem("@proffy/userId")) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    loadStorage();
  }, []);

  async function LogInAuth(email: string, passwd: string) {
    const response = await LogIn(email, passwd);
    if (response !== "err") {
      setUserId(response);
      localStorage.setItem("@proffy/userId", response);
    } else {
      setFailLogin(true);
    }
  }

  function LogOut() {
    localStorage.removeItem("@proffy/userId");
    setUserId(0);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: userId === 0 ? false : true,
        userId,
        loading,
        failLogin,
        LogInAuth,
        LogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
