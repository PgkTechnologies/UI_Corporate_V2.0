import { useParams } from "react-router-dom";
import CampusDriveDatesFinalizationSection from "./DefineJobsSubDivisions/CampusDriveDatesFinalizationSection";
import DefineJobApplicationWindowSection from "./DefineJobsSubDivisions/JobCreation/DefineJobApplicationWindowSection";
import DefineJobsSection from "./DefineJobsSubDivisions/DefineJobsSection";
import ShareJobDetailsSection from "./DefineJobsSubDivisions/ShareJobDetailsSection/ShareJobDetailsSection";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from "react";
import CampusDriveLayout from "../CampusDriveLayout";

const DefineJobsMain = (props) => {

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
            label: "Campus Drive Date Finalization",
            iconName: CalendarMonthIcon,
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            section: <CampusDriveDatesFinalizationSection campusDriveId={campusDriveId} universityId={universityId} />,
        },
        {
            label: "Define Jobs",
            iconName: CalendarMonthIcon,
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            section:<DefineJobsSection campusDriveId={campusDriveId} universityId={universityId} />,
        },
        {
            label: "Share Job Details",
            iconName: CalendarMonthIcon,
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            section: <ShareJobDetailsSection campusDriveId={campusDriveId} universityId={universityId} />,
        },
        {
            label: "Define Job Application Window",
            iconName: CalendarMonthIcon,
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            section: <DefineJobApplicationWindowSection campusDriveId={campusDriveId} />,
        },
    ]);

    return <>
            <CampusDriveLayout
                tabs={tabs}
                campusDriveId={campusDriveId}
                universityId={universityId}
                round={'1'}
            />
        </>

}

export default DefineJobsMain;