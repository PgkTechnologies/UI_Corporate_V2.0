import { Email, Phone } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PreLoader from "../../../../utils/PreLoader";


const AuthenticationCmp = (props) => {
    const navigate = useNavigate();
    // const apiStatus = useSelector((state) => state.loginReducer.apiStatus);
    //   const gotoHome = () => {
    //     back()
    //   };

    return (
        <>
            {/* {apiStatus ? <PreLoader /> : null} */}

            <div className="page">
                <form className="login-form reg-form" onSubmit={props?.handleSubmit}>
                    <div className="container">
                        <div className="row registration-card">
                            <div
                                className="d-flex align-items-center justify-content-center cmp-register-head mt-4 mb-3"
                                style={{ fontWeight: "bold" }}
                            >
                                <p>Verify your Primary Phone Number</p>
                            </div>
                            <div className="row justify-content-center reg-center">
                                <div className="col-md-8">
                                    {/* <div className="reg-media">
                                        <div className="reg-media-icon">
                                            <Email />
                                        </div>
                                        <div className="reg-media-grp">
                                            <div className="login-grp">
                                                <label className="login-label">
                                                    Enter the OTP sent to Primary Contact Email
                                                </label>
                                                <input
                                                    type="password"
                                                    name="emailOtp"
                                                    onChange={props?.handleChange}
                                                    value={emailOtp}
                                                    className={`login-inp${otp2Err ? " login-inp-error" : ""
                                                        }`}
                                                    placeholder="xxxxxx"
                                                    required={false}
                                                />
                                                {otp2Err ? (
                                                    <p className="inp-errors">{otp2Err}</p>
                                                ) : null}
                                                <p className="reg-resend">
                                                    <a href="#!" onClick={() => resend("Email")}>
                                                        Resend OTP
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="reg-media">
                                        <div className="reg-media-icon">
                                            <Phone />
                                        </div>
                                        <div className="reg-media-grp">
                                            <div className="login-grp">
                                                <label className="login-label">
                                                    Enter the OTP sent to Primary Contact Mobile
                                                </label>
                                                <input
                                                    type="password"
                                                    name="phoneOtp"
                                                    onChange={props?.handleChange}
                                                    value={props?.otp?.phoneOtp}
                                                    className={`login-inp${props?.errors.phoneOtp ? " login-inp-error" : ""
                                                        }`}
                                                    placeholder="xxxxxx"
                                                    required={false}
                                                    
                                                />
                                                {props?.errors.phoneOtp ? <p className="inp-errors">{props?.errors.phoneOtp}</p> : null}
                                                <p className="reg-resend">
                                                    <a href="#!" onClick={() =>props.resend('Phone')}>
                                                        Resend OTP
                                                    </a>
                                                </p>



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <button type="button" className="btn"
                                // onClick={navigate ('/register/contactPersonnel')}
                                >
                                    Back
                                </button>{" "}
                                &nbsp;
                                <button type="submit" className="btn">
                                    Next
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AuthenticationCmp;