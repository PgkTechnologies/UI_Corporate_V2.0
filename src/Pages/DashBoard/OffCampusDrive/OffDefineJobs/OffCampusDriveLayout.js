import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import { Work } from "@material-ui/icons";

const OffCampusDriveLayout = (props) => {
    const history = useNavigate();
    const { offCampusDriveId, universityId } = useParams();

    const getTabSection = () => {
        if (
            props?.tabs?.length &&
            props.tabs.some((item) => item.isActive === true)
        ) {
            let currentIndex = 0;
            props?.tabs.forEach((item, index) => {
                if (item.isActive) {
                    currentIndex = index;
                }
            });

            if (props?.tabs[currentIndex].section) {
                return props?.tabs[currentIndex].section;
            }
        }
    };

    const navigateToHome = () => {
        history("/dashboard/off-campus-drive");
    };

    const navigateTo1 = (offCampusDriveId, universityId) => {
        history(
            "/dashboard/off-campus-drive/" +
            offCampusDriveId +
            "/off-define-jobs/" +
            universityId
        );
    };

    const navigateTo2 = (offCampusDriveId, universityId) => {
        history(
            "/dashboard/off-campus-drive/" +
            offCampusDriveId +
            "/off-communication/" +
            universityId
        );
    };

    const navigateTo3 = (offCampusDriveId, universityId) => {
        history(
            "/dashboard/off-campus-drive/" +
            offCampusDriveId +
            "/off-campus-interviews/" +
            universityId
        );
    };


    return (
        <div className="jobs-layout-main">
            <div className="row home-title-steps-main">
                <div
                    className="col-2 d-flex justify-content-center align-items-center"
                    onClick={() => {
                        navigateToHome();
                    }}>

                    <div className="home-main">Home</div>
                </div>
                <div className="col-10 tile-steps-main">
                    <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                        <Work style={{ marginRight: "10px", fontSize: "20px" }} />{" "}
                         {localStorage.getItem('driveName')}

                    </div>
                    <div className="steper-main">
                        <div
                            className={
                                props.round === "1" ?
                                    "step-card tab-select"
                                    : "step-card"
                            }
                            onClick={() => {
                                navigateTo1(offCampusDriveId, universityId);
                            }}>
                            <div className="num-icon">1</div>
                            <div className="step-name">Define Jobs</div>
                        </div>
                        <div
                            className={
                                props.round === "2" ?
                                    "step-card tab-select"
                                    : "step-card"
                            }
                            onClick={() => {
                                navigateTo2(offCampusDriveId, universityId);
                            }}>
                            <div className="num-icon">2</div>
                            <div className="step-name">Communication</div>
                        </div>
                        <div
                            className={
                                props.round === "3" ?
                                    "step-card tab-select"
                                    : "step-card"
                            }
                            onClick={() => {
                                navigateTo3(offCampusDriveId, universityId);
                            }}>
                            <div className="num-icon">3</div>
                            <div className="step-name">Campus Interviews</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row home-title-steps-main">
                <div className="col-2">
                    {props?.tabs?.length
                        ? props.tabs.map((item, index) => {
                            return (
                                <div className={item?.isActive ? 'sub-job-tabs sec-select' : 'sub-job-tabs'} onClick={() => { item.onClick(index) }}>
                                    <div className='sub-job-tabs-names'>
                                        {item?.label}
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center' style={{ width: "30%" }}>
                                        <item.iconName />
                                    </div>
                                </div>
                            )
                        })
                        : undefined}
                </div>

                <div className="col-10 content-main">
                    {!props?.tabs.some((item) => item.isActive === true) ? (
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ width: "100%", height: "100%" }}
                        >
                            <p
                                className="text-center"
                                style={{ fontSize: ".850rem", color: "#a1a1a1" }}
                            >
                                Select any option to preview the content here
                            </p>
                        </div>
                    ) : undefined}
                    {getTabSection()}
                </div>
            </div>
        </div>
    );
};

export default OffCampusDriveLayout;
