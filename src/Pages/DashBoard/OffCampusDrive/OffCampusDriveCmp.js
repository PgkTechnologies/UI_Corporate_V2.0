import { Box, Container } from "@material-ui/core";
import { AccountBalance, ArrowRight, CalendarMonth, LocationOn } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateOffCampusDriveCmp from "../../../Components/Common/OffCampus/CreateOffCampusDriveCmp";
import { actionGetAllOffCampusDrivesRequest, actionPostAddNewOffCampusRequest } from "../../../Store/Actions/SagaActions/OffCampusDrive/OffCampusDriveSagaAction";
import HttpsIcon from '@mui/icons-material/Https';

const OffCampusDriveCmp = () => {

    const initialModal = {
        requestType: "F",
        startDate: "",
        endDate: "",
        driveName: "",
        location: ""
    }

    const [openCreateOffCampusModal, setOpenCreateOffCampusModal] = useState("default");
    const [addOffCampusDriveInfo, setAddOffCampusDriveInfo] = useState(initialModal);

    const onCreateNew = () => {
        setOpenCreateOffCampusModal("createNew");
    }

    const togglePopup = () => {
        setOpenCreateOffCampusModal("default");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAddOffCampusDriveInfo(preState => ({
            ...preState,
            [name]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(addOffCampusDriveInfo);
        dispatch(actionPostAddNewOffCampusRequest({
            callback: onSuccess,
            newDriveInformation: addOffCampusDriveInfo
        }))
    }

    const onSuccess = (response) => {
        togglePopup()
    }



    const size = 5;
    const history = useNavigate();
    const [offDriveList, setOffDriveList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const getResponse = (dataList) => {
        // console.log(dataList.allOffCampusDriveForCorp)
        const sortData = dataList.allOffCampusDriveForCorp.map((item, i) => ({ ...item, id: i }));
        setOffDriveList(sortData);
        setTotalCount(dataList.totalCount);
    };

    useEffect(() => {
        dispatch(
            actionGetAllOffCampusDrivesRequest({
                page: page,
                size: size,
                callback: getResponse,
            })
        );
        console.log(page);
        console.log(totalCount);
    }, [page]);

    const navigateToOffCampusDrive = (offCampusDriveId, universityId, RoutePath,driveName) => {
        // history('/dashboard/off-campus-drive/' + offCampusDriveId + '/home')
        history("/dashboard/off-campus-drive/" + offCampusDriveId + RoutePath + universityId);
        localStorage.setItem('driveName',driveName)
    };

    console.log(offDriveList, 'yessss');

    return (
        <>
            <div style={{ width: '100%', marginTop: '100px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center' ,justifyContent:'center'}}>
                    <h1>Off Campus Drive</h1>
                </div>

                <div  style={{ display : 'flex',alignItems:'center', justifyContent:'center' }}><button type="button"
                className="btn"
                style={{ margin: "2%", alignSelf:'center', justifyContent:'center' }}
                onClick={() => { onCreateNew() }}>
                Create New
              </button></div>

                {offDriveList?.length >= 1 ?
                    offDriveList?.map((item, index) => {

                        return (
                            <div className="container-body" key={index}>
                                <div className="cards-container">

                                    <div className='jobs-cards-container'>


                                        <div className="row job-card-main">
                                            <div
                                                className="col-5 d-flex justify-content-flex-start align-items-center"
                                                style={{ fontWeight: "bold" }}
                                            >
                                                <AccountBalance style={{ fontSize: "30px", marginRight: "25px" }} />
                                                {item.driveName}
                                               
                                            </div>
                                            <div
                                                className="col-3 d-flex justify-content-flex-start align-items-center"
                                                style={{ fontSize: "15px", color: "gray" }}
                                            >
                                                <LocationOn style={{ marginRight: "10px", color: "gray" }} />
                                                {item.location}
                                            </div>
                                            <div
                                                className="col-3 d-flex justify-content-flex-start align-items-center"
                                                style={{ fontSize: "15px", color: "gray" }}
                                            >
                                                <CalendarMonth style={{ marginRight: "10px", color: "gray" }} />
                                                {item.startDate}
                                            </div>
                                            <div className="col-1 d-flex justify-content-end align-items-center">
                                            { item?.campusDriveClosed ? <HttpsIcon style={{color:'#FF1D18',cursor: "not-allowed"}}/> : 
                                                <ArrowRight
                                                    style={{ fontSize: "50px", color: "darkblue", cursor: "pointer" }}
                                                    onClick={() => {
                                                        navigateToOffCampusDrive(item.cdID, item.initiatorID, "/off-define-jobs/",item?.driveName);
                                                    }}
                                                />
                                            }
                                            </div>
                                        </div>


                                    </div>




                                </div>


                            </div>

                        );
                    })
                    :
                    <div style={{ color: 'gray', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%' }}>
                        <h5>No Active Drives</h5>
                    </div>
                }
                <Container
                    component={Box}
                    py={3}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "25px",
                        marginBottom: "25px",
                    }}
                >
                    <Pagination
                        count={Math.ceil(totalCount / size)}
                        page={page}
                        shape={"rounded"}
                        color={"primary"}
                        variant={"outlined"}
                        onChange={(event, value) => setPage(value)}
                    />
                </Container>

            </div>
            {
        openCreateOffCampusModal == "createNew" ?
          <CreateOffCampusDriveCmp
            togglePopup={togglePopup}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          :
          null
      }
        </>
    )
}

export default OffCampusDriveCmp;