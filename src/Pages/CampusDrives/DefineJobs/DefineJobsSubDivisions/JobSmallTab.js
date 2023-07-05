import React from 'react'

const JobSmallTab = (props) => {
    return (
        <div className={props.active ? 'sub-job-tabs sec-select' : 'sub-job-tabs'} onClick={() => { props.onTab(props.index) }}>
            <div className='sub-job-tabs-names'>
                {props.lable}
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ width: "30%" }}>
                <props.icon />
            </div>
        </div>
    )
}

export default JobSmallTab