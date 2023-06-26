import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "@material-ui/core";
import PreLoader from "../../utils/PreLoader";
import { useDispatch, useSelector } from "react-redux";
import BasicCmp from "./BasicCmp";
import AddressCmp from "./AddressCmp";
import ProfileCmp from "./ProfileCmp";
import PasswordForm from "./Password";
import { actionGetCitiesByStateNameRequest, actionGetCountryCodesSagaAction, actionGetS3AttachRequest } from "../../Store/Actions/SagaActions/CommonSagaActions";
import moment from "moment";
import CryptoJS from "crypto-js";
import { actionPatchCorporateProfileSagaAction, actionPostPublishCorporateProfileSagaAction } from "../../Store/Actions/SagaActions/CorporateProfileSagaActions";
import Publish from "../../Pages/DashBoard/Publish/Publish";
import { toast } from "react-toastify";



const requiredFields = [
    "stakeholderID",
    "CIN",
    "corporateType",
    "corporateCategory",
    "corporateIndustry",
    "yearOfEstablishment",
    "corporateHQAddressLine1",
    "corporateHQAddressCountry",
    "corporateHQAddressState",
    "corporateHQAddressCity",
    "corporateHQAddressDistrict",
    "corporateHQAddressZipCode",
    "corporateHQAddressPhone",
    "corporateHQAddressEmail",
    "primaryContactFirstName",
    "primaryContactLastName",
    "primaryContactPhone",
    "primaryContactEmail",
];

const formFields = [
    "stakeholderID",
    "CIN",
    "corporateType",
    "corporateCategory",
    "corporateIndustry",
    "yearOfEstablishment",
    "attribute7",
    "corporateHQAddressLine1",
    "corporateHQAddressLine2",
    "corporateHQAddressCountry",
    "corporateHQAddressState",
    "corporateHQAddressCity",
    "corporateHQAddressDistrict",
    "corporateHQAddressZipCode",
    "corporateHQAddressPhone",
    "corporateHQAddressEmail",
    "gstn",
    "corporateLocalBranchAddressLine1",
    "corporateLocalBranchAddressLine2",
    "corporateLocalBranchAddressCountry",
    "corporateLocalBranchAddressState",
    "corporateLocalBranchAddressCity",
    "corporateLocalBranchAddressDistrict",
    "corporateLocalBranchAddressZipCode",
    "corporateLocalBranchAddressPhone",
    "corporateLocalBranchAddressEmail",

    "primaryContactFirstName",
    "primaryContactMiddleName",
    "primaryContactLastName",
    "primaryContactPhone",
    "primaryContactEmail",
    "primaryContactDesignation",
    "companyProfile",
    "profilePicture",
    "attachment",
];




const CorporateProfile = ({ setShowPublish, showPublish }) => {

    // const dispatch = useDispatch();
    const handleShow = () => setShowTermsAndConditions(true);
    const handleClose = () => setShowTermsAndConditions(false);

    const apiStatus = useSelector((state) => state.loginReducer?.apiStatus);
    // const storedContries = useSelector((state) => state.loginReducer?.countryList);
    // const profileInfo = useSelector((state) => state.DashboardReducer.profileInfo);

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);

    // const [isTermsAndConditionsChecked, setIsTermsAndConditionsChecked] = useState(false);
    // const [smShow, setSmShow] = useState(false);

    // const [profile, setProfile] = useState([]);
    // const [allCountries, setAllCountries] = useState([]);
    // const [cityListLocal, setCityListLocal] = useState([]);
    // const [stateListHQ, setStateListHQ] = useState([]);
    // const [codeLocal, setCodeLocal] = useState([]);
    // const [stateListLocal, setStateListLocal] = useState([]);
    // const [cityListHQ, setCityListHQ] = useState([]);


    // const [errors, setErrors] = useState({
    //     hAddressLine1: '',
    //     hAddressLine2: '',
    //     bAddressLine1: '',
    //     bAddressLine2: '',
    //     attachmentFileSizeErr: "",
    //     profilePicSizeErr: "",
    //     emailErr: "",
    //     email2Err: "",
    //     passwordErr: "",
    //     lnameErr: "",
    //     fnameErr: "",
    //     designationErr: "",
    //     repeatPasswordErr: "",
    //     mobileErr: "",
    //     mobile2Err: "",
    //   });

    //   const toggleCorporateHeadQuarters = (event) => {
    //     const isCheked = event.target.checked;
    //     if (isCheked) {
    //       setProfile((preState) => ({
    //         ...preState,
    //         universityLocalBranchAddressLine1: profile.universityHQAddressLine1,
    //         universityLocalBranchAddressLine2: profile.universityHQAddressLine2,
    //         universityLocalBranchAddressCountry: profile.universityHQAddressCountry,
    //         universityLocalBranchAddressState: profile.universityHQAddressState,
    //         universityLocalBranchAddressCity: profile.universityHQAddressCity,
    //         universityLocalBranchAddressDistrict:
    //           profile.universityHQAddressDistrict,
    //         universityLocalBranchAddressZipcode: profile.universityHQAddressZipcode,
    //         universityLocalBranchAddressPhone: profile.primaryContactPhone,
    //         universityLocalBranchAddressemail: profile.universityHQAddressemail,
    //       }));
    //       //setCodeLocal(codeHQ);
    //       setStateListLocal(stateListHQ);
    //       setCityListLocal(cityListHQ);
    //     } else {
    //       setProfile((preState) => ({
    //         ...preState,
    //         universityLocalBranchAddressLine1: "",
    //         universityLocalBranchAddressLine2: "",
    //         universityLocalBranchAddressCountry: "",
    //         universityLocalBranchAddressState: "",
    //         universityLocalBranchAddressCity: "",
    //         universityLocalBranchAddressDistrict: "",
    //         universityLocalBranchAddressZipcode: "",
    //         universityLocalBranchAddressPhone: "",
    //         universityLocalBranchAddressemail: "",
    //       }));
    //       setCodeLocal("");
    //       setStateListLocal([]);
    //       setCityListLocal([]);
    //     }
    //   };

    // const saveProfile = () => {

    // };

    // useEffect(() => {
    //     setProfile(profileInfo)
    // }, [profileInfo]);

    // useEffect(() => {
    //     if (storedContries?.length > 0) {
    //         setAllCountries(storedContries);
    //     } else {
    //         dispatch(actionGetCountryCodesSagaAction({ callback: onSuccessGetCountryList }));
    //     }
    // }, [dispatch]);

    // const onSuccessGetCountryList = (countries) => {
    //     console.log(countries, 'COUNTRZ')
    //     setAllCountries(countries.data);
    // };

    // console.log(profileInfo, 'REDUCER PRO');

    const initialData = {
        universityProfile: false,
    };

    const [profile, setProfile] = useState();
    const [checkStatus, setCheckStatus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
    const [profilePicture, setProfilePicture] = useState();
    const [attachment, setAttachment] = useState({
        attachment: undefined,
        attachmentName: undefined,
        attachmentError: undefined,
    });
    const [isTermsAndConditionsChecked, setIsTermsAndConditionsChecked] = useState(true);



    const [postPublishProfile, setPostPublishProfile] = useState(initialData);

    const [inputError, setInputError] = useState("");

    const [initHqAddress, setInitHqAddress] = useState({
        states: false,
        cities: false,
    });

    const [initLocalAddress, setInitLocalAddress] = useState({
        states: false,
        cities: false,
    });

    const [allCountries, setAllCountries] = useState([]);
    const [countries, setCountries] = useState([]);

    const [hqStates, setHqStates] = useState([]);
    const [hqCities, setHqCities] = useState([]);

    const [localStates, setLocalStates] = useState([]);
    const [localCities, setLocalCities] = useState([]);

    const [passwordModel, setPasswordModel] = useState({
        password: "",
        oldPassword: "",
        reenterPassword: "",
    });
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch();


    const profileInfo = useSelector(
        (state) => state.DashboardReducer.profileInfo
    );

    useEffect(() => {
        setIsTermsAndConditionsChecked(false);
    }, [])



    const downloadPDF = (path, next) => {
        dispatch(
            actionGetS3AttachRequest({
                path: path,
                callback: next,
            })
        );
    };
    function getFile(file) {
        var reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new Error("Error parsing file"));
            };
            reader.onload = function () {
                //This will result in an array that will be recognized by C#.NET WebApi as a byte[]
                let bytes = Array.from(new Uint8Array(this.result));

                //if you want the base64encoded file you would use the below line:
                let base64StringFile = btoa(
                    bytes.map((item) => String.fromCharCode(item)).join("")
                );

                //Resolve the promise with your custom file structure
                resolve({
                    base64StringFile: base64StringFile,
                });
            };
            reader.readAsArrayBuffer(file);
        });
    }

    const onCountryCodesResponse = (response) => {
        if (response) {
            setAllCountries(response.data);
            const updatedCountryOptions = response.data.map((item) => {
                return { value: item?.name, label: item?.name };
            });
            setCountries(updatedCountryOptions);
            if (profileInfo?.corporateLocalBranchAddressCountry) {
                response.data.map((item) => {
                    if (item.name === profileInfo?.corporateLocalBranchAddressCountry) {
                        onStatesResponse(item.states, "LOCAL");
                    }
                });
            }

            if (profileInfo?.corporateLocalBranchAddressState) {
                getCitiesByStateName(
                    profileInfo?.corporateLocalBranchAddressCountry,
                    profileInfo?.corporateLocalBranchAddressState,
                    "LOCAL"
                );
            }

            if (profileInfo?.corporateHQAddressCountry) {
                response?.data?.map((item) => {
                    if (item.name === profileInfo?.corporateHQAddressCountry) {
                        onStatesResponse(item.states, "HQ");
                    }
                });
                //getStatesByCountryName(profile?.corporateHQAddressCountry?.value, 'HQ');
            }

            if (profileInfo?.corporateHQAddressState) {
                getCitiesByStateName(
                    profileInfo?.corporateHQAddressCountry,
                    profileInfo?.corporateHQAddressState,
                    "HQ"
                );
            }
        }
    };

    const onStatesResponse = (response, type) => {
        let updatedStatesOptions = [];

        if (response?.length) {
            updatedStatesOptions = response.map((item) => {
                return { value: item?.name, label: item?.name };
            });
        }

        if (type === "HQ") {
            setHqStates(updatedStatesOptions);
            if (!initHqAddress.states) {
                setInitHqAddress((prevState) => ({
                    ...prevState,
                    states: true,
                }));
            }
        } else {
            setLocalStates(updatedStatesOptions);
            if (!initLocalAddress.states) {
                setInitLocalAddress((prevState) => ({
                    ...prevState,
                    states: true,
                }));
            }
        }
    };

    const onCitiesResponse = (response, type) => {
        let updatedCitiesOptions = [];

        if (response?.length) {
            updatedCitiesOptions = response?.map((item) => {
                return { value: item, label: item };
            });
        }

        if (type === "HQ") {
            setHqCities(updatedCitiesOptions);
            if (!initHqAddress.cities) {
                setInitHqAddress((prevState) => ({
                    ...prevState,
                    cities: true,
                }));
            }
        } else {
            setLocalCities(updatedCitiesOptions);
            if (!initLocalAddress.cities) {
                setInitLocalAddress((prevState) => ({
                    ...prevState,
                    cities: true,
                }));
            }
        }
    };

    const getCitiesByStateName = (countryName, stateName, type) => {
        dispatch(
            actionGetCitiesByStateNameRequest({
                model: {
                    country: countryName,
                    state: stateName,
                },
                callback: (response) => {
                    onCitiesResponse(response, type);
                },
            })
        );
    };

    useEffect(() => {
        if (profileInfo) {
            setProfilePicture(profileInfo?.profilePicture);
            setAttachment({
                attachment: profileInfo?.attachment,
                attachmentName: profileInfo?.attachmentName,
                attachmentError: undefined,
            });

            let profileData = {};

            formFields.forEach((key) => {
                if (["profilePicture", "attachment"].includes(key)) {
                    profileData[key] = {
                        value: undefined,
                        errorMessage: undefined,
                        isRequired: requiredFields.includes(key) ? true : false,
                    };
                } else if (
                    [
                        "corporateHQAddressCountry",
                        "corporateLocalBranchAddressCountry",
                    ].includes(key)
                ) {
                    profileData[key] = {
                        // value: 'India',
                        value: profileInfo[key],
                        errorMessage: undefined,
                        isRequired: requiredFields.includes(key) ? true : false,
                    };
                } else if (
                    [
                        "corporateHQAddressPhone",
                        "corporateLocalBranchAddressPhone",
                        "primaryContactPhone",
                    ].includes(key)
                ) {
                    profileData[key] = {
                        value: profileInfo[key]
                            ? profileInfo[key].substring(profileInfo[key].length - 10)
                            : "",
                        errorMessage: undefined,
                        isRequired: requiredFields.includes(key) ? true : false,
                    };
                } else {
                    profileData[key] = {
                        value: profileInfo[key],
                        errorMessage: undefined,
                        isRequired: requiredFields.includes(key) ? true : false,
                    };
                }
            });

            setProfile(profileData);
            dispatch(
                actionGetCountryCodesSagaAction({
                    callback: onCountryCodesResponse,
                })
            );
        }
    }, [profileInfo]);

    const updateProfileData = (event) => {
        const { name, value, errorMessage } = event.target;
        console.log(name, value, 'testing')
        let data = profile[name];
        data["value"] = value;
        data["errorMessage"] = errorMessage;

        let updatedProfile = { ...profile };

        if (name === 'corporateHQAddressEmail') {
            updatedProfile = {
                ...updatedProfile,
                corporateHQAddressEmail: {
                        ...updatedProfile.corporateHQAddressEmail,
                        value: value,
                        errorMessage: updatedProfile.corporateHQAddressEmail.isRequired
                            ? "Required"
                            : "",
                    
                }
            }
        }

        console.log(updatedProfile, 'testing1111')

        if (
            name === "corporateHQAddressCountry" ||
            name === "corporateLocalBranchAddressCountry"
        ) {
            allCountries?.map((item) => {
                if (item?.name === value) {
                    onStatesResponse(
                        item?.states,
                        name === "corporateHQAddressCountry" ? "HQ" : "LOCAL"
                    );
                }
            });

            if (name === "corporateHQAddressCountry") {
                setHqStates([]);
            } else if (name === "corporateLocalBranchAddressCountry") {
                setLocalStates([]);
            }

            if (name === "corporateHQAddressCountry") {
                setHqCities([]);
            } else if (name === "corporateLocalBranchAddressCountry") {
                setLocalCities([]);
            }

            if (name === "corporateHQAddressCountry") {
                updatedProfile = {
                    ...updatedProfile,
                    corporateHQAddressState: {
                        ...updatedProfile.corporateHQAddressState,
                        value: undefined,
                        errorMessage: updatedProfile.corporateHQAddressState.isRequired
                            ? "Required"
                            : "",
                    },
                    corporateHQAddressCity: {
                        ...updatedProfile.corporateHQAddressCity,
                        value: undefined,
                        errorMessage: updatedProfile.corporateHQAddressCity.isRequired
                            ? "Required"
                            : "",
                    },
                };
            } else if (name === "corporateLocalBranchAddressCountry") {
                updatedProfile = {
                    ...updatedProfile,
                    corporateLocalBranchAddressState: {
                        ...updatedProfile.corporateLocalBranchAddressState,
                        value: undefined,
                        errorMessage: updatedProfile.corporateLocalBranchAddressState
                            .isRequired
                            ? "Required"
                            : "",
                    },
                    corporateLocalBranchAddressCity: {
                        ...updatedProfile.corporateLocalBranchAddressCity,
                        value: undefined,
                        errorMessage: updatedProfile.corporateLocalBranchAddressCity
                            .isRequired
                            ? "Required"
                            : "",
                    },
                };
            }
        }

        if (
            name === "corporateHQAddressState" ||
            name === "corporateLocalBranchAddressState"
        ) {
            getCitiesByStateName(
                profileInfo?.corporateLocalBranchAddressCountry,
                value,
                // name === "corporateHQAddressState" ? "HQ" : "LOCAL"
            );
            if (name === "corporateHQAddressState") {
                setHqCities([]);
            } else if (name === "corporateLocalBranchAddressState") {
                setLocalCities([]);
            }
            if (name === "corporateHQAddressState") {
                updatedProfile = {
                    ...updatedProfile,
                    corporateHQAddressCity: {
                        ...updatedProfile.corporateHQAddressCity,
                        value: undefined,
                        errorMessage: updatedProfile.corporateHQAddressCity.isRequired
                            ? "Required"
                            : "",
                    },
                };
            } else if (name === "corporateLocalBranchAddressState") {
                updatedProfile = {
                    ...updatedProfile,
                    corporateLocalBranchAddressCity: {
                        ...updatedProfile.corporateLocalBranchAddressCity,
                        value: undefined,
                        errorMessage: updatedProfile.corporateLocalBranchAddressCity
                            .isRequired
                            ? "Required"
                            : "",
                    },
                };
            }
        }

        setProfile((prevProfile) => ({
            ...prevProfile,
            ...updatedProfile,
            ...data,
        }));
    };

    const updatePassword = (event) => {
        const { name, value } = event.target;
        setPasswordModel((preState) => ({
            ...preState,
            [name]: value,
        }));
        if (name === "password" && passwordModel?.reenterPassword !== value) {
            setPasswordError("Mismatch");
        } else if (
            name === "reenterPassword" &&
            passwordModel?.password !== value
        ) {
            setPasswordError("Mismatch");
        } else if (
            name === "reenterPassword" &&
            passwordModel?.password === value
        ) {
            setPasswordError("");
        } else if (
            name === "password" &&
            passwordModel?.reenterPassword === value
        ) {
            setPasswordError("");
        }
    };

    const fileHandler = (event) => {
        event.preventDefault();
        const { name } = event.target;

        if (event.target.files) {
            let errorMessage = undefined;
            const val = event.target.files.length;

            if (val) {
                if (parseFloat((event.target.files[0].size / 1024).toFixed(2)) > 5000) {
                    errorMessage = "Please select file below 5 MB";
                }
            }

            for (let i = 0; i < val; i++) {
                let reader = new FileReader();
                reader.onload = function (ev) {
                    if (name === "profilePicture") {
                        setProfilePicture(ev.target.result.split(",")[1]);
                    } else if (name === "attachment") {
                        getFile(event.target.files[0]).then((customJsonFile) => {
                            console.log(customJsonFile, "cc");
                            setAttachment({
                                attachment: customJsonFile.base64StringFile,
                                attachmentName: event.target.files[0].name,
                                attachmentError: undefined,
                            });
                        });
                    }
                };

                reader.readAsDataURL(event.target.files[i]);
            }

            let data = profile[name];
            data["value"] = event.target.files[0];
            data["errorMessage"] = errorMessage;
            setProfile((prevProfile) => ({
                ...prevProfile,
                ...data,
            }));
        }
    };

    const toggleCorporateHeadQuarters = () => {
        setCheckStatus(!checkStatus);
        if (!checkStatus) {
            setLocalStates(hqStates);
            setLocalCities(hqCities);

            setProfile((prevState) => ({
                ...prevState,
                corporateLocalBranchAddressLine1: {
                    value: prevState.corporateHQAddressLine1.value,
                    errorMessage: undefined,
                },
                corporateLocalBranchAddressLine2: {
                    value: prevState.corporateHQAddressLine2.value,
                    errorMessage: undefined,
                },
                corporateLocalBranchAddressCountry: {
                    value: prevState.corporateHQAddressCountry.value,
                    errorMessage: undefined,
                },
                corporateLocalBranchAddressState: {
                    value: prevState.corporateHQAddressState.value,
                    errorMessage: undefined,
                },
                corporateLocalBranchAddressCity: {
                    value: prevState.corporateHQAddressCity.value,
                    errorMessage: undefined,
                },
                corporateLocalBranchAddressDistrict: {
                    value: prevState.corporateHQAddressDistrict.value,
                    errorMessage: undefined,
                },
                corporateLocalBranchAddressZipCode: {
                    value: prevState.corporateHQAddressZipCode.value,
                    errorMessage: undefined,
                },
                corporateLocalBranchAddressPhone: {
                    value: prevState.corporateHQAddressPhone.value,
                    errorMessage: undefined,
                },
                corporateLocalBranchAddressEmail: {
                    value: prevState.corporateHQAddressEmail.value,
                    errorMessage: undefined,
                },
            }));
        }
    };

    const saveProfile = () => {
        const profileKeys = profile ? Object.keys(profile) : [];

        let updatedProfile = {};

        profileKeys?.forEach((item) => {
            if (profile[item]?.value) {
                updatedProfile[item] = profile[item].value;
            }
        });

        updatedProfile = {
            ...updatedProfile,
            corporateHQAddressPhone:
                updatedProfile.corporateHQAddressPhone &&
                    updatedProfile.corporateHQAddressPhone.toString().trim() !== ""
                    ? "+91" + updatedProfile.corporateHQAddressPhone
                    : "",
            corporateLocalBranchAddressPhone:
                updatedProfile.corporateLocalBranchAddressPhone &&
                    updatedProfile.corporateLocalBranchAddressPhone.toString().trim() !==
                    "" &&
                    updatedProfile.corporateLocalBranchAddressPhone.toString().trim()
                        .length === 10
                    ? "+91" + updatedProfile.corporateLocalBranchAddressPhone
                    : "",
            primaryContactPhone:
                updatedProfile.primaryContactPhone &&
                    updatedProfile.primaryContactPhone.toString().trim() !== "" &&
                    updatedProfile.primaryContactPhone.toString().trim().length === 10
                    ? "+91" + updatedProfile.primaryContactPhone
                    : "",
            dateOfJoining: moment(updatedProfile.dateOfJoining),
            ...attachment,
        };
        console.log(attachment, "hgjg");
        if (updatedProfile?.attachment === undefined) {
            delete updatedProfile.attachment;
        }

        if (updatedProfile?.profilePicture === undefined) {
            delete updatedProfile.profilePicture;
        }

        // Check is password is provided
        if (passwordModel?.oldPassword?.length > 0) {
            if (passwordError?.length === 0) {
                let iv = CryptoJS.enc.Utf8.parse("1234567812345678");
                let key = CryptoJS.enc.Utf8.parse("5v8y/B?E(G+KbPeShVmYq3t6w9z$C&12");
                let hashedPassword = CryptoJS.AES.encrypt(
                    passwordModel?.password,
                    key,
                    {
                        iv: iv,
                        padding: CryptoJS.pad.Pkcs7,
                    }
                ).toString();

                let hashedOldPassword = CryptoJS.AES.encrypt(
                    passwordModel?.oldPassword,
                    key,
                    {
                        iv: iv,
                        padding: CryptoJS.pad.Pkcs7,
                    }
                ).toString();
                updatedProfile = {
                    ...updatedProfile,
                    oldPassword: hashedOldPassword,
                    password: hashedPassword,
                };
                dispatch(
                    actionPatchCorporateProfileSagaAction({
                        apiPayloadRequest: updatedProfile,
                        callback: () => {
                            setShowModal(true);
                            setIsTermsAndConditionsChecked(false);
                        },
                    })
                );
            }
        } else {
            dispatch(
                actionPatchCorporateProfileSagaAction({
                    apiPayloadRequest: updatedProfile,
                    callback: () => {
                        setShowModal(true);
                        setIsTermsAndConditionsChecked(false);
                    },
                })
            );
        }
    };

    const addPublishProfileForm = (data) => {
        dispatch(
            actionPostPublishCorporateProfileSagaAction({
                apiPayloadRequest: data,
                callback: getResponse,
            })
        );
    }

    const getResponse = (data) => {
        console.log(data, 'getresponse')
    }

    const isFormValid = () => {
        if (
            (profile &&
                requiredFields.some(
                    (item) => profile[item]?.errorMessage !== undefined
                )) ||
            attachment.attachmentError ||
            passwordError?.length !== 0
        ) {
            return false;
        } else {
            return true && isTermsAndConditionsChecked;
        }
    };

    const publishData = () => {
        const publishData = {};

        if (postPublishProfile.universityProfile) {
            publishData.profile = profileInfo;
        }


        const finalModel = {
            //   infoPublished: false,
            profilePublished: postPublishProfile.universityProfile,
            //   otherPublished: false,

        };
        addPublishProfileForm(finalModel);
        setShowPublish(false);
        toast.success('Data published Successfully')
    };




    const handleChange = (event) => {
        const { name, checked } = event.target;
        setPostPublishProfile((preState) => ({
            ...preState,
            [name]: checked,
        }));
        setInputError("");
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (postPublishProfile.universityProfile) {
            setInputError("");
            publishData();
        } else {
            setInputError("Select atleast one profile to publish");
        }
    };


    console.log(profile, profileInfo, "TOT");
    console.log(profile?.companyProfile, "direc corp msu");




    return (
        <>
            {apiStatus ? <PreLoader /> : null}
            <div className="modal-main">
                <p className="modal-title"> Corporate Profile </p>
                {profile?.publishedFlag ? (
                    <p
                        className="sub-title"
                        style={{
                            padding: "0px 10px 5px",
                            margin: "0",
                            fontWeight: "bold",
                        }}
                    >
                        <div style={{ float: "right" }}>
                            <VerifiedUserIcon
                                style={{ marginBottom: "3px", marginRight: "5px" }}
                            />
                            Published
                        </div>
                    </p>
                ) : (
                    <p
                        className="sub-title"
                        style={{
                            padding: "10px",
                            margin: "0",
                            fontWeight: "bold",
                            alignSelf: "flex-end",
                            color: "#ae840f",
                        }}
                    >
                        <SecurityIcon style={{ marginBottom: "3px", marginRight: "5px" }} />
                        Yet to be Published
                    </p>
                )}

                <div>
                    <BasicCmp
                        // profileData={profileInfo}
                        profileData={profile}
                        onChange={updateProfileData}
                        profileInfo={profileInfo}
                        moment={moment}
                    />
                    <AddressCmp
                        profileData={profile}
                        onChange={updateProfileData}
                        checkStatus={checkStatus}
                        toggleCorporateHeadQuarters={toggleCorporateHeadQuarters}
                        countries={countries}
                        hqStates={hqStates}
                        hqCities={hqCities}
                        localStates={localStates}
                        localCities={localCities}
                    // profileData={profileInfo}
                    // countries={storedContries}
                    // cityListLocal={cityListLocal}
                    // toggleCorporateHeadQuarters={toggleCorporateHeadQuarters}
                    />

                    <ProfileCmp
                        profileData={profile}
                        onChange={updateProfileData}
                        tempAttachment={attachment}
                        fileHandler={fileHandler}
                        downloadPDF={downloadPDF}
                    // profileData={profileInfo}
                    />

                    <PasswordForm
                        // profileData={profileInfo}
                        profileData={passwordModel}
                        onChange={updatePassword}
                        passwordErr={passwordError}
                    />
                </div>
                <div>
                    <div className="d-grp">
                        <div className="custom-control custom-checkbox">
                            <input
                                onChange={() => {
                                    setIsTermsAndConditionsChecked(!isTermsAndConditionsChecked);
                                }}
                                checked={isTermsAndConditionsChecked}
                                type="checkbox"
                                className="custom-control-input"
                                id="accept"
                                required
                            />
                            <label className="custom-control-label" htmlFor="accept">
                                &nbsp; I hereby accept the
                                <span
                                    onClick={() => {
                                        handleShow(true);
                                    }}
                                    style={{ color: "#0291ff", cursor: "pointer" }}
                                >
                                    {" "}
                                    Terms & Conditions
                                </span>{" "}
                                of the Platform
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <button
                        className="btn"
                        type="submit"
                        disabled={!isTermsAndConditionsChecked}
                        style={{ fontSize: "20px", background: "white" }}
                        onClick={saveProfile}
                    >
                        Save
                    </button>
                </div>
            </div>

            {showPublish ? (
                <Publish
                    showPublish={showPublish}
                    handleClose={() => {
                        setShowPublish(!showPublish);
                    }}
                    allProfiles={profileInfo}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    inputError={inputError}
                />
            ) : null}


            <Modal show={showTermsAndConditions} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Terms and Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body className="terms-body">
                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        1. Terms
                    </p>
                    <p>
                        By accessing this web site, you are agreeing to be bound by these
                        web site Terms and Conditions of Use, all applicable laws and
                        regulations, and agree that you are responsible for compliance with
                        any applicable local laws. If you do not agree with any of these
                        terms, you are prohibited from using or accessing this site. The
                        materials contained in this web site are protected by applicable
                        copyright and trade mark law.
                    </p>
                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        2. Use License
                    </p>
                    <p>
                        Permission is granted to temporarily download one copy of the
                        materials (information or software) on C2Hire’s web site for
                        personal, non-commercial transitory viewing only. This is the grant
                        of a license, not a transfer of title, and under this license you
                        may not:
                        <p style={{ marginLeft: "5px", marginTop: "10px" }}>
                            1. Modify or copy the materials.
                        </p>
                        <p style={{ marginLeft: "5px" }}>
                            2. Use the materials for any commercial purpose, or for any public
                            display (commercial or non-commercial).
                        </p>
                        <p style={{ marginLeft: "5px" }}>
                            3. Attempt to decompile or reverse engineer any software contained
                            on C2Hire.
                        </p>
                        <p style={{ marginLeft: "5px" }}>
                            4. Remove any copyright or other proprietary notations from the
                            materials or
                        </p>
                        <p style={{ marginLeft: "5px" }}>
                            5. Transfer the materials to another person or “mirror” the
                            materials on any other server.
                        </p>
                        This license shall automatically terminate if you violate any of
                        these restrictions and may be terminated by C2Hire at any time. Upon
                        terminating your viewing of these materials or upon the termination
                        of this license, you must destroy any downloaded materials in your
                        possession whether in electronic or printed format.
                    </p>
                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        3. Disclaimer
                    </p>
                    <p>
                        The materials on C2Hire’s web site are provided “as is”. C2Hire
                        makes no warranties, expressed or implied, and hereby disclaims and
                        negates all other warranties, including without limitation, implied
                        warranties or conditions of merchantability, fitness for a
                        particular purpose, or non-infringement of intellectual property or
                        other violation of rights. Further, C2Hire does not warrant or make
                        any representations concerning the accuracy, likely results, or
                        reliability of the use of the materials on its Internet web site or
                        otherwise relating to such materials or on any sites linked to this
                        site.{" "}
                    </p>
                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        4. Limitations
                    </p>
                    <p>
                        In no event shall C2Hire or its suppliers be liable for any damages
                        (including, without limitation, damages for loss of data or profit,
                        or due to business interruption,) arising out of the use or
                        inability to use the materials on C2Hire’s Internet site, even if
                        C2Hire or a C2Hire's authorized representative has been notified
                        orally or in writing of the possibility of such damage. Because some
                        jurisdictions do not allow limitations on implied warranties, or
                        limitations of liability for consequential or incidental damages,
                        these limitations may not apply to you.{" "}
                    </p>
                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        5. Revisions and Errata
                    </p>
                    <p>
                        The materials appearing on C2Hire’s web site could include
                        technical, typographical, or photographic errors. C2Hire does not
                        warrant that any of the materials on its web site are accurate,
                        complete, or current. C2Hire may make changes to the materials
                        contained on its web site at any time without notice. C2Hire does
                        not, however, make any commitment to update the materials.{" "}
                    </p>
                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        6. Links
                    </p>
                    <p>
                        C2Hire has not reviewed all of the sites linked to its Internet web
                        site and is not responsible for the contents of any such linked
                        site. The inclusion of any link does not imply endorsement by C2Hire
                        of the site. Use of any such linked web site is at the user’s own
                        risk.{" "}
                    </p>
                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        7. Site Terms of Use Modifications
                    </p>
                    <p>
                        C2Hire may revise these terms of use for its web site at any time
                        without notice. By using this web site you are agreeing to be bound
                        by the then current version of these Terms and Conditions of Use.{" "}
                    </p>
                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        8. Site Visit data
                    </p>
                    <p>
                        C2HIRE.Website does not automatically capture any specific
                        personal information from you, (like name, phone number or
                        e-mail address), that allows us to identify you individually.
                    </p>


                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        9. Collection of Personal Information
                    </p>
                    <p>
                        CIf you are asked for any other Personal Information including
                        Aadhar, it will only be used for the purpose of marketplace on
                        this website. If at any time you believe the principles
                        referred to in this privacy statement have not been followed,
                        or have any other comments on these principles, please notify
                        us by sending email to contact@c2hire.com.
                    </p>
                    <p>
                        <strong>Note:</strong> The use of the term "Personal
                        Information" in this privacy statement refers to any
                        information from which your identity is apparent or can be
                        reasonably ascertained.{" "}
                    </p>


                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        10. Use Of Personal Data
                    </p>
                    <p>
                        We will use your Personal Data, to:
                        <br />
                        1.Understand and strive to meet your needs and preferences in
                        using our Services
                        <br />
                        2.Develop new and enhance existing service and product
                        offerings
                        <br />
                        3.Manage and develop our business and operations
                        <br />
                        4.Carry out any actions for which we have received your
                        consent
                        <br />
                        5.Prevent and investigate fraudulent or other criminal
                        activity
                        <br />
                        6.To address service requests and resolve user questions and
                        <br />
                        7.Meet legal and regulatory requirements.
                        <br /> We also reserve the right to use aggregated Personal
                        Data to understand how our users use our Services, provided
                        that those data cannot identify any individual.
                        <br /> We also use third-party web analytics tools that help
                        us understand how users engage with our website. These
                        third-parties may use first-party cookies to track user
                        interactions to collect information about how users use our
                        website. This information is used to compile reports and to
                        help us improve our website. The reports disclose website
                        trends without identifying individual visitors. You can
                        opt-out of such third-party analytic tools without affecting
                        how you visit our site. For more information on opting-out,
                        please contact contact@c2hire.com
                    </p>

                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        11. Reasonable Security Practices
                    </p>
                    <p>
                        Reasonable security measures such as administrative,
                        technical, operational and physical controls have been
                        implemented to ensure the security of personal information, if
                        collected.
                    </p>

                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        12. Disclaimer of warranties
                    </p>
                    <p>
                        You understand that we cannot and do not guarantee or warrant
                        that files available for downloading from the internet or the
                        Website will be free of viruses or other destructive code. You
                        are responsible for implementing sufficient procedures and
                        checkpoints to satisfy your particular requirements for
                        anti-virus protection and accuracy of data input and output,
                        and for maintaining a means external to our site for any
                        reconstruction of any lost data. TO THE FULLEST EXTENT
                        PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE
                        CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES, OR
                        OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR
                        COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER
                        PROPRIETARY MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY
                        SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR TO YOUR
                        DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY WEBSITE
                        LINKED TO IT.
                    </p>
                    <br />
                    <p>
                        YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR
                        ITEMS OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE
                        WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED
                        THROUGH THE WEBSITE ARE PROVIDED ON AN “AS IS” AND “AS
                        AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER
                        EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON
                        ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR
                        REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY,
                        RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE
                        WEBSITE. WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY
                        NOR ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS
                        THAT THE WEBSITE, ITS CONTENT, OR ANY SERVICES OR ITEMS
                        OBTAINED THROUGH THE WEBSITE WILL BE ACCURATE, RELIABLE,
                        ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED,
                        THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE
                        OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE WEBSITE OR
                        ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL
                        OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
                    </p>
                    <br />
                    <p>
                        {" "}
                        TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY
                        DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
                        IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO
                        ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND
                        FITNESS FOR PARTICULAR PURPOSE. THE FOREGOING DOES NOT AFFECT
                        ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER
                        APPLICABLE LAW.
                    </p>
                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        13. Limitation on liability
                    </p>
                    <p>
                        TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE
                        COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE
                        PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE
                        FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT
                        OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE
                        WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE
                        OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT,
                        SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                        INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND
                        SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF
                        PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE,
                        LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT
                        (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN
                        IF FORESEEABLE. THE FOREGOING DOES NOT AFFECT ANY LIABILITY
                        THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                    </p>

                    <p
                        className="sub-title"
                        style={{ fontWeight: "bold", margin: "0", padding: "0" }}
                    >
                        14. Governing Law
                    </p>
                    <p>
                        Any claim relating to C2Hire's web site shall be governed by the
                        laws of the State of India without regard to its conflict of law
                        provisions. General Terms and Conditions applicable to Use of a Web
                        Site.{" "}
                    </p>

                    <p>
                        Contact us:{" "}
                        <span style={{ color: "#0291ff" }}>contact@c2hire.com</span>
                        <p>This website is operated by PGK Technologies Private
                            Limited (for its product C2Hire.), Plot no 33, Jayabheri
                            Enclave Phase-2 Gachibowli, Hyderabad. 500032, INDIA.</p>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleClose}
                        style={{ color: "white", backgroundColor: 'rgb(2, 145, 255)' }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="sm"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your Profile has been updated successfully</Modal.Body>
            </Modal>
        </>
    )
}

export default CorporateProfile;