import { useState } from "react";
import OnCampusJobs from "./onCampusJobs";
import OffCampusJobs from "./offCampusJobs";
import { useNavigate } from "react-router-dom";


const Jobs = () => {
    const navigate = useNavigate()

    const [goOnCampus, setGoOnCampus] = useState(false);
    const [goOffCampus, setGoOffCampus] = useState(false);

    const handleCampusDrive = (mode) => {
        console.log(mode, 'driveMode')
        if (mode === 'ONCAM') {
            setGoOnCampus(true);
            setGoOffCampus(false);

        } else if (mode === 'OFFCAM') {
            setGoOffCampus(true);
            setGoOnCampus(false);
        }

    }

    return (
        <>
            <div className={!goOnCampus && !goOffCampus ? 'jobs-main-full' : "jobs-main "} >

                <img src="/images/corporateIcons/JobsPage.svg" alt="Example" style={{ maxWidth: '90%', maxHeight: '110%', zIndex: '-1',opacity:'inherit',marginTop:'100px' }} />

                <div className="jobs-main-button" style={{ marginLeft: '50px', marginBottom: '200px' }} >
                    <button className="Drives-buttons"
                        onClick={() => {
                            navigate("/jobs/campus-drive")
                        }}
                    >ON Campus Drive</button>

                </div>

                <div style={{ position: 'absolute', bottom: '110px', right: '45px', width: '20%', marginRight: '10px', marginBottom: '200px' }}>
                    <button className="Drives-buttons"
                        onClick={() => { navigate("/dashboard/off-campus-drive") }}
                    >
                        OFF Campus Drive</button>

                </div>

            </div>

            {goOnCampus && (
                <OnCampusJobs />
            )}
            {goOffCampus && (
                <OffCampusJobs />
            )}
        </>
    )
}

export default Jobs;