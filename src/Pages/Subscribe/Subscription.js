import React, { useEffect, useState } from "react";
import PreLoader from "../../utils/PreLoader";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Tab, Tabs } from "@material-ui/core";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import { AccountCircle } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachEmailRoundedIcon from "@mui/icons-material/AttachEmailRounded";
import { actionSagaGetCorporateUniversitySubscriptionRequest } from "../../Store/Actions/SagaActions/SubscriptionSagaAction";
import CampusSubscription from "./SubscriptionTypes/CampusSubscription";
import UniversityItem from "./SubscriptionTypes/UniversityItem";
import OtherInformationItem from "./SubscriptionTypes/OtherInformationItem";
import StudentListItem from "./SubscriptionTypes/StudentListItem";
import ProfileItem from "./SubscriptionTypes/ProfileItem";

const SubscriptionHistory = () => {
  const [subscriptionList, setSubscriptionList] = useState([]);
  const dispatch = useDispatch();
  const apiStatus = useSelector((state) => state.CorporateReducer?.apiStatus);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getAllSubscriptions = (response) => {
    if (response?.length) {
      setSubscriptionList(response);
    }
  };

  useEffect(() => {
    dispatch(
      actionSagaGetCorporateUniversitySubscriptionRequest({
        callback: getAllSubscriptions,
      })
    );
  }, []);

  return (
    <div className="container-body" style={{marginTop:'100px'}}>
      <div className="row">
        <h2>Subscription History </h2>
        {apiStatus ? <PreLoader /> : null}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="scrollable"
          style={{background:'#39bdf60b'}}
        >
          <Tab
            icon={
              <Badge color="error">
                <SchoolRoundedIcon />
              </Badge>
            }
            label={ "CampusDrive" }
            wrapped
            style={{
              fontWeight:'bold',
              outline: "none",
              minWidth: "12%",
              background:'#39bdf60b'
            }}
          />
          <Tab
            icon={
              <Badge color="error">
                <AttachEmailRoundedIcon />
              </Badge>
            }
            label={  "OtherInformation" }
            wrapped
            style={{
              fontWeight:'bold',
              outline: "none",
              minWidth: "12%",
              background:'#39bdf60b'
            }}
          />

          <Tab
            icon={
              <Badge color="error">
                <GroupsIcon />
              </Badge>
            }
            label={  "Students" }
            wrapped
            style={{
              fontWeight:'bold',
              outline: "none",
              minWidth: "12%",
              background:'#39bdf60b'
            }}
          />
          <Tab
            icon={
              <Badge color="error">
                <AccountCircle />
              </Badge>
            }
            label={ "Profile" }
            wrapped
            style={{
              fontWeight:'bold',
              outline: "none",
              minWidth: "12%",
              background:'#39bdf60b'
            }}
          />
        </Tabs>
      </div>
      <div 
      // className="container-body"
      >
        {tabValue === 0 && (
          <div 
          // className="univ-subscription-list-container d-flex flex-column align-items-center w-full"
          // className="container-body"
          >
            {!subscriptionList?.some(
              (item) => item?.generalNote === "Campus Hiring"
            ) && "No subscriptions subscribed yet"}
            {subscriptionList.map((item, index) => {
                if (item?.generalNote === "Campus Hiring") {
                  return <CampusSubscription item={item} index={index} />;
                }
              })}
          </div>
        )}
        {tabValue === 1 && (
          <div 
          // className="univ-subscription-list-container d-flex flex-column align-items-center w-full"
          >
            {!subscriptionList?.some(
              (item) =>
                !["Other Information", "University Information"].includes(
                  item?.generalNote
                )
            ) && "No subscriptions subscribed yet"}
            {subscriptionList.map((item, index) => {
                switch (item?.generalNote) {
                  case "Other Information":
                    return (
                      <OtherInformationItem
                        item={item}
                        index={index}
                        getDetails
                      />
                    );
                  case "University Information":
                    return <UniversityItem item={item} index={index} />;
                  default:
                    return undefined;
                }
              })}
          </div>
        )}
        {tabValue === 2 && (
          <div 
          // className="univ-subscription-list-container d-flex flex-column align-items-center w-full"
          >
            {!subscriptionList?.some(
              (item) => item?.generalNote === "Student Database"
            ) && "No subscriptions subscribed yet"}
            {
              subscriptionList?.map((item, index) => {
                switch (item?.generalNote) {
                  case "Student Database":
                    return <StudentListItem item={item} index={index} />;
                  default:
                    return undefined;
                }
              })}
          </div>
        )}
        {tabValue === 3 && (
          <div 
          // className="univ-subscription-list-container d-flex flex-column align-items-center w-full"
          >
            {!subscriptionList?.some(
              (item) => item?.generalNote === "Profile"
            ) && "No subscriptions subscribed yet"}
            {subscriptionList.map((item, index) => {
                console.log(item, "test11");
                switch (item?.generalNote) {
                  case "Profile":
                    return <ProfileItem item={item} getDetails />;
                  default:
                    return undefined;
                }
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionHistory;
