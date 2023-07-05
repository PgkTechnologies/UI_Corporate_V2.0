import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import moment from "moment";
import { isFirstDateSameOrBefore } from "../../../../../utils/utils";
import { Col } from "reactstrap";

import { actionGetCampusDriveDatesFinalizationRequestSaga, actionSaveOrEditCampusDriveDatesFinalizationRequestSaga } from "../../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";

const DateAndLocationFinalization = (props) => {
    const [editDrive, setEditDrive] = useState("default");
    const [driveInfo, setDriveInfo] = useState([]);
    const dispatch = useDispatch();
    const [isOld, setIsOld] = useState(false);
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
    const [showAlert, setShowAlert] = useState();

    const [requestType, setRequestType] = useState("");

    const handleFormChange = (event) => {
        const {name, value, errorMessage} = event.target;
        console.log(name, value, "DDD");
        let data = campusDriveDatesFinalizationForm[name];
        if (name === "location" || name === "nameOfTheDrive") {
            data["value"] = value;
        } else {
            data["value"] = moment(value).format("YYYY-MM-DD").toString();
        }

        setCampusDriveDatesFinalizationForm((prevState) => ({
            ...prevState,
            ...data,
        }));
    };

    const getResponse = (dataList) => {
        console.log(dataList, "RESP");
        setRequestType(dataList.requestType);
        setDriveInfo(dataList);
    };

    const allDrivesGetData = () => {
        dispatch(
            actionGetCampusDriveDatesFinalizationRequestSaga({
                apiPayloadRequest: { campusDriveId: props?.offCampusDriveId },
                callback: getResponse,
            })
        );
    };

    useEffect(() => {
        allDrivesGetData();
    }, []);

    const onEdit = () => {
        setEditDrive("edit");
    };

    const onCancel = () => {
        setEditDrive("default");
    };

    const saveUpdatedData = (event) => {
        event.preventDefault();
        const datesFinalizationFormFields = ["startDate", "endDate", "location"];
        const updatedWindowForm = {};

        datesFinalizationFormFields.forEach((item) => {
            updatedWindowForm[item] = campusDriveDatesFinalizationForm[item].value;
        });

        updatedWindowForm.campusDriveID = props?.offCampusDriveId;
        updatedWindowForm.requestType = requestType;

        console.log(updatedWindowForm, campusDriveDatesFinalizationForm, "FINAL");

        dispatch(
            actionSaveOrEditCampusDriveDatesFinalizationRequestSaga({
                apiPayloadRequest: updatedWindowForm,
                callback: (response) => {
                    allDrivesGetData();
                    setShowAlert(true);
                    setEditDrive("default");
                },
            })
        );
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

    console.log(editDrive,'editttt')

    return (
        <div style={{ width: "90%" }}>

            <div style={{ width: "100%", textAlign: "center" }}>
                <h3 className="modal-title mt-2 mb-3">Off Campus Drive</h3>
            </div>
            <div className="jobs-content-container">
                {editDrive === "default" ? (
                    <div className="cmp-main cmp-job">
                        <h4 className=" mb-3">Dates And Location Finalization</h4>
                        <div className="row">
                            <div className="col-12">
                                <TextField
                                    label="Name of the Drive"
                                    type="text"
                                    name="driveName"
                                    variant="filled"
                                    InputLabelProps={{ shrink: true }}
                                    value={driveInfo?.driveName}
                                    style={{ width: "100%", marginBottom: "15px" }}
                                    required={true}
                                />
                            </div>
                            <div className="col-12">
                                <TextField
                                    label="Name of the Venue"
                                    type="text"
                                    required={true}
                                    name="location"
                                    variant="filled"
                                    InputLabelProps={{ shrink: true }}
                                    value={driveInfo?.location}
                                    style={{ width: "100%", marginBottom: "15px" }}
                                />
                            </div>
                            <div className="col-12">
                                <TextField
                                    label="Start Date"
                                    type="Date"
                                    required={true}
                                    name="startDate"
                                    variant="filled"
                                    InputLabelProps={{ shrink: true }}
                                    value={driveInfo?.startDate}
                                    style={{ width: "100%", marginBottom: "15px" }}
                                />
                            </div>
                            <div className="col-12">
                                <TextField
                                    label="End Date"
                                    type="text"
                                    required={true}
                                    name="endDate"
                                    variant="filled"
                                    InputLabelProps={{ shrink: true }}
                                    value={driveInfo?.endDate}
                                    style={{ width: "100%", marginBottom: "15px" }}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <button type="submit" className="btn" onClick={onEdit}>
                                Edit
                            </button>
                        </div>
                    </div>
                ) : (
                    null
                )}


            </div>
            
                <div className="jobs-content-container">
                {editDrive === "edit" ? (
                        <div className="cmp-main cmp-job">
                            <h4 className=" mb-3">Dates And Location Finalization</h4>
                            <form onSubmit={saveUpdatedData}>
                                <div className="row">
                                    <div className="col-12">
                                        <TextField
                                            label="Name of the Drive"
                                            type="text"
                                            name="nameOfTheDrive"
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            value={driveInfo?.driveName}
                                            style={{ width: "100%", marginBottom: "15px" }}
                                            disabled={true}
                                            error={
                                                campusDriveDatesFinalizationForm?.nameOfTheDrive
                                                    ?.errorMessage
                                            }
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            label="Venue"
                                            type="text"
                                            required={
                                                campusDriveDatesFinalizationForm?.location
                                                    ?.isRequired
                                            }
                                            onChange={handleFormChange}
                                            name="location"
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            value={
                                                campusDriveDatesFinalizationForm?.location?.value
                                            }
                                            style={{ width: "100%", marginBottom: "15px" }}
                                            disabled={
                                                campusDriveDatesFinalizationForm?.location
                                                    ?.isDisabled
                                            }
                                            error={
                                                campusDriveDatesFinalizationForm?.location
                                                    ?.errorMessage
                                            }
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            label="Start Date"
                                            type="Date"
                                            onChange={handleFormChange}
                                            errorMessage={
                                                campusDriveDatesFinalizationForm?.startDate
                                                    ?.errorMessage
                                            }
                                            required={
                                                campusDriveDatesFinalizationForm?.startDate
                                                    ?.isRequired
                                            }
                                            disabled={
                                                campusDriveDatesFinalizationForm?.startDate
                                                    ?.isDisabled
                                            }
                                            name="startDate"
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            value={
                                                campusDriveDatesFinalizationForm?.startDate?.value
                                                    ? moment(
                                                        campusDriveDatesFinalizationForm?.startDate
                                                            ?.value
                                                    ).format("YYYY-MM-DD")
                                                    : null
                                            }
                                            style={{ width: "100%", marginBottom: "15px" }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            label="End Date"
                                            type="date"
                                            name="endDate"
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleFormChange}
                                            value={
                                                campusDriveDatesFinalizationForm?.endDate?.value
                                                    ? moment(
                                                        campusDriveDatesFinalizationForm?.endDate
                                                            ?.value
                                                    ).format("YYYY-MM-DD")
                                                    : null
                                            }
                                            errorMessage={
                                                campusDriveDatesFinalizationForm?.endDate
                                                    ?.errorMessage
                                            }
                                            required={
                                                campusDriveDatesFinalizationForm?.endDate
                                                    ?.isRequired
                                            }
                                            disabled={
                                                campusDriveDatesFinalizationForm?.endDate
                                                    ?.isDisabled
                                            }
                                            style={{ width: "100%", marginBottom: "15px" }}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center mt-5">
                                    <button type="submit" className="btn" style={{marginRight : '50px' }} >
                                        Save
                                    </button>
                                
                                    <button type="submit" className="btn"  onClick={onCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        null
                    )}


                </div>

        </div>
    );
};

export default DateAndLocationFinalization;
