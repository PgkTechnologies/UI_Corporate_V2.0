//CampusDrive and offcampus- 1 Here we are passing values to  New and old => HC/ Job
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { actionAssignJobRequesttoOffCampusDrivesAction, actionDeleteCampusDriveJobRequestSaga, actionGetCampusDriveDefineJobsListRequestSaga, actionGetCampusDriveHiringCriteriaListRequestSaga, actionPostOrPatchCampusDriveHiringCriteriaRequestSaga, actionPostOrPatchCampusDriveJobRequestSaga, actionPostOrPatchOffCampusDriveHiringCriteriaRequestSaga, actionPostOrPatchOffCampusDriveJobRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";
import { actionGetOffCampusDriveJobsRequest, actionPostAddAllPublishedJobsRequest } from "../../../../Store/Actions/SagaActions/OffCampusDrive/OffCampusDriveSagaAction";
import CustomToastModal from "../../../../Components/CustomToastModal";
import PgkMultiSelectField from "../../../../Components/FormFields/PgkMultiSelectField";
import HiringCriteriaFormSection from "../Components/HiringCriteriaFormSection";
import JobFormSection from "../Components/JobFormSection";
import { Modal, ModalBody } from "reactstrap";
import { CancelOutlined } from "@mui/icons-material";
import { Work } from "@material-ui/icons";

const DefineJobsSection = (props) => {

    const dispatch = useDispatch();
    const [section, setSection] = useState({
        firstSection: false,
        secondSection: false,
    });
    const { campusDriveId, offCampusDriveId } = useParams();

    const [hiringCriteriaList, setHiringCriteriaList] = useState([
        {
            hiringCriteriaID: "ADD_NEW_HC",
            hiringCriteriaName: "Add New",
            iconName: "fa-plus",
        },
    ]);
    const [selectedHcId, setSelectedHcId] = useState();
    const [selectedJob, setSelectedJob] = useState();
    const [jobsList, setJobsList] = useState([]);
    const [toastModal, setToastModal] = useState(false);
    const [mode, setMode] = useState("ADD");
    const [selectedJobsList, setSelectedJobsList] = useState([]);
    const [publishedJobsList, setPublishedJobsList] = useState([]);
    const [driveType, setDriveType] = useState(true);
    const [JobID, setJobID] = useState("");
    const [jobType, setJobType] = useState(null);

    useEffect(() => {
        jobsInfo();
    }, []);

    useEffect(() => {
        if (offCampusDriveId) {
            setJobType("Off Campus");
        } else if (campusDriveId) {
            setJobType("Campus Drive");
        }
    }, [offCampusDriveId]);

    const toggleDriveType = () => {
        setDriveType(!driveType);
    };

    const onAddJob = () => {
        getOffCampusDriveJobs();
        toggleDriveType();
    };

    const getOffCampusDriveJobs = () => {
        dispatch(
            actionGetOffCampusDriveJobsRequest({
                driveID: props?.campusDriveId,
                callback: getOffCampusJobs,
            })
        );
    };

    const getOffCampusJobs = (data) => {
        const sort = data?.sort((item) => item.publishID).reverse();
        console.log(sort, "DD");
        setPublishedJobsList(sort);
    };

    const getAllJobs = () => {
        //console.log('Hi')
        //console.log(props?.campusDriveId)
        dispatch(
            actionGetCampusDriveDefineJobsListRequestSaga({
                campusDriveId: props?.campusDriveId,
                callback: getDefineJobs,
            })
        );
    };

    const getDefineJobs = (response) => {
        //console.log(response)
        if (response?.length) {
            setJobsList(response);
        } else {
            setJobsList([]);
        }
    };

    const getHiringCriteriaList = () => {
        dispatch(
            actionGetCampusDriveHiringCriteriaListRequestSaga({
                apiPayloadRequest: {
                    campusDriveId: props.campusDriveId,
                },
                callback: (hcResponseList) => {
                    if (hcResponseList?.length) {
                        setHiringCriteriaList([
                            ...hcResponseList,
                            {
                                hiringCriteriaID: "ADD_NEW_HC",
                                hiringCriteriaName: "Add New",
                                iconName: "fa-plus",
                            },
                        ]);
                    }
                },
            })
        );
    };

    //Posting HC and Job Data
    const submitHcData = (hcData, jobFormData) => {
        console.log(hcData, jobFormData, "POSTHCDATACD");
        if (["EDIT", "ADD"].includes(mode)) {
            if (campusDriveId) {
                dispatch(
                    actionPostOrPatchCampusDriveHiringCriteriaRequestSaga({
                        apiPayloadRequest: {
                            ...hcData,
                            cdID: props?.campusDriveId,
                            hiringCriteriaName: props?.campusDriveId + "PGK",
                        },
                        callback: (data) => poseJobDataOnCallback(data, jobFormData),
                    })
                );
            } else if (offCampusDriveId) {
                dispatch(
                    actionPostOrPatchOffCampusDriveHiringCriteriaRequestSaga({
                        apiPayloadRequest: {
                            hiringCriterias: [hcData],
                        },
                        callback: (data) => poseJobDataOnCallback(data, jobFormData),
                    })
                );
            }

            // // Passing Old API
            // console.log(hcData, "DDDDD");
            // dispatch(
            //   AddJobsSagaAction({
            //     apiPayloadRequest: hcData,
            //     callback: (data) => onSuccessPostHC(data, jobFormData),
            //   })
            // );
        } else {
            setSection({
                firstSection: false,
                secondSection: true,
            });
        }
    };

    const poseJobDataOnCallback = (hcResponse, jobFormData) => {
        const jobFormFields = [
            "jobName",
            "jobType",
            "skills",
            "salaryMinRange",
            "salaryMaxRange",
            "monthOfHiring",
            "remarks",
            "attachment",
            "status",
            "noOfPositions",
            "location",
            "verifiedProfilesOnly",
        ];
        let updatedJobData = {};
        jobFormFields.forEach((item) => {
            if (item === "attachment") {
                updatedJobData["attachment"] = jobFormData[item].value.attachment;
                updatedJobData["attachmentName"] =
                    jobFormData[item].value.attachmentName;
            } else if (item === "skills") {
                updatedJobData["skills"] = jobFormData[item].value.map((item) => {
                    return { skillID: item.id, skill: item.text };
                });
            } else if (item === "monthOfHiring") {
                updatedJobData[item] = moment(jobFormData[item].value);
            } else if (item === "noOfPositions") {
                updatedJobData[item] = parseFloat(jobFormData[item].value);
            } else if (item === "verifiedProfilesOnly") {
                if (jobFormData[item].value === "") {
                    console.log("Error");
                } else {
                    updatedJobData[item] = jobFormData[item].value;
                }
            } else if (item === "location") {
                if (jobFormData[item].value === "") {
                    console.log("Error");
                } else {
                    updatedJobData[item] = jobFormData[item].value;
                }
            } else {
                updatedJobData[item] = jobFormData[item].value;
            }
        });
        if (hcResponse) {
            if (campusDriveId) {
                dispatch(
                    actionPostOrPatchCampusDriveJobRequestSaga({
                        apiPayloadRequest: {
                            ...updatedJobData,
                            cdID: props?.campusDriveId,
                            hiringCriteriaID: hcResponse?.hiringCriteriaID,
                            hiringCriteriaName: hcResponse?.hiringCriteriaID + "PGK",
                        },
                        callback: (jobResponse) => {
                            setToastModal(true);
                            closeWindow();
                            getAllJobs();
                        },
                    })
                );
            } else if (offCampusDriveId) {
                const jobId = hcResponse?.hcID.slice(1, -1);
                dispatch(
                    actionPostOrPatchOffCampusDriveJobRequestSaga({
                        apiPayloadRequest: {
                            ...updatedJobData,
                            hiringCriteriaID: jobId,
                            hiringCriteriaName: jobId + "PGK",
                        },
                        callback: (data) => {
                            assignOffcampuseDrive(data);
                        },
                    })
                );
            }
            setSelectedHcId(hcResponse.hiringCriteriaID);
            setSection({
                firstSection: false,
                secondSection: true,
            });
        }
    };
    const assignOffcampuseDrive = (data) => {
        console.log(data, "JOBID");
        if (data) {
            dispatch(
                actionAssignJobRequesttoOffCampusDrivesAction({
                    apiPayloadRequest: {
                        jobIds: [data.jcID],
                        cdID: props?.campusDriveId,
                    },
                    callback: () => {
                        setToastModal(true);
                        closeWindow();
                        getAllJobs();
                    },
                })
            );
        }
    };

    const submitJobData = (data) => {
        console.log(data, "OFFF");
        if (["EDIT", "ADD"].includes(mode)) {
            console.log("EDIT");
            dispatch(
                actionPostOrPatchCampusDriveJobRequestSaga({
                    apiPayloadRequest: {
                        ...data,
                        cdID: props?.campusDriveId,
                    },
                    callback: (jobResponse) => {
                        setToastModal(true);
                        closeWindow();
                        getAllJobs();
                    },
                })
            );
        } else {
            closeWindow();
        }
    };

    const createJobNotification = (jobResponse) => {
        setToastModal(true);
        closeWindow();
        getAllJobs();
    };

    const closeWindow = () => {
        setSection({
            firstSection: false,
            secondSection: false,
        });
        setSelectedHcId();
        setSelectedJob();
        setMode("ADD");
    };

    const deleteJob = (jobId) => {
        dispatch(
            actionDeleteCampusDriveJobRequestSaga({
                apiPayloadRequest: {
                    jobID: jobId,
                },
                callback: (deleteJobResponse) => {
                    getAllJobs();
                },
            })
        );
    };

    const getJobsList = () => {
        console.log(jobsList, "JOBLIST");
        if (jobsList.length) {
            return jobsList.map((item) => {
                return (
                    <div className="jobs-cdx" >
                        <div className="row align-items-center">
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
                                        // disabled={item.status !== "open" ? true : false}
                                        onClick={() => {
                                            if (!item.publishFlag) {
                                                setMode("EDIT");
                                            }
                                            showDetails(item.jobID, item.cdID);
                                            //setMode("VIEW");
                                            //setSelectedHcId(item.hiringCriteriaID);

                                            //setSelectedJob(item);
                                        }}
                                    >
                                        <p>Details</p>
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                    {!item.publishFlag ? (
                                        <IconButton
                                            style={{ color: "white" }}
                                            onClick={() => {
                                                deleteJob(item.jobID);
                                            }}
                                            component="span"
                                        >
                                            <Close color={"primary"} />
                                        </IconButton>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    };

    const handleChange = (name, value, errorMessage = undefined) => {
        setSelectedJobsList(value);
    };

    const handleSubmit = () => {
        const model = {
            cdID: props?.campusDriveId,
            jobIds: [
                ...selectedJobsList.map((item, index) => {
                    return item.value;
                }),
            ],
        };
        dispatch(
            actionPostAddAllPublishedJobsRequest({
                publishedJobs: model,
                callback: onSuccess,
            })
        );
    };

    const onSuccess = () => {
        setSelectedJobsList([]);
        toggleDriveType();
        jobsInfo();
    };

    const jobsInfo = () => {
        getAllJobs();
        getHiringCriteriaList();
    };

    const showDetails = (id, cdId) => {
        setJobID({ id, cdId });
        setSection({
            firstSection: true,
            secondSection: false,
        });
    };

    console.log(jobType, "LISR");
    return (
        <div className="cmp-main">
            <div className="bgWhite" style={{ overflow: "hidden" }}>
                <p className="text-center text-primary p-2">Define Jobs</p>
                {driveType ? (
                    <>
                        <div
                            className="CD-define-jobs-list"
                            style={{
                                overflowY: "scroll",
                                overflowX: "hidden",
                            }}
                        >
                            {jobsList.length === 0 &&
                                !section.firstSection &&
                                !section.secondSection ? (
                                <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', fontWeight: 'bold' }}>
                                    <p>Please add jobs to continue...</p>
                                </div>
                            ) : undefined}
                            {section.firstSection || section.secondSection ? (
                                <div className="define-job-modal">
                                    <div className="define-job-header" style={{ background: '#03355bdc', display: 'flex', width: '100%', justifyContent: "space-between",  alignItems: 'center' }}>

                                        <p style={{paddingLeft:'400px',color:'white',marginTop:'5px'}} >{jobType} Job</p>

                                        <IconButton
                                            style={{ color: "white" }}
                                            onClick={closeWindow}
                                            component="span"
                                        >
                                            <Close />
                                        </IconButton>

                                    </div>

                                    {section.firstSection ? (
                                        //Campus Drive Using only HC
                                        <HiringCriteriaFormSection
                                            cancelHandler={closeWindow}
                                            jobType={jobType}
                                            hiringCriteriaList={hiringCriteriaList}
                                            submitHandler={submitHcData}
                                            mode={mode}
                                            JobID={JobID}
                                            noEditBtn={selectedJob?.publishFlag}
                                            hcId={selectedHcId}
                                            updateMode={(_mode) => {
                                                setMode(_mode);
                                            }}
                                        />
                                    ) : undefined}
                                    {section.secondSection ? (
                                        <JobFormSection
                                            selectedJob={selectedJob}
                                            mode={mode}
                                            noEditBtn={selectedJob?.publishFlag}
                                            isEditable={selectedJob?.publishFlag}
                                            updateMode={(_mode) => {
                                                setMode(_mode);
                                            }}
                                            hcId={selectedHcId}
                                            hiringCriteriaList={hiringCriteriaList}
                                            cancelHandler={closeWindow}
                                            submitHandler={submitJobData}
                                        />
                                    ) : undefined}
                                </div>
                            ) : undefined}
                            {jobsList.length && !section.firstSection && !section.secondSection
                                ? getJobsList()
                                : undefined}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="page-body" style={{ marginTop: 10 }}>
                            <p className="heading text-center" style={{ fontWeight: "bold" }}>
                                Off Campus Drive
                            </p>
                            <div
                                className="col-md-6"
                                style={{
                                    padding: "0px 4px",
                                    alignContent: "center",
                                    marginTop: "5%",
                                    marginLeft: "20%",
                                }}
                            >
                                <div className="mb-15">
                                    <PgkMultiSelectField
                                        name={"jobName"}
                                        values={selectedJobsList}
                                        onChange={handleChange}
                                        options={publishedJobsList?.map((item, index) => {
                                            return { label: item.jobName, value: item.jobID };
                                        })}
                                        labelStyles={{ fontSize: ".800rem" }}
                                        selectStyles={{ fontSize: ".800rem" }}
                                        menuStyles={{ fontSize: ".800rem" }}
                                        label={`Pulished Jobs`}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{
                                    marginBottom: "4%",
                                    bottom: "0",
                                    position: "absolute",
                                    marginLeft: "20%",
                                }}
                                onClick={() => {
                                    toggleDriveType();
                                }}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{
                                    marginBottom: "4%",
                                    bottom: "0",
                                    position: "absolute",
                                    marginLeft: "50%",
                                }}
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </>
                )}
                {props?.universityId === "OffCampus" &&
                    !section.firstSection &&
                    !section.secondSection ? (
                    <>
                        {driveType ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{
                                    marginBottom: "4%",
                                    marginTop: "5px",
                                    bottom: "0",
                                    marginLeft: "36%",
                                }}
                                onClick={() => {
                                    onAddJob();
                                }}
                            >
                                Add Jobs
                            </button>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <>
                        {!section.firstSection && !section.secondSection ? (
                            <div className="Jobs-Add-btn">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSection({
                                            firstSection: true,
                                            secondSection: false,
                                        });
                                        setJobID("");
                                    }}
                                    className="btn"
                                >
                                    Add new Job
                                </button>
                            </div>
                        ) : undefined}
                    </>
                )}

                {toastModal && (
                    <Modal isOpen={toastModal} >
                        <div style={{ display: 'inline-flex' }}>

                            <h3 style={{ margin: '70px 50px ' }}>{
                                toastModal
                                    ? props.mode === "ADD"
                                        ? "Job Saved Successfully!"
                                        : "Job Saved Successfully!"
                                    : ""
                            }</h3>
                            <ModalBody>
                                <CancelOutlined onClick={() => {
                                    setToastModal(false);
                                }} />
                            </ModalBody>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default DefineJobsSection;
