import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es";
import { useNavigate } from "react-router-dom";
import { SaveCoprorateData, SignupAction } from "../../../../Store/Actions/CorporateActions/CorporateAction";
import { checkObjectProperties } from "../../../../utils/utils";
import ContactPersonnelCmp from "./CorporateContactPersonnelCmp";
import CryptoJS from "crypto-js";
import { Checkbox } from "@material-ui/core";
import PreLoader from "../../../../utils/PreLoader";



const CorporateContactPersonnel = () => {
    const initialState = {
        primaryContactFirstName: "",
        primaryContactMiddleName: "",
        primaryContactLastName: "",
        primaryContactDesignation: "",
        primaryContactPhone: "",
        primaryContactEmail: "",
        secondaryContactFirstName: "",
        secondaryContactMiddleName: "",
        secondaryContactLastName: "",
        secondaryContactDesignation: "",
        secondaryContactPhone: "",
        secondaryContactEmail: "",
        gstn: "",
        password: "",
        repeatPassword: '',
        attribute6: false,
    };

    // =========***Error Object***=========
    const errorsObj = initialState;

    // =========***Primary data keys to check validations***=========
    const primaryKeyCheck = {
        corporateName: "",
        CIN: "",
        corporateType: "",
        corporateCategory: "",
        corporateIndustry: "",
        attachment: "",
        yearOfEstablishment: "",
    };
    // =========***Secondary data keys to check validations***=========
    const secondaryKeyCheck = {
        corporateHQAddressLine1: "",
        corporateHQAddressLine2: "",
        corporateHQAddressCountry: "",
        corporateHQAddressState: "",
        corporateHQAddressCity: "",
        corporateHQAddressDistrict: "",
        corporateHQAddressZipCode: "",
        corporateHQAddressPhone: "",
        corporateHQAddressEmail: "",
        companyProfile: "",
        profilePicture: "",
    };

    const [contactPersonnel, setContactPersonnel] = useState(initialState);
    const [gstnRequire, setGstnRequire] = useState(false);
    const [disable, setDisable] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [repeatPasswordErr, setRepeatPasswordErr] = useState("");
    const [errors, setErrors] = useState(errorsObj);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [showError, setshowError] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useNavigate();
    const storeData = useSelector(
        (state) => state.CorporateReducer.corporatePrimaryState
    );
    const apiStatus = useSelector((state) => state.CorporateReducer.apiStatus);

    const dispatch = useDispatch();

    const onYes = () => {
        setGstnRequire(true);
        setDisable(false);
    };

    const onNo = () => {
        setGstnRequire(false);
        setDisable(true);
    };

    useEffect(() => {
        let isPrimaryDataFilled = false;
        let isSecondaryDataFilled = false;
        for (const storeKey in storeData) {
            for (const key in primaryKeyCheck) {
                if (storeKey === key) {
                    if (
                        storeData[storeKey] !== "" ||
                        storeData[storeKey] !== null ||
                        storeData[storeKey] !== undefined
                    ) {
                        isPrimaryDataFilled = true;
                    }
                }
            }
        }
        for (const storeKey2 in storeData) {
            for (const key in secondaryKeyCheck) {
                if (storeKey2 === key) {
                    if (
                        storeData[storeKey2] !== "" ||
                        storeData[storeKey2] !== null ||
                        storeData[storeKey2] !== undefined
                    ) {
                        isSecondaryDataFilled = true;
                    }
                }
            }
        }
        if (!isPrimaryDataFilled) {
            sessionStorage.clear();
            return history("/register");
        }
        if (!isSecondaryDataFilled) {
            sessionStorage.clear();
            return history("/register/corporateSecondary");
        }
        // const localStorageObj = JSON.parse(sessionStorage.getItem('contact'));
        // const isLocalStorageAvailable = localStorageObj && Object.keys(localStorageObj).length > 7 ? true : false;
        const isLocalStorageAvailable =
            storeData && Object.keys(storeData).length > 7 ? true : false;
        if (storeData && isLocalStorageAvailable) {
            // let data = storeData && Object.keys(storeData).length > 7 ? storeData : localStorageObj;
            let data = storeData;
            let storeContactObj = {};
            Object.keys(data).map((keyName) => {
                for (const key in initialState) {
                    if (keyName === key) {
                        storeContactObj[key] = data[key];
                    }
                }
            });
            setContactPersonnel(storeContactObj);
        }
    }, []);

    useEffect(() => {
        const isErrorsObjEmpty =
            checkObjectProperties(errors) && contactPersonnel?.attribute6;
        setIsBtnDisabled(isErrorsObjEmpty);
        if (showError) {
            setTimeout(() => {
                setshowError(false);
            }, 2000);
        }
    }, [errors, showError]);

    const handleChange = (event) => {
        const { name, value, error } = event.target;


        if (["primaryContactPhone", "secondaryContactPhone"].includes(name)) {
            while (value.toString().startsWith("+91")) {
                value = value.replace("+91", "");
            }
        }



        switch (name) {

            case "secondaryContactPhone":
                // if (val.match(phoneno)) {
                if (value.length === 10) {
                    setErrors((preState) => ({
                        ...preState,
                        secondaryContactPhone: "",
                    }));
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        secondaryContactPhone: "Invalid",
                    }));

                }
                setContactPersonnel((preState) => ({
                    ...preState,
                    secondaryContactPhone: value,
                }));

                return;


            case "primaryContactPhone":
                // if (val.match(phoneno)) {
                if (value.length === 10) {
                    setErrors((preState) => ({
                        ...preState,
                        primaryContactPhone: "",
                    }));
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        primaryContactPhone: "Invalid",
                    }));

                }
                setContactPersonnel((preState) => ({
                    ...preState,
                    primaryContactPhone: value,
                }));

                return;


            case "primaryContactEmail":
                const mailformat1 =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (value && mailformat1.test(value)) {
                    setErrors((preState) => ({
                        ...preState,
                        primaryContactEmail: "",
                    }));
                } else if (!value || !mailformat1.test(value)) {
                    setErrors((preState) => ({
                        ...preState,
                        primaryContactEmail: "Invalid Email",
                    }));

                }
                setContactPersonnel((preState) => ({
                    ...preState,
                    primaryContactEmail: value,
                }));

                return;


            case "secondaryContactEmail":
                const mailformat2 =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (value && mailformat2.test(value)) {
                    setErrors((preState) => ({
                        ...preState,
                        secondaryContactEmail: "",
                    }));
                } else if (!value || !mailformat2.test(value)) {
                    setErrors((preState) => ({
                        ...preState,
                        secondaryContactEmail: "Invalid Email",
                    }));

                }
                setContactPersonnel((preState) => ({
                    ...preState,
                    secondaryContactEmail: value,
                }));

                return;

            case "gstn":
                // if (val.match(phoneno)) {
                if (value.length <= 16 && value.length > 14) {
                    setErrors((preState) => ({
                        ...preState,
                        gstn: "",
                    }));
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        gstn: "Invalid",
                    }));

                }
                setContactPersonnel((preState) => ({
                    ...preState,
                    gstn: value,
                }));

                return;


            case "password":
                //console.log(value, "PW");
                if (value.length >= 8) {
                    setErrors((preState) => ({
                        ...preState,
                        password: "",
                    }));
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        password: "Password error",
                    }));
                }
                setContactPersonnel((preState) => ({
                    ...preState,
                    password: value,
                }));
                return;

            case "repeatPassword":
                if (value === contactPersonnel?.password) {
                    setErrors((preState) => ({
                        ...preState,
                        repeatPassword: "",
                    }));
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        repeatPassword: "Password does not match",
                    }));

                }
                setRepeatPassword( value);

                return;


            default:
                setContactPersonnel((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));

        }


    };

    const checkObjectPropertyList = (obj) => {
        let keyList = [];
        for (const key in obj) {
            if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
                keyList.push(key);
            }
        }
        return keyList;
    };
    // console.log(contactPersonnel.secondaryContactPhone, 'passswordsecond')
    // console.log(contactPersonnel.primaryContactEmail, 'passswordpriemail')
    // console.log(contactPersonnel.secondaryContactDesignation, 'passswordcontsctdesin')
    // console.log(contactPersonnel.primaryContactPhone, 'passswordcontactphone')
    // console.log(contactPersonnel.gstn, 'passswordgstn')
    // console.log(contactPersonnel.password, 'passsword')


    const trimNumber = (number) => {
        if (
            number !== undefined ||
            (number !== null && number.toString().trim() !== "")
        ) {
            while (number.toString().startsWith("+91")) {
                number = number.toString().replace("+91", "");
            }
        }

        return number?.toString();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

      

        const selectedName = "Corporate";
        const {
            primaryContactFirstName,
            primaryContactLastName,
            primaryContactDesignation,
            primaryContactPhone,
            primaryContactEmail,
            password,
            gstn,
        } = contactPersonnel;
         

        if (
            primaryContactFirstName &&
            primaryContactLastName &&
            primaryContactDesignation &&
            primaryContactPhone &&
            primaryContactEmail &&
            ((gstnRequire && gstn.length > 0) || !gstnRequire) 
            // &&
            // password === repeatPassword
        ) {
            

            const finalData = { ...storeData, ...contactPersonnel };
           
            

            finalData.corporateHQAddressPhone =
                "+91" + trimNumber(storeData?.corporateHQAddressPhone);
            finalData.corporateLocalBranchAddressPhone =
                storeData?.corporateLocalBranchAddressPhone
                    ? "+91" + trimNumber(storeData?.corporateLocalBranchAddressPhone)
                    : "";
            finalData.stakeholder = selectedName;
            finalData.primaryContactPhone =
                "+91" + trimNumber(contactPersonnel?.primaryContactPhone);
            finalData.secondaryContactPhone = contactPersonnel?.secondaryContactPhone
                ? "+91" + trimNumber(contactPersonnel?.secondaryContactPhone)
                : "";
            finalData.gstn = contactPersonnel?.gstn ? contactPersonnel?.gstn : "";

            //PW encription
            let iv = CryptoJS.enc.Utf8.parse("1234567812345678");
            let key = CryptoJS.enc.Utf8.parse("5v8y/B?E(G+KbPeShVmYq3t6w9z$C&12");
            let hashedPassword = CryptoJS.AES.encrypt(finalData.password, key, {
                iv: iv,
                padding: CryptoJS.pad.Pkcs7,
            }).toString();

            finalData.password = hashedPassword;
            

            // finalData.attachment = convertToFile;
            delete finalData.countryCode;
            delete finalData.countryCode2;
            delete finalData.referral;
            // sessionStorage.setItem('contact', JSON.stringify(contactPersonnel));

            // await dispatch(SaveCoprorateData(contactPersonnel, 3));
            // await dispatch(SignupAction(finalData, history));
            // history('/register/authentication');
            if (selectedName === "Corporate") {
            
                await dispatch(SaveCoprorateData(contactPersonnel, 3));
                await dispatch(SignupAction(finalData, history, selectedName));
                setshowError(false);

            } else if (selectedName === "University") {
                let iv = CryptoJS.enc.Utf8.parse("1234567812345678");
                let key = CryptoJS.enc.Utf8.parse("5v8y/B?E(G+KbPeShVmYq3t6w9z$C&12");
                let hashedPassword = CryptoJS.AES.encrypt(finalData.password, key, {
                    iv: iv,
                    padding: CryptoJS.pad.Pkcs7,
                }).toString();

                finalData.password = hashedPassword;
                const data = {
                    universityName: finalData.corporateName,
                    universityHQAddressLine1: finalData.corporateHQAddressLine1,
                    universityHQAddressLine2: finalData.corporateHQAddressLine2,
                    universityHQAddressLine3: "",
                    universityHQAddressCountry: finalData.corporateHQAddressCountry,
                    universityHQAddressState: finalData.corporateHQAddressState,
                    universityHQAddressCity: finalData.corporateHQAddressCity,
                    universityHQAddressDistrict: finalData.corporateHQAddressDistrict,
                    universityHQAddressZipcode: finalData.corporateHQAddressZipCode,
                    universityHQAddressPhone: finalData.corporateHQAddressPhone,
                    universityHQAddressemail: finalData.corporateHQAddressEmail,
                    universityLocalBranchAddressLine1:
                        finalData.corporateLocalBranchAddressLine1,
                    universityLocalBranchAddressLine2:
                        finalData.corporateLocalBranchAddressLine2,
                    universityLocalBranchAddressLine3: "",
                    universityLocalBranchAddressCountry:
                        finalData.corporateLocalBranchAddressCountry,
                    universityLocalBranchAddressState:
                        finalData.corporateLocalBranchAddressState,
                    universityLocalBranchAddressCity:
                        finalData.corporateLocalBranchAddressCity,
                    universityLocalBranchAddressDistrict:
                        finalData.corporateLocalBranchAddressDistrict,
                    universityLocalBranchAddressZipcode:
                        finalData.corporateLocalBranchAddressZipCode,
                    universityLocalBranchAddressPhone:
                        finalData.corporateLocalBranchAddressPhone,
                    universityLocalBranchAddressemail:
                        finalData.corporateLocalBranchAddressEmail,
                    primaryContactFirstName: finalData.primaryContactFirstName,
                    primaryContactMiddleName: finalData.primaryContactMiddleName,
                    primaryContactLastName: finalData.primaryContactLastName,
                    primaryContactDesignation: finalData.primaryContactDesignation,
                    primaryContactPhone: finalData.primaryContactPhone,
                    primaryContactEmail: finalData.primaryContactEmail,
                    secondaryContactFirstName: finalData.secondaryContactFirstName,
                    secondaryContactMiddleName: finalData.secondaryContactMiddleName,
                    secondaryContactLastName: finalData.secondaryContactLastName,
                    secondaryContactDesignation: finalData.secondaryContactDesignation,
                    secondaryContactPhone: finalData.secondaryContactPhone,
                    secondaryContactEmail: finalData.secondaryContactEmail,
                    universitySector: finalData.corporateIndustry,
                    yearOfEstablishment: finalData.yearOfEstablishment,
                    universityProfile: finalData.companyProfile,
                    attachment: finalData.attachment,
                    password: hashedPassword,
                };
                await dispatch(SaveCoprorateData(data, 3));
                await dispatch(SignupAction(data, history, selectedName));
            }
        } else {
            setshowError(true);
        }
        
    };

    
    return (

        <section className="login">

            <div className="log-in-main-container" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                <video autoPlay muted loop className="back-vid">
                    <source src='./Videos/v1.mp4' type="video/mp4" />
                </video>
                <div className="logo-container">
                    <div className="logo-main">C2Hire.</div>
                </div>
                {/* <div className="row">
                    <div className="main-container">
                        <div className='page'> */}

                <div className="page container" >
                    <div className="log-in-container">
                        <div className=" col-12 register-card-main">
                            <div className="registration-card">
                                <div style={{ width: "100%" }}>
                                    <div className="register-as-text">
                                        <p style={{ fontWeight: "bold" }}>REGISTER AS </p>
                                        <p style={{ fontSize: "30px", color: "#016bbc" }}>
                                            Corporate{" "}
                                        </p>
                                        <div style={{ color: 'rgb(1, 107, 188)', textAlign: 'center' }}>Contact Personnel</div>
                                    </div>
                                    <hr
                                        className="mt-2"
                                        style={{ width: "90%", marginBottom: "30px", color: "gray" }}
                                    ></hr>
                                </div>
                                <ContactPersonnelCmp
                                    history={history}
                                    errors={errors}
                                    showError={showError}
                                    isBtnDisabled={isBtnDisabled}
                                    repeatPasswordErr={repeatPasswordErr}
                                    repeatPassword={repeatPassword}
                                    contactPersonnel={contactPersonnel}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    onYes={onYes}
                                    onNo={onNo}
                                    gstnRequire={gstnRequire}
                                    disable={disable}
                                    setContactPersonnel={setContactPersonnel}
                                    setDisable={setDisable}
                                    handleShow={handleShow}
                                />
                                 {apiStatus ? <PreLoader /> : null}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            {/* </div>
                </div>
            </div> */}


        </section>
    );
}

export default CorporateContactPersonnel;