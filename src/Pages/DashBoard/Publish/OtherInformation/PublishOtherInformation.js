import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionGetS3AttachRequest } from "../../../../Store/Actions/SagaActions/CommonSagaActions";
import { actionPostAddOtherInformationRequest } from "../../../../Store/Actions/SagaActions/OtherInformationSagaActions";
import { onGetFileInfo } from "../../../../utils/utils";


const PublishOtherInformation = () => {

    const initialData = {
        title: {
            value: undefined,
            error: undefined,
            isRequired: true,
            isDisabled: false
        },
        information: {
            value: undefined,
            error: undefined,
            isRequired: true,
            isDisabled: false
        },
        attachment: {
            value: {
                attachment: undefined,
                attachmentName: undefined,
                attachmentBase64: undefined
            },
            error: undefined,
            isRequired: false,
            isDisabled: false
        },
    }
    const [otherInfo, setOtherInfo] = useState(initialData);

    const [showModal, setShowModal] = useState(false);
    const [otherInformationList, setOtherInformationList] = useState([]);

    const dispatch = useDispatch();

    const onOtherInformationListResponse = (response) => {
        if (response?.length) {
            setOtherInformationList(response);
        }
    };

    const getPublishedOtherInformation = () => {
        // dispatch(
        //   actionGetPublishOtherInformationListRequest({
        //     callback: onOtherInformationListResponse,
        //   })
        // );
    }

    const getAttach = (data) => {
        dispatch(actionGetS3AttachRequest({ path: data, callback: onGetFileInfo }));
    };

    //   useEffect(() => {
    //     getPublishedOtherInformation();
    //   }, [])

    const updateField = (name, value, error = undefined) => {
        let data = otherInfo[name];
        data["value"] = value;
        data["error"] = error;

        setOtherInfo((prevState) => ({
            ...prevState,
            ...data,
        }));
    };

    const onChangeHandler = (event) => {

        const { name, value, error = undefined } = event.target;

        console.log(name, value, 'iiittttt')

        switch (name) {
            case 'title':
            case 'information':
                updateField(name, value, error);
                break;
            case 'attachment':
                if (value.target.files) {
                    const file = value.target.files[0];

                    let error = undefined;

                    if (parseFloat((value.target.files[0].size / 1024).toFixed(2)) > 5000) {
                        error = 'Please select file below 5 MB';
                    }

                    const reader = new FileReader();
                    reader.readAsBinaryString(file);

                    reader.onloadend = () => {
                        setOtherInfo((prevOtherInfo) => ({
                            ...prevOtherInfo,
                            [name]: {
                                ...prevOtherInfo[name],
                                value: {
                                    attachment: value.target.files[0],
                                    attachmentName: value.target.files[0].name,
                                    attachmentBase64: btoa(reader.result)
                                },
                                error: error
                            },
                        }));
                    };

                    reader.onerror = () => {
                        toast.error("Something went wrong!");
                    };
                }
                break;

            default:
                break;
        }


    };

    const resetPublishOtherInformation = () => {
        setOtherInfo(initialData);
        // var $el = $('#attachment');
        // $el.wrap('<form>').closest('form').get(0).reset();
        // $el.unwrap();
    }

    const isFormValid = () => {
        let isValid = true;

        if (isValid) {
            if ((otherInfo?.title?.isRequired && otherInfo?.title?.error) || (otherInfo?.information?.isRequired && otherInfo?.information?.error)) {
                isValid = false
            } else {
                isValid = true
            }
        }

        if (isValid) {
            if ((otherInfo?.title?.isRequired && otherInfo?.title?.value && otherInfo?.title?.value?.trim() !== '')) {
                isValid = true
            } else {
                isValid = false
                updateField('title', otherInfo?.title?.value, 'Required')
            }
        }

        if (isValid) {
            if ((otherInfo?.information?.isRequired && otherInfo?.information?.value && otherInfo?.information?.value?.trim() !== '')) {
                isValid = true
            } else {
                isValid = false
                updateField('information', otherInfo?.information?.value, 'Required')
            }
        }

        // if (isValid) {
        //     if (otherInfo?.attachment?.isRequired && otherInfo?.attachment?.errorMessage) {
        //         isValid = false
        //     }
        // }

        return isValid;
    }


    const onPublish = () => {
        resetPublishOtherInformation();
        getPublishedOtherInformation();
        setShowModal(true);
    }

    const onAddOtherInformation = (response) => {
        // if (response?.id) {
        //   dispatch(actionPostPublishOtherInformationRequest({
        //     apiPayloadRequest: [response.id],
        //     callback: onPublish
        //   }))
        // }
    }

    const addOtherInformation = () => {
        if (isFormValid()) {
            const updatedOtherInformation = {
                title: otherInfo?.title?.value,
                information: otherInfo?.information?.value,
                // attachment: otherInfo?.attachment?.value?.attachmentBase64,
                // attachmentName: otherInfo?.attachment?.value?.attachmentName,
            }
            console.log(updatedOtherInformation, 'nfejnfewjfk')
            dispatch(actionPostAddOtherInformationRequest({
                apiPayloadRequest: updatedOtherInformation,
                callback: onAddOtherInformation
            }));
        }
    }

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };




    console.log(otherInfo, 'hieiiiiiiiiiiiiiii')

    return (
        <>
            <div className="modal-main">
                <p className="modal-title"> Other Information </p>

                <div className="cmp-main">
                    {/* <p className="cmp-head">Basic</p> */}
                    <div className="row">
                        <div className="col-12">
                            <TextField
                                label="Title"
                                type="text"
                                name="title"
                                variant="filled"
                                onChange={onChangeHandler}
                                style={{ width: "100%", marginBottom: "15px" }}
                                error={otherInfo?.title?.error}
                                value={otherInfo?.title?.value}
                                required={true}
                            />
                        </div>

                        <div className="col-12">
                            <TextField
                                label="Information/Text"
                                type="text"
                                multiline
                                minRows={4}
                                name="information"
                                variant="filled"
                                style={{ width: "100%", marginBottom: "15px", }}
                                value={otherInfo?.information?.value}
                                onChange={onChangeHandler}
                                error={otherInfo?.information?.error}
                                required={true}
                            />
                        </div>

                        <div className="col-2">

                            <label htmlFor="accredationfile" className="file_label">
                                Attach File
                            </label>
                            {/* <p>{props?.fileSizeErr}</p> */}
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            onChangeHandler('attachment',e);
                                        }}
                                        className="attach-inp"
                                        accept=".pdf"
                                        name="attachment"
                                        id="attachment"
                                        alt=""
                                        required
                                    />
                                </div>
                                <div>
                                    <p className="attach-inp_label"
                                        style={{ color: 'blue', cursor: 'pointer' }}
                                    // onClick={() => {
                                    //     handleDownload(
                                    //         props?.tempAttachment?.attachment,
                                    //         props?.tempAttachment?.attachmentName
                                    //     );
                                    // }}
                                    >
                                        {otherInfo?.attachment?.value?.attachmentName}
                                    </p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div
                    className="btn"
                    style={{ float: "right" }}
                    onClick={() => addOtherInformation()}
                >
                    Save
                </div>




            </div>

        </>
    )
}

export default PublishOtherInformation;