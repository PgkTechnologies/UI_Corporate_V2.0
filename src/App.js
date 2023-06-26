import React from 'react';
import './App.css';
import Login from './Pages/Formss/Corporate/Login';
import { Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import RequireAuth from "./utils/RequireAuth";
import DashboardLayout from './Components/Layout/DashboardLayout';
import RegisterLayout from './Components/Layout/RegisterLayout';
import { useAuth } from './utils/Auth';
import routes from './routes';
import { CircularProgress } from '@material-ui/core';

function App() {

  const auth = useAuth();
  //console.log(location, "Sri");
  return (
    <Suspense
      fallback={
        <div className="">
          <CircularProgress color="primary" />
        </div>
      }
    >
      {/* <ErrorBoundary> */}

      <Routes>
        {!auth}
        <Route element={<RegisterLayout />}>
          {routes
            .filter((x) => x.role === "corporateReg")
            .map((route, i) => (
              // {routes.map((route, i) =>
              <Route
                path={route.path}
                key={i}
                exact={`${route.exact}`}
                strict={route.strict}
                name={route.name}
                element={route.component}
              />
            ))}
          ;
        </Route>
        <Route
          element={
            <RequireAuth>
               <DashboardLayout/>
            </RequireAuth>
          }
        >
          {routes
            .filter((x) => x.role === "dashboard")
            .map((route, i) => (
              <Route
                path={route.path}
                key={i}
                exact={route.exact}
                strict={route.strict}
                name={route.name}
                element={route.component}
                location={route.path}
              />
            ))}
          ;
        </Route>
      </Routes>
      {/* </ErrorBoundary> */}
    </Suspense>
  );
}

export default App;
