import { Badge, Container, Tab, Tabs, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import OutboxIcon from '@mui/icons-material/Outbox';
import { AccountBalance, ArrowRight, CalendarMonth, LocationOn } from "@mui/icons-material";
import { IoArrowForwardCircleSharp } from 'react-icons/io5';
import { TiDownload } from 'react-icons/ti';
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { actionGetCampusDriveAcceptedInvitesListRequest } from "../../Store/Actions/SagaActions/CampusDriveSagaActions";
import { Pagination } from "@mui/material";
import NearMeDisabledRoundedIcon from '@mui/icons-material/NearMeDisabledRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
const OnCampusJobs = (props) => {

    const [tabValue, setTabValue] = useState(0);
    const size = 5;
    const [receivedList, setReceivedList] = useState([]);
    const [receivedPage, setReceivedPage] = useState(1);
    const [receivedCount, setReceivedCount] = useState(0);
    const [sentList, setSentList] = useState([]);
    const [sentPage, setSentPage] = useState(1);
    const [sentCount, setSentCount] = useState(0);
    const dispatch = useDispatch();
    const history = useNavigate();



    const getResponse = (dataList) => {
        if (dataList?.campusInviteReceived?.length) {
            setReceivedList(dataList.campusInviteReceived);
        }

        if (dataList?.campusInviteSent?.length) {
            setSentList(dataList.campusInviteSent);
        }

        if (dataList?.campusInviteSentCount) {
            setSentCount(dataList.campusInviteSentCount);
        }

        if (dataList?.campusInviteReceivedCount) {
            setReceivedCount(dataList.campusInviteReceivedCount);
        }
    }

    useEffect(() => {
        dispatch(actionGetCampusDriveAcceptedInvitesListRequest({
            page: tabValue === 0 ? sentPage : receivedPage,
            size,
            callback: getResponse
        }))
    }, [sentPage, receivedPage]);

    useEffect(() => {
        setReceivedPage(1);
        setSentPage(1);
    }, [tabValue]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    const navigateToCampusDrive = (campusDriveId, universityId , receiverName , initiatorName) => {
        history('/jobs/' + campusDriveId + '/define-jobs/' + universityId);
        localStorage.setItem("onCampReceiver" , receiverName );
        localStorage.setItem("onCampInitiator" , initiatorName );
    }

    console.log(sentList, receivedList, 'sentVALUE    ')
    return (
        <>

            <div style={{
                display: 'flex',
                paddingTop: '150px',
                width: '100%',
                flexDirection: 'column',
            }}>
                <h3 style={{ fontWeight: 'bold' }} >Campus Drives</h3>
                <Tabs
                     value={tabValue}
                     onChange={handleTabChange}
                     indicatorColor="secondary"
                     textColor="primary"
                     variant="scrollable"
                     style={{background:'#39bdf60b'}}
                >
                    <Tab
                        // icon={
                        //     <Badge color="error">
                        //         <TiDownload size={30} />
                        //     </Badge>
                        // }
                        label={'Campus Invite Received' }
                        wrapped
                        style={{
                            fontWeight:'bold',
                            outline: "none",
                            minWidth: '15%',
                            background:'#39bdf60b'
                            // background:'#B9D9EB',
                            // borderRadius:'15px '
                        }}
                    />
                    <Tab
                        // icon={
                        //     <Badge color="error">
                        //         <OutboxIcon size={30} />

                        //     </Badge>
                        // }
                        label={ 'Campus Invite Sent' }
                        wrapped
                        style={{
                            fontWeight:'bold',
                            outline: "none",
                            minWidth: '15%',
                            background:'#39bdf60b',
                            // borderRadius:'15px '
                            // height: '150px',
                        }}
                    />
                </Tabs>
                {tabValue === 0 &&
                    <>
                        <div className="container-body">
                            {sentList?.length >= 1 ?
                                sentList?.map((item, index) => {

                                    return (
                                        <div className="cards-container" key={index}>

                                            <div className='jobs-cards-container'>


                                                <div className="row job-card-main">
                                                    <div
                                                        className="col-5 d-flex justify-content-flex-start align-items-center"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        <AccountBalance style={{ fontSize: "30px", marginRight: "25px" }} />
                                                        {item?.receiverName}
                                                    </div>
                                                    <div
                                                        className="col-3 d-flex justify-content-flex-start align-items-center"
                                                        style={{ fontSize: "15px", color: "gray" }}
                                                    >
                                                        <LocationOn style={{ marginRight: "10px", color: "gray" }} />
                                                        {item?.receiverLocation}
                                                    </div>
                                                    <div
                                                        className="col-3 d-flex justify-content-flex-start align-items-center"
                                                        style={{ fontSize: "15px", color: "gray" }}
                                                    >
                                                        <CalendarMonth style={{ marginRight: "10px", color: "gray" }} />
                                                        {item.responseDate}
                                                    </div>
                                                    <div className="col-1 d-flex justify-content-end align-items-center">
                                                        {item?.campusDriveClosed ? (
                                                            <LockRoundedIcon style={{ color: 'red' }} />
                                                        ) : (
                                                            <ArrowRight
                                                                style={{ fontSize: "50px", color: "darkblue", cursor: "pointer" }}
                                                                onClick={() => {
                                                                    navigateToCampusDrive(item?.campusDriveID, item?.receiverID , item?.receiverName);
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>


                                            </div>




                                        </div>

                                    );
                                })
                                :
                                <div style={{ color: 'gray', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%' }}>
                                    <h5>No Active Drives</h5>
                                </div>
                            }
                        </div>
                        <Container component={Box} py={3} style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                            <Pagination
                                count={Math.ceil(sentCount / size)}
                                page={sentPage}
                                shape={'rounded'}
                                color={'primary'}
                                variant={'outlined'}
                                onChange={(event, value) => setSentPage(value)}
                            />
                        </Container>
                    </>
                }


                {tabValue === 1 &&
                    <div
                        className="container-body"
                    >
                        {receivedList?.length >= 1 ?
                            receivedList?.map((item, index) => {

                                return (
                                    // <div
                                    // //  className="container-body"
                                    //  >
                                    <div className="cards-container">

                                        <div className='jobs-cards-container'>


                                            <div className="row job-card-main">
                                                <div
                                                    className="col-5 d-flex justify-content-flex-start align-items-center"
                                                    style={{ fontWeight: "bold" }}
                                                >
                                                    <AccountBalance style={{ fontSize: "30px", marginRight: "25px" }} />
                                                    {item?.initiatorName}
                                                </div>
                                                <div
                                                    className="col-3 d-flex justify-content-flex-start align-items-center"
                                                    style={{ fontSize: "15px", color: "gray" }}
                                                >
                                                    <LocationOn style={{ marginRight: "10px", color: "gray" }} />
                                                    {item?.initiatorLocation}
                                                </div>
                                                <div
                                                    className="col-3 d-flex justify-content-flex-start align-items-center"
                                                    style={{ fontSize: "15px", color: "gray" }}
                                                >
                                                    <CalendarMonth style={{ marginRight: "10px", color: "gray" }} />
                                                    {item.responseDate}
                                                </div>
                                                <div className="col-1 d-flex justify-content-end align-items-center">
                                                    {item?.campusDriveClosed ? (
                                                        <LockRoundedIcon style={{ color: 'red' }} />
                                                    ) : (
                                                        <ArrowRight
                                                            style={{ fontSize: "50px", color: "darkblue", cursor: "pointer" }}
                                                            onClick={() => {
                                                                navigateToCampusDrive(item?.campusDriveID, item?.initiatorID , item?.initiatorName)
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>


                                        </div>




                                    </div>




                                );
                            })
                            :
                            <div style={{ color: 'gray', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%' }}>
                                <h5>No Active Drives</h5>
                            </div>
                        }
                        <Container component={Box} py={3} style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                            <Pagination
                                count={Math.ceil(receivedCount / size)}
                                page={receivedPage}
                                shape={'rounded'}
                                color={'primary'}
                                variant={'outlined'}
                                onChange={(event, value) => setReceivedPage(value)}
                            />
                        </Container>
                    </div>
                }
            </div>
        </>

    )
}

export default OnCampusJobs;