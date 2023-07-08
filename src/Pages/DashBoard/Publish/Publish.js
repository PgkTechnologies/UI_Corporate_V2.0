import React from "react";
import { ListGroup, Modal } from "react-bootstrap";

const Publish = (props) => {

    const filteredData = props?.publishedFlag?.filter((item) => item?.publishedFlag === false);

    let isNotDisabled =
        props.allProfiles?.publishedFlag === false || filteredData.map((data) =>data?.publishedFlag === false) 

const cleck = filteredData?.map((item) => (item?.id)  )

    console.log(cleck,filteredData, props?.infoID, 'mikkeeee')
    return (
        <Modal
            show={props?.showPublish}
            onHide={props?.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title className="d-flex justify-content-center align-items-center">
                    <h2>Select Sections to Publish</h2>{" "}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <form onSubmit={props?.handleSubmit}>
                        {isNotDisabled ? (
                            <div className="d-flex" style={{ flexDirection: "column" }}>
                                {props?.allProfiles?.publishedFlag === false ? (
                                    <ListGroup.Item>
                                        <div className="d-flex">
                                            <input
                                                type="checkbox"
                                                name="universityProfile"
                                                id="universityProfile"
                                                onChange={props?.handleChange}
                                            />
                                            <label className="sub-title" htmlFor="universityProfile">
                                                Your Profile
                                            </label>
                                        </div>
                                    </ListGroup.Item>
                                ) : (
                                    <></>
                                )}

                                { props?.infoID ? (
                                    <ListGroup.Item>
                                        <div className="d-flex">
                                            <input
                                                type="checkbox"
                                                name="otherInformation"
                                                id="otherInformation"
                                                onChange={props?.handleChange}
                                            />
                                            <label className="sub-title" htmlFor="otherInformation">
                                                Other Information
                                            </label>
                                        </div>
                                    </ListGroup.Item>)
                                    :<></>}

                               
                                   
                               


                            </div>
                        ) : (
                            <></>
                        )}
                        {/* {props?.infoID ?
                            (<div className="d-flex" style={{ flexDirection: "column" }}>
                             
                            </div>) 
                            : 
                            <></>} */}




                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <button type="submit" className="btn" disabled={!isNotDisabled}>
                                Publish
                            </button>
                        </div>
                    </form>
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

export default Publish;