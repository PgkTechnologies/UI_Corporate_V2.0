import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PgkTextField from "../../../../Components/FormFields/PgkTextField";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import moment from "moment";
import { isFirstDateSameOrBefore } from "../../../../utils/utils";
import Checkbox from "@material-ui/core/Checkbox";
import { actionGetCampusDriveDatesFinalizationRequestSaga, actionSaveOrEditCampusDriveDatesFinalizationRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";
import { TextField } from "@material-ui/core";
import { Modal, ModalBody } from 'reactstrap'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CustomToastModal from "../../../../Components/CustomToastModal";
// import CustomToastModal from "../../../../../../Components/CustomToastModal";

const datesFinalizationFormFields = ["startDate", "endDate", "location"];

const CampusDriveDatesFinalizationSection = (props) => {
    const initialDatesFinalizationSectionForm = {
        startDate: {
            value: undefined,
            errorMessage: undefined,
            isRequired: true,
            isDisabled: false,
        },
        endDate: {
            value: undefined,
            errorMessage: undefined,
            isRequired: true,
            isDisabled: false,
        },
        location: {
            value: undefined,
            errorMessage: undefined,
            isRequired: false,
            isDisabled: false,
        },
    };

    const [
        campusDriveDatesFinalizationForm,
        setCampusDriveDatesFinalizationForm,
    ] = useState(initialDatesFinalizationSectionForm);
    const [isOld, setIsOld] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [requestType, setRequestType] = useState("");
    const dispatch = useDispatch();
    const startDateValue = useRef();

    const [showAlert, setShowAlert] = useState();

    const getCDDatesFinalization = () => {
        dispatch(
            actionGetCampusDriveDatesFinalizationRequestSaga({
                apiPayloadRequest: {
                    campusDriveId: props?.campusDriveId,
                },
                callback: (response) => {
                    setRequestType(response.requestType);
                    if (
                        response?.startDate?.trim() !== "" &&
                        response?.endDate?.trim() !== ""
                    ) {
                        setIsOld(true);
                        const data = {
                            startDate: {
                                ...campusDriveDatesFinalizationForm.startDate,
                                value: moment(response?.startDate)
                                    .format("YYYY-MM-DD")
                                    .toString(),
                            },
                            endDate: {
                                ...campusDriveDatesFinalizationForm.endDate,
                                value: moment(response?.endDate)
                                    .format("YYYY-MM-DD")
                                    .toString(),
                            },
                            location: {
                                ...campusDriveDatesFinalizationForm.location,
                                value: response.location,
                            },
                        };

                        setCampusDriveDatesFinalizationForm(data);
                    }
                },
            })
        );
    };

    useEffect(() => {
        if (props?.campusDriveId) {
            getCDDatesFinalization();
        }
    }, [props?.campusDriveId]);

    const handleFormChange = (name, value, errorMessage = undefined) => {
        //console.log(campusDriveDatesFinalizationForm?.endDate?.value, )
        let data = campusDriveDatesFinalizationForm[name];
        if (name === "location") {
            data["value"] = value;
        } else {
            data["value"] = moment(value).format("YYYY-MM-DD").toString();
        }

        data["errorMessage"] = errorMessage;

        setCampusDriveDatesFinalizationForm((prevState) => ({
            ...prevState,
            ...data,
        }));
    };

    const checkFromToDate = (name, value, errorMessage = undefined) => {
        console.log(name, value, errorMessage, "CHANGE");
        switch (name) {
            case "startDate":
                if (
                    campusDriveDatesFinalizationForm?.endDate?.value !== undefined &&
                    !isFirstDateSameOrBefore(
                        value,
                        campusDriveDatesFinalizationForm?.endDate?.value
                    )
                ) {
                    return "Invalid From Date";
                } else {
                    return undefined;
                }
            case "endDate":
                if (
                    campusDriveDatesFinalizationForm?.startDate?.value !== undefined &&
                    !isFirstDateSameOrBefore(
                        campusDriveDatesFinalizationForm?.startDate?.value,
                        value
                    )
                ) {
                    return "Invalid To Date";
                } else if (
                    value >= campusDriveDatesFinalizationForm?.startDate?.value
                ) {
                    handleFormChange(
                        "startDate",
                        campusDriveDatesFinalizationForm?.startDate?.value,
                        (errorMessage = undefined)
                    );
                } else {
                    return undefined;
                }
            default:
                break;
        }
    };

    const isFormValid = () => {
        let isValid = true;
        datesFinalizationFormFields.forEach((item) => {
            if (isValid) {
                if (
                    campusDriveDatesFinalizationForm[item].isRequired &&
                    campusDriveDatesFinalizationForm[item].errorMessage
                ) {
                    isValid = false;
                    handleFormChange(
                        item,
                        campusDriveDatesFinalizationForm[item].value,
                        "Required"
                    );
                } else if (
                    campusDriveDatesFinalizationForm[item].isRequired &&
                    (typeof campusDriveDatesFinalizationForm[item].value === "string" ||
                        typeof campusDriveDatesFinalizationForm[item].value === "number" ||
                        typeof campusDriveDatesFinalizationForm[item].value === "undefined")
                ) {
                    if (
                        campusDriveDatesFinalizationForm[item].value === undefined ||
                        campusDriveDatesFinalizationForm[item].value?.toString().trim() ===
                        ""
                    ) {
                        isValid = false;
                        handleFormChange(
                            item,
                            campusDriveDatesFinalizationForm[item].value,
                            "Required"
                        );
                    }
                } else if (
                    campusDriveDatesFinalizationForm[item].isRequired &&
                    typeof campusDriveDatesFinalizationForm[item].value === "object"
                ) {
                    if (
                        campusDriveDatesFinalizationForm[item].value === undefined ||
                        campusDriveDatesFinalizationForm[item].value?.length === 0
                    ) {
                        isValid = false;
                        handleFormChange(
                            item,
                            campusDriveDatesFinalizationForm[item].value,
                            "Required"
                        );
                    }
                }
            }
        });

        return isValid;
    };

    const submitHandler = () => {
        const _isValid = isFormValid();

        if (_isValid) {
            const updatedWindowForm = {};

            datesFinalizationFormFields.forEach((item) => {
                updatedWindowForm[item] = campusDriveDatesFinalizationForm[item].value;
            });

            updatedWindowForm.campusDriveID = props.campusDriveId;
            updatedWindowForm.requestType = requestType;

            dispatch(
                actionSaveOrEditCampusDriveDatesFinalizationRequestSaga({
                    apiPayloadRequest: updatedWindowForm,
                    callback: (response) => {
                        setShowAlert(true);
                    },
                })
            );
        }
    };

    const cancelHandler = () => {
        setIsEditable(false);
    };

    console.log(campusDriveDatesFinalizationForm, 'CampuxValuezz')
    

    return (
        <div style={{ width: '90%' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <h3 className='modal-title mt-2 mb-3'>Dates Finalization</h3>
            </div>
            <div className='jobs-content-container'>

                <div className='cmp-main cmp-job'>
                    <h4 className=' mb-3'>Campus Drive - Tentative Dates</h4>
                    <div className='row'>
                        <div className='col-12'>
                            <PgkTextField
                                name="startDate"
                                variant='filled'
                                style={{ width: "100%", marginBottom: '15px' }}
                                ref={startDateValue}
                                onChange={handleFormChange}
                                value={
                                    campusDriveDatesFinalizationForm?.startDate?.value
                                        ? moment(
                                            campusDriveDatesFinalizationForm?.startDate?.value
                                        ).format("YYYY-MM-DD")
                                        : null
                                }
                                label={"Start Date"}
                                inputLabelProps={{ shrink: true, style: { fontSize: ".800rem" } }}
                                inputProps={{
                                    style: { fontSize: ".800rem" },
                                    min: isOld
                                        ? moment(
                                            campusDriveDatesFinalizationForm?.startDate?.value
                                        ).format("YYYY-MM-DD")
                                        : moment().format("YYYY-MM-DD"),
                                }}
                                errorMessage={
                                    campusDriveDatesFinalizationForm?.startDate?.errorMessage
                                }
                                required={campusDriveDatesFinalizationForm?.startDate?.isRequired}
                                disabled={campusDriveDatesFinalizationForm?.startDate?.isDisabled}
                                type={"date"}
                                validations={[
                                    (value) => {
                                        return checkFromToDate("startDate", value);
                                    },
                                ]}
                            />
                        </div>
                        <div className='col-12'>
                            <PgkTextField
                                name="endDate"
                                variant='filled'
                                style={{ width: "100%", marginBottom: '15px' }}
                                onChange={handleFormChange}
                                value={
                                    campusDriveDatesFinalizationForm?.endDate?.value
                                        ? moment(
                                            campusDriveDatesFinalizationForm?.endDate?.value
                                        ).format("YYYY-MM-DD")
                                        : null
                                }
                                label={"End Date"}
                                inputLabelProps={{ shrink: true, style: { fontSize: ".800rem" } }}
                                inputProps={{
                                    style: { fontSize: ".800rem" },
                                    min: moment(
                                        campusDriveDatesFinalizationForm?.startDate?.value
                                    ).format("YYYY-MM-DD"),
                                }}
                                errorMessage={
                                    campusDriveDatesFinalizationForm?.endDate?.errorMessage
                                }
                                required={campusDriveDatesFinalizationForm?.endDate?.isRequired}
                                disabled={campusDriveDatesFinalizationForm?.endDate?.isDisabled}
                                type={"date"}
                                validations={[
                                    (value) => {
                                        return checkFromToDate("endDate", value);
                                    },
                                ]}
                            />
                        </div>
                        <div  >
                            {props?.universityId === "OffCampus" ? (
                                <div className={"row"}>
                                    <PgkTextField
                                        name="location"
                                        onChange={handleFormChange}
                                        value={campusDriveDatesFinalizationForm?.location?.value}
                                        label={"Venue"}
                                        inputLabelProps={{ style: { fontSize: ".800rem" } }}
                                        inputProps={{ style: { fontSize: ".800rem" } }}
                                        errorMessage={
                                            campusDriveDatesFinalizationForm?.location?.errorMessage
                                        }
                                        required={campusDriveDatesFinalizationForm?.location?.isRequired}
                                        disabled={campusDriveDatesFinalizationForm?.location?.isDisabled}
                                        type={"string"}
                                    />
                                </div>
                            ) : null}
                            <div className="d-flex flex-row justify-content-center align-items-center w-full mb-2 mt-4">
                                <button
                                    type="button"
                                    onClick={submitHandler}
                                    style={{ height: "40px", maxWidth: "130px" }}
                                    className="btn job-btn"
                                >
                                    {isOld ? "Update" : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showAlert && (
                    <Modal isOpen={showAlert} >
                        <ModalBody style={{ textAlign: "center" }} >
                            <CancelOutlinedIcon className="cancelbtn" onClick={() => {
                                setShowAlert();
                            }} />
                            <h5>{isOld ? "Updated successfully" : "Saved successfully"}</h5>
                        </ModalBody>
                    </Modal>
                    
                )}
            </div>
        </div>
    );
};

export default CampusDriveDatesFinalizationSection;
