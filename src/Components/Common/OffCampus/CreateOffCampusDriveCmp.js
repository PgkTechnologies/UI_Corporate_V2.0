import React from 'react';
import { FormControl, Grid, TextField } from "@material-ui/core";
import { Col, Modal, ModalBody } from 'reactstrap';
import { actionPostAddNewOffCampusRequest } from '../../../Store/Actions/SagaActions/OffCampusDrive/OffCampusDriveSagaAction';
import { CancelOutlined } from '@material-ui/icons';

const CreateOffCampusDriveCmp = (props) => {
    return (
        <Modal isOpen={true} toggle={props?.togglePopup} className="modal-dialog modal-lg" >
            <div style={{ textAlign: "center", backgroundColor: "gray" }}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: "center", background: "#03355bdc", color: "white" }}>
                        Create new Off-Campus Drive
                        <CancelOutlined className="cancelbtn2" onClick={props?.togglePopup} style={{float:"right"}} />
                    </div>
                    <form style={{ background: "white" }} onSubmit={props.handleSubmit}>
                        <div className="card-body">
                            <Grid container item spacing={3}>
                                <Col xs={12}>
                                    <FormControl className="largeinput" variant="outlined" style={{ width: "100%" }} >
                                        <TextField
                                            label="Name of the Drive"
                                            type="text"
                                            name="driveName"
                                            onChange={props.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontFamily: "Poppins-Regular", display: "block" }
                                            }}
                                            inputProps={{
                                                style: { fontFamily: "Poppins-Regular", display: "block" }
                                            }}
                                            required={true}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    </FormControl>
                                </Col>
                                <Col xs={12}>
                                    <FormControl className="largeinput" variant="outlined" style={{ width: "100%" }} >
                                        <TextField
                                            label="Name of the Venue"
                                            type="text"
                                            name="location"
                                            onChange={props.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontFamily: "Poppins-Regular", display: "block" }
                                            }}
                                            inputProps={{
                                                style: { fontFamily: "Poppins-Regular", display: "block" }
                                            }}
                                            required={true}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    </FormControl>
                                </Col>
                                <Col xs={6} style={{ paddingBottom: "10px" }}>
                                    <FormControl className="largeinput" variant="outlined" style={{ width: "100%" }} >
                                        <TextField
                                            label="Start Date"
                                            type="Date"
                                            name="startDate"
                                            onChange={props.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontFamily: "Poppins-Regular", display: "block" }
                                            }}
                                            inputProps={{
                                                style: { fontFamily: "Poppins-Regular", display: "block" }
                                            }}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    </FormControl>
                                </Col>
                                <Col xs={6} style={{ paddingBottom: "10px" }}>
                                    <FormControl className="largeinput" variant="outlined" style={{ width: "100%" }} >
                                        <TextField
                                            label="End Date"
                                            type="Date"
                                            name="endDate"
                                            onChange={props.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontFamily: "Poppins-Regular", display: "block" }
                                            }}
                                            inputProps={{
                                                style: { fontFamily: "Poppins-Regular", display: "block" }
                                            }}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    </FormControl>
                                </Col>
                            </Grid>
                        </div>
                        <div
                            className="d-flex flex-row justify-content-center align-items-center job-details-form w-full mt-4"
                            style={{ background: "white" }}
                        >
                            <button type="submit" className="btn" style={{ marginBottom: "2%" }}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ModalBody>
            </ModalBody>
        </Modal>
    );
};


export default CreateOffCampusDriveCmp;
