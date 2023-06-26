import React from "react";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../../../utils/utils";

const SupportCmp = (props) => {
  
    const history = useNavigate();

    const goToTicket = (ticket) => {
        history("/support/" + ticket);
    }

    return (
        <>
            <div className='support-main'>
                <div className='create-new-support'>
                    <div className='create-new-support-card'
                        onClick={() => { goToTicket('new') }}>
                        Click here for new support request
                        <div>
                        </div>
                    </div>
                </div>
                <div className='support-list-main'>
                    <div className='sub-title' style={{ padding: '0', marginBottom: '20px' }}>
                        Support History
                    </div>
                    {
                        props.allTickets && props.allTickets.length ?
                            props.allTickets.map((item) => (
                                <div className='support-list-card' onClick={() => { goToTicket(item.ticketID) }}>
                                    <div className='row' style={{ width: '100%' }}>
                                        <div className='col-5' style={{ padding: '5px 25px 0px' }} >
                                             {item.ticketID}
                                        </div>
                                        <div className='col-5 ' style={{ padding: '5px' }} >
                                             {getFormattedDate(item.creationDate)}
                                        </div>
                                        <div className='col-2' style={{ padding: '5px' }} >
                                            <span style={{ color: item.status ? 'green' : 'red' }}>{item.status ? 'Active' : 'Closed'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <>

                            </>
                    }

                </div>
            </div>
        </>
    )
}
export default SupportCmp;