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
      // <div
      //   className="row align-items-center jobs-list-item w-full"
      //   style={{marginTop:'100px'}}
      //   key={info?.id}
      // >
      //   <div className="col-md-2 row align-items-center p-0">
      //     <div className="job-icon job-blue-icon d-flex justify-content-center align-items-center">
      //       <i className="fas fa-cube"></i>
      //     </div>
      //     <p
      //       className="job-label text-ellipsis"
      //       style={{
      //         marginLeft: "14px",
      //         maxWidth: "200px",
      //         textTransform: "capitalize",
      //         fontWeight: 'bold'
      //       }}
      //     >{info?.publishID ? info?.publishID : "-"}</p>
      //   </div>
      //   <div className="col-md-3">
      //     <p className="job-published-date" style={{ textOverflow: 'ellipsis', fontWeight: 'bold' }}>{info?.title}</p>
      //   </div>
      //   <div className="col-md-1">
      //   </div>
      //   <div className="col-md-3">
      //     <p className="job-published-date" style={{ color: "#454545", textAlign: 'center', fontSize: '13px', fontWeight: 'bold' }}>
      //       {info?.creationDate &&
      //         `Published on`}
      //     </p>
      //     <p className="job-published-date" style={{ color: "#454545", textAlign: 'center', fontSize: '13px', fontWeight: 'bold' }}>
      //       {info?.creationDate &&
      //         `${moment(info.creationDate).format("DD-MMM-YYYY")}`}
      //     </p>
      //   </div>
      //   <div className={`col-md-2 row item p-0 d-flex justify-content-between align-items-center`}>
      //     <div className="vertical-divider" />
      //     <button
      //       type="button"
      //       className="btn d-flex justify-content-around align-items-center"
      //       style={{
      //         height: "30px",
      //         width: "100px",
      //         fontSize: ".700rem",
      //         marginRight: "10px",
      //         borderRadius: "4px",
      //         textTransform: "uppercase",
      //         fontWeight: "bolder",
      //       }}
      //       onClick={() => {
      //         setShowModal(!showModal);
      //         setOtherInformation(info);
      //         console.log(showModal, 'hii')
      //         console.log(info, 'hiiiiiiiiiiiiiiiii')

      //       }}
      //     >
      //       <p>Details</p>
      //       <i className="fas fa-chevron-right"></i>
      //     </button>
      //   </div>
      // </div>
      <div className="row align-items-center" >
        <div className="jobs-cdx" style={{ marginTop: '100px',flexDirection:'row' }} >
          <div className="row align-items-center">
            <div
              className="d-flex justify-content-between align-items-center w-full cd-job-list-item"
              style={{ maxWidth: "100%" }}
            >
              <div className="col-md-4">
                <div className="row align-items-center">
                  <div
                    className="col-3 job-icon job-blue-icon d-flex justify-content-center align-items-center"
                    style={{ borderRadius: "5px", width: "60px" }}
                  >
                    <Work />
                  </div>
                  <p
                    className="col-9 job-label text-ellipsis"
                    style={{ maxWidth: "220px", textTransform: "capitalize" }}
                  >
                    {info?.publishID ? info?.publishID : "-"}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  style={{
                    border: "1px solid #cacaca",
                    borderRadius: "4px",
                    padding: "8px 4px",
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

              <div className="col-md-4">
                <div className="row align-items-center">
                  <div
                    className="col-3 job-icon job-blue-icon d-flex justify-content-center align-items-center"
                    style={{ borderRadius: "5px", width: "60px" }}
                  >
                    <Work />
                  </div>
                  <p
                    className="col-9 job-label text-ellipsis"
                    style={{ maxWidth: "220px", textTransform: "capitalize" }}
                  >
                    {info?.creationDate &&
                      `Published on`}
                  </p>
                </div>
              </div>


              <div className={"col-md-4 d-flex align-items-center"}>
                <button
                  type="button"
                  className="btn d-flex justify-content-around align-items-center"
                  style={{

                    width: "100px",
                    fontSize: ".700rem",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    fontWeight: "bolder",
                    marginLeft: "40%",
                  }}
                  // disabled={item.status !== "open" ? true : false}
                  onClick={() => {
                    setShowModal(!showModal);
                    setOtherInformation(info);
                  }
                  }
                >
                  <p>Details</p>
                  <i className="fas fa-chevron-right"></i>
                </button>
                {/* {!item.publishFlag ? (
              <IconButton
                style={{ color: "white" }}
                onClick={() => {
                  deleteJob(item.jobID);
                }}
                component="span"
              >
                <Close color={"primary"} />
              </IconButton>
            ) : (
              <></>
            )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    props.setPath(props.certificateDetails.attachment)
  }

  return otherInformationList?.length ? (
    <>
      {getOtherInformationList()}
      {/* <CustomModal
      show={showModal}
    >
      <div className="hiring-modal">
        <div className="modal-header hiring-modal-header">
          <h5 className="modal-title" style={{ fontSize: '1rem' }} id="exampleModalLabel">
            Published Information Details
          </h5>
          <IconButton style={{ color: 'white' }} size={'small'} onClick={() => {
            setShowModal(false);
          }} component="span">
            <Close style={{ fontSize: '1.2rem' }} />
          </IconButton>
        </div>
        <form className="hiring-modal-form">
          <div className="row">
            <div className="col-md">
              <div className="mb-20">
                <PgkTextField
                  onChange={() => { }}
                  value={otherInformation?.publishID}
                  label={'Publish ID'}
                  inputLabelProps={{ style: { fontSize: '.800rem' } }}
                  inputProps={{ style: { fontSize: '.800rem' } }}
                  disabled
                />
              </div>
            </div>
            <div className="col-md">
              <div className="mb-20">
                <PgkTextField
                  onChange={() => { }}
                  value={otherInformation?.creationDate ? `Published on {moment(otherInformation?.creationDate).format("DD-MM-YYYY")}` : ''}
                  label={'Published Date & Time'}
                  inputLabelProps={{ style: { fontSize: '.800rem' } }}
                  inputProps={{ style: { fontSize: '.800rem' } }}
                  disabled
                />
              </div>
            </div>
            <div className="w-100"></div>
            <div className="col-md">
              <div className="mb-20">
                <PgkTextField
                  onChange={() => { }}
                  value={otherInformation?.title ? otherInformation?.title : ''}
                  label={'Title'}
                  inputLabelProps={{ style: { fontSize: '.800rem' } }}
                  inputProps={{ style: { fontSize: '.800rem' } }}
                  disabled
                />
              </div>
            </div>
            <div className="w-100"></div>
            <div className="col-md">
              <div className="mb-20">
                <PgkTextField
                  value={otherInformation?.information ? otherInformation?.information : ''}
                  label={"Content"}
                  disabled
                  onChange={() => { }}
                  multiline={true}
                  minRows={6}
                  inputLabelProps={{ style: { fontSize: '.800rem' } }}
                  inputProps={{ style: { fontSize: '.800rem' } }}
                />
              </div>
            </div>
            <div className="w-100"></div>
            {(otherInformation?.attachment?.trim() !== '' && otherInformation?.attachmentName?.trim() !== '') ?
              <div className="d-flex justify-content-between align-items-center attachmentStripeContainer w-full">
                <p className="label">Attachment Present (if any)</p>
                <div onClick={() => { openFileInBrowser(otherInformation?.attachment, otherInformation?.attachmentName) }} style={{ textDecoration: 'none', outline: 'none', width: '70%', cursor: 'pointer' }}>
                  <div className="attachmentStripe d-flex justify-content-between align-items-center">
                    <p>{otherInformation?.attachmentName}</p>
                    <i className="fas fa-paperclip"></i>
                  </div>
                </div>
              </div> : null}
          </div>
        </form>
      </div>
    </CustomModal> */}
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
