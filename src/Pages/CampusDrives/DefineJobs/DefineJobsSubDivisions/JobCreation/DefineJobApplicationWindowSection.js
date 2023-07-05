import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Checkbox from "@material-ui/core/Checkbox";
import ApplicationWindowForm from "./ApplicationWindowForm";
import {
    actionGetCampusDriveDefineJobsListRequestSaga,
    actionGetDefineJobApplicationWindowById,
    actionPostDefineJobApplicationWindow,
} from "../../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";
import CustomToastModal from "../../../../../Components/CustomToastModal";
import { Work } from "@material-ui/icons";


const DefineJobApplicationWindowSection = (props) => {

    const dispatch = useDispatch();
    const [selectedJob, setSelectedJob] = useState(false);
    const [mode, setMode] = useState("ADD");
    const [jobsList, setJobsList] = useState([]);
    const [toastModal, setToastModal] = useState(false);
    const [showToastModal, setShowToastModal] = useState(false);

    useEffect(() => {
        getAllJobs();
    }, []);

    const getAllJobs = () => {
        dispatch(
            actionGetCampusDriveDefineJobsListRequestSaga({
                campusDriveId: props?.campusDriveId,
                callback: (response) => {
                    if (response?.length) {
                        setJobsList(response);
                    }
                },
            })
        );
    };

    const getSingleWindowDetails = (item) => {
        dispatch(
            actionGetDefineJobApplicationWindowById({
                apiPayloadRequest: {
                    jobID: item?.jobID,
                    campusDriveID: props?.campusDriveId,
                },
                callback: (response) => {
                    if (
                        response?.jobApplWindowFromDate &&
                        response?.jobApplWindowFromTime &&
                        response?.jobApplWindowToDate &&
                        response?.jobApplWindowToTime
                    ) {
                        setSelectedJob({
                            ...item,
                            jobApplWindowFromDate: response?.jobApplWindowFromDate,
                            jobApplWindowFromTime: response?.jobApplWindowFromTime,
                            jobApplWindowToDate: response?.jobApplWindowToDate,
                            jobApplWindowToTime: response?.jobApplWindowToTime,
                            accepted: true,
                        });
                        setMode("VIEW");
                    }
                },
            })
        );
    };

    const getJobsList = () => {
        if (jobsList.length) {
            return jobsList.map((item) => {
                return item.publishFlag &&
                    !item.jobAppWindowDefined &&
                    tabValue === 0 ? (
                    <div className="row align-items-center">
                        <div className="jobs-cdx" style={{ width: '90%' }} >
                            <div
                                className="d-flex justify-content-between align-items-center w-full cd-job-list-item"
                                style={{ maxWidth: "100%" }}
                            >
                                <div className="col-md-4">
                                    <div className="row align-items-center">
                                        <div
                                            className="col-3 job-icon job-blue-icon d-flex justify-content-center align-items-center"
                                            style={{ borderRadius: "5px", width: "60px" }}
                                        >   
                                            <Work />
                                            
                                        </div>
                                        <p
                                            className="col-9 job-label text-ellipsis"
                                            style={{ maxWidth: "220px", textTransform: "capitalize" }}
                                        >
                                            {item.jobName}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div
                                        style={{
                                            border: "1px solid #cacaca",
                                            borderRadius: "4px",
                                            padding: "8px 4px",
                                            maxWidth: "100px",
                                            marginLeft: "10%",
                                        }}
                                    >
                                        <p
                                            style={{
                                                marginLeft: "10px",
                                                textTransform: "capitalize",
                                                fontSize: ".800rem",
                                            }}
                                        >
                                            {item.status}
                                        </p>
                                    </div>
                                </div>
                                <div className={"col-md-4 d-flex align-items-center"}>
                                    <button
                                        type="button"
                                        className="btn d-flex justify-content-around align-items-center"
                                        style={{
                                            // height: "30px",
                                            width: "100px",
                                            fontSize: ".700rem",
                                            borderRadius: "4px",
                                            textTransform: "uppercase",
                                            fontWeight: "bolder",
                                            marginLeft: "40%",
                                        }}
                                        disabled={item.status !== "open" ? true : false}
                                        onClick={() => {
                                            setSelectedJob(item);
                                        }}
                                    >
                                        Define Job Window
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : item.publishFlag && item.jobAppWindowDefined && tabValue === 1 ? (
                    <div className="row align-items-center">
                        <div className="jobs-cdx" style={{width:'90%'}} >
                            <div
                                className="d-flex justify-content-between align-items-center w-full cd-job-list-item"
                                style={{ maxWidth: "100%" }}
                            >
                                <div className="col-md-4">
                                    <div className="row align-items-center">
                                        <div
                                            className="col-3 job-icon job-blue-icon d-flex justify-content-center align-items-center"
                                            style={{ borderRadius: "5px", width: "60px" }}
                                        >
                                            <Work />
                                        </div>
                                        <p
                                            className="col-9 job-label text-ellipsis"
                                            style={{ maxWidth: "220px", textTransform: "capitalize" }}
                                        >
                                            {item.jobName}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div
                                        style={{
                                            border: "1px solid #cacaca",
                                            borderRadius: "4px",
                                            padding: "8px 4px",
                                            maxWidth: "100px",
                                            marginLeft: "10%",
                                        }}
                                    >
                                        <p
                                            style={{
                                                marginLeft: "10px",
                                                textTransform: "capitalize",
                                                fontSize: ".800rem",
                                            }}
                                        >
                                            {item.status}
                                        </p>
                                    </div>
                                </div>
                                <div className={"col-md-4 d-flex align-items-center"}>
                                    <button
                                        type="button"
                                        className="btn d-flex justify-content-around align-items-center"
                                        style={{

                                            width: "100px",
                                            fontSize: ".700rem",
                                            borderRadius: "4px",
                                            textTransform: "uppercase",
                                            fontWeight: "bolder",
                                            marginLeft: "40%",
                                        }}
                                        onClick={() => {
                                            getSingleWindowDetails(item);
                                        }}
                                        disabled={item.status !== "open" ? true : false}
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : undefined;
            });
        } else {
            return;
        }
    };

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const submitWindowForm = (windowFormData) => {
        console.log(windowFormData, "DEFINE")
        delete windowFormData["accepted"];
        if (mode === "EDIT") {
            windowFormData["update"] = true;
        }

        dispatch(
            actionPostDefineJobApplicationWindow({
                apiPayloadRequest: {
                    data: { ...windowFormData, cdID: props?.campusDriveId },
                },
                callback: (response) => {
                    getAllJobs();
                    setSelectedJob(false);
                },
            })
        );
    };

    return (
        <div className="bgWhite">
            <p className="text-center text-primary p-2">Define Job Window</p>
            {!selectedJob ? (
                <div
                    className="CD-define-jobs-list"
                    style={{ height: "400px", overflowY: "scroll", overflowX: "hidden" }}
                >
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        indicatorColor={"primary"}
                        style={{
                            backgroundColor: "white",
                            width: "100%",
                            marginBottom: "12px",
                        }}
                    >
                        <Tab
                            label="Jobs Published"
                            disableRipple
                            style={{ outline: "none", textTransform: "capitalize" }}
                        />
                        <Tab
                            label="Job Window Defined"
                            disableRipple
                            style={{ outline: "none", textTransform: "capitalize" }}
                        />
                    </Tabs>

                    {jobsList.length === 0 && !selectedJob ? (
                        <div className="center">
                            <p className="no-list-label">Please add jobs to continue...</p>
                        </div>
                    ) : undefined}

                    {jobsList.length && !selectedJob ? getJobsList() : undefined}
                </div>
            ) : (
                <ApplicationWindowForm
                    openClose={() => {
                        setSelectedJob(false);
                    }}
                    job={selectedJob}
                    mode={mode}
                    campusDriveId={props?.campusDriveId}
                    submit={submitWindowForm}
                    updateMode={(_mode) => {
                        setMode(_mode);
                    }}
                />
            )}
            {toastModal && (
                <CustomToastModal
                    onClose={() => {
                        setToastModal(false);
                        setShowToastModal(false);
                    }}
                    show={toastModal || showToastModal ? true : false}
                    iconNameClass={"fa-briefcase"}
                    message={
                        showToastModal
                            ? "Selected Jobs Have Been Published"
                            : toastModal
                                ? props.mode === "ADD"
                                    ? "Job Saved Successfully!"
                                    : "Job Updated Successfully!"
                                : ""
                    }
                />
            )}
        </div>
    );
};

export default DefineJobApplicationWindowSection;
