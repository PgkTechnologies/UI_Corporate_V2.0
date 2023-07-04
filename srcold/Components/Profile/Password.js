import React from 'react';
import { TextField } from '@material-ui/core';

const PasswordForm = (props) => {
    // //console.log(props.profileData);
    return (
        <div className="cmp-main">
            <p className="cmp-head">Password</p>
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
                                variant="filled"
                                margin="dense"
                                style={{ width: "100%" }}
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
                                error={props?.passwordErr ? true : false}
                                variant="filled"
                                margin="dense"
                                style={{ width: "100%" }}
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
                                error={props?.passwordErr ? true : false}
                                variant="filled"
                                margin="dense"
                                style={{ width: "100%" }}
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