import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { actionPublishJobsCampusDriveRequestSaga, actionPutCampusDriveExceptionStudentListRequest } from "../../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";
import { actionGetCampusDriveStudentResumeRequest } from "../../../../../Store/Actions/SagaActions/CampusDriveSagaActions";
import { Modal, ModalBody } from "reactstrap";
import { CancelOutlined } from "@mui/icons-material";
import CompareCriteriaCmp from "../../Components/CompareCriteriaModal";

const StudentsListSection = (props) => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [toastModal, setToastModal] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const [enableCompareModal, setEnableCompareModal] = useState(false);
  const [selectedStudentID, setSelectedStudentID] = useState("");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onViewDetails = (studentID) => {
    toggleEnableCompareModal();
    setSelectedStudentID(studentID);
  };

  const toggleEnableCompareModal = () => {
    setEnableCompareModal(!enableCompareModal);
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
  };

  const publishSelectedItems = (items) => {
    dispatch(
      actionPublishJobsCampusDriveRequestSaga({
        apiPayloadRequest: {
          cdID: props?.campusDriveId,
          jobIds: items,
        },
        callback: (response) => { },
      })
    );
  };

  const publishSelected = () => {
    if (selectedItems.length) {
      let updatedSelectedItems = [];

      [].forEach((item) => {
        if (selectedItems.includes(item.jobID)) {
          updatedSelectedItems.push(item.jobID);
        }
      });

      if (updatedSelectedItems?.length) {
        publishSelectedItems(updatedSelectedItems);
      }
    }
  };

  const onSelect = (id) => {
    let updatedSelectedItems = [...selectedItems];

    if (id === "ALL") {
      updatedSelectedItems = [];

      if (selectAll === false) {
        [].forEach((item) => {
          updatedSelectedItems.push(item?.jobID);
        });
      }
      setSelectedItems(updatedSelectedItems);
      setSelectAll(!selectAll);
    } else {
      setSelectedItems(updatedSelectedItems);
    }
  };

  const tableHeader = {
    fontSize: ".800rem",
    textAlign: "center",
    padding: "6px",
    backgroundColor: "#01253cf5",
    fontWeight: "500",
    color: "white",
  };

  const tableData = {
    fontSize: ".700rem",
    textAlign: "center",
    padding: "3px",
    backgroundColor: "white",
  };

  const compareBtn = {
    backgroundColor: "#253aa3",
    fontSize: ".700rem",
    color: "white",
    padding: "3px",
    borderRadius: "6px",
    textAlign: "center",
    maxWidth: "80px",
    minWidth: "80px",
  };

  const openFileInBrowser = (data, fileName) => {
    if (data.length < 250) {
      props.getAttach(data);
    } else {
      var objbuilder = "";
      objbuilder +=
        '<object width="100%" height="100%" data = "data:application/pdf;base64,';
      objbuilder += data;
      objbuilder += '" type="application/pdf" class="internal">';
      objbuilder += '<embed src="data:application/pdf;base64,';
      objbuilder += data;
      objbuilder += '" type="application/pdf"  />';
      objbuilder += "</object>";
      var windo = window.open("#", "_blank");
      windo.document.write(
        "<html><title>" +
        fileName +
        '</title><body style="margin-top: 0px; margin - left: 0px; margin - right: 0px; margin - bottom: 0px; ">'
      );
      windo.document.write(objbuilder);
      windo.document.write("</body></html>");
    }
  };

  const getResume = (studentId, resumeId) => {
    dispatch(
      actionGetCampusDriveStudentResumeRequest({
        apiPayloadRequest: {
          studentId: studentId,
          resumeId: resumeId,
        },
        callback: (response) => {
          if (response?.resumeFile !== "") {
            console.log(response?.resumeFile);
            openFileInBrowser(
              response?.resumeFile,
              `${studentId}${resumeId}.pdf`
            );
          }
        },
      })
    );
  };

  const [acceptedStudentIds, setAcceptedStudentIds] = useState([]);
  const [rejectedStudentIds, setRejectedStudentIds] = useState([]);

  const [saveConfirmation, setSaveConfirmation] = useState(false);

  const onAcceptAndRejectChange = (studentId, isAccepted) => {
    if (isAccepted) {
      setRejectedStudentIds(
        rejectedStudentIds?.length
          ? rejectedStudentIds.filter((id) => id !== studentId)
          : []
      );
      if (acceptedStudentIds.includes(studentId)) {
        setAcceptedStudentIds(
          acceptedStudentIds?.length
            ? acceptedStudentIds.filter((id) => id !== studentId)
            : []
        );
      } else {
        setAcceptedStudentIds([...acceptedStudentIds, studentId]);
      }
    } else {
      setAcceptedStudentIds(
        acceptedStudentIds?.length
          ? acceptedStudentIds.filter((id) => id !== studentId)
          : []
      );
      if (rejectedStudentIds.includes(studentId)) {
        setRejectedStudentIds(
          rejectedStudentIds?.length
            ? rejectedStudentIds.filter((id) => id !== studentId)
            : []
        );
      } else {
        setRejectedStudentIds([...rejectedStudentIds, studentId]);
      }
    }
  };

  const isValid = () => {
    if (acceptedStudentIds.length || rejectedStudentIds.length) {
      if (acceptedStudentIds.length) {
        if (saveConfirmation) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const submitExceptionList = () => {
    dispatch(
      actionPutCampusDriveExceptionStudentListRequest({
        apiPayloadRequest: {
          cdID: props?.campusDriveId,
          jobID: props?.jobItem?.jobID,
          selectedApplicantIDs: acceptedStudentIds,
          rejectedApplicantIDs: rejectedStudentIds,
        },
        callback: (response) => {
          if (props?.onSuccess) {
            props.onSuccess();
          }
        },
      })
    );
  };

  return (
    <div className="bgWhite">
      <p className="text-center text-primary p-2" style={{ fontSize: "14px" }}>
        List of Students Applied
      </p>

      {enableCompareModal ? (
        <>
          <CompareCriteriaCmp
            studentID={selectedStudentID}
            campusDriveId={props?.campusDriveId}
            hcId={props?.jobItem?.hiringCriteriaID}
            jobId={props?.jobItem?.jobID}
            openClose={toggleEnableCompareModal}
          />
        </>
      ) : (
        <div
          className="CD-define-jobs-list"
          style={{ height: "400px", overflowY: "scroll", overflowX: "hidden" }}
        >
          <div className="row">
            <Tabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor={"primary"}
              style={{ backgroundColor: "white", width: "100%" }}
            >
              <Tab
                label="Applicant List"
                disableRipple
                style={{ outline: "none", textTransform: "capitalize" }}
              />
              {props.universityId !== "OffCampus" ? (
                <Tab
                  label="Exception Approval Pending list"
                  disableRipple
                  style={{ outline: "none", textTransform: "capitalize" }}
                />
              ) : (
                <></>
              )}
            </Tabs>
          </div>
          <div
            style={{
              border: "1px solid #cacaca",
              borderRadius: "3px",
              fontSize: "12px",
              padding: "6px",
              maxWidth: "250px",
              marginBottom: "12px",
              marginTop: "12px",
            }}
          >
            {props?.jobItem?.jobName}
          </div>
          {tabValue === 0 ? (
            <React.Fragment>
              <table className={"table table-bordered"}>
                <thead>
                  <tr>
                    <th style={tableHeader}>Student Name</th>
                    <th style={tableHeader}>College Roll No</th>
                    <th style={tableHeader}>Email ID</th>
                    <th style={tableHeader}>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {props?.studentsList?.applicantList.length > 0 &&
                    props?.studentsList.applicantList.map((student) => (
                      <tr style={{ fontSize: "12px" }}>
                        <td style={tableData}>{student?.name}</td>
                        <td style={tableData}>{student?.collegeRollNo}</td>
                        <td style={tableData}>{student?.email}</td>
                        {/* <td style={tableData}>{student?.resumeID}</td> */}
                        <td
                          style={{ ...tableData, cursor: "pointer" }}
                          onClick={() => {
                            getResume(student?.applicantID, student?.resumeID);
                          }}
                        >
                          {`${student?.resumeName}`}{" "}
                          <i className={"fa fa-paperclip"}></i>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <table className={"table table-bordered"}>
                <thead>
                  <tr>
                    <th
                      style={{
                        ...tableHeader,
                        backgroundColor: "white",
                        border: "1px solid white",
                        borderRight: "0.5px solid #cacaca",
                      }}
                    ></th>
                    <th style={tableHeader}>Accept</th>
                    <th style={tableHeader}>Reject</th>
                    <th style={tableHeader}>Student Name</th>
                    <th style={tableHeader}>College Roll No</th>
                    <th style={tableHeader}>Email ID</th>
                    <th style={tableHeader}>Resume</th>
                    <th
                      style={{
                        ...tableHeader,
                        backgroundColor: "white",
                        border: "1px solid white",
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {props?.studentsList?.exceptionList.length > 0 &&
                    props?.studentsList.exceptionList
                      .filter((stud) => stud.rejectionFlag === false)
                      .map((student) => (
                        <tr style={{ fontSize: "12px" }}>
                          <td
                            style={{
                              ...tableData,
                              border: "1px solid white",
                              borderRight: "0.5px solid #cacaca",
                              color: "orange ",
                            }}
                          >
                            {student?.selectedBy ? (
                              <i className={"far fa-star"}></i>
                            ) : undefined}
                          </td>
                          <td style={tableData}>
                            <Checkbox
                              size={"small"}
                              color={"primary"}
                              checked={acceptedStudentIds.some(
                                (id) => id === student?.applicantID
                              )}
                              onChange={(e) => {
                                onAcceptAndRejectChange(
                                  student?.applicantID,
                                  true
                                );
                              }}
                            />
                          </td>
                          <td style={tableData}>
                            <Checkbox
                              size={"small"}
                              color={"primary"}
                              checked={rejectedStudentIds.some(
                                (id) => id === student?.applicantID
                              )}
                              onChange={(e) => {
                                onAcceptAndRejectChange(
                                  student?.applicantID,
                                  false
                                );
                              }}
                            />
                          </td>
                          <td style={tableData}>{student?.name}</td>
                          <td style={tableData}>{student?.collegeRollNo}</td>
                          <td style={tableData}>{student?.email}</td>
                          {/* <td style={tableData}>{student?.resumeID}</td> */}
                          <td
                            style={{ ...tableData, cursor: "pointer" }}
                            onClick={() => {
                              getResume(
                                student?.applicantID,
                                student?.resumeID
                              );
                            }}
                          >
                            {`${student?.resumeName}`}{" "}
                            <i className={"fa fa-paperclip"}></i>
                          </td>
                          <td
                            style={{ ...tableData, border: "1px solid white" }}
                          >
                            <button
                              type={"button"}
                              className={"btn btn-primary"}
                              onClick={() => {
                                onViewDetails(student?.applicantID);
                              }}
                              style={{
                                width: "80px",
                                height: "26px",
                                fontSize: ".700rem",
                              }}
                            >
                              Compare
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              <p
                style={{
                  fontSize: ".700rem",
                  marginTop: "-8px",
                  marginLeft: "10px",
                }}
                className={"d-flex align-items-center"}
              >
                <i
                  className={"far fa-star"}
                  style={{ color: "orange", marginRight: "12px" }}
                ></i>{" "}
                <b>
                  Star marked students are recommended by University/College
                </b>
              </p>
              <label
                style={{ fontSize: ".700rem" }}
                className={"d-flex align-items-center"}
              >
                <Checkbox
                  size={"small"}
                  color={"primary"}
                  checked={saveConfirmation}
                  onChange={(e) => {
                    setSaveConfirmation(!saveConfirmation);
                  }}
                />{" "}
                The seleted students will bet sent to the final application list
              </label>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={props?.onClose}
                  style={{ width: "120px" }}
                  className="btn ml-4"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!isValid()}
                  onClick={submitExceptionList}
                  style={{ marginLeft:"15px", width: "120px" }}
                  className="btn ml-4"
                >
                  Save
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      )}
      {toastModal && (
        // <CustomToastModal
        //   onClose={() => {
        //     setToastModal(false);
        //   }}
        //   show={toastModal ? true : false}
        //   iconNameClass={"fa-briefcase"}
        //   message={
        //     toastModal
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
            }} />
            <h3>{
              toastModal
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

export default StudentsListSection;
