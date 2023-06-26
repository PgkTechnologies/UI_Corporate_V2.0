import { TextField } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordCmp = (props) => {
  
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
                    style={{ width: "90%", marginBottom: "30px", color: "gray" }}
                ></hr>
                <div className='sub-title'>How do you want to recieve the code to reset your password?</div>
                <div className="sub-title" style={{ margin: '0', paddingTop: '0', paddingBottom: '0' }}>
                    <input
                        type="radio"
                        name="EmailAddress"
                        id="EmailAddress"
                        checked={props.otpType === "EmailAddress" ? "checked" : ""}
                        onClick={props.handleChange}
                    />
                    <label class="login-label" for="EmailAddress" style={{ marginLeft: '10px' }}>
                        Email Address
                    </label>
                </div>
                <div className="sub-title" style={{ margin: '0', paddingTop: '10px', paddingBottom: '20px' }}>
                    <input
                        type="radio"
                        name="MobileNumber"
                        id="MobileNumber"
                        checked={props.otpType === "MobileNumber" ? "checked" : ""}
                        onClick={props.handleChange}
                    />
                    <label class="login-label" for="MobileNumber" style={{ marginLeft: '10px' }}>
                        Registered Mobile Number
                    </label>
                </div>
                <div className="login-text" style={{ padding: '20px' }}>
                    <TextField
                        label={"Please enter your registered" + " " +props.otpType}
                        name="inpValue"
                        onChange={props.handleChange}
                        className={`login-inp${props.inpError ? ' login-inp-error' : ''}`}
                        value={props?.inpValue}
                        required
                        variant="filled"
                        style={{ width: "60%", marginBottom: "15px" }}
                    />
                    {props.inpError ? <p className="inp-errors">{props.inpError}</p> : null}
                </div>
                <div style={{ padding: '10px' }}>
                    <Link to={'/'}>
                        <div className='btn' >
                            Cancel
                        </div>
                    </Link>
                    <button ype="submit" className='btn' style={{ float: 'right' }}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </form>
    )
}

export default ForgotPasswordCmp ;