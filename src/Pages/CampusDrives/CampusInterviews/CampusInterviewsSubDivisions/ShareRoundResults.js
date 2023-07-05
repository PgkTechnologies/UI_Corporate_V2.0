import React, { useState, useEffect, useRef } from "react";
import { FormControl, Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from 'react-csv';
// import CustomToastModal from "../../../../../Components/CustomToastModal";
import { actionGetCampusDriveDefineJobsListRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";
import { actionGetInterviewRoundsRequestSaga, actionGetStudentsListSaga, actionPostStudentsListShareRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CampusInterviewSagaAction";
import { actionGetCampusDriveStudentResumeRequest } from "../../../../Store/Actions/SagaActions/CampusDriveSagaActions";
import { CancelOutlined } from "@mui/icons-material";
import PreLoader from "../../../../utils/PreLoader";
import { Modal, ModalBody } from "react-bootstrap";

const ShareRoundResults = (props) => {
    const dispatch = useDispatch();
    const [jobsList, setJobsList] = useState([]);
    const [selectedJobID, setSelectedJobID] = useState();
    const [selectedJobName, setSelectedJobName] = useState("");
    const [roundStartDate, setStartDate] = useState("");
    const [interviewRoundsInfo, setInterviewRoundsInfo] = useState();
    const [studentsListForRound, setStudentsListForRound] = useState();
    const [roundId, setRoundId] = useState();
    const [showToastModal, setShowToastModal] = useState(false);
    const csvLink = useRef();

    const apiStatus = useSelector(state => state.DashboardReducer.apiStatus);

    const onJobChange = (event) => {
        const { name, value } = event.target;
        if (value && value !== 'DEFAULT') {
            setSelectedJobID(value);
            jobsList.map((item) => {
                if (item.jobID === value) {
                    setSelectedJobName(item.jobName);
                }
            });
            getinteviewRoundsInformation(value);
        } else {
            setSelectedJobID();
            setSelectedJobName();
            setInterviewRoundsInfo();
            setStudentsListForRound();
        }
    }

    const getRoundsInformation = (data) => {
        console.log(data);
        setInterviewRoundsInfo(data);
    }

    const getinteviewRoundsInformation = (jobID) => {
        const inputModel = {
            campusDriveID: props?.campusDriveId,
            jobID: jobID
        };
        dispatch(actionGetInterviewRoundsRequestSaga({
            apiPayloadRequest: inputModel,
            callback: getRoundsInformation
        }));
    }

    const getStudentsList = (roundNumber) => {
        const inputModel = {
            cdID: props?.campusDriveId,
            jobID: selectedJobID,
            interviewRoundID: roundNumber
        };

        const params = Object.keys(inputModel).map(item => {
            // if (inputModel[item]) {
            return `${item}=${inputModel[item]}&`
            //}
        }).join('').replace(/&$/, "");

        dispatch(actionGetStudentsListSaga({
            apiPayloadRequest: params,
            callback: getStudentsListForRound
        }));
    }

    const getStudentsListForRound = (data) => {
        console.log(data);
        setStudentsListForRound(data);
    }

    const onDownloadData = () => {
        csvLink.current.link.click();
    }

    const onRoundChange = (event) => {
        const { name, value } = event.target;
        if (value && value !== 'DEFAULT') {
            getStudentsList(value);
            setRoundId(value);
        } else {
            setStudentsListForRound();
            setRoundId();
        }
    }

    const getJobData = (data) => {
        setJobsList(data.filter(x => x.status === "open"));
    }

    useEffect(() => {
        dispatch(actionGetCampusDriveDefineJobsListRequestSaga({
            campusDriveId: props?.campusDriveId,
            callback: getJobData
        }));

    }, []);

    const openFileInBrowser = (data, fileName) => {
        if (data.length < 250) {
            props.getAttach(data);
        }
        else {
            var objbuilder = '';
            objbuilder += ('<object width="100%" height="100%" data = "data:application/pdf;base64,');
            objbuilder += (data);
            objbuilder += ('" type="application/pdf" class="internal">');
            objbuilder += ('<embed src="data:application/pdf;base64,');
            objbuilder += (data);
            objbuilder += ('" type="application/pdf"  />');
            objbuilder += ('</object>');
            var windo = window.open("#", "_blank");
            windo.document.write('<html><title>' + fileName + '</title><body style="margin-top: 0px; margin - left: 0px; margin - right: 0px; margin - bottom: 0px; ">');
            windo.document.write(objbuilder);
            windo.document.write('</body></html>');
        }
    }

    const getResume = (studentId, resumeId) => {
        if (studentId && studentId?.trim() !== '' && resumeId && resumeId?.trim() !== '') {
            dispatch(actionGetCampusDriveStudentResumeRequest({
                apiPayloadRequest: {
                    studentId: studentId,
                    resumeId: resumeId
                },
                callback: (response) => {
                    if (response?.resumeFile !== '') {
                        console.log(response?.resumeFile);
                        openFileInBrowser(response?.resumeFile, `${studentId}${resumeId}.pdf`);
                    }
                }
            }))
        }
    }

    const shareRoundResults = () => {
        if (selectedJobID && selectedJobID?.trim() !== 'DEFAULT' && roundId !== undefined && roundId?.trim() !== 'DEFAULT') {
            const inputModel = {
                cdID: props?.campusDriveId,
                jobID: selectedJobID,
                interviewRoundID: roundId
            };

            console.log(inputModel, "SHARE")

            dispatch(actionPostStudentsListShareRequestSaga({
                apiPayloadRequest: inputModel,
                callback: (response) => {
                    setShowToastModal(true);
                }
            }))
        }
    }
    //console.log(studentsListForRound.studentsList, "LIST")
    return (
        <div className="bgWhite" style={{ height: '580px' }}>
            <CSVLink
                data={"DummyData"}
                filename='StudentsData.csv'
                className='hidden'
                ref={csvLink}
                target='_blank'
            />
            <div className="d-flex flex-column justify-content-start align-items-center w-full">
                <p className="heading" style={{ color: "#253AA3", fontWeight: "bold", fontFamily: "Poppins-Regular", display: "block" }}>
                    Share Captured Results
                </p>
            </div>
            <br />
            <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }}>
                <TextField
                    select
                    label="Job Name"
                    // type="text"
                    // name="startDate"
                    // onChange={props.handleChange}
                    InputLabelProps={{
                        shrink: true,
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    inputProps={{
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    variant="outlined"
                    margin="dense"
                    style={{ width: "45%" }}
                    required={true}
                    SelectProps={{
                        native: true,
                    }}
                    placeholder="dd-mon-yyyy"
                    onChange={onJobChange}
                // value={props.addProgram.startDate}
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
                <TextField
                    select
                    label="Round Name"
                    // type="text"
                    // name="startDate"
                    // onChange={props.handleChange}
                    InputLabelProps={{
                        shrink: true,
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    inputProps={{
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    variant="outlined"
                    margin="dense"
                    style={{ width: "45%" }}
                    required={true}
                    SelectProps={{
                        native: true,
                    }}
                    onChange={onRoundChange}
                >
                    <option value={'DEFAULT'}>Select a Round</option>
                    {
                        interviewRoundsInfo?.round1
                            ?
                            <option value={1}
                                key={"round1"}
                            >{"Round 1"}</option>
                            :
                            <>
                            </>
                    }
                    {
                        interviewRoundsInfo?.round2
                            ?
                            <option value={2}
                                key={"round2"}
                            >{"Round 2"}</option>
                            :
                            <>
                            </>
                    }
                    {
                        interviewRoundsInfo?.round3
                            ?
                            <option value={3}
                                key={"round3"}
                            >{"Round 3"}</option>
                            :
                            <>
                            </>
                    }
                    {
                        interviewRoundsInfo?.round4
                            ?
                            <option value={4}
                                key={"round4"}
                            >{"Round 4"}</option>
                            :
                            <>
                            </>
                    }
                    {
                        interviewRoundsInfo?.round5
                            ?
                            <option value={5}
                                key={"round5"}
                            >{"Round 5"}</option>
                            :
                            <>
                            </>
                    }
                    {
                        interviewRoundsInfo?.round6
                            ?
                            <option value={6}
                                key={"round6"}
                            >{"Round 6"}</option>
                            :
                            <>
                            </>
                    }
                    {
                        interviewRoundsInfo?.round7
                            ?
                            <option value={7}
                                key={"round7"}
                            >{"Round 7"}</option>
                            :
                            <>
                            </>
                    }
                    {
                        interviewRoundsInfo?.round8
                            ?
                            <option value={8}
                                key={"round8"}
                            >{"Round 8"}</option>
                            :
                            <>
                            </>
                    }
                    {
                        interviewRoundsInfo?.round9
                            ?
                            <option value={9}
                                key={"round9"}
                            >{"Round 9"}</option>
                            :
                            <>
                            </>
                    }
                    {
                        interviewRoundsInfo?.round10
                            ?
                            <option value={10}
                                key={"round10"}
                            >{"Round 10"}</option>
                            :
                            <>
                            </>
                    }

                </TextField>
            </div>
            <br />
            <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }}>
                <TextField
                    label="From Date"
                    type="text"
                    // name="startDate"
                    // onChange={props.handleChange}
                    InputLabelProps={{
                        shrink: true,
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    inputProps={{
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    variant="outlined"
                    margin="dense"
                    style={{ width: "30%" }}
                    value={studentsListForRound?.roundStartDate ? studentsListForRound?.roundStartDate : ''}
                />


                <TextField
                    label="To Date"
                    type="text"
                    name="endDate"
                    // onChange={props.handleChange}
                    InputLabelProps={{
                        shrink: true,
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    inputProps={{
                        // min: props.addProgram.startDate,
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    //disabled={props.addProgram.startDate.length > 0 ? false : true}
                    variant="outlined"
                    margin="dense"
                    style={{ width: "30%" }}
                    value={studentsListForRound?.roundEndDate ? studentsListForRound?.roundEndDate : ''}
                />
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
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    variant="outlined"
                    margin="dense"
                    style={{ maxWidth: "30%" }}
                    value={studentsListForRound?.noOfStudentsSelected ? studentsListForRound?.noOfStudentsSelected : ''} //{props.addRanking.rank}
                // helperText={props.rankNumberErr}
                // error={props.rankNumberErr ? true : false}
                />
            </div>
            <br />
            <div style={{ borderTop: "1px solid black", width: "100%", marginLeft: 20, marginRight: 20 }}></div>
            <br />
            <div style={{ height: "250px", overflowY: "scroll", overflowX: "hidden" }}>
                <table class="table table-striped table-bordered">
                    <thead style={{ backgroundColor: "#01253cf5", color: "white" }}>
                        <tr>
                            <th scope="col">Student Name</th>
                            {/* <th scope="col">College Roll No.</th> */}
                            <th scope="col">Email ID</th>
                            <th scope="col">Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                    {apiStatus ? <PreLoader /> : null}
                        {
                            studentsListForRound?.studentsList && studentsListForRound?.studentsList?.length > 0
                                ?
                                <>
                                    {
                                        studentsListForRound.studentsList.filter((student) => student.selected).map((studentInfo) => (
                                            <tr>
                                                <td>{studentInfo.name}</td>
                                                {/* <td>{studentInfo.collegeRollNo}</td> */}
                                                <td>{studentInfo.email}</td>
                                                <td style={{ cursor: 'pointer' }} onClick={() => {
                                                    getResume(studentInfo?.applicantID, studentInfo?.resumeID)
                                                }}>{studentInfo?.resumeName} <i className={"fa fa-paperclip"}></i></td>
                                            </tr>
                                        ))
                                    }

                                </>
                                :
                                <>
                                </>
                        }
                    </tbody>
                </table>
            </div>
            <br />
            <div style={{ borderTop: "1px solid black", width: "100%", marginLeft: 20, marginRight: 20 }}></div>
            <br />
            <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }}>

                <button type="button" className="btn" onClick={shareRoundResults} disabled={roundId ? interviewRoundsInfo[`round${roundId}ResultsSharedFlag`] : true} ><p>Share</p></button>
                {/* <button type="button" className="btn" onClick={shareRoundResults} ><p>Share</p></button> */}
            </div>
            {showToastModal &&
                // <CustomToastModal
                //     onClose={() => {
                //         setShowToastModal(false);
                //         getStudentsList(roundId);
                //     }}
                //     show={showToastModal}
                //     iconNameClass={"fa-check"}
                //     message={'Round results shared successfully!'}
                // />
                <Modal isOpen={showToastModal} >
                    <ModalBody>
                        <CancelOutlined
                            onClick={() => {
                                setShowToastModal(false);
                                getStudentsList(roundId);
                            }}
                        />
                        <h3>{'Round results shared successfully!'}</h3>
                    </ModalBody>
                </Modal>
            }
            <br />
            <br />
        </div>
    );
};

export default ShareRoundResults;
