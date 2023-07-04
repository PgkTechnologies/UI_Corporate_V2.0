import React, { useState } from "react";
import { useNavigate } from "react-router";

const StudentListItem = (props) => {
  const history = useNavigate();

  const navigate = (publisher, subscriptionID) => {
    history('/dashboard/subscribe/students/' + publisher + '?sub=' + subscriptionID)
  }

  return (
    <>
      <div
        className="univ-sub-item d-flex justify-content-between align-items-center"
        key={props?.index}
        style={{ padding: 15 }}
      >
        <div className="sub-type-container d-flex">
          <i className="far fa-user-circle icon" />
          <p className="sub-label" style={{ fontWeight: 'bold' }}>Student List</p>
        </div>
        <div className="vertical-border" />
        <div className="name-address d-flex flex-column align-items-start">
          <p className="title">{props?.item?.publisherName}</p>
          {props?.item?.location?.trim() !== '' && <p className="sub-title">
            <i className="fas fa-map-marker-alt" /> {props?.item?.location}
          </p>}
        </div>
        <div className="vertical-border" />
        <div className="sub-item-container d-flex flex-column align-items-start">
          <p className="title">Search Filters</p>
          <p className="sub-title" style={{fontWeight:'700'}}>{props?.item?.searchCriteria}</p>
        </div>
        <div className="vertical-border" />
        <button
          type="button"
          className="view-info-btn btn d-flex justify-content-around align-items-center"
          style={{
            height: "20px",
            maxWidth: "100px",
            fontSize: ".600rem",
            borderRadius: "4px",
          }}
          onClick={() => navigate(props?.item?.publisher, props?.item?.subscriptionID)}>
          View List
        </button>
      </div>
    </>
  );
};

export default StudentListItem;
