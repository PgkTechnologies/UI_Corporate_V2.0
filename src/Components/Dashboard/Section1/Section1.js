
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { PowerBIEmbed } from "powerbi-client-react";
import { models, Report, Embed, service, Page } from "powerbi-client";
import moment from "moment";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useNavigate } from "react-router";
import { actionGetAnalyticsBiAccessTokenRequest, actionGetAnalyticsBiReportIdsRequest } from "../../../Store/Actions/SagaActions/AnalyticsSagaActions";
import ProfileCard from "./Components/ProfileCard";

const Section1 = (props) => {
    const profileInfo = useSelector(
        (state) => state.DashboardReducer.profileInfo
    );
    const [reportInfomation, setReportInformation] = useState({});
    const [accessToken, setAccessToken] = useState();
    const dispatch = useDispatch();
    // const [allNotifications, setAllNotifications] = useState([]);
    const [thirdPowerBi, setThirdPowerBi] = useState("");
    const [fourthPowerBi, setFourthPowerBi] = useState("");
    const [fifthPowerBi, setFifthPowerBi] = useState("");
    const [sixthPowerBi, setSixthPowerBi] = useState("");
    const [seventhPowerBi, setSeventhPowerBi] = useState("");
    const [eigithPowerBi, setEigithPowerBi] = useState("");
    const [ninthPowerBi, setNinthPowerBi] = useState("");
    const [tenthPowerBi, setTenthPowerBi] = useState("");
    const [elevenPowerBi, setElevenPowerBi] = useState("");
    const [twelvePowerBi, setTwelvePowerBi] = useState("");
    const [thirteenPowerBi, setThirteenPowerBi] = useState("");
    const [fourteenPowerBi, setFourteenPowerBi] = useState("");
    const [fifteenPowerBi, setFifteenPowerBi] = useState("");
    const [sixteenPowerBi, setSixteenPowerBi] = useState("");
    const [seventeenPowerBi, setSeventeenPowerBi] = useState("");
    const [eighteenPowerBi, setEighteenPowerBi] = useState("");
    const [nineteenPowerBi, setNinteenPowerBi] = useState("");
    const [TwentyPowerBi, setTwentyPowerBi] = useState("");
    const [TwentyonePowerBi, setTwentyonePowerBi] = useState("");

    const onResponseToken = (response) => {
        // accessToken and refreshToken
        setAccessToken(response?.accessToken);
        // setReportId(response?.reportID)
    };

    const onResponseReportInformation = (response) => {
        // accessToken and refreshToken
        setReportInformation(response);
        // setReportId(response?.reportID)
    };

    // const getNotificationsAvailable = () => {
    //   dispatch(GetNotificationsSagaAction({ callback: getAllNotifications }));
    // };

    // const getAllNotifications = (data) => {
    //   setAllNotifications(data);
    // };
    const loadPowerBi = (chart) => {
        if (chart === 3) {
            setThirdPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Passouts by Univ").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Passouts by Univ"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Passouts by Univ"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined, // Keep as empty string, null or undefined
                            }
                    }
                    cssClassName="feature-widget-report-Three"
                />
            );
        } else if (chart === 4) {
            setFourthPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Top 5 Universities of the year").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Top 5 Universities of the year"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Top 5 Universities of the year"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Four"
                />
            );
        } else if (chart === 5) {
            setFifthPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_UnivType").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_UnivType"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_UnivType"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Five"
                />
            );
        } else if (chart === 6) {
            setSixthPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Colleges_by_ProgramType").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Colleges_by_ProgramType"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Colleges_by_ProgramType"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Six"
                />
            );
        } else if (chart === 7) {
            setSeventhPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Accreditations").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Accreditations"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Accreditations"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Seven"
                />
            );
        } else if (chart === 8) {
            setEigithPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Tieups").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Tieups"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Tieups"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Eight"
                />
            );
        } else if (chart === 9) {
            setNinthPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_COEs Offered").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_COEs Offered"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_COEs Offered"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Nine"
                />
            );
        } else if (chart === 10) {
            setTenthPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Special Offers").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Special Offers"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Special Offers"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Ten"
                />
            );
        } else if (chart === 11) {
            setElevenPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Projects_Stud").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Projects_Stud"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Projects_Stud"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Eleven"
                />
            );
        } else if (chart === 12) {
            setTwelvePowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Internships_Stud").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Internships_Stud"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Internships_Stud"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Twelve"
                />
            );
        } else if (chart === 13) {
            setThirteenPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Skills_Stud").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Skills_Stud"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Skills_Stud"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Thirteen"
                />
            );
        } else if (chart === 14) {
            setFourteenPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Events_Stud").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Events_Stud"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Events_Stud"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Fourteen"
                />
            );
        } else if (chart === 15) {
            setFifteenPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_PreviousYear_Conversion_Ratio_By Industry Type")
                            .length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID(
                                    "Corp_PreviousYear_Conversion_Ratio_By Industry Type"
                                ),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_PreviousYear_Conversion_Ratio_By Industry Type"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                                filters: [
                                    {
                                        $schema: "http://powerbi.com/product/schema#basic",
                                        target: {
                                            $schema: "http://powerbi.com/product/schema#column",
                                            table: "C2Hire_Reporting Corp_Conversion",
                                            column: "CorporateIndustry",
                                        },
                                        // @ts-ignore
                                        operator: "Is",
                                        values: [profileInfo?.corporateIndustry],
                                    },
                                ],
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                }, // Keep as empty string, null or undefined
                            }
                    }
                    cssClassName="feature-widget-report-Fifteen"
                />
            );
        } else if (chart === 16) {
            setSixteenPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_PreviousYear_Top_5_Universities_Industry Type")
                            .length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID(
                                    "Corp_PreviousYear_Top_5_Universities_Industry Type"
                                ),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_PreviousYear_Top_5_Universities_Industry Type"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                                filters: [
                                    {
                                        $schema: "http://powerbi.com/product/schema#basic",
                                        target: {
                                            $schema: "http://powerbi.com/product/schema#column",
                                            table: "C2Hire_Reporting Top5Universities (4)",
                                            column: "CorporateIndustry",
                                        },
                                        // @ts-ignore
                                        operator: "Is",
                                        values: [profileInfo?.corporateIndustry],
                                    },
                                ],
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Sixteen"
                />
            );
        } else if (chart === 17) {
            setSeventeenPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_PreviousYear_Conversion_Ratio_By_Stakeholder")
                            .length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID(
                                    "Corp_PreviousYear_Conversion_Ratio_By_Stakeholder"
                                ),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_PreviousYear_Conversion_Ratio_By_Stakeholder"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                                filters: [
                                    {
                                        $schema: "http://powerbi.com/product/schema#basic",
                                        target: {
                                            $schema: "http://powerbi.com/product/schema#column",
                                            table: "C2Hire_Reporting Corp_Conversion",
                                            column: "Corporate_Stakeholder_ID",
                                        },
                                        // @ts-ignore
                                        operator: "Is",
                                        values: [profileInfo?.stakeholderID],
                                    },
                                ],
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                }, // Keep as empty string, null or undefined
                            }
                    }
                    cssClassName="feature-widget-report-Seventeen"
                />
            );
        } else if (chart === 18) {
            setEighteenPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_PreviousYear_Top_5_Universities_by_Stakeholder")
                            .length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID(
                                    "Corp_PreviousYear_Top_5_Universities_by_Stakeholder"
                                ),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_PreviousYear_Top_5_Universities_by_Stakeholder"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                                filters: [
                                    {
                                        $schema: "http://powerbi.com/product/schema#basic",
                                        target: {
                                            $schema: "http://powerbi.com/product/schema#column",
                                            table: "C2Hire_Reporting Top5Universities (4)",
                                            column: "Corporate_Stakeholder_ID",
                                        },
                                        // @ts-ignore
                                        operator: "Is",
                                        values: [profileInfo?.stakeholderID],
                                    },
                                ],
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                    }
                    cssClassName="feature-widget-report-Eighteen"
                />
            );
        } else if (chart === 19) {
            setNinteenPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Conversion Ratio in 2021").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Conversion Ratio in 2021"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Conversion Ratio in 2021"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                }, // Keep as empty string, null or undefined
                            }
                    }
                    cssClassName="feature-widget-report-Nineteen"
                />
            );

        } else if (chart === 20) {
            setTwentyPowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Student Blockchain Transactions").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Student Blockchain Transactions"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Student Blockchain Transactions"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                                filters: [
                                    {
                                        $schema: "http://powerbi.com/product/schema#basic",
                                        target: {
                                            $schema: "http://powerbi.com/product/schema#column",
                                            table: "C2Hire_Reporting Stud_blockchaintransaction",
                                            column: "Corporate_Stakeholder_ID",
                                        },
                                        // @ts-ignore
                                        operator: "Is",
                                        values: [profileInfo?.stakeholderID],
                                    },
                                ],
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                }, // Keep as empty string, null or undefined
                            }
                    }
                    cssClassName="feature-widget-report-Nineteen"
                />
            );

        } else if (chart === 21) {
            setTwentyonePowerBi(
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_UniversityWise_ VerifiedStudents").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_UniversityWise_ VerifiedStudents"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_UniversityWise_ VerifiedStudents"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                                filters: [
                                    {
                                        $schema: "http://powerbi.com/product/schema#basic",
                                        target: {
                                            $schema: "http://powerbi.com/product/schema#column",
                                            table: "C2Hire_Reporting Stud_blockchaintransaction",
                                            column: "Corporate_Stakeholder_ID",
                                        },
                                        // @ts-ignore
                                        operator: "Is",
                                        values: [profileInfo?.stakeholderID],
                                    },
                                ],
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                }, // Keep as empty string, null or undefined
                            }
                    }
                    cssClassName="feature-widget-report-Nineteen"
                />
            );
        }
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

    function getTime(date) {
        let date1 = new Date().getTime();
        let date2 = new Date(date).getTime();
        var difference = date1 - date2;

        var yearsDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 365);
        difference -= yearsDifference * 1000 * 60 * 60 * 24 * 365;

        var monthsDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 30);
        difference -= monthsDifference * 1000 * 60 * 60 * 24 * 30;

        var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= daysDifference * 1000 * 60 * 60 * 24;

        var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60;

        var minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60;

        var secondsDifference = Math.floor(difference / 1000);

        if (yearsDifference > 0) return yearsDifference + " years ago";
        else if (monthsDifference > 0) return monthsDifference + " months ago";
        else if (daysDifference > 0) return daysDifference + " days ago";
        else if (hoursDifference > 0) return hoursDifference + " hours ago";
        else if (minutesDifference > 0) return minutesDifference + " minutes ago";
        else return "Just now";
    }

    useEffect(() => {
        dispatch(
            actionGetAnalyticsBiAccessTokenRequest({
                callback: onResponseToken,
            })
        );
        dispatch(
            actionGetAnalyticsBiReportIdsRequest({
                callback: onResponseReportInformation,
            })
        );
        // getNotificationsAvailable();
        //dispatch(getCorporateProfileStats({
        //  callback: onReceiveStats
        //}));
    }, []);

    const history = useNavigate();

    let profileName = [];

    const profileNameKeys = [
        "primaryContactFirstName",
        "primaryContactMiddleName",
        "primaryContactLastName",
    ];
    const profileDataKeys =
        profileInfo !== null && profileInfo ? Object.keys(profileInfo) : [];

    profileNameKeys.forEach((item) => {
        if (
            profileDataKeys.includes(item) &&
            profileInfo[item] !== undefined &&
            profileInfo[item].trim() !== ""
        ) {
            profileName.push(profileInfo[item]);
        }
    });
    console.log(profileInfo, "---! corpppppppppppp")
    localStorage.setItem("stakeholderID", profileInfo?.stakeholderID)
    return (
        <>
            <div>
                <div >
                    <div 
                    className="d-flex align-items-center justify-content-center"
                    style={{marginTop:'15px'}} >
                        <ProfileCard allData={props.allData} goToProfile={props.goToProfile} />
                    </div>
                 
                </div>
                <div>
               
                </div>
            </div>

            <div className="row powerbi-module-report mb-5">
                <PowerBIEmbed
                    embedConfig={
                        getReportID("Corp_Module_Top").length > 0
                            ? {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: getReportID("Corp_Module_Top"),
                                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                    "Corp_Module_Top"
                                )}`,
                                accessToken: accessToken, // Keep as empty string, null or undefined
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                },
                                filters: [
                                    {
                                        $schema:
                                            "http://powerbi.com/product/schema#basic",
                                        target: {
                                            $schema:
                                                "http://powerbi.com/product/schema#column",
                                            table: "C2Hire_Reporting COMM_JobApplicantResults",
                                            column: "Corporate_Stakeholder_ID",
                                        },
                                        // @ts-ignore
                                        operator: "Is",
                                        values: [profileInfo?.stakeholderID],
                                    },
                                    {
                                        $schema:
                                            "http://powerbi.com/product/schema#basic",
                                        target: {
                                            $schema:
                                                "http://powerbi.com/product/schema#column",
                                            table: "C2Hire_Reporting Job_Openings",
                                            column: "Stakeholder_ID",
                                        },
                                        // @ts-ignore
                                        operator: "Is",
                                        values: [profileInfo?.stakeholderID],
                                    },
                                ],
                            }
                            : {
                                type: "report", // Supported types: report, dashboard, tile, visual and qna
                                id: undefined,
                                embedUrl: undefined,
                                accessToken: undefined,
                                settings: {
                                    filterPaneEnabled: false,
                                    bookmarksPaneEnabled: false,
                                    navContentPaneEnabled: false,
                                }, // Keep as empty string, null or undefined
                            }
                    }
                    cssClassName="report-container w-100"
                />
            </div>

            <div className="row">
                <div className="d-flex flex-column justify-content-start feature-widget" style={{ width: '100%' }}>
                    <div className="d-flex feature-widget-header">
                        <p className="label">Geo Spread</p>
                    </div>
                    <div className="feature-widget-map-body w-100">
                        <PowerBIEmbed
                            embedConfig={
                                getReportID("Corp_India_Map").length > 0
                                    ? {
                                        type: "report", // Supported types: report, dashboard, tile, visual and qna
                                        id: getReportID("Corp_India_Map"),
                                        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                            "Corp_India_Map"
                                        )}`,
                                        accessToken: accessToken, // Keep as empty string, null or undefined
                                        settings: {
                                            filterPaneEnabled: false,
                                            bookmarksPaneEnabled: false,
                                            navContentPaneEnabled: false,
                                        },
                                    }
                                    : {
                                        type: "report", // Supported types: report, dashboard, tile, visual and qna
                                        id: undefined,
                                        embedUrl: undefined,
                                        accessToken: undefined,
                                        settings: {
                                            filterPaneEnabled: false,
                                            bookmarksPaneEnabled: false,
                                            navContentPaneEnabled: false,
                                        },
                                    }
                            }
                            cssClassName="feature-widget-map-report-body"
                        />
                    </div>
                </div>
            </div>

            {/* Accordion */}

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(3)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Tentative Passouts &amp; Passing Month
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{thirdPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel17a-content"
                            id="panel17a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(19)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Conversion Ratio History
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{nineteenPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(4)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                History of Offers Made
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{fourthPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(5)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Type of Universities/ Colleges in India
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{fifthPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel4a-content"
                            id="panel4a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(6)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Universities/ Colleges and their Program Offerings
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{sixthPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel5a-content"
                            id="panel5a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(7)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Universities/ Colleges In India by Accreditation Type
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{seventhPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel6a-content"
                            id="panel6a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(8)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Universities/ Colleges in India with national and international
                                Tie-Ups
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{eigithPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel7a-content"
                            id="panel7a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(9)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Universities/ Colleges in India with Centers Of Excellence
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{ninthPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel8a-content"
                            id="panel8a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(10)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Universities/ Colleges in India with some Special Offerings
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{tenthPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel9a-content"
                            id="panel9a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(11)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Projects at various colleges
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{elevenPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel10a-content"
                            id="panel10a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(12)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Internship Programs at various colleges
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{twelvePowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel11a-content"
                            id="panel11a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(13)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Students Split by Skill Set
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{thirteenPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel12a-content"
                            id="panel12a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(14)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Events at various colleges
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{fourteenPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel13a-content"
                            id="panel13a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(15)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Conversion Ratio History For Your Industry
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{fifteenPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel14a-content"
                            id="panel14a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(16)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                History Of Offers Made By Industry Relevent To You
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{sixteenPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel15a-content"
                            id="panel15a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(17)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Conversion Ratio History For Your Corporate
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{seventeenPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(18)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                History Of Offers Made By You
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{eighteenPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel16a-content"
                            id="panel16a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(20)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                Blockchain Transactions
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{TwentyPowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Accordion className="mt-12">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="iconCo" />}
                            aria-controls="panel16a-content"
                            id="panel16a-header"
                            className="accordionHeader"
                            onClick={() => loadPowerBi(21)}
                            style={{
                                background: "#253aa3",
                                color: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography
                                className="accordianText"
                                style={{ fontFamily: "Poppins-Regular" }}
                            >
                                University wise Verified Students
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="w-100">
                                <div className="col">{TwentyonePowerBi}</div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <div className="row">
                <div className="d-flex flex-column justify-content-start feature-widget" style={{ width: '100%' }}>
                    <PowerBIEmbed
                        embedConfig={
                            getReportID("Corp_Module_Bottom").length > 0
                                ? {
                                    type: "report", // Supported types: report, dashboard, tile, visual and qna
                                    id: getReportID("Corp_Module_Bottom"),
                                    embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${getReportID(
                                        "Corp_Module_Bottom"
                                    )}`,
                                    accessToken: accessToken, // Keep as empty string, null or undefined
                                    settings: {
                                        filterPaneEnabled: false,
                                        bookmarksPaneEnabled: false,
                                        navContentPaneEnabled: false,
                                    },
                                }
                                : {
                                    type: "report", // Supported types: report, dashboard, tile, visual and qna
                                    id: undefined,
                                    embedUrl: undefined,
                                    accessToken: undefined,
                                    settings: {
                                        filterPaneEnabled: false,
                                        bookmarksPaneEnabled: false,
                                        navContentPaneEnabled: false,
                                    },
                                }
                        }
                        cssClassName="powerbi-module-report-stats"
                    />
                </div>
            </div>
        </>
    );
};

export default Section1;
