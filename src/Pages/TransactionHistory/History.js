import React from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const history = useNavigate();
    return (
        <div className='container-body'>
            <div className='row history-container'>
                <h1 style={{ marginLeft: '15px', fontWeight: 'bold' }}>History</h1>
                <div className='col-lg-3 col-md-4 col-sm-6' 
                // onClick={() => history('/history/broadcast')}
                >
                    <div className='history-item'>
                        Other Information
                    </div>
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6' onClick={() => history('/history/transactions')}>
                    <div className='history-item'>
                        Transactions
                    </div>
                </div>
                {/* <div className='col-lg-3 col-md-4 col-sm-6' onClick={() => history('/history/support')}>
                    <div className='history-item'>
                        Support History
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default History;