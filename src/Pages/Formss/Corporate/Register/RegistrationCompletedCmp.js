import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { green } from "@mui/material/colors";

const RegistrationCompletedCmp = (props) => {

    const setURLStatus = () => {
        localStorage.setItem("NavigateCancelUrl", "/");
        props?.history("/register/payment");
    };

    return (
        

        <form className="login-form reg-form">
            <div className="page">
                <div className="login-page-main-box">
                    <div
                        className="col-md-10"
                        style={{
                            background: "rgba(255, 255, 255, 0.85)",
                            borderRadius: "10px",
                        }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center cmp-register-head mt-4"
                            style={{ fontWeight: "bold" }}
                        >
                            <p>Your Registration is Complete !</p>
                        </div>
                        <div className="row justify-content-center reg-center">
                            <div className="col-md-10">
                                <h6 className="reg-label text-center">
                                    Your Corporate ID is
                                </h6>
                                <div className="login-grp text-center mb-1">
                                    <input
                                        type="text"
                                        name="addr"
                                        className="login-inp reg-inp2"
                                        value={props?.data}
                                        readOnly
                                        placeholder="Address (Line 1)"
                                        required
                                    />
                                </div>
                                <p className="reg-inp-info">
                                    Preserve this Corporate ID for all your
                                    future references
                                </p>
                                <div className="reg-like">
                                    <ThumbUpIcon color="action" sx={{ color: green[500] }} />
                                </div>
                                <p className="reg-para">
                                    A detailed welcome mail has been sent to your primary email.
                                    You have to pay the registration fee in order to access full
                                    Dashboard features. You can chose to pay now or pay later at
                                    your convenience
                                </p>
                                <div className="reg-payment-btns">
                                    <button
                                        type="button"
                                        onClick={() => setURLStatus()}
                                        className="btn"
                                    >
                                        Pay the fee now
                                    </button>{" "}
                                    &nbsp;
                                    <button type="button" onClick={() => {
                                        props?.history("/");
                                    }} className="btn">
                                        Proceed lo Login page
                                        <span>
                                            <i className="far fa-user" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default RegistrationCompletedCmp;