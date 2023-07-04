import React from "react";

// Login
const Login = React.lazy(() => import("./Pages/Forms/Corporate/Login"));

//Dashboard
const Dashboard = React.lazy(() => import("./Pages/Test/Test"));

const routes = [
  {
    path: "/",
    strict: true,
    exact: true,
    role: "corporate",
    name: "Login",
    component: <Login />,
  },
  {
    path: "/dashboard",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Dashboard",
    component: <Dashboard />,
  },
];

export default routes;
