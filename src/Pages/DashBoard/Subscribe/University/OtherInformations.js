import { green } from "@material-ui/core/colors";
import { OpenInBrowser, VerifiedUser, Work } from "@mui/icons-material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionSagaGetCorporateSingleSubscriptionRequest } from "../../../../Store/Actions/SagaActions/SubscriptionSagaAction";
import PreLoader from "../../../../utils/PreLoader";


const OtherInformationItems = (props) => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [otherInfo, setOtherInfo] = useState();

    const apiStatus = useSelector(state => state.DashboardReducer.apiStatus);
    const getPublishedData = (id) => {
        dispatch(actionSagaGetCorporateSingleSubscriptionRequest({
            apiPayloadRequest: {
                type: 'OTHER_INFORMATION',
                id: id
            },
            callback: (response) => {
                setOtherInfo(response);
                setShowModal(true);
            }
        }));
    }

    const getJOBS = props?.universityInfo?.publishedData?.filter(
        (items) => items?.generalNote === "Other Information"
    );
    console.log('iiiii im ereee')

    return (
        <>

            <div >
                <p >Other information </p>
               
            </div>

        </>
    );
};

export default OtherInformationItems;
