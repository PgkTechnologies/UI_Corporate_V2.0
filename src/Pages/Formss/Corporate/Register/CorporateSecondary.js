import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SaveCoprorateData } from "../../../../Store/Actions/CorporateActions/CorporateAction";
import { actionGetCitiesByStateNameRequest, actionGetCountryCodesSagaAction } from "../../../../Store/Actions/SagaActions/CommonSagaActions";
import { checkObjectProperties } from "../../../../utils/utils";
import CorporateSecondaryCmp from "./CorporateSecondaryCmp";

const CorporateSecondary = () => {
    const initialState = {
        // corporateName: '',
        corporateHQAddressLine1: '',
        corporateHQAddressLine2: '',
        corporateHQAddressCountry: '',
        corporateHQAddressState: '',
        corporateHQAddressCity: '',
        corporateHQAddressDistrict: '',
        corporateHQAddressZipCode: '',
        corporateHQAddressPhone: '',
        corporateHQAddressEmail: '',
        // CIN: '',
        corporateLocalBranchAddressLine1: '',
        corporateLocalBranchAddressLine2: '',
        corporateLocalBranchAddressCountry: '',
        corporateLocalBranchAddressState: '',
        corporateLocalBranchAddressCity: '',
        corporateLocalBranchAddressDistrict: '',
        corporateLocalBranchAddressZipCode: '',
        corporateLocalBranchAddressPhone: '',
        corporateLocalBranchAddressEmail: '',
        companyProfile: '',
        profilePicture: '',
        attribute7: ''
    };

    // =========***Error Object***=========
    const errorsObj = initialState;

    // =========***Primary data keys to check validations***=========
    const primaryKeyCheck = {
        corporateName: '',
        CIN: '',
        corporateType: '',
        corporateCategory: '',
        corporateIndustry: '',
        attachment: '',
        yearOfEstablishment: '',
    };

    const [corporateSecondary, setCorporateSecondary] = useState(initialState);
    const [errors, setErrors] = useState(errorsObj);
    const [path, setPath] = useState('');
    const [code, setCode] = useState('');
    const [code2, setCode2] = useState('');
    const [allCountriesInfo, setAllCountriesInfo] = useState('');
    const [countries, setCountries] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [citylist, setCitylist] = useState([]);
    // const [countriesLocal, setCountriesLocal] = useState([]);
    const [stateListLocal, setStateListLocal] = useState([]);
    const [citylistLocal, setCitylistLocal] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [imageObj, setImageObj] = useState({});
    const [filename, setFilename] = useState('')
    // const [corporateSecondary, setCorporateSecondary] = useState(initialState);
    // const [errors, setErrors] = useState({ profileErr: '' });
    // const [path, setPath] = useState('');
    const history = useNavigate();
    const storeData = useSelector(state => state.CorporateReducer.corporatePrimaryState);
    const countryCodes = useSelector(state => state.CorporateReducer.countryCodes);
    const selectedName = 'Corporate';

    const dispatch = useDispatch();

    useEffect(() => {
        let isPrimaryDataFilled = false;
        for (const storeKey in storeData) {
            for (const key in primaryKeyCheck) {
                if (storeKey === key) {
                    if (storeData[storeKey] !== '' || storeData[storeKey] !== null || storeData[storeKey] !== undefined) {
                        isPrimaryDataFilled = true
                    }
                }
            }
        }
        if (!isPrimaryDataFilled) {
            return history('/register');
        }
        dispatch(actionGetCountryCodesSagaAction({
            callback: onCountryCodesResponse,
        }));
        const localStorageObj = JSON.parse(sessionStorage.getItem('secondary'));
        // const isLocalStorageAvailable = localStorageObj && Object.keys(localStorageObj).length > 9 ? true : false;
        const isLocalStorageAvailable = storeData && Object.keys(storeData).length > 9 ? true : false;
        if ((storeData) && isLocalStorageAvailable) {
            // let data = Object.keys(storeData).length > 9 ? storeData : localStorageObj;
            let data = storeData;
            let storeSecondaryObj = {};
            Object.keys(data).map(keyName => {
                for (const key in initialState) {
                    if (keyName === key) {
                        storeSecondaryObj[key] = data[key];
                    }
                }
            });
            setCorporateSecondary(storeSecondaryObj);
            if (storeData?.profilePicture) {
                setFilename(storeData?.profilePicture?.name);
                let reader = new FileReader();
                reader.onload = function (ev) {
                    setPath(ev.target.result.split(',')[1]);
                };
                reader.readAsDataURL(storeData.profilePicture);
            }
        }

    }, []);

    useEffect(() => {
        const isErrorsObjEmpty = checkObjectProperties(errors);
        setIsBtnDisabled(isErrorsObjEmpty);
    }, [errors]);


    const onCountryCodesResponse = (response) => {
        if (response) {
            setAllCountriesInfo(response.data);
            const updatedCountryOptions = response.data.map((item) => {
                return { value: item?.name, label: item?.name };
            });
            if (storeData?.corporateHQAddressCountry) {
                response.data.map((item) => {
                    if (item.name === storeData?.corporateHQAddressCountry) {
                        setStatesByType(item.states, 'HQ');
                    }
                });
                //getStatesByCountryName(storeData?.corporateHQAddressCountry, 'HQ');
            }
            if (storeData.corporateHQAddressState) {
                getCitiesByStateName(storeData?.corporateHQAddressCountry, storeData?.corporateHQAddressState, 'HQ');
            }

            setTimeout(() => {
                if (storeData?.corporateLocalBranchAddressCountry) {
                    response.data.map((item) => {
                        if (item.name === storeData?.corporateLocalBranchAddressCountry) {
                            setStatesByType(item.states, 'LOCAL');
                        }
                    });
                }
                if (storeData?.corporateLocalBranchAddressState) {
                    getCitiesByStateName(storeData?.corporateLocalBranchAddressCountry, storeData?.corporateLocalBranchAddressState, 'LOCAL');
                }
            }, 1500);


            setCountries(updatedCountryOptions);
        }
    };

    const handleChange = (event) => {
        const {name, value, error} = event.target;
        if (['corporateHQAddressPhone', 'corporateLocalBranchAddressPhone'].includes(name)) {
            while (value.toString().startsWith('+91')) {
                value = value.replace('+91', '')
            }
        }
        setCorporateSecondary(preState => ({
            ...preState,
            [name]: value
        }));
        setErrors(preState => ({
            ...preState,
            [name]: error
        }));
        if (name === 'corporateHQAddressCountry') {
            allCountriesInfo.map((item) => {
                if (item.name === value) {
                    setStatesByType(item.states, 'HQ');
                }
            });
        } else if (name === 'corporateLocalBranchAddressCountry') {
            allCountriesInfo.map((item) => {
                if (item.name === value) {
                    setStatesByType(item.states, 'LOCAL');
                }
            });
        }
        if (name === 'corporateHQAddressState') {
            getCitiesByStateName(corporateSecondary.corporateHQAddressCountry, value, 'HQ');
        } else if (name === 'corporateLocalBranchAddressState') {
            getCitiesByStateName(corporateSecondary.corporateLocalBranchAddressCountry, value, 'LOCAL');
        }

        switch (name) {
            case "corporateHQAddressZipCode":
                // if (val.match(phoneno)) {
                if (value.length <= 6 && value.length > 4 ) {
                    setErrors((preState) => ({
                        ...preState,
                        corporateHQAddressZipCode: "",
                    }));
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        corporateHQAddressZipCode: "Invalid",
                    }));
                }
                return;

                case "corporateHQAddressPhone":
                // if (val.match(phoneno)) {
                if (value.length === 10 ) {
                    setErrors((preState) => ({
                        ...preState,
                        corporateHQAddressPhone: "",
                    }));
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        corporateHQAddressPhone: "Invalid",
                    }));
                }
                return;

                case "corporateHQAddressEmail":
                const mailformat1 =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (value && mailformat1.test(value)) {
                    setErrors((preState) => ({
                        ...preState,
                        corporateHQAddressEmail: "",
                    }));
                } else if (!value || !mailformat1.test(value)) {
                    setErrors((preState) => ({
                        ...preState,
                        corporateHQAddressEmail: "Invalid Email",
                    }));
                }
                return;



                case "corporateLocalBranchAddressZipCode":
                    // if (val.match(phoneno)) {
                    if (value.length <= 6 && value.length > 4 ) {
                        setErrors((preState) => ({
                            ...preState,
                            corporateLocalBranchAddressZipCode: "",
                        }));
                    } else {
                        setErrors((preState) => ({
                            ...preState,
                            corporateLocalBranchAddressZipCode: "Invalid",
                        }));
                    }
                    return;
    
                    case "corporateLocalBranchAddressPhone":
                    // if (val.match(phoneno)) {
                    if (value.length === 10 ) {
                        setErrors((preState) => ({
                            ...preState,
                            corporateLocalBranchAddressPhone: "",
                        }));
                    } else {
                        setErrors((preState) => ({
                            ...preState,
                            corporateLocalBranchAddressPhone: "Invalid",
                        }));
                    }
                    return;
    
                    case "corporateLocalBranchAddressEmail":
                    const mailformat2 =
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    if (value && mailformat2.test(value)) {
                        setErrors((preState) => ({
                            ...preState,
                            corporateLocalBranchAddressEmail: "",
                        }));
                    } else if (!value || !mailformat2.test(value)) {
                        setErrors((preState) => ({
                            ...preState,
                            corporateLocalBranchAddressEmail: "Invalid Email",
                        }));
                    }
                    return;
               
                default: break;
            }
    }

    const getCitiesByStateName = (countryName, stateName, type) => {
        dispatch(actionGetCitiesByStateNameRequest({
            model: {
                "country": countryName,
                "state": stateName
            },
            callback: (data) => {
                setCitiesByType(data, type);
            },
        }));
    }

    const setStatesByType = (data, type) => {
        let statesList = data && data.length >= 0
            ? data?.map((item, i) => ({ value: item?.name, label: item?.name })) : (null);
        if (type === 'HQ') {
            setStateList(statesList);
        } else {
            setStateListLocal(statesList)
        }
    }

    const setCitiesByType = (data, type) => {
        let citiesList = data && data.length >= 0
            ? data?.map((item, i) => ({ value: item, label: item })) : (null);
        if (type === 'HQ') {
            setCitylist(citiesList);
        } else {
            setCitylistLocal(citiesList)
        }
    }

    const saveData = (event) => {
        const isCheked = event.target.checked;
        if (isCheked) {
            setCode2(code);
            setStateListLocal(stateList);
            setCitylistLocal(citylist);
            setCorporateSecondary(preState => ({
                ...preState,
                corporateLocalBranchAddressLine1: corporateSecondary.corporateHQAddressLine1,
                corporateLocalBranchAddressLine2: corporateSecondary.corporateHQAddressLine2,
                corporateLocalBranchAddressCountry: corporateSecondary.corporateHQAddressCountry,
                corporateLocalBranchAddressState: corporateSecondary.corporateHQAddressState,
                corporateLocalBranchAddressCity: corporateSecondary.corporateHQAddressCity,
                corporateLocalBranchAddressDistrict: corporateSecondary.corporateHQAddressDistrict,
                corporateLocalBranchAddressZipCode: corporateSecondary.corporateHQAddressZipCode,
                corporateLocalBranchAddressPhone: corporateSecondary.corporateHQAddressPhone,
                corporateLocalBranchAddressEmail: corporateSecondary.corporateHQAddressEmail
            }));
        } else {
            setCode2('');
            setStateListLocal([]);
            setCitylistLocal([]);
            setCorporateSecondary(preState => ({
                ...preState,
                corporateLocalBranchAddressLine1: '',
                corporateLocalBranchAddressLine2: '',
                corporateLocalBranchAddressCountry: '',
                corporateLocalBranchAddressState: '',
                corporateLocalBranchAddressCity: '',
                corporateLocalBranchAddressDistrict: '',
                corporateLocalBranchAddressZipCode: '',
                corporateLocalBranchAddressPhone: '',
                corporateLocalBranchAddressEmail: ''
            }));
        }
    }

    const handleChangeImg = (event) => {
        event.preventDefault();
        let imageObj = event.target.files[0];
        if (event.target.files) {
            setCorporateSecondary(preState => ({
                ...preState,
                profilePicture: imageObj
            }))
            let obj = {};
            for (const key in imageObj) {
                obj[key] = imageObj[key]
            }
            setImageObj(obj);
            setFilename(imageObj.name);
            // if (event.target.files[0].type === "application/pdf")
            const val = event.target.files.length;
            for (let i = 0; i < val; i++) {
                let reader = new FileReader();
                reader.onload = function (ev) {
                    setPath(ev.target.result.split(',')[1]);
                };
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { profileErr } = errors;
        const {
            corporateHQAddressLine1, corporateHQAddressLine2, corporateHQAddressCountry, corporateHQAddressState,
            corporateHQAddressCity, corporateHQAddressDistrict, corporateHQAddressZipCode, corporateHQAddressPhone,
            corporateHQAddressEmail, companyProfile, corporateLocalBranchAddressPhone
        } = corporateSecondary;
        if (selectedName === 'Corporate') {
            if (corporateHQAddressLine1 && corporateHQAddressLine2 && corporateHQAddressCountry && corporateHQAddressState
                && corporateHQAddressCity && corporateHQAddressDistrict && corporateHQAddressZipCode && corporateHQAddressPhone
                && corporateHQAddressEmail) {
                const countryCode = countries?.find(item => item?.value === corporateSecondary?.corporateHQAddressCountry);
                const countryCode2 = countries?.find(item => item?.value === corporateSecondary?.corporateLocalBranchAddressCountry);
                corporateSecondary['countryCode'] = '';
                corporateSecondary['countryCode2'] = '';
                sessionStorage.setItem('secondary', JSON.stringify(corporateSecondary));
                dispatch(SaveCoprorateData(corporateSecondary, 2));
                history('/register/contactPersonnel');

            } else {
                toast.error("Please enter required input fields")
            }
        } else if (selectedName === 'University') {
            if (corporateHQAddressLine1 && corporateHQAddressLine2 && corporateHQAddressCountry && corporateHQAddressState
                && corporateHQAddressCity && corporateHQAddressDistrict && corporateHQAddressZipCode && corporateHQAddressPhone
                && corporateHQAddressEmail && companyProfile) {
                dispatch(SaveCoprorateData(corporateSecondary, 2));
                history('/register/contactPersonnel');

            } else {
                toast.error("Please enter required input fields")
            }
        }
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
          {/* <div className="row"> */}
            {/* <div className="main-container">
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
                                <div style={{color:'rgb(1, 107, 188)' , textAlign :'center' }}> Secondary Details(Address)</div>
                            </div>
                            <hr
                                className="mt-2"
                                style={{ width: "90%", marginBottom: "30px", color: "gray" }}
                            ></hr>
                        </div>
                        <CorporateSecondaryCmp
                            history={history}
                            selectedName={selectedName}
                            path={"data:image/png;base64," + path}
                            corporateSecondary={corporateSecondary}
                            errors={errors}
                            isBtnDisabled={isBtnDisabled}
                            attachment={corporateSecondary.profilePicture}
                            countryCodes={countries}
                            stateList={stateList}
                            citylist={citylist}
                            // countryCodesLocal={countriesLocal}
                            stateListLocal={stateListLocal}
                            citylistLocal={citylistLocal}
                            filename={filename}
                            saveData={saveData}
                            handleChangeImg={handleChangeImg}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>

        </div>
        </div>
        {/* </div> */}
        {/* </div>
        </div> */}
        </section>


    )
}

export default CorporateSecondary;