import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
// import TokenPurchase from "./TokenPurchase";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Badge } from "@material-ui/core";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
// // import { getUserTokenData } from "../../../Store/Actions/ProfileActions";
// // import { actionGetSearchCorporates } from "../../../Store/Actions/SubscriptionActions";
// // import { SaveUniversityCriteriaData } from "../../../Store/Actions/UniversityActions";
import { useAuth } from "../../../utils/Auth";
import { useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar/SearchBar";
import TokenPurchase from "./TokenPurchase";
import { actionGetCorporateProfileSagaAction } from "../../../Store/Actions/SagaActions/CorporateProfileSagaActions";
import { getTokensSagaAction } from "../../../Store/Actions/SagaActions/DashboardSagaAction";
import { actionGetBulkTokenNumberRequest } from "../../../Store/Actions/SagaActions/CommonSagaActions";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  // const tokenPurchase = useRef(show)
  const profileDataGet = useSelector(
    (state) => state.DashboardReducer?.profileInfo
  );

  const balance = useSelector((state) => state.DashboardReducer.balance);
  console.log(balance , 'Selectorx');
  const auth = useAuth();

  const [searchList, setSearchList] = useState([]);
  const [searchInputs, setSearchInputs] = useState({});
  const [corporateName, setCorporateName] = useState("");
  const [tokensData, settokensData] = useState([]);

  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    auth.setTokenPurchase(null);
  };
  const handleShow = () => {
    setShow(true);
    localStorage.setItem("GST", profileDataGet?.gstn);
    localStorage.setItem("phone", profileDataGet?.primaryContactPhone);
  };
  const onMore = () => {
    setMore(!more);
  };

  useEffect(() => {
    //console.log(auth.tokenPurchase, "YAHOO");
    if (auth.tokenPurchase) {
      handleShow(true);
    }
  }, [auth.tokenPurchase]);

  useEffect (()=>{
    dispatch(actionGetCorporateProfileSagaAction({
      callback : getResponse
    }));
  },[])

  const getResponse= (data) => {
    localStorage.setItem('stakeholderID',data?.stakeholderID)
  }

  const onChange = (name, value, errorMessage = undefined) => {
    switch (name) {
      case "corporateName":
        setCorporateName(value);
        break;

      default:
        break;
    }
  };

  let tokesDataView = true;

  useEffect(()=>{
    dispatch(actionGetBulkTokenNumberRequest({callback: tokensCount}))
  },[])
 
  const tokensCount = (data) =>{
 console.log(data, 'dataTOKENnUm')
  }

  useEffect(() => {
    if (tokesDataView) {
      dispatch( getTokensSagaAction({ callback: tokenBalance }));
      //dispatch(actionGetSearchCorporates({ apiPayloadRequest: searchInputs, callback: getSeachDataResult }))
    }
    return () => {
      tokesDataView = false;
    };
  }, []);

  const tokenBalance = (data) => {
    console.log(data , 'CorpBalance')
    data ? settokensData(data) : settokensData([]);
  };

  const getSeachDataResult = (data) => {
    setSearchList(data);
  };

  const onHistory = () => {
    history('/history');
    onMore(); 
  }

  return (
    <>
      <div className="header">
        <div className="col-4 logo-title">
          <p style={{ padding: "0", margin: "0" }}>C2Hire.</p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "normal",
              padding: "0",
              margin: "0",
            }}
          >
            Corporate
          </p>
        </div>
        <div
          className="col-4"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <SearchBar
            placeholder="Search Corporates for Subscription..."
            data={searchList}
          />
        </div>
        <div
          className="col-3"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <button className="btn-t" onClick={handleShow}>
            Tokens: {balance?.paidTokenBalance + balance?.bonusTokenBalance}
            <AddCircleIcon
              style={{
                fontSize: "15px",
                marginLeft: "5px",
                color: "#022944c8",
                cursor: "pointer",
              }}
            />
          </button>
        </div>
        <div
          className="col-1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Badge
            onClick={() => {
              onMore();
            }}
            overlap="circular"
            badgeContent={<ExpandCircleDownIcon className="more" />}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <div className="account">
              <div className="">
                {profileDataGet?.profilePicture ? (
                  <img
                    src={
                      profileDataGet?.profilePicture
                        ? "data:image/jpg;base64," +
                        profileDataGet?.profilePicture
                        : null
                    }
                    className="profile-pic-img"
                    alt={profileDataGet?.corporateName}
                    name={profileDataGet?.corporateName}
                  />
                ) : null}
              </div>
            </div>
          </Badge>
          {more ? (
            <div className="more-data">
              <div className="more-card">
                <div className="more-content">
                  <AccountCircleIcon
                    style={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      marginRight: "10px",
                    }}
                  />{" "}
                  Profile
                </div>
              </div>
              <div className="more-card" onClick={() => onHistory()}>
                <div className="more-content">
                  <HistoryIcon
                    style={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      marginRight: "10px",
                    }}
                  />
                  History
                </div>
              </div>
              <div className="more-card">
                <div className="more-content">
                  <ManageAccountsIcon
                    style={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      marginRight: "10px",
                    }}
                  />
                  Change Password
                </div>
              </div>
              <div
                className="more-card"
                style={{ background: "#0367b9" }}
                onClick={props.logout}
              >
                
                <div className="more-content" style={{ color: "white" }}>
                  {/* <LogoutIcon
                    style={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      marginRight: "35px",
                    }}
                  /> */}
                  Log Out
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Modal */}

      < Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      //ref={show}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Tokens</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-8">
            Token Balance: &nbsp;
            {balance?.paidTokenBalance}
          </div>
          <div className="col-md-8">
            Bonus Tokens: &nbsp;
            {balance?.bonusTokenBalance}
          </div>

          <TokenPurchase handleClose={handleClose} />
        </Modal.Body>
      </Modal >
    </>
  );
};

export default Header;
