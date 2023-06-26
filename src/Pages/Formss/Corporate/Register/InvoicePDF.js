import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logo from "./logo.jpg";
import converter from "number-to-words";
import { useEffect, useState } from "react";
import moment from "moment";

const InvoicePdf = (props) => {

  const { data } = props;
  const { paymentModal } = props;
  const { paymentData } = props;
  const { tokensPurchase } = props;
 
  const gst = "18%";

  // const corpgstn = localStorage.getItem("corpGST");
  // console.log(corpgstn,"corppppgsstnnnn");
  //Total Amount

  const totalAmount = data[0]?.Total + '.00';


  //Base
  const actualAmount = (totalAmount / 1.18).toFixed(2);

  //Tax Amount (IGST)
  const taxAmount = totalAmount - actualAmount;
  const totalGST = taxAmount.toFixed(2);

  //SGST CGST
  const SGST = (taxAmount / 2).toFixed(2);

  const roundAmount = taxAmount;

  const calcPercent = (num, percentage) => {
    return num * (percentage / 100);
  };


  //Data Example
  // Date: "2023-01-09 08:56:54";
  // InvoiceNo: "GST/OFF/S0000001244/2022-23";
  // OriginalAmount: "599.99";
  // PartyAddressLine1: "";
  // PartyAddressLine2: "";
  // PartyCityName: "";
  // PartyCode: "";
  // PartyEmail: "dm@gm.co";
  // PartyGST: "";
  // PartyMobileNumber: "+915485857877";
  // PartyName: "xm";
  // PartyStateName: "";
  // PaymentID: "asdfasdfa";
  // PaymentMode: "CASH";
  // Total: "599.99";

  //Logic GST && Not TG ? IGST : SGST, CGST;

  //Before Tax
  const lumsumAmount = totalAmount - totalGST;
  const remainingAmount = lumsumAmount.toFixed(2);
  const gstAll = taxAmount.toFixed(2);

  const convert = converter.toWords(totalAmount);
  const convertTax = converter.toWords(taxAmount.toFixed(2));

  const words = convert.split(" ");
  const wordsTax = convertTax.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  for (let i = 0; i < wordsTax.length; i++) {
    wordsTax[i] = wordsTax[i][0].toUpperCase() + wordsTax[i].substr(1);
  }


  const rupees =
    totalAmount.split(".").length > 1 ? totalAmount.split(".")[1] : "0";
  const paise = gstAll.split(".").length > 1 ? gstAll.split(".")[1] : "0";

  const totalAmountInWords = words.join(" ");

  const totalTaxInWords = wordsTax.join(" ");

  const styles = StyleSheet.create({
    container: {
      height: "100%",
      width: "100%",
      padding: "20px",
      border: "5px soild black",
    },
    containerInvoice: {
      marginTop: "10px",
      display: "flex",
      fontSize: "10px",
    },

    date: {
      marginTop: "-20px",
      marginLeft: "455px",
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
    },

    invoiceNo: {
      display: "flex",
      marginLeft: "10px",
      alignItems: "baseline",
      justifyContent: "center",
    },

    forPgk: {
      marginLeft: "350px",
      display: "flex",
      alignItems: "baseline",
      justifyContent: "flex-end",
      fontWeight: "extrabold",
      marginTop: "-35px",
    },
    smTxt: {
      marginLeft: "510px",
      display: "flex",
      alignItems: "baseline",
      justifyContent: "flex-end",
      fontWeight: "extrabold",
      marginTop: "-5px",
      fontSize: 7.5,
    },
    autho: {
      marginLeft: "480px",
      display: "flex",
      alignItems: "baseline",
      justifyContent: "flex-end",
      marginTop: "15px",
    },
    billHeadBody: {
      display: "flex",
      flexDirection: "row",
      border: 1,
      borderBottom: 0,
      marginTop: "10px",
    },

    clientData: {
      display: "flex",
      justifyContent: "left",
      marginTop: "1px",
      alignSelf: "left",
      alignItems: "lfft",
    },

    billDetailsBody: {
      display: "flex",
      flexDirection: "row",
      border: 1,
      borderBottom: "none",
      borderTop: "none",
      width: "100%",
    },

    billCGSTBody: {
      display: "flex",
      flexDirection: "row",
      border: 1,
      borderBottom: "none",
      borderTop: "none",
      width: "100%",
    },

    billSGSTBody: {
      display: "flex",
      flexDirection: "row",
      border: 1,
      borderBottom: "none",
      borderTop: "none",
      width: "100%",
    },

    billDetailsTotalBody: {
      display: "flex",
      flexDirection: "row",
      border: 1,
      width: "100%",
    },

    dosRows: {
      width: "40%",
      paddingTop: "12px",
      borderRight: 1,
    },

    HSNRows: {
      width: "15%",
      paddingTop: "12px",
      borderRight: 1,
    },

    quantityRows: {
      width: "15%",
      paddingTop: "12px",
      borderRight: 1,
    },
    rateRows: {
      width: "15%",
      paddingTop: "12px",
      borderRight: 1,
    },
    amountRows: {
      width: "15%",
      paddingTop: "12px",
    },
    tabelHead: {
      width: "100%",
      height: 25,
      fontSize: 11,
      borderBottom: 1,
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
    },

    tabelDetails: {
      width: "100%",
      height: 25,
      fontSize: 11,
      fontWeight: "bold",
      textAlign: "center",
    },

    taxHeadBody: {
      display: "flex",
      flexDirection: "row",
      border: 1,
      borderBottom: "none",
      marginTop: "20px",
    },

    taxHSNRows: {
      width: "20%",
      paddingTop: "12px",
      borderRight: 1,
    },

    taxableValRows: {
      width: "15%",
      paddingTop: "12px",
      borderRight: 1,
    },

    cTaxRows: {
      width: "15%",
      borderRight: 1,
      paddingTop: "6px",
    },

    taxRAHead: {
      width: "100%",
      textTransform: "uppercase",
      height: 18.5,
      display: "flex",
      flexDirection: "row",
    },

    taxRateHead: {
      width: "40%",
      borderRight: 1,
      borderBottom: 1,
      fontSize: 7,
      paddingTop: "6px",
      textAlign: "center",
    },

    taxAmountHead: {
      width: "60%",
      borderBottom: 1,
      fontSize: 7,
      paddingTop: "6px",
      textAlign: "center",
    },

    sTaxRows: {
      width: "15%",
      borderRight: 1,
      paddingTop: "6px",
    },
    iTaxRows: {
      width: "15%",
      borderRight: 1,
      paddingTop: "6px",
    },

    totalTaxRows: {
      width: "20%",
      paddingTop: "12px",
    },
    totalTaxRowsLast: {
      width: "20%",
      paddingTop: "12px",
    },

    taxTabelHead: {
      width: "100%",
      height: 25,
      fontSize: 7.5,
      borderBottom: 1,
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
    },

    taxTabelDetails: {
      width: "100%",
      height: 20,
      fontSize: 7,
      borderBottom: 1,
      borderTop: "none",
      textAlign: "center",
    },

    taxCSTabelHead: {
      width: "100%",
      height: 12.5,
      fontSize: 7.5,
      borderBottom: 1,
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
    },

    taxDetailsBody: {
      display: "flex",
      flexDirection: "row",
      border: 1,
      borderTop: "none",
      borderBottom: "none",
    },

    cRateTaxRows: {
      width: "6%",
      borderRight: 1,
      paddingTop: "12px",
    },

    cAmountTaxRows: {
      width: "9%",
      borderRight: 1,
      paddingTop: "12px",
    },
    title: {
      fontSize: "15px",
      fontWeight: "700",
      marginBottom: "10px",
    },
    header: {
      fontSize: "15px",
      fontWeight: "black",
      padding: "5px",
      textAlign: "center",
      marginTop: "10px",
      marginBottom: "10px",
      backgroundColor: "#eee",
    },
    address: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    addressBlock: {
      width: "50%",
      border: "1px solid #000",
      textAlign: "left",
      padding: "10px",
      position: "relative",
    },
    logo: {
      width: "70px",
      height: "70px",
      alignSelf: "left",
      position: "absolute",
      right: 0,
      top: "35%",
      right: "20px",
    },
    logoBG: {
      width: "300px",
      height: "300px",
      alignSelf: "left",
      position: "absolute",
      alignSelf: "center",
      top: "40%",
      opacity: "0.07",
    },
    main: {
      display: "flex",
    },
  });
  return (
    <>
      <Document>
        <Page size="A4" style={styles.main}>
          <Image src={logo} style={styles.logoBG} />
          <View style={styles.container}>
            <View style={styles.header}>
              <Text>
                TAX INVOICE (Original for recipient)
              </Text>
            </View>
            <View style={styles.containerInvoice}>
              <View style={styles.invoiceNo}>
                <Text>Invoice No : {data[0]?.InvoiceNo}</Text>
                <Text style={styles.textHeadings}>
                  Ref No : {data[0]?.InvoiceNo}
                </Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.textHeadings}>
                  Date: {moment(data[0].Date).format("DD-MM-YYYY")}
                </Text>
              </View>
            </View>
            <View style={styles.address}>
              <View style={styles.addressBlock}>
                <Image src={logo} style={styles.logo} />
                <Text style={styles.title}>
                  PGK Technologies Private Limited.
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    marginBottom: "5px",
                    maxWidth: "400px",
                    lineHeight: 1.3,
                  }}
                >
                  Plot NO 33,Sy No 103/2
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    marginBottom: "5px",
                    maxWidth: "400px",
                    lineHeight: 1.3,
                  }}
                >
                  Jayabheri Enclave Phase II
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    marginBottom: "5px",
                    maxWidth: "400px",
                    lineHeight: 1.3,
                  }}
                >
                  Gachibowli,Hyderabad
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    marginBottom: "5px",
                    maxWidth: "400px",
                    lineHeight: 1.3,
                  }}
                >
                  Telangana TG-500032
                </Text>
                <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                  India
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    marginBottom: "2px",
                    maxWidth: "400px",
                    lineHeight: 1.3,
                  }}
                >
                  GSTIN/UIN: 36AALCP3051G1ZG

                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    marginBottom: "2px",
                    maxWidth: "400px",
                    lineHeight: 1.3,
                    textDecoration: "underline",
                  }}
                >
                  State Name : Telangana, Code : 36.
                </Text>
              </View>
              <View style={styles.addressBlock}>
                <Text
                  style={{
                    fontSize: "15px",
                    marginBottom: "2px",
                    fontWeight: "bold",
                  }}
                >
                  Client: {data[0]?.PartyName}
                </Text>
                <view style={styles.clientData}>
                  <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                    Address: {data[0]?.PartyAddressLine1}
                  </Text>
                  <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                    {data[0]?.PartyAddressLine2}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10px",
                      marginBottom: "5px",
                    }}
                  >
                    City:  {data[0]?.PartyCityName}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10px",
                      marginBottom: "5px",
                    }}
                  >
                    State: {data[0]?.PartyStateName}
                  </Text>
                  <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                    Country:  India
                  </Text>
                  <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                    Zipcode: {data[0]?.PartyCode}
                  </Text>
                  <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                    GSTIN/UIN: {paymentData?.gstn}
                  </Text>
                  {/* <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                    State Name : {data[0]?.PartyStateName}
                  </Text>   */}
                  <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                    Phone No: {data[0]?.PartyMobileNumber}
                  </Text>
                  <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                    Email : {data[0]?.PartyEmail}
                  </Text>
                </view>
              </View>
            </View>
            <View style={styles.billHeadBody}>
              <View style={styles.dosRows}>
                <Text style={styles.tabelHead}>Description of Service</Text>
              </View>
              <View style={styles.HSNRows}>
                <Text style={styles.tabelHead}>HSN/SAC</Text>
              </View>
              <View style={styles.quantityRows}>
                <Text style={styles.tabelHead}>Quantity</Text>
              </View>
              <View style={styles.rateRows}>
                <Text style={styles.tabelHead}>Rate</Text>
              </View>
              <View style={styles.amountRows}>
                <Text style={styles.tabelHead}>Amount</Text>
              </View>
            </View>
            {paymentModal === "TOKEN" ? (
              <View style={styles.billDetailsBody}>
                <View style={styles.dosRows}>
                  <Text style={styles.tabelDetails}>
                    Tokens Purchase Charges
                  </Text>
                </View>
                <View style={styles.HSNRows}>
                  <Text style={styles.tabelDetails}>998315</Text>
                </View>
                <View style={styles.quantityRows}>
                  <Text style={styles.tabelDetails}>{tokensPurchase}</Text>
                </View>
                <View style={styles.rateRows}>
                  <Text style={styles.tabelDetails}>{remainingAmount / tokensPurchase}</Text>
                </View>
                <View style={styles.amountRows}>
                  <Text style={styles.tabelDetails}>{remainingAmount}</Text>
                </View>
              </View>)
              :
              (<View style={styles.billDetailsBody}>
                <View style={styles.dosRows}>
                  <Text style={styles.tabelDetails}>
                    Registration / Renewal Charges
                  </Text>
                </View>
                <View style={styles.HSNRows}>
                  <Text style={styles.tabelDetails}>998315</Text>
                </View>
                <View style={styles.quantityRows}>
                  <Text style={styles.tabelDetails}>1</Text>
                </View>
                <View style={styles.rateRows}>
                  <Text style={styles.tabelDetails}>{remainingAmount}</Text>
                </View>
                <View style={styles.amountRows}>
                  <Text style={styles.tabelDetails}>{remainingAmount}</Text>
                </View>
              </View>)
            }
            {data[0]?.PartyStateName !== "Telangana" ? (
              <div>
                <View style={styles.billDetailsBody}>
                  <View style={styles.dosRows}>
                    <Text style={styles.tabelDetails}>IGST</Text>
                  </View>
                  <View style={styles.HSNRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.quantityRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.rateRows}>
                    <Text style={styles.tabelDetails}>18 %</Text>
                  </View>
                  <View style={styles.amountRows}>
                    <Text style={styles.tabelDetails}>{totalGST}</Text>
                  </View>
                </View>
                <View style={styles.billDetailsBody}>
                  <View style={styles.dosRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.HSNRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.quantityRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.rateRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.amountRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                </View>
              </div>
            ) : (
              <div>
                <View style={styles.billDetailsBody}>
                  <View style={styles.dosRows}>
                    <Text style={styles.tabelDetails}>CGST</Text>
                  </View>
                  <View style={styles.HSNRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.quantityRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.rateRows}>
                    <Text style={styles.tabelDetails}>9 %</Text>
                  </View>
                  <View style={styles.amountRows}>
                    <Text style={styles.tabelDetails}>{SGST}</Text>
                  </View>
                </View>
                <View style={styles.billDetailsBody}>
                  <View style={styles.dosRows}>
                    <Text style={styles.tabelDetails}>SGST</Text>
                  </View>
                  <View style={styles.HSNRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.quantityRows}>
                    <Text style={styles.tabelDetails}></Text>
                  </View>
                  <View style={styles.rateRows}>
                    <Text style={styles.tabelDetails}>9 %</Text>
                  </View>
                  <View style={styles.amountRows}>
                    <Text style={styles.tabelDetails}>{SGST}</Text>
                  </View>
                </View>
              </div>
            )}

            <View style={styles.billDetailsTotalBody}>
              <View style={styles.dosRows}>
                <Text style={styles.tabelDetails}>Total</Text>
              </View>
              <View style={styles.HSNRows}>
                <Text style={styles.tabelDetails}></Text>
              </View>
              <View style={styles.quantityRows}>
                <Text style={styles.tabelDetails}></Text>
              </View>
              <View style={styles.rateRows}>
                <Text style={styles.tabelDetails}></Text>
              </View>
              <View style={styles.amountRows}>
                <Text style={styles.tabelDetails}>{totalAmount}</Text>
              </View>
            </View>
            <View style={styles.containerInvoice}>
              <View style={styles.smTxt}>
                <Text style={{ marginBottom: "7px" }}>E. & O.E</Text>
              </View>
              <View style={styles.invoiceNo}>
                <Text style={{ fontSize: "11px", marginTop: "5px" }}>
                  Amount Chargeable (in words) :{" "}
                  {/* <Text style={{ fontWeight: "extrabold" }}>
                    Rupees {totalAmountInWords} & {rupees} Paise Only
                  </Text>{" "} */}
                  <Text style={{ fontWeight: "extrabold" }}>
                    Rupees {totalAmountInWords}{" "}
                    {rupees === "0" || rupees === "00"
                      ? " Only."
                      : rupees.length < 2
                      ? "& " + rupees + "0 Paise only."
                      : "& " + rupees + " Paise only."}
                  </Text>
                </Text>
              </View>
            </View>
            {/* Second Section Start */}
            {data[0]?.PartyStateName !== "Telangana" ? (
              <div>
                <View style={styles.taxHeadBody}>
                  <View style={styles.taxHSNRows}>
                    <Text style={styles.taxTabelHead}>HSN/SAC</Text>
                  </View>
                  <View style={styles.taxableValRows}>
                    <Text style={styles.taxTabelHead}>Taxable Value</Text>
                  </View>
                  <View style={styles.cTaxRows}>
                    <Text style={styles.taxCSTabelHead}>Central Tax</Text>
                    <View style={styles.taxRAHead}>
                      <Text style={styles.taxRateHead}>Rate</Text>
                      <Text style={styles.taxAmountHead}>Amount</Text>
                    </View>
                  </View>
                  <View style={styles.sTaxRows}>
                    <Text style={styles.taxCSTabelHead}>State Tax</Text>
                    <View style={styles.taxRAHead}>
                      <Text style={styles.taxRateHead}>Rate</Text>
                      <Text style={styles.taxAmountHead}>Amount</Text>
                    </View>
                  </View>
                  <View style={styles.iTaxRows}>
                    <Text style={styles.taxCSTabelHead}>IGST</Text>
                    <View style={styles.taxRAHead}>
                      <Text style={styles.taxRateHead}>Rate</Text>
                      <Text style={styles.taxAmountHead}>Amount</Text>
                    </View>
                  </View>
                  <View style={styles.totalTaxRows}>
                    <Text style={styles.taxTabelHead}>Total Tax Amount</Text>
                  </View>
                </View>
                <View style={styles.taxDetailsBody}>
                  <View style={styles.taxHSNRows}>
                    <Text style={styles.taxTabelDetails}>998315</Text>
                  </View>
                  <View style={styles.taxableValRows}>
                    <Text style={styles.taxTabelDetails}>
                      {remainingAmount}
                    </Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>18 %</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>{totalGST}</Text>
                  </View>
                  <View style={styles.totalTaxRowsLast}>
                    <Text style={styles.taxTabelDetails}>{totalGST}</Text>
                  </View>
                </View>
                <View style={styles.taxDetailsBody}>
                  <View style={styles.taxHSNRows}>
                    <Text style={styles.taxTabelDetails}>TOTAL</Text>
                  </View>
                  <View style={styles.taxableValRows}>
                    <Text style={styles.taxTabelDetails}>
                      {remainingAmount}
                    </Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>18%</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>{totalGST}</Text>
                  </View>
                  <View style={styles.totalTaxRowsLast}>
                    <Text style={styles.taxTabelDetails}>{totalGST}</Text>
                  </View>
                </View>
              </div>
            ) : (
              <div>
                <View style={styles.taxHeadBody}>
                  <View style={styles.taxHSNRows}>
                    <Text style={styles.taxTabelHead}>HSN/SAC</Text>
                  </View>
                  <View style={styles.taxableValRows}>
                    <Text style={styles.taxTabelHead}>Taxable Value</Text>
                  </View>
                  <View style={styles.cTaxRows}>
                    <Text style={styles.taxCSTabelHead}>Central Tax</Text>
                    <View style={styles.taxRAHead}>
                      <Text style={styles.taxRateHead}>Rate</Text>
                      <Text style={styles.taxAmountHead}>Amount</Text>
                    </View>
                  </View>
                  <View style={styles.sTaxRows}>
                    <Text style={styles.taxCSTabelHead}>State Tax</Text>
                    <View style={styles.taxRAHead}>
                      <Text style={styles.taxRateHead}>Rate</Text>
                      <Text style={styles.taxAmountHead}>Amount</Text>
                    </View>
                  </View>
                  <View style={styles.iTaxRows}>
                    <Text style={styles.taxCSTabelHead}>IGST</Text>
                    <View style={styles.taxRAHead}>
                      <Text style={styles.taxRateHead}>Rate</Text>
                      <Text style={styles.taxAmountHead}>Amount</Text>
                    </View>
                  </View>
                  <View style={styles.totalTaxRows}>
                    <Text style={styles.taxTabelHead}>Total Tax Amount</Text>
                  </View>
                </View>
                <View style={styles.taxDetailsBody}>
                  <View style={styles.taxHSNRows}>
                    <Text style={styles.taxTabelDetails}>998315</Text>
                  </View>
                  <View style={styles.taxableValRows}>
                    <Text style={styles.taxTabelDetails}>
                      {remainingAmount}
                    </Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>9 %</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>{SGST}</Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>9 %</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>{SGST}</Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.totalTaxRowsLast}>
                    <Text style={styles.taxTabelDetails}>{totalGST}</Text>
                  </View>
                </View>
                <View style={styles.taxDetailsBody}>
                  <View style={styles.taxHSNRows}>
                    <Text style={styles.taxTabelDetails}>TOTAL</Text>
                  </View>
                  <View style={styles.taxableValRows}>
                    <Text style={styles.taxTabelDetails}>
                      {remainingAmount}
                    </Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>9%</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>{SGST}</Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>9%</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>{SGST}</Text>
                  </View>
                  <View style={styles.cRateTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.cAmountTaxRows}>
                    <Text style={styles.taxTabelDetails}>0</Text>
                  </View>
                  <View style={styles.totalTaxRowsLast}>
                    <Text style={styles.taxTabelDetails}>{totalGST}</Text>
                  </View>
                </View>
              </div>
            )}

            {/* Second Section End */}
            <View style={styles.containerInvoice}>
              <View style={styles.invoiceNo}>
                <Text style={{ fontSize: "11px", marginTop: "5px" }}>
                  Tax Amount (in words) :{" "}
                  {/* <Text style={{ fontWeight: "extrabold" }}>
                    Rupees {totalTaxInWords} & {paise} Paise Only
                  </Text>{" "} */}
                   <Text style={{ fontWeight: "extrabold" }}>
                    Rupees&nbsp;{totalTaxInWords}
                    {paise === "00" || paise === "0"
                      ? " only."
                      : paise.length < 2
                        ? " & " + paise + "0 Paise only."
                        : " & " + paise + " Paise only."}
                  </Text>
                </Text>
                <Text
                  style={{
                    textDecoration: "underline",
                    fontSize: "10px",
                    marginTop: "30px",
                  }}
                >
                  Declaration
                </Text>
                <View style={{ maxWidth: "290px" }}>
                  <Text style={{ fontSize: "10px", marginTop: "5px" }}>
                    We declare that this invoice shows the actual price of the
                    services described and that all particulars are true and
                    correct
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.forPgk}>
              <Text style={{ fontSize: "9px", fontWeight: "bold" }}>
                for PGK TECHNOLOGIES PRIVATE LIMITED
              </Text>
              <Text style={{ fontSize: "8px", marginTop: "20px" }}>
                Authorised Signatory
              </Text>
            </View>
            <View
              style={{
                marginTop: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: "10px",
                  marginBottom: "2px",
                  textDecoration: "underline",
                }}
              >
                This is a Computer Generated Invoice no Signature is Needed.
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default InvoicePdf;
