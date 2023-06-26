import { Box, Container, Tab, Tabs } from "@material-ui/core";
import { CurrencyRupee } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionGetS3AttachRequest } from "../../Store/Actions/SagaActions/CommonSagaActions";
import { getTransactionHistoryRequest } from "../../Store/Actions/SagaActions/TransactionHistoryActions";
import { getFormattedDate } from "../../utils/utils";

const TransactionHistory = () => {

    const size = 5;
    const [subPage, setSubPage] = useState(1);
    const [subCount, setSubCount] = useState(0);
    const [purPage, setPurPage] = useState(1);
    const [purCount, setPurCount] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const dispatch = useDispatch();
    const [registrationHist, setRegistrationHist] = useState([]);


    const getResponse = (dataList) => {

        if (dataList?.transactionsHistory?.length) {
            setTransactions(dataList?.transactionsHistory);
        }

        if (dataList?.subscriptionHistory?.length) {
            setSubscriptions(dataList?.subscriptionHistory);
        }

        if (dataList?.subscriptionHistoryCount) {
            setSubCount(dataList.subscriptionHistoryCount);
        }

        if (dataList?.transactionsHistoryCount) {
            setPurCount(dataList.transactionsHistoryCount);
        }
        setRegistrationHist(dataList?.registration);
    };
    // new aded



    const downloadPDF = (path, next) => {
        dispatch(
            actionGetS3AttachRequest({
                path: path,
                callback: next,
            })
        );
    };

    const handleDownload = (path, fileName) => {
        if (path.includes(".pdf") || path.length <= 500) {
            downloadPDF(path, (base64) => {
                const file = `data:application/pdf;base64,${base64}`;
               
                const downloadLink = document.createElement("a");
              
                downloadLink.href = file;
              
                downloadLink.download = "invoice.pdf";
              
                downloadLink.click();
            });
        } else {
            //here by default path is base64
            const file = `data:application/pdf;base64,${path}`;
            const downloadLink = document.createElement("a");
            downloadLink.href = file;
            downloadLink.download = fileName;
            downloadLink.click();
        }
    };


    useEffect(() => {
        dispatch(
            getTransactionHistoryRequest({
                page: tabValue === 0 ? purPage : subPage,
                size: size,
                callback: (response) => {
                    getResponse(response);
                },
            })
        );
    }, [subPage, purPage]);

    useEffect(() => {
        setSubPage(1);
        setPurPage(1);
    }, [tabValue]);


    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };


    return (
        <div className="container-body">
            <h2 style={{ marginLeft: "15px", marginBottom: '0px', fontWeight: "bold" }}>
                Transaction History
            </h2>
            <div className="tabs">
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor={"primary"}
                    style={{
                        backgroundColor: "#24cbe81a",
                        width: "100%",
                        borderRadius: "5px",
                    }}
                >
                    <Tab label="Token Transactions" disableRipple />
                    <Tab
                        label="Subscription Transactions"
                        disableRipple

                    />
                </Tabs>
                <div className="tab-details">
                    {tabValue === 0 ? (
                        <>
                            <div className="row history-container">
                                <div className="broadcast-history-container">

                                    {purPage === 1 ? (

                                        <div className="trans-token-card">
                                            <div
                                                className="token-logo">
                                                {"T"}
                                            </div>
                                            <div
                                                className="row"
                                                style={{
                                                    textTransform: "uppercase",
                                                    width: "98%",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                <div
                                                    className="col-lg-3 col-md-6 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Amount Paid :
                                                    <span className="transaction-item">
                                                        <CurrencyRupee style={{ fontSize: "15px" }} />{" "}
                                                        {registrationHist[0]?.amountPaid}
                                                    </span>
                                                </div>
                                                <div
                                                    className="col-lg-3 col-md-6 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Token Allocated :
                                                    <span className="transaction-item">{0}</span>
                                                </div>
                                                <div
                                                    className="col-lg-3 col-md-6 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Date :
                                                    <span className="transaction-item">
                                                        {getFormattedDate(registrationHist[0]?.paymentDate)}
                                                    </span>
                                                </div>
                                                <div
                                                    className="col-lg-3 col-md-6 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Payment ID :
                                                    <span className="transaction-item">{registrationHist[0]?.paymentId}</span>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-sm"
                                                        style={{
                                                            background: "white",
                                                            margin: "20px 0px 0px 80px",
                                                        }}
                                                        onClick={() => handleDownload(registrationHist[0]?.attachFile)}
                                                    >
                                                        Download Invoice
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''}
                                </div>

                                <div className="broadcast-history-container">
                                    {transactions?.map((tran, index) => (
                                        <div className="trans-token-card" key={index}>
                                            <div
                                                className={
                                                    tran?.modeOfTokenissue === "PAID"
                                                        ? "token-logo"
                                                        : "bonus-token-logo"
                                                }
                                            >
                                                {tran?.modeOfTokenissue === "PAID" ? "T" : "BT"}
                                            </div>
                                            <div
                                                className="row"
                                                style={{
                                                    textTransform: "uppercase",
                                                    width: "98%",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                <div
                                                    className="col-lg-3 col-md-6 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Amount Paid :
                                                    <span className="transaction-item">
                                                        <CurrencyRupee style={{ fontSize: "15px" }} />{" "}
                                                        {tran?.amountPaid}
                                                    </span>
                                                </div>
                                                <div
                                                    className="col-lg-3 col-md-6 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Token Allocated :
                                                    <span className="transaction-item">
                                                        {tran?.allocatedTokens}
                                                    </span>
                                                </div>
                                                <div
                                                    className="col-lg-3 col-md-6 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Date :
                                                    <span className="transaction-item">
                                                        {getFormattedDate(tran?.allocatedDate)}
                                                    </span>
                                                </div>
                                                <div
                                                    className="col-lg-3 col-md-6 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Payment ID :
                                                    <span className="transaction-item">{tran?.paymentID}</span>
                                                    {tran?.attachment ? (
                                                        <button
                                                            type="submit"
                                                            className="btn btn-sm"
                                                            style={{
                                                                background: "white",
                                                                margin: "20px 0px 0px 80px",
                                                            }}
                                                            onClick={() => handleDownload(tran?.attachment)}
                                                        >
                                                            Download Invoice
                                                        </button>
                                                    ) : null}
                                                </div>
                                            </div>
                                            {tran?.attachment ? (
                                                <div
                                                    className="row"
                                                    style={{ width: "98%", fontSize: "12px" }}
                                                >
                                                    <div
                                                        className="col-12"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "flex-end",
                                                            paddingRight: "40px",
                                                        }}
                                                    ></div>
                                                </div>
                                            ) : null}
                                        </div>






                                    ))
                                    }


                                </div>

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
                                        // count={Math.round(purCount / size)}
                                        count={Math.ceil(purCount / size)}
                                        page={purPage}
                                        shape={"rounded"}
                                        color={"primary"}
                                        variant={"outlined"}
                                        onChange={(event, value) => setPurPage(value)}
                                    />
                                </Container>
                            </div>


                        </>

                    )
                        : <></>
                    }

                </div>

                <div className="tab-details">
                    {tabValue === 1 ? (
                        <>
                            <div className="row history-container">
                                <div className="broadcast-history-container">
                                    {subscriptions.map((item, index) => (
                                        <div className="trans-token-card" key={index}>
                                            <div
                                                className="row"
                                                style={{
                                                    textTransform: "uppercase",
                                                    width: "100%",
                                                    fontSize: "12px",
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <div
                                                    className="col-lg-4  col-sm-12"
                                                    style={{ display: 'flex', flexDirection: 'column' }}
                                                >
                                                    <div style={{ padding: '20px 0 20px' }}>
                                                        Subscribed To :
                                                        <span className="transaction-item">{item.publisherName} </span>
                                                    </div>
                                                    <div style={{ padding: '20px 0 20px' }}>
                                                        Item Type :
                                                        <span className="transaction-item">{item.publisherName} </span>
                                                    </div>

                                                </div>
                                                <div
                                                    className="col-lg-2 col-sm-12"
                                                    style={{ display: 'flex', flexDirection: 'column' }}
                                                >
                                                    <div style={{ padding: '20px 0 20px' }}>
                                                        Tokens Paid :
                                                        <span className="transaction-item">
                                                            {item.paidTokensTransacted}
                                                        </span>
                                                    </div>
                                                    <div style={{ padding: '20px 0 20px' }}>
                                                        Bonus Tokens Paid :
                                                        <span className="transaction-item">
                                                            {item.bonusTokensTransacted}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="col-lg-3 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Transaction ID :
                                                    <span className="transaction-item">
                                                        {item.transactionID}
                                                    </span>
                                                </div>
                                                <div
                                                    className="col-lg-3 col-sm-12"
                                                    style={{ margin: "20px 0 20px" }}
                                                >
                                                    Subscribed Date :
                                                    <span className="transaction-item">
                                                        {getFormattedDate(item.transactionDate)}
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                    )
                                    )}
                                </div>

                                <Container
                                    component={Box}
                                    py={3}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "25px",
                                    }}
                                >
                                    <Pagination
                                        count={Math.ceil(subCount / size)}
                                        page={subPage}
                                        shape={"rounded"}
                                        color={"primary"}
                                        variant={"outlined"}
                                        onChange={(event, value) => setSubPage(value)}
                                    />
                                </Container>
                            </div>
                        </>
                    ) : null}
                </div>





            </div>
        </div>

    )
}

export default TransactionHistory;