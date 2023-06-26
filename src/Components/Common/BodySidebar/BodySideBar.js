import React from "react";
import { Route, Routes } from "react-router-dom";
import Body from "../Body";
import SideBar from "../SideBar/SideBar";

const BodySideBar = () => {
  return (
    <div className="sidebar-and-body">
      <div className="sideBarMain">
        <SideBar />
      </div>
      <Body />
    </div>
  );
};

export default BodySideBar;
