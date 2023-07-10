import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionSagaGetCorporateSingleSubscriptionRequest } from "../../../Store/Actions/SagaActions/SubscriptionSagaAction";
import Modal from "react-bootstrap/Modal";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { AccountBalance } from "@mui/icons-material";

const UniversityItem = (props) => {
  console.log(props, "SRINi");
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [subscribedUnvData, setSubscribedUnvData] = useState();

  const getInsightsById = (id) => {
    dispatch(
      actionSagaGetCorporateSingleSubscriptionRequest({
        apiPayloadRequest: {
          type: "UNIVERSITY_INFO",
          id: id,
        },
        callback: (response) => {
          setSubscribedUnvData(response);
          setShowModal(true);
        },
      })
    );
  };

  return (
    <div className="cards-border" key={props.index}>
    <div className="col-lg-9 col-sm-12 card-content">
      <div className="icon" style={{ marginRight: "20px" }}>
        <AccountBalance />
      </div>
        <div>
          <span style={{ paddingRight: "55px" }}>
            {props?.item?.generalNote}
          </span>
          <span
            style={{
              color: "gray",
              paddingLeft: "155px",
              paddingRight: "35px",
            }}
          >
            |
          </span>
          <span style={{ fontWeight: "bold" }}>
            {props?.item?.publisherName}{" "} ({props?.item?.location}{" "})
          </span>
          <span
            style={{
              color: "gray",
              paddingRight: "20px",
              paddingLeft: "35px",
            }}
          >
            |
          </span>
          <span style={{ fontWeight: "bold", paddingRight: "7px" }}>
            UniversityID: {""}
          </span>{" "}
          <span> {props?.item?.publisher} </span>
          <div
            style={{ marginLeft: "1000px" }}
            //    style={{marginTop:'5px' , display:"70px"}}
          >
            {" "}
            <span
            style={{marginLeft:'270px'}}
              className="btn"
              onClick={() => {
                getInsightsById(props?.item?.subscriptionID);
              }}
            >
              view More
            </span>
          </div>
          <br />
          {/* <span style={{ paddingLeft: "450px", marginTop: "55px" }}>
            {" "}
            {props?.item?.location}{" "}
          </span> */}
        </div>
      </div>

      {showModal && (
        <Modal show={showModal}>
          <Modal.Header>
            <div>
              <CancelSharpIcon
                style={{ marginLeft: "450px" }}
                onClick={() => {
                  setShowModal(false);
                }}
                data-dismiss="modal"
              />
              <h4>Insights : {props?.item?.publisherName}</h4>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="row">
                <div className="col-4">
                  <div className="modal-grp">
                    <div>
                      Average CGPA recorded last year <br />
                      {subscribedUnvData?.averageCGPA}
                    </div>
                  </div>
                </div>
                <div className="col-4 p-0">
                  <div className="modal-grp">
                    <div className="inp-caption">
                      Highest CGPA recorded last year <br />
                      {subscribedUnvData?.highestCGPA}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="modal-grp">
                    <div className="inp-caption">
                      Highest Package received during last CH <br />{" "}
                      {subscribedUnvData?.highestPackage}{" "}
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="row">
                    <div className="col-6">
                      <div className="modal-grp">
                        <label className="textarea-caption">
                          Top Skills offered by this University
                        </label>
                        <div className="modal-inp inp-textarea" value="7.5">
                          <ul>
                            {subscribedUnvData?.top5Skills?.map((item, i) => (
                              <li>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 p-0">
                      <div className="modal-grp">
                        <label className="textarea-caption">
                          Top Recruiting Corporates Last year
                        </label>
                        <div className="modal-inp inp-textarea">
                          <ul>
                            {subscribedUnvData?.top5Recruiters?.map(
                              (item, i) => (
                                <li>{item}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="col-12 p-0">
                    <div className="modal-grp">
                      <div className="inp-caption">
                        Average Package received during last CH <br />{" "}
                        {subscribedUnvData?.averagePackage}
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="col-12 p-0">
                    <div className="modal-grp">
                      <div className="inp-caption">
                        University Conversion Rate Last year <br />
                        {subscribedUnvData?.universityConvertionRatio}{" "}
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="col-12 p-0">
                    <div className="modal-grp">
                      <div className="inp-caption">
                        Tentative Passing Month <br />
                        {subscribedUnvData?.tentativeMonthOfPassing}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
export default UniversityItem;
