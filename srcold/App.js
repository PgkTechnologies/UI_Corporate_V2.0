import React from "react";
import { Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import RegisterLayout from "./Components/Layout/RegisterLayout";
import routes from "./routes";
import { CircularProgress } from "@material-ui/core";
import { useAuth } from "./Utils/Auth";
import RequireAuth from "./Utils/RequireAuth";

function App() {
  const { location } = useParams();
  // useBeforeunload((event) => {
  //   //event.preventDefault();
  //   localStorage.setItem("step", 0);
  // });
  const auth = useAuth();
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
            .filter((x) => x.role === "corporate")
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
              <DashboardLayout />
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
