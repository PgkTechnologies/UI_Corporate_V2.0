import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
 
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import PgkTextField from "../../../../Components/FormFields/PgkTextField";
import PgkMultiSelectField from "../../../../Components/FormFields/PgkMultiSelectField";
import { actionGetDependencyLookUpsSagaAction } from "../../../../Store/Actions/SagaActions/CommonSagaActions";
import { GetStudentGapsSagaAction, GetStudentProfileAndHiringInfoSagaAction } from "../../../../Store/Actions/SagaActions/CampusDriveSagaActions";

const CompareCriteriaCmp = (props) => {
  const [applicationForm, setApplicationForm] = useState({});
  const [educationGaps, setEducationGaps] = useState();
  const [programNames, setProgramNames] = useState([]);
  const [branchNames, setBranchNames] = useState([]);

  const dispatch = useDispatch();

  const getEducationGaps = (data) => {
    setEducationGaps(data);
  };

  const onGetDependencyLookUpsResponse = (response) => {
    setBranchNames(
      response?.branchCatalog?.length ? response.branchCatalog : []
    );
    setProgramNames(
      response?.programCatalog?.length ? response.programCatalog : []
    );
  };

  useEffect(() => {
    dispatch(
      actionGetDependencyLookUpsSagaAction({
        apiPayloadRequest: ["programCatalog", "branchCatalog"],
        callback: onGetDependencyLookUpsResponse,
      })
    );
  }, []);

  const getEducationGapsInfo = () => {
    dispatch(
      GetStudentGapsSagaAction({
        apiPayloadRequest: { studentID: props?.studentID },
        callback: getEducationGaps,
      })
    );
  };

  const getHiringCriteriaStudentData = () => {
    dispatch(
      GetStudentProfileAndHiringInfoSagaAction({
        apiPayloadRequest: {
          studentID: props?.studentID,
          campusDriveId: props?.campusDriveId,
          hcId: props?.hcId,
          jobId: props?.jobId,
        },
        callback: (response) => {
          if (response) {
            console.log(response);
            setApplicationForm(response);
          }
        },
      })
    );
  };

  useEffect(() => {
    getHiringCriteriaStudentData();
    getEducationGapsInfo();
  }, []);

  const getHcBranchesOptions = () => {
    return branchNames.map((item) => ({
      value: item.branchID,
      label: item.branchName,
      programID: item.programID,
      programName: item.programName,
    }));
  };

  const getNameByType = (type) => {
    if (
      applicationForm?.hiringCriteria?.hcProgramsInString &&
      type === "BRANCH"
    ) {
      const hcBranches = JSON.parse(
        applicationForm?.hiringCriteria?.hcProgramsInString
      );

      return hcBranches.map((item) => {
        return {
          value: item.branchID,
          label: item.branchName,
          programID: item.programID,
          programName: item.programName,
        };
      });
    } else if (
      applicationForm?.hiringCriteria?.hcProgramsInString &&
      type === "PROGRAM"
    ) {
      return JSON.parse(applicationForm?.hiringCriteria?.hcProgramsInString)[0]
        ?.programName;
    }
  };

  const validateApplication = (criteria) => {
    console.log(criteria);
    if (criteria === "PROGRAM") {
      if (
        applicationForm?.studentAcademics?.filter(
          (x) => x.currentlyPursuingFlag
        )[0] !== undefined
      ) {
        if (
          applicationForm?.studentAcademics?.filter(
            (x) => x.currentlyPursuingFlag
          )[0].programName !== getNameByType("PROGRAM")
        ) {
          return "Mismatch";
        }
      } else {
        return "Mismatch";
      }
    } else if (criteria === "BRANCH") {
      if (applicationForm?.hiringCriteria?.hcProgramsInString) {
        if (
          applicationForm?.studentAcademics?.filter(
            (x) => x.currentlyPursuingFlag
          )[0] !== undefined
        ) {
          getNameByType("BRANCH").map((branch) => {
            if (
              branch.label ===
              applicationForm?.studentAcademics?.filter(
                (x) => x.currentlyPursuingFlag
              )[0].branchName
            ) {
              return "Mismatch";
            }
          });
        } else {
          return "Mismatch";
        }
      }
    } else if (criteria === "ACTIVE_BACKLOGS") {
      if (
        applicationForm?.studentAcademics?.filter(
          (x) => x.currentlyPursuingFlag
        )[0] !== undefined
      ) {
        if (
          applicationForm?.studentAcademics?.filter(
            (x) => x.currentlyPursuingFlag
          )[0].activeBacklogsNumber >
          applicationForm?.hiringCriteria?.numberOfAllowedBacklogs
        ) {
          return "Mismatch";
        }
      } else {
        return "Mismatch";
      }
    } else if (criteria === "TENTH_PERCENTAGE") {
      if (
        applicationForm?.studentAcademics?.filter(
          (x) => x.programType === "Tenth"
        )[0] !== undefined
      ) {
        if (
          applicationForm?.studentAcademics?.filter(
            (x) => x.programType === "Tenth"
          )[0].percentage >=
          applicationForm?.hiringCriteria?.minimumCutoffPercentage10th
        ) {
          return undefined;
        } else {
          return "Mismatch";
        }
      } else {
        return "Mismatch";
      }
    } else if (criteria === "TWELTH") {
      if (
        applicationForm?.studentAcademics?.filter(
          (x) => x.programType === "Twelth"
        )[0] !== undefined
      ) {
        if (
          applicationForm?.studentAcademics?.filter(
            (x) => x.programType === "Twelth"
          )[0].percentage >=
          applicationForm?.hiringCriteria?.minimumCutoffPercentage12th
        ) {
          return undefined;
        } else {
          return "Mismatch";
        }
      } else {
        return "Mismatch";
      }
    } else if (criteria === "GRADUATION") {
      if (
        applicationForm?.studentAcademics?.filter(
          (x) => x.programType === "UG"
        )[0] !== undefined
      ) {
        if (
          applicationForm?.studentAcademics?.filter(
            (x) => x.programType === "UG"
          )[0].percentage >=
          applicationForm?.hiringCriteria?.minimumCutoffPercentageGrad
        ) {
          return undefined;
        } else {
          return "Mismatch";
        }
      } else {
        return "Mismatch";
      }
    } else if (criteria === "YEAR_OF_PASSING") {
      if (
        applicationForm?.studentAcademics?.filter(
          (x) => x.currentlyPursuingFlag
        )[0] !== undefined
      ) {
        if (
          new Date(
            applicationForm?.studentAcademics?.filter(
              (x) => x.currentlyPursuingFlag
            )[0].monthYearOfPassing
          ).getFullYear() !== applicationForm?.hiringCriteria?.yearOfPassing
        ) {
          return "Mismatch";
        }
      }
    }
  };

  const validateGaps = (gap) => {
    if (
      gap === "SCHOOLING" &&
      applicationForm?.hiringCriteria?.eduGapsSchoolAllowed
    ) {
      if (
        educationGaps?.eduGapSchooling >
        parseInt(applicationForm?.hiringCriteria?.eduGapsSchool)
      ) {
        return "Mismatch";
      }
    } else if (
      gap === "TWELTH" &&
      applicationForm?.hiringCriteria?.eduGaps11N12Allowed
    ) {
      if (
        educationGaps?.eduGap11N12 >
        parseInt(applicationForm?.hiringCriteria?.eduGaps11N12)
      ) {
        return "Mismatch";
      }
    } else if (
      gap === "GRAD" &&
      applicationForm?.hiringCriteria?.eduGapsGradAllowed
    ) {
      if (
        educationGaps?.eduGapGrad >
        parseInt(applicationForm?.hiringCriteria?.eduGapsGrad)
      ) {
        return "Mismatch";
      }
    } else if (
      gap === "GRAD_AND_PG" &&
      applicationForm?.hiringCriteria?.eduGapsGradNPGAllowed
    ) {
      if (
        educationGaps?.eduGapsGradAndPg >
        parseInt(applicationForm?.hiringCriteria?.eduGapsGrad)
      ) {
        return "Mismatch";
      }
    }
  };

  const x = applicationForm?.studentAcademics?.filter(
    (x) => x.programType === "UG"
  )[0].percentage;
  console.log(x, "UGGGGGG");

  const educationalGapsAllowed = () => {
    if (
      applicationForm?.hiringCriteria?.eduGapsSchoolAllowed ||
      applicationForm?.hiringCriteria?.eduGaps11N12Allowed ||
      applicationForm?.hiringCriteria?.eduGaps12NGradAllowed ||
      applicationForm?.hiringCriteria?.eduGapsGradAllowed ||
      applicationForm?.hiringCriteria?.eduGapsGradNPGAllowed
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className="hiring-modal"
      style={{
        backgroundColor: "white",
        border: "1px solid #cacaca",
        paddingBottom: "30px",
      }}
    >
      <div
        className="modal-header hiring-modal-header"
        style={{ padding: "12px", alignSelf: "center" }}
      >
        <h5
          className="modal-title"
          style={{ fontSize: "12px", alignSelf: "center" }}
        >
          Job Details
        </h5>
        <IconButton
          style={{ color: "white" }}
          size={"small"}
          onClick={props?.openClose}
          component="span"
        >
          <Close />
        </IconButton>
      </div>
      <div className={"row d-flex justify-content-center align-items-center"}>
        <PgkTextField
          value={applicationForm?.hiringCriteria?.hiringCriteriaName}
          label={"Hiring Criteria Name"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "40%", alignSelf: "center" }}
        />
      </div>
      <div
        className={"d-flex justify-content-around"}
        style={{ padding: "0px 12px 12px" }}
      >
        <PgkTextField
          value={getNameByType("PROGRAM")}
          label={"Program"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
        />
        <PgkTextField
          label={"Student Program"}
          value={
            applicationForm?.studentAcademics?.filter(
              (x) => x.currentlyPursuingFlag
            )[0] !== undefined
              ? applicationForm?.studentAcademics?.filter(
                  (x) => x.currentlyPursuingFlag
                )[0]?.programName
              : "Not Provided"
          }
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateApplication("PROGRAM")}
        />
      </div>
      <div
        className={"d-flex justify-content-around"}
        style={{ padding: "0px 12px 12px" }}
      >
        <PgkMultiSelectField
          values={
            getNameByType("BRANCH") !== undefined
              ? getNameByType("BRANCH").map((item) => {
                  return { value: item.value, label: item.label };
                })
              : []
          }
          options={
            getNameByType("BRANCH") !== undefined
              ? getNameByType("BRANCH").map((item) => {
                  return { value: item.value, label: item.label };
                })
              : []
          }
          labelStyles={{ fontSize: ".800rem" }}
          selectStyles={{ fontSize: ".800rem" }}
          menuStyles={{ fontSize: ".800rem" }}
          styles={{ width: "60%", margin: "0px 3px" }}
          label={`Branches`}
        />
        <PgkTextField
          value={
            applicationForm?.studentAcademics?.filter(
              (x) => x.currentlyPursuingFlag
            )[0] !== undefined
              ? applicationForm?.studentAcademics?.filter(
                  (x) => x.currentlyPursuingFlag
                )[0].branchName
              : "Not Provided"
          }
          label={"Student Branch"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateApplication("BRANCH")}
        />
      </div>
      <div
        className={"d-flex align-items-center"}
        style={{ padding: "0px 15px 12px", width: "60%" }}
      >
        <p style={{ fontSize: "0.700rem" }}>Active Backlogs</p>
        <label
          className={"d-flex justify-content-center align-items-center"}
          style={{ fontSize: ".700rem", margin: "0px 10px" }}
        >
          Yes{" "}
          <input
            type={"radio"}
            checked={
              applicationForm?.hiringCriteria?.allowActiveBacklogs
                ? true
                : false
            }
            disabled
            style={{ marginLeft: "6px" }}
          />
        </label>
        <label
          className={"d-flex justify-content-center align-items-center"}
          style={{ fontSize: ".700rem", margin: "0px 10px" }}
        >
          No{" "}
          <input
            type={"radio"}
            checked={
              applicationForm?.hiringCriteria?.allowActiveBacklogs
                ? false
                : true
            }
            disabled
            style={{ marginLeft: "6px" }}
          />
        </label>
      </div>
      <div
        className={"d-flex justify-content-around"}
        style={{ padding: "0px 12px 12px" }}
      >
        <PgkTextField
          value={applicationForm?.hiringCriteria?.numberOfAllowedBacklogs + " "}
          label={"How many Backlogs ?"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ style: { fontSize: ".800rem" } }}
          styles={{ readOnly: true, width: "60%", margin: "0px 3px" }}
        />
        <PgkTextField
          value={
            applicationForm?.studentAcademics?.filter(
              (x) => x.currentlyPursuingFlag
            )[0] !== undefined
              ? applicationForm?.studentAcademics?.filter(
                  (x) => x.currentlyPursuingFlag
                )[0].activeBacklogsNumber
              : 100
          }
          label={"Student Active Backlogs"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateApplication("ACTIVE_BACKLOGS")}
        />
      </div>
      <div
        className={"d-flex justify-content-around"}
        style={{ padding: "0px 12px 12px" }}
      >
        <PgkTextField
          value={applicationForm?.hiringCriteria?.minimumCutoffPercentage10th}
          label={"> X/SSC Percentage"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
        />
        <PgkTextField
          value={
            applicationForm?.studentAcademics?.filter(
              (x) => x.programType === "Tenth"
            )[0] !== undefined
              ? applicationForm?.studentAcademics?.filter(
                  (x) => x.programType === "Tenth"
                )[0].percentage
              : "Not Provided"
          }
          label={"Student X/SSC Percentage"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateApplication("TENTH_PERCENTAGE")}
        />
      </div>
      <div
        className={"d-flex justify-content-around"}
        style={{ padding: "0px 12px 12px" }}
      >
        <PgkTextField
          value={applicationForm?.hiringCriteria?.minimumCutoffPercentage12th}
          label={">= XII/Intermediate Percentage"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
        />
        <PgkTextField
          value={
            applicationForm?.studentAcademics?.filter(
              (x) => x.programType === "Twelth"
            )[0] !== undefined
              ? applicationForm?.studentAcademics?.filter(
                  (x) => x.programType === "Twelth"
                )[0].percentage
              : "Not Provided"
          }
          label={"Student XII/Intermediate Percentage"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateApplication("TWELTH")}
        />
      </div>
      <div
        className={"d-flex justify-content-around"}
        style={{ padding: "0px 12px 12px" }}
      >
        <PgkTextField
          value={applicationForm?.hiringCriteria?.minimumCutoffPercentageGrad}
          label={">= Undergraduation Percentage"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
        />
        <PgkTextField
          value={
            applicationForm?.studentAcademics?.filter(
              (x) => x.programType === "UG"
            )[0] !== undefined
              ? applicationForm?.studentAcademics?.filter(
                  (x) => x.programType === "UG"
                )[0].percentage
              : "Not Provided"
          }
          label={"Student Undergraduation Percentage"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateApplication("GRADUATION")}
        />
      </div>
      <div
        className={"d-flex justify-content-around"}
        style={{ padding: "0px 12px 12px" }}
      >
        <PgkTextField
          value={applicationForm?.hiringCriteria?.yearOfPassing}
          label={"Year of Passing"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
        />
        {console.log(
          applicationForm?.studentAcademics?.filter(
            (x) => x.currentlyPursuingFlag
          )[0]
        )}
        <PgkTextField
          value={
            applicationForm?.studentAcademics?.filter(
              (x) => x.currentlyPursuingFlag
            )[0] !== undefined
              ? new Date(
                  applicationForm?.studentAcademics?.filter(
                    (x) => x.currentlyPursuingFlag
                  )[0].monthYearOfPassing
                ).getFullYear() + ""
              : "Not Provided"
          }
          label={"Student Year of Passing"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateApplication("YEAR_OF_PASSING")}
        />
      </div>
      <div
        className={"d-flex align-items-center"}
        style={{ padding: "0px 15px 12px", width: "60%" }}
      >
        <p style={{ fontSize: "0.700rem" }}>Educational Gaps if any</p>
        <label
          className={"d-flex justify-content-center align-items-center"}
          style={{ fontSize: ".700rem", margin: "0px 10px" }}
        >
          Yes{" "}
          <input
            type={"radio"}
            checked={educationalGapsAllowed() ? true : false}
            disabled
            style={{ marginLeft: "6px" }}
          />
        </label>
        <label
          className={"d-flex justify-content-center align-items-center"}
          style={{ fontSize: ".700rem", margin: "0px 10px" }}
        >
          No{" "}
          <input
            type={"radio"}
            checked={educationalGapsAllowed() ? false : true}
            disabled
            style={{ marginLeft: "6px" }}
          />
        </label>
      </div>
      <div
        className={"d-flex justify-content-between"}
        style={{ padding: "0px 12px 12px" }}
      >
        <p />
        <p style={{ fontSize: "0.700rem", fontWeight: "bold" }}>
          GAPS DURING <span style={{ fontWeight: "400" }}>(In Months)</span>
        </p>
        <p style={{ fontSize: "0.700rem", fontWeight: "bold" }}>
          STUDENT GAPS DURING{" "}
          <span style={{ fontWeight: "400" }}>(In Months)</span>
        </p>
      </div>
      <div
        className={"d-flex justify-content-between align-items-center"}
        style={{ padding: "0px 12px 12px" }}
      >
        <div
          className={"d-flex justify-content-between align-items-center"}
          style={{ minWidth: "250px" }}
        >
          <p style={{ fontSize: "0.700rem" }}>Schooling</p>
          <div className={"d-flex justify-Content-center align-items-center"}>
            <label
              className={"d-flex justify-content-center align-items-center"}
              style={{ fontSize: ".700rem", margin: "0px 10px" }}
            >
              Yes{" "}
              <input
                type={"radio"}
                checked={
                  applicationForm?.hiringCriteria?.eduGapsSchoolAllowed
                    ? true
                    : false
                }
                disabled
                style={{ marginLeft: "6px" }}
              />
            </label>
            <label
              className={"d-flex justify-content-center align-items-center"}
              style={{ fontSize: ".700rem", margin: "0px 10px" }}
            >
              No{" "}
              <input
                type={"radio"}
                checked={
                  applicationForm?.hiringCriteria?.eduGapsSchoolAllowed
                    ? false
                    : true
                }
                disabled
                style={{ marginLeft: "6px" }}
              />
            </label>
          </div>
        </div>
        <PgkTextField
          value={applicationForm?.hiringCriteria?.eduGapsSchool + ""}
          label={"In Months"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
        />
        <PgkTextField
          value={educationGaps?.eduGapSchooling + ""}
          label={"In Months"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateGaps("SCHOOLING")}
        />
      </div>
      <div
        className={"d-flex justify-content-between align-items-center"}
        style={{ padding: "0px 12px 12px" }}
      >
        <div
          className={"d-flex justify-content-between align-items-center"}
          style={{ minWidth: "250px" }}
        >
          <p style={{ fontSize: "0.700rem" }}>XI-XII</p>
          <div className={"d-flex justify-Content-center align-items-center"}>
            <label
              className={"d-flex justify-content-center align-items-center"}
              style={{ fontSize: ".700rem", margin: "0px 10px" }}
            >
              Yes{" "}
              <input
                type={"radio"}
                checked={
                  applicationForm?.hiringCriteria?.eduGaps11N12Allowed
                    ? true
                    : false
                }
                disabled
                style={{ marginLeft: "6px" }}
              />
            </label>
            <label
              className={"d-flex justify-content-center align-items-center"}
              style={{ fontSize: ".700rem", margin: "0px 10px" }}
            >
              No{" "}
              <input
                type={"radio"}
                checked={
                  applicationForm?.hiringCriteria?.eduGaps11N12Allowed
                    ? false
                    : true
                }
                disabled
                style={{ marginLeft: "6px" }}
              />
            </label>
          </div>
        </div>
        <PgkTextField
          value={applicationForm?.hiringCriteria?.eduGaps11N12 + ""}
          label={"In Months"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
        />
        <PgkTextField
          value={educationGaps?.eduGap11N12 + ""}
          label={"In Months"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateGaps("TWELTH")}
        />
      </div>
      {/* <div className={'d-flex justify-content-between align-items-center'} style={{ padding: '0px 12px 12px' }}>
                <div className={'d-flex justify-content-between align-items-center'} style={{ minWidth: '250px' }}>
                    <p style={{ fontSize: '0.700rem' }}>Between XII - Graduation</p>
                    <div className={'d-flex justify-Content-center align-items-center'}>
                        <label className={'d-flex justify-content-center align-items-center'} style={{ fontSize: '.700rem', margin: '0px 10px' }}>
                            Yes <input type={'radio'} checked={applicationForm?.hiringCriteria?.eduGaps12NGradAllowed ? true : false} disabled style={{ marginLeft: '6px' }} />
                        </label>
                        <label className={'d-flex justify-content-center align-items-center'} style={{ fontSize: '.700rem', margin: '0px 10px' }}>
                            No <input type={'radio'} checked={applicationForm?.hiringCriteria?.eduGaps12NGradAllowed ? false : true} disabled style={{ marginLeft: '6px' }} />
                        </label>
                    </div>
                </div>
                <PgkTextField
                    value={applicationForm?.hiringCriteria?.eduGaps12NGrad + ""}
                    label={'In Months'}
                    inputLabelProps={{ style: { fontSize: '.800rem' } }}
                    inputProps={{ readOnly: true, style: { fontSize: '.800rem' } }}
                    styles={{ width: '60%', margin: '0px 3px' }}
                />
                <PgkTextField
                    value={educationGaps?.eduGap12NGrad + ""}
                    label={'In Months'}
                    inputLabelProps={{ style: { fontSize: '.800rem' } }}
                    inputProps={{ readOnly: true, style: { fontSize: '.800rem' } }}
                    styles={{ width: '60%', margin: '0px 3px' }}
                    errorMessage={validateGaps('TWELTH_AND_GRAD')}
                />
            </div> */}
      <div
        className={"d-flex justify-content-between align-items-center"}
        style={{ padding: "0px 12px 12px" }}
      >
        <div
          className={"d-flex justify-content-between align-items-center"}
          style={{ minWidth: "250px" }}
        >
          <p style={{ fontSize: "0.700rem" }}>During Graduation</p>
          <div className={"d-flex justify-Content-center align-items-center"}>
            <label
              className={"d-flex justify-content-center align-items-center"}
              style={{ fontSize: ".700rem", margin: "0px 10px" }}
            >
              Yes{" "}
              <input
                type={"radio"}
                checked={
                  applicationForm?.hiringCriteria?.eduGapsGradAllowed
                    ? true
                    : false
                }
                disabled
                style={{ marginLeft: "6px" }}
              />
            </label>
            <label
              className={"d-flex justify-content-center align-items-center"}
              style={{ fontSize: ".700rem", margin: "0px 10px" }}
            >
              No{" "}
              <input
                type={"radio"}
                checked={
                  applicationForm?.hiringCriteria?.eduGapsGradAllowed
                    ? false
                    : true
                }
                disabled
                style={{ marginLeft: "6px" }}
              />
            </label>
          </div>
        </div>
        <PgkTextField
          value={applicationForm?.hiringCriteria?.eduGapsGrad + ""}
          label={"In Months"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
        />
        <PgkTextField
          value={educationGaps?.eduGapGrad + ""}
          label={"In Months"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateGaps("GRADUATION")}
        />
      </div>
      <div
        className={"d-flex justify-content-between align-items-center"}
        style={{ padding: "0px 12px 12px" }}
      >
        <div
          className={"d-flex justify-content-between align-items-center"}
          style={{ minWidth: "250px" }}
        >
          <p style={{ fontSize: "0.700rem" }}>Between Graduation - PG</p>
          <div className={"d-flex justify-Content-center align-items-center"}>
            <label
              className={"d-flex justify-content-center align-items-center"}
              style={{ fontSize: ".700rem", margin: "0px 10px" }}
            >
              Yes{" "}
              <input
                type={"radio"}
                checked={
                  applicationForm?.hiringCriteria?.eduGapsGradNPGAllowed
                    ? true
                    : false
                }
                disabled
                style={{ marginLeft: "6px" }}
              />
            </label>
            <label
              className={"d-flex justify-content-center align-items-center"}
              style={{ fontSize: ".700rem", margin: "0px 10px" }}
            >
              No{" "}
              <input
                type={"radio"}
                checked={
                  applicationForm?.hiringCriteria?.eduGapsGradNPGAllowed
                    ? false
                    : true
                }
                disabled
                style={{ marginLeft: "6px" }}
              />
            </label>
          </div>
        </div>
        <PgkTextField
          value={applicationForm?.hiringCriteria?.eduGapsGradNPG + ""}
          label={"In Months"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
        />
        <PgkTextField
          value={educationGaps?.eduGapsGradAndPg + ""}
          label={"In Months"}
          inputLabelProps={{ style: { fontSize: ".800rem" } }}
          inputProps={{ readOnly: true, style: { fontSize: ".800rem" } }}
          styles={{ width: "60%", margin: "0px 3px" }}
          errorMessage={validateGaps("GRAD_AND_PG")}
        />
      </div>
      <br />
    </div>
  );
};

export default CompareCriteriaCmp;
