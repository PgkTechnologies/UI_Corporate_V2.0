import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { NavLink, useNavigate } from "react-router-dom";
import { actionPostCampusDriveCloseRequest } from "../../../../Store/Actions/SagaActions/CampusDriveSagaActions";
import { Modal, ModalBody } from "reactstrap";
import { CancelOutlined } from "@material-ui/icons";
import CustomDialogPopup from "../../../../Components/CustomDialogPopup";

const EndCampusDrive = (props) => {
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // const history = useNavigate();

    const confirmCloseCampusDrive = () => {
        dispatch(actionPostCampusDriveCloseRequest({
            apiPayloadRequest: {
                campusDriveId: props?.campusDriveId
            },
            callback: () => {
                setConfirm(false);
                setShowAlert(true)
            }
        }))
    }

    return <div className="bgWhite" style={{ width: "100%", height: "580px" }}>
        <div className="d-flex flex-column justify-content-start align-items-center w-full">
            <p className="heading" style={{ color: "#253AA3", fontWeight: "bold", fontFamily: "Poppins-Regular", display: "block" }}>
                End Campus Drive
            </p>
        </div>
        <div style={{ marginTop: '100px' }}>
            <p style={{ textAlign: 'center', fontSize: '1.8rem', color: "#253AA3" }}>Do you want to end the Campus Drive?</p>
            <div className={'row align-items-center justify-content-center'}>
                <button onClick={() => {
                    setConfirm(true);
                }} className={'btn'} type={'button'} style={{  width: '120px', backgroundColor: 'green',color:'whitesmoke',borderColor:'white' ,fontSize: '.900rem', borderRadius: '30px', marginRight: '12px' }}>Yes</button>
                <button className={'btn'} type={'button'} style={{ width: '120px', backgroundColor: 'red',color:'whitesmoke', borderColor:'white',fontSize: '.900rem', borderRadius: '30px' }}>No</button>
            </div>
        </div>
        {showAlert &&
            // <CustomToastModal
            //     onClose={() => {
            //         setShowAlert(false);
            //         // history.replace('/dashboard/campus-drive/', 'urlhistory');
            //     }}
            //     show={showAlert ? true : false}
            //     iconNameClass={"fa-check"}
            //     message={"Campus Drive Closed Successfully!"}
            // />
            <Modal isOpen={showAlert} >
                <ModalBody>
                    <CancelOutlined onClick={() => {
                        setShowAlert(false);
                        // history.replace('/dashboard/campus-drive/', 'urlhistory');
                    }} />
                    <h3>{"Campus Drive Closed Successfully!"}</h3>
                </ModalBody>
            </Modal>
        }
        {confirm && <CustomDialogPopup
            isOpenDialog={confirm}
            maxWidth={'xs'}
            isCancelBtnRequired={false}
            isConfirmBtnRequired={false}
            disableBackdropClick={false}
            contentStyles={{ backgroundColor: '#F8F9FE', padding: '0px', paddingBottom: '12px' }}
            dialogContent={<div style={{ paddingTop: '12px' }}>
                <p style={{ textAlign: 'center' }}>{`Are you sure, you want to end the campus drive?`}</p>
                <div className={'row justify-content-center align-items-center mt-5'}>
                    <button className={'btn'} type={'button'} onClick={() => { setConfirm(false) }} style={{ width: '80px',  marginRight: '5px' }}>No</button>
                    <button className={'btn'} type={'button'} onClick={confirmCloseCampusDrive} style={{ width: '80px',  marginLeft: '5px' }}>Yes</button>
                </div>
            </div>}
        />}
    </div>
}

export default EndCampusDrive;