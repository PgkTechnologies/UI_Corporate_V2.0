import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [tokenPurchase, setTokenPurchase] = useState(null);
  const localToken = localStorage.getItem("AUTH");

  console.log(children,'TOKENNN')

  let check = true;
  useEffect(() => {
    //console.log(localToken, "AUTHPAGE");
    if (check) {
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

  //console.log(token, "AUTH");

  return (
    <AuthContext.Provider
      value={{ token, logIn, logOut, tokenPurchase, tokenPurchaseWindow, setTokenPurchase}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
