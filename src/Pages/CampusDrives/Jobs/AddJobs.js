import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skills } from "./Skills";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
 
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { WithContext as ReactTags } from "react-tag-input";
import PgkTextField from "../../../Components/FormFields/PgkTextField";
import PgkSelectField from "../../../Components/FormFields/PgkSelectField";
import { actionGetCitiesByCountryNameRequest } from "../../../Store/Actions/SagaActions/CommonSagaActions";

const $ = window.$;

const jobFormFields = [
  "jobName",
  "jobType",
  "skills",
  "salaryMinRange",
  "hiringCriteria",
  "noOfPositions",
  "salaryMaxRange",
  "monthOfHiring",
  "location",
  "status",
  "remarks",
  "attachment",
  "verifiedProfilesOnly",
];

const suggestions = Skills.map((skill) => {
  return {
    id: skill,
    text: skill,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddJobs = (props) => {
  const [locationError, setlocationError] = useState(false);
  const location = useRef();
  const profiles = useRef();
  const skillsDiv = useRef();

  const [tags, setTags] = useState(
    props?.jobFormData?.skills?.value.map((skill) => {
      return {
        id: skill.label,
        text: skill.value,
      };
    })
  );

  const handleDelete = (i) => {
    let newTags = tags.filter((tag, index) => index !== i);
    props?.handleChange("skills", newTags, "");
    setTags(newTags);
  };

  const handleAddition = (tag) => {
    let newTags = [...tags, tag];
    props?.handleChange("skills", newTags, "");
    setTags(newTags);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
    props?.handleChange("skills", newTags, "");
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const countryName = useSelector(
    (state) => state.DashboardReducer.profileInfo?.corporateHQAddressCountry
  );

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
    console.log(props.certificateDetails.attachment);
    props.setPath(props.certificateDetails.attachment);
  };

  const onStatesResponse = (response, _countryName) => {
    let updatedStatesOptions = [];

    if (response?.length) {
      const statesData = response;

      if (statesData?.length) {
        updatedStatesOptions = statesData?.sort().map((item) => {
          return { value: item, label: item };
        });
      }
    }

    setStates(updatedStatesOptions);
  };
  useEffect(() => {
    console.log(props?.jobFormData?.skills?.errorMessage, "value");
    if (props?.jobFormData?.skills?.errorMessage === "Required") {
      skillsDiv.current.style.display = "block";
    } else {
      skillsDiv.current.style.display = "none";
    }
  }, [props?.jobFormData?.skills?.errorMessage]);

  useEffect(() => {
    if (states?.length === 0) {
      dispatch(
        actionGetCitiesByCountryNameRequest({
          countryName: countryName,
          callback: (response) => {
            onStatesResponse(response, countryName);
          },
        })
      );
    }
  }, [countryName]);

  useEffect(() => {
    if (props?.jobFormData?.skills?.value?.length > 0) {
      let availableTags = [];
      (props?.jobFormData?.skills?.value).map((skill) => {
        availableTags.push({
          id: skill.id,
          text: skill.text,
        });
      });
      setTags([...availableTags]);
    }
  }, [props?.jobFormData?.skills?.value]);

  const isFormValid = () => {
    let isValid = true;
    if (props?.jobFormData) {
      console.log(jobFormFields, "HIII");
      jobFormFields.forEach((item) => {
        if (isValid) {
          if (
            item === "attachment" &&
            props.jobFormData[item].isRequired &&
            (props.jobFormData[item].value === undefined ||
              props.jobFormData[item].value.attachment === undefined ||
              props.jobFormData[item].value.attachmentName === undefined)
          ) {
            props?.fileHandler(item, undefined, "Required");
            isValid = false;
          }
          if (
            item === "location" &&
            props.jobFormData[item].isRequired &&
            (props.jobFormData[item].value === undefined ||
              props.jobFormData[item].value === "")
          ) {
            location.current.style = "border: 1px solid #f00";
          } else {
            location.current.style =
              "border:1px solid rgba(0, 0, 0, 0.2), border-radius: 8px";
          }
          if (
            item === "verifiedProfilesOnly" &&
            props.jobFormData[item].isRequired &&
            (props.jobFormData[item].value === undefined ||
              props.jobFormData[item].value === "" ||
              props.jobFormData[item].value === null)
          ) {
            profiles.current.style = "border: 1px solid #f00";
            //alert('Profiles')
            isValid = false;
          } else {
            profiles.current.style = "border:none";
            //alert('Profiles')
          }

          if (
            props.jobFormData[item].isRequired &&
            props.jobFormData[item].errorMessage
          ) {
            isValid = false;
            props?.handleChange(
              item,
              props.jobFormData[item].value,
              "Required"
            );
          } else if (
            props.jobFormData[item].isRequired &&
            (typeof props.jobFormData[item].value === "string" ||
              typeof props.jobFormData[item].value === "number" ||
              typeof props.jobFormData[item].value === "undefined")
          ) {
            if (
              props.jobFormData[item].value === undefined ||
              props.jobFormData[item].value?.toString().trim() === ""
            ) {
              isValid = false;
              props?.handleChange(
                item,
                props.jobFormData[item].value,
                "Required"
              );
            }
          } else if (
            props.jobFormData[item].isRequired &&
            typeof props.jobFormData[item].value === "object"
          ) {
            if (
              props.jobFormData[item].value === undefined ||
              props.jobFormData[item].value?.length === 0
            ) {
              isValid = false;
              props?.handleChange(
                item,
                props.jobFormData[item].value,
                "Required"
              );
            }
          }
        }
      });
    } else {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      if (props?.submitJobForm) {
        props?.submitJobForm();
      }
    }
  };

  return (
    <form>
      <div className="add-new-jobs-section">
        {props?.noHeading ? undefined : (
          <div
            className="d-flex justify-content-between align-items-center w-full"
            style={{ backgroundColor: "#253AA3" }}
          >
            <p></p>
            <p className="heading" style={{ color: "white" }}>
              {props?.mode === "ADD"
                ? "Create Job"
                : props?.mode === "EDIT"
                ? "Edit " + props?.jobFormData?.jobName?.value
                : props?.jobFormData?.jobName?.value}
            </p>
            <IconButton
              style={{ color: "white" }}
              onClick={props?.handleCloseModal}
              component="span"
            >
              <Close />
            </IconButton>
          </div>
        )}
        <div className={`py-4 ${props?.cdJob ? " w-full m-0 row" : ""}`}>
          <div className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}>
            <div className="col-md-3">
              <div className="mb-20">
                <PgkTextField
                  autoFocus
                  name="jobName"
                  onChange={props?.handleChange}
                  value={props?.jobFormData?.jobName?.value}
                  label={"Name of the job"}
                  inputLabelProps={{ style: { fontSize: ".800rem" } }}
                  inputProps={{ style: { fontSize: ".800rem" } }}
                  errorMessage={props?.jobFormData?.jobName?.errorMessage}
                  required={props?.jobFormData?.jobName?.isRequired}
                  disabled={props?.jobFormData?.jobName?.isDisabled}
                />
              </div>
              <div className="mb-20">
                <PgkSelectField
                  name="hiringCriteria"
                  value={props?.jobFormData?.hiringCriteria?.value}
                  onChange={props?.handleChange}
                  label={`Hiring Criteria`}
                  options={
                    props?.hiringCriteria?.length
                      ? props.hiringCriteria.map((item) => {
                          return {
                            value: item.hiringCriteriaID,
                            label: item.hiringCriteriaName,
                          };
                        })
                      : []
                  }
                  labelStyles={{ fontSize: ".800rem" }}
                  selectStyles={{ fontSize: ".800rem" }}
                  menuStyles={{ fontSize: ".800rem" }}
                  errorMessage={
                    props?.jobFormData?.hiringCriteria?.errorMessage
                  }
                  required={props?.jobFormData?.hiringCriteria?.isRequired}
                  disabled={props?.jobFormData?.hiringCriteria?.isDisabled}
                />
              </div>
              <div className="mb-20">
                <PgkTextField
                  name="monthOfHiring"
                  onChange={props?.handleChange}
                  value={
                    props?.jobFormData?.monthOfHiring?.value
                      ? moment(props?.jobFormData?.monthOfHiring?.value).format(
                          "YYYY-MM-DD"
                        )
                      : null
                  }
                  label={"Date of hiring"}
                  inputLabelProps={{ shrink:true ,style: { fontSize: ".800rem" } }}
                  inputProps={{
                    style: { fontSize: ".800rem" },
                    min: moment().format("YYYY-MM-DD"),
                  }}
                  errorMessage={props?.jobFormData?.monthOfHiring?.errorMessage}
                  required={props?.jobFormData?.monthOfHiring?.isRequired}
                  disabled={props?.jobFormData?.monthOfHiring?.isDisabled}
                  type={"date"}
                  style={{ width: "100%", marginTop: '15px' }}
                />
              </div>
              <div className="mb-20">
                {console.log(props?.jobFormData?.verifiedProfilesOnly?.value)}
                <FormControl>
                  <FormLabel
                    id="verifiedProfilesOnly"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Post Job *
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="verifiedProfilesOnly"
                    name="verifiedProfilesOnly"
                    required={
                      props?.jobFormData?.verifiedProfilesOnly?.isRequired
                    }
                    data-vlue={props?.jobFormData?.verifiedProfilesOnly?.value}
                    value={props?.jobFormData?.verifiedProfilesOnly?.value}
                    onChange={props?.handleRadio}
                    checked={props?.jobFormData?.verifiedProfilesOnly?.value}
                  >
                    <div ref={profiles} className="verProBorder">
                      <FormControlLabel
                        style={{ margin: "0px" }}
                        value="true"
                        control={<Radio />}
                        className="radioForm"
                        label="Verified Students"
                      />
                      <FormControlLabel
                        style={{
                          margin: "0px",
                          position: "relative",
                          top: "-15px",
                        }}
                        value="false"
                        className="radioForm"
                        control={<Radio />}
                        label="All Students"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-20">
                <PgkSelectField
                  name="jobType"
                  value={props?.jobFormData?.jobType?.value}
                  onChange={props?.handleChange}
                  label={`Job Type`}
                  options={
                    props?.lookUpData?.jobType?.length
                      ? props?.lookUpData?.jobType?.map((item) => {
                          return {
                            value: item.jobTypeCode,
                            label: item.jobType,
                          };
                        })
                      : []
                  }
                  labelStyles={{ fontSize: ".800rem" }}
                  selectStyles={{ fontSize: ".800rem" }}
                  menuStyles={{ fontSize: ".800rem" }}
                  errorMessage={props?.jobFormData?.jobType?.errorMessage}
                  required={props?.jobFormData?.jobType?.isRequired}
                  disabled={props?.jobFormData?.jobType?.isDisabled}
                />
              </div>
              <div className="mb-20">
                <PgkTextField
                  name="noOfPositions"
                  onChange={props?.handleChange}
                  value={props?.jobFormData?.noOfPositions?.value}
                  label={"No of positions"}
                  inputLabelProps={{ style: { fontSize: ".800rem" } }}
                  inputProps={{ style: { fontSize: ".800rem" } }}
                  validations={["isNumeric"]}
                  errorMessage={props?.jobFormData?.noOfPositions?.errorMessage}
                  required={props?.jobFormData?.noOfPositions?.isRequired}
                  disabled={props?.jobFormData?.noOfPositions?.isDisabled}
                />
              </div>
              <div
                className="mb-20 dataField"
                style={{ position: "relative", top: "17px" }}
              >
                <label
                  style={{
                    fontSize: "0.8rem",
                    position: "relative",
                    top: "13px",
                  }}
                >
                  Location *
                </label>
                <input
                // style={{marginTop:"17px"}}
                  className="dataFieldInput"
                  list="cities"
                  name="location"
                  ref={location}
                  onChange={props?.handleRadio}
                />
                <datalist
                  id="cities"
                  value={props?.jobFormData?.location?.value}
                  style={{ background: "rgba(244, 67, 54)" }}
                >
                  {states.map((cities) => {
                    return <option value={cities.value} />;
                  })}
                  errorMessage={props?.jobFormData?.location?.errorMessage}
                  required={props?.jobFormData?.location?.isRequired}
                  disabled={props?.jobFormData?.location?.isDisabled}
                </datalist>
                <div
                  style={{
                    position: "relative",
                    top: "-31px",
                    left: "10px",
                    color: "rgba(0, 0, 0, 0.5)",
                    zIndex: "1",
                    fontSize: "0.8rem",
                  }}
                >
                  {props?.jobFormData?.location?.value}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-20">
                <p
                  style={{
                    fontSize: "0.8rem",
                    position: "relative",
                    top: "-17px",
                  }}
                >
                  {" "}
                  Skills *{" "}
                </p>
                <div
                  style={{ position: "relative", top: "-17px", zIndex: "10" }}
                >
                  <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="bottom"
                    autocomplete
                    editable
                    allowAdditionFromPaste
                    allowUnique
                    required
                  />
                  <div style={{ fontSize: ".800rem", color: "#f44336" }}>
                    {props?.jobFormData?.skills?.errorMessage}
                  </div>
                </div>
                <div
                  ref={skillsDiv}
                  style={{
                    border: "2px solid rgb(244, 67, 54)",
                    width: "202px",
                    borderRadius: "5px",
                    height: " 32px",
                    position: "absolute",
                    top: " 2px",
                    left: "14px",
                  }}
                ></div>
              </div>
            </div>
            <div className="col-md">
              <div className="mb-20">
                <PgkTextField
                  name="salaryMinRange"
                  onChange={props?.handleChange}
                  value={props?.jobFormData?.salaryMinRange?.value}
                  label={"Minimum Salary in LPA"}
                  validations={["isNumericWithDecimal", "min_1"]}
                  inputLabelProps={{
                    style: {
                      fontSize: `${props?.cdJob ? ".700rem" : ".800rem"}`,
                    },
                  }}
                  inputProps={{ style: { fontSize: ".800rem" } }}
                  errorMessage={
                    props?.jobFormData?.salaryMinRange?.errorMessage
                  }
                  required={props?.jobFormData?.salaryMinRange?.isRequired}
                  disabled={props?.jobFormData?.salaryMinRange?.isDisabled}
                />
              </div>
              <div className="mb-20">
                <PgkTextField
                  name="salaryMaxRange"
                  onChange={props?.handleChange}
                  value={props?.jobFormData?.salaryMaxRange?.value}
                  label={"Maximum Salary in LPA"}
                  validations={["isNumericWithDecimal"]}
                  inputLabelProps={{
                    style: {
                      fontSize: `${props?.cdJob ? ".700rem" : ".800rem"}`,
                    },
                  }}
                  inputProps={{ style: { fontSize: ".800rem" } }}
                  errorMessage={
                    props?.jobFormData?.salaryMaxRange?.errorMessage
                  }
                  required={props?.jobFormData?.salaryMaxRange?.isRequired}
                  disabled={props?.jobFormData?.salaryMaxRange?.isDisabled}
                />
              </div>
              <div className="mb-20">
                <PgkSelectField
                  name="status"
                  value={props?.jobFormData?.status?.value}
                  onChange={props?.handleChange}
                  label={`Status`}
                  options={[
                    { value: "open", label: "Open" },
                    { value: "close", label: "Close" },
                  ]}
                  labelStyles={{ fontSize: ".800rem" }}
                  selectStyles={{ fontSize: ".800rem" }}
                  menuStyles={{ fontSize: ".800rem" }}
                  errorMessage={props?.jobFormData?.status?.errorMessage}
                  required={props?.jobFormData?.status?.isRequired}
                  disabled={props?.jobFormData?.status?.isDisabled}
                />
              </div>
            </div>
          </div>
          <div className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}>
            <div className={"flex flex-column w-full"}>
              <div className={"col-md"}>
                <PgkTextField
                  name="remarks"
                  value={props?.jobFormData?.remarks?.value}
                  label={"Remarks"}
                  required={props?.jobFormData?.remarks?.isRequired}
                  disabled={props?.jobFormData?.remarks?.isDisabled}
                  errorMessage={props?.jobFormData?.remarks?.errorMessage}
                  onChange={props?.handleChange}
                  inputLabelProps={{ style: { fontSize: ".800rem" } }}
                  inputProps={{ style: { fontSize: ".800rem" } }}
                  multiline={true}
                  minRows={6}
                />
              </div>
              <div className={"col-md mt-3"}>
                <div
                  className="row d-flex justify-content-center align-items-center"
                  style={{ margin: 0, padding: 0 }}
                >
                  <div
                    className={`col-md-${
                      props?.jobFormData?.attachment?.value?.attachment
                        ? "11"
                        : "12"
                    }`}
                    style={{ margin: 0, padding: 0 }}
                  >
                    <div className="d-attach">
                      {props?.jobFormData?.attachment?.value?.attachmentName ? (
                        <div
                          className={
                            "d-flex justify-content-between align-items-center"
                          }
                          style={{ width: "84%" }}
                        >
                          <p
                            className="float-left"
                            style={{
                              cursor: "pointer",
                              color: "#253AA3",
                              padding: "8px",
                              fontSize: ".800rem",
                              flex: "1",
                            }}
                          >
                            {
                              props?.jobFormData?.attachment?.value
                                ?.attachmentName
                            }
                          </p>
                          {(props?.mode === "DETAILS" &&
                            props?.editJob === undefined) ||
                          props?.mode === "EDIT" ||
                          props?.mode === "ADD" ? (
                            <Close
                              style={{ fontSize: "20px", float: "right" }}
                              onClick={() => {
                                if (props?.resetFile) {
                                  var $el = $("#attachment");
                                  $el
                                    .wrap("<form>")
                                    .closest("form")
                                    .get(0)
                                    .reset();
                                  $el.unwrap();
                                  props.resetFile("attachment");
                                }
                              }}
                            />
                          ) : null}
                        </div>
                      ) : null}
                      <label
                        htmlFor="attachment"
                        className="d-label"
                        style={{ backgroundColor: "#01253cf" , color:"#ffffff"}}
                      >
                        {" "}
                        Attachment *
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          if (props?.fileHandler) {
                            props.fileHandler("attachment", e);
                          }
                        }}
                        // className="d-inp d-none"
                        name="attachment"
                        accept=".pdf"
                        disabled={props?.jobFormData?.attachment?.isDisabled}
                        id="attachment"
                      />
                    </div>
                  </div>
                  {props?.jobFormData?.attachment?.value?.attachment && (
                    <div className="col-md-1" style={{ margin: 0, padding: 0 }}>
                      <div
                        className="d-attach"
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#253AA3",
                        }}
                      >
                        {props?.jobFormData?.attachment?.value?.attachment?.trim() !==
                        "" ? (
                          <div
                            // href={
                            //   "data:application/pdf;base64," +
                            //   props?.jobFormData?.attachment?.value?.attachment
                            // }
                            onClick={() => {
                              openFileInBrowser(
                                props.jobFormData.attachment.value.attachment,
                                props?.jobFormData?.attachment?.value
                                  ?.attachmentName
                              );
                            }}
                            style={{
                              textDecoration: "none",
                              outline: "none",
                              width: "100%",
                              cursor: "pointer",
                            }}
                            // download
                          >
                            {" "}
                            <label
                              style={{
                                backgroundColor: "#253AA3",
                                width: "100%",
                                height: "100%",
                                paddingTop: "10px",
                                color: "white",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              <i className="fas fa-download mr-2"></i>
                            </label>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
                {props?.jobFormData?.attachment?.errorMessage ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: ".800rem",
                      marginTop: "-15px",
                    }}
                  >
                    {props?.jobFormData?.attachment?.errorMessage}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center w-full mt-4">
          {props?.noEditBtn ? undefined : (
            <button
              type="button"
              onClick={props?.handleCloseModal}
              style={{ height: "18px", maxWidth: "160px" }}
              className="btn job-btn"
            >
              {props?.editLabel ? props?.editLabel : "Cancel"}
            </button>
          )}
          {props?.mode === "DETAILS" && props?.editJob ? (
            <button
              type="button"
              onClick={props?.editJob}
              style={{ height: "18px", maxWidth: "160px" }}
              className="btn job-btn"
            >
              Edit Job
            </button>
          ) : null}
          {props?.mode !== "DETAILS" ? (
            <button
              type="button"
              onClick={handleSubmit}
              style={{ height: "18px", maxWidth: "160px" }}
              className="btn job-btn"
            >
              {props?.saveLabel ? props?.saveLabel : "Save Job"}
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default AddJobs;
