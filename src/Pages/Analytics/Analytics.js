import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PowerBIEmbed } from 'powerbi-client-react';
 
import { actionGetAnalyticsBiAccessTokenRequest, actionGetAnalyticsBiReportIdsRequest } from "../../Store/Actions/SagaActions/AnalyticsSagaActions";

const Analytics = () => {

    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useState();
    const [reportInfomation, setReportInformation] = useState({});

    const onResponseToken = (response) => {
        // accessToken and refreshToken
        setAccessToken(response?.accessToken);
        // setReportId(response?.reportID)
    };

    const onResponseReportId = (response) => {
        // accessToken and refreshToken
        // setAccessToken(response?.accessToken)
        setReportInformation(response);
    };

    function getReportID(reportName) {
        let reportID = "";
        if (reportInfomation && reportInfomation.length > 0) {
            reportInfomation?.map((report) => {
                if (report.reportName === reportName) {
                    reportID = report.reportID;
                }
            });
        }
        return reportID;
    }

    useEffect(() => {
        dispatch(
            actionGetAnalyticsBiAccessTokenRequest ({
                callback: onResponseToken,
            })
        );
        dispatch(
            actionGetAnalyticsBiReportIdsRequest
            ({
                callback: onResponseReportId,
            })
        );
    }, [dispatch]);

    return (
        <div className='container-body'>
            {reportInfomation && reportInfomation.length > 0 ? (
                <PowerBIEmbed
                    embedConfig={{
                        type: "report", // Supported types: report, dashboard, tile, visual and qna
                        id: getReportID("Corporate Analytics"),
                        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                            "Corporate Analytics"
                        )}`,
                        accessToken: accessToken, // Keep as empty string, null or undefined
                        settings: {
                            filterPaneEnabled: false,
                            bookmarksPaneEnabled: false,
                            navContentPaneEnabled: false,
                        },
                        filters: [],
                    }}
                    cssClassName={"analytics-reports-style"}
                />
            ) : (
                <></>
            )}
        </div>
    )
}

export default Analytics