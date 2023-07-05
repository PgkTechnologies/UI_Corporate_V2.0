//CampusDrive - 1
//Updated by srini Job simplification v6

import React, { useState, useEffect } from "react";
// import Select from "react-select";
import { WithContext as ReactTags } from "react-tag-input";
import { useRef } from "react";
import Close from "@material-ui/icons/Close";
import moment from "moment";
import Radio from "@mui/material/Radio";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
// import { actionGetCitiesByCountryNameRequest } from "../../../Store/Actions/SagaActions/CommonSagaActions";
import PgkSelectField from "../../../../Components/FormFields/PgkSelectField";
import PgkMultiSelectField from "../../../../utils/PgkMultiSelectField";
import PgkTextField from "../../../../Components/FormFields/PgkTextField";
import { Skills } from "../../Jobs/Skills";
import { actionGetCitiesByCountryNameRequest } from "../../../../Store/Actions/SagaActions/CommonSagaActions";

const HiringCriteriaFormCmp = (props) => {
  const firstInput = useRef(null);
  const { hiringData } = props;
  const { JobID } = props;
  const $ = window.$;
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const skillsDiv = useRef();
  const location = useRef();
  const profiles = useRef();
  const [states, setStates] = useState([]);
  const { setSection } = props;
  const countryName = useSelector(
    (state) => state.DashboardReducer.profileInfo?.corporateHQAddressCountry
  );

  console.log(hiringData, "HCDATA")

  useEffect(() => {
    if (props?.jobFormData?.skills?.errorMessage === "Required") {
      skillsDiv.current.style.display = "block";
    } else {
      skillsDiv.current.style.display = "none";
    }
  }, [props?.jobFormData?.skills?.errorMessage]);

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
  const [tags, setTags] = useState(
    props?.jobFormData?.skills?.value.map((skill) => {
      return {
        id: skill.label,
        text: skill.value,
      };
    })
  );
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const suggestions = Skills.map((skill) => {
    // console.log(skill, "SUG")
    return {
      id: skill,
      text: skill,
    };
  });

  const yearOfPassingOptions = [
    "N/A",
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
    currentYear + 2,
  ].map((item) => {
    return {
      value: item === "N/A" ? "1000" : item.toString(),
      label: item.toString(),
    };
  });

  const handleDelete = (i) => {
    let newTags = tags.filter((tag, index) => index !== i);
    props?.handleJobChange("skills", newTags, "");
    setTags(newTags);
  };

  const handleAddition = (tag) => {
    console.log(tag, "ADD");
    let newTags = [...tags, tag];
    props?.handleJobChange("skills", newTags, "");
    setTags(newTags);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
    props?.handleJobChange("skills", newTags, "");
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const openFileInBrowser = (data, fileName) => {
    if (data.length < 250) {
      props?.getAttach(data);
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
    console.log(props?.certificateDetails.attachment);
    props?.setPath(props?.certificateDetails.attachment);
  };

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

  const isFormValid = () => {
    let isValid = true;
    if (props?.jobFormData) {
      jobFormFields.forEach((item) => {
        if (isValid) {
          if (
            item === "attachment" &&
            props?.jobFormData[item].isRequired &&
            (props?.jobFormData[item].value === undefined ||
              props?.jobFormData[item].value.attachment === undefined ||
              props?.jobFormData[item].value.attachmentName === undefined)
          ) {
            props?.fileHandler(item, undefined, "Required");
            isValid = false;
          }
          if (
            item === "location" &&
            props?.jobFormData[item].isRequired &&
            (props?.jobFormData[item].value === undefined ||
              props?.jobFormData[item].value === "")
          ) {
            location.current.style = "border: 1px solid #f00";
          } else {
            location.current.style =
              "border:1px solid rgba(0, 0, 0, 0.2), border-radius: 8px";
          }
          if (
            item === "verifiedProfilesOnly" &&
            props?.jobFormData[item].isRequired &&
            (props?.jobFormData[item].value === undefined ||
              props?.jobFormData[item].value === "" ||
              props?.jobFormData[item].value === null)
          ) {
            profiles.current.style = "border: 1px solid #f00";
            //alert('Profiles')
            isValid = false;
          } else {
            profiles.current.style = "border:none";
            //alert('Profiles')
          }

          if (
            props?.jobFormData[item].isRequired &&
            props?.jobFormData[item].errorMessage
          ) {
            isValid = false;
            props?.handleJobChange(
              item,
              props?.jobFormData[item].value,
              "Required"
            );
          }
          if (
            props?.jobFormData[item].isRequired &&
            (typeof props?.jobFormData[item].value === "string" ||
              typeof props?.jobFormData[item].value === "number" ||
              typeof props?.jobFormData[item].value === "undefined")
          ) {
            if (
              props?.jobFormData[item].value === undefined ||
              props?.jobFormData[item].value?.toString().trim() === ""
            ) {
              isValid = false;
              props?.handleJobChange(
                item,
                props?.jobFormData[item].value,
                "Required"
              );
            }
          } else if (
            props?.jobFormData[item].isRequired &&
            typeof props?.jobFormData[item].value === "object"
          ) {
            if (
              props?.jobFormData[item].value === undefined ||
              props?.jobFormData[item].value?.length === 0
            ) {
              isValid = false;
              props?.handleJobChange(
                item,
                props?.jobFormData[item].value,
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

  const isValid = () => {
    const keys = [
      "programID",
      "hcPrograms",
      "yearOfPassing",
      "minimumCutoffPercentage10th",
      "minimumCutoffPercentageDiploma",
      "minimumCutoffPercentage12th",
      "minimumCutoffPercentageGrad",
      "minimumCutoffPercentageITI",
    ];

    let _isValid = true;

    keys.forEach((item) => {
      if (_isValid) {
        if (hiringData[item] && !hiringData[item].isDisabled) {
          if (
            hiringData[item].isRequired &&
            (hiringData[item].value === undefined ||
              hiringData[item].value === "" ||
              hiringData[item].value === null)
          ) {
            _isValid = false;
            props?.updateHCField(item, hiringData[item].value, "Required");
          }
        }
        if (hiringData[item] && !hiringData[item].isDisabled) {
          if (
            hiringData[item].isRequired &&
            typeof hiringData[item].value === "object"
          ) {
            if (
              hiringData[item].value === undefined ||
              hiringData[item].value?.length === 0
            ) {
              _isValid = false;
              props?.updateHCField(item, hiringData[item].value, "Required");
            }
          }
        }
      }
    });

    return _isValid;
  };

  const handleSubmit = (JobID) => {
    //isFormValid() &&
    if (isFormValid() && isValid()) {
      if (props?.handleSubmit) {
        props?.handleSubmit();
      }
    }
  };

  return (
    <form className="hiring-modal-form" style={props?.hiringCriteriaFormStyles}>
      <div className="container-fluid mt-3 mb-3 h-100">
        <div style={{ marginBottom: "20px" }}>
          <div className={`row  m-0 ${props?.cdJob ? " w-full" : ""}`}>
            <div className="col-md-4">
              <PgkTextField
                name="jobName"
                onChange={props?.handleJobChange}
                value={
                  props?.jobFormData?.jobName?.value
                    ? props?.jobFormData?.jobName?.value
                    : ""
                }
                label={"Name of the job"}
                inputLabelProps={{ style: { fontSize: ".800rem" } }}
                inputProps={{ style: { fontSize: ".800rem" } }}
                errorMessage={props?.jobFormData?.jobName?.errorMessage}
                required={props?.jobFormData?.jobName?.isRequired}
                disabled={props?.jobFormData?.jobName?.isDisabled}
                autoFocus
              />
            </div>
            <div className="col-md-4">
              <PgkSelectField
                name="jobType"
                value={props?.jobFormData?.jobType?.value}
                onChange={props?.handleJobChange}
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
                labelStyles={{
                  fontSize: ".800rem",
                  background: "#fff",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                }}
                selectStyles={{ fontSize: ".800rem" }}
                menuStyles={{ fontSize: ".800rem" }}
                errorMessage={props?.jobFormData?.jobType?.errorMessage}
                required={props?.jobFormData?.jobType?.isRequired}
                disabled={props?.jobFormData?.jobType?.isDisabled}
              />
            </div>
            <div className="col-md-4">
              <PgkSelectField
                name="programID"
                value={props?.hiringData?.programID?.value}
                label={`Program`}
                options={props?.programCatalog}
                onChange={props?.handleChange}
                labelStyles={{
                  fontSize: ".800rem",
                  background: "#fff",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
                selectStyles={{ fontSize: ".800rem" }}
                menuStyles={{ fontSize: ".800rem" }}
                errorMessage={props?.hiringData?.programID?.errorMessage}
                required={props?.hiringData?.programID?.isRequired}
                disabled={props?.hiringData?.programID?.isDisabled}
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div
            className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}
            style={{ position: "relative" }}
          >
            <div className="col-md-4">
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
                style={{
                  position: "relative",
                  top: "-17px",
                  zIndex: "10",
                  focus: "none",
                }}
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
                  allowAdditionFromPaste
                  allowUnique
                  autofocus={false}
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
                  width: "calc(100% - 15%)",
                  borderRadius: "5px",
                  height: " 32px",
                  position: "absolute",
                  top: " 2px",
                  left: "14px",
                }}
              ></div>
            </div>

            <div className="col-md-4">
              <PgkTextField
                name="salaryMinRange"
                onChange={props?.handleJobChange}
                value={props?.jobFormData?.salaryMinRange?.value}
                label={"Minimum Salary in LPA"}
                validations={["isNumericWithDecimal", "min_1"]}
                inputLabelProps={{
                  style: {
                    fontSize: `${props?.cdJob ? ".700rem" : ".800rem"}`,
                  },
                }}
                inputProps={{ style: { fontSize: ".800rem" } }}
                errorMessage={props?.jobFormData?.salaryMinRange?.errorMessage}
                required={props?.jobFormData?.salaryMinRange?.isRequired}
                disabled={props?.jobFormData?.salaryMinRange?.isDisabled}
              />
            </div>

            <div
              className="col-md-4 branchInput"
            >
              <PgkMultiSelectField
                name={"hcPrograms"}
                values={props?.hiringData?.hcPrograms?.value}
                onChange={props?.handleChange}
                options={props?.branchCatalog}
                labelStyles={{ fontSize: ".800rem" }}
                selectStyles={{ fontSize: ".800rem" }}
                menuStyles={{ fontSize: ".800rem" }}
                label={`Branch`}
                errorMessage={props?.hiringData?.hcPrograms?.errorMessage}
                required={props?.hiringData?.hcPrograms?.isRequired}
                disabled={props?.hiringData?.hcPrograms?.isDisabled}
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}>
            <div className="col-md-4">
              <PgkTextField
                name="noOfPositions"
                onChange={props?.handleJobChange}
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
            <div className="col-md-4">
              <PgkTextField
                name="salaryMaxRange"
                onChange={props?.handleJobChange}
                value={props?.jobFormData?.salaryMaxRange?.value}
                label={"Maximum Salary in LPA"}
                validations={["isNumericWithDecimal"]}
                inputLabelProps={{
                  style: {
                    fontSize: `${props?.cdJob ? ".700rem" : ".800rem"}`,
                  },
                }}
                inputProps={{ style: { fontSize: ".800rem" } }}
                errorMessage={props?.jobFormData?.salaryMaxRange?.errorMessage}
                required={props?.jobFormData?.salaryMaxRange?.isRequired}
                disabled={props?.jobFormData?.salaryMaxRange?.isDisabled}
              />
            </div>
          </div>
        </div>
        <div className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}>
          <div className="col-md-4">
            <PgkTextField
              name="monthOfHiring"
              onChange={props?.handleJobChange}
              value={
                props?.jobFormData?.monthOfHiring?.value
                  ? moment(props?.jobFormData?.monthOfHiring?.value).format(
                    "YYYY-MM-DD"
                  )
                  : null
              }
              label={"Date of hiring"}
              inputLabelProps={{ style: { fontSize: ".800rem" } }}
              inputProps={{
                style: { fontSize: ".800rem" },
                min: moment().format("YYYY-MM-DD"),
              }}
              errorMessage={props?.jobFormData?.monthOfHiring?.errorMessage}
              required={props?.jobFormData?.monthOfHiring?.isRequired}
              disabled={props?.jobFormData?.monthOfHiring?.isDisabled}
              type={"date"}
            />
          </div>
          <div className="col-md-4">
            {" "}
            <div
              className="dataField"
              style={{ position: "relative", top: "-26px" }}
            >
              <label
                style={{
                  fontSize: "0.8rem",
                  position: "relative",
                  top: "3px",
                }}
              >
                Location *
              </label>
              <div>
                <input
                  className="dataFieldInput"
                  list="cities"
                  name="location"
                  ref={location}
                  onChange={props?.handleRadio}
                />
              </div>
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
                  top: "-30px",
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
            <PgkSelectField
              name="yearOfPassing"
              onChange={props?.handleChange}
              value={
                props?.hiringData?.yearOfPassing?.value === 0
                  ? "1000"
                  : props?.hiringData?.yearOfPassing?.value
              }
              label={"Year of Passing"}
              options={yearOfPassingOptions}
              labelStyles={{
                fontSize: ".800rem",
                background: "#fff",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
              selectStyles={{ fontSize: ".800rem" }}
              menuStyles={{ fontSize: ".800rem" }}
              errorMessage={props?.hiringData?.yearOfPassing?.errorMessage}
              required={props?.hiringData?.yearOfPassing?.isRequired}
              disabled={props?.hiringData?.yearOfPassing?.isDisabled}
            />
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}>
            <div className="col-md-4">
              <PgkTextField
                name="minimumCutoffPercentage10th"
                onChange={props?.handleChange}
                value={props?.hiringData?.minimumCutoffPercentage10th?.value}
                label={"Cutoff Percentage 10th"}
                validations={[
                  "isNumericWithDecimal",
                  "min_35.00",
                  "max_100.00",
                ]}
                inputLabelProps={{ style: { fontSize: ".800rem" } }}
                inputProps={{ style: { fontSize: ".800rem" } }}
                errorMessage={
                  props?.hiringData?.minimumCutoffPercentage10th?.errorMessage
                }
                required={
                  props?.hiringData?.minimumCutoffPercentage10th?.isRequired
                }
                disabled={
                  props?.hiringData?.minimumCutoffPercentage10th?.isDisabled
                }
              />
            </div>
            {props?.hiringData?.programID?.value !== "Diploma" &&
              props?.hiringData?.programID?.value !== "ADP" &&
              props?.hiringData?.programID?.value !== "ITI" ? (
              <>
                <div className="col-md-4">
                  <PgkTextField
                    name="minimumCutoffPercentage12th"
                    onChange={props?.handleChange}
                    value={
                      props?.hiringData?.minimumCutoffPercentage12th?.value
                    }
                    label={"Cutoff Percentage 12th"}
                    validations={[
                      "isNumericWithDecimal",
                      "min_35.00",
                      "max_100.00",
                    ]}
                    inputLabelProps={{ style: { fontSize: ".800rem" } }}
                    inputProps={{ style: { fontSize: ".800rem" } }}
                    errorMessage={
                      props?.hiringData?.minimumCutoffPercentage12th
                        ?.errorMessage
                    }
                    disabled={
                      props?.hiringData?.minimumCutoffPercentage12th?.isDisabled
                    }
                    required={
                      props?.hiringData?.minimumCutoffPercentage12th?.isRequired
                    }
                  />
                </div>
              </>
            ) : (
              <>
                {props?.hiringData?.programID?.value !== "ITI" ? (
                  <div className="col-md-4">
                    <PgkTextField
                      name="minimumCutoffPercentageDiploma"
                      onChange={props?.handleChange}
                      value={
                        props?.hiringData?.minimumCutoffPercentageDiploma?.value
                      }
                      label={"Cutoff Percentage Diploma"}
                      validations={[
                        "isNumericWithDecimal",
                        "min_35.00",
                        "max_100.00",
                      ]}
                      inputLabelProps={{ style: { fontSize: ".800rem" } }}
                      inputProps={{ style: { fontSize: ".800rem" } }}
                      errorMessage={
                        props?.hiringData?.minimumCutoffPercentageDiploma
                          ?.errorMessage
                      }
                      disabled={
                        props?.hiringData?.minimumCutoffPercentageDiploma
                          ?.isDisabled
                      }
                      required={
                        props?.hiringData?.minimumCutoffPercentageDiploma
                          ?.isRequired
                      }
                    />
                  </div>
                ) : (
                  <div className="col-md-4">
                    <PgkTextField
                      name="minimumCutoffPercentageITI"
                      onChange={props?.handleChange}
                      value={
                        props?.hiringData?.minimumCutoffPercentageITI?.value
                      }
                      label={"Cutoff Percentage ITI"}
                      validations={[
                        "isNumericWithDecimal",
                        "min_35.00",
                        "max_100.00",
                      ]}
                      inputLabelProps={{ style: { fontSize: ".800rem" } }}
                      inputProps={{ style: { fontSize: ".800rem" } }}
                      errorMessage={
                        props?.hiringData?.minimumCutoffPercentageITI
                          ?.errorMessage
                      }
                      disabled={
                        props?.hiringData?.minimumCutoffPercentageITI
                          ?.isDisabled
                      }
                      required={
                        props?.hiringData?.minimumCutoffPercentageITI
                          ?.isRequired
                      }
                    />
                  </div>
                )}
              </>
            )}

            <div className="col-md-4">
              <PgkTextField
                name="minimumCutoffPercentageGrad"
                onChange={props?.handleChange}
                value={props?.hiringData?.minimumCutoffPercentageGrad?.value}
                label={"Cutoff Percentage UG"}
                validations={[
                  "isNumericWithDecimal",
                  "min_35.00",
                  "max_100.00",
                ]}
                inputLabelProps={{ style: { fontSize: ".800rem" } }}
                inputProps={{ style: { fontSize: ".800rem" } }}
                errorMessage={
                  props?.hiringData?.minimumCutoffPercentageGrad?.errorMessage
                }
                required={
                  props?.hiringData?.minimumCutoffPercentageGrad?.isRequired
                }
                disabled={
                  props?.hiringData?.minimumCutoffPercentageGrad?.isDisabled
                }
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}>
            <div className="col-md-6">
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
                      control={<Radio style={{ padding: "5px" }} />}
                      className="radioForm"
                      label="Verified Students"
                    />
                    <FormControlLabel
                      style={{
                        margin: "0px",
                        position: "relative",
                        top: "0px",
                      }}
                      value="false"
                      className="radioForm"
                      control={<Radio style={{ padding: "5px" }} />}
                      label="All Students"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div className="col-md-4">
              <PgkTextField
                name="numberOfAllowedBacklogs"
                onChange={props?.handleChange}
                value={
                  props?.hiringData?.numberOfAllowedBacklogs.value
                    ? String(props?.hiringData?.numberOfAllowedBacklogs.value)
                    : null
                }
                label={"How many Backlogs?"}
                inputLabelProps={{ style: { fontSize: ".800rem" } }}
                inputProps={{ style: { fontSize: ".800rem" } }}
                validations={["isNumeric", "min_0", "max_25"]}
                errorMessage={
                  props?.hiringData?.numberOfAllowedBacklogs?.errorMessage
                }
                required={
                  props?.hiringData?.numberOfAllowedBacklogs?.isRequired
                }
                disabled={
                  props?.hiringData?.numberOfAllowedBacklogs?.isDisabled
                }
              />
            </div>
            <div className="col-md-2">
              <PgkSelectField
                name="status"
                value={props?.jobFormData?.status?.value}
                onChange={props?.handleJobChange}
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

        <div style={{ marginBottom: "20px" }}>
          <div className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}>
            <div className="col-md-12">
              <PgkTextField
                name="remarks"
                value={props?.jobFormData?.remarks?.value}
                label={"Remarks"}
                required={props?.jobFormData?.remarks?.isRequired}
                disabled={props?.jobFormData?.remarks?.isDisabled}
                errorMessage={props?.jobFormData?.remarks?.errorMessage}
                onChange={props?.handleJobChange}
                inputLabelProps={{ style: { fontSize: ".800rem" } }}
                inputProps={{ style: { fontSize: ".800rem" } }}
                multiline={true}
                minRows={6}
                autoFocus={false}
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}>
            <div className="col-md-12">
              <div className={"col-md mt-3"}>
                <div
                  className="row d-flex justify-content-center align-items-center"
                  style={{ margin: 0, padding: 0 }}
                >
                  <div
                    className={`col-md-${props?.jobFormData?.attachment?.value?.attachment
                      ? "11"
                      : "12"
                      }`}
                    style={{ margin: 0, padding: 0 }}
                  >
                    <div className="d-attach">
                      {/* {props?.jobFormData?.attachment?.value?.attachmentName ? (
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
                                  props?.resetFile("attachment");
                                }
                              }}
                            />
                          ) : null}
                        </div>
                      ) : null} */}
                      <label
                        htmlFor="attachment"
                        className="file_label"
                        style={{ fontWeight: 'bold', color: '#0D6EFD' }}
                      >
                       Attachment *
                        {/* {" "}
                        <p className="fas fa-paperclip mr-2"> Attachment *</p> */}
                      </label>
                      <div>
                        <input
                          type="file"
                          onChange={(e) => {
                            if (props?.fileHandler) {
                              props?.fileHandler("attachment", e);
                            }
                          }}
                          className="attach-inp"
                          name="attachment"
                          accept=".pdf"
                          disabled={props?.jobFormData?.attachment?.isDisabled}
                          id="attachment"
                        />
                        <p className="attach-inp_label">
                          {props?.jobFormData?.attachment?.value
                            ?.attachmentName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Disabling The Download option for Attachment by -MSU March 10 */}

                  {/* {props?.jobFormData?.attachment?.value?.attachment && (
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
                                props?.jobFormData.attachment.value.attachment,
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
                  )} */}
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
          {props?.hiringData?.publishFlag?.value === false ? (
            <div
              className={`row m-0 ${props?.cdJob ? " w-full" : ""}`}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="text-center mt-4" style={{ alignSelf: "center" }}>
                <div className="text-center mt-4">
                  {props?.mode !== "EDIT" && JobID !== "" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => props?.editDetails(JobID, true)}
                        className="btn ml-4"
                      >
                        {"Edit"}
                      </button>{" "}
                      <button
                        type="button"
                        onClick={props?.openCloseModal}
                        className="btn ml-4"
                      >
                        {"Cancel"}
                      </button>{" "}
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={props?.openCloseModal}
                        className="btn ml-4"
                      >
                        {"Cancel"}
                      </button>{" "}
                      <button
                        type="button"
                        onClick={() => handleSubmit(JobID)}
                        className="btn mr-4"
                      >
                        {"Save"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </form>
  );
};

export default HiringCriteriaFormCmp;
