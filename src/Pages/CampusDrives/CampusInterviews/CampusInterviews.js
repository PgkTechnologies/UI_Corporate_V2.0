import { useNavigate, useParams } from "react-router-dom";
import JobSmallTab from "../DefineJobs/DefineJobsSubDivisions/JobSmallTab";
import { useState } from "react";
import CampusDriveLayout from "../CampusDriveLayout";
import RoundWiseResults from "./CampusInterviewsSubDivisions/RoundWiseResults";
import {onGetFileInfo} from "../../../utils/utils"
import { useDispatch } from "react-redux";
import { actionGetS3AttachRequest } from "../../../Store/Actions/SagaActions/CommonSagaActions";
import ShareRoundResults from "./CampusInterviewsSubDivisions/ShareRoundResults";
import ValidateProfiles from "./CampusInterviewsSubDivisions/ValidateProfiles";
import ReleaseOfferLetters from "./CampusInterviewsSubDivisions/ReleaseOfferLetters";
import EndCampusDrive from "./CampusInterviewsSubDivisions/EndCampusDrive";

const CampusInterviews = (props) => {

    let {campusDriveId,universityId} = useParams();
  
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
            <RoundWiseResults getAttach={getAttach} campusDriveId={campusDriveId} />
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
              campusDriveId={campusDriveId}
            />
          ),
        },
        {
          label: "View & Validate Final List of Students",
          iconName: "fa-calendar-alt",
          isActive: false,
          isDisabled: false,
          onClick: onTabClick,
          section: (
            <ValidateProfiles getAttach={getAttach} campusDriveId={campusDriveId} />
          ),
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
              campusDriveId={campusDriveId}
            />
          ),
        },
        {
          label: "End Campus Drive",
          iconName: "fa-briefcase",
          isActive: false,
          isDisabled: false,
          onClick: onTabClick,
          section: <EndCampusDrive campusDriveId={campusDriveId} />,
        },
      ]);
 
    
    return <>
             <CampusDriveLayout
                tabs={tabs}
                campusDriveId={campusDriveId}
                universityId={universityId}
                round={'3'}
            />
    </>
}

export default CampusInterviews;