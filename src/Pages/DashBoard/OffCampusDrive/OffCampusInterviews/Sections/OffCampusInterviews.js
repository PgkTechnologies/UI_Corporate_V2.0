import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actionGetS3AttachRequest } from "../../../../../Store/Actions/SagaActions/CommonSagaActions";
import { onGetFileInfo } from "../../../../../utils/utils";
import ReleaseOfferLetters from "../../../../CampusDrives/CampusInterviews/CampusInterviewsSubDivisions/ReleaseOfferLetters";
import RoundWiseResults from "../../../../CampusDrives/CampusInterviews/CampusInterviewsSubDivisions/RoundWiseResults";
import ShareRoundResults from "../../../../CampusDrives/CampusInterviews/CampusInterviewsSubDivisions/ShareRoundResults";
import ValidateProfiles from "../../../../CampusDrives/CampusInterviews/CampusInterviewsSubDivisions/ValidateProfiles";
import OffCampusDriveLayout from "../../OffDefineJobs/OffCampusDriveLayout";
import OffEndCampusDrive from "./OffEndCampusDrive";

const OffCampusInterviews = () => {
  const { universityId, offCampusDriveId } = useParams();

  console.log(universityId, "Hiii");

  const dispatch = useDispatch();
  const onTabClick = (tabIndex) => {
    const newTabs = tabs.map((item, index) => {
      if (index <= tabIndex) {
        return { ...item, isActive: true };
      } else {
        return { ...item, isActive: false };
      }
    });
    setTabs(newTabs);
  };

  const getAttach = (data) => {
    dispatch(actionGetS3AttachRequest({ path: data, callback: onGetFileInfo }));
  };

  const [tabs, setTabs] = useState([
    {
      label: "Capture Round wise Interview Results",
      iconName: "fa-file-alt",
      isActive: true,
      isDisabled: false,
      onClick: onTabClick,
      section: (
        <RoundWiseResults
          getAttach={getAttach}
          campusDriveId={offCampusDriveId}
        />
      ),
    },
    {
      label: "Share Round-wise Interview Results",
      iconName: "fa-calendar-alt",
      isActive: false,
      isDisabled: false,
      onClick: onTabClick,
      section: (
        <ShareRoundResults
          getAttach={getAttach}
          campusDriveId={offCampusDriveId}
        />
      ),
    },
    {
      label: "View & Validate Final List of Students",
      iconName: "fa-calendar-alt",
      isActive: false,
      isDisabled: false,
      onClick: onTabClick,
      section: <ValidateProfiles campusDriveId={offCampusDriveId} />,
    },
    {
      label: "Release Offer Letters",
      iconName: "fa-briefcase",
      isActive: false,
      isDisabled: false,
      onClick: onTabClick,
      section: (
        <ReleaseOfferLetters
          getAttach={getAttach}
          campusDriveId={offCampusDriveId}
        />
      ),
    },
    {
      label: "End Campus Drive",
      iconName: "fa-briefcase",
      isActive: false,
      isDisabled: false,
      onClick: onTabClick,
      section: <OffEndCampusDrive campusDriveId={offCampusDriveId} />,
    },
  ]);

  const prevBtn = () => {
    let currentIndex = 1;

    tabs.forEach((item, index) => {
      if (item.isActive) {
        currentIndex = index;
      }
    });

    onTabClick(currentIndex - 1);
  };

  const nextBtn = () => {
    let currentIndex = -1;

    tabs.forEach((item, index) => {
      if (item.isActive) {
        currentIndex = index;
      }
    });

    onTabClick(currentIndex + 1);
  };

  const isPrevBtnDisbaled = () => {
    return !tabs.some((item, index) => (index ? item.isActive : false));
  };

  const isNextBtnDisbaled = () => {
    return tabs.every((item) => item.isActive === true);
  };

  return (
    <div className="bgWhite h-full">
      <OffCampusDriveLayout
        tabs={tabs}
        offCampusDriveId={offCampusDriveId}
        universityId={universityId}
        round = {'3'}
        prevBtn={{
          isDisabled: isPrevBtnDisbaled(),
          onClick: prevBtn,
        }}
        nextBtn={{
          isDisabled: isNextBtnDisbaled(),
          onClick: nextBtn,
        }}
        styles={{ maxHeight: "600px" }}
      >
        {!tabs.some((item) => item.isActive === true) ? (
          <div className="center">
            <p
              className="text-center"
              style={{ fontSize: ".850rem", color: "#a1a1a1" }}
            >
              Select any option to preview the content here
            </p>
          </div>
        ) : undefined}
      </OffCampusDriveLayout>
    </div>
  );
};

export default OffCampusInterviews;
