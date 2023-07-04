import React from "react";
import { ListGroup, Modal } from "react-bootstrap";

const Publish = (props) => {
    let isNotDisabled =
        props.allProfiles?.publishedFlag === false;

        console.log(props.allProfiles,'hihiihi')

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

                            </div>
                        ) : (
                            <></>
                        )}


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