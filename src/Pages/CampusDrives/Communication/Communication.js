import { useNavigate, useParams } from "react-router-dom";
import JobSmallTab from "../DefineJobs/DefineJobsSubDivisions/JobSmallTab";
import { useState } from "react";
import CampusDriveLayout from "../CampusDriveLayout";
import DefineEmailTemplate from "./CommunicationSubDivisions/DefineEmailTemplate";
import DefineInduction from "./CommunicationSubDivisions/DefineInduction";
import DefineInterviewRounds from "./CommunicationSubDivisions/DefineInterviewRounds";
import ShareInterviewRounds from "./CommunicationSubDivisions/ShareInterviewRounds";

const Communication = (props) => {

    let {campusDriveId,universityId} = useParams();

    
  
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
          iconName: "fa-envelope",
          isActive: true,
          isDisabled: false,
          onClick: onTabClick,
          section: <DefineEmailTemplate campusDriveId={campusDriveId} />,
        },
        {
          label: "Pre-Campus Induction Session by Corporate (optional)",
          iconName: "fa-user",
          isActive: false,
          isDisabled: false,
          onClick: onTabClick,
          section: (
            <DefineInduction
              campusDriveId={campusDriveId}
              universityId={universityId}
            />
          ),
        },
        {
          label: "Define Interview Rounds",
          iconName: "fa-briefcase",
          isActive: false,
          isDisabled: false,
          onClick: onTabClick,
          section: <DefineInterviewRounds campusDriveId={campusDriveId} />,
        },
        {
          label: "Share Round Details",
          iconName: "fa-window-restore",
          isActive: false,
          isDisabled: false,
          onClick: onTabClick,
          section: <ShareInterviewRounds campusDriveId={campusDriveId} />,
        },
      ]);
    
    return <>
             <CampusDriveLayout
                tabs={tabs}
                campusDriveId={campusDriveId}
                universityId={universityId}
                round={'2'}
            />
    </>
}

export default Communication;