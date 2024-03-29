import React, { useState } from "react";

import { useParams } from "react-router-dom";
import DefineEmailTemplate from "../../../CampusDrives/Communication/CommunicationSubDivisions/DefineEmailTemplate";
import DefineInduction from "../../../CampusDrives/Communication/CommunicationSubDivisions/DefineInduction";
import DefineInterviewRounds from "../../../CampusDrives/Communication/CommunicationSubDivisions/DefineInterviewRounds";
import ShareInterviewRounds from "../../../CampusDrives/Communication/CommunicationSubDivisions/ShareInterviewRounds";
import OffCampusDriveLayout from "../OffDefineJobs/OffCampusDriveLayout";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const OffCommunication = () => {
    
  let { offCampusDriveId } = useParams();
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

  const [tabs, setTabs] = useState([
    {
      label: "Define Email Template",
      iconName: EmailIcon,
      isActive: true,
      isDisabled: false,
      onClick: onTabClick,
       section: <DefineEmailTemplate campusDriveId={offCampusDriveId} />,
    },
    {
      label: "Pre-Campus Induction Session by Corporate (optional)",
      iconName: Diversity3Icon,
      isActive: false,
      isDisabled: false,
      onClick: onTabClick,
      section: <DefineInduction campusDriveId={offCampusDriveId} />,
    },
    {
      label: "Define Interview Rounds",
      iconName: WorkIcon,
      isActive: false,
      isDisabled: false,
      onClick: onTabClick,
      section: <DefineInterviewRounds campusDriveId={offCampusDriveId} />,
    },
    {
      label: "Share Round Details",
      iconName: CastForEducationIcon,
      isActive: false,
      isDisabled: false,
      onClick: onTabClick,
      section: <ShareInterviewRounds campusDriveId={offCampusDriveId} />,
    },
  ]);

  

  return (
    <div className="bgWhite h-full">
      <OffCampusDriveLayout
        tabs={tabs}
        offCampusDriveId={offCampusDriveId}
        round = {'2'}
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

export default OffCommunication;
