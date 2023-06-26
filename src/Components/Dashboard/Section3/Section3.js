import React from 'react';

const Section3 = (props) => {
    return (
        <div className='section3'>
            <div className='dash-analytics-main' onClick={props.goToAnalytics}>
                Go to Analytics
            </div>
        </div>
    )
}

export default Section3