import { AccountBalanceRounded, BusinessCenterRounded, MoreVert } from "@mui/icons-material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actionGetStudentNotificationRequest, markNotifications } from "../../../Store/Actions/SagaActions/CommonSagaActions";
import PreLoader from "../../../utils/PreLoader";


const Notifications = () => {

    const history = useNavigate();
    const dispatch = useDispatch();
    const myRef = useRef();
    const size = 30;

    const [page, setPage] = useState(0);
    // const notifications = useSelector((state) => state.DashboardReducer.notifications);
    const [notifications, setNotifications] = useState([]);
    const [filterdNtf, setFilteredNtf] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [readNotifications, setReadNotifications] = useState([]);

    useEffect(() => {
        if (page !== 0) {
            dispatch(
                actionGetStudentNotificationRequest({
                    size: size,
                    page: page,
                    callback: getResponse,
                })
            );
        }

      
        // setSelectedOpt('ALL')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const getResponse = (dataList) => {
        
        if (dataList?.getAllNotifications?.length) {
            setNotifications((prev) => [...prev, ...dataList.getAllNotifications]);
            setFilteredNtf((prev) => [...prev, ...dataList.getAllNotifications]);
        }

        if (dataList?.totalCount) {
            setTotalCount(dataList.totalCount);
        }
    };

    async function handleNotificationClickPreview(item) {
        //   const URL = `/p/subData/nftData?role=${item.senderUserRole}&publishID=` + item.publishID;
        // const resData = await Axios.get(URL).then((res) => res.data);
        if (item) {
            setSelectedNotification({
                senderName: item.senderName,
                content: item.content,
                senderUserRole: item.senderUserRole,
                notificationType: item.notificationType,
                senderID: item.senderID,
            });
        } else {
            setSelectedNotification(item);
        }
    }



    const [selectedOpt, setSelectedOpt] = useState('ALL')


    const handelSelect = (e) => {
        const selectedValue = e.target.value
        setSelectedOpt(selectedValue)
        SenderTFilter(selectedValue);
    }
   

    useEffect(() => {
        if (selectedOpt === 'U') {
            const USender = notifications?.filter((sender) => sender.senderType === 'U')
           
            setFilteredNtf(USender);
        }
        else if (selectedOpt === 'C') {
            const CSender = notifications?.filter((sender) => sender.senderType === 'C')
           
            setFilteredNtf(CSender)
        }
        // else if (selectedOpt === 'ALL') {
        //   setFilteredNtf(notifications)
        // }
        else {
            setFilteredNtf(notifications)
        }
    }, [selectedOpt])

    const USender = notifications?.filter((sender) => sender.senderType === 'U')
   

    const SenderTFilter = (selectedOptv) => {

        if (selectedOptv === 'U') {
            const USender = notifications?.filter((sender) => sender.senderType === 'U')
            
            setFilteredNtf(USender);
        }
        else if (selectedOptv === 'C') {
            const CSender = notifications?.filter((sender) => sender.senderType === 'C')
            
            setFilteredNtf(CSender);
        }
        // else if (selectedOptv === 'ALL') {
        //   setFilteredNtf(notifications)
        // }
        else {
            setFilteredNtf(notifications)
        }
    }

    const [nftID, setNftID] = useState([]);

    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = () => {

        const myQ = notifications.map((item, index) => ({
            notificationId: item?.notificationID
        }));

        const filteredQ = myQ?.filter(item => !nftID?.find(n => n.notificationId === item.notificationId));

        setNftID([...nftID, ...filteredQ]);

        setSelectAll(!selectAll)

        if (selectAll === true) {
            
            setNftID([]);
        }
    };

    const handleIndividualCheck = (notificationId) => {
        // const myQ = [...nftID, { notificationId: notificationInfo?.notificationID }];

        // const filteredQ = myQ?.filter(item => !nftID?.find(n => n.notificationId === item.notificationId));
        // setNftID([...nftID, ...filteredQ]);

        // setNftID(myQ)

        const checked = nftID.some((item) => item.notificationId === notificationId);
        const updatedNftID = checked ? nftID.filter((item) => item.notificationId !== notificationId) : [...nftID, { notificationId }];
        setNftID(updatedNftID);
        setSelectAll(updatedNftID.length === notifications.length);
       

    };


    const markAsRead = () => {
        dispatch(
            markNotifications({
                selectedIDs: nftID,
                callback: markAsCallBack
            })
        )
    }

    const markAsCallBack = () => {
        dispatch(
            actionGetStudentNotificationRequest({
                size: size,
                page: page,
                callback: getResponse,
            })
        );
        setReadNotifications(preState => [...preState, ...nftID]);
        setNftID([]);        // clear nftID
        setSelectAll(false); // uncheck "Select All" checkbox
        toast.success('Marked As Read')
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setPage((prev) => prev + 0.5);
            }
        })
        observer.observe(myRef.current);
    }, []);

    function getFormattedDate(date) {
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
            'Dec'];
        var d = new Date(date);

        return d.getDate() + " " + month[d.getMonth()] + ", " + d.getFullYear();
    }





    return (

        <div className='container-body' >
            <div className='main' style={{ display: "flex", flexDirection: "column" }}>
                <div> <h1 style={{ color: 'white', margin: '20px 30px 20px' }}>Notifications</h1> </div>
                <div className='btnBlock' style={{ paddingLeft: '25px' }}>
                    <div className="custom-control custom-checkbox " style={{ paddingRight: '10px', textAlign: 'none' }}>

                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id='idss'
                            checked={selectAll}
                            onClick={() => handleSelectAll()}
                        />
                        <label
                            className='btn1' style={{ marginLeft: '20px' }}
                            htmlFor='idss'
                        >Select All</label>
                        <button className='btn1' style={{ marginLeft: '10px' }} onClick={markAsRead}>
                            Mark as Read
                        </button>

                        <label htmlFor="filterSelect"></label>
                        <select
                            style={{ float: 'right' }}
                            name="filterSelect"
                            id="filterSelect"
                            className='btn1'
                            required
                            aria-labelledby="Filter"
                            value={selectedOpt}
                            onChange={handelSelect}
                        >
                            <option value='ALL'>All</option>
                            <option value='U'>University</option>
                            <option value='C'>Corporate</option>
                        </select>

                    </div>
                </div>






                {   // need to add  notification .lenth 329 line
                    <div style={{ display: 'flex' }}  >

                        <div>
                            {filterdNtf?.map((item, index) => (
                                <div className='container justify-content-start'>
                                    {
                                        (item?.notificationRead === true && item?.receiverID) ||
                                            (item?.readNotifications?.filter((data) => data?.notificationId === item?.notificationId).length && item?.receiverID) ?
                                            <></>
                                            :
                                            <div className="custom-control custom-checkbox " style={{ paddingRight: '10px' }}>
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={item?.notificationID}
                                                    checked={nftID?.some((n) => n.notificationId === item?.notificationID)}
                                                    onClick={() => handleIndividualCheck(item?.notificationID, index)}
                                                />
                                                <label
                                                    className="custom-control-label mt-1"
                                                    htmlFor={item?.notificationID}
                                                ></label>
                                            </div>
                                    }

                                    <div className='circle col-2'>
                                        {
                                            item?.senderType === 'C'
                                                ?
                                                <BusinessCenterRounded className='icons' />
                                                :
                                                <AccountBalanceRounded className='icons' />
                                        }
                                    </div>

                                    <div className='content-main col-10'>
                                        <div className='content'
                                            style={{
                                                color:
                                                    (item?.notificationRead === true && item?.receiverID) ||
                                                        (readNotifications?.filter((data) => data?.notificationId === item?.notificationID).length && item?.receiverID)
                                                        ?
                                                        '#9E9E9E'
                                                        : ''
                                            }}>
                                            {
                                                item?.notificationType === "Platform Generated"
                                                    ?
                                                    JSON.parse(item?.content).Receiver ?
                                                        "New On-Campus Drive created by"
                                                        :
                                                        "New Off-Campus Drive created by"
                                                    :
                                                    item?.notificationType === "CampusHiring Request"
                                                        ?
                                                        "Campus Drive Request from"
                                                        :
                                                        item?.notificationType === "CampusHiring Response"
                                                            ?
                                                            "Response about your Campus Drive Request from"
                                                            :
                                                            item?.content + " " + "by"
                                            }
                                            {' '} <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                                                <span style={{ textTransform: 'capitalize' }}>{item?.senderName}</span>
                                            </span>
                                        </div>
                                        <div className='content-time'>
                                            {getFormattedDate(item?.dateofNotification)}
                                        </div>
                                    </div>
                                    <div className='more-mains'>
                                        <MoreVert className='mores' />
                                    </div>




                                </div>

                            ))

                            }
                        </div>



                    </div>


                }




                <div ref={myRef} style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <PreLoader />
                </div>

            </div>

        </div>




    )
}

export default Notifications;