import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Grid, TextField } from '@material-ui/core';
import { Modal, ModalBody } from 'reactstrap';
//import { jsPDF } from 'jspdf-react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CreateEmailTemplate from './CreateEmailTemplate';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import { actionDeleteIndcutionInfoRequestSaga, actionGetCampusDriveEmailTemplatesListRequestSaga, actionGetInductionInfoRequestSaga, actionPatchInductionInfoRequestSaga, actionPostInductionInfoRequestSaga, actionPostNewEmailTemplateRequestSaga } from '../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CommunicationSagaAction';

const DefineInduction = (props) => {

    const profileInfo = useSelector(state => state.DashboardReducer.profileInfo);
    const initialData = {
        "cdID": props.campusDriveId,
        "inductionID": 0,
        "corpStakeholderID": profileInfo.stakeholderID,
        "univStakeholderID": props.universityId,
        "linkOfInduction": "",
        "dateOfInduction": "",
        "timeOfInduction": "",
        "otherInformation": "",
        "attachFileName": "",
        "attachFile": "",
        "emailTemplateID": "",
        "sendEmail": false,
    };

    const initialCreateTemplateData = {
        "cdID": props.campusDriveId,
        "emailTemplateID": 0,
        "emailTemplateName": "",
        "emailSubject": "",
        "emailBody": "",
        "attachFileName": "",
        "attachFile": ""
    };

    const [addEmailTemplate, setAddEmailTemplate] = useState(initialCreateTemplateData);
    const dispatch = useDispatch();
    const [allEmailTemplates, setAllEmailTemplates] = useState({});
    const [creatEmailTemplate, setCreateEmailTemplate] = useState(false);
    const [enableSuccessModal, setEnableSuccessModal] = useState(false);
    const [enableEmailTemplateSuccessModal, setEmailTemplateEnableSuccessModal] = useState(false);
    const [inductionInfo, setInductionInfo] = useState(initialData);
    const [fileSizeErr, setFileSizeErr] = useState("");
    const [emailTemplateErr, setEmailTemplateErr] = useState("");
    const [selectedEmailTemplateName, setSelectedEmailTemplateName] = useState("");
    const [operationType, setOperationType] = useState("");
    const [currentSystemDate, setCurrentSystemDate] = useState("");

    const getAllEmailTemplates = (data) => {
        setInductionInfo((prevOtherInfo) => ({
            ...prevOtherInfo,
            corpStakeholderID: profileInfo.stakeholderID,
        }));
        setAllEmailTemplates(data);
    }

    function getEmailTemplateName(templateId) {
        if (allEmailTemplates.length > 0) {
            allEmailTemplates.map((email) => {
                if (templateId == email.emailTemplateID) {
                    return email.emailTemplateName;
                }
            });
        }
    }

    const onCreateEmailTemplate = () => {
        setCreateEmailTemplate(true);
    }

    const convertIntoPdf = () => {
        // var doc = new jsPDF();
    }

    const onCancelEmailTemplate = () => {
        setCreateEmailTemplate(false);
    }

    const handleEmailTemplateChange = (event) => {
        const { name, value } = event.target;
        setAddEmailTemplate((prevOtherInfo) => ({
            ...prevOtherInfo,
            [name]: value,
        }));
    }

    const handleEmailTemplateSubmit = (e) => {
        e.preventDefault();
        const model = {
            ...addEmailTemplate
        }
        addTemplate(model);
    }

    const addTemplate = (model) => {
        dispatch(actionPostNewEmailTemplateRequestSaga({ apiPayloadRequest: model, callback: addEmailTemplateResp }));
    }

    const addEmailTemplateResp = () => {
        //onEmailTemplateSuccess();
        setCreateEmailTemplate(false);
        getEmailTemplateAvailable();
        setAddEmailTemplate(initialData);
    }

    function getSystemDate() {
        var date = new Date();
        var monthPrefix = "";
        var datePrefix = "";
        if (date.getMonth() < 10) {
            monthPrefix = "0"
        }
        if (date.getDate() < 10) {
            datePrefix = "0"
        }

        setCurrentSystemDate(date.getFullYear() + '-' + monthPrefix + parseInt(date.getMonth() + 1) + '-' + datePrefix + date.getDate());
    }

    function getFormattedDate(date) {
        var d = new Date(date);
        var monthPrefix = "";
        var datePrefix = "";
        if (d.getMonth() < 10) {
            monthPrefix = "0"
        }
        if (d.getDate() < 10) {
            datePrefix = "0"
        }
        //  console.log(d.getFullYear() + '-' + monthPrefix + parseInt(d.getMonth() + 1) + '-' + datePrefix + d.getDate());
        return d.getFullYear() + '-' + monthPrefix + parseInt(d.getMonth() + 1) + '-' + datePrefix + d.getDate();
    }

    const getInductionInformation = (data) => {
        if (data) {
            setInductionInfo(data);
        }
        else {
            setInductionInfo(initialData);
        }
        setInductionInfo((prevOtherInfo) => ({
            ...prevOtherInfo,
            cdID: props.campusDriveId,
            corpStakeholderID: profileInfo.stakeholderID,
            univStakeholderID: props.universityId
        }));

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "emailTemplateID" && value === "newTemplate") {
            //setInductionInfo(initialData);
            setCreateEmailTemplate(true);
        } else if (name === "emailTemplateID") {
            allEmailTemplates.map((email) => {
                if (value == email.emailTemplateID) {
                    setSelectedEmailTemplateName(email.emailTemplateName);
                }
                setEmailTemplateErr('');
            });
            setInductionInfo((prevOtherInfo) => ({
                ...prevOtherInfo,
                [name]: parseInt(value),
            }));
        }
        else if (name === "attachFile") {
            if (event.target.files) {
                const maxAllowedSize = 5 * 1024 * 1024;
                if (event.target.files[0].size > maxAllowedSize) {
                    setFileSizeErr('Maximum file size limit is 5 MB');
                }
                else {
                    setFileSizeErr('');
                    setInductionInfo(preState => ({
                        ...preState,
                        attachFileName: event.target.files[0].name
                    }));
                    getFile(event.target.files[0]).then((customJsonFile) => {
                        setInductionInfo(preState => ({
                            ...preState,
                            [name]: customJsonFile.base64StringFile
                        }));
                    });
                }
            }
        }
        else {
            console.log(name, value, "HI")
            setInductionInfo((prevOtherInfo) => ({
                ...prevOtherInfo,
                [name]: value,
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

    const handleSubmit = (event) => {
        event.preventDefault();
        setOperationType("saved");
        if (inductionInfo.emailTemplateID.length == 0) {
            setEmailTemplateErr("Please select email template");
        }
        else {
            setEmailTemplateErr("");
            if (inductionInfo.inductionID > 0) {
                const model =
                {
                    ...inductionInfo,
                    dateOfInduction: moment(inductionInfo.dateOfInduction).format('YYYY-MM-DD'),
                };
                dispatch(actionPatchInductionInfoRequestSaga({ apiPayloadRequest: model, callback: onSuccess }));
            }
            else {
                const model =
                {
                    ...inductionInfo,
                    dateOfInduction: moment(inductionInfo.dateOfInduction).format('YYYY-MM-DD'),
                };

                dispatch(actionPostInductionInfoRequestSaga({ apiPayloadRequest: model, callback: onSuccess }));
            }

        }
    }

    const toggleSuccessModal = () => {
        setEnableSuccessModal(!enableSuccessModal);
    }

    const toggleEmailTemplateSuccessModal = () => {
        setEmailTemplateEnableSuccessModal(!enableEmailTemplateSuccessModal);
    }

    const onDelete = () => {
        setOperationType("deleted");
        const model = {
            campusDriveID: props.campusDriveId,
            inductionID: inductionInfo.inductionID
        };
        dispatch(actionDeleteIndcutionInfoRequestSaga({ apiPayloadRequest: model, callback: onSuccess }));
    }

    const onSuccess = () => {
        getAvilableInductionInformation();
        toggleSuccessModal();
    }

    const getEmailTemplateAvailable = () => {
        const model =
        {
            campusDriveID: props.campusDriveId
        };
        dispatch(actionGetCampusDriveEmailTemplatesListRequestSaga({ apiPayloadRequest: model, callback: getAllEmailTemplates }));
    }

    const getAvilableInductionInformation = () => {
        const model =
        {
            campusDriveID: props.campusDriveId
        };
        dispatch(actionGetInductionInfoRequestSaga({ apiPayloadRequest: model, callback: getInductionInformation }));
    }

    useEffect(() => {
        getEmailTemplateAvailable();
        getAvilableInductionInformation();
        getSystemDate();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(allEmailTemplates,'hiuu')

    return (
        <>
            <div className="container" >
                {
                    creatEmailTemplate
                        ?
                        <>
                            <CreateEmailTemplate
                                handleSubmit={handleEmailTemplateSubmit}
                                handleChange={handleEmailTemplateChange}
                                onCancel={onCancelEmailTemplate}
                                addEmailTemplate={addEmailTemplate}
                            />
                        </>
                        :
                        <>
                            <div
                                className="d-flex flex-column justify-content-start align-items-center w-full"
                            >
                                <p className="heading" style={{ color: "#253AA3", fontWeight: "bold", fontFamily: "Poppins-Regular", display: "block" }}>
                                    Pre-Campus Induction
                                </p>


                                <div style={{ textAlign: "center", backgroundColor: "gray" }}>
                                    <div className="card-Induction" style={{ borderRadius: '10px' }} >
                                        <div className="card-header" style={{ textAlign: "center", background: "#03355bdc", color: "white" }}>
                                            Define Induction
                                        </div>
                                        <div style={{ overflowY: "scroll", overflowX: "hidden" }}>
                                            <form onSubmit={handleSubmit} style={{ background: "white" }}>
                                                <div className="card-body" >
                                                    <Grid container item spacing={3}>
                                                        <Col xs={12}>
                                                            <FormControl className="largeinput" variant="outlined" style={{ width: "95%", marginTop: '15px', marginBottom: '10px' }} >
                                                                <TextField
                                                                    label="Link"
                                                                    type="text"
                                                                    name="linkOfInduction"
                                                                    onChange={handleChange}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                                                    }}
                                                                    inputProps={{
                                                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                                                    }}
                                                                    required={true}
                                                                    variant="outlined"
                                                                    margin="dense"
                                                                    value={inductionInfo.linkOfInduction}
                                                                />
                                                            </FormControl>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <FormControl className="largeinput" variant="outlined" style={{ width: "91%", marginBottom: '10px' }}>
                                                                <TextField
                                                                    label="Date"
                                                                    type="Date"
                                                                    name="dateOfInduction"
                                                                    onChange={handleChange}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                                                    }}
                                                                    inputProps={{
                                                                        min: currentSystemDate,
                                                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                                                    }}
                                                                    style={{ color: 'black' }}
                                                                    required={true}
                                                                    value={inductionInfo.inductionID > 0 ? moment(getFormattedDate(inductionInfo.dateOfInduction)).format("YYYY-MM-DD") : moment(inductionInfo.dateOfInduction).format("YYYY-MM-DD")}
                                                                    //placeholder={}
                                                                    variant="outlined"
                                                                    margin="dense"
                                                                />
                                                            </FormControl>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <FormControl className="largeinput" variant="outlined" style={{ width: "92%", marginBottom: '10px' }}>
                                                                <TextField
                                                                    label="Time"
                                                                    type="Time"
                                                                    name="timeOfInduction"
                                                                    onChange={handleChange}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                                                    }}
                                                                    inputProps={{
                                                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                                                    }}
                                                                    required={true}
                                                                    value={inductionInfo.timeOfInduction}
                                                                    variant="outlined"
                                                                    margin="dense"
                                                                />
                                                            </FormControl>
                                                        </Col>
                                                        <Col xs={12} style={{ paddingBottom: "10px" }}>
                                                            <FormControl className="largeinput" variant="outlined" style={{ width: "95%", marginBottom: '10px' }} >
                                                                <TextField
                                                                    label="Other Information"
                                                                    type="text"
                                                                    name="otherInformation"
                                                                    onChange={handleChange}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                                                    }}
                                                                    inputProps={{
                                                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                                                    }}
                                                                    value={inductionInfo.otherInformation}
                                                                    variant="outlined"
                                                                    required={true}
                                                                    margin="dense"
                                                                />
                                                            </FormControl>
                                                        </Col>

                                                        <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }}>
                                                            <div className="d-attach" style={{ maxWidth: "95%" }}>
                                                                {/* <p className="attach-inp_label" style={{ fontSize: "18px", fontFamily: "Poppins-Regular", display: "block" }}>{inductionInfo.attachFileName}</p>
                                                                <p style={{ position: "absolute", top: "40px", fontSize: "18px", fontFamily: "Poppins-Regular", display: "block", color: "red" }}>{fileSizeErr}</p>
                                                                <input
                                                                    type="file"
                                                                    className="d-inp"
                                                                    accept=".pdf"
                                                                    name="attachFile"
                                                                    id="attachFile"
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="attachFile" className="d-label">
                                                                    <i className="file_label"></i> Attach File
                                                                </label> */}
                                                                <label
                                                                    htmlFor="attachment"
                                                                    className="file_label"
                                                                    style={{ fontWeight: 'bold', color: '#0D6EFD', marginRight:'20px' }}
                                                                >
                                                                    Attachment *
                                                                </label>

                                                                <input
                                                                    type="file"
                                                                    onChange={handleChange}
                                                                    className="attach-inp"
                                                                    name="attachFile"
                                                                    accept=".pdf"
                                                                    id="attachFile"
                                                                />
                                                                <p className="attach-inp_label">
                                                                    {inductionInfo.attachFileName}
                                                                </p>

                                                            </div>
                                                        </div>

                                                        <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={fileSizeErr ? { paddingTop: "20px", background: "white" } : { paddingTop: "0px", background: "white" }}>
                                                            <div className="d-attach" style={{ maxWidth: "95%" }}>
                                                                <p style={{ paddingLeft: "10px", fontSize: "18px", fontFamily: "Poppins-Regular", display: "block" }}>
                                                                                        </p>
                                                                <p style={{ position: "absolute", top: "40px", fontSize: "18px", fontFamily: "Poppins-Regular", display: "block", color: "red" }}>{emailTemplateErr}</p>
                                                                <label htmlFor="EmailTemplate" className="d-label" style={{ left: "-1px",marginRight:'10px' }}>
                                                                    <i className="fas fa-envelope mr-2"></i>Choose Email Template
                                                                </label>
                                                                <select
                                                                    name="emailTemplateID"
                                                                    class="d-inp"
                                                                    id="inputGroupSelect01"
                                                                    onChange={handleChange}
                                                                    required={true}>
                                                                    <option selected>
                                                                    {
                                                                        allEmailTemplates?.length > 0 ?
                                                                            <div >

                                                                                {
                                                                                    allEmailTemplates.map((email) => {
                                                                                        if (inductionInfo.emailTemplateID == email.emailTemplateID) {
                                                                                            return email.emailTemplateName;
                                                                                        }
                                                                                    })
                                                                                }
                                                                            </div>
                                                                            :
                                                                            <>
                                                                            Choose...
                                                                            </>
                                                                    }
                                           
                                                                    </option>
                                                                    {
                                                                        allEmailTemplates?.length > 0 ?
                                                                            <>
                                                                                {
                                                                                    allEmailTemplates?.map((email) => (
                                                                                        <option value={email.emailTemplateID}
                                                                                        // selected={inductionInfo.emailTemplateID === email.emailTemplateID ? true : false}
                                                                                        >{email.emailTemplateName}</option>
                                                                                    ))
                                                                                }
                                                                            </>
                                                                            :
                                                                            <>
                                                                            </>
                                                                    }
                                                                    <option style={{ borderTop: "1px solid black" }} value="newTemplate"> + Add New Email Template</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                </div>
                                                <div className="row align-items-center" sstyle={{ marginLeft: '50px', marginTop: '57px' }}>
                                                    <div style={{ marginLeft: '50px', display: 'inline-flex', alignItems: 'center' }}>
                                                        <Checkbox size={'small'}
                                                            checked={inductionInfo?.sendEmail}
                                                            onClick={() => {
                                                                setInductionInfo((prevOtherInfo) => ({
                                                                    ...prevOtherInfo,
                                                                    sendEmail: !inductionInfo?.sendEmail,
                                                                }));
                                                            }}
                                                            color={'primary'} />
                                                        <p style={{ fontSize: '14px', marginTop: '35px' }}>
                                                            On Clicking Save, a notification and email will be triggered to the university<br/>
                                                             and its students
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <button className="btn mr-2" type="submit"
                                                        disabled={inductionInfo?.sharedFlag}
                                                        style={{ marginRight: '20px' }} >Share</button>
                                                    <button style={{ marginRight: '20px' }} className="btn mr-2" disabled={inductionInfo.inductionID > 0 ? false : true}>Disable</button>
                                                    <button className="btn mr-2" type="submit">Save</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
            {
                enableSuccessModal
                    ?
                    <>
                        <div>
                            <Modal isOpen={enableSuccessModal} toggle={toggleSuccessModal}>
                                <ModalBody style={{ textAlign: "center" }} >
                                    <CancelOutlinedIcon className="cancelbtn" onClick={toggleSuccessModal} />
                                    <div className="notification-icon d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ color: "#253AA3", background: "lightblue", borderRadius: "50%", width: "100px", height: "100px", textAlign: "center", display: "inline-block" }}>
                                            <i className="fa fa-envelope fa-4x" style={{ marginTop: "10px" }} />
                                        </div>
                                    </div>
                                    <p style={{ textAlign: "center" }} className="paragraph">Pre-Induction</p>
                                    <p style={{ textAlign: "center" }} className="paragraph2">{operationType} successfully</p>
                                </ModalBody>
                            </Modal>
                        </div>
                    </>
                    :
                    <>
                    </>
            }
            {
                enableEmailTemplateSuccessModal
                    ?
                    <>
                        <div>
                            <Modal isOpen={enableEmailTemplateSuccessModal} toggle={toggleEmailTemplateSuccessModal}>
                                <ModalBody style={{ textAlign: "center" }} >
                                    <CancelOutlinedIcon className="cancelbtn" onClick={toggleEmailTemplateSuccessModal} />
                                    <div className="notification-icon d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ color: "#253AA3", background: "lightblue", borderRadius: "50%", width: "100px", height: "100px", textAlign: "center", display: "inline-block" }}>
                                            <i className="fa fa-envelope fa-4x" style={{ marginTop: "10px" }} />
                                        </div>
                                    </div>
                                    <p style={{ textAlign: "center" }} className="paragraph">New Email Template</p>
                                    <p style={{ textAlign: "center" }} className="paragraph2">saved successfully</p>
                                </ModalBody>
                            </Modal>
                        </div>
                    </>
                    :
                    <>
                    </>
            }
        </>
    );
}

export default DefineInduction