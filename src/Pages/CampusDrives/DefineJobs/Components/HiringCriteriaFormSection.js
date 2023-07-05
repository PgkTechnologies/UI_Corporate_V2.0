//CampusDrive - 2
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PgkSelectField from "../../../../Components/FormFields/PgkSelectField";
import { actionGetDependencyLookUpsSagaAction } from "../../../../Store/Actions/SagaActions/CommonSagaActions";
import HiringCriteriaForm from "./HiringCriteriaForm";
 
const HiringCriteriaFormSection = (props) => {
  const { JobID } = props;
  const { hcId } = props;
  const [section, setSection] = useState({
    firstSection: true,
    secondSection: false,
  });

  useEffect(() => {
    console.log(JobID);
    if (JobID) {
      setSection({
        firstSection: false,
        secondSection: true,
      });
    } else {
      setSection({
        firstSection: true,
        secondSection: false,
      });
    }
  }, []);

  const hiringCriteriaInitialData = {
    programID: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
    hiringCriteriaName: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
    minimumCutoffPercentage10th: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
    minimumCutoffPercentage12th: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
    minimumCutoffCGPAGrad: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
    minimumCutoffPercentageGrad: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
    eduGapsAllowed: {
      value: false,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
    eduGapsSchoolAllowed: {
      value: false,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    eduGaps11N12Allowed: {
      value: false,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    eduGaps12NGradAllowed: {
      value: false,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    eduGapsGradAllowed: {
      value: false,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    eduGapsGradNPGAllowed: {
      value: false,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    allowActiveBacklogs: {
      value: false,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
    numberOfAllowedBacklogs: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    eduGapsSchool: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    eduGaps11N12: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    eduGaps12NGrad: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    eduGapsGrad: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    eduGapsGradNPG: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: true,
    },
    yearOfPassing: {
      value: undefined,
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
    remarks: {
      value: undefined,
      errorMessage: undefined,
      isRequired: false,
      isDisabled: false,
    },
    hcPrograms: {
      value: [],
      errorMessage: undefined,
      isRequired: true,
      isDisabled: false,
    },
  };

  const [lookUpData, setLookUpData] = useState([]);
  const [hiringCriteriaList, setHiringCriteriaList] = useState([]);
  const [hiringCriteriaData, setHiringCriteriaData] = useState(
    hiringCriteriaInitialData
  );

  const initialHiringCriteriaData = {
    hiringCriteria: {
      value: undefined,
      isRequired: true,
      isDisabled: false,
      errorMessage: undefined,
    },
  };

  const [selectedHiringCriteria, setSelectedHiringCriteria] = useState(
    initialHiringCriteriaData
  );

  const selectHiringCriteriaHandler = (
    name,
    value,
    errorMessage = undefined
  ) => {
    let data = selectedHiringCriteria[name];
    data["value"] = value;
    data["errorMessage"] = errorMessage;

    setSelectedHiringCriteria((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actionGetDependencyLookUpsSagaAction({
        apiPayloadRequest: [
          "branchCatalog",
          "programCatalog",
          "skills",
          "jobType",
        ],
        callback: dropdowns,
      })
    );
  }, []);

  const dropdowns = (data) => {
    setLookUpData(data);
  };

  useEffect(() => {
    if (props?.hiringCriteriaList?.length) {
      setHiringCriteriaList(props?.hiringCriteriaList);

      // if (props?.hcId) {
      //   setSection({
      //     firstSection: false,
      //     secondSection: true,
      //   });
      //   const selectedHiringCriteriaData = props?.hiringCriteriaList.filter(
      //     (item) => {
      //       if (item.hiringCriteriaID === props?.hcId) {
      //         return { ...item };
      //       }
      //     }
      //   );

      //   if (selectedHiringCriteriaData?.length) {
      //     selectHiringCriteriaHandler(
      //       "hiringCriteria",
      //       selectedHiringCriteriaData[0].hiringCriteriaID
      //     );
      //     prepareHiringCriteria(
      //       selectedHiringCriteriaData[0],
      //       props?.mode === "VIEW" ? false : true
      //     );
      //   }
      // }
    }
  }, [props?.hiringCriteriaList, props?.hcId, props?.mode]);

  const prepareHiringCriteria = (hiringData, isEditable = false) => {
    const hiringCriteriaKeys = [
      "allowActiveBacklogs",
      "eduGaps11N12Allowed",
      "eduGaps12NGradAllowed",
      "eduGapsAllowed",
      "eduGapsGradAllowed",
      "eduGapsGradNPGAllowed",
      "eduGapsSchoolAllowed",
      "hiringCriteriaName",
      "remarks",
      "minimumCutoffCGPAGrad",
      "minimumCutoffPercentage10th",
      "minimumCutoffPercentage12th",
      "minimumCutoffPercentageGrad",
      "yearOfPassing",
      "numberOfAllowedBacklogs",
      "eduGaps11N12",
      "eduGaps12NGrad",
      "eduGapsGrad",
      "eduGapsGradNPG",
      "eduGapsSchool",
    ];

    let updatedHiringData = hiringCriteriaInitialData;

    hiringCriteriaKeys.forEach((item) => {
      updatedHiringData[item].value = hiringData[item];
      updatedHiringData[item].isDisabled = isEditable ? false : true;
    });

    hiringCriteriaKeys.forEach((item) => {
      if (item === "allowActiveBacklogs") {
        updatedHiringData["numberOfAllowedBacklogs"].isDisabled = isEditable
          ? !hiringData[item]
          : true;
        updatedHiringData["numberOfAllowedBacklogs"].value =
          hiringData["numberOfAllowedBacklogs"].toString();
      } else if (
        [
          "eduGapsSchool",
          "eduGapsGradNPG",
          "eduGapsGrad",
          "eduGaps12NGrad",
          "eduGaps11N12",
        ].includes(item)
      ) {
        updatedHiringData[item + "Allowed"].isDisabled = isEditable
          ? !hiringData[item]
          : true;
        updatedHiringData[item].isDisabled = isEditable
          ? !hiringData[item + "Allowed"]
          : true;
        updatedHiringData[item].value = hiringData[item].toString();
      }
    });

    updatedHiringData["eduGapsAllowed"].value = [
      "eduGapsSchool",
      "eduGapsGradNPG",
      "eduGapsGrad",
      "eduGaps12NGrad",
      "eduGaps11N12",
    ].some((item) => hiringData[item + "Allowed"] === true);

    const hcBranches = JSON.parse(hiringData["hcProgramsInString"]);

    const updatedHcBranches = hcBranches.map((item) => {
      return {
        value: item.branchID,
        label: item.branchName,
        programID: item.programID,
        programName: item.programName,
      };
    });

    updatedHiringData["hcPrograms"].value = updatedHcBranches;
    updatedHiringData["hcPrograms"].isDisabled = isEditable ? false : true;

    updatedHiringData["programID"].value = hcBranches[0].programID;
    updatedHiringData["programID"].isDisabled = isEditable ? false : true;

    setHiringCriteriaData(updatedHiringData);
  };

  const addHiringCriteria = (body, jobFormData) => {
    if (props?.submitHandler) {
      if (selectedHiringCriteria.hiringCriteria.value === "ADD_NEW_HC") {
        props.submitHandler(body, jobFormData);
      } else {
        const selectedHiringCriteriaData = hiringCriteriaList.filter((item) => {
          if (
            item.hiringCriteriaID ===
            selectedHiringCriteria.hiringCriteria.value
          ) {
            return { ...item };
          }
        });

        if (selectedHiringCriteriaData?.length) {
          body = {
            ...body,
            hiringCriteriaID: selectedHiringCriteriaData[0].hiringCriteriaID,
          };
        }

        props?.submitHandler(body, jobFormData);
      }
    }
  };

  const isValid = () => {
    const keys = ["hiringCriteria"];

    let _isValid = true;

    keys.forEach((item) => {
      if (_isValid) {
        if (
          selectedHiringCriteria[item] &&
          !selectedHiringCriteria[item].isDisabled
        ) {
          if (
            selectedHiringCriteria[item].isRequired &&
            selectedHiringCriteria[item].errorMessage
          ) {
            _isValid = false;
            selectHiringCriteriaHandler(
              item,
              selectedHiringCriteria[item].value,
              "Required"
            );
          } else if (
            selectedHiringCriteria[item].isRequired &&
            (typeof selectedHiringCriteria[item].value === "string" ||
              typeof selectedHiringCriteria[item].value === "number" ||
              typeof selectedHiringCriteria[item].value === "undefined")
          ) {
            if (
              selectedHiringCriteria[item].value === undefined ||
              selectedHiringCriteria[item].value?.toString().trim() === ""
            ) {
              _isValid = false;
              selectHiringCriteriaHandler(
                item,
                selectedHiringCriteria[item].value,
                "Required"
              );
            }
          } else if (
            selectedHiringCriteria[item].isRequired &&
            typeof selectedHiringCriteria[item].value === "object"
          ) {
            if (
              selectedHiringCriteria[item].value === undefined ||
              selectedHiringCriteria[item].value?.length === 0
            ) {
              _isValid = false;
              selectHiringCriteriaHandler(
                item,
                selectedHiringCriteria[item].value,
                "Required"
              );
            }
          }
        }
      }
    });

    return _isValid;
  };

  const moveNext = () => {
    if (isValid()) {
      if (selectedHiringCriteria.hiringCriteria.value === "ADD_NEW_HC") {
        setSection((prevState) => ({
          ...prevState,
          firstSection: false,
          secondSection: true,
        }));
      } else {
        const selectedHiringCriteriaData = hiringCriteriaList.filter((item) => {
          if (
            item.hiringCriteriaID ===
            selectedHiringCriteria.hiringCriteria.value
          ) {
            return { ...item };
          }
        });

        if (selectedHiringCriteriaData?.length) {
          prepareHiringCriteria(selectedHiringCriteriaData[0], true);
        }

        setSection((prevState) => ({
          ...prevState,
          firstSection: false,
          secondSection: true,
        }));
      }
    }
  };

  return (
    <>
      {section.firstSection ? (
        <div className={"row center"} style={{ height: "350px" }}>
          <div style={{ width: '50%' , marginLeft:'297px',marginTop:'100px'}}>
          <PgkSelectField
            name="hiringCriteria"
            value={selectedHiringCriteria?.hiringCriteria?.value}
            onChange={selectHiringCriteriaHandler}
            label={`Create New Job`}
            options={
              hiringCriteriaList?.length
                ? hiringCriteriaList
                    .filter((x) => x.hiringCriteriaID === "ADD_NEW_HC")
                    .map((item) => {
                      return {
                        value: item.hiringCriteriaID,
                        label: item.hiringCriteriaName,
                        iconName: item?.iconName,
                      };
                    })
                : []
            }
            labelStyles={{ fontSize: ".800rem", background:"#fff", paddingLeft:"13px", paddingRight:"3px" }}
            selectStyles={{ fontSize: ".800rem" }}
            menuStyles={{ fontSize: ".800rem" }}
            errorMessage={selectedHiringCriteria?.hiringCriteria?.errorMessage}
            required={selectedHiringCriteria?.hiringCriteria?.isRequired}
            disabled={selectedHiringCriteria?.hiringCriteria?.isDisabled} 
          />
          </div>
          <div className="m-0 p-0" style={{ alignSelf: "flex-start" }}>
            <button
              type="button"
              onClick={props?.cancelHandler}
              style={{ marginLeft:'400px',  width: "120px" }}
              className="btn ml-0 mr-4"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={moveNext}
              style={{ marginLeft:'37px', width: "120px" }}
              className="btn mr-0 ml-4"
            >
              Next
            </button>
          </div>
        </div>
      ) : section.secondSection ? (
        //HC Data using
        <HiringCriteriaForm
          addHiringCriteria={addHiringCriteria}
          lookUpData={lookUpData}
          JobID={JobID}
          setSection={setSection}
          noHeading
          isNew
          openCloseModal={
            props?.mode === "VIEW"
              ? () => {
                  if (props?.updateMode) {
                    props.updateMode("EDIT");
                  }
                }
              : props?.cancelHandler
          }
          hiringCriteriaFormStyles={{ backgroundColor: "white", padding: 0 }}
          hiringCriteriaData={hiringCriteriaData}
          noEditBtn={props?.noEditBtn}
          hcId={hcId}
          // editLabel={
          //   props?.mode === "VIEW"
          //     ? "EDIT"
          //     : ["EDIT", "ADD"].includes(props?.mode)
          //     ? "Save"
          //     : ""
          // }
          // saveLabel={
          //   props?.mode === "VIEW"
          //     ? props?.saveLabel
          //       ? props?.saveLabel
          //       : "Save"
          //     : ["EDIT", "ADD"].includes(props?.mode)
          //     ? "Save"
          //     : ""
          // }
        />
      ) : undefined}
    </>
  );
};

export default HiringCriteriaFormSection;
