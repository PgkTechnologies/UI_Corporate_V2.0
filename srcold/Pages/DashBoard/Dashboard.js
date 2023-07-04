import { useDispatch, useSelector } from "react-redux";
import Section2 from "../../Components/Dashboard/Section2/Section2";
import { actionGetCorporateListRequest, actionGetProposalData, actionGetUniversityListRequest } from "../../Store/Actions/SagaActions/CommonSagaActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Section1 from "../../Components/Dashboard/Section1/Section1";
import Section3 from "../../Components/Dashboard/Section3/Section3";


const Dashboard = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const [allUniversities, setAllUniversities] = useState([]);
    const [allCorporates, setAllCorporates] = useState([]);
    const [allData, setAllData] = useState([]);

    const getUCData = () => {
        dispatch(actionGetCorporateListRequest({ page: 1, size: 10, callback: getCorporateList }));
        dispatch(actionGetUniversityListRequest({ page: 1, size: 10, callback: getUniversityList }));
    }

    const getDataAvailable = () => {
        dispatch(actionGetProposalData({ callback: getAllData }));
    };

    const proposalData = useSelector(
        (state) => state.DashboardReducer?.profileInfo
    );


    async function getAllData(data) {
        console.log(data, "ASYNC_DATA")
        await setAllData(data);
    }

    const getCorporateList = (data) => {
        setAllCorporates(data.CorporateNewlyRegistered)
    }

    const getUniversityList = (data) => {
        if (data) {
            setAllUniversities(data.UniversityNewlyRegistered)
        }
    }

    const getAllUniversity = () => {
        history('/dashboard/university-database');
    }

    const getAllCorporate = () => {
        history('/dashboard/corporate-database');
    }

    let getallDataLoad = true;
    useEffect(() => {

        getUCData();

        if (getallDataLoad) {
            if (proposalData?.length) {
                // setAllData(proposalData);
            } else {
                // getDataAvailable();
            }
        }
        return () => {
            getallDataLoad = false;
        };
    }, []);

    console.log(allCorporates, 'allCorps')

    const goToProfile = () => {
        history('/profile')
      }

    const goToAnalytics = () =>{
        history('/analytics')
    }

    return (
 
        <div className="container-body" >

            <Section1 allData={proposalData}  goToProfile={goToProfile} />

            <Section2
                allCorporates={allCorporates}
                allUniversities={allUniversities}
            />
           
           <Section3 
           goToAnalytics={goToAnalytics}
           />
         
        </div>
    )
}

export default Dashboard;