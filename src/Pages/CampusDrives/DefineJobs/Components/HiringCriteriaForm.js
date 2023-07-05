//CampusDrive - 3
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import moment from "moment";
import { HiringSagaAction } from "../../../../Store/Actions/SagaActions/HiringSagaAction";
import { EditCampusDriveJobsSagaAction, GetJobByIdSagaAction, GetJobByIdSagaActionCampusDrive } from "../../../../Store/Actions/SagaActions/JobsSagaAction";
import HiringCriteriaFormCmp from "./HiringCriteriaFormCmp";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const HiringCriteriaForm = (props) => {
  const { hcId } = props;
  const { JobID } = props;
  const dispatch = useDispatch();
  const { lookUpData } = props;
  const [mode, setMode] = useState("ADD");
  const { setSection } = props;
  const [hiringCriteria, setHiringCriteria] = useState([]);
  const { openCloseModal } = props;

  const initialJobFormData = {
    jobName: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    jobType: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    skills: {
      value: [],
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    hiringCriteria: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    salaryMinRange: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    salaryMaxRange: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    monthOfHiring: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    remarks: {
      value: undefined,
      isRequired: false,
      isDisabled: false,
      errorMessage: undefined,
    },
    attachment: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    status: {
      value: "open",
      isRequired: true,
      isDisabled: true,
      errorMessage: undefined,
    },
    noOfPositions: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    location: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    verifiedProfilesOnly: {
      value: null,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    hiringCriteriaName: {
      value: null,
    },
    hiringCriteriaID: {
      value: null,
    },
    cdID: {
      value: null,
    },
    jobID: {
      value: null,
    },
  };

  const hiringCriteriaInitialData = {
    programID: {
      value: null,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    yearOfPassing: {
      value: null,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    minimumCutoffPercentage10th: {
      value: null,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    minimumCutoffPercentageDiploma: {
      value: null,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    minimumCutoffPercentageITI: {
      value: null,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    minimumCutoffPercentage12th: {
      value: null,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    minimumCutoffPercentageGrad: {
      value: null,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    hcPrograms: {
      value: [],
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
    allowActiveBacklogs: {
      value: true,
      errorMessage: undefined,
      isRequired: false,
      isDisabled: false,
    },
    numberOfAllowedBacklogs: {
      value: null,
      errorMessage: undefined,
      isRequired: false,
      isDisabled: false,
    },
    publishFlag: {
      value: false,
    },
    hiringCriteriaName: {
      value: null,
    },
    hiringCriteriaID: {
      value: null,
    },
    cdID: {
      value: null,
    },
    jobID: {
      value: null,
    },
  };
  const [saveIDs, setSaveIDs] = useState("");
  const [jobFormData, setJobFormData] = useState(initialJobFormData);
  const [hiringData, setHiringData] = useState(hiringCriteriaInitialData);
  const [programCatalog, setProgramCatalog] = useState([]);
  const [branchCatalog, setBranchCatalog] = useState([]);

  useEffect(() => {
    if (JobID) {
      viewDetails(JobID.id, JobID.cdId, false);
      setSaveIDs(JobID);
      //setMode("EDIT");
    }
  }, []);

  const editDetails = (jobData, isEditable = false) => {
    setSaveIDs(jobData);
    setMode("EDIT");
    viewDetails(jobData.id, jobData.cdId, isEditable);
  };

  const viewDetails = (jobID, cdID, isEditable = false) => {
    //setMode("EDIT");
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
      "hiringCriteriaName",
      "hiringCriteriaID",
      "cdID",
      "jobID",
    ];
    dispatch(
      GetJobByIdSagaActionCampusDrive({
        apiPayloadRequest: { cdID, jobID },
        callback: (jobDetailsResponse) => {
          console.log(jobDetailsResponse, "RESP");
          let updatedJobData = initialJobFormData;
          let updateHCData = hiringCriteriaInitialData;
          if (jobDetailsResponse?.job?.jobID) {
            jobFormFields.forEach((item) => {
              if (item === "attachment") {
                console.log(item);
                updatedJobData[item] = {
                  ...initialJobFormData[item],
                  isDisabled: isEditable
                    ? initialJobFormData[item].isDisabled
                    : true,
                  value: {
                    attachment: jobDetailsResponse.job["attachment"],
                    attachmentName: jobDetailsResponse.job["attachmentName"],
                  },
                };
              } else if (item === "location") {
                updatedJobData[item] = {
                  ...initialJobFormData[item],
                  isDisabled: isEditable
                    ? initialJobFormData[item].isDisabled
                    : true,
                  value: jobDetailsResponse.job["location"],
                };
              } else if (item === "status") {
                updatedJobData[item] = {
                  ...initialJobFormData[item],
                  value: jobDetailsResponse.job["status"],
                  isDisabled: isEditable
                    ? initialJobFormData[item].isDisabled
                    : false,
                };
              } else if (item === "monthOfHiring") {
                updatedJobData[item] = {
                  ...initialJobFormData[item],
                  value: moment(jobDetailsResponse.job.monthOfHiring).format(
                    "YYYY-MM-DD"
                  ),
                  isDisabled: isEditable
                    ? initialJobFormData[item].isDisabled
                    : true,
                };
              } else if (item === "skills") {
                const newSkills = JSON.parse(
                  jobDetailsResponse.job["skillsInString"]
                );
                updatedJobData[item] = {
                  ...initialJobFormData[item],
                  value: newSkills?.length
                    ? newSkills.map((item) => {
                        return { id: item.skillID, text: item.skill };
                      })
                    : [],
                  isDisabled: isEditable
                    ? initialJobFormData[item].isDisabled
                    : true,
                };
              } else if (item === "jobID") {
                updatedJobData["jobID"] = {
                  ...initialJobFormData["jobID"],
                  value: jobDetailsResponse?.job?.jobID,
                };
              } else {
                updatedJobData[item] = {
                  ...initialJobFormData[item],
                  value: jobDetailsResponse.job[item],
                  isDisabled: isEditable
                    ? initialJobFormData[item].isDisabled
                    : true,
                };

                //Storing job data in to hc data //hc name, hc id,
                setHiringData((prevState) => ({
                  ...prevState,
                  cdID: jobDetailsResponse.job["cdID"],
                }));

                updateHCData[item] = {
                  ...hiringCriteriaInitialData[item],
                  value: jobDetailsResponse.job[item],
                };
              }
            });

            setJobFormData({
              ...updatedJobData,
              jobID: jobDetailsResponse.job.jobID,
            });
          }

          //HC DATA VIEW

          if (jobDetailsResponse?.hc?.hiringCriteriaID) {
            console.log(jobDetailsResponse?.hc?.hiringCriteriaID, "ID");

            const hiringCriteriaKeys = [
              "minimumCutoffCGPAGrad",
              "minimumCutoffPercentage10th",
              "minimumCutoffPercentageDiploma",
              "minimumCutoffPercentageITI",
              "minimumCutoffPercentage12th",
              "minimumCutoffPercentageGrad",
              "yearOfPassing",
              "numberOfAllowedBacklogs",
              "allowActiveBacklogs",
              "yearOfPassing",
              "publishFlag",
              "hiringCriteriaName",
              "hiringCriteriaID",
              "cdID",
            ];

            // Adding hiringCriteriaName, hiringCriteriaID, udID to HC data here

            let updatedHiringData = hiringCriteriaInitialData;

            hiringCriteriaKeys.forEach((item) => {
              if (item === "allowActiveBacklogs") {
                updatedHiringData[item] = {
                  ...hiringCriteriaInitialData[item],
                  value: true,
                };
              } else if (item === "cdID") {
                updatedHiringData[item] = {
                  ...hiringCriteriaInitialData[item],
                  value: jobDetailsResponse.job[item],
                };
              } else {
                updatedHiringData[item] = {
                  ...hiringCriteriaInitialData[item],
                  value: jobDetailsResponse.hc[item],
                };
              }

              //updatedHiringData[item].value = jobDetailsResponse.hc[item];
              updatedHiringData[item].isDisabled = isEditable ? false : true;
            });

            // hiringCriteriaKeys.forEach((item) => {
            //   if (item === "allowActiveBacklogs") {
            //     updatedHiringData["numberOfAllowedBacklogs"].isDisabled =
            //       isEditable ? !hiringData[item] : true;
            //     updatedHiringData["numberOfAllowedBacklogs"].value =
            //       hiringData["numberOfAllowedBacklogs"].toString();
            //   } else if (
            //     [
            //       "eduGapsSchool",
            //       "eduGapsGradNPG",
            //       "eduGapsGrad",
            //       "eduGaps12NGrad",
            //       "eduGaps11N12",
            //     ].includes(item)
            //   ) {
            //     updatedHiringData[item + "Allowed"].isDisabled = isEditable
            //       ? !hiringData[item]
            //       : true;
            //     updatedHiringData[item].isDisabled = isEditable
            //       ? !hiringData[item + "Allowed"]
            //       : true;
            //     updatedHiringData[item].value = hiringData[item].toString();
            //   }
            // });

            // updatedHiringData["eduGapsAllowed"].value = [
            //   "eduGapsSchool",
            //   "eduGapsGradNPG",
            //   "eduGapsGrad",
            //   "eduGaps12NGrad",
            //   "eduGaps11N12",
            // ].some((item) => hiringData[item + "Allowed"] === true);

            console.log(updatedHiringData, "GET");

            const hcBranches = JSON.parse(
              jobDetailsResponse?.hc["hcProgramsInString"]
            );

            const updatedHcBranches = hcBranches.map((item) => {
              return {
                value: item.branchID,
                label: item.branchName,
                programID: item.programID,
                programName: item.programName,
              };
            });

            updatedHiringData["hcPrograms"].value = updatedHcBranches;
            updatedHiringData["hcPrograms"].isDisabled = isEditable
              ? false
              : true;

            updatedHiringData["programID"].value = hcBranches[0].programID;
            updatedHiringData["programID"].isDisabled = isEditable
              ? false
              : true;

            setHiringData({
              ...updatedHiringData,
              hiringCriteriaID: jobDetailsResponse.hc.hiringCriteriaID,
              cdID: props?.campusDriveId,
            });
          }

          // if (isEditable) {
          //   openCloseJobModal("EDIT", true);
          //   //setEditable(isEditable);
          // } else {
          //   openCloseJobModal("DETAILS");
          // }

          //setIsNew(false);
          //setEditable(isEditable);
          //setIsOpen(true);

          //setHiringCriteriaActualData(jobDetailsResponse.hc);
        },
      })
    );
  };

  // useEffect(() => {
  //   if (props.hiringCriteriaData) {
  //     setHiringData(props.hiringCriteriaData);
  //   }
  // }, [props?.hiringCriteriaData]);

  useEffect(() => {
    getHiring();
    if (props?.lookUpData?.programCatalog?.length) {
      setProgramCatalog(
        props?.lookUpData?.programCatalog?.map((item) => {
          return { label: item?.programName, value: item?.programCode };
        })
      );
    }
  }, [props?.lookUpData?.programCatalog]);

  // useEffect(() => {
  //   if (props?.hiringCriteriaData?.programID?.value && programCatalog?.length) {
  //     const programObj = programCatalog?.find(
  //       (program) =>
  //         program.value === props?.hiringCriteriaData?.programID?.value
  //     );
  //     const filteredBranches = props.lookUpData?.branchCatalog?.filter(
  //       (branch) =>
  //         branch.programID === props?.hiringCriteriaData?.programID?.value
  //     );
  //     const _branchCatalog = filteredBranches.map((item) => ({
  //       value: item.branchID,
  //       label: item.branchName,
  //       programID: item.programID,
  //       programName: programObj.label,
  //     }));
  //     setBranchCatalog(_branchCatalog);
  //   }
  // }, [props?.hiringCriteriaData?.programID?.value, programCatalog?.length]);

  const enableEduGaps = (value) => {
    let eduGapsAllowedRadioButtons = {};
    [
      "eduGapsSchoolAllowed",
      "eduGaps11N12Allowed",
      "eduGaps12NGradAllowed",
      "eduGapsGradAllowed",
      "eduGapsGradNPGAllowed",
    ].forEach((item) => {
      eduGapsAllowedRadioButtons[item] = {
        value: hiringData[item].value,
        errorMessage: hiringData[item].errorMessage,
        isRequired: hiringData[item].isRequired,
        isDisabled: !value,
      };
    });

    let eduGapsAllowedFields = {};
    [
      "eduGapsSchool",
      "eduGaps11N12",
      "eduGaps12NGrad",
      "eduGapsGrad",
      "eduGapsGradNPG",
    ].forEach((item) => {
      eduGapsAllowedFields[item] = {
        value: hiringData[item].value,
        errorMessage: hiringData[item].errorMessage,
        isRequired: hiringData[item].isRequired,
        isDisabled: value ? !hiringData[item + "Allowed"].value : !value,
      };
    });

    setHiringData((prevState) => ({
      ...prevState,
      ...eduGapsAllowedRadioButtons,
      ...eduGapsAllowedFields,
    }));
  };

  const enableEduGapField = (name, value) => {
    let data = hiringData[name.replace("Allowed", "")];
    data["isDisabled"] = !value;
    data["errorMessage"] = undefined;

    setHiringData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const enableActiveBacklogsField = (value) => {
    setHiringData((prevState) => ({
      ...prevState,
      numberOfAllowedBacklogs: {
        ...prevState.numberOfAllowedBacklogs,
        isDisabled: !value,
        errorMessage: undefined,
      },
    }));
  };

  const handleChange = (name, value, errorMessage) => {
    console.log(name, value, "UPDATE");
    switch (name) {
      case "programID":
        const programObj = lookUpData?.programCatalog?.find(
          (program) => program.programCode === value
        );

        console.log(programObj, "PRO");
        const filteredBranches = lookUpData?.branchCatalog?.filter(
          (branch) => branch.programID === value
        );
        const _branchCatalog = filteredBranches.map((item) => ({
          value: item.branchID,
          label: item.branchName,
          programID: item.programID,
          programName: programObj.programName,
        }));
        setBranchCatalog(_branchCatalog);
        updateHCField(name, value, errorMessage);
        updateHCField("hcPrograms", [], errorMessage);
        //setHCData("hcPrograms", []);
        break;
      case "minimumCutoffPercentage10th":
      case "minimumCutoffPercentageDiploma":
      case "minimumCutoffPercentageITI":
      case "minimumCutoffPercentage12th":
      case "minimumCutoffCGPAGrad":
      case "minimumCutoffPercentageGrad":
      case "hcPrograms":
      case "numberOfAllowedBacklogs":
        updateHCField(name, value, errorMessage);
        break;
      case "yearOfPassing":
        updateHCField(name, value, errorMessage);
        break;
      // case "eduGapsAllowed":
      //   updateHCField(name, value, errorMessage);
      //   props?.enableEduGaps(value);
      //   break;
      // case "allowActiveBacklogs":
      //   updateHCField(name, value, errorMessage);
      //   props?.enableActiveBacklogsField(value);
      //   break;
      // case "eduGapsSchoolAllowed":
      // case "eduGaps11N12Allowed":
      // case "eduGaps12NGradAllowed":
      // case "eduGapsGradAllowed":
      // case "eduGapsGradNPGAllowed":
      //   updateHCField(name, value, errorMessage);
      //   props?.enableEduGapField(name, value);
      //   break;
      default:
        break;
    }

    if (
      hiringData?.programID?.value === "Diploma" ||
      hiringData?.programID?.value === "ADP" ||
      hiringData?.programID?.value === "ITI"
    ) {
      if (
        hiringData?.programID?.value !== "ITI" ||
        hiringData?.programID?.value === "ADP"
      ) {
        let dataOne = hiringData["minimumCutoffPercentageDiploma"];
        let dataTwo = hiringData["minimumCutoffPercentageITI"];
        let dataThree = hiringData["minimumCutoffPercentage12th"];
        dataOne["isRequired"] = true;
        dataTwo["value"] = 0;
        dataThree["value"] = 0;
        setHiringData((prevState) => ({
          ...prevState,
          ...dataOne,
        }));
        dataTwo["isRequired"] = false;
        dataTwo["value"] = 0;
        setHiringData((prevState) => ({
          ...prevState,
          ...dataTwo,
        }));
        dataThree["isRequired"] = false;
        dataThree["value"] = 0;
        setHiringData((prevState) => ({
          ...prevState,
          ...dataThree,
        }));
      } else {
        let dataOne = hiringData["minimumCutoffPercentageITI"];
        dataOne["isRequired"] = true;
        setHiringData((prevState) => ({
          ...prevState,
          ...dataOne,
        }));
        let dataTwo = hiringData["minimumCutoffPercentage12th"];
        dataTwo["isRequired"] = false;
        dataTwo["value"] = 0;
        setHiringData((prevState) => ({
          ...prevState,
          ...dataTwo,
        }));
        let dataThree = hiringData["minimumCutoffPercentageDiploma"];
        dataThree["isRequired"] = false;
        dataThree["value"] = 0;
        setHiringData((prevState) => ({
          ...prevState,
          ...dataThree,
        }));
      }
    } else {
      let dataOne = hiringData["minimumCutoffPercentageDiploma"];
      dataOne["isRequired"] = false;
      dataOne["value"] = 0;
      setHiringData((prevState) => ({
        ...prevState,
        ...dataOne,
      }));
      let dataTwo = hiringData["minimumCutoffPercentageITI"];
      dataTwo["isRequired"] = false;
      dataTwo["value"] = 0;
      setHiringData((prevState) => ({
        ...prevState,
        ...dataOne,
      }));
      let data = hiringData["minimumCutoffPercentage12th"];
      data["isRequired"] = true;
      setHiringData((prevState) => ({
        ...prevState,
        ...data,
      }));
    }
  };

  //Changing here
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
    "hiringCriteriaName",
    "hiringCriteriaID",
    "cdID",
    "jobID",
  ];

  const getHiring = () => {
    dispatch(HiringSagaAction({ callback: getAllHirings }));
  };
  const getAllHirings = (data) => {
    setHiringCriteria(data);
  };

  // HC DATA SENDING TO Parent
  const handleSubmit = (model) => {
    console.log("jobFormData");
    let finalHiringCriteria = {};
    let updatedJobData = {};
    jobFormFields.forEach((item) => {
      if (item === "attachment") {
        updatedJobData["attachment"] = jobFormData[item].value.attachment;
        updatedJobData["attachmentName"] =
          jobFormData[item].value.attachmentName;
      } else if (item === "jobID") {
        updatedJobData[item] = jobFormData[item];
      } else if (item === "skills") {
        console.log(jobFormData[item], "SKILL");
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

    //Check EDIT MODE

    if (mode === "EDIT") {
      //Both Sending Job and HC data on Edit
      console.log("EDIT");
      const cutOffKeys = [
        "minimumCutoffPercentage10th",
        "minimumCutoffPercentage12th",
        "minimumCutoffPercentageGrad",
        "minimumCutoffPercentageDiploma",
        "minimumCutoffPercentageITI",
        "numberOfAllowedBacklogs",
        "yearOfPassing",
        "hiringCriteriaName",
        "hiringCriteriaID",
        "cdID",
        "jobID",
      ];

      console.log(jobFormData, "DATA");

      cutOffKeys.forEach((item) => {
        if (item === "hiringCriteriaName") {
          finalHiringCriteria[item] = jobFormData["hiringCriteriaName"].value;
        } else if (item === "hiringCriteriaID") {
          finalHiringCriteria[item] = jobFormData["hiringCriteriaID"].value;
        } else if (item === "cdID") {
          finalHiringCriteria[item] = jobFormData["cdID"].value;
        } else if (item === "jobID") {
          finalHiringCriteria[item] = jobFormData["jobID"].value;
        } else {
          finalHiringCriteria[item] = hiringData[item].value
            ? parseFloat(hiringData[item].value)
            : 0;
        }
      });

      let updatedHcPropgrams = [];
      if (hiringData["hcPrograms"].value?.length) {
        updatedHcPropgrams = hiringData["hcPrograms"].value.map((item) => {
          return {
            branchID: item.value,
            branchName: item.label,
            programID: item.programID,
            programName: item.programName,
          };
        });
      }

      finalHiringCriteria["hcPrograms"] = updatedHcPropgrams;
      console.log(updatedJobData, finalHiringCriteria, "final");
      dispatch(
        EditCampusDriveJobsSagaAction({
          apiPayloadRequest: {
            jobID: saveIDs.id,
            hcID: saveIDs.cdId,
            req: { job: updatedJobData, hc: finalHiringCriteria },
          },
          callback: (addJobsResp) => {
            setMode("ADD");
            props.openCloseModal();
          },
        })
      );
    } else {
      const cutOffKeys = [
        "minimumCutoffPercentage10th",
        "minimumCutoffPercentage12th",
        "minimumCutoffPercentageGrad",
        "minimumCutoffPercentageDiploma",
        "minimumCutoffPercentageITI",
        "numberOfAllowedBacklogs",
        "yearOfPassing",
      ];

      let finalHiringCriteria = {};

      cutOffKeys.forEach((item) => {
        finalHiringCriteria[item] = hiringData[item].value
          ? parseFloat(hiringData[item].value)
          : 0;
      });
      let updatedHcPropgrams = [];
      if (hiringData["hcPrograms"].value?.length) {
        updatedHcPropgrams = hiringData["hcPrograms"].value.map((item) => {
          return {
            branchID: item.value,
            branchName: item.label,
            programID: item.programID,
            programName: item.programName,
          };
        });
      }
      finalHiringCriteria["hcPrograms"] = updatedHcPropgrams;
      if (props?.addHiringCriteria) {
        props?.addHiringCriteria(finalHiringCriteria, jobFormData); // passing data to parent
      }
    }
  };

  // const handleSubmit = (event) => {
  //   if (isValid()) {
  //     const hiringCriteriaKeys = [
  //       "allowActiveBacklogs",
  //       "eduGaps11N12Allowed",
  //       "eduGaps12NGradAllowed",
  //       "eduGapsAllowed",
  //       "eduGapsGradAllowed",
  //       "eduGapsGradNPGAllowed",
  //       "eduGapsSchoolAllowed",
  //       "hiringCriteriaName",
  //       "remarks",
  //     ];

  //     const cutOffKeys = [
  //       "minimumCutoffPercentage10th",
  //       "minimumCutoffPercentage12th",
  //       "minimumCutoffPercentageGrad",
  //       "yearOfPassing",
  //     ];

  //     let finalHiringCriteria = {};

  //     hiringCriteriaKeys.forEach((item) => {
  //       finalHiringCriteria[item] = hiringData[item].value;
  //     });

  //     cutOffKeys.forEach((item) => {
  //       finalHiringCriteria[item] = hiringData[item].value
  //         ? parseFloat(hiringData[item].value)
  //         : 0;
  //     });

  //     const activeBackLogKeys = ["numberOfAllowedBacklogs"];

  //     if (hiringData["allowActiveBacklogs"].value) {
  //       activeBackLogKeys.forEach((item) => {
  //         finalHiringCriteria[item] = hiringData[item].value
  //           ? parseInt(hiringData[item].value)
  //           : 0;
  //       });
  //     } else {
  //       activeBackLogKeys.forEach((item) => {
  //         finalHiringCriteria[item] = 0;
  //       });
  //     }

  //     const eduGapsKeys = [
  //       "eduGaps11N12",
  //       "eduGaps12NGrad",
  //       "eduGapsGrad",
  //       "eduGapsGradNPG",
  //       "eduGapsSchool",
  //     ];

  //     if (hiringData["eduGapsAllowed"].value) {
  //       eduGapsKeys.forEach((item) => {
  //         finalHiringCriteria[item] = hiringData[item + "Allowed"].value
  //           ? hiringData[item].value
  //             ? parseFloat(hiringData[item].value)
  //             : 0
  //           : 0;
  //       });
  //     } else {
  //       eduGapsKeys.forEach((item) => {
  //         finalHiringCriteria[item] = 0;
  //       });
  //     }

  //     let updatedHcPropgrams = [];

  //     if (hiringData["hcPrograms"].value?.length) {
  //       updatedHcPropgrams = hiringData["hcPrograms"].value.map((item) => {
  //         return {
  //           branchID: item.value,
  //           branchName: item.label,
  //           programID: item.programID,
  //           programName: item.programName,
  //         };
  //       });
  //     }

  //     finalHiringCriteria["hcPrograms"] = updatedHcPropgrams;

  //     if (props?.addHiringCriteria) {
  //       props.addHiringCriteria(finalHiringCriteria);
  //     }
  //   }
  // };

  const updateField = (name, value, errorMessage = undefined) => {
    let data = jobFormData[name];
    console.log(data, "UPDATE");
    data["value"] = value;
    data["errorMessage"] = errorMessage;

    setJobFormData((prevState) => ({
      ...prevState,
      ...data,
    }));

    console.log(jobFormData, "AFTER UPDATE");
  };

  const updateHCField = (name, value, errorMessage) => {
    let data = hiringData[name];
    data["value"] = value;
    data["errorMessage"] = errorMessage;
    setHiringData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const handleJobChange = (name, value, errorMessage) => {
    switch (name) {
      case "jobName":
      case "jobType":
      case "hiringCriteria":
      case "noOfPositions":
      case "monthOfHiring":
      case "location":
      case "status":
      case "programID":
      case "remarks":
        updateField(name, value, errorMessage);
        break;
      case "salaryMinRange":
      case "salaryMaxRange":
        validateMinAndMaxSalary(name, value, errorMessage);
        break;
      case "skills":
        // console.log(value, 'SKIL')// getting values id: text:
        let updatedSkills = value.map((skills) => {
          return {
            id: skills.id,
            text: skills.text,
          };
        });
        // updateField(name, updatedSkills, errorMessage);
        console.log(updatedSkills, "SET");
        validateSkills(name, updatedSkills, errorMessage);
        break;
      default:
        break;
    }
  };

  const validateSkills = (name, value, errorMessage) => {
    console.log(value, "DDD");
    switch (name) {
      case "skills":
        if (value !== [] || jobFormData?.skills?.value !== undefined) {
          updateField(name, value, errorMessage);
        } else {
          updateField(name, value, errorMessage);
        }
        break;
      default:
        break;
    }
  };

  const validateMinAndMaxSalary = (name, value, errorMessage) => {
    switch (name) {
      case "salaryMinRange":
        if (
          value !== undefined &&
          jobFormData?.salaryMaxRange?.value !== undefined &&
          parseFloat(value) > parseFloat(jobFormData?.salaryMaxRange?.value)
        ) {
          updateField(name, value, "Invalid Minimum Range");
        } else {
          updateField(name, value, errorMessage);
        }
        break;
      case "salaryMaxRange":
        if (
          value !== undefined &&
          jobFormData?.salaryMinRange?.value !== undefined &&
          parseFloat(value) < parseFloat(jobFormData?.salaryMinRange?.value)
        ) {
          updateField(name, value, "Invalid Maximum Range");
        } else {
          updateField(name, value, errorMessage);
        }
        break;
      default:
        break;
    }
  };

  const handleRadio = (name, value, errorMessage) => {
    let radioName = name.target.name;
    let dataListVal = name.target.value;
    let myBool = dataListVal.toLowerCase() === "true"; // Changing sting to boolean
    console.log(typeof myBool, radioName);
    switch (radioName) {
      case "verifiedProfilesOnly":
        updateField(radioName, myBool, errorMessage);
        break;
      case "location":
        updateField(radioName, dataListVal, errorMessage);
        break;
      default:
        break;
    }
  };

  const fileHandler = (name, e, _errorMessage = undefined) => {
    if (_errorMessage) {
      let data = jobFormData[name];
      data["value"] = undefined;
      data["errorMessage"] = _errorMessage;

      setJobFormData((prevState) => ({
        ...prevState,
        ...data,
      }));

      return;
    }

    const file = e.target.files[0];
    if (!file) {
      return;
    }

    let errorMessage = undefined;

    if (parseFloat((e.target.files[0].size / 1024).toFixed(2)) > 5000) {
      errorMessage = "Please select file below 5 MB";
    }

    // dispatch(actionUpdateGlobalLoaderSagaAction(true));
    if (e.target.files[0].length < 250) {
    }
    try {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onloadend = () => {
        let data = jobFormData[name];
        data["value"] = {
          attachment: btoa(reader.result),
          attachmentName: e.target.files[0].name,
        };
        data["errorMessage"] = errorMessage;

        setJobFormData((prevState) => ({
          ...prevState,
          ...data,
        }));
      };

      reader.onerror = () => {
        toast.error("Something went wrong!");
      };
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      // dispatch(actionUpdateGlobalLoaderSagaAction(false));
    }
  };

  return (
    <div className="hiring-modal pb-2" style={{ backgroundColor: "white" }}>
      {props?.noHeading ? undefined : (
        <div className="modal-header hiring-modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {props?.isNew
              ? "Create a new Hiring Criteria"
              : props?.editable
              ? "Update Hiring Criteria"
              : "Hiring Criteria Info"}
          </h5>
          <IconButton
            style={{ color: "red", marginTop: "-10px" }}
            onClick={props?.openCloseModal}
            component="span"
          >
            <Close />
          </IconButton>
        </div>
      )}
      <HiringCriteriaFormCmp
        hiringData={hiringData}
        setSection={setSection}
        branchCatalog={branchCatalog}
        programCatalog={programCatalog}
        editable={props?.editable}
        openCloseModal={openCloseModal}
        lookUpData={lookUpData}
        viewDetails={viewDetails}
        editDetails={editDetails}
        JobID={JobID}
        handleSubmit={handleSubmit}
        isNew={props?.isNew}
        updateField={updateField}
        handleRadio={handleRadio}
        fileHandler={fileHandler}
        editHc={props?.editHc}
        noEditBtn={props?.noEditBtn}
        saveLabel={props?.saveLabel}
        editLabel={props?.editLabel}
        jobFormData={jobFormData}
        updateHCField={updateHCField}
        handleChange={handleChange}
        handleJobChange={handleJobChange}
        hiringCriteriaFormStyles={props?.hiringCriteriaFormStyles}
        mode={mode}
      />
    </div>
  );
};

export default HiringCriteriaForm;
