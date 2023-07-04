import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgotPasswordCmp from "../../../../Components/Forms/CorporateCmp/ForgotPasswordCmp/ForgotPasswordCmp";
import ValidateOtpCmp from "../../../../Components/Forms/CorporateCmp/ForgotPasswordCmp/ValidateOtpCmp";
import { actionPostSubmitNewPasswordRequest, actionPostValidateEmailMobileRequest } from "../../../../Store/Actions/SagaActions/ForgotPasswordSagaAction";
import CryptoJS from "crypto-js";

const $ = window.$;

const ForgotPassword = () => {
    const [type, setType] = useState("Student");
    const [inpError, setInpError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [apiStatus, setApiStatus] = useState(false);
    const [inpValue, setInpValue] = useState("");
    const [otpType, setOtpType] = useState("EmailAddress");
    const [otpValue, setOtpValue] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [pageLocation, setPageLocation] = useState("Step1");
    const [stakeholderId, setStakeholderId] = useState("");
    const [enableSuccessModal, setEnableSuccessModal] = useState(false);
    const [enableOtpRecievedSuccessModal, setEnableOtpRecievedSuccessModal] =
      useState(false);
    const history = useNavigate();
  
    const dispatch = useDispatch();
  
    const handleChange = (event) => {
      const name = event.target.name;
      const checked = event.target.checked;
      if (name === "EmailAddress") {
        if (checked) {
          setOtpType("EmailAddress");
        } else {
          setOtpType("MobileNumber");
        }
      } else if (name === "MobileNumber") {
        if (checked) {
          setOtpType("MobileNumber");
        } else {
          setOtpType("EmailAddress");
        }
      } else {
        const value = event.target.value;
        if (otpType === "EmailAddress") {
          const mailformat =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (value && mailformat.test(value)) {
            setInpValue(value);
            setInpError("");
          } else if (!value || !mailformat.test(value)) {
            setInpValue(value);
            setInpError("Please enter valid Input");
          }
        } else {
          const num = /^[+-]?[0-9\b]+$/;
          if (num.test(value)) {
            // if (val.match(phoneno)) {
            if (value.length == 10) {
              setInpValue(value);
              setInpError("");
            } else {
              setInpValue(value);
              setInpError("Please enter valid Input");
            }
          } else {
            setInpValue(value);
            setInpError("Please enter valid Input");
          }
        }
      }
    };
  
    const toggleSuccessPop = () => {
      setEnableSuccessModal(!enableSuccessModal);
      history("/");
    };
  
    const toggleReceivedSuccessModal = () => {
      setEnableOtpRecievedSuccessModal(!enableOtpRecievedSuccessModal);
    };
  
    const handleSubmit = (event) => {
      setApiStatus(true);
      event.preventDefault();
      const model = {
        stakeholder: "Corporate",
        vrfBy: otpType === "EmailAddress" ? "Email" : "Phone",
        userName: otpType === "EmailAddress" ? inpValue : "+91" + inpValue,
      };
      dispatch(
        actionPostValidateEmailMobileRequest({
          apiPayloadRequest: model,
          callback: onSuccess,
        })
      );
    };
  
    const handleOtpChange = (event) => {
      const { name, value } = event.target;
      if (name === "otpValue") {
        if (value.length == 4) {
          setOtpError("");
        } else {
          setOtpError("Invalid value");
        }
        setOtpValue(value);
      } else if (name === "reenterPassword") {
        if (value === newPassword) {
          setReenterPassword(value);
          setPwdError("");
        } else {
          setReenterPassword(value);
          setPwdError("Password Mismatch");
        }
      } else {
        setNewPassword(value);
      }
    };
  
    const hanldeOtpSubmit = (event) => {
      event.preventDefault();
      setApiStatus(true);
      let iv = CryptoJS.enc.Utf8.parse("1234567812345678");
      let key = CryptoJS.enc.Utf8.parse("5v8y/B?E(G+KbPeShVmYq3t6w9z$C&12");
      let hashedPassword = CryptoJS.AES.encrypt(newPassword, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();
      const model = {
        stakeholder: "Corporate",
        vrfBy: otpType === "EmailAddress" ? "Email" : "Phone",
        otp: otpValue,
        platformUUID: stakeholderId,
        newPassword: hashedPassword,
      };
      dispatch(
        actionPostSubmitNewPasswordRequest({
          apiPayloadRequest: model,
          callback: onOtpSuccess,
        })
      );
      history('/');
    };
  
    const onSuccess = (resp) => {
      setApiStatus(false);
      if (resp?.platformUUID) {
        toggleReceivedSuccessModal();
        setPageLocation("Step2");
        setStakeholderId(resp.platformUUID);
      }
    };
  
    const onOtpSuccess = (resp) => {
      setApiStatus(false);
      if (resp !== "Error") {
        setEnableSuccessModal(!enableSuccessModal);
      }
    };
    
    return (

        <div className="log-in-main-container" style={{ background: 'black' }}>
            <div className="logo-container">
                <div className="logo-main">C2Hire.</div>
            </div>

            {
                pageLocation === "Step1" ?
                    <ForgotPasswordCmp
                        handleChange={handleChange}
                        otpType={otpType}
                        inpValue={inpValue}
                        inpError={inpError}
                        handleSubmit={handleSubmit}
                    />
                    :
                    <>
                    </>
            }
            {
                pageLocation === "Step2" ?
                    <>
                        <ValidateOtpCmp
                            otpError={otpError}
                            otpValue={otpValue}
                            otpType={otpType}
                            handleChange={handleOtpChange}
                            handleSubmit={hanldeOtpSubmit}
                            newPassword={newPassword}
                            reenterPassword={reenterPassword}
                            pwdError={pwdError}
                        />
                    </>
                    :
                    <>
                    </>
            }
            </div>

    );
}

export default ForgotPassword ;