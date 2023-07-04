import { TextField } from "@material-ui/core";
import React from "react"; 
import { Link } from "react-router-dom";

const ValidateOtpCmp = (props) => {
    
    return (
        <form className="main-container" style={{ padding: '0 50px 0' }} onSubmit={props.handleSubmit}>
            <div className="registration-card">
                <div style={{ width: "100%" }}>
                    <div className="register-as-text" style={{ padding: '20px 20px 0' }}>
                        <p style={{ fontWeight: "bold" }}>FORGOT PASSWORD </p>
                        <p style={{ fontSize: "30px", color: "#016bbc" }}>
                            Corporate{" "}
                        </p>
                    </div>
                    <hr
                        className="mt-2"
                        style={{ width: "90%", marginBottom: "10px", color: "gray" }}
                    ></hr>
                    <div className="login-text" style={{ padding: '20px' }}>
                        <TextField
                            label="Please Enter OTP Here"
                            type="text"
                            name="otpValue"
                            onChange={props.handleChange}
                            className={`login-inp${props.otpError ? ' login-inp-error' : ''}`}
                            value={props?.otpValue}
                            required={true}
                            variant="filled"
                            style={{ width: "60%", marginBottom: "15px" }}
                        />
                        {props.otpError ? <p className="inp-errors">{props.otpError}</p> : null}
                    </div>
                    <div className="login-text" style={{ padding: '20px' }}>
                        <TextField
                            label="Enter New Password"
                            name="newPassword"
                            type="password"
                            onChange={props.handleChange}
                            className={`login-inp${props.pwdError ? ' login-inp-error' : ''}`}
                            value={props?.newPassword}
                            placeholder='*********************'
                            variant="filled"
                            required={true}
                            style={{ width: "60%", marginBottom: "15px" }}
                        />
                    </div>
                    <div className="login-text" style={{ padding: '20px' }}>
                        <TextField
                            label="Re-enter New Password"
                            type='password'
                            name="reenterPassword"
                            onChange={props.handleChange}
                            className={`login-inp${props.pwdError ? ' login-inp-error' : ''}`}
                            value={props?.reenterPassword}
                            placeholder='*********************'
                            variant="filled"
                            required={true}
                            style={{ width: "60%", marginBottom: "15px" }}
                        />
                        {props.pwdError ? <p className="inp-errors">{props.pwdError}</p> : null}
                    </div>
                    <div style={{ padding: '10px' }}>
                        <Link to={'/'}>
                            <div className='btn' >
                                Cancel
                            </div>
                        </Link>
                        <button type="submit" className='btn' style={{ float: 'right' }}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ValidateOtpCmp ;