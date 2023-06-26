import { Badge, Tab, Tabs, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import InstallDesktopSharpIcon from '@mui/icons-material/InstallDesktopSharp';
import HistoryEduSharpIcon from '@mui/icons-material/HistoryEduSharp';
import AutoAwesomeMotionSharpIcon from '@mui/icons-material/AutoAwesomeMotionSharp';
import FileCopySharpIcon from '@mui/icons-material/FileCopySharp';
import { actionGetCampusDriveInvites, actionPostRespondToCampusDriveRequest } from "../../Store/Actions/SagaActions/CampusDriveSagaActions";
import { useDispatch } from "react-redux";
import moment from "moment";
import { AccountBalance } from "@mui/icons-material";
import { getFormattedDate } from "../../utils/utils";
import { toast } from "react-toastify";
import { ModalBody ,Modal } from "reactstrap";
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

const Requests = (props) => {

    const dispatch = useDispatch();

    const [requests, setRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [notification, setNotification] = useState();
    const [notificationStatus, setNotificationStatus] = useState();
    const [notificationContent, setNotificationContent] = useState();
    const [initiatorName, setInitiatorName] = useState("");
    const [campusDriveID, setCampusDriveID] = useState("");
    const [reasonForRejection, setReasonForRejection] = useState();
    const [notificationID, setNotificationID] = useState()

    const getCampusDriveInvites = () => {
        dispatch(
            actionGetCampusDriveInvites({
                callback: (data) => {
                    if (data?.campusInviteReceived?.length) {
                        setRequests(data?.campusInviteReceived);
                    }

                    if (data?.campusInviteSent?.length) {
                        setSentRequests(data?.campusInviteSent);
                    }
                },
            })
        );
    };

    useEffect(() => {
        getCampusDriveInvites();
    }, []);

    const acceptCampusDrive = (campusDriveID, acceptOrReject, notificationID) => {
        console.log(campusDriveID,'clickedddd')
        let reason = {};
        if (acceptOrReject) {
            // reason = reasonForRejection?.reason;
            toast.success("Accepted");
        }

        dispatch(
            actionPostRespondToCampusDriveRequest({
                apiPayloadRequest: {
                    campusDriveID: campusDriveID,
                    accepted: acceptOrReject,
                    nftID: notificationID,
                    reasonToReject:reasonForRejection?.reason,
                    // ...reason,
                },
                callback: (response) => {
                    getCampusDriveInvites();
                    setShowModal(false);
                    setNotificationStatus();
                    setNotification();
                    setNotificationContent();
                },
            })
        );
    };

    const onNotificationReceived = (
        id,
        status,
        initName,
        campusDriveID
    ) => {
        setNotification(id);
        setNotificationStatus(status);
        setInitiatorName(initName);
        setCampusDriveID(campusDriveID);

        console.log(status, "ST");

        if (status === "REJECTED") {
            
            // const content = response?.content
            //   ? JSON.parse(response.content)
            //   : undefined;
            setNotificationContent(
                //content?.requestContent ? content?.requestContent : undefined
                //response.content ? response.content : undefined
            );
            setShowModal(true);
        } else if (status === "REQUEST-SENT") {
            setNotificationContent(
                //response?.content ? JSON.parse(response.content) : undefined
                //response.content ? response.content : undefined
            );
            setShowModal(true);
        } else {

            setReasonForRejection();
            setShowModal(true);
        }
    };

    const getNotificationById = (id, status, initName, campusDriveID) => {
        console.log(id, status, "NFV");
        setNotificationID(id);
        onNotificationReceived(id, status, initName, campusDriveID);

    };


    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newVal) => {
        setTabValue(newVal);
    }

    

    return (
        <div className="container-body">

            <div className="row">
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    variant="scrollable"
                >
                    <Tab
                        icon={
                            <Badge>
                                <InstallDesktopSharpIcon />
                            </Badge>
                        }
                        label={tabValue === 0 && "Request Received"}
                        wrapped
                        style={{
                            outline: "none",
                            minWidth: "13%",
                        }}
                    />
                    <Tab
                        icon={
                            <Badge>
                                <HistoryEduSharpIcon />
                            </Badge>
                        }
                        label={tabValue === 1 && "Request Sent"}
                        wrapped
                        style={{
                            outline: "none",
                            minWidth: "13%",
                        }}
                    />

                </Tabs>
            </div>
            <div className="student-content">
                {tabValue === 0 && (
                    <div>
                        {requests === null && <p className="text-center">
                            No new requests received!</p>}
                        {requests.map((item) => {
                            // if (item?.campusDriveStatus?.toLowerCase() === "pending") {
                            return (
                                <div className="cards-border" key={item?.index}>
                                    <div className="col-lg-9 col-sm-12 card-content">
                                        <div className="icon" style={{ marginRight: "20px" }}>
                                            <AccountBalance />
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: "bold" }}>
                                                {item?.initiatorName} {" "}
                                            </span>
                                            from {" "} {" "}
                                            {item?.initiatorLocation} {" "}
                                            has sent a rquest to conduct a
                                            Campus Drive with them
                                            <div className="card-date-main">
                                                <div className="card-date">
                                                    Received on {""}
                                                    {getFormattedDate(item?.requestedDate)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {item?.campusDriveStatus === "Pending" ? (
                                        <div className="col-lg-3 col-sm-12 choice-btns">
                                            <div
                                                className="btn accept"
                                                onClick={() => {
                                                    // getNotificationById(
                                                    //     item?.nftID,
                                                    //     "PRE-ACCEPT",
                                                    //     item?.initiatorName,
                                                    //     item?.campusDriveID
                                                    // )} }
                                                    acceptCampusDrive(item?.campusDriveID, true, item?.nftID)
                                                }}
                                            >
                                                Accept
                                            </div>
                                            <div
                                                className="btn reject"
                                                onClick={() => {
                                                    // acceptCampusDrive(item?.campusDriveID, false, item?.nftID)
                                                    getNotificationById(item?.nftID, "PRE-REJECT", item?.initiatorName, item?.campusDriveID);
                                                }}
                                            >
                                                Reject
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="col-lg-3 col-sm-12 choice-btns">
                                            {item?.campusDriveStatus === "Accepted" ? (
                                                <div className="btn accepted">Accepted</div>
                                            ) : (
                                                <div className="btn rejected">Rejected</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                            // }
                        })}
                    </div>
                )}
            </div>
            {tabValue === 1 && (
                <div>
                    {sentRequests.map((item) =>
                        <div className='cards-border'>
                            <div className='col-lg-9 col-sm-12 card-content'>
                                <div className='icon' style={{ marginRight: '20px' }} >
                                    <AccountBalance />
                                </div>
                                <div>
                                    Campus Drive request sent to <span style={{ fontWeight: 'bold' }}>{item?.receiverName}{""} </span>, {item?.receiverLocation}
                                    <div className='card-date-main'>
                                        <div className='card-date'>
                                            Sent on {getFormattedDate(item?.requestedDate)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                item?.campusDriveStatus === 'Pending' ?
                                    <div className='col-lg-3 col-sm-12 choice-btns'>
                                        <div className='btn' style={{ border: 'none', boxShadow: 'none', cursor: 'default' }}>
                                            Pending
                                        </div>
                                    </div>
                                    :
                                    <div className='col-lg-3 col-sm-12 choice-btns'>
                                        {
                                            item?.campusDriveStatus === 'Accepted' ?
                                                <div className='btn accepted'>
                                                    Accepted
                                                </div>
                                                :
                                                <div className='btn rejected'>
                                                    Rejected
                                                </div>
                                        }
                                    </div>
                            }
                        </div>
                    )}
                </div>

            )}

         {showModal && 
         <Modal isOpen={showModal} >
            <ModalBody>
            {notificationStatus === "PRE-REJECT" && (
 
            <div
              className={"notification"}
              style={{ width: "100%", paddingBottom: "12px" }}
            >
              <div
                className={"close-notification"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowModal(false);
                  setNotificationStatus();
                  setNotification();
                  setNotificationContent();
                }}
              >
                <CancelSharpIcon/>
                
              </div>
              <div
                className={`notification-header d-flex justify-content-${
                  notificationStatus?.toLowerCase() === "rejected"
                    ? "between"
                    : "center"
                } align-items-center`}
              >
                <div
                  className={
                    "d-flex flex-column justify-content-center align-items-center"
                  }
                >
                  <p className={"heading"}>Notification from</p>
                  <p className={"heading"}>{initiatorName} University</p>
                </div>
                {notificationStatus?.toLowerCase() === "rejected" && (
                  <button type="button" className={"btn status-btn"}>
                    Rejected
                  </button> 
                )}
              </div>
              <div
                className={
                  "notification-body d-flex flex-column justify-content-center align-items-center"
                }
              >
                <table
                  className={"table table-responsive table-borderless w-full"}
                >
                  <tbody>
                    <tr>
                      <td className={"keyLabel"}></td>
                    </tr>
 
                  </tbody>
                </table>
                {notificationStatus?.toLowerCase() === "rejected" ? (
                  <div className={"notification-body-footer inherit w-full"}>
                    <div className={"heading"}>
                      <p className={"label"}>Reason for Rejection</p>
                    </div>
                    <p className={"body"}>
                      {
                        JSON.parse(notification?.content)?.responseContent
                          ?.reasonToReject
                      }
                    </p>
                  </div>
                ) : notificationStatus  === "PRE-REJECT" ||
                  notificationStatus?.toLowerCase() === "pending" ? (
                  <TextField
                    name="reasonForRejection"
                    value={reasonForRejection?.reason}
                    label={"Enter reason for rejection"}
                    required
                    errorMessage={reasonForRejection?.errorMessage}
                    onChange={(name, value, errorMessage) => {
                      setReasonForRejection((prevState) => ({
                        ...prevState,
                        reason:name.target.value,
                        // value: value,
                        // errorMessage: errorMessage,
                      }));
                    }}
                    multiline={true}
                    minRows={6}
                  />
                ) : (
                  <div className={"heading"}>
                    <p className={"label"}>
                      Do you wanted to accecpt the request?
                    </p>
                  </div>
                )}
              </div>
              {notificationStatus?.toLowerCase() === "pending" ||
              notificationStatus?.toLowerCase() === "pre-reject" ||
              notificationStatus?.toLowerCase() === "pre-accept" ? (
                <div
                  className={
                    "notification-footer d-flex justify-content-around align-items-center"
                  }
                >
                       {console.log(notificationStatus, 'notificationStatusxx')}
 
                  {notificationStatus?.toLowerCase() === "pending" ||
                  notificationStatus === "PRE-REJECT" ? (
                    <button
                      type="button"
 
                      onClick={() => {
                        acceptCampusDrive(
                          campusDriveID,
                          false,
                          notificationID
                        );
                      }}
                      className={"btn reject"}
                    >
                      Reject
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div> )}
            </ModalBody>
         </Modal>
         }

        </div>
    )
}
export default Requests;