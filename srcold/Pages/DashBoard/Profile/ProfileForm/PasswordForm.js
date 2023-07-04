import React from 'react';
import { TextField } from '@material-ui/core';

const PasswordForm = (props) => {
    // console.log(props.profileData);
    return (
        <div className="profile-box">
            <aside className="profile-side">
                <h3 className="profile-side-title">Password</h3>
            </aside>
            <div className="profile-data">
                <div className="row">
                    <div className="col-md-4">
                        <div className="d-grp">
                            <TextField
                                label="Old Password"
                                type="password"
                                name="oldPassword"
                                onChange={props?.onChange}
                                value={props?.profileData?.oldPassword}
                                variant="outlined"
                                margin="dense"
                                style={{ width: "100%" }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { fontFamily: "Poppins-Regular", display: "block" }
                                }}
                                inputProps={{ style: { fontFamily: "Poppins-Regular", display: "block" } }}
                                required={props?.profileData?.password?.length > 0 || props?.profileData?.reenterPassword?.length > 0 ? true : false}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-grp">
                            <TextField
                                label="New Password"
                                type="password"
                                name="password"
                                onChange={props?.onChange}
                                value={props?.profileData?.password}
                                helperText={props?.passwordErr}
                                variant="outlined"
                                margin="dense"
                                style={{ width: "100%" }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { fontFamily: "Poppins-Regular", display: "block" }
                                }}
                                inputProps={{ style: { fontFamily: "Poppins-Regular", display: "block" } }}
                                required={props?.profileData?.oldPassword?.length > 0 ? true : false}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-grp">
                            <TextField
                                label="Re-Enter New Password"
                                type="password"
                                name="reenterPassword"
                                onChange={props?.onChange}
                                value={props?.profileData?.reenterPassword}
                                helperText={props?.passwordErr}
                                variant="outlined"
                                margin="dense"
                                style={{ width: "100%" }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { fontFamily: "Poppins-Regular", display: "block" }
                                }}
                                inputProps={{ style: { fontFamily: "Poppins-Regular", display: "block" } }}
                                required={props?.profileData?.password?.length > 0 ? true : false}
                            />
                        </div>
                    </div>
                    <div className="w-100"></div>
                </div>
            </div>
        </div>
    );
}

export default PasswordForm;