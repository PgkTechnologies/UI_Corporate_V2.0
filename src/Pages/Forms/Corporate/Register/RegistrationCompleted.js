import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationCompletedCmp from "./RegistrationCompletedCmp";

const RegistrationCompleted = () => {

    const [data, setData] = useState('');
    const history = useNavigate();
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('regStatus'));
        if (data) {
            setData(data.platformUID);
        }
        // history.replace('/')
    }, [])

  

    return (

        <section className="login">

            <div className="log-in-main-container" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                <video autoPlay muted loop className="back-vid">
                    <source src='./Videos/v1.mp4' type="video/mp4" />
                </video>
                <div className="logo-container">
                    <div className="logo-main">C2Hire.</div>
                </div>
                <RegistrationCompletedCmp
                    data={data}
                    history={history}
                />
            </div>
        </section>
    )
}

export default RegistrationCompleted;