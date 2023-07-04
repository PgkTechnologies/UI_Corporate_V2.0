import React from "react";
import { useAuth } from "./Auth";

function CheckAuth(response) {
  const auth = useAuth();
  auth.token(response);
}

export default CheckAuth;
