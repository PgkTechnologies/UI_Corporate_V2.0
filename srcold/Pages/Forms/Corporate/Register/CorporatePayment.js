import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ResetRdrAction } from "../../../../Store/Actions/CorporateActions/CorporateAction";
import { actionCreatePaymentAction, ValidatePaymentActions } from "../../../../Store/Actions/SagaActions/CommonSagaActions";
import { actionGetCorporateProfileSagaAction, actionGetPaymentEmailDetailsRequest, actionPatchCorporateProfileSagaAction, actionPostInvoiceSagaAction } from "../../../../Store/Actions/SagaActions/CorporateProfileSagaActions";
import CorporatePaymentCmp from "./CorporatePaymentCmp";
import InvoicePdf from "./InvoicePDF";

const $ = window.$;

const CorporatePayment = () => {


    const history = useNavigate();
    const initialState = {
        name: "",
        email: "",
        contact: "",
        gstn: "",
    };
    const [paymentData, setpaymentData] = useState(initialState);
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({
        emailErr: "",
        passwordErr: "",
        nameErr: "",
        mobileErr: "",
        amtErr: "",
        gstinErr: "",
    });
    const [gstCalc, setGstCalc] = useState({ total: 0, gst: 0, amount: 0 });
    const [paymentModal, setPaymentModal] = useState("");
    const [paymentSuccessModel, setPaymentSuccessModel] = useState("")
    const [valueRadio, setValueRadio] = useState(null);
    const [spId, setspId] = useState("");
    const paymentOrder = useSelector(
        (state) => state?.CorporateReducer?.paymentOrder
    );
    // const referenceObject = useSelector(
    //     (state) => state.CorporateReducer.referenceObject
    // );
    const [open, setOpen] = useState(false);
    const [checkgstn, setCheckgstn] = useState("");

    const dispatch = useDispatch();
    let tokensPurchase = localStorage.getItem("tokensPurchase");
    let pathname = localStorage.getItem("pathname");
    // setspId(localStorage.getItem("stakeholderID"));



   

    let profileView = true;
    useEffect(() => {
        if (profileView === true) {
            dispatch(
                actionGetCorporateProfileSagaAction({
                    callback: onResponse,
                })
            );
        }
        return () => {
            profileView = false;
        };
    }
        , []);



    const onResponse = (data) => {
        // setprofileInfo(data)
        //console.log(data, "GET");
        localStorage.setItem("stakeholderID",data?.stakeholderID)
        setCheckgstn(data.gstn);
        setpaymentData((preState) => ({
            ...preState,
            gstn: data.gstn,
        }));
    };


    useEffect(() => {
        const val = paymentOrder?.amount;
        const total = val + val * 0.18;
        setpaymentData({
            amount: val,
        });
        setGstCalc({
            amount: val,
            gst: (val * 0.18).toFixed(2),
            total: total.toFixed(2),
        });
    }, [paymentOrder]);





    let payment = true; // Render once

    useEffect(() => {
        let model;
        if (payment === true) {
            if (tokensPurchase) {      // need to uncomment ehtasham commented
                model = {
                    payType: "ADD_TKN",
                    tokensToAdd: tokensPurchase,
                    referenceObject: JSON.stringify(pathname),
                };
                setPaymentModal("TOKEN");
                dispatch(actionCreatePaymentAction(model));
            } else {
                model = {
                    payType: "REG_FEE",
                };
                setPaymentModal("");
                dispatch(actionCreatePaymentAction(model));
            }
        }

        // $("#role").modal("show");
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            localStorage.removeItem("pathname");
            dispatch(ResetRdrAction());
            payment = false;
        };
    }, [payment, dispatch]);




    const paymentSuccess = (invoice) => {
      
        if (invoice?.messages?.length) {
            setShow(true);
        }
        else {
            toast.error("Something went wrong. Please Try again.");
        }
    };
    const myOid = paymentOrder?.orderID;
    const openPayModal = (years = 1) => {
        const options = {
            key: process.env.REACT_APP_REGISTER,
            order_id: paymentOrder?.orderID,
            amount: gstCalc.total * 100, //  = INR 1
            name: "C2Hire",
            description: "PGK TECHNOLOGIES PRIVATE LIMITED",
            image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
            handler: function (response) {
                dispatch(
                    ValidatePaymentActions({
                        apiPalyoadRequest: myOid,       // redownload pdf 
                        callback: paymentSuccess,
                    })

                );
                // showPaymentSuccessModal();
                // alert(response.razorpay_payment_id);
                // showPaymentSuccessModal();
                // $('#paymentSuccess').modal({ backdrop: 'static', keyboard: false });
                // $('#paymentSuccess').modal('show');
                // setOpen(true);
            },
            prefill: {
                name: paymentData.name,
                contact: paymentData.contact,
                email: paymentData.email,
            },
            notes: {
                address: "",
            },
            theme: {
                color: "blue",
                hide_topbar: false,
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handlerChange = (event) => {
        const { name, value } = event.target;
        setpaymentData((preState) => ({
            ...preState,
            [name]: value,
        }));

        switch (name) {
            case "name":
                if (value) {
                    setErrors((preState) => ({
                        ...preState,
                        nameErr: "",
                    }));
                } else if (!value) {
                    setErrors((preState) => ({
                        ...preState,
                        lnameErr: "Last name error",
                    }));
                }
                return;
            case "email":
                const mailformat1 =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (value && mailformat1.test(value)) {
                    setErrors((preState) => ({
                        ...preState,
                        email2Err: "",
                    }));
                } else if (!value || !mailformat1.test(value)) {
                    setErrors((preState) => ({
                        ...preState,
                        email2Err: "Email error",
                    }));
                }
                return;
            case "gstn":
                if (/^[a-z0-9A-Z]*$/i.test(value) && value.length === 15) {
                    setErrors((preState) => ({
                        ...preState,
                        gstinErr: "",
                    }));
                }
                else {
                    setErrors((preState) => ({
                        ...preState,
                        gstinErr: "gstn error",
                    }));
                }
                return;
            case "contact":
                const num = /^[+-]?[0-9\b]+$/;
                if (num.test(value)) {
                    // if (val.match(phoneno)) {
                    if (value.length === 10) {
                        setErrors((preState) => ({
                            ...preState,
                            mobileErr: "",
                        }));
                    } else {
                        setErrors((preState) => ({
                            ...preState,
                            mobileErr: "Invalid",
                        }));
                    }
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        mobileErr: "Invalid",
                    }));
                }
                return;
            case "amount":
                const val = parseInt(value);
                const total = val + val * 0.18;
                setGstCalc({
                    amount: val,
                    gst: (val * 0.18).toFixed(2),
                    total: total.toFixed(2),
                });
                if (value.length >= 0) {
                    setErrors((preState) => ({
                        ...preState,
                        amtErr: "",
                    }));
                } else {
                    setErrors((preState) => ({
                        ...preState,
                        amtErr: "Invalid",
                    }));
                }
                return;

            default:
                break;
        }
    };

    const onSucessSave = () => {
        const { name, email, contact, gstn } = paymentData;

        const { nameErr, mobileErr, emailErr, amtErr, gstinErr } = errors;
        if (paymentData?.amount > 0) {
            if (
                name &&
                email &&
                contact &&
                !nameErr &&
                !mobileErr &&
                !amtErr &&
                !gstinErr
            ) {
                openPayModal();
            } else {
                toast.error("Please enter required input fields");
            }
        }
        //  else {
        //     showPaymentSuccessModal();
        // }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
       
        if (
            checkgstn === "undefined" ||
            checkgstn === "" ||
            checkgstn === null ||
            checkgstn === undefined
        ) {

            localStorage.setItem("GST", paymentData?.gstn);
            setCheckgstn(paymentData.gstn);


            dispatch(
                actionPatchCorporateProfileSagaAction({
                    apiPayloadRequest: { gstn: paymentData.gstn },
                    callback: onSucessSave,
                })
            );
            localStorage.removeItem("tokensPurchase");
        } else {
          
            onSucessSave();
            //
        }
    };


    const cancelPayment = () => 
    {
        setShow(false);
        // $("#paymentSuccess").modal("hide");
        let navigateUrl = localStorage.getItem("navigateUrl");
        localStorage.removeItem("tokensPurchase");
        //alert(navigateUrl);
        if (
            navigateUrl !== undefined &&
            navigateUrl !== null &&
            navigateUrl !== "undefined" &&
            navigateUrl.length > 0
        ) {
            history(navigateUrl);
            localStorage.removeItem("navigateUrl");
        } else {
            navigateUrl = localStorage.getItem("NavigateCancelUrl");
            if (
                navigateUrl !== undefined &&
                navigateUrl !== "undefined" &&
                navigateUrl.length > 0
            ) {
                history(navigateUrl);
                localStorage.removeItem("navigateCancelUrl");
            } else {
                history("/register/payment");    
            }
        }

    };



    const getInvoice = (type) => {
        //setsetContinue(false);
        getAllPaymentEmailDetailsAvailable(true);
        getPaymentEmailDetailsAvailableBefore(type);
    };

    const getAllPaymentEmailDetailsAvailable = (invoice) => {

        const model = [{
            stakeholderId: localStorage.getItem("stakeholderID"),
            stakeholderType: "Corporate"
        }]
        dispatch(
            actionGetPaymentEmailDetailsRequest({
                apiPayloadRequest: model,
                callback: (data) => getPaymentEmailDetailsAvailable(data, invoice),
            })
        );
    };


    const getPaymentEmailDetailsAvailableBefore = (data) => {
        setPaymentSuccessModel(data);

    }


    const getPaymentEmailDetailsAvailable = (data, invoice) => {
        const viewData = invoice;
        // getPaymentEmailDetailsAvailableBefore(invoice);
        const paymentEmailDetails = data;
        localStorage.removeItem("tokensPurchase");

       
        if (paymentEmailDetails) {
            const blobData = pdf(
                <InvoicePdf
                    data={paymentEmailDetails}
                    gstCalc={gstCalc}
                    tokensPurchase={tokensPurchase}
                    paymentModal={paymentModal}
                    // checkgstn={[paymentData.gstn]}
                    paymentData={paymentData}

                />
            ).toBlob();
            blobData.then(
                function (value) {
                    getFile(value).then((customJsonFile) => {
                        if (viewData === true) {
                            openFileInBrowser(customJsonFile.base64StringFile, "invoice.pdf");
                            saveAs(value, "invoice.pdf");
                            // let arrayBuffer = atob(customJsonFile.base64StringFile);
                            // let blob = new Blob([customJsonFile], {type: "application/pdf;charset=utf-8"});
                            // saveAs(blob, 'myfile.pdf');
                        }
                      
                        //localStorage.setItem("Invoice", customJsonFile.base64StringFile);
                        const model = [{
                            attachment: customJsonFile.base64StringFile,
                            attachmentName: "invoice.pdf",
                            email: paymentEmailDetails[0].PartyEmail,
                            paymentId: paymentEmailDetails[0].PaymentID,
                            stakeholderId: localStorage.getItem("stakeholderID"), // newComponents for Invoice
                            stakeholderType: "Corporate",
                            paymentMode: "Online",

                        }];

                        dispatch(
                            actionPostInvoiceSagaAction({
                                apiPayloadRequest: model,
                                callback: getInvoiceAvailable,
                            })
                        );
                    });

                    setShow(false);
                    let redirectUrl = localStorage.getItem("redirectUrl");
                    if (
                        redirectUrl != undefined &&
                        redirectUrl !== "undefined" &&
                        redirectUrl.length > 0
                    ) {
                        history(redirectUrl);
                        localStorage.removeItem("redirectUrl");
                        
                    } else {
                        history("/profile");
                       
                    }
                },
                function (e) { }
            );
        }
    };

    function getFile(file) {
        var reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new Error("Error parsing file"));
            };
            reader.onload = function () {
                //This will result in an array that will be recognized by C#.NET WebApi as a byte[]
                let bytes = Array.from(new Uint8Array(this.result));

                //if you want the base64encoded file you would use the below line:
                let base64StringFile = btoa(
                    bytes.map((item) => String.fromCharCode(item)).join("")
                );

                //Resolve the promise with your custom file structure
                resolve({
                    base64StringFile: base64StringFile,
                });
            };
            reader.readAsArrayBuffer(file);
        });
    }

    const openFileInBrowser = (data, fileName) => {
        var objbuilder = "";
        objbuilder +=
            '<object width="100%" height="100%" data = "data:application/pdf;base64,';
        objbuilder += data;
        objbuilder += '" type="application/pdf" class="internal">';
        objbuilder += '<embed src="data:application/pdf;base64,';
        objbuilder += data;
        objbuilder += '" type="application/pdf"  />';
        objbuilder += "</object>";
        var windo = window.open("#", "_blank");
        windo.document.write(
            "<html><title>" +
            fileName +
            '</title><body style="margin-top: 0px; margin - left: 0px; margin - right: 0px; margin - bottom: 0px; ">'
        );
        windo.document.write(objbuilder);
        windo.document.write("</body></html>");
    };
    const getInvoiceAvailable = (openFile) => {
        console.log("POSTED");
    };

    const payMode = localStorage.getItem('tokensPurchase'); //Updates by MSU
    // console.log(paymentOrder, 'pmode');

    const onSuccesspayment = (invoice) => {
        const model = [{
            stakeholderId: localStorage.getItem("stakeholderID"),
            stakeholderType: "Corporate"
        }]
        dispatch(
            actionGetPaymentEmailDetailsRequest({
                apiPayloadRequest: model,
                callback: (data) =>
                    getPaymentEmailDetailsAvailable(data, invoice), //before removed
            })
        );
    };

    
    return (

        <section className="container-fluid payment-main">
            <div className="row m-0">
                <div className="col p-0"> 
                {payMode ?        
                    <h4 className="login-title">
                        Tokens <span>Payment</span>
                    </h4> :
                    <h4 className="login-title">
                        Fee <span>Payment</span>
                    </h4> }
                    <div className="line" />


                    <div
                        className="container_New"
                        style={{ background: "#8bacc14b", borderRadius: "10px" }}
                    >
                        <div className="col-md-7">
                            <div className="tab-content">

                                <CorporatePaymentCmp
                                    checkgstn={checkgstn}
                                    paymentData={paymentData}
                                    setpaymentData={setpaymentData}
                                    errors={errors}
                                    handlerChange={handlerChange}
                                    handleSubmit={handleSubmit}
                                    cancelPayment={cancelPayment}
                                    history={history}
                                    setValueRadio={setValueRadio}
                                    valueRadio={valueRadio}
                                />

                            </div>
                        </div>

                        <div
                            className="col-md-5"
                            style={{ padding: "40px", alignSelf: "flex-start" }}
                        >
                            <div className="payment-summary">
                                <h5 className="payment-summary-header">Fee Summary</h5>
                                <ul className="payment-data">
                                    <li className="payment-data-li">
                                        {payMode ? <p className="payment-data-name">Token Purchase Fee</p> :
                                        <p className="payment-data-name">Registration Fee</p> }
                                        <span>{gstCalc.amount}</span>
                                    </li>
                                    <li className="payment-data-li">
                                        <p className="payment-data-name">
                                            GST (18%) <span>rounded</span>
                                        </p>
                                        <span>{gstCalc.gst}</span>
                                    </li>
                                    <li className="payment-data-li">
                                        <p className="payment-data-name">Total</p>
                                        <span>
                                            <i
                                                className="fas fa-rupee-sign"
                                                style={{ fontSize: "12px" }}
                                            ></i>
                                            {gstCalc.total}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Modal
                            show={show}
                            onHide={() => setShow(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Body>
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content modal-form">
                                        <div className="modal-body">
                                            <h4 className="modal-title mb-1 mt-0">Payment is successful</h4>
                                            <form className="login-form mx-auto">
                                                <div className="login-grp mb-2 mx-auto text-center text-success">
                                                    <i
                                                        className="fas fa-check-circle"
                                                        style={{ fontSize: "70px" }}
                                                    ></i>
                                                </div>
                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => onSuccesspayment(false)}
                                                        className="login-btn mb-0"
                                                    >
                                                        Proceed
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => onSuccesspayment(true)}
                                                        className="login-btn mr-2"
                                                    >
                                                        Download Invoice
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>

                    </div>

                </div>
            </div>
        </section>



    )
}

export default CorporatePayment;