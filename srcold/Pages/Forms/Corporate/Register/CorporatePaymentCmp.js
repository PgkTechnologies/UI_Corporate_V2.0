import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import React, { useRef } from "react";

const CorporatePaymentCmp = ({
    paymentData,
    errors,
    handlerChange,
    handleSubmit,
    cancelPayment,
    checkgstn,
    setValueRadio,
    setpaymentData,
    valueRadio,
  }) => {
    const { emailErr, nameErr, mobileErr, amtErr, gstinErr } = errors;
    // const [gstnRequire, setGstnRequire] = useState(false);
    // const [disable, setDisable] = useState(false);
    // const [value, setValue] = useState('');
    const gstnInput = useRef();
  
    const handleChange = (event) => {
      setValueRadio(event.target.value);
      if (event.target.value === "true" || event.target.value === true) {
        setpaymentData((prev) => ({
          ...prev,
          gstn: "",
        }));
      } else {
        if (paymentData.gstn) {
          setpaymentData((prev) => ({
            ...prev,
            gstn: paymentData.gstn,
          }));
        } else {
          setpaymentData((prev) => ({
            ...prev,
            gstn: localStorage.getItem("GST"),
          }));
        }
      }
    };
    localStorage.setItem("GST", checkgstn);




    return(
       <form className="login-form reg-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="login-grp">
            <input
              type="text"
              name="name"
              onChange={handlerChange}
              className={`login-inp${nameErr ? " login-inp-error" : ""}`}
              placeholder="Name"
              autoFocus
              required={true}
            />
            {nameErr ? <p className="inp-errors">{nameErr}</p> : null}
          </div>
          <div className="login-grp">
            <input
              type="tel"
              name="contact"
              value={paymentData.contact}
              onChange={handlerChange}
              className={`login-inp${mobileErr ? " login-inp-error" : ""}`}
              placeholder="Phone Number"
              required={true}
            />
            {mobileErr ? <p className="inp-errors">{mobileErr}</p> : null}
          </div>
          <div className="login-grp">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">GSTN</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="checkGstn"
                onChange={handleChange}
                value={valueRadio}
              >
                <FormControlLabel
                  value='false'
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value='true'
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="login-grp">
            <input
              type="text"
              name="gstn"
              onChange={handlerChange}
              className={`login-inp${gstinErr ? " login-inp-error" : ""}`}
              placeholder="GSTIN"
              required={true}
              ref={gstnInput}
              value={paymentData?.gstn === "undefined" ? "" : paymentData?.gstn}
              disabled={valueRadio === "true" ? 1 : 0}
            />
            {gstinErr ? <p className="inp-errors">{gstinErr}</p> : null}
          </div>
          <div className="login-grp">
            <input
              type="email"
              name="email"
              onChange={handlerChange}
              className={`login-inp${emailErr ? " login-inp-error" : ""}`}
              placeholder="Email"
              required={true}
            />
            {emailErr ? <p className="inp-errors">{emailErr}</p> : null}
          </div>
          <div className="login-grp">
            <input
              type="number"
              name="amount"
              onChange={handlerChange}
              className={`login-inp${amtErr ? " login-inp-error" : ""}`}
              defaultValue={paymentData.amount}
              placeholder="Amount"
              required={true}
            />
            {amtErr ? <p className="inp-errors">{amtErr}</p> : null}
          </div>
        </div>
      </div>
      <div className="reg-payment-btns reg-payment-btns2">
        <button type="reset" onClick={cancelPayment} className="btn bg-white">
          <i className="fas fa-times-circle" /> Cancel Payment
        </button>{" "}
        &nbsp;
        <button type="submit" className="btn bg-white">
          <i className="fas fa-check-circle" /> Make Payment
        </button>
      </div>
    </form>
    )
}

export default CorporatePaymentCmp;