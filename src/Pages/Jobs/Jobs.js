import { useEffect, useState } from "react";
import OnCampusJobs from "./onCampusJobs";
import OffCampusJobs from "./offCampusJobs";
import { useNavigate } from "react-router-dom";
import { width } from "@mui/system";


const Jobs = () => {
    const navigate = useNavigate()

    const [isMobileSize, setIsMobileSize] = useState(false);

    useEffect(() => {
        setIsMobileSize(window.innerWidth);

    }, []);

    console.log(window.innerWidth, 'ppopp')


    return (
        <div className="container-body " style={{ height: '900px', display: 'flex', overflowY: 'auto' }}>

            <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                <div style={{ width: '20%', marginTop: '350px' }} >
                    <button style={{ fontSize: '22px' }} className="profile-submit-button" onClick={() => {
                        navigate("/jobs/campus-drive");
                    }}>ON Campus Drive</button>
                </div>

                <div className="jobs-main-img">
                    <img src="/images/corporateIcons/JobsPage.svg" alt="Example" className="jobs-img" style={{  }} />
                </div>

                {/* {window.innerWidth <= 426  ? <div style={{ width: '210%', marginTop: '60px', marginLeft: '20px' }}>
                    <img src="/images/corporateIcons/JobsPage.svg" alt="Example" style={{ width: '210%', maxHeight: '850px' }} />
                </div> :
                    <div style={{ width: '95%', marginTop: '50px', marginLeft: '20px' }}>
                        <img src="/images/corporateIcons/JobsPage.svg" alt="Example" style={{ width: '95%', maxHeight: '850px' }} />
                    </div>}

                    {window.innerWidth <= 320 ? <div style={{ width: '305%', marginTop: '50px', marginLeft: '20px' }}>
                    <img src="/images/corporateIcons/JobsPage.svg" alt="Example" style={{ width: '305%', maxHeight: '850px' }} />
                </div> :
                    ''}

                    {window.innerWidth <= 375 ? <div style={{ width: '305%', marginTop: '50px', marginLeft: '20px' }}>
                    <img src="/images/corporateIcons/JobsPage.svg" alt="Example" style={{ width: '305%', maxHeight: '850px' }} />
                </div> :
                    ''} */}


                <div style={{ width: '20%', marginTop: '350px', marginRight: '100px' }}>
                    <button style={{ fontSize: '22px' }} className="profile-submit-button" onClick={() => {
                        navigate("/dashboard/off-campus-drive");
                    }}>OFF Campus Drive</button>
                </div>
            </div>
        </div>
    )
}

export default Jobs;