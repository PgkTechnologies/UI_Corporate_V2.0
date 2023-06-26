import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionGetBulkTokenNumberRequest } from "../../../Store/Actions/SagaActions/CommonSagaActions";
// import { actionGetBulkTokenNumberRequest } from "../../../Store/Sagas/CommonSagaAction";

const TokenPurchase = (props) => {
  const [amount, setAmount] = useState(0);
  const [tokenCount, setTokensCount] = useState([]);
  const [bulkPrice, setBulkPrice] = useState(1);

  const history = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    //console.log(value)
    setAmount(value);
  };

  const getBulkTokens = () => {
    dispatch(
      actionGetBulkTokenNumberRequest({
        callback: (response) => {
          setTokensCount(parseInt(response.bulkCount));
          setBulkPrice(parseInt(response.bulkPrice));
          //setTokensCount(response);
        },
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleClose();
    if (!amount) return;
    localStorage.setItem("tokensPurchase", amount);
    localStorage.setItem("navigateUrl", `/profile`);
    history("/register/payment");
  };

  useEffect(() => {
    getBulkTokens();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="modal-body purchase-modal-body d-flex flex-column justify-content-center align-items-center">
          <p className="heading">
            How many credits would you like to purchase ?
          </p>
          <input
            type="number"
            name="amount"
            step={tokenCount}
            min={tokenCount}
            onChange={handleChange}
            className="form-control credits-input"
            required
          />
        </div>
        <div className="text-center">
          <button className="btn" type="submit">
            Purchase
          </button>
        </div>
      </form>
    </>
  );
};

export default TokenPurchase;
