import React, { useState } from 'react'
import { TextField } from '@material-ui/core';

const CreateEmailTemplate = (props) => {

    return (
        <>
            {console.log(props)}
            <div className="container">
                <form className="row add-new-jobs-section" onSubmit={props.handleSubmit} style={{ background: "white" }}  >
                    <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white", marginTop: '10px' }} >
                        <TextField
                            label="Email Template ID"
                            type="text"
                            name="id"
                            onChange={props.handleChange}
                            className="form-control"
                            InputLabelProps={{
                                shrink: true,
                                style: {
                                    fontFamily: "Poppins-Regular", display: "block",
                                    background: '#fff',
                                    fontWeight:'bold',
                                    paddingLeft: '2px',
                                    paddingRight: '2px'
                                }
                            }}
                            inputProps={{
                                style: { fontFamily: "Poppins-Regular", display: "block",paddingTop:'15.5px' }
                            }}
                            disabled={true}
                            variant="outlined"
                            margin="dense"
                            style={{ width: "100%" }}
                            value={props?.addEmailTemplate?.emailTemplateID}
                        />
                        <TextField
                            label="Email Template Name"
                            type="text"
                            name="emailTemplateName"
                            onChange={props.handleChange}
                            className="form-control"
                            InputLabelProps={{
                                shrink: true,
                                style: { fontFamily: "Poppins-Regular", display: "block",
                                background: '#fff',
                                fontWeight:'bold',
                                paddingLeft: '2px',
                                paddingRight: '2px' }
                            }}
                            inputProps={{
                                style: { fontFamily: "Poppins-Regular", display: "block",paddingTop:'15.5px' }
                            }}
                            required={true}
                            variant="outlined"
                            margin="dense"
                            style={{ width: "100%" }}
                            value={props?.addEmailTemplate?.emailTemplateName}
                        />
                    </div>
                    <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }} >
                        <TextField
                            label="Email Subject"
                            type="text"
                            name="emailSubject"
                            onChange={props.handleChange}
                            InputLabelProps={{
                                shrink: true,
                                style: { fontFamily: "Poppins-Regular", display: "block",
                                background: '#fff',
                                fontWeight:'bold',
                                paddingLeft: '2px',
                                paddingRight: '2px' }
                            }}
                            inputProps={{
                                style: { fontFamily: "Poppins-Regular", display: "block" }
                            }}
                            variant="outlined"
                            margin="dense"
                            style={{ width: "100%" }}
                            required={true}
                            value={props.addEmailTemplate.emailSubject}
                        />
                    </div>
                    <div className="d-flex flex-row justify-content-around align-items-center job-details-form w-full" style={{ background: "white" }} >
                        <TextField
                            label="Email Body"
                            type="text"
                            name="emailBody"
                            onChange={props.handleChange}
                            InputLabelProps={{
                                shrink: true,
                                style: { fontFamily: "Poppins-Regular", display: "block",
                                background: '#fff',
                                // fontSize:'.800rem',
                                paddingLeft: '2px',
                                paddingRight: '2px',
                            fontWeight:'bold' }
                            }}
                            inputProps={{
                                style: { fontFamily: "Poppins-Regular", display: "block" }
                            }}
                            variant="outlined"
                            margin="dense"
                            rows={6}
                            multiline={true}
                            style={{ width: "100%" }}
                            required={true}
                            value={props.addEmailTemplate.emailBody}
                        />
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center job-details-form w-full"
                        style={{ background: "white" }}>
                        <button type="button" style={{ margin: '30px 30px 0px 0px' }} className="btn mr-4" onClick={() => { props.onCancel() }}>Cancel</button>
                        <button type="submit" style={{ margin: '30px 0px 0px 0px' }} className="btn" >Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateEmailTemplate;