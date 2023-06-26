import { AccountCircle, Assessment, FactCheck, Groups, Newspaper, NoteAlt, Stars } from '@mui/icons-material';
import { Badge, Tooltip } from "@material-ui/core";
import React, { useState, useEffect } from 'react';

const ProfileCard = (props) => {

    const [profileCheck, setProfileCheck] = useState(null);
 
    const getProfilePublishData = () => {
        if (props?.allData?.profile?.publishedFlag) {
            setProfileCheck('p')
        }
        else {
            setProfileCheck('n')
        }
    }

  

    return (
        <div className='col-5 profile-card-main'>
            <div className='propfile-card'>
                <div className='profile-card-name'><span style={{ fontWeight: 'normal' }}>Welcome, </span>{props?.allData?.primaryContactFirstName} !</div>
                <div className='profile-card-designation'>{props?.allData?.profile?.primaryContactDesignation}</div>
                <div className='row profile-card-publish-info-main' onClick={props.goToProfile}>
                    <div className='col-1 publish-icon-main'>
                        <Tooltip title="Profile" arrow placement="right-start">
                        <Badge color="error" variant={profileCheck === 'n' ? 'dot' : ''}>
                            <AccountCircle style={{ fontSize: '20px', color: '#0f7ad2' }} />
                        </Badge>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileCard