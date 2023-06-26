import { Send } from '@mui/icons-material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React from 'react';

const PostOIData = () => {
    return (
        <div className='col-7 post-io-data-main'>
            <div className='post-io-data'>
                <div className='whats-title'>
                    Whats happening with you?
                </div>
                <div style={{ display: 'flex', width: "100%" }}>
                    {/* <div className='d-flex align-items-center justify-content-center' style={{ margin: '0 10px 0', float: 'left', fontSize: '12px', padding: '0px 10px 0px', border: '1px solid grey', borderRadius: '10px' }} >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            Corporate <ArrowDropDownIcon />
                        </div>
                    </div> */}
                    <div className='message-input'>
                        <Send style={{ margin: '0 5px 0', float: 'right' }} />
                    </div>
                </div>
                <div style={{ marginTop: '12px' }}>
                </div>
            </div>

        </div>
    )
}

export default PostOIData