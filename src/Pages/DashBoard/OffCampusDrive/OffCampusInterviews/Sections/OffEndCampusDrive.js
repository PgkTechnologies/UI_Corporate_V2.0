import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionPostCampusDriveCloseRequest } from '../../../../../Store/Actions/SagaActions/CampusDriveSagaActions';
import CustomToastModal from "../../../../../Components/CustomToastModal";
import { NavLink, useNavigate } from "react-router-dom";
import CustomDialogPopup from "../../../../../Components/CustomDialogPopup";
import Modal from "react-bootstrap/Modal";
import { CancelOutlined } from "@material-ui/icons";


const OffEndCampusDrive = (props) => {
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const history = useNavigate();

    console.log(props.campusDriveId, 'OCID')

    const confirmCloseCampusDrive = () => {
        dispatch(actionPostCampusDriveCloseRequest({
            apiPayloadRequest: {
                campusDriveId: props?.campusDriveId
            },
            callback: () => {
                setConfirm(false);
                setShowAlert(true);
                // alert('Campus Drive Closed Successfully!')
            }
        }))
    }

    return <div className="bgWhite h-full" style={{ width: "100%", height: "700px" }}>
        <div className="d-flex flex-column justify-content-start align-items-center w-full">
            <p className="heading" style={{ color: "#253AA3", fontWeight: "bold", fontFamily: "Poppins-Regular", display: "block" }}>
                End Off-Campus Drive
            </p>
        </div>
        <div style={{ marginTop: '100px' }}>
            <p style={{ textAlign: 'center', fontSize: '1.8rem', color: "#253AA3" }}>Do you want to end the Off-Campus Drive?</p>
            <div className={'row align-items-center justify-content-center'}>
                <button onClick={() => {
                    setConfirm(true);
                }} className={'btn'} type={'button'} style={{ height: '35px', width: '120px', backgroundColor: 'green', fontSize: '.900rem', borderRadius: '30px', marginRight: '12px' }}>Yes</button>
                <button className={'btn'} type={'button'} style={{ height: '35px', width: '120px', backgroundColor: 'red', fontSize: '.900rem', borderRadius: '30px' }}>No</button>
            </div>
        </div>
        
        {showAlert &&
            <Modal
                size="md"
                show={showAlert}
                onHide={() => setShowAlert(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">Success</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height:'200px'}}><h3 style={{marginTop:'30px'}}>Campus Drive Closed Successfully!</h3></Modal.Body>
            </Modal>
        }

{
    confirm && <CustomDialogPopup
        isOpenDialog={confirm}
        maxWidth={'xs'}
        isCancelBtnRequired={false}
        isConfirmBtnRequired={false}
        disableBackdropClick={false}
        contentStyles={{ backgroundColor: '#F8F9FE', padding: '0px', paddingBottom: '12px' }}
        dialogContent={<div style={{ paddingTop: '12px' }}>
            <p style={{ textAlign: 'center' }}>{`Are you sure, you want to end the campus drive?`}</p>
            <div className={'row justify-content-center align-items-center mt-5'}>
                <button className={'btn'} type={'button'} onClick={() => { setConfirm(false) }} style={{ width: '80px', height: '40px', marginRight: '5px' }}>No</button>
                <button className={'btn'} type={'button'} onClick={confirmCloseCampusDrive} style={{ width: '80px', height: '40px', marginLeft: '5px' }}>Yes</button>
            </div>
        </div>}
    />
}
        </div >
}

export default OffEndCampusDrive;