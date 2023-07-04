import React from "react";

// Login
const Login = React.lazy(() => import("./Pages/Forms/Corporate/Login"));

//Forgot Password
const ForgotPassword = React.lazy(() =>
  import("./Pages/Forms/Corporate/ForgotPassword/ForgotPassword")
);

//Dashboard
const Dashboard = React.lazy(() => import("./Pages/DashBoard/Dashboard"));

// Profile

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
    path: "/forgot-password",
    strict: true,
    exact: true,
    role: "corporate",
    name: "Login",
    component: <ForgotPassword />,
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
