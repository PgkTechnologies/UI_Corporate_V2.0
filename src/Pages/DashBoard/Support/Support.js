import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionGetAllTicketsSupport } from "../../../Store/Actions/SagaActions/SupportSagaAction";
import SupportCmp from "./SupportCmp";


const Support = () => {
    const dispatch = useDispatch();
    const [allTickets, setAllTickets] = useState([]);

    const getAllTickets = (data) => {
        setAllTickets(data);
    };

    console.log(allTickets, "TicketData");

    useEffect(() => {
        dispatch(
            actionGetAllTicketsSupport({
                callback: getAllTickets
            })
        );
    }, []);

    return (
        <div className='container-body'>
            <SupportCmp
                allTickets={allTickets}
            />
        </div>
    )
}
export default Support;