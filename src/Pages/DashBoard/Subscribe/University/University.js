import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetDependencyLookUpsSagaAction } from "../../../../Store/Actions/SagaActions/CommonSagaActions";
import { actionSagaGetCorporateSingleSubscriptionRequest, GetSubscribeTokensSagaAction, GetUniversityHistoryInfoSagaAction, GetUniversityInfoSagaAction, SendMailSagaAction, SubscribeUnvInfoSagaAction } from "../../../../Store/Actions/SagaActions/SubscriptionSagaAction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PreLoader from "../../../../utils/PreLoader";
import { Button, Modal } from "react-bootstrap";
import { Tab, Tabs } from "@material-ui/core";
import OtherInformationItems from "./OtherInformations";


const University = (props) => {
    const corpProfileInfo = useSelector(
        (state) => state.DashboardReducer.profileInfo
    );

    const TokenData = useSelector(
        (state) => state.DashboardReducer.balance
    );


    console.log(TokenData, 'tokeen daattta')


    const apiStatus = useSelector((state) => state.CorporateReducer.apiStatus);

    const [universityInfoSubscriptionsList, setUniversityInfoSubscriptionsList] =
        useState([]);
    const [universityInfoPublishedList, setUniversityInfoPublishedList] =
        useState([]);

    const [universityInfo, setUniversityInfo] = useState({});

    const [tabValue, setTabValue] = useState(0);

    const [universityHistoryInfoList, setUniversityHistoryInfoList] = useState(
        {}
    );
    const [isInfoModal, setisInfoModal] = useState(false);
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [tokens, setTokens] = useState(null);
    const [isSubUnvInfoSuccess, setIsSubUnvInfoSuccess] = useState(false);
    const [subscribedUnvData, setSubscribedUnvData] = useState(null);
    const [bonusTokensUsed, setBonusTokensUsed] = useState(0);
    const [additionalTokens, setAdditionalTokens] = useState(null);
    const [subscribeType, setSubscribeType] = useState("");
    const [publishId, setPublishId] = useState("");
    const [campusDriveID, setCampusDriveID] = useState("");
    const [isSendOpen, setIsSendOpen] = useState(false);
    const [isSendMailSuccess, setIsSendMailSuccess] = useState(false);
    const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

    const [profileInfo, setProfileInfo] = useState();
    const [otherInfo, setOtherInfo] = useState();
    const tokensrequired = tokens?.tokensrequired;

    const bonusTokenBalance = TokenData?.bonusTokenBalance;
    const paidTokenBalance = TokenData?.paidTokenBalance;
    const isAdditionalTokensRequired =
        TokenData?.paidTokenBalance < tokensrequired - bonusTokensUsed;
    const additionalTOkens =
        TokenData?.paidTokenBalance - (tokensrequired - bonusTokensUsed);


    const [sendMailObj, setSendMailObj] = useState({
        emailTo: "jaswanth@gmail.com",
        emailSubject: "",
        emailBody: "",
    });

    const [subscriptionFilter, setSubscriptionFilter] = useState({
        subscriptionType: undefined,
        sortBy: undefined,
    });

    const [publishedDataFilter, setPublishedDataFilter] = useState({
        subscriptionType: undefined,
        sortBy: undefined,
    });

    const [lookUpData, setLookUpData] = useState();
    const history = useNavigate();
    const { id: universityId } = useParams();

    console.log(universityId, 'resssa')

    useEffect(() => {
        dispatch(
            actionGetDependencyLookUpsSagaAction({
                apiPayloadRequest: ["subscriptionType", "sortBy"],
                callback: (list) => {
                    if (list) {
                        setLookUpData(list);
                    }
                },
            })
        );
    }, []);

    const dispatch = useDispatch();
    const email = corpProfileInfo?.primaryContactEmail;

    useEffect(() => {
        console.log(corpProfileInfo);
        getUniversityById();
    }, []);

    const getUniversityById = () => {
        dispatch(
            GetUniversityInfoSagaAction({
                apiPayloadRequest: universityId,
                callback: getUniversityList,
            })
        );
    };

    const getCorporateAddress = () => {
        let address = "";

        if (corpProfileInfo?.corporateHQAddressLine1) {
            address = corpProfileInfo.corporateHQAddressLine1;
        }

        if (corpProfileInfo?.corporateHQAddressLine2) {
            address = address + ", " + corpProfileInfo.corporateHQAddressLine2;
        }

        if (corpProfileInfo?.corporateHQAddressCity) {
            address = address + ", " + corpProfileInfo.corporateHQAddressCity;
        }

        if (corpProfileInfo?.corporateHQAddressState) {
            address = address + ", " + corpProfileInfo.corporateHQAddressState;
        }

        if (corpProfileInfo?.corporateHQAddressCountry) {
            address = address + ", " + corpProfileInfo.corporateHQAddressCountry;
        }

        return address + ".";
    };

    const getUniversityList = (data) => {
        console.log(data, '1111111')
        setUniversityInfoSubscriptionsList(
            data?.subscriptions?.length ? data.subscriptions : []
        );
        setUniversityInfoPublishedList(
            data?.publishedData?.length ? data?.publishedData : []
        );

        setUniversityInfo(data);
        setSendMailObj((prevState) => ({
            ...prevState,
            emailSubject: ` Requesting for Campus Placements Hiring`,
            emailBody: `This is with regards to the subject line, we ${corpProfileInfo?.corporateName ? corpProfileInfo?.corporateName : ""
                }, ${getCorporateAddress()} would be interested in conducting a recruitment drive in your organization to recruit the final / pre-final year students.
                Appreciate if you could revert with your interest to take the process forward using the below link:\n http://university.c2hire.com/university/dashboard
                /Subscribe/corporationInfo/${corpProfileInfo.stakeholderID}`

        }));
    };

    const getUniversityHistoryList = (data) => {
        console.log(data, '2222222')
        setUniversityHistoryInfoList(data);
    };

    const goBack = () => {
        history.goBack();
    };

    const viewInfo = (publishId) => {
        setisInfoModal(true);
        dispatch(
            GetUniversityHistoryInfoSagaAction({
                apiPayloadRequest: publishId,
                callback: getUniversityHistoryList,
            })
        );
    };

    const getSubscribeTokens = (type) => {
        dispatch(
            GetSubscribeTokensSagaAction({
                apiPayloadRequest: type,
                callback: getTokens,
            })
        );
    };

    const getTokens = (data) => {
        setTokens(data);
        setIsSubscribe(true);
    };

    const closeModal = () => {
        setisInfoModal(false);
        setIsSubUnvInfoSuccess(false);
    };

    const openViewInfoModal = () => {
        setIsSubUnvInfoSuccess(false);
        setisInfoModal(true);
    };

    const subscribeModal = (type, publishId = undefined) => {
        setSubscribeType(type);
        if (publishId !== undefined) {
            setPublishId(publishId);
        } else {
            setPublishId("");
        }
        getSubscribeTokens(
            type === "campusDrive"
                ? "CR"
                : type === "unvStuData"
                    ? "SD"
                    : type === "unvInsight"
                        ? "UI"
                        : type === "profileInfo"
                            ? "UP"
                            : "UO"
        );
    };

    // BONUS CALCULATION
    const bonusCalc = (event) => {
        const checked = event.target.checked;
        const percentageOfTokens = tokens?.tokensrequired;
        const tokensToPay = checked ? percentageOfTokens : 0;
        setBonusTokensUsed(tokensToPay);
    };

    const subscribeUnv = () => {
        let model;
        if (["UP", "UO"].includes(subscribeType)) {
            model = {
                publishId: publishId,
                paidTokensUsed: tokens?.tokensrequired
                    ? tokens?.tokensrequired - bonusTokensUsed
                    : 0 - bonusTokensUsed,
                bonusTokensUsed: bonusTokensUsed,
                publisherType: "University",
            };
        } else if (subscribeType === "campusDrive") {
            model = {
                receiverID: universityId,
                paidTokensUsed: tokens?.tokensrequired
                    ? tokens?.tokensrequired - bonusTokensUsed
                    : 0 - bonusTokensUsed,
                bonusTokensUsed: bonusTokensUsed,
            };
        } else {
            model = {
                universityID: universityId,
                paidTokensUsed: tokens?.tokensrequired
                    ? tokens?.tokensrequired - bonusTokensUsed
                    : 0 - bonusTokensUsed,
                bonusTokensUsed: bonusTokensUsed,
            };
        }
        dispatch(
            SubscribeUnvInfoSagaAction({
                apiPayloadRequest: model,
                type: subscribeType,
                callback: subscribeUnvInfoRes,
            })
        );
    };

    const subscribeUnvInfoRes = (data) => {
        setIsSubscribe(false);
        if (["UP", "UO"].includes(subscribeType)) {
            dispatch(
                actionSagaGetCorporateSingleSubscriptionRequest({
                    apiPayloadRequest: {
                        id: publishId,
                        type: subscribeType === "UP" ? "PROFILE" : "OTHER_INFORMATION",
                    },
                    callback: (data) => {
                        if (subscribeType === "UP") {
                            setProfileInfo(JSON.parse(data)?.programs);
                        } else {
                            setOtherInfo(data);
                        }

                        setSubscribeType();
                        getUniversityById();
                    },
                })
            );
        } else if (subscribeType === "unvStuData") {
            localStorage.setItem("subscriptionID", data?.subscriptionID);
            navigateToStudent();
        } else if (subscribeType === "unvInsight") {
            setSubscribedUnvData(data);
            setIsSubUnvInfoSuccess(true);
            getUniversityById();
        } else {
            setCampusDriveID(data?.campusDriveID);
            setIsSendOpen(true);
        }
    };

    const navigateToStudent = () => {
        history("/dashboard/subscribe/students/" + universityId);
    };

    const closeSubModal = (val) => {
        const newVal = Math.abs(val);
        setAdditionalTokens(newVal);
        setIsSubscribe(false);
        setIsTokenModalOpen(true);
        // localStorage.setItem("pathname", history.location.pathname);
    };

    const closeSendModal = () => {
        setIsSendOpen(false);
    };

    const closeTokenModel = () => {
        setIsTokenModalOpen(false);
    };

    const closeMainModal = () => {
        setIsSubscribe(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSendMailObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const sendMail = (data) => {
        const model = {
            ...sendMailObj,
            campusDriveID: campusDriveID,
            emailFrom: email,
        };
        //console.log(model);
        dispatch(
            SendMailSagaAction({ apiPayloadRequest: model, callback: sendMailResp })
        );
    };

    const sendMailResp = (data) => {
        toast.success(data?.message);
        setIsSendOpen(false);
        getUniversityById();
        // toast.success('Successfully Send request')
    };

    const handleFilterChange = (name, value, errorMessage, type) => {
        if (type === "SUBSCRIPTION") {
            setSubscriptionFilter((prevState) => ({
                ...prevState,
                [name]: value,
            }));
            applyFilter("SUBSCRIPTION");
        } else {
            setPublishedDataFilter((prevState) => ({
                ...prevState,
                [name]: value,
            }));
            applyFilter("PUBLISHED-DATA");
        }
    };

    const applyFilter = (type) => {
        if (type === "SUBCRIPTION") {
            if (subscriptionFilter?.subscriptionType || subscriptionFilter?.sortBy) {
                let newData = [];
                if (
                    subscriptionFilter?.subscriptionType &&
                    subscriptionFilter?.subscriptionType?.trim() !== ""
                ) {
                    universityInfoSubscriptionsList?.filter((item) => {
                        if (subscriptionFilter.subscriptionType === item.subscriptionType) {
                            newData.push(item);
                        }
                    });
                }

                if (
                    subscriptionFilter?.sortBy &&
                    subscriptionFilter.sortBy.trim() !== ""
                ) {
                    newData = newData.length ? newData : universityInfoSubscriptionsList;

                    if (subscriptionFilter.sortBy === "TA") {
                        newData.sort(function (a, b) {
                            return (
                                new Date(a.dateOfSubscription) - new Date(b.dateOfSubscription)
                            );
                        });
                    } else {
                        newData.sort(function (a, b) {
                            return (
                                new Date(b.dateOfSubscription) - new Date(a.dateOfSubscription)
                            );
                        });
                    }
                }

                setUniversityInfoSubscriptionsList(newData);
            } else {
                setUniversityInfoSubscriptionsList(
                    universityInfo?.subscriptions?.length
                        ? universityInfo?.subscriptions
                        : []
                );
            }
        } else {
            let newList = [];

            if (
                publishedDataFilter.subscriptionType !== undefined &&
                publishedDataFilter.subscriptionType.trim() !== ""
            ) {
                universityInfo?.publishedData?.forEach((item) => {
                    if (
                        publishedDataFilter.subscriptionType === "UO" &&
                        item.generalNote === "Other Information"
                    ) {
                        newList.push(item);
                    } else if (
                        publishedDataFilter.subscriptionType === "UP" &&
                        item.generalNote === "Profile"
                    ) {
                        newList.push(item);
                    }
                });
            } else {
                newList = universityInfo?.publishedData;
            }
        }
    };

    const sendEMail = (event) => {
        event.preventDefault();
        const { emailTo, emailSubject, emailBody } = sendMailObj;
        console.log('ET :', sendMailObj?.emailBody?.trim());
        if (emailTo?.trim() == '' && emailSubject?.trim() == '' && emailBody?.trim() == '') {
            toast.warning('Please enter all input fields')
            return;
        }
        const model = {
            emailTo: emailTo,
            emailSubject: emailSubject ? emailSubject : 'Campus Hiring Request',
            emailBody: emailBody
        };
        sendMail(model)
    }

    // campusDrive

    const model = universityInfoPublishedList?.filter(x => !x?.isSubscribed)

    console.log(model, 'infooooooo')

    return (
        <>

            <div className="container-body">

                <div className="acc-main">
                    <div
                        style={{ display: "flex", width: "100%", justifyContent: "flex-start" }}
                    >
                    </div>
                    <div className="row acc-card-container">
                        <div className="col-8 acc-details">
                            <div className="profile-picture">
                                {universityInfo?.profilePicture ? (
                                    <img
                                        src={
                                            universityInfo?.profilePicture
                                                ? "data:image/jpg;base64," +
                                                universityInfo?.profilePicture
                                                : null
                                        }
                                        className="profile-pic-img"
                                        alt="no img"
                                    />
                                ) : null}
                            </div>
                            <div className="acc-name-main">
                                <p>{universityInfo?.universityName}</p>
                                <button
                                    type="button"
                                    className="btn"
                                    style={{
                                        fontSize: "10px",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                    }}
                                    onClick={() => subscribeModal("campusDrive")}
                                >
                                    REQUEST FOR A CAMPUS DRIVE
                                </button>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-end align-items-center">
                            <Button
                                // disabled={disabled}
                                type="button"
                                className="acc-sub-btn"
                            // onClick={() => handleShow(publishId)}
                            >
                                Subscribe
                            </Button>
                        </div>
                    </div>

                    <div style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            indicatorColor={"primary"}
                            textColor={"primary"}
                            variant="scrollable"
                        >
                            <Tab label="Profile" />

                            {/* <Tab label="Other information" /> */}
                        </Tabs>
                        <div className="tab-details">
                            {tabValue === 0 ? (

                                <>
                                    {apiStatus ? <PreLoader /> : null}
                                    <div className="sub-profile-main">
                                        <h3>Overview</h3>
                                        <p style={{ color: "gray" }}>{universityInfo?.universityProfile}</p>
                                        <div style={{ padding: "15px" }}>
                                            <h4>Year of Establishment</h4>
                                            <p style={{ color: "gray" }}>
                                                {universityInfo?.yearOfEstablishment}
                                            </p>
                                            <h4>Accredations</h4>
                                            <p style={{ color: "gray" }}>
                                                {universityInfo?.accredations?.issuingAuthority}
                                            </p>
                                            <h4>NIRF Ranking</h4>
                                            <p style={{ color: "gray" }}>{universityInfo?.ranking?.rank}</p>

                                            <h4>Programs Offered</h4>
                                            <p style={{ color: "gray" }}>
                                                {universityInfo?.programsOffered}
                                            </p>

                                            <h4>Address</h4>
                                            <p style={{ color: "gray" }}>
                                                {universityInfo?.universityHQAddressCity}
                                            </p>
                                            {/* <p style={{ color: "gray" }}>
                                            <span style={{ fontWeight: "bold" }}>Headquarter : </span>
                                            {corporateInfoList?.corporateHQAddressLine1},{" "}
                                            {corporateInfoList?.corporateHQAddressLine2},{" "}
                                            {corporateInfoList?.corporateHQAddressCity},{" "}
                                            {corporateInfoList?.corporateHQAddressDistrict},{" "}
                                            {corporateInfoList?.corporateHQAddressState},{" "}
                                            {corporateInfoList?.corporateHQAddressCountry},{" "}
                                            {corporateInfoList?.corporateHQAddressZipCode}
                                            <br />
                                            <span style={{ fontWeight: "bold" }}>Local Branch : </span>
                                            {corporateInfoList?.corporateLocalBranchAddressLine1},{" "}
                                            {corporateInfoList?.corporateLocalBranchAddressLine2},{" "}
                                            {corporateInfoList?.corporateLocalBranchAddressCity},{" "}
                                            {corporateInfoList?.corporateLocalBranchAddressDistrict},{" "}
                                            {corporateInfoList?.corporateLocalBranchAddressState},{" "}
                                            {corporateInfoList?.corporateLocalBranchAddressCountry},{" "}
                                            {corporateInfoList?.corporateLocalBranchAddressZipCode}
                                        </p> */}


                                        </div>
                                    </div>
                                </>

                            ) : null}
                        </div>


                        <div className="tab-details">
                            {tabValue === 1 ? (

                                <>
                                    {apiStatus ? <PreLoader /> : null}
                                            <OtherInformationItems
                                                subscribeHandler={() => {
                                                    subscribeModal("UO", model?.publishID)
                                                }}

                                                universityInfo = {universityInfo}

                                                // index={index}

                                                item={{
                                                    ...model,
                                                    publisherName: universityInfo?.universityName,
                                                    location: universityInfo?.universityHQAddressCity
                                                }}
                                            />




                                </>

                            ) : null}
                        </div>

                    </div>
                </div>

                {/* send request and py token modal */}

                <Modal show={isSubscribe} onHide={closeSubModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {publishId?.type !== "CR"
                                ? "Subscription"
                                : "Inviting for Campus Placements"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-8">
                                <span>Subscription Cost to access</span>
                                <li className="inner-list">
                                    <span>{subscribeType === "unvInsight"
                                        ? universityInfo?.universityName + " University Insights"
                                        : subscribeType === "unvStuData"
                                            ? "Students Data"
                                            : subscribeType === "profileInfo"
                                                ? "Profile information"
                                                : subscribeType === "otherInfo"
                                                    ? "Other information"
                                                    : "Campus Hiring Request to " +
                                                    universityInfo?.universityName
                                    }</span>{" "}
                                </li>
                            </div>
                            <div className="col-md-4">
                                <strong>
                                    {tokens?.tokensrequired}
                                </strong>{" "}
                                &nbsp; Tokens
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-md-8">
                                <span>Available Tokens in the Wallet</span>
                            </div>
                            <div className="col-md-4">
                                <strong>{TokenData?.paidTokenBalance}</strong> &nbsp; Token
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <span>Available Bonus Tokens</span>
                            </div>
                            <div className="col-md-4">
                                <strong>{TokenData?.bonusTokenBalance}</strong> &nbsp; Tokens
                                <br />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline-secondary"
                            onClick={() => closeSubModal(additionalTOkens)}
                        >
                            Add Tokens
                        </Button>
                        {publishId?.type !== "CR" ? (
                            <Button
                                className="btnTwo"
                                variant="outline-primary"
                                onClick={subscribeUnv}
                                disabled={isAdditionalTokensRequired}
                            >
                                Pay & Subscribe
                            </Button>
                        ) : (
                            <Button
                                className="btnTwo"
                                variant="outline-primary"
                            //   onClick={() =>
                            //     onSubscribeInviteCampusPlacement(
                            //       props?.corporateSelectionInformation?.tokensRequired
                            //     )
                            //   }
                            >
                                Pay & Send Request
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>

                {/* send email modal */}

                <Modal
                    show={isSendOpen}
                    onHide={closeSendModal}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header>
                        <Modal.Title>
                            Send Mail to: {universityInfo?.universityName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="to">
                            <strong>Subject :</strong>{sendMailObj?.emailSubject}
                        </p>
                        <div className="hr"></div>
                        <div style={{ marginTop: 10 }}>
                            <p className="mailtext">Respected Sir/Madam,</p>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <p className="mailtext">
                                {sendMailObj?.emailBody}
                            </p>
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <p className="mailtext">
                                Looking forward to mutually benificial relationship.
                            </p>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <p className="mailtext">Thank You.</p>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <p className="mailtext2">
                                Your Sincerely,
                                <br />
                                <br />
                                {corpProfileInfo?.corporateName}, <br />
                                {corpProfileInfo?.corporateHQAddressPhone},<br />
                                {corpProfileInfo?.corporateHQAddressEmail},<br />
                                {corpProfileInfo?.corporateHQAddressCountry},<br />
                            </p>
                        </div>

                        <div style={{ marginTop: 40 }}>
                            <p className="mailtext">
                                <strong>Note:</strong> Please do not reply to this email as this is an unattended mail box.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="btnTwo"
                            variant="outline-primary"
                            onClick={sendEMail}
                        >
                            Send Request
                        </Button>
                    </Modal.Footer>
                </Modal>



            </div>


        </>
    );
};

export default University;
