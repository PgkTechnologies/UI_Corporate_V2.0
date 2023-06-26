import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ResendOtpAction, VerifyOtpAction } from "../../../../Store/Actions/CorporateActions/CorporateAction";
import { checkObjectProperties } from "../../../../utils/utils";
import AuthenticationCmp from "./AuthenticationCmp";


const Authentication = () => {
    const initial = {
        phoneOtp: '',
        emailOtp: '',
    }

    const errorsObj = initial

    // const [phoneOtp, setOtp] = useState('');
    // const [emailOtp, setEmailOtp] = useState('');
    const [otp, setOtp] = useState(initial)
    const [errors, setErrors] = useState(errorsObj);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const history = useNavigate();
    const dispatch = useDispatch();

    // const apiStatus = useSelector(state => state.CorporateReducer.apiStatus);


    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('regStatus'));
        if (!data?.stakeholder && !data?.platformUID) {
           history('/register/contactPersonnel');
        }
    }, [])

    useEffect(() => {
        const isErrorsObjEmpty = checkObjectProperties(errors);
        setIsBtnDisabled(isErrorsObjEmpty);
    }, [errors]);

    const handleChange = (event) => {
        const {name, value, errorMessage} = event.target;

        // setOtp(preState => ({
        //     ...preState,
        //     [name]: value
        // }));
        // setErrors(preState => ({
        //     ...preState,
        //     [name]: errorMessage
        // }));
switch (name)   {
        case "phoneOtp":
                //console.log(value, "PW");
                if (value.length <= 4) {
                    setErrors((preState) => ({
                        ...preState,
                        phoneOtp: "",
                    }));
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        phoneOtp: "Invalid Otp",
                    }));
                }
                setOtp(preState => ({
                    ...preState,
                    [name]: value
                }));
                return;

                default : break;

            }


    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const { otpErr, otp2Err } = errors;
        const { phoneOtp, emailOtp } = otp;
        let data = JSON.parse(localStorage.getItem('regStatus'));
        localStorage.setItem('stakeholderID' , data?.platformUID);
        if (phoneOtp) {// Removed email otp validation
            if (!otpErr && !otp2Err) {
                const model = {
                    stakeholder: data?.stakeholder,
                    platformUID: data?.platformUID,
                    email: data?.email,
                    phone: data?.phoneNumber,
                    phoneOtp: phoneOtp,
                    emailOtp: '0012',
                }
                dispatch(VerifyOtpAction(model, history));
                // history('/register/CorporateSecondary');
            } else {
                toast.error("Please enter Mobile & Email OTP")
            }
        }
    }

    const resend = (val) => {
        let data = JSON.parse(localStorage.getItem('regStatus'));
        const model = {
            stakeholder: data?.stakeholder,
            platformUID: data?.platformUID,
            otpType: val,
        }
        dispatch(ResendOtpAction(model));
    }

    return (

        <section className="login">

            <div className="log-in-main-container" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                <video autoPlay muted loop className="back-vid">
                    <source src='./Videos/v1.mp4' type="video/mp4" />
                </video>
                <div className="logo-container">
                    <div className="logo-main">C2Hire.</div>
                </div>

        <AuthenticationCmp
            history={history}
            errors={errors}
            otp={otp}
            isBtnDisabled={isBtnDisabled}
            resend={resend}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
        </div>
        </section>
    )
}

export default Authentication;