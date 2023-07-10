import React from 'react';
import { FormControl, Grid, TextField } from "@material-ui/core";
import { Col, Modal, ModalBody } from 'reactstrap';
import { CancelOutlined } from '@material-ui/icons';
import moment from 'moment';
import AttachmentIcon from '@mui/icons-material/Attachment';

const OtherInfoModal = (props) => {
    return (
        <Modal isOpen={props?.show} className="modal-dialog modal-lg"  >
            <div style={{ textAlign: "center", backgroundColor: "gray" }}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: "center", background: "#03355bdc", color: "white" }}>
                        Published Information Details
                        <CancelOutlined className="cancelbtn2" onClick={() => props?.setShowModal(false)} style={{ float: "right", cursor: 'pointer' }} />
                    </div>
                    <form style={{ background: "white" }} >
                        <div className="card-body">
                            <Grid container item spacing={3}>
                                <Col xs={6}>
                                    <FormControl className="largeinput" variant="outlined" style={{ width: "100%" }} >
                                        <TextField
                                            value={props?.otherInformation?.publishID}
                                            label={'Publish ID'}
                                            InputLabelProps={{ shrink: true, style: { fontSize: '.800rem', fontFamily: "Poppins-Regular", display: "block", paddingLeft: '2px', paddingRight: '2px', background: '#fff' } }}
                                            inputProps={{ style: { fontSize: '.800rem', fontFamily: "Poppins-Regular", display: "block" } }}
                                            variant="outlined"
                                            margin="dense"
                                            disabled
                                        />
                                    </FormControl>
                                </Col>

                                <Col xs={6} style={{ paddingBottom: "10px" }}>
                                    <FormControl className="largeinput" variant="outlined" style={{ width: "100%" }} >
                                        <TextField
                                            value={props?.otherInformation?.creationDate ? `Published on ${moment(props?.otherInformation?.creationDate).format("DD-MM-YYYY")}` : ''}
                                            label={'Published Date & Time'}
                                            InputLabelProps={{ shrink: true, style: { fontSize: '.800rem', fontFamily: "Poppins-Regular", display: "block", paddingLeft: '2px', paddingRight: '2px', background: '#fff' } }}
                                            inputProps={{
                                                style: {fontSize: '.900rem', fontFamily: "Poppins-Regular", display: "block" }
                                            }}
                                            variant="outlined"
                                            margin="dense"
                                            disabled
                                        />
                                    </FormControl>
                                </Col>

                                <Col xs={12}>
                                    <FormControl className="largeinput" variant="outlined" style={{ width: "100%" }} >
                                        <TextField
                                            value={props?.otherInformation?.title ? props?.otherInformation?.title : ''}
                                            label={'Title'}
                                            InputLabelProps={{ shrink: true, style: { fontSize: '.800rem', fontFamily: "Poppins-Regular", display: "block", paddingLeft: '2px', paddingRight: '2px', background: '#fff' } }}
                                            inputProps={{ style: { fontSize: '.900rem', fontFamily: "Poppins-Regular", display: "block" } }}
                                            variant="outlined"
                                            margin="dense"
                                            disabled
                                        />
                                    </FormControl>
                                </Col>
                                <Col xs={12} style={{ paddingBottom: "10px" }}>
                                    <FormControl className="largeinput" variant="outlined" style={{ width: "100%" }} >
                                        <TextField
                                            value={props?.otherInformation?.information ? props?.otherInformation?.information : ''}
                                            label={"Content"}
                                            InputLabelProps={{ shrink: true, style: { fontSize: '.800rem', fontFamily: "Poppins-Regular", display: "block", paddingLeft: '2px', paddingRight: '2px', background: '#fff' } }}
                                            inputProps={{ style: { fontSize: '.900rem', fontFamily: "Poppins-Regular", display: "block" } }}
                                            variant="outlined"
                                            multiline = {true}
                                            minRows={6}
                                            margin="dense"
                                            disabled
                                        />
                                    </FormControl>
                                </Col>
                                
                            </Grid>
                        </div>
                        <div
                            className="d-flex flex-row justify-content-center align-items-center job-details-form w-full mt-4"
                            style={{ background: "white" }}
                        >
                            {(props?.otherInformation?.attachment?.trim() !== '' && props?.otherInformation?.attachmentName?.trim() !== '') ?
              <div className="d-flex justify-content-between align-items-center attachmentStripeContainer w-full">
                <p className="label">Attachment Present (if any)</p>
                <div onClick={() => { props?.openFileInBrowser(props?.otherInformation?.attachment, props?.otherInformation?.attachmentName) }} style={{ textDecoration: 'none', outline: 'none', width: '72%', cursor: 'pointer',background:'grey',paddingLeft:'10px',marginRight:'5px' }}>
                  <div className="attachmentStripe d-flex justify-content-between align-items-center">
                    <p>{props?.otherInformation?.attachmentName}</p>
                    <i> <AttachmentIcon/></i>
                  </div>
                </div>
              </div> : null}
                        </div>
                    </form>
                </div>
            </div>
            <ModalBody>
            </ModalBody>
        </Modal>
    );
};


export default OtherInfoModal;
