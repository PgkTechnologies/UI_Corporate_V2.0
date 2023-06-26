import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import WorkIcon from "@mui/icons-material/Work";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Badge, Tooltip } from "@material-ui/core";

const SideBar = () => {
  const main = useRef();
  const [menuType, setMenuType] = useState("Profile");
  const location = useLocation();
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    // if (animation === true) {
    //   main.current.className = "sidebar slideMe";
    //   setAnimation(false);
    // }
    // return () => {
    //   setAnimation(false);
    //   main.current.className = "sidebar";
    // };
  }, []);


  useEffect(() => {
    if (location.pathname.includes("/dashboard")) {
      setMenuType("Dashboard");
    } else if (location.pathname.includes("/profile")) {
      setMenuType("Profile");
    } 
    // else if (location.pathname.includes("/notifications")) {
    //   setMenuType("Notifications");
    // } else if (
    //   location.pathname.includes("/student-verification")
    // ) {
    //   setMenuType("StudentVerification");
    // } 
    else if (location.pathname.includes("/requests")) {
      setMenuType("Requests");
    } 
    else if (location.pathname.includes("/subscription")) {
      setMenuType("Subscription");
    } 
    else if (location.pathname.includes("/analytics")) {
      setMenuType("Analytics");
    } 
    // else if (location.pathname.includes("/support")) {
    //   setMenuType("Support");
    // } else if (location.pathname.includes("/jobs")) {
    //   setMenuType("Jobs");
    // }
  }, []);

  //console.log();

  return (
    <>
      <div ref={main} className={"sidebar"}>
        <NavLink
          to="/dashboard"
          style={{ textDecoration: "none" }}
        //activeClassName
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("Dashboard");
            }}
          >
            <div
              className={
                // menuType === "Dashboard"
                //   ? "col-4 icon-box-body"
                //   :
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "Dashboard" ? "icon-box-selected" : "icon-box"
                }
              >
                <Tooltip title="Dashboard" arrow placement="left-start">
                  <DashboardIcon />
                </Tooltip>
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/profile"
          style={{ textDecoration: "none" }}
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("Profile");
            }}
          >
            <div
              className={
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "Profile" ? "icon-box-selected" : "icon-box"
                }
              >
                <Tooltip title="Profile" arrow placement="left-start">
                  <AccountBalanceIcon />
                </Tooltip>
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/notifications"
          style={{ textDecoration: "none" }}
        //activeClassName
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("Notifications");
            }}
          >
            <div
              className={
                // menuType === "Dashboard"
                //   ? "col-4 icon-box-body"
                //   :
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "Notifications"
                    ? "icon-box-selected"
                    : "icon-box"
                }
              >
                <Tooltip title="Notifications" arrow placement="left-start">
                  <Badge>
                    <NotificationsIcon />
                  </Badge>
                </Tooltip>
              </div>
            </div>
          </div>
        </NavLink>
        {/* <NavLink
          to="/OnCampusDrive"
          style={{ textDecoration: "none" }}
        //activeClassName
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("OnCampusDrive");
            }}
          >
            <div
              className={
                // menuType === "Dashboard"
                //   ? "col-4 icon-box-body"
                //   :
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "OnCampusDrive"
                    ? "icon-box-selected"
                    : "icon-box"
                }
              >
                <Badge>
                  <Tooltip
                    title="ON-Campus Drive"
                    arrow
                    placement="left-start"
                  >
                    <SchoolRoundedIcon />
                  </Tooltip>
                </Badge>
              </div>
            </div>
          </div>
        </NavLink> */}
        <NavLink
          to="/jobs"
          style={{ textDecoration: "none" }}
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("jobs");
            }}
          >
            <div
              className={
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "jobs" ? "icon-box-selected" : "icon-box"
                }
              >
                <Tooltip title="JOBS" arrow placement="left-start">
                  <WorkIcon />
                </Tooltip>
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/requests"
          style={{ textDecoration: "none" }}
        //activeClassName
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("Requests");
            }}
          >
            <div
              className={
                // menuType === "Dashboard"
                //   ? "col-4 icon-box-body"
                //   :
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "Requests" ? "icon-box-selected" : "icon-box"
                }
              >
                <Tooltip title="Requests" arrow placement="left-start">
                  <Badge>
                    <MapsUgcIcon />
                  </Badge>
                </Tooltip>
              </div>
            </div>
          </div>
        </NavLink>
        {/* <NavLink
          to="/offCampus"
          style={{ textDecoration: "none" }}
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("offCampusDrive");
            }}
          >
            <div
              className={
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "offCampusDrive" ? "icon-box-selected" : "icon-box"
                }
              >
                <Tooltip title="OFF Campus Drive" arrow placement="left-start">
                  <WorkIcon />
                </Tooltip>
              </div>
            </div>
          </div>
        </NavLink> */}
        <NavLink
          to="/subscription"
          style={{ textDecoration: "none" }}
        //activeClassName
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("Subscriptions");
            }}
          >
            <div
              className={
                // menuType === "Dashboard"
                //   ? "col-4 icon-box-body"
                //   :
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "Subscriptions"
                    ? "icon-box-selected"
                    : "icon-box"
                }
              >
                <Tooltip title="Subscriptions" arrow placement="left-start">
                  <SubscriptionsRoundedIcon />
                </Tooltip>
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/analytics"
          style={{ textDecoration: "none" }}
        //activeClassName
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("Analytics");
            }}
          >
            <div
              className={
                // menuType === "Dashboard"
                //   ? "col-4 icon-box-body"
                //   :
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "Analytics" ? "icon-box-selected" : "icon-box"
                }
              >
                <Tooltip title="Analytics" arrow placement="left-start">
                  <DonutSmallRoundedIcon />
                </Tooltip>
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/support"
          style={{ textDecoration: "none" }}
        //activeClassName
        >
          <div
            className="menu"
            onClick={() => {
              setMenuType("Support");
            }}
          >
            <div
              className={
                // menuType === "Dashboard"
                //   ? "col-4 icon-box-body"
                //   :
                "col-12 icon-box-body"
              }
            >
              <div
                className={
                  menuType === "Support" ? "icon-box-selected" : "icon-box"
                }
              >
                <Tooltip title="Support" arrow placement="left-start">
                  <InfoRoundedIcon />
                </Tooltip>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default SideBar;
