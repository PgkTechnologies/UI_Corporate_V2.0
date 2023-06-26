import React, { useEffect, useState } from 'react';
import { TextField } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { actionLoginRequestSaga } from '../../../../Store/Actions/SagaActions/DashboardSaga/LoginSagaActions';
import { checkObjectProperties } from '../../../../utils/utils';
import CryptoJS from "crypto-js";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../utils/Auth';



const Login = () => {   //same as login Form and cmp

  const [loginType, setLoginType] = useState("");
  const [type] = useState("Corporate");
   const history = useNavigate();
   const location = useLocation();
   const auth = useAuth();

  const initialState = {
    email: "",
    password: "",
  };

  // =========***Error Object***=========
  const errorsObj = initialState;

  // const [loginObj, setLoginObj] = useState(initialState);
  const [errors, setErrors] = useState(errorsObj);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  // const history = '';
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const type = "Corporate" ;
  

  useEffect(() => {
    //storeAuthToken();
    localStorage.removeItem("amount");
    localStorage.removeItem("regStatus");
    // localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("orderID");

    sessionStorage.clear();
  }, []);

  useEffect(() => {
    const isErrorsObjEmpty = checkObjectProperties(errors);
    setIsBtnDisabled(isErrorsObjEmpty);
  }, [errors]);


  const handleChange = (event) => {
    const { name, value } = event.target;
   
    switch (name) {
      case "email":
        if (value) {
          setEmail(value);
          setErrors((preState) => ({
            ...preState,
            emailErr: "",
          }));
        } else if (!value) {
          setEmail(value);
          setErrors((preState) => ({
            ...preState,
            emailErr: "Email error",
          }));
        }
        return;
      case "password":
        if (value && value.length >= 8) {
          setPassword(value);
          setErrors((preState) => ({
            ...preState,
            passwordErr: "",
          }));
        } else {
          setPassword(value);
          setErrors((preState) => ({
            ...preState,
            passwordErr: "Password error",
          }));
        }
        return;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const { email, password } = loginObj;
    let iv = CryptoJS.enc.Utf8.parse("1234567812345678");
    let key = CryptoJS.enc.Utf8.parse("5v8y/B?E(G+KbPeShVmYq3t6w9z$C&12");
    let hashedPassword = CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
    if (email && password) {
      const model = {
        stakeholder: type,
        userID: email,
        password: hashedPassword,
      };
      dispatch(
        actionLoginRequestSaga({
          apiPayloadRequest: model,
          callback: onSuccess,
        })
      );
      
    } else {
      toast.error("Please enter all input fields");
    }
  };

  const redirectPath = location.state?.path || "/";

  

  useEffect(() => {
    const authCheck = localStorage.getItem("AUTH");
    
    if (authCheck) {
      auth.logIn(authCheck); 
      history(redirectPath, { replace: true });
    }
  }, []);


  const onSuccess = (navigateUrl) => {

  

    const authCheck = localStorage.getItem("AUTH");
    if (navigateUrl) {
      auth.logIn(navigateUrl.token);
    } else {
      auth.logIn(authCheck);
    }

    if (navigateUrl === "/dashboard") {
   
      history("/dashboard");
    } else if (navigateUrl === "/verify") {
      history("/register/authentication");
    } else {
      localStorage.setItem("navigateCancelUrl", "/");
      history("/register/payment"); 
    }
  };
// console.log(loginObj,'emalll')
  
  return (

    <section className="login">

      <div className="log-in-main-container" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
        <video autoPlay muted loop className="back-vid">
          <source src='./Videos/v1.mp4' type="video/mp4" />
        </video>
        <div className="logo-container">
          <div className="logo-main">C2Hire.</div>
        </div>
        <div className="row">
          <div className="main-container">
            <div className='page'>


              <form className="row log-in-container" onSubmit={handleSubmit }>
                <div className="col-lg-6 col-md-6 col-sm-12 log-in-content" style={{}}>
                  <p style={{ paddingLeft: '10px', textAlign: 'center', lineHeight: '5rem' }}>Perfect Recruitment Solution<span style={{ color: '#0291ff' }}>.</span></p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 log-in-card-main">
                  <div className="log-in-card blurbg_parent">
                    <div className="blurBg"></div>
                    <div className="log-in-as-text">
                      <p style={{ fontWeight: "bold" }}>LOGIN AS </p>
                      <p style={{ fontSize: "30px", color: "#016bbc" }}>
                        Corporate{" "}
                      </p>
                    </div>
                    <hr
                      className="mt-4"
                      style={{ width: "90%", marginBottom: "30px", color: "gray" }}
                    ></hr>

                    <div className="login-text">
                      <TextField
                        label="ID / Email"
                        type="text"
                        name="email"
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}
                         value={email}
                        required={true}
                        onChange={handleChange}
                      // helperText={emailErr ? emailErr : ''}
                      />
                    </div>
                    <div className="login-text">
                      <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}
                        value={password}
                        onChange={handleChange}
                        required={true}

                      />
                    </div>
                    <div
                      className="d-flex justify-content-end"
                      style={{ marginBottom: "20px" }}
                    >
                      <Link to={'/forgotPassword'} >Forgot Password?</Link>
                    </div>
                    <button
                      type="submit"
                      // disabled={emailErr || passwordErr || !email || !password}
                      className="btn mt-3 mb-3"
                      style={{
                        width: "100%",
                        color: "white",
                        background: "#246DE8",
                        border: "none",
                      }}
                    >
                      Login
                    </button>
                    <hr style={{ width: "100%", color: "gray" }}></hr>
                    <div className="d-flex justify-content-center mt-4">
                      <div>
                        Don't have an Account?{" "}
                        <Link to= {'/register'}>
                        <span
                          
                         className="sign-up">
                          {" "}
                          Sign Up
                        </span>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>


              </form>








            </div>

          </div>
        </div>
      </div>
    </section>
  );

}

export default Login;