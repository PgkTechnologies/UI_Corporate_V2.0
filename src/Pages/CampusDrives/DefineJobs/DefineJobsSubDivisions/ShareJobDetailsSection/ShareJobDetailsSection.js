import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Checkbox from "@material-ui/core/Checkbox";
import { Modal, ModalBody } from "reactstrap";
import { CancelOutlined } from "@mui/icons-material";
import { Work } from "@material-ui/icons";
import { actionGetCampusDriveEmailTemplatesListRequestSaga } from "../../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CommunicationSagaAction";
import HiringCriteriaFormSection from "../../Components/HiringCriteriaFormSection";
import JobFormSection from "../../Components/JobFormSection";
import PgkSelectField from "../../../../../Components/FormFields/PgkSelectField";
import { actionGetS3AttachRequest } from "../../../../../Store/Actions/SagaActions/CommonSagaActions";
import { onGetFileInfo } from "../../../../../utils/utils";
import { actionPostPublishCorporateJobsRequest } from "../../../../../Store/Actions/SagaActions/JobsSagaAction";
import { actionDeleteCampusDriveJobRequestSaga, actionGetCampusDriveDefineJobsListRequestSaga, actionGetCampusDriveHiringCriteriaListRequestSaga, actionGetStudentsListCampusDriveRequestSaga, actionPostOrPatchCampusDriveHiringCriteriaRequestSaga, actionPostOrPatchCampusDriveJobRequestSaga, actionPublishJobsCampusDriveRequestSaga } from "../../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";
import StudentsListSection from "./StudentsListSection";

const ShareJobDetailsSection = (props) => {
    const dispatch = useDispatch();
    const [section, setSection] = useState({
        firstSection: false,
        secondSection: false,
    });
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
    const [showToastModal, setShowToastModal] = useState(false);
    const [mode, setMode] = useState("ADD");
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showStudentsList, setShowStudentsList] = useState(false);
    const [studentsList, setStudentsList] = useState({
        applicantList: [],
        exceptionList: [],
    });
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [selectedEmailTemplateId, setSelectedEmailTemplateId] = useState();
    const [JobID, setJobID] = useState("");
    useEffect(() => {
        getAllJobs();
        getHiringCriteriaList();
        getEmailTemplates();
    }, []);

    const getAllJobs = () => {
        dispatch(
            actionGetCampusDriveDefineJobsListRequestSaga({
                campusDriveId: props?.campusDriveId,
                callback: (response) => {
                    if (response?.length) {
                        setJobsList(response);
                    } else {
                        setJobsList([]);
                    }
                },
            })
        );
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
                    } else {
                        setHiringCriteriaList([
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

    const getEmailTemplates = () => {
        dispatch(
            actionGetCampusDriveEmailTemplatesListRequestSaga({
                apiPayloadRequest: {
                    campusDriveID: props.campusDriveId,
                },
                callback: (data) => {
                    if (data?.length) {
                        setEmailTemplates(
                            data.map((item) => {
                                return {
                                    value: item?.emailTemplateID,
                                    label: item?.emailTemplateName,
                                };
                            })
                        );
                    } else {
                        setEmailTemplates([]);
                    }
                },
            })
        );
    };

    const submitHcData = (data) => {
        if (["EDIT", "ADD"].includes(mode)) {
            dispatch(
                actionPostOrPatchCampusDriveHiringCriteriaRequestSaga({
                    apiPayloadRequest: {
                        ...data,
                        cdID: props?.campusDriveId,
                    },
                    callback: (hcResponse) => {
                        if (hcResponse?.hiringCriteriaID) {
                            setSelectedHcId(hcResponse.hiringCriteriaID);
                            setSection({
                                firstSection: false,
                                secondSection: true,
                            });
                        } else if (data?.hiringCriteriaID) {
                            setSelectedHcId(data.hiringCriteriaID);
                            setSection({
                                firstSection: false,
                                secondSection: true,
                            });
                        }

                        getHiringCriteriaList();
                    },
                })
            );
        } else {
            setSection({
                firstSection: false,
                secondSection: true,
            });
        }
    };

    const submitJobData = (data) => {
        console.log("HCPOST");
        if (["EDIT", "ADD"].includes(mode)) {
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

    const getAttach = (data) => {
        dispatch(actionGetS3AttachRequest({ path: data, callback: onGetFileInfo }));
    };

    const closeWindow = () => {
        setSection({
            firstSection: false,
            secondSection: false,
        });
    };

    const onCheckHandler = (id) => {
        let updatedSelectedItems = [...selectedItems];

        if (updatedSelectedItems.includes(id)) {
            var deleteItemIndex = updatedSelectedItems.indexOf(id);
            if (deleteItemIndex > -1) {
                updatedSelectedItems.splice(deleteItemIndex, 1);
            }
        } else {
            updatedSelectedItems.push(id);
        }

        setSelectedItems(updatedSelectedItems);
        setSelectAll(
            updatedSelectedItems.length ===
            jobsList.filter((item) => !item?.publishFlag && item.status == "open")
                .length
        );
    };

    const publishSelectedItems = (items) => {
        console.log(items, props, "ITEMSSSS");
        const CDID = props?.campusDriveId.slice(0, 2);
        if (CDID === "CF") {
            dispatch(
                actionPostPublishCorporateJobsRequest({
                    apiPayloadRequest: {
                        cdID: props?.campusDriveId,
                        jobIds: items,
                        emailTemplateId: selectedEmailTemplateId,
                    },
                    callback: (resp) => {
                        onPublishSuccess(resp, items);
                    },
                })
            );
        } else {
            dispatch(
                actionPublishJobsCampusDriveRequestSaga({
                    apiPayloadRequest: {
                        cdID: props?.campusDriveId,
                        jobIds: items,
                        emailTemplateId: selectedEmailTemplateId,
                    },
                    callback: (response) => {
                        setShowToastModal(true);
                        getAllJobs();
                    },
                })
            );
        }
    };

    const onPublishSuccess = (resp, items) => {
        console.log(resp, "PUBLISH1");

        dispatch(
            actionPublishJobsCampusDriveRequestSaga({
                apiPayloadRequest: {
                    cdID: props?.campusDriveId,
                    jobIds: items,
                    emailTemplateId: selectedEmailTemplateId,
                },
                callback: (response) => {
                    setShowToastModal(true);
                    getAllJobs();
                },
            })
        );
    };

    const publishSelected = () => {
        if (selectedItems.length) {
            let updatedSelectedItems = [];

            jobsList.forEach((item) => {
                if (selectedItems.includes(item.jobID)) {
                    updatedSelectedItems.push(item.jobID);
                }
            });

            if (updatedSelectedItems?.length) {
                publishSelectedItems(updatedSelectedItems);
            }
        }
    };

    const viewStudentsList = (item) => {
        setSelectedJob(item);
        getStudentsList(item);
    };

    const getStudentsList = (item = undefined) => {
        dispatch(
            actionGetStudentsListCampusDriveRequestSaga({
                apiPayloadRequest: {
                    jobID: item?.jobID ? item?.jobID : selectedJob?.jobID,
                    campusDriveId: props?.campusDriveId,
                },
                callback: (response) => {
                    if (response) {
                        setStudentsList(response);
                    } else {
                        setStudentsList({
                            applicantList: [],
                            exceptionList: [],
                        });
                    }
                    setShowStudentsList(true);
                },
            })
        );
    };

    const showDetails = (id, cdId) => {
        setJobID({ id, cdId });
        setSection({
            firstSection: true,
            secondSection: false,
        });
    };

    const getJobsList = () => {
        if (jobsList.length) {
            return jobsList.map((item) => {
                return !item.publishFlag &&
                    tabValue === 0 &&
                    props?.universityId !== "OffCampus" ? (
                    <div className="row align-items-center">
                        <div
                            className="d-flex justify-content-between align-items-center w-full cd-job-list-item"
                            style={{ maxWidth: "100%" }}
                        >
                            {item.status === "open" ? (
                                <Checkbox
                                    size={"small"}
                                    color={"primary"}
                                    checked={selectedItems.includes(item?.jobID) ? true : false}
                                    onChange={(e) => {
                                        onCheckHandler(item?.jobID);
                                    }}
                                />
                            ) : (
                                <></>
                            )}

                            <div className="col-md-4">
                                <div className="row align-items-center">
                                    <div
                                        className="col-3 job-icon job-blue-icon d-flex justify-content-center align-items-center"
                                        style={{ borderRadius: "5px", width: "60px" }}
                                    >
                                        <i
                                            className="fas fa-briefcase"
                                            style={{ color: "white", padding: "10px" }}
                                        />
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
                                        height: "30px",
                                        width: "100px",
                                        fontSize: ".700rem",
                                        borderRadius: "4px",
                                        textTransform: "uppercase",
                                        fontWeight: "bolder",
                                        marginLeft: "40%",
                                    }}
                                    disabled={item.status !== "open" ? true : false}
                                    // onClick={() => {
                                    //   setMode("VIEW");
                                    //   setSelectedHcId(item.hiringCriteriaID);
                                    //   setSection({
                                    //     firstSection: true,
                                    //     secondSection: false,
                                    //   });
                                    //   setSelectedJob(item);
                                    // }}
                                    onClick={() => {
                                        showDetails(item.jobID, item.cdID);
                                    }}
                                >
                                    <p>Details</p>
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (item.publishFlag && tabValue === 1) ||
                    props?.universityId === "OffCampus" ? (
                    <div className="jobs-cdx"  style={{width:'70%'}}>
                        <div className="row align-items-center">
                            <div
                                className="d-flex justify-content-between align-items-center w-full cd-job-list-item"
                                style={{ maxWidth: "900px" }}
                            >
                                <div className="col-md-4">
                                    <div className="row align-items-center">
                                        <div
                                            className="col-3 job-icon job-blue-icon d-flex justify-content-center align-items-center"
                                            style={{ borderRadius: "5px", width: "60px" }}
                                        >
                                           <Work/>
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
                                        className="btn"
                                        style={{
                                            width: "100px",
                                            fontSize: "0.900rem",
                                            borderRadius: "4px",
                                            textTransform: "uppercase",
                                            fontWeight: "bolder",
                                            marginLeft: "40%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        disabled={item.status !== "open" ? true : false}
                                        onClick={() => {
                                            viewStudentsList(item);
                                        }}
                                    >
                                        List
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

    const onSelect = (id) => {
        let updatedSelectedItems = [...selectedItems];

        if (id === "ALL") {
            updatedSelectedItems = [];

            if (selectAll === false) {
                jobsList.forEach((item) => {
                    if (!item?.publishFlag) {
                        updatedSelectedItems.push(item?.jobID);
                    }
                });
            }
            setSelectedItems(updatedSelectedItems);
            setSelectAll(!selectAll);
        } else {
            setSelectedItems(updatedSelectedItems);
        }
    };

    return (
        <div className="bgWhite">
            <p className="text-center text-primary p-2">Share Job Details</p>
            {!showStudentsList ? (
                <div
                    className="CD-define-jobs-list"
                    style={{ height: "400px", overflowY: "scroll", overflowX: "hidden" }}
                >
                    {section.firstSection || section.secondSection ? (
                        <div className="define-job-modal">
                            <div className="define-job-header">
                                <div></div>
                                <p className="text-white">Define Job</p>
                                <span>
                                    <i
                                        className="fas fa-times-circle text-white"
                                        style={{ cursor: "pointer" }}
                                        onClick={closeWindow}
                                    ></i>
                                </span>
                            </div>
                            {section.firstSection ? (
                                <HiringCriteriaFormSection
                                    cancelHandler={closeWindow}
                                    hiringCriteriaList={hiringCriteriaList}
                                    submitHandler={submitHcData}
                                    mode={mode}
                                    JobID={JobID}
                                    noEditBtn
                                    saveLabel={"Next"}
                                    hcId={selectedHcId}
                                />
                            ) : undefined}
                            {section.secondSection ? (
                                <JobFormSection
                                    noEditBtn
                                    selectedJob={selectedJob}
                                    mode={mode}
                                    hcId={selectedHcId}
                                    hiringCriteriaList={hiringCriteriaList}
                                    cancelHandler={closeWindow}
                                    submitHandler={submitJobData}
                                />
                            ) : undefined}
                        </div>
                    ) : undefined}
                    {!section.firstSection && !section.secondSection ? (
                        <div
                            // className="row"
                            className="col-lg-9 col-sm-12 card-content"
                        >
                            <Tabs
                                value={tabValue}
                                onChange={handleChange}
                                indicatorColor={"primary"}
                                style={{ backgroundColor: "white", width: "100%" }}
                            >
                                {props?.universityId !== "OffCampus" ? (
                                    <Tab
                                        label="Publish Jobs"
                                        disableRipple
                                        style={{ outline: "none", textTransform: "capitalize" }}
                                    />
                                ) : (
                                    <></>
                                )}
                                <Tab
                                    label="Publish Jobs History"
                                    disableRipple
                                    style={{ outline: "none", textTransform: "capitalize" }}
                                />
                            </Tabs>
                        </div>
                    ) : undefined}
                    {jobsList.length === 0 &&
                        !section.firstSection &&
                        !section.secondSection ? (
                        <div className="center">
                            <p className="no-list-label">Please add jobs to continue...</p>
                        </div>
                    ) : undefined}

                    {props?.universityId !== "OffCampus" ? (
                        <>
                            {jobsList?.length &&
                                !section.firstSection &&
                                !section.secondSection &&
                                tabValue === 0 &&
                                jobsList.some((item) => !item.publishFlag) ? (
                                <div
                                    className="w-full d-flex justify-content-start align-content-center publish-selected-btn-container"
                                    style={{ marginTop: '25px' }}
                                >
                                    <Checkbox
                                        size={"small"}
                                        color={"primary"}
                                        checked={selectAll}
                                        onChange={(e) => {
                                            onSelect("ALL");
                                        }}
                                    />
                                    <PgkSelectField
                                        name="emailTemplateId"
                                        value={selectedEmailTemplateId}
                                        onChange={(name, value, errorMessage) => {
                                            setSelectedEmailTemplateId(value);
                                        }}
                                        label={`Email Template`}
                                        options={emailTemplates}
                                        labelStyles={{
                                            fontSize: ".800rem",
                                            backgroundColor: "#fff",
                                            paddingLeft: "3px",
                                            paddingRight: "3px",
                                        }}
                                        selectStyles={{ fontSize: ".800rem" }}
                                        menuStyles={{ fontSize: ".800rem" }}
                                        styles={{ width: "50%", marginRight: "12px" }}
                                    />
                                    <button
                                        type="button"
                                        className="btn1"
                                        style={{
                                            color: 'whitesmoke',
                                            width: "100px",
                                            fontSize: ".700rem",
                                        }}
                                        onClick={publishSelected}
                                    >
                                        Publish Selected
                                    </button>
                                </div>
                            ) : undefined}
                        </>
                    ) : null}
                    {jobsList.length && !section.firstSection && !section.secondSection
                        ? getJobsList()
                        : undefined}
                </div>
            ) : undefined}
            {showStudentsList ? (
                <StudentsListSection
                    getAttach={getAttach}
                    jobItem={selectedJob}
                    universityId={props?.universityId}
                    studentsList={studentsList}
                    onClose={() => {
                        setShowStudentsList(false);
                    }}
                    onSuccess={getStudentsList}
                    campusDriveId={props?.campusDriveId}
                />
            ) : undefined}
            {toastModal && (
                // <CustomToastModal
                //   onClose={() => {
                //     setToastModal(false);
                //     setShowToastModal(false);
                //   }}
                //   show={toastModal || showToastModal ? true : false}
                //   iconNameClass={"fa-briefcase"}
                //   message={
                //     showToastModal
                //       ? "Selected Jobs Have Been Published"
                //       : toastModal
                //       ? props.mode === "ADD"
                //         ? "Job Saved Successfully!"
                //         : "Job Updated Successfully!"
                //       : ""
                //   }
                // />
                <Modal isOpen={toastModal} >
                    <ModalBody>
                        <CancelOutlined onClick={() => {
                            setToastModal(false);
                            setShowToastModal(false);
                        }} />
                        <h3>{
                            showToastModal
                                ? "Selected Jobs Have Been Published"
                                : toastModal
                                    ? props.mode === "ADD"
                                        ? "Job Saved Successfully!"
                                        : "Job Updated Successfully!"
                                    : ""
                        }</h3>
                    </ModalBody>
                </Modal>
            )}
        </div>
    );
};

export default ShareJobDetailsSection;
