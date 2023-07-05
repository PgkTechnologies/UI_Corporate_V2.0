import React, { useState, useEffect } from "react";
import { TextField } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { AddRounded } from "@material-ui/icons";
import moment from 'moment';
import { actionGetCampusDriveDefineJobsListRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/DefineJobsSagaActions";
import { actionPatchInterviewRoundsSaga, actionPostInterviewRoundsSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CommunicationSagaAction";
import { actionGetInterviewRoundsRequestSaga } from "../../../../Store/Actions/SagaActions/CampusDriveWorkflowActions/CampusInterviewSagaAction";

const SaveInterviewRounds = (props) => {
    const dispatch = useDispatch();
    const [jobsList, setJobsList] = useState([]);
    const initialData = {
        "cdID": props?.campusDriveId,
        "noOfRounds": 1,
        "jobID": props?.jobId,
        "interviewRoundID": 0,
        "round1": "Round 1",
        "round1StartDate": "",
        "round1EndDate": "",
        "round1SharedFlag": false,
        "round1Type": "",
        "round2": "",
        "round2StartDate": "",
        "round2EndDate": "",
        "round2SharedFlag": false,
        "round2Type": "",
        "round3": "",
        "round3StartDate": "",
        "round3EndDate": "",
        "round3SharedFlag": false,
        "round3Type": "",
        "round4": "",
        "round4StartDate": "",
        "round4EndDate": "",
        "round4SharedFlag": false,
        "round4Type": "",
        "round5": "",
        "round5StartDate": "",
        "round5EndDate": "",
        "round5SharedFlag": false,
        "round5Type": "",
        "round6": "",
        "round6StartDate": "",
        "round6EndDate": "",
        "round6SharedFlag": false,
        "round6Type": "",
        "round7": "",
        "round7StartDate": "",
        "round7EndDate": "",
        "round7SharedFlag": false,
        "round7Type": "",
        "round8": "",
        "round8StartDate": "",
        "round8EndDate": "",
        "round8SharedFlag": false,
        "round8Type": "",
        "round9": "",
        "round9StartDate": "",
        "round9EndDate": "",
        "round9SharedFlag": false,
        "round9Type": "",
        "round10": "",
        "round10StartDate": "",
        "round10EndDate": "",
        "round10SharedFlag": false,
        "round10Type": ""
    };

    function getFormattedDate(date) {
        let d = new Date(date);
        let monthPrefix = "";
        let datePrefix = "";
        if (d.getMonth() < 9) {
            monthPrefix = "0"
        }

        else {
            monthPrefix = ''
        }
        if (d.getDate() < 10) {
            datePrefix = "0"
        }
        else {
            datePrefix = ''
        }
        return d.getFullYear() + '-' + monthPrefix + parseInt(d.getMonth() + 1) + '-' + datePrefix + d.getDate();
    }

    const [addRounds, setAddRounds] = useState(initialData);

    const AddRound = () => {
        if (addRounds?.noOfRounds == 1) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 2,
            }));
        }
        else if (addRounds?.noOfRounds == 2) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 3,
            }));
        }
        else if (addRounds?.noOfRounds == 3) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 4,
            }));
        }
        else if (addRounds?.noOfRounds == 4) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 5,
            }));
        }
        else if (addRounds?.noOfRounds == 5) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 6,
            }));
        }
        else if (addRounds?.noOfRounds == 6) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 7,
            }));
        }
        else if (addRounds?.noOfRounds == 7) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 8,
            }));
        }
        else if (addRounds?.noOfRounds == 8) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 9,
            }));
        }
        else if (addRounds?.noOfRounds == 9) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 10,
            }));
        }
    }

    const onDeleteRound = (roundType) => {
        if (roundType == "round2") {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 1,
                round2: "",
                round2StartDate: "",
                round2EndDate: "",
                round2Type: ""
            }));
        }
        else if (roundType == "round3") {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 2,
                round3: "",
                round3StartDate: "",
                round3EndDate: "",
                round3Type: ""
            }));
        }
        else if (roundType == "round4") {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 3,
                round4: "",
                round4StartDate: "",
                round4EndDate: "",
                round4Type: ""
            }));
        }
        else if (roundType == "round5") {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 4,
                round5: "",
                round5StartDate: "",
                round5EndDate: "",
                round5Type: ""
            }));
        }
        else if (roundType == "round6") {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 5,
                round6: "",
                round6StartDate: "",
                round6EndDate: "",
                round6Type: ""
            }));
        }
        else if (roundType == "round7") {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 6,
                round7: "",
                round7StartDate: "",
                round7EndDate: "",
                round7Type: ""
            }));
        }
        else if (roundType == "round8") {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 7,
                round8: "",
                round8StartDate: "",
                round8EndDate: "",
                round8Type: ""
            }));
        }
        else if (roundType == "round9") {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 8,
                round9: "",
                round9StartDate: "",
                round9EndDate: "",
                round9Type: ""
            }));
        }
        else if (roundType == "round10") {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                noOfRounds: 9,
                round10: "",
                round10StartDate: "",
                round10EndDate: "",
                round10Type: ""
            }));
        }
    }

    const onChange = (event) => {
        let { name, value } = event.target;
        console.log(name, value, "ROUND")
        if ([
            'round1StartDate', 'round1EndDate',
            'round2StartDate', 'round2EndDate',
            'round3StartDate', 'round3EndDate',
            'round4StartDate', 'round4EndDate',
            'round5StartDate', 'round5EndDate',
            'round6StartDate', 'round6EndDate',
            'round7StartDate', 'round7EndDate',
            'round8StartDate', 'round8EndDate',
            'round9StartDate', 'round9EndDate',
            'round10StartDate', 'round10EndDate',
        ].includes(name)) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                [name]: moment(value).format('YYYY-MM-DD'),
            }));
        } else {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                [name]: value,
            }));
        }
        if (name.includes("1")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round1: "Round 1",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round1EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round2StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round2EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round3StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round3EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round4StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round4EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round5StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round5EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round6StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round6EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round7StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round7EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round8StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round8EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round9StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round9EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round10StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round10EndDate: "",
                }));
            }
        }
        else if (name.includes("2")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round2: "Round 2",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round2EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round3StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round3EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round4StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round4EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round5StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round5EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round6StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round6EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round7StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round7EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round8StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round8EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round9StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round9EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round10StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round10EndDate: "",
                }));
            }
        }
        else if (name.includes("3")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round3: "Round 3",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round3EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round4StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round4EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round5StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round5EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round6StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round6EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round7StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round7EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round8StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round8EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round9StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round9EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round10StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round10EndDate: "",
                }));
            }
        }
        else if (name.includes("4")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round4: "Round 4",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round4EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round5StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round5EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round6StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round6EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round7StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round7EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round8StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round8EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round9StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round9EndDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round10StartDate: "",
                }));
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round10EndDate: "",
                }));
            }
        }
        else if (name.includes("5")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round5: "Round 5",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round5EndDate: "",
                }));
            }
        }
        else if (name.includes("6")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round6: "Round 6",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round6EndDate: "",
                }));
            }
        }
        else if (name.includes("7")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round7: "Round 7",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round7EndDate: "",
                }));
            }
        }
        else if (name.includes("8")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round8: "Round 8",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round8EndDate: "",
                }));
            }
        }
        else if (name.includes("9")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round9: "Round 9",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round9EndDate: "",
                }));
            }
        }
        else if (name.includes("10")) {
            setAddRounds((prevOtherInfo) => ({
                ...prevOtherInfo,
                round10: "Round 10",
            }));
            if (name.includes("StartDate")) {
                setAddRounds((prevOtherInfo) => ({
                    ...prevOtherInfo,
                    round10EndDate: "",
                }));
            }
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const model = {}

        // "cdID": props?.campusDriveId,
        // "noOfRounds": 1,
        // "jobID": props?.jobId,
        // "interviewRoundID": 0,
        // "round1": "Round 1",
        // "round1StartDate": "",
        // "round1EndDate": "",
        // "round1SharedFlag": false,
        // "round1Type": "",

        for (let index = 1; index <= addRounds.noOfRounds; index++) {
            model[`round${index}`] = addRounds[`round${index}`]
            model[`round${index}StartDate`] = addRounds[`round${index}StartDate`]
            model[`round${index}EndDate`] = addRounds[`round${index}EndDate`]
            model[`round${index}SharedFlag`] = addRounds[`round${index}SharedFlag`]
            model[`round${index}Type`] = addRounds[`round${index}Type`]
        }

        model['cdID'] = addRounds.cdID;
        model['jobID'] = addRounds.jobID;
        model['interviewRoundID'] = addRounds.interviewRoundID;
        model['noOfRounds'] = addRounds.noOfRounds;

        // console.log('model ', model);

        if (addRounds.interviewRoundID > 0) {
            dispatch(actionPatchInterviewRoundsSaga({
                apiPayloadRequest: model,
                callback: onSuccess
            }));
        }
        else {
            dispatch(actionPostInterviewRoundsSaga({
                apiPayloadRequest: model,
                callback: onSuccess
            }));
        }

        // onSuccess();
    }

    const onSuccess = () => {
        props.onSuccess();
    }

    const getJobData = (data) => {
        setJobsList(data);
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

    const getRoundsInformation = (data) => {
        if (data.noOfRounds > 0) {
            setAddRounds(data);
        }
    }

    useEffect(() => {
        getinteviewRoundsInformation(props.jobId);
        dispatch(actionGetCampusDriveDefineJobsListRequestSaga({
            campusDriveId: props?.campusDriveId,
            callback: getJobData
        }));
    }, []);


    return (
        <div className="bgWhite h-full">
            <div className="d-flex flex-column justify-content-start align-items-center w-full">
                <p className="heading" style={{ color: "#253AA3", fontWeight: "bold", fontFamily: "Poppins-Regular", display: "block" }}>
                    Save Interview Round Details
                </p>
            </div>
            <br />
            <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }}>
                <TextField
                    label="Job Name"
                    variant="outlined"
                    type="text"
                    value={props.jobName}
                    InputLabelProps={{
                        shrink: true,
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    inputProps={{
                        style: { fontFamily: "Poppins-Regular", display: "block" }
                    }}
                    margin="dense"
                    style={{ width: "80%" }}
                />
            </div>
            <br />
            <div style={{ borderTop: "1px solid black", width: "100%", marginLeft: 20, marginRight: 20 }}></div>
            <br />
            <form onSubmit={onSubmit} style={{ height: "330px", overflowY: "scroll", overflowX: "scroll" }}>
                <button type="button" className="btn" onClick={() => { AddRound() }} style={{ marginLeft: "75%", marginBottom: "2px" }}><p>+ Add Round</p></button>
                <table className="table table-striped table-bordered">
                    <thead style={{ backgroundColor: "#01253cf5", color: "white" }}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Round</th>
                            <th scope="col">From Date</th>
                            <th scope="col">To Date</th>
                            <th scope="col">Type</th>
                            <th scope="col">Delete Round</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">
                                1
                            </td>
                            <td style={{ textAlign: "center" }}>Round 1</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round1StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={true}
                                    value={getFormattedDate(addRounds.round1StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round1EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        // min: addRounds?.round1EndDate,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={true}
                                    value={getFormattedDate(addRounds.round1EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round1Type"
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
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round1Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round1Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round1Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>

                            </td>
                        </tr>

                        <tr style={{ display: addRounds?.noOfRounds > 1 ? "" : "none" }}>
                            <td scope="row">
                                2
                            </td>
                            <td>Round 2</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round2StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 1 ? true : false}
                                    value={getFormattedDate(addRounds.round2StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round2EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        // min: addRounds?.round2EndDate,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 1 ? true : false}
                                    value={getFormattedDate(addRounds.round2EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round2Type"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required={addRounds?.noOfRounds > 1 ? true : false}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round2Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round2Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round2Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>
                                <button className="btn" type="button" disabled={addRounds?.round2SharedFlag} onClick={() => { onDeleteRound("round2") }}> Delete</button>
                            </td>
                        </tr>

                        <tr style={{ display: addRounds?.noOfRounds > 2 ? "" : "none" }}>
                            <td scope="row">
                                3
                            </td>
                            <td>Round 3</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round3StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 2 ? true : false}
                                    value={getFormattedDate(addRounds.round3StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round3EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        // min: addRounds?.round1EndDate,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 2 ? true : false}
                                    value={getFormattedDate(addRounds.round3EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round3Type"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required={addRounds?.noOfRounds > 2 ? true : false}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round3Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round3Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round3Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>
                                <button className="btn" type="button" disabled={addRounds?.round3SharedFlag} onClick={() => { onDeleteRound("round3") }}> Delete</button>
                            </td>
                        </tr>

                        <tr style={{ display: addRounds?.noOfRounds > 3 ? "" : "none" }}>
                            <td scope="row">
                                4
                            </td>
                            <td>Round 4</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round4StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 3 ? true : false}
                                    value={getFormattedDate(addRounds.round4StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round4EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 3 ? true : false}
                                    value={getFormattedDate(addRounds.round4EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round4Type"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required={addRounds?.noOfRounds > 3 ? true : false}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round4Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round4Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round4Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>
                                <button className="btn" type="button" disabled={addRounds?.round4SharedFlag} onClick={() => { onDeleteRound("round4") }}> Delete</button>
                            </td>
                        </tr>

                        <tr style={{ display: addRounds?.noOfRounds > 4 ? "" : "none" }}>
                            <td scope="row">
                                5
                            </td>
                            <td>Round 5</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round5StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 4 ? true : false}
                                    value={getFormattedDate(addRounds.round5StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round5EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 5 ? true : false}
                                    value={getFormattedDate(addRounds.round5EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round5Type"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required={addRounds?.noOfRounds > 4 ? true : false}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round5Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round5Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round5Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>
                                <button className="btn" type="button" disabled={addRounds?.round5SharedFlag} onClick={() => { onDeleteRound("round5") }}> Delete</button>
                            </td>
                        </tr>

                        <tr style={{ display: addRounds?.noOfRounds > 5 ? "" : "none" }}>
                            <td scope="row">
                                6
                            </td>
                            <td>Round 6</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round6StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 5 ? true : false}
                                    value={getFormattedDate(addRounds.round6StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round6EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 5 ? true : false}
                                    value={getFormattedDate(addRounds.round6EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round6Type"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required={addRounds?.noOfRounds > 5 ? true : false}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round6Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round6Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round6Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>
                                <button className="btn" type="button" disabled={addRounds?.round6SharedFlag} onClick={() => { onDeleteRound("round6") }}> Delete</button>
                            </td>
                        </tr>

                        <tr style={{ display: addRounds?.noOfRounds > 6 ? "" : "none" }}>
                            <td scope="row">
                                7
                            </td>
                            <td>Round 7</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round7StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 6 ? true : false}
                                    value={getFormattedDate(addRounds.round7StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round7EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        // min: addRounds?.round7EndDate,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 6 ? true : false}
                                    value={getFormattedDate(addRounds.round7EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round7Type"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required={addRounds?.noOfRounds > 6 ? true : false}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round7Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round7Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round7Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>
                                <button className="btn" type="button" disabled={addRounds?.round7SharedFlag} onClick={() => { onDeleteRound("round7") }}> Delete</button>
                            </td>
                        </tr>

                        <tr style={{ display: addRounds?.noOfRounds > 7 ? "" : "none" }}>
                            <td scope="row">
                                8
                            </td>
                            <td>Round 8</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round8StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 7 ? true : false}
                                    value={getFormattedDate(addRounds.round8StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round8EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        // min: addRounds?.round8EndDate,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 7 ? true : false}
                                    value={getFormattedDate(addRounds.round8EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round8Type"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required={addRounds?.noOfRounds > 7 ? true : false}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round8Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round8Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round8Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>
                                <button className="btn" type="button" disabled={addRounds?.round8SharedFlag} onClick={() => { onDeleteRound("round8") }}> Delete</button>
                            </td>

                        </tr>

                        <tr style={{ display: addRounds?.noOfRounds > 8 ? "" : "none" }}>
                            <td scope="row">
                                9
                            </td>
                            <td>Round 9</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round9StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 8 ? true : false}
                                    value={getFormattedDate(addRounds.round9StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round9EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        // min: addRounds?.round9EndDate,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 8 ? true : false}
                                    value={getFormattedDate(addRounds.round9EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round9Type"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required={addRounds?.noOfRounds > 8 ? true : false}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round9Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round9Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round9Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>
                                <button className="btn" type="button" disabled={addRounds?.round9SharedFlag} onClick={() => { onDeleteRound("round9") }}> Delete</button>
                            </td>
                        </tr>

                        <tr style={{ display: addRounds?.noOfRounds > 9 ? "" : "none" }}>
                            <td scope="row">
                                10
                            </td>
                            <td>Round 10</td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round10StartDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 9 ? true : false}
                                    value={getFormattedDate(addRounds.round10StartDate)}
                                    margin="dense"
                                />

                            </td>
                            <td>
                                <TextField
                                    type="date"
                                    name="round10EndDate"
                                    onChange={onChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        // min: addRounds?.round10EndDate,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    required={addRounds?.noOfRounds > 9 ? true : false}
                                    value={getFormattedDate(addRounds.round10EndDate)}
                                    margin="dense"
                                /></td>
                            <td>
                                <TextField
                                    select
                                    name="round10Type"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    inputProps={{
                                        style: { fontFamily: "Poppins-Regular", display: "block" }
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required={addRounds?.noOfRounds > 9 ? true : false}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    style={{ width: "200px" }}
                                    onChange={onChange}
                                >
                                    <option value="">Select Round Type</option>
                                    <option value="Written Test" selected={addRounds.round10Type === "Written Test" ? true : false}> Written Test </option>
                                    <option value="Coding" selected={addRounds.round10Type === "Coding" ? true : false}> Coding </option>
                                    <option value="Personal Interview" selected={addRounds.round10Type === "Personal Interview" ? true : false}> Personal Interview </option>
                                </TextField></td>
                            <td>
                                <button className="btn" type="button" disabled={addRounds?.round10SharedFlag} onClick={() => { onDeleteRound("round10") }}> Delete</button>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <br />
                <div style={{ borderTop: "1px solid black", width: "100%", marginLeft: 20, marginRight: 20 }}></div>
                <br />
                <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }}>
                    <button type="button" className="btn" style={{ paddingRight: "10px" }} onClick={() => { props.onCancel() }} ><p>Cancel</p></button>
                    <button type="submit" className="btn"><p>Save</p></button>
                </div>
                <br />
            </form>
            <br />
        </div>
    );
};

export default SaveInterviewRounds;
