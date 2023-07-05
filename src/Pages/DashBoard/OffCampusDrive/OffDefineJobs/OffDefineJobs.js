import { Work } from "@mui/icons-material";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import DefineJobsSection from "../../../CampusDrives/DefineJobs/DefineJobsSubDivisions/DefineJobsSection";
import DefineJobApplicationWindowSection from "../../../CampusDrives/DefineJobs/DefineJobsSubDivisions/JobCreation/DefineJobApplicationWindowSection";
import ShareJobDetailsSection from "../../../CampusDrives/DefineJobs/DefineJobsSubDivisions/ShareJobDetailsSection/ShareJobDetailsSection";
import OffCampusDriveLayout from "./OffCampusDriveLayout";
import DateAndLocationFinalization from "./Sections/DateAndLocationFinalization";
// import DefineJobsSection from "./Sections/DefineJobsSection";
// import OffCampusDriveLayout from "../Components/OffCampuDriveLayout";
// import DefineJobApplicationWindowSection from "../../CampusDrive/DefineJobs/Sections/DefineJobApplicationWindowSection/DefineJobApplicationWindowSection";
// import DefineJobsSection from "../../CampusDrive/DefineJobs/Sections/DefineJobsSection/DefineJobsSection";
// import ShareJobDetailsSection from "../../CampusDrive/DefineJobs/Sections/ShareJobDetailsSection/ShareJobDetailsSection";

const OffDefineJobs = (props) => {

    const { offCampusDriveId, universityId } = useParams();
    const onTabClick = (tabIndex) => {
        console.log(tabIndex, 'innnn')
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
            label: "Dates and Location Finalization",
            iconName: "fa-calendar-alt",
            isActive: true,
            isDisabled: false,
            onClick: onTabClick,
            section: (
                <DateAndLocationFinalization
                    offCampusDriveId={offCampusDriveId}
                    universityId={universityId}
                />
            ),
        },
        {
            label: "Define Jobs",
            iconName: "fa-file-alt",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
              section: (
                <DefineJobsSection
                  campusDriveId={offCampusDriveId}
                  universityId={universityId}
                />
              ),
        },
        {
            label: "Share Job Details",
            iconName: "fa-briefcase",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
              section: (
                <ShareJobDetailsSection
                  campusDriveId={offCampusDriveId}
                  universityId={universityId}
                />
              ),
        },
        {
            label: "Define Job Application Window",
            iconName: "fa-briefcase",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
              section: (
                <DefineJobApplicationWindowSection
                  campusDriveId={offCampusDriveId}
                  universityId={universityId}
                />
              ),
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


    const getTabSection = () => {
        if (
            tabs?.length &&
            tabs?.some((item) => item.isActive === true)
        ) {
            let currentIndex = 0;
            tabs.forEach((item, index) => {
                if (item.isActive) {
                    currentIndex = index;
                }
            });

            if (tabs[currentIndex].section) {
                return tabs[currentIndex].section;
            }
        }
    };


    const cardStyle = tabs?.map((item) => {
        if (item?.isActive === true) {

        }
    })

    console.log(tabs, 'tabss')

    // http://{{hostip}}:{{hostport}}/lut/?ignoreCache=true&lutList=reportName
    return (
        <>
            <OffCampusDriveLayout
                tabs={tabs}
                offCampusDriveId={offCampusDriveId}
                round = {'1'}
            />
        </>
    );
};

export default OffDefineJobs;