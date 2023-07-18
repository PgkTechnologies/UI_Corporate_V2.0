import React, { useEffect, useState } from "react";
import CustomModal from "../../../../Components/CustomModal";
import moment from "moment";
import PgkTextField from '../../../../Components/FormFields/PgkTextField';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { Work } from "@material-ui/icons";
import { actionGetS3AttachRequest } from "../../../../Store/Actions/SagaActions/CommonSagaActions";
import { onGetFileInfo } from "../../../../utils/utils";
import { actionGetPublishOtherInformationListRequest } from "../../../../Store/Actions/SagaActions/OtherInformationSagaActions";
import { useDispatch } from "react-redux";
import OtherInfoModal from "./OtherInfoModal";
import { SouthWestOutlined } from "@mui/icons-material";


const OtherInformationHist = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [otherInformation, setOtherInformation] = useState();

  useEffect(() => {
    getPublishedOtherInformation();
  }, [])

  const getAttach = (data) => {
    dispatch(actionGetS3AttachRequest({ path: data, callback: onGetFileInfo }));
  };

  const [otherInformationList, setOtherInformationList] = useState([]);

  const dispatch = useDispatch();

  const onOtherInformationListResponse = (response) => {
    if (response?.length) {
      setOtherInformationList(response);
    }
  };
  console.log(otherInformationList, 'wweewwe')

  const getPublishedOtherInformation = () => {
    dispatch(
      actionGetPublishOtherInformationListRequest({
        callback: onOtherInformationListResponse,
      })
    );
  }

  const OtherInformationListItem = (info) => {
    return (
     
      <div style={{ flexDirection: 'column' }} >
        <div className="jobs-cdx" style={{ padding:'16px' }} >
          <div className="row align-items-center">
            <div
              className="d-flex justify-content-between align-items-center w-full cd-job-list-item"
              style={{ maxWidth: "100%" }}
            >
              <div className="col-md-4">
                <div className="row align-items-center">
                  <div
                    className="col-3 job-icon job-blue-icon d-flex justify-content-center align-items-center"
                    style={{ borderRadius: "7px", width: "60px",marginBottom:'5px' }}
                  >
                    <Work />
                  </div>
                  <p
                    className="col-9 job-label text-ellipsis"
                    style={{ maxWidth: "220px", textTransform: "capitalize", fontWeight: 'bold',marginTop:'10px' }}
                  >
                    {info?.publishID ? info?.publishID : "-"}
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  style={{
                    border: "1px solid #cacaca",
                    borderRadius: "4px",
                    padding: "20px 0px 0px 20px",
                    maxWidth: "100px",
                    marginLeft: "10%",
                  }}
                >
                  <p
                    style={{
                      marginLeft: "10px",
                      textTransform: "capitalize",
                      fontSize: ".800rem",
                    }}
                  >
                    {info?.title}
                  </p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="row align-items-center">
                  <p
                    className="col-9 job-label text-ellipsis"
                    style={{ maxWidth: "220px", textTransform: "capitalize", fontWeight: 'bold' }}
                  >
                    {info?.creationDate &&
                      `Published on`}
                  </p>
                  <p className="job-published-date" style={{ color: "#454545", textAlign: 'center', fontSize: '13px', fontWeight: 'bold', paddingRight: '220px' }}>
                    {info?.creationDate &&
                      `${moment(info.creationDate).format("DD-MMM-YYYY")}`}
                  </p>
                </div>
              </div>


              <div className={"col-md-2 d-flex align-items-center"}>
                <button
                  type="button"
                  className="btn d-flex justify-content-around align-items-center"
                  style={{

                    width: "100px",
                    height:'40px',
                    fontSize: ".700rem",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    fontWeight: "bolder",
                    marginLeft: "40%",
                    
                  }}
                  onClick={() => {
                    setShowModal(true);
                    setOtherInformation(info);
                  }
                  }
                >
                  <p style={{paddingTop:'12px'}}>Details</p>
                  
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

    );
  };
  console.log(showModal, 'yyyyy');

  const getOtherInformationList = () => {
    return otherInformationList.map((item) => {
      return OtherInformationListItem(item);

    });
  };

  const openFileInBrowser = (data, fileName) => {
    if (data.length < 250) {
      getAttach(data);
    }
    else {
      var objbuilder = '';
      objbuilder += ('<object width="100%" height="100%" data = "data:application/pdf;base64,');
      objbuilder += (data);
      objbuilder += ('" type="application/pdf" class="internal">');
      objbuilder += ('<embed src="data:application/pdf;base64,');
      objbuilder += (data);
      objbuilder += ('" type="application/pdf"  />');
      objbuilder += ('</object>');
      var windo = window.open("#", "_blank");
      windo.document.write('<html><title>' + fileName + '</title><body style="margin-top: 0px; margin - left: 0px; margin - right: 0px; margin - bottom: 0px; ">');
      windo.document.write(objbuilder);
      windo.document.write('</body></html>');
    }

  }

  return otherInformationList?.length ? (
    <>
      <div className="container-body" style={{ marginTop: '100px' }}>
        <h2 style={{ marginBottom: '15px' }}> Other Information History</h2>
        {getOtherInformationList()}

        {showModal &&
          <OtherInfoModal
            show={showModal}
            setShowModal={setShowModal}
            otherInformation={otherInformation}
            openFileInBrowser={openFileInBrowser}
          />
        }


      </div>
    </>
  ) : (
    <div className="row jobs-saved-section-list" style={{ marginTop: '200px' }}>
      <div className="d-flex flex-column justify-content-start align-items-center w-full">
        <p className="no-list-message w-full">
          No other information publish history to display here
        </p>
      </div>
    </div>
  );
};

export default OtherInformationHist;
