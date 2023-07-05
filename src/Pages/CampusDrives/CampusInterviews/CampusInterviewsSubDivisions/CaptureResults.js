import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux"; 
import * as XLSX from "xlsx";
import { actionPostStudentsListForRoundSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CampusInterviewSagaAction";
import { actionGetCampusDriveStudentResumeRequest } from "../../../../Store/Actions/SagaActions/CampusDriveSagaActions";

const CaptureResults = (props) => {
  console.log(props.studentsListForRound.studentsList, "Std");

  const [studentData, setStudentData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState(0);
  const [columns, setColumns] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const hiddenFileInput = React.useRef(null);

  const dispatch = useDispatch();

  function getFormattedDate(date) {
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var d = new Date(date);

    return d.getDate() + "-" + month[d.getMonth()] + "-" + d.getFullYear();
  }

  const initialStudentResults = {
    cdID: props.captureResultsModel.campusDriveId,
    totalInterviewRounds: props.captureResultsModel.totalRounds,
    interviewRoundID: props.captureResultsModel.roundNumber,
    jobID: props.captureResultsModel.jobId,
    selectedApplicantIDs: [],
    rejectedApplicantIDs: [],
  };

  const [captureResults, setCaptureResults] = useState(initialStudentResults);

  const onChange = (event) => {
    var currentSelectedList = captureResults.selectedApplicantIDs;
    console.log(currentSelectedList, "capturedList");
    if (event.target.checked) {
      if (!currentSelectedList.includes(event.target.name)) {
        currentSelectedList.push(event.target.name);
      }
    } else {
      const index = currentSelectedList.indexOf(event.target.name);
      if (index > -1) {
        currentSelectedList.splice(index, 1);
      }
    }

    setCaptureResults((prevOtherInfo) => ({
      ...prevOtherInfo,
      selectedApplicantIDs: currentSelectedList,
    }));
  };

  const onSubmit = () => {
    console.log(captureResults, "SAVE");
    dispatch(
      actionPostStudentsListForRoundSaga({
        apiPayloadRequest: captureResults,
        callback: onSucess,
      })
    );
  };

  const onSucess = () => {
    props.onSucess();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));

    setStudentData(list);
    setColumns(columns);
    validateColumns(columns);
    validateRows(list);
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

  const validateColumns = (columns) => {
    const requiredFields = ["applicantID", "name", "collegeRollNo", "email"];
    const optionalFiels = [
      "resumeName",
      "resumeID",
      "selected",
      "selectedBy",
      "offerLetterShared",
      "designation",
      "location",
      "joiningDate",
      "remarks",
      "offerLetterID",
      "offerLetterFileName",
    ];

    //Validating if required fields exist
    let mandatoryColumnsExist = false;
    for (let i = 0; i < 4; i++) {
      let mandatoryColumn = requiredFields[i];
      for (let j = 0; j < columns.length; j++) {
        let column = columns[j].name;
        if (column === mandatoryColumn) break;
        if (j === columns.length - 1) {
          setErrorMessage(`Mandatory column '${mandatoryColumn}' missing!`);
          setShowAlert(true);
          break;
        }
      }
    }
  };

  const validateRows = (rows) => {
    const length = rows.length;
    let selectedStudentIds = [],
      rejectedStudentIds = [];
    for (let i = 0; i < length; i++) {
      let student = rows[i];
      if (student.selected === "TRUE") {
        selectedStudentIds.push(student.applicantID);
      } else rejectedStudentIds.push(student.applicantID);
      if (i === length - 1) {
        console.log(i, length - 1, "Captureddddd");
        setCaptureResults((prevOtherInfo) => ({
          ...prevOtherInfo,
          selectedApplicantIDs: selectedStudentIds,
          rejectedApplicantIDs: rejectedStudentIds,
        }));
      }
    }

    const requiredFields = ["applicantID", "name", "collegeRollNo", "email"];
    for (let i = 0; i < length; i++) {
      const row = rows[i];
      for (let j = 0; j < 4; j++) {
        let column = requiredFields[j];
        let valueAtColumn = row[column];
        if (valueAtColumn === "") {
          setErrorMessage(
            `Missing data for column '${column}' for candidate ${row["applicantID"]}`
          );
          setShowAlert(true);
          break;
        }
      }
    }
  };

  return (
    <div className="bgWhite ">
      <div className="bgWhite h-full">
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
            Capture Round Wise Results
          </p>
        </div>
        <br />
        <div
          className="d-flex flex-row justify-content-around align-items-center job-details-form w-full"
          style={{ background: "white" }}
        >
          <TextField
            label="Job Name"
            variant="outlined"
            type="text"
            value={props.captureResultsModel.jobName}
            InputLabelProps={{
              shrink: true,
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            inputProps={{
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            margin="dense"
            style={{ width: "45%" }}
          />
          <TextField
            label="Round Name"
            variant="outlined"
            type="text"
            value={props.captureResultsModel.roundName}
            InputLabelProps={{
              shrink: true,
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            inputProps={{
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            margin="dense"
            style={{ width: "45%" }}
          />
        </div>
        <br />
        <div
          className="d-flex flex-row justify-content-around align-items-center job-details-form w-full"
          style={{ background: "white" }}
        >
          <TextField
            label="From Date"
            type="text"
            // name="startDate"
            // onChange={props.handleChange}
            InputLabelProps={{
              shrink: true,
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            inputProps={{
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            variant="outlined"
            margin="dense"
            style={{ width: "45%" }}
            value={getFormattedDate(props.captureResultsModel.startDate)}
          />
          <TextField
            label="To Date"
            type="text"
            name="endDate"
            // onChange={props.handleChange}
            InputLabelProps={{
              shrink: true,
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            inputProps={{
              // min: props.addProgram.startDate,
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            //disabled={props.addProgram.startDate.length > 0 ? false : true}
            variant="outlined"
            margin="dense"
            style={{ width: "45%" }}
            value={getFormattedDate(props.captureResultsModel.endDate)}
          />
          {/* <TextField
                        label="ShortListed Students"
                        type="number"
                        name="rank"
                        // onChange={props.handleChange}
                        className="form-control"
                        InputLabelProps={{
                            shrink: true,
                            style: { fontFamily: "Poppins-Regular", display: "block" }
                        }}
                        inputProps={{
                            style: { fontFamily: "Poppins-Regular", display: "block" }
                        }}
                        variant="outlined"
                        margin="dense"
                        style={{ maxWidth: "30%" }}
                        value={props.studentsListForRound.noOfStudentsSelected} //{props.addRanking.rank}
                    // helperText={props.rankNumberErr}
                    // error={props.rankNumberErr ? true : false}
                    /> */}
        </div>
        <br />
        <div>
          <TextField
            label="Search Student"
            variant="outlined"
            type="text"
            name="search"
            onChange={props?.searchName}
            value={props?.searchItems}
            InputLabelProps={{
              shrink: true,
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            inputProps={{
              style: { fontFamily: "Poppins-Regular", display: "block" },
            }}
            margin="dense"
            style={{ width: "45%" }}
          />
        </div>
        <div
          style={{
            borderTop: "1px solid black",
            width: "100%",
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <br />

        <button
          className="btn mr-2"
          style={{ marginLeft: "75%" }}
          type="button"
          onClick={() => {
            hiddenFileInput.current.click();
          }}
        >
          + Import Students
        </button>
        <input
          type="file"
          accept=".csv"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <div
          style={{
            height: "230px",
            overflowY: "scroll",
            overflowX: "hidden",
            margin: "0",
            padding: "0",
          }}
        >
          <table class="table table-striped table-bordered">
            <thead style={{ backgroundColor: "#01253cf5", color: "white" }}>
              <tr>
                <th scope="col">Select/Deselect</th>
                <th scope="col">Student Name</th>
                {/* <th scope="col">College Roll No.</th> */}
                <th scope="col">Email ID</th>
                <th scope="col">Resume</th>
              </tr>
            </thead>
            <tbody>
              {props?.studentsListForRound?.studentsList &&
              props?.studentsListForRound?.studentsList?.length > 0 ? (
                props?.searchItems && props?.searchItems?.length ? (
                  <>
                    {props?.studentsListForRound.studentsList
                      .filter(
                        (item) =>
                          item.name
                            .toLowerCase()
                            .includes(props.searchItems.toLowerCase()) ||
                          item.email
                            .toLowerCase()
                            .includes(props.searchItems.toLowerCase()) ||
                          item.collegeRollNo
                            .toLowerCase()
                            .includes(props.searchItems.toLowerCase())
                      )
                      .map((studentInfo, i) => (
                        <tr key={i}>
                          <th scope="row">
                            {!studentInfo?.selected ? (
                              <input
                                type="checkbox"
                                name={studentInfo.applicantID}
                                onChange={onChange}
                              />
                            ) : undefined}
                          </th>
                          <td>{studentInfo.name}</td>
                          {/* <td>{studentInfo.collegeRollNo}</td> */}
                          <td>{studentInfo.email}</td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              getResume(
                                studentInfo?.applicantID,
                                studentInfo?.resumeID
                              );
                            }}
                          >
                            {studentInfo?.resumeName}{" "}
                            <i className={"fa fa-paperclip"}></i>
                          </td>
                        </tr>
                      ))}
                  </>
                ) : (
                  <>
                    {props?.studentsListForRound.studentsList.map(
                      (studentInfo, i) => (
                        <tr key={i}>
                          <th scope="row">
                            {!studentInfo?.selected ? (
                              <input
                                type="checkbox"
                                name={studentInfo.applicantID}
                                onChange={onChange}
                              />
                            ) : undefined}
                          </th>
                          <td>{studentInfo.name}</td>
                          {/* <td>{studentInfo.collegeRollNo}</td> */}
                          <td>{studentInfo.email}</td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              getResume(
                                studentInfo?.applicantID,
                                studentInfo?.resumeID
                              );
                            }}
                          >
                            {studentInfo?.resumeName}{" "}
                            <i className={"fa fa-paperclip"}></i>
                          </td>
                        </tr>
                      )
                    )}
                  </>
                )
              ) : (
                <></>
              )}
              {studentData.length > 0 ? (
                <>
                  {studentData.map((student) => (
                    <tr>
                      <th scope="row">
                        <input
                          type="checkbox"
                          checked={student.selected === "TRUE" ? true : false}
                          name={student.applicantID}
                          onChange={onChange}
                        />
                      </th>
                      <td>{student.name}</td>
                      <td>{student.collegeRollNo}</td>
                      <td>{student.email}</td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          getResume(student?.applicantID, student?.resumeID);
                        }}
                      >
                        {student?.resumeName}{" "}
                        <i className={"fa fa-paperclip"}></i>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
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
        <div
          className="d-flex flex-row justify-content-around align-items-center job-details-form w-full"
          style={{ background: "white" }}
        >
          <button
            type="button"
            className="btn mr-4"
            onClick={() => {
              props.onCancel();
            }}
          >
            <p>Cancel</p>
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              onSubmit();
            }}
          >
            <p>Save</p>
          </button>
        </div>
        <br />
        <br />
        {/* {props?.captureResultsModel?.isShared ? <p style={{fontSize: '.700rem', color: 'red', textAlign: 'center'}}>You already shared results of this round</p> : undefined} */}
      </div>
    </div>
  );
};

export default CaptureResults;
