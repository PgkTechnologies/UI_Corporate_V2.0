import React, { useEffect, useState } from "react";
import { AccountBalance, SearchOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
// import { actionGetSearchCorporates } from "../../../../Store/Actions/SubscriptionActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PreLoader from "../../../../utils/PreLoader";
import { SubscribeSearchSagaAction } from "../../../../Store/Actions/SagaActions/SubscriptionSagaAction";


const SearchBar = (props) => {
  const [filterdValues, setFilteredValues] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const dispatch = useDispatch();
  const searchStatus = useSelector((state) => state?.loginReducer?.searchStatus);
  const navigate = useNavigate();
  const size = 20;
  const page = 1;
  useEffect(() => {
    let getData;
    if (wordEntered.length > 0) {
      getData = setTimeout(() => {
        dispatch(
          SubscribeSearchSagaAction({
            apiPayloadRequest: wordEntered, page: page, size: size,
            callback: getSeachDataResult,
          })
        );
      }, 500);
    }

    return () => {
      clearTimeout(getData);
    };
  }, [wordEntered]);

  const getSeachDataResult = (data) => {
    console.log(data, "SEARCH");
    setFilteredValues(data?.universities);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = props.data.filter((value) => {
      return value.corporateName
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredValues([]);
    } else {
      setFilteredValues(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredValues([]);
    setWordEntered("");
  };

  const gotoSubscriprtion = (UnvId) => {
    navigate(`/dashboard/subscribe/newuniversity/${UnvId}`);
    clearInput();
  };

  return (
    <div className="search-bar">
      <SearchOutlined style={{ color: "gray", marginLeft: "4px" }} />
      <input
        type="text"
        value={wordEntered}
        placeholder={props.placeholder}
        style={{ width: "100%", background: "none" }}
        onChange={handleFilter}
      />
      {searchStatus ? (
        <div>
          {/* <PreLoaderSmall/> */}
          
        </div>
      ) : null}
      <div className="search-results">
        {filterdValues?.length > 0
          ? filterdValues.map((result, index) => {
            return (
              <div
                className="result"
                key={index}
                onClick={() => gotoSubscriprtion(result?.universityID)}
              >
                <div> {result.corporateName}</div>
                <div style={{ fontSize: '20px' }}>{result.universityName}</div>
                <div className="corp-search-logo">
                  {
                    result?.profilePicture !== null ?
                      <img
                        src={
                          "data:image/jpg;base64," +
                          result?.profilePicture
                        }
                        height={'100%'}
                        width={'100%'}
                        style={{ borderRadius: '4px' }}
                      />
                      :
                      <AccountBalance style={{ fontSize: '45px' }} />
                  }

                </div>
              </div>
            );
          })
          : null}
      </div>
      {wordEntered.length > 0 ? (
        <CloseIcon onClick={clearInput} style={{ cursor: "pointer" }} />
      ) : null}
    </div>
  );
};

export default SearchBar;
