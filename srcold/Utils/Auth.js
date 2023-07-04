import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthPorvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [tokenPurchase, setTokenPurchase] = useState(null);

  let check = true;

  useEffect(() => {
    if (check) {
      const localToken = localStorage.getItem("AUTH");
      if (localToken) {
        setToken(localToken);
      }
    }
    return () => {
      check = false;
    };
  }, [token]);

  const logIn = (token) => {
    setToken(token);
  };

  const logOut = () => {
    setToken(null);
  };

  const tokenPurchaseWindow = () => {
    setTokenPurchase(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        logIn,
        logOut,
        tokenPurchase,
        tokenPurchaseWindow,
        setTokenPurchase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
