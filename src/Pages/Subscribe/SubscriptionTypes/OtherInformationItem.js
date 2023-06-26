import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from 'react-redux';
import { actionSagaGetCorporateSingleSubscriptionRequest } from "../../../Store/Actions/SagaActions/SubscriptionSagaAction";
import { Modal, ModalBody } from "reactstrap";
import { AccountBalance } from "@mui/icons-material";
import DatasetLinkedSharpIcon from '@mui/icons-material/DatasetLinkedSharp';
 

const OtherInformationItem = (props) => {
    console.log(props,'OTHErzz ')
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [otherInfo, setOtherInfo] = useState();
 
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

  return (
    <>
 
        <div className="cards-border" key={props.index}>
            <div className="col-lg-9 col-sm-12 card-content">
                <div className="icon" style={{ marginRight: "20px" }}>
                    <AccountBalance />
                </div>
                <div>
                    <span style={{ paddingRight: '55px' }} >
                        {props?.item?.generalNote}
                    </span>

                    <span style={{ color: 'gray', paddingLeft: '155px', paddingRight: '35px' }}>|</span>

                    <span style={{ fontWeight: "bold" }}>
                        {props?.item?.publisherName}  {" "}
                    </span>

                    <span style={{ color: 'gray', paddingRight: '100px', paddingLeft: '35px' }}>|</span>
                    <span style={{ fontWeight: "bold", paddingRight: '7px' }}>
                        UniversityID:  {""}</span> <span> {props?.item?.publisher}{" "}
                    </span>

                    <div style={{ 
                      marginLeft: '1000px'}}                  
                    >  <span className="btn"
                        //     style={{
                        //         padding: '15px',
                        //         background: "#044071",
                        //         borderRadius: '7px',
                        //         marginTop:'0px',
                        //         color: '#e6e6e6',
                        //         fontWeight: 'normal',
                        //         fontSize:' 13px',
                        //         border: 'none',
                        //         cursor:'pointer',

                        // }}
                        onClick={() => {
                          if(props?.item?.isSubscribed) {
                            getPublishedData(props?.item?.publishID);
                          } else if(props?.getDetails) {
                            getPublishedData(props?.item?.publishID ? props?.item?.publishID : props?.item?.publishId);
                          } else {
                            if(props?.subscribeHandler) {
                              props.subscribeHandler();
                            }
                          }
                          // setShowModal(true);
                        }}
                    >
                            view More
                        </span>
                    </div>
                    <br />
                    <span style={{ paddingLeft: '450px', marginTop: '55px' }} > {props?.item?.location} </span>

                </div>
            </div>
            </div>
      {showModal && <Modal  isOpen={showModal}>
        <ModalBody>
        <div className="hiring-modal">
          <div className="modal-header hiring-modal-header">
            <h5
              className="modal-title"
              style={{ fontSize: "1rem" }}
              id="exampleModalLabel"
            >
              Other Information : {props?.item?.publisherName}
            </h5>
            <button
              type="button"
              className="close"
              style={{ fontSize: "1rem" }}
              onClick={() => {
                setShowModal(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form className="hiring-modal-form">
            <div className="row">
              <div className="col-md">
                <div className="modal-grp">
                  {/* <input
                      value={otherInfo?.publishID}
                      label={'Publish ID'}
                      inputLabelProps={{style:{fontSize: '.800rem'}}}
                      inputProps={{style:{fontSize: '.800rem'}}}
                      disabled
                  /> */}
                  <div>
                  Publish ID: {otherInfo?.publishID}
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="modal-grp">
                  {/* <input 
                      value={otherInfo?.dateOfPublish ? `Published on ${moment(otherInfo?.dateOfPublish).format("DD-MM-YYYY")}`: ''}
                      label={'Published Date & Time'}
                      inputLabelProps={{style:{fontSize: '.800rem'}}}
                      inputProps={{style:{fontSize: '.800rem'}}}
                      disabled
                  /> */}
                  <div>
                  Published Date & Time:  {otherInfo?.dateOfPublish ? `Published on ${moment(otherInfo?.dateOfPublish).format("DD-MM-YYYY")}`: ''}
                  </div>
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col-md">
                <div className="modal-grp">
                  {/* <input 
                      value={otherInfo?.title ? otherInfo?.title : ''}
                      label={'Title'}
                      inputLabelProps={{style:{fontSize: '.800rem'}}}
                      inputProps={{style:{fontSize: '.800rem'}}}
                      disabled
                  /> */}
                Title:  {otherInfo?.title ? otherInfo?.title : ''}
                </div>
              </div>
              <hr></hr>
              <div className="w-100"></div>
              <div className="col-md">
                <div className="modal-grp">
                  {/* <input
                    value={otherInfo?.information ? otherInfo?.information : ''}
                    label={"Content"}
                    disabled
                    multiline={true}
                    minRows={6}
                    inputLabelProps={{style:{fontSize: '.800rem'}}}
                    inputProps={{style:{fontSize: '.800rem'}}}
                  /> */}
                Content:  {otherInfo?.information ? otherInfo?.information : ''}
                </div>
              </div>
              <div className="w-100"></div>
              {(otherInfo?.attachment && otherInfo?.attachment?.trim()!=='' && otherInfo?.attachmentName?.trim()!=='') ?
                <div className="d-flex justify-content-between align-items-center attachmentStripeContainer w-full">
                <p className="label">Attachment Present <br/>
                (if any):</p>
                <br/>
 
                <a href={'data:application/pdf;base64,'+otherInfo?.attachment} style={{textDecoration:'none', outline:'none', width:'70%'}} download>
                  <div className="attachmentStripe d-flex justify-content-between align-items-center">
                <span style={{padding:'5px' , paddingRight:'10px'}} >  <DatasetLinkedSharpIcon/>  </span>
                      <p>{otherInfo?.attachmentName}</p>
 
                  </div>
                </a>
              </div> : null}
            </div>
          </form>
        </div>
        </ModalBody>
      </Modal>}
    
    </>
  );
};

export default OtherInformationItem;
