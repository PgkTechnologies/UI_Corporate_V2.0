import React from 'react';
import PgkTextField from "../../../../Components/FormFields/PgkTextField";
import PgkSelectField from "../../../../Components/FormFields/PgkSelectField";

const AccountSettingsForm = (props) => {
    return (
        <div className="profile-box">
                        <aside className="profile-side">
                            <h3 className="profile-side-title">Account Settings</h3>
                        </aside>
                        <div className="profile-data">
                            <div className="row">
                                <div className="col-md-12">
                                    <h6 className="d-profile-name">Primary Contact</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-20">
                                        <PgkTextField
                                            name="primaryContactFirstName"
                                            value={
                                            props?.profileData?.primaryContactFirstName?.value
                                                ? props?.profileData?.primaryContactFirstName?.value
                                                : ""
                                            }
                                            errorMessage={props?.profileData?.primaryContactFirstName?.errorMessage}
                                            label={"First Name"}
                                            disabled={props?.disable!==undefined ? props?.disable : false}
                                            onChange={props?.onChange}
                                            required={props?.profileData?.primaryContactFirstName?.isRequired}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-20">
                                        <PgkTextField
                                            name="primaryContactMiddleName"
                                            value={
                                            props?.profileData?.primaryContactMiddleName?.value
                                                ? props?.profileData?.primaryContactMiddleName?.value
                                                : ""
                                            }
                                            errorMessage={props?.profileData?.primaryContactMiddleName?.errorMessage}
                                            label={"Middle Name"}
                                            disabled={props?.disable!==undefined ? props?.disable : false}
                                            onChange={props?.onChange}
                                            required={props?.profileData?.primaryContactMiddleName?.isRequired}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-20">
                                        <PgkTextField
                                            name="primaryContactLastName"
                                            value={
                                            props?.profileData?.primaryContactLastName?.value
                                                ? props?.profileData?.primaryContactLastName?.value
                                                : ""
                                            }
                                            errorMessage={props?.profileData?.primaryContactLastName?.errorMessage}
                                            label={"Last Name"}
                                            disabled={props?.disable!==undefined ? props?.disable : false}
                                            onChange={props?.onChange}
                                            required={props?.profileData?.primaryContactLastName?.isRequired}
                                        />
                                    </div>
                                </div>
                                <div className="w-100"></div>

                                <div className="col-md-4">
                                    <div className="mb-20">
                                        <PgkTextField
                                            name="primaryContactDesignation"
                                            value={
                                            props?.profileData?.primaryContactDesignation?.value
                                                ? props?.profileData?.primaryContactDesignation?.value
                                                : ""
                                            }
                                            errorMessage={props?.profileData?.primaryContactDesignation?.errorMessage}
                                            label={"Designation"}
                                            disabled={props?.disable!==undefined ? props?.disable : false}
                                            onChange={props?.onChange}
                                            required={props?.profileData?.primaryContactDesignation?.isRequired}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-20">
                                        <PgkTextField
                                            name="primaryContactPhone"
                                            value={
                                            props?.profileData?.primaryContactPhone?.value
                                                ? parseInt(props?.profileData?.primaryContactPhone?.value)
                                                : ""
                                            }
                                            errorMessage={props?.profileData?.primaryContactPhone?.errorMessage}
                                            label={"Mobile Number"}
                                            type={'number'}
                                            disabled
                                            onChange={props?.onChange}
                                            required={props?.profileData?.primaryContactPhone?.isRequired}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-20">
                                        <PgkTextField
                                            name="primaryContactEmail"
                                            value={
                                            props?.profileData?.primaryContactEmail?.value
                                                ? props?.profileData?.primaryContactEmail?.value
                                                : ""
                                            }
                                            errorMessage={props?.profileData?.primaryContactEmail?.errorMessage}
                                            label={"Email"}
                                            disabled
                                            onChange={props?.onChange}
                                            required={props?.profileData?.primaryContactEmail?.isRequired}
                                            validations={['isEmail']}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    );
}

export default AccountSettingsForm;