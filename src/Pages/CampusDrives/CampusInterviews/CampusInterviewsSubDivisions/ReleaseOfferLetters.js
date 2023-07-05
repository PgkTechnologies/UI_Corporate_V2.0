import React, { useState, useEffect, useRef } from "react";
import { FormControl, Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux"; 
import { actionGetCampusDriveEmailTemplatesListRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CommunicationSagaAction";
import { actionGetCampusDriveDefineJobsListRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";
import { actionGetCampusDriveOfferLetterRequest, actionGetFinalStudentsListSaga, actionPostStudentOfferLetterSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CampusInterviewSagaAction";
import PgkSelectField from "../../../../Components/FormFields/PgkSelectField";
import { actionGetCountryCodesSagaAction } from "../../../../Store/Actions/SagaActions/CommonSagaActions";

const ReleaseOfferLetters = (props) => {

    const initialModel = {
        "cdID": props?.campusDriveId,
        "jobID": "",
        "studentListAttachFile": "",
        "studentListAttachFileName": "",
        "jobOffers": []
    };

    const initialJobOfferModel =
    {
        "applicantID": "",
        "designation": "",
        "email": "",
        "location": "",
        "joiningDate": "",
        "remarks": "",
        "salary": "",
        "offerLetterFile": "",
        "offerLetterFileName": ""
    };

    const dispatch = useDispatch();
    const [jobsList, setJobsList] = useState([]);
    const [selectedJobID, setSelectedJobID] = useState("");
    const [selectedJobName, setSelectedJobName] = useState("");
    const [studentFinalList, setStudentsList] = useState({});
    const [offerLetterInformation, setOfferLetterInformation] = useState(initialModel);
    const [allEmailTemplates, setAllEmailTemplates] = useState({});
    const [states, setStates] = useState([]);
    const countryName = useSelector(state => state.DashboardReducer.profileInfo?.corporateHQAddressCountry);

    const [studentEmailTemplateId, setStudentEmailTemplateId] = useState();
    const [univEmailTemplateId, setUnivEmailTemplateId] = useState();

    const getAllEmailTemplates = (data) => {
        setAllEmailTemplates(data);
    }

    const getEmailTemplateAvailable = () => {
        const model =
        {
            campusDriveID: props.campusDriveId
        };
        dispatch(actionGetCampusDriveEmailTemplatesListRequestSaga({ apiPayloadRequest: model, callback: getAllEmailTemplates }));
    }

    const onStatesResponse = (response, _countryName) => {
        let updatedStatesOptions = [];

        if (response?.length) {
            const statesData = response.find((item) => item?.name === _countryName);

            if (statesData?.states?.length) {
                updatedStatesOptions = statesData?.states?.map((item) => {
                    return { value: item?.name, label: item?.name }
                })
            }
        }
        setStates(updatedStatesOptions);
    }

    useEffect(() => {
        if (states?.length === 0) {
            dispatch(actionGetCountryCodesSagaAction({
                countryName: countryName,
                callback: (response) => {
                    onStatesResponse(response?.data, countryName)
                },
            }))
        }
    }, [countryName]);


    useEffect(() => {
        getEmailTemplateAvailable();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStudentFinalList = (data) => {
        console.log(data);
        setStudentsList(data);
        let selectedStudentList = [];
        if (data.studentsList.length > 0) {
            data.studentsList.map((studentInfo) => {
                let jobOfferForStudent = {};
                if (studentInfo?.offerLetterShared) {
                    jobOfferForStudent = {
                        designation: studentInfo?.designation,
                        location: studentInfo?.location,
                        joiningDate: studentInfo?.joiningDate,
                        remarks: studentInfo?.remarks,
                        salary: studentInfo?.salary,
                        offerLetterFile: "",
                        offerLetterFileName: studentInfo?.offerLetterFileName,
                        offerLetterID: studentInfo?.offerLetterID,
                    }
                } else {
                    jobOfferForStudent = { ...initialJobOfferModel }
                }
                jobOfferForStudent.offerLetterShared = studentInfo.offerLetterShared;
                jobOfferForStudent.applicantID = studentInfo.applicantID;
                jobOfferForStudent.email = studentInfo.email;
                selectedStudentList.push(jobOfferForStudent);
            });
            setOfferLetterInformation((prevOtherInfo) => ({
                ...prevOtherInfo,
                ["jobOffers"]: selectedStudentList,
            }));
        }
    }

    const getSelectedStudents = (jobID) => {
        const inputModel = {
            campusDriveID: props?.campusDriveId,
            jobID: jobID
        };
        dispatch(actionGetFinalStudentsListSaga({
            apiPayloadRequest: inputModel,
            callback: getStudentFinalList
        }));

    }

    const onJobChange = (event) => {
        const { name, value } = event.target;
        setSelectedJobID(value);
        jobsList.map((item) => {
            if (item.jobID === value) {
                setSelectedJobName(item.jobName);
            }
        });
        setOfferLetterInformation((prevOtherInfo) => ({
            ...prevOtherInfo,
            ["jobID"]: value,
        }));

        if (value === 'DEFAULT') {
            setOfferLetterInformation();
        } else {
            getSelectedStudents(value);
        }
    }

    const getJobData = (data) => {
        setJobsList(data.filter(x => x.status === "open"));
    }

    const handleChange = (event, index = undefined) => {
        const { name, value } = event.target;
        let currentOfferLetterInfo = { ...offerLetterInformation };
        if (name === "offerLetterFile") {
            if (event.target.files) {
                const maxAllowedSize = 5 * 1024 * 1024;
                if (event.target.files[0].size > maxAllowedSize) {
                    // setFileSizeErr('Maximum file size limit is 5 MB');
                }
                else {
                    //setFileSizeErr('');
                    currentOfferLetterInfo.jobOffers[index]["offerLetterFileName"] = event.target.files[0].name;
                    getFile(event.target.files[0]).then((customJsonFile) => {
                        currentOfferLetterInfo.jobOffers[index]["offerLetterFile"] = customJsonFile.base64StringFile
                    });
                    setOfferLetterInformation(preState => ({
                        ...preState,
                        jobOffers: currentOfferLetterInfo.jobOffers
                    }));
                }
            }
        } else {
            if (name === 'salary') {
                currentOfferLetterInfo.jobOffers[index][name] = parseFloat(value);
            } else {
                currentOfferLetterInfo.jobOffers[index][name] = value;
            }
            setOfferLetterInformation(preState => ({
                ...preState,
                jobOffers: currentOfferLetterInfo.jobOffers
            }));
        }
    }

    const handleSubmit = () => {
        if (offerLetterInformation?.jobOffers?.length && offerLetterInformation.jobOffers.some((jobOffer) => !jobOffer.offerLetterShared)) {
            const _offerLetterInformation = {
                ...offerLetterInformation,
                jobOffers: offerLetterInformation?.jobOffers?.length ? offerLetterInformation.jobOffers.filter((jobOffer) => !jobOffer.offerLetterShared) : []
            }
            console.log('offerLetterInformation ', { ..._offerLetterInformation, studentEmailTemplateId: studentEmailTemplateId, univEmailTemplateId: univEmailTemplateId });
            dispatch(actionPostStudentOfferLetterSaga({
                apiPayloadRequest: { ..._offerLetterInformation, studentEmailTemplateId: parseInt(studentEmailTemplateId), unvEmailTemplateID: parseInt(univEmailTemplateId) },
                callback: onSuccess
            }));
        }
    }

    function getFile(file) {
        var reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => { reader.abort(); reject(new Error("Error parsing file")); }
            reader.onload = function () {

                //This will result in an array that will be recognized by C#.NET WebApi as a byte[]
                let bytes = Array.from(new Uint8Array(this.result));

                //if you want the base64encoded file you would use the below line:
                let base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(""));

                //Resolve the promise with your custom file structure
                resolve({
                    base64StringFile: base64StringFile
                });
            }
            reader.readAsArrayBuffer(file);
        });
    }

    const onSuccess = () => {
        setStudentsList({});
        setOfferLetterInformation(initialModel);

    }

    useEffect(() => {
        dispatch(actionGetCampusDriveDefineJobsListRequestSaga({
            campusDriveId: props?.campusDriveId,
            callback: getJobData
        }));

    }, []);

    const getOfferLetter = (studentID, offerLetterID) => {
        dispatch(actionGetCampusDriveOfferLetterRequest({
            apiPayloadRequest: {
                studentID: studentID,
                offerLetterID: offerLetterID
            },
            callback: (response) => {
                if (response?.offerLetterFile && response?.offerLetterFile?.trim() !== '') {
                    var a = document.createElement("a"); //Create <a>
                    a.href = "data:image/png;base64," + response?.offerLetterFile; //Image Base64 Goes here
                    a.download = `${studentID}_${offerLetterID}.pdf`; //File name Here
                    a.click();
                }
            }
        }))
    }

    return (
        <div className="bgWhite" style={{ width: "910px", height: "590px" }}>
            <div className="d-flex flex-column justify-content-start align-items-center w-full">
                <p className="heading" style={{ color: "#253AA3", fontWeight: "bold", fontFamily: "Poppins-Regular", display: "block" }}>
                    Release Offer Results
                </p>
            </div>
            <br />
            <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }}>
                <TextField
                    select
                    label="Job Name"
                    InputLabelProps={{
                        shrink: true,
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    inputProps={{
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    variant="outlined"
                    margin="dense"
                    required={true}
                    SelectProps={{
                        native: true,
                    }}
                    placeholder="dd-mon-yyyy"
                    onChange={onJobChange}
                >
                    <option value={'DEFAULT'}>Select a Job</option>
                    {jobsList?.length && (
                        jobsList.map((item) => {
                            return <option value={item.jobID}
                                key={item.jobID}
                            >{item.jobName}</option>
                        })
                    )}
                </TextField>
            </div>
            {
                offerLetterInformation?.jobOffers && offerLetterInformation?.jobOffers.length > 0 && studentFinalList?.studentsList && studentFinalList?.studentsList.length > 0
                    ?
                    <>
                        <br />
                        <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full mr-4" style={{ background: "white", width: "500px" }}>
                            <TextField
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
                                    readOnly: true,
                                    style: { fontFamily: "Poppins-Regular", display: "block" }
                                }}
                                variant="outlined"
                                margin="dense"
                                value={studentFinalList.noOfStudentsSelected}
                            />
                        </div>
                        <br />
                        <div style={{height:"250px", overflowY:"scroll", overflowX:"scroll"}}>
                        <table class="table table-striped table-bordered">
                            <thead style={{ backgroundColor: "#01253cf5", color: "white" }}>
                                <tr>
                                    <th>#</th>
                                    <th>Student Name</th>
                                    {/* <th>College Roll No.</th> */}
                                    <th>Email ID</th>
                                    <th>Designation</th>
                                    <th>Joining Location</th>
                                    <th>Joining Date</th>
                                    <th>Offer Letter</th>
                                    <th>Salary</th>
                                    <th>Remarks</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentFinalList?.studentsList.map((student, index) => (
                                        <>
                                            <tr>
                                                <th>{index + 1}</th>
                                                <td>{student.name}</td>
                                                {/* <td>{student.collegeRollNo}</td> */}
                                                <td>{student.email}</td>
                                                <td>
                                                    <TextField
                                                        label="Designation"
                                                        value={offerLetterInformation?.jobOffers[index].designation}
                                                        onChange={(event) => handleChange(event, index)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        inputProps={{
                                                            name: "designation",
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        style={{ width: "100%" }}
                                                        variant="outlined"
                                                        margin="dense"
                                                        required={true}
                                                        type="text"
                                                        disabled={offerLetterInformation?.jobOffers[index].offerLetterShared}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        onChange={(event) => handleChange(event, index)}
                                                        select
                                                        label="Location"
                                                        value={offerLetterInformation?.jobOffers[index].location}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        inputProps={{
                                                            name: "location",
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        style={{ width: "100%" }}
                                                        variant="outlined"
                                                        margin="dense"
                                                        required={true}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        disabled={offerLetterInformation?.jobOffers[index].offerLetterShared}
                                                    >
                                                        <option value={'DEFAULT'}>Select a location</option>
                                                        {states?.length && (
                                                            states.map((item) => {
                                                                return <option value={item.value}
                                                                    key={item.value}
                                                                >{item.label}</option>
                                                            })
                                                        )}
                                                    </TextField>
                                                </td>
                                                <td>
                                                    <TextField
                                                        onChange={(event) => handleChange(event, index)}
                                                        label="Joining Date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        inputProps={{
                                                            name: "joiningDate",
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        value={offerLetterInformation?.jobOffers[index].joiningDate}
                                                        style={{ width: "100%" }}
                                                        variant="outlined"
                                                        margin="dense"
                                                        required={true}
                                                        type="date"
                                                        disabled={offerLetterInformation?.jobOffers[index].offerLetterShared}
                                                    />

                                                </td>
                                                <td>
                                                    <div className="d-attach" onClick={offerLetterInformation?.jobOffers[index].offerLetterShared ? () => {
                                                        getOfferLetter(offerLetterInformation?.jobOffers[index].applicantID, offerLetterInformation?.jobOffers[index].offerLetterID)
                                                    } : undefined}>
                                                        <p className="float-left" style={{ fontSize: "18px", fontFamily: "Poppins-Regular", display: "block" }}> {offerLetterInformation?.jobOffers[index].offerLetterFileName}</p>
                                                        {/* <p style={{ position: "absolute", top: "40px", fontSize: "18px", fontFamily: "Poppins-Regular", display: "block", color: "red" }}>{'fa234fa'}</p> */}
                                                        <input
                                                            type="file"
                                                            onChange={(event) => handleChange(event, index)}
                                                            className="d-inp"
                                                            accept=".pdf"
                                                            name="offerLetterFile"
                                                            id={"offerLetterFile" + index}
                                                            disabled={offerLetterInformation?.jobOffers[index].offerLetterShared}
                                                        />
                                                        <label id={"offerLetterFile" + index} className="d-label">
                                                            <i className="fas fa-paperclip mr-2"></i> Offer Letter
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <TextField
                                                        label="Salary"
                                                        value={offerLetterInformation?.jobOffers[index].salary}
                                                        onChange={(event) => handleChange(event, index)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        inputProps={{
                                                            name: "salary",
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        style={{ width: "150px" }}
                                                        variant="outlined"
                                                        margin="dense"
                                                        required={true}
                                                        type="number"
                                                        disabled={offerLetterInformation?.jobOffers[index].offerLetterShared}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        label="Remarks" 
                                                        value={offerLetterInformation?.jobOffers[index].remarks}
                                                        onChange={(event) => handleChange(event, index)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        inputProps={{
                                                            name: "remarks",
                                                            style: { fontFamily: "Poppins-Regular", display: "block" }
                                                        }}
                                                        variant="outlined"
                                                        margin="dense"
                                                        type="text"
                                                        disabled={offerLetterInformation?.jobOffers[index].offerLetterShared}
                                                    />
                                                </td>
                                                
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                        </div>
                        <br />
                        <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }}>
                            <PgkSelectField
                                name="studentEmailTemplateId"
                                value={studentEmailTemplateId}
                                onChange={(name, value, errorMessage) => {
                                    setStudentEmailTemplateId(value);
                                }}
                                label="Email Template for Student"
                                options={allEmailTemplates?.length ? allEmailTemplates.map((item) => {
                                    return { value: item?.emailTemplateID?.toString(), label: item?.emailTemplateName }
                                }) : []}
                                labelStyles={{ fontSize: '.800rem' }}
                                selectStyles={{ fontSize: '.800rem' }}
                                menuStyles={{ fontSize: '.800rem' }}
                                styles={{ width: '45%' }}
                                required
                                disabled={offerLetterInformation?.jobOffers?.length ? !offerLetterInformation?.jobOffers?.some((item) => !item.offerLetterShared) : true}
                            />
                            <PgkSelectField
                                name="univEmailTemplateId"
                                value={univEmailTemplateId}
                                onChange={(name, value, errorMessage) => {
                                    setUnivEmailTemplateId(value);
                                }}
                                label="Email Template for University"
                                options={allEmailTemplates?.length ? allEmailTemplates.map((item) => {
                                    return { value: item?.emailTemplateID?.toString(), label: item?.emailTemplateName }
                                }) : []}
                                labelStyles={{ fontSize: '.800rem' }}
                                selectStyles={{ fontSize: '.800rem' }}
                                menuStyles={{ fontSize: '.800rem' }}
                                styles={{ width: '45%' }}
                                required
                                disabled={offerLetterInformation?.jobOffers?.length ? !offerLetterInformation?.jobOffers?.some((item) => !item.offerLetterShared) : true}
                            />
                        </div>
                        <br />
                        <div className="d-flex flex-row justify-content-around align-items-center">
                            {/* <button type="button" className="btn" style={{height: '30px', width: '100px'}} onClick={() => {}}>Download</button>
                            <button type="button" className="btn" style={{height: '30px', width: '100px'}} onClick={() => {}}>Save</button> */}
                            <button type="button" className="btn" style={{ width: '100px' }} onClick={() => handleSubmit()}>Release</button>
                        </div>
                        <br />
                    </>
                    :
                    <>
                        <br />
                        <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full mr-4" style={{ background: "white", width: "500px" }}>
                            <p> Please select right job to fetch shortlisted information</p>
                        </div>
                    </>
            }
            <br />
        </div>
    );
};

export default ReleaseOfferLetters;
