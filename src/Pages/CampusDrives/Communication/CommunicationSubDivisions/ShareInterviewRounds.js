import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { AddRounded } from "@material-ui/icons";
import moment from "moment";
import { actionGetCampusDriveDefineJobsListRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";
import { actionGetInterviewRoundsRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CampusInterviewSagaAction";
import { actionGetCampusDriveEmailTemplatesListRequestSaga, actionShareInterviewRoundsSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CommunicationSagaAction";

const ShareInterviewRounds = (props) => {
  const dispatch = useDispatch();
  const [jobsList, setJobsList] = useState([]);
  const [selectedJobID, setSelectedJobID] = useState("");
  const [selectedJobName, setSelectedJobName] = useState("");
  const [enableSubmitButton, setEnableSubmitButton] = useState(false);
  const [enableSuccessModal, setEnableSuccessModal] = useState(false);
  const profileInfo = useSelector(
    (state) => state.DashboardReducer.profileInfo
  );
  const [selectedEmailTemplateName, setSelectedEmailTemplateName] =
    useState("");
  const [fileSizeErr, setFileSizeErr] = useState("");

  const initialData = {
    cdID: props.campusDriveId,
    jobID: props.jobId,
    roundAttachFile: "",
    roundAttachFileName: "",
    emailTemplateID: "",
    roundsInfo: [],
  };

  const [addRounds, setAddRounds] = useState({});
  const [shareRoundsModel, setShareRoundsModel] = useState(initialData);
  const [emailTemplateErr, setEmailTemplateErr] = useState("");
  const [allEmailTemplates, setAllEmailTemplates] = useState({});

  const getAllEmailTemplates = (data) => {
    setAddRounds((prevOtherInfo) => ({
      ...prevOtherInfo,
      stakeholderID: profileInfo.stakeholderID,
    }));
    setAllEmailTemplates(data);
  };

  function getFile(file) {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new Error("Error parsing file"));
      };
      reader.onload = function () {
        //This will result in an array that will be recognized by C#.NET WebApi as a byte[]
        let bytes = Array.from(new Uint8Array(this.result));

        //if you want the base64encoded file you would use the below line:
        let base64StringFile = btoa(
          bytes.map((item) => String.fromCharCode(item)).join("")
        );

        //Resolve the promise with your custom file structure
        resolve({
          base64StringFile: base64StringFile,
        });
      };
      reader.readAsArrayBuffer(file);
    });
  }

  const getEmailTemplateAvailable = () => {
    const model = {
      campusDriveID: props.campusDriveId,
    };
    dispatch(
      actionGetCampusDriveEmailTemplatesListRequestSaga({
        apiPayloadRequest: model,
        callback: getAllEmailTemplates,
      })
    );
  };

  function getEmailTemplateName(templateId) {
    if (allEmailTemplates.length > 0) {
      allEmailTemplates.map((email) => {
        if (templateId == email.emailTemplateID) {
          return email.emailTemplateName;
        }
      });
    }
  }

  const onChange = (event) => {
    let { name, checked, value } = event.target;
    if (name.includes("1")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round1",
          roundStartDate: addRounds.round1StartDate,
          roundEndDate: addRounds.round1StartDate,
          roundType: addRounds.round1Type,
          interviewRoundID: 1,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 1) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name.includes("2")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round2",
          roundStartDate: addRounds.round2StartDate,
          roundEndDate: addRounds.round2StartDate,
          roundType: addRounds.round2Type,
          interviewRoundID: 2,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 2) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name.includes("3")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round3",
          roundStartDate: addRounds.round3StartDate,
          roundEndDate: addRounds.round3StartDate,
          roundType: addRounds.round3Type,
          interviewRoundID: 3,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 3) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name.includes("4")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round4",
          roundStartDate: addRounds.round4StartDate,
          roundEndDate: addRounds.round4StartDate,
          roundType: addRounds.round4Type,
          interviewRoundID: 4,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 4) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name.includes("5")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round5",
          roundStartDate: addRounds.round5StartDate,
          roundEndDate: addRounds.round5StartDate,
          roundType: addRounds.round5Type,
          interviewRoundID: 5,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 5) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name.includes("6")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round6",
          roundStartDate: addRounds.round6StartDate,
          roundEndDate: addRounds.round6StartDate,
          roundType: addRounds.round6Type,
          interviewRoundID: 6,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 6) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name.includes("7")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round7",
          roundStartDate: addRounds.round7StartDate,
          roundEndDate: addRounds.round7StartDate,
          roundType: addRounds.round7Type,
          interviewRoundID: 7,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 7) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name.includes("8")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round8",
          roundStartDate: addRounds.round8StartDate,
          roundEndDate: addRounds.round8StartDate,
          roundType: addRounds.round8Type,
          interviewRoundID: 8,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 8) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name.includes("9")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round9",
          roundStartDate: addRounds.round9StartDate,
          roundEndDate: addRounds.round9StartDate,
          roundType: addRounds.round9Type,
          interviewRoundID: 9,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 9) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name.includes("10")) {
      let currentRoundsInfo = shareRoundsModel.roundsInfo;

      if (checked) {
        let currentRound = {
          roundName: "Round10",
          roundStartDate: addRounds.round10StartDate,
          roundEndDate: addRounds.round10StartDate,
          roundType: addRounds.round10Type,
          interviewRoundID: 10,
        };
        currentRoundsInfo.push(currentRound);
      } else {
        let i;
        for (i = 0; i < currentRoundsInfo.length; i++) {
          if (currentRoundsInfo[i].interviewRoundID == 10) {
            currentRoundsInfo.splice(i, 1);
            break;
          }
        }
      }
      setShareRoundsModel((prevOtherInfo) => ({
        ...prevOtherInfo,
        ["roundsInfo"]: currentRoundsInfo,
      }));
    } else if (name === "roundAttachFile") {
      if (event.target.files) {
        const maxAllowedSize = 5 * 1024 * 1024;
        if (event.target.files[0].size > maxAllowedSize) {
          setFileSizeErr("Maximum file size limit is 5 MB");
        } else {
          setFileSizeErr("");
          setShareRoundsModel((preState) => ({
            ...preState,
            roundAttachFileName: event.target.files[0].name,
          }));
          getFile(event.target.files[0]).then((customJsonFile) => {
            setShareRoundsModel((preState) => ({
              ...preState,
              [name]: customJsonFile.base64StringFile,
            }));
          });
        }
      }
    } else if (name === "emailTemplateID") {
      allEmailTemplates.map((email) => {
        if (value == email.emailTemplateID) {
          setSelectedEmailTemplateName(email.emailTemplateName);
          setShareRoundsModel((prevOtherInfo) => ({
            ...prevOtherInfo,
            [name]: value,
          }));
        }
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const model = {
      ...shareRoundsModel,
    };
    dispatch(
      actionShareInterviewRoundsSaga({
        apiPayloadRequest: model,
        callback: onSuccess,
      })
    );
    // onSuccess();
  };

  const onJobChange = (event) => {
    const { name, value } = event.target;
    setSelectedJobID(value);
    setShareRoundsModel((prevOtherInfo) => ({
      ...prevOtherInfo,
      ["jobID"]: value,
    }));

    jobsList.map((item) => {
      if (item.jobID === value) {
        setSelectedJobName(item.jobName);
      }
    });
    getinteviewRoundsInformation(value);
  };

  // function getFormattedDate(date) {
  //     var d = new Date(date);
  //     var monthPrefix = "";
  //     var datePrefix = "";
  //     if (d.getMonth() <= 9) {
  //         monthPrefix = "0"
  //     }
  //     if (d.getDate() <= 9) {
  //         datePrefix = "0"
  //     }
  //     return d.getFullYear() + '-' + monthPrefix + d.getMonth() + '-' + datePrefix + d.getDate();
  // }

  const getinteviewRoundsInformation = (jobID) => {
    const inputModel = {
      campusDriveID: props?.campusDriveId,
      jobID: jobID,
    };
    dispatch(
      actionGetInterviewRoundsRequestSaga({
        apiPayloadRequest: inputModel,
        callback: getRoundsInformation,
      })
    );
  };

  const getRoundsInformation = (data) => {
    console.log(data, data.round3StartDate, "ROUNDS");
    setAddRounds(data);
  };

  const onSuccess = () => {
    toggleSuccessModal();
    getinteviewRoundsInformation(addRounds.jobID);
  };

  const getJobData = (data) => {
    setJobsList(data.filter((x) => x.status === "open"));
  };

  const toggleSuccessModal = () => {
    setEnableSuccessModal(!enableSuccessModal);
  };

  useEffect(() => {
    getEmailTemplateAvailable();
    dispatch(
      actionGetCampusDriveDefineJobsListRequestSaga({
        campusDriveId: props?.campusDriveId,
        callback: getJobData,
      })
    );
  }, []);

  const isSharable = () => {
    return [
      "round1",
      "round2",
      "round3",
      "round4",
      "round5",
      "round6",
      "round7",
      "round8",
      "round9",
      "round10",
    ].some(
      (item) =>
        addRounds[item + "SharedFlag"] === false && addRounds[item].length > 0
    );
  };

  return (
    <>
      <div className="bgWhite">
        <div className="d-flex flex-column justify-content-start align-items-center w-full">
          <p
            className="heading"
            style={{
              color: "#253AA3",
              fontWeight: "bold",
              fontFamily: "Poppins-Regular",
              display: "block",
            }}
          >
            Share Interview Round Details
          </p>
        </div>
        <br />
        <div
          className="d-flex flex-row justify-content-around align-items-center job-details-form w-full"
          style={{ background: "white" }}
        >
          <TextField
            select
            label="Job Name"
            variant="outlined"
            style={{ width: "80%" }}
            InputLabelProps={{
              shrink: true,
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            inputProps={{
              name: "programType",
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            SelectProps={{
              native: true,
            }}
            required={true}
            onChange={onJobChange}
          >
            <option value={"DEFAULT"}>Select a Job</option>
            {jobsList?.length &&
              jobsList.map((item) => {
                return (
                  <option value={item.jobID} key={item.jobID}>
                    {item.jobName}
                  </option>
                );
              })}
          </TextField>
        </div>
        <br />
        <div
          style={{
            borderTop: "1px solid black",
            width: "100%",
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <br />
        <form
          onSubmit={onSubmit}
          style={{ height: "280px", overflowY: "scroll", overflowX: "hidden" }}
        >
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: "#01253cf5", color: "white" }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Round</th>
                <th scope="col">From Date</th>
                <th scope="col">To Date</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ display: addRounds.noOfRounds > 0 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round1SharedFlag === false ? (
                    <input type="checkbox" name="round1" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 1</td>
                <td>
                  {moment(addRounds.round1StartDate).format("YYYY-MM-DD")}
                </td>
                <td> {moment(addRounds.round1EndDate).format("YYYY-MM-DD")}</td>
                <td>{addRounds.round1Type}</td>
              </tr>
              <tr style={{ display: addRounds.noOfRounds > 1 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round2SharedFlag === false ? (
                    <input type="checkbox" name="round2" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 2</td>
                <td>
                  {moment(addRounds.round2StartDate).format("YYYY-MM-DD")}
                </td>
                <td> {moment(addRounds.round2EndDate).format("YYYY-MM-DD")}</td>
                <td>{addRounds.round2Type}</td>
              </tr>

              <tr style={{ display: addRounds.noOfRounds > 2 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round3SharedFlag === false ? (
                    <input type="checkbox" name="round3" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 3</td>
                <td>
                  {moment(addRounds.round3StartDate).format("YYYY-MM-DD")}
                </td>
                <td> {moment(addRounds.round3EndDate).format("YYYY-MM-DD")}</td>
                <td>{addRounds.round3Type}</td>
              </tr>

              <tr style={{ display: addRounds.noOfRounds > 3 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round4SharedFlag === false ? (
                    <input type="checkbox" name="round4" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 4</td>
                <td>
                  {moment(addRounds.round4StartDate).format("YYYY-MM-DD")}
                </td>
                <td> {moment(addRounds.round4EndDate).format("YYYY-MM-DD")}</td>
                <td>{addRounds.round4Type}</td>
              </tr>

              <tr style={{ display: addRounds.noOfRounds > 4 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round5SharedFlag === false ? (
                    <input type="checkbox" name="round5" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 5</td>
                <td>
                  {moment(addRounds.round5StartDate).format("YYYY-MM-DD")}
                </td>
                <td> {moment(addRounds.round5EndDate).format("YYYY-MM-DD")}</td>
                <td>{addRounds.round5Type}</td>
              </tr>

              <tr style={{ display: addRounds.noOfRounds > 5 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round6SharedFlag === false ? (
                    <input type="checkbox" name="round6" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 6</td>
                <td>
                  {moment(addRounds.round6StartDate).format("YYYY-MM-DD")}
                </td>
                <td> {moment(addRounds.round6EndDate).format("YYYY-MM-DD")}</td>
                <td>{addRounds.round6Type}</td>
              </tr>
              <tr style={{ display: addRounds.noOfRounds > 6 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round7SharedFlag === false ? (
                    <input type="checkbox" name="round7" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 7</td>
                <td>
                  {moment(addRounds.round7StartDate).format("YYYY-MM-DD")}
                </td>
                <td> {moment(addRounds.round7EndDate).format("YYYY-MM-DD")}</td>
                <td>{addRounds.round7Type}</td>
              </tr>
              <tr style={{ display: addRounds.noOfRounds > 7 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round8SharedFlag === false ? (
                    <input type="checkbox" name="round8" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 8</td>
                <td>
                  {moment(addRounds.round8StartDate).format("YYYY-MM-DD")}
                </td>
                <td> {moment(addRounds.round8EndDate).format("YYYY-MM-DD")}</td>
                <td>{addRounds.round8Type}</td>
              </tr>
              <tr style={{ display: addRounds.noOfRounds > 8 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round9SharedFlag === false ? (
                    <input type="checkbox" name="round9" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 9</td>
                <td>
                  {moment(addRounds.round9StartDate).format("YYYY-MM-DD")}
                </td>
                <td> {moment(addRounds.round9EndDate).format("YYYY-MM-DD")}</td>
                <td>{addRounds.round9Type}</td>
              </tr>
              <tr style={{ display: addRounds.noOfRounds > 9 ? "" : "none" }}>
                <td scope="row">
                  {addRounds?.round10SharedFlag === false ? (
                    <input type="checkbox" name="round10" onChange={onChange} />
                  ) : undefined}
                </td>
                <td>Round 10</td>
                <td>
                  {moment(addRounds.round10StartDate).format("YYYY-MM-DD")}
                </td>
                <td>
                  {" "}
                  {moment(addRounds.round10EndDate).format("YYYY-MM-DD")}
                </td>
                <td>{addRounds.round10Type}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <div
            style={{
              borderTop: "1px solid black",
              width: "100%",
              marginLeft: 20,
              marginRight: 20,
            }}
          ></div>
          <br />
          <div
            className="d-flex flex-row justify-content-around align-items-center job-details-form w-full"
            style={{ background: "white" }}
          >
            <div className="d-attach" style={{ maxWidth: "95%" }}>
              <p
                className="float-left"
                style={{
                  fontSize: "18px",
                  fontFamily: "Poppins-Regular",
                  display: "block",
                }}
              >
                {shareRoundsModel.roundAttachFileName}
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "40px",
                  fontSize: "18px",
                  fontFamily: "Poppins-Regular",
                  display: "block",
                  color: "red",
                }}
              >
                {fileSizeErr}
              </p>
              <input
                type="file"
                className="d-inp"
                accept=".pdf"
                name="roundAttachFile"
                id="roundAttachFile"
                onChange={onChange}
                disabled={!isSharable()}
              />
              <label htmlFor="roundAttachFile" className="d-label">
                <i className="fas fa-paperclip mr-2"></i> Attach File *
              </label>
            </div>
          </div>

          {/* <div className="d-attach">
                  {props?.tempAttachment?.attachmentName ? (
                    <div
                      className={
                        "d-flex justify-content-between align-items-center"
                      }
                      style={{ width: "84%" }}
                    >
                      <p
                        className="float-left"
                        style={{
                          padding: "8px",
                          fontSize: ".800rem",
                          flex: "1",
                        }}
                      >
                        {props?.tempAttachment?.attachmentName}
                      </p>
                    </div>
                  ) : null}
                  <input
                    type="file"
                    onChange={props?.fileHandler}
                    className="d-inp d-none"
                    name="attachment"
                    accept=".pdf"
                    disabled={props?.disable ? true : false}
                    id="attachment"
                  />
                  <label
                    htmlFor="attachment"
                    className="d-label"
                    style={{ backgroundColor: "#253AA3" }}
                  >
                    {" "}
                    <i className="fas fa-paperclip mr-2"></i> Attachment
                  </label>
                  
                </div> */}

          <div
            className="d-flex flex-row justify-content-around align-items-center job-details-form w-full"
            style={{ background: "white" }}
          >
            <div className="d-attach" style={{ maxWidth: "95%" }}>
              <p
                style={{
                  paddingLeft: "150px",
                  fontSize: "18px",
                  fontFamily: "Poppins-Regular",
                  display: "block",
                }}
              >
                {selectedEmailTemplateName}
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "40px",
                  fontSize: "18px",
                  fontFamily: "Poppins-Regular",
                  display: "block",
                  color: "red",
                }}
              >
                {emailTemplateErr}
              </p>
              <label
                htmlFor="EmailTemplate"
                className="d-label"
                style={{ left: "-1px" ,marginRight:'7px' }}
              >
              Email Template *
              </label>
              <select
                name="emailTemplateID"
                class="d-inp"
                id="inputGroupSelect01"
                onChange={onChange}
                required={true}
                disabled={!isSharable()}
              >
                <option selected>Choose...</option>
                {allEmailTemplates?.length > 0 ? (
                  <>
                    {allEmailTemplates?.map((email) => (
                      <option
                        value={email.emailTemplateID}
                        // selected={inductionInfo.emailTemplateID === email.emailTemplateID ? true : false}
                      >
                        {email.emailTemplateName}
                      </option>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>
          <div
            className="d-flex flex-row justify-content-around align-items-center job-details-form w-full"
            style={{ background: "white" }}
          >
            <button type="submit" className="btn" style={{marginTop:'17px'}} disabled={!isSharable()}>
               Share
            </button>
          </div>
          <br />
        </form>
        <br />
      </div>
      {enableSuccessModal ? (
        <>
          <div>
            <Modal isOpen={enableSuccessModal} toggle={toggleSuccessModal}>
              <ModalBody style={{ textAlign: "center" }}>
                <CancelOutlinedIcon
                  className="cancelbtn"
                  onClick={toggleSuccessModal}
                />
                <div className="notification-icon d-flex flex-column justify-content-center align-items-center">
                  <div
                    style={{
                      color: "#253AA3",
                      background: "lightblue",
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  >
                    <i
                      className="fa fa-envelope fa-4x"
                      style={{ marginTop: "10px" }}
                    />
                  </div>
                </div>
                <p style={{ textAlign: "center" }} className="paragraph">
                  Job Interview Round Information{" "}
                </p>
                <p style={{ textAlign: "center" }} className="paragraph2">
                  shared successfully
                </p>
              </ModalBody>
            </Modal>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ShareInterviewRounds;
