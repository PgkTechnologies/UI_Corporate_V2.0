import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionSagaGetCorporateSingleSubscriptionRequest } from '../../../Store/Actions/SagaActions/SubscriptionSagaAction';
import { Modal, ModalBody } from 'reactstrap';
import moment from "moment";
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';

const ProfileItem = (props) => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [profileInfo, setProfileInfo] = useState();

    const getPublishedData = (id) => {
        dispatch(actionSagaGetCorporateSingleSubscriptionRequest({
            apiPayloadRequest: {
                type: 'PROFILE',
                id: id
            },
            callback: (response) => {
                setProfileInfo(JSON.parse(response)?.programs);
                setShowModal(true);
            }
        }));
    }

    return (
        <div className="cards-border" key={props.index}>
            <div className="col-lg-9 col-sm-12 card-content">
                <div className="icon" style={{ marginRight: "20px" }}>
                    <AccountCircleSharpIcon />
                </div>
                <div>
                    <span style={{ paddingRight: '55px' }} >
                        {props?.item?.generalNote}
                    </span>
                    <span style={{ color: 'gray', paddingLeft: '155px', paddingRight: '35px' }}>|</span>
                    <span style={{ fontWeight: "bold" }}>
                        {props?.item?.publisherName}  {" "}
                    </span>
                    <span style={{ color: 'gray', paddingRight: '35px', paddingLeft: '35px' }}>|</span>
                    <div style={{ marginTop: '5px', marginLeft: '900px' }} >  <span
                        style={{
                            paddingLeft: '35px',
                            padding: "7px",
                            background: "#044071",
                            borderRadius: '7px',
                            marginTop: '0px',
                            color: '#e6e6e6',
                            fontWeight: 'normal',
                            fontSize: ' 13px',
                            border: 'none',
                            cursor: 'pointer',

                        }}
                        onClick={() => {
                            // getHiringItemById(props?.item?.nftID);
                            if (props?.item?.isSubscribed) {
                                getPublishedData(props?.item?.publishID);
                            } else if (props?.getDetails) {
                                getPublishedData(props?.item?.publishID ? props?.item?.publishID : props?.item?.publishId);
                            } else {
                                if (props?.subscribeHandler) {
                                    props.subscribeHandler();
                                }
                            }
                        }}
                    >
                        Details
                    </span>
                    </div>

                </div>
            </div>
            {showModal &&
                <Modal isOpen={showModal} >
                    <ModalBody>
                        <div className={'mail-modal'}>

                            <div className="modal-header d-block">
                                <span className="modal-title" style={{ fontSize: '1.1rem', padding: 6 }}>
                                    Published Profile of the University
                                </span>
                                <CancelSharpIcon
                                     style={{marginLeft:'75px'}}
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                    data-dismiss="modal"
                                />
                            </div>
                            <div className="modal-body d-flex flex-column align-items-center pb-5">
                                <div className="circle-block d-flex justify-content-center align-items-center m-3" style={{ height: '70px', width: '70px', borderRadius: '50%', backgroundColor: 'rgba(135, 139, 166, 0.31)' }}>
                                    <div className="circle">
                                        <LocalLibraryRoundedIcon   
                                        style={{ color: '#253AA3', fontSize: '2rem' }}
                                         />
                                    </div>
                                </div>
                                <p style={{ fontWeight: 'bolder', fontSize: '.900rem' }} className={'mb-2'}>PUBLISH REVIEW</p>
                                <div style={{ backgroundColor: 'rgba(135, 139, 166, 0.31)', padding: '10px', borderRadius:'25px', justifyContent:'center' , display:'flex' , alignItems:'center' }} className={'w-full text-center'}>
                                    <p>Branches Offered</p>
                                </div>
                                {profileInfo?.length ? profileInfo.map((item) => {
                                    return <div style={{ padding: '12px', width: '100%' }}>
                                        <div style={{ padding: '6px', border: '1px solid #cacaca', borderRadius: '3px' }} className={'w-full d-flex justify-content-between flex-wrap align-items-center'}>
                                            <div className="job-icon d-flex justify-content-center align-items-center" style={{ backgroundColor: '#20BDC9', padding: '6px', color: 'white', borderRadius: '6px', fontSize: '1rem' }}>
                                                <i className="fas fa-cube" />
                                            </div>
                                            <p style={{ fontSize: '.800rem', maxWidth: '200px' }} className={'text-ellipsis px-2'}>{item?.programID}</p>
                                            <p style={{ fontSize: '.800rem', maxWidth: '200px' }} className={'text-ellipsis px-2'}>{item?.programName}</p>
                                            <p style={{ fontSize: '.800rem', maxWidth: '200px' }} className={'text-ellipsis px-2'}>Start Date - {moment(item?.startDate).format("DD-MMM-YYYY")}</p>
                                            <p style={{ fontSize: '.800rem', maxWidth: '200px' }} className={'text-ellipsis px-2'}>End Date - {moment(item?.endDate).format("DD-MM-YYYY")}</p>
                                        </div>
                                    </div>
                                }) : 'No information found!'}
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            }
        </div>
    )
}

export default ProfileItem;