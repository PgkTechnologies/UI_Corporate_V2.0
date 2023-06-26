import { AccountBalance } from '@mui/icons-material';
import React from 'react';

const NewlyRegisterUniv = (props) => {

    function getFormattedDate(date) {
        var month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
            '11', '12'];
        var d = new Date(date);

        return d.getDate() + '-' + month[d.getMonth()] + '-' + d.getFullYear();
    }

    return (
        <div className='col-6 '>
            <div className='list-table'>
                <p className="table-heading">
                    Registered Universities
                </p>
                <div className='row list-cards' style={{ width: '100%' }}>
                    {
                        props?.allUniversities?.map((item, index) => (
                            <div style={{ margin: '5px 0 5px' }}>

                                <div className='list-card-main' key={index}>
                                    {
                                        item.ProfilePicture !== null ?

                                            < img className=' col-lg-4 col-md-4 col-sm-6 list-card-pic'
                                                src={"data:image/jpeg;base64," + item?.ProfilePicture}
                                            />
                                            :
                                            <div className='col-lg-4 col-md-4 col-sm-6 d-flex justify-content-center align-items-center list-card-pic'>
                                                <AccountBalance style={{ fontSize: '30px' }} />
                                            </div>
                                    }
                                    <div className='col-lg-8 col-md-7 col-sm-4 list-card-name'>
                                        {item.Name}
                                    </div>
                                    <div className='col-lg-2 col-md-3 col-sm-2 list-card-date'>
                                        {getFormattedDate(item.CreationDate)}
                                    </div>
                                </div>

                            </div>
                        ))
                    }

                </div>
                {/* <div
                    className='d-flex align-items-center justify-content-center mt-4'
                    onClick={props.getAllUniversity}
                    style={{ border: '2px solid #0291ff', color: '#12395E', fontWeight: 'bold', cursor: 'pointer', background: 'white', width: '100%', padding: '8px', borderRadius: '10px' }}
                >
                    View All
                </div> */}
            </div>
        </div>
    )
}

export default NewlyRegisterUniv