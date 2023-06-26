import { Send } from '@mui/icons-material';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { actionCloseTicketRequest, actionGetAllTicketsSupport, actionGetTicketConvoSupport, actionPostSupport } from '../../../Store/Actions/SagaActions/SupportSagaAction';
import { getChatFormattedDate } from '../../../utils/utils';

const TicketChatCmp = () => {

    const history = useNavigate();
    const { ticketNo } = useParams();

    const [ticketInfo, setTicketInfo] = useState(ticketNo);
    const dispatch = useDispatch();
    const [fileSizeErr, setFileSizeErr] = useState('');
    const [ticketConvo, setTicketConvo] = useState([]);
    const [allTickets, setAllTickets] = useState([]);

    const bottomRef = useRef(null);


    const tpID = localStorage.getItem("stakeholderID");


    const getAllTickets = (data) => {
        setAllTickets(data);
    };

    useEffect(() => {
        dispatch(
            actionGetAllTicketsSupport({
                callback: getAllTickets
            })
        );
    }, []);

    const initialData = {
        stakeholderID: "",
        ticketID: ticketInfo,
        createdBy: '',
        lastUpdatedBy: '',
        status: false,
        closureDate: '',
        resolvedBy: '',
        query: "",
        attchFile: "",
        severity: ''
    }

    const [formData, setFormData] = useState({ ...initialData });




    function getFile(file) {
        var reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => { reader.abort(); reject(new Error("Error parsing file")); }
            reader.onload = function () {

                //This will result in an array that will be recognized by C#.NET WebApi as a byte[]
                let bytes = Array.from(new Uint8Array(this.result));

                //if you want the base64encoded file you would use the below line:
                let base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(""));

                //Resolve the promise with your custom file structure
                resolve({
                    base64StringFile: base64StringFile
                });
            }
            reader.readAsArrayBuffer(file);
        });
    }

    const handleChange = (event) => {
        let { name, value } = event.target;
        if (name === "attchFile") {
            if (event.target.files) {
                const maxAllowedSize = 1 * 1024 * 1024;
                if (event.target.files[0].size > maxAllowedSize) {
                    setFileSizeErr('Maximum file size limit is 1 MB');
                }
                else if (event.target.files[0].type !== "application/pdf") {
                    setFileSizeErr('Only Pdf file is accepted');
                }
                else {
                    setFileSizeErr('');
                    value = event.target.files[0].name
                    getFile(event.target.files[0]).then((customJsonFile) => {
                        value = customJsonFile.base64StringFile
                    });
                }
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (response) => {
        dispatch(
            actionGetTicketConvoSupport({
                ticket: response.data.id,
                callback: getTicketConvo
            })
        );
        setFormData((prevData) => ({
            ...prevData,
            ['ticketID']: response.data.id,
        }));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = [];
        if (formData.query.trim() === '') {
            errors.push('Please enter you query');
        }
        setFileSizeErr('');

        if (errors.length) {
            errors.forEach((error) => {
                toast.error(error);
            })
        } else {
            dispatch(
                actionPostSupport({
                    apiPayloadRequest: formData,
                    callback: onSubmit,
                })
            );
            setFormData((prevData) => ({
                ...prevData,
                ['query']: '',
                ['attchFile']: '',
            }));
        }
    };

    const backToTicketList = () => {
        history("/support");
    }

    const getTicketConvo = (data) => {

        setTicketConvo(data)
    }

    useEffect(() => {
        dispatch(
            actionGetTicketConvoSupport({
                ticket: ticketInfo,
                callback: getTicketConvo
            })
        );
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [ticketConvo]);

  const  closedTicket =   allTickets?.filter((item) => {
    return item.status !== true
  })

  const closedTkt = closedTicket !== undefined ? closedTicket?.filter((item) => item.ticketID === ticketNo) : ''
   

    const Reopen = () => {
        dispatch(
            actionCloseTicketRequest({
              ticket: ticketNo ,
              callback: getAllData
            })
          )
    }
    const getAllData =() =>{
        dispatch(
            actionGetAllTicketsSupport({
                callback: getAllTickets
            })
        ); 
    }

    return (
        <div className='container-body' style={{ overflow: 'clip' }}>
            <div className='ticket-chat-main'>
                <div className='support-title'>
                    <div className='support-title-back' onClick={() => { backToTicketList() }} >
                        BACK
                    </div>
                    <div className='support-title-name'>
                        Support Team
                    </div>
                </div>
                <div className='chat-display'>
                    {
                        ticketConvo && ticketConvo.length ?
                            ticketConvo.map((item) => (
                                <div className='chat-container'>
                                    <div className={item.owner !== tpID ? 'chat-admin' : 'chat-user'}>
                                        {item.query}
                                        <div className={item.owner !== tpID ? 'chat-admin-date' : 'chat-admin-user'}>
                                            {getChatFormattedDate(item.creationDate)}
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <>
                            </>
                    }
                </div>
                {
                closedTkt[0]?.status === false ?
                <div style={{ background: '#2f4452', color: "#FFFFFF", display: 'flex', justifyContent: 'center', border: '2px solid grey', borderRadius: '5px', cursor: 'pointer', paddingTop: '10px' }}
                    onClick={() => Reopen()}
                >
                    <h6 >Click Here to Reopen the ticket</h6>
                </div>

                :
              <>
                <form className='chat-sent-type' onSubmit={handleSubmit}>
                    <input
                        name='query'
                        value={formData.query}
                        onChange={handleChange}
                        type="text"
                        placeholder='Type a message'
                    />
                    <button type='submit' style={{
                        cursor: 'pointer',
                        background: 'none',
                        color: 'inherit',
                        border: 'none',
                        padding: '0',
                        font: 'inherit',
                        cursor: 'pointer',
                        outline: 'inherit'
                    }} >
                        <Send style={{ fontSize: '30px' }} />
                    </button>
                </form>
                </> }
            </div>
        </div>
    )
}

export default TicketChatCmp;