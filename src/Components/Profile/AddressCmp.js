import React from "react";
import {
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import PreLoader from "../../utils/PreLoader";


const AddressCmp = (props) => {
  const { profileData, countries, cityListHQ, onChange, cityListLocal,toggleCorporateHeadQuarters } = props;
  const [age, setAge] = React.useState("");
  const apiStatus = useSelector((state) => state.loginReducer?.apiStatus);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  console.log(props?.profileData?.corporateHQAddressCity?.value,cityListLocal, "CHECK");
  console.log(countries,'oiiii')
    // console.log(
  // const model = 
  //   props?.hqStates?.map((item, i) => console.log(item,'temii'))

  // console.log(model,'check88')

  return (
    <>
      {apiStatus ? <PreLoader /> : null}
      <div className="cmp-main">
        <p className="cmp-head">Address & Contacts</p>
        <div className="row d-flex align-items-center justify-content-center">
          <div className="row col-lg-6 col-md-12 col-sm-12">
            <div className="sub-title" style={{ paddingTop: "0" }}>
              Headquarters
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 1)"
                type="text"
                name="corporateHQAddressLine1"
                variant="filled"
                helperText={props?.errors?.hAddressLine1}
                // error={props?.errors?.hAddressLine1 ? true : false}
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  props?.profileData?.corporateHQAddressLine1?.value
                    ? props?.profileData?.corporateHQAddressLine1?.value
                    : ""}
              />
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 2)"
                type="text"
                name="corporateHQAddressLine2"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  props?.profileData?.corporateHQAddressLine2?.value
                    ? props?.profileData?.corporateHQAddressLine2?.value
                    : "" }
              />
            </div>
            <div className="col-6">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label17">
                  Country *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label17"
                  id="demo-simple-select-filled17"
                  name="corporateHQAddressCountry"
                  required
                  value={props?.profileData?.corporateHQAddressCountry ? props?.profileData?.corporateHQAddressCountry?.value :'' }
                  onChange={props?.onChange}
                  disabled
                >
                  {countries?.length > 0 ? (
                    countries?.map((item, i) => (
                      <MenuItem key={i} value={item?.value}>
                        {item?.value}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label2">
                  State *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label2"
                  id="demo-simple-select-filled2"
                  name="corporateHQAddressState"
                  required
                  value={
                    props?.profileData?.corporateHQAddressState ? props?.profileData?.corporateHQAddressState?.value : ''  }
                  onChange={props?.onChange}
                >
                  {props?.hqStates?.length > 0 ? (
                    props?.hqStates
                      ?.map((item, i) => (
                        <MenuItem key={i} value={item?.value}>
                          {item?.value}
                          
                        </MenuItem>
                      ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-4">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label3">
                  City *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label3"
                  id="demo-simple-select-filled3"
                  name="corporateHQAddressCity"
                  required
                  value={
                    props?.profileData?.corporateHQAddressCity ?  props?.profileData?.corporateHQAddressCity?.value : ''}
                  onChange={props?.onChange}
                >
                  {props?.hqCities?.length > 0 ? (
                    props?.hqCities?.map((item, i) => (
                      <MenuItem key={i} value={item?.value}>
                        {item?.value}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-4">
              <TextField
                label="District"
                type="text"
                name="corporateHQAddressDistrict"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  props?.profileData?.corporateHQAddressDistrict ? props?.profileData?.corporateHQAddressDistrict?.value : '' }
              />
            </div>
            <div className="col-4">
              <TextField
                label="Zipcode"
                type="number"
                name="corporateHQAddressZipCode"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  props?.profileData?.corporateHQAddressZipCode ? props?.profileData?.corporateHQAddressZipCode?.value : ''}
              />
            </div>
            <div className="col-12">
              <TextField
                label="Phone Number"
                type="number"
                name="corporateHQAddressPhone"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  props?.profileData?.corporateHQAddressPhone
                    ? props?.profileData?.corporateHQAddressPhone?.value
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Office Mail"
                type="text"
                name="corporateHQAddressEmail"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  props?.profileData?.corporateHQAddressEmail
                    ? props?.profileData?.corporateHQAddressEmail?.value
                    : ""
                }
              />
            </div>
          </div>
          <div className="row col-lg-6 col-md-12 col-sm-12">
            <div className="col-6">
              <div className="sub-title" style={{ paddingTop: '0' }} >Local Branch</div>
            </div>
            <div className="col-6" >
              <div className="d-flex">
                <div className="sub-title d-flex justify-content-center align-items-center" style={{ paddingTop: '0' }}>
                  <input
                    type="checkbox"
                    onChange={props?.toggleCorporateHeadQuarters}
                    name={"sameAscorporateHeadquarters"}
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                    style={{ fontSize: "12px" }}
                  >
                    &nbsp; Same as Headquarters
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 1)"
                type="text"
                name="corporateLocalBranchAddressLine1"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  profileData?.corporateLocalBranchAddressLine1
                    ? profileData?.corporateLocalBranchAddressLine1?.value
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 2)"
                type="text"
                name="corporateLocalBranchAddressLine2"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  profileData?.corporateLocalBranchAddressLine2
                    ? profileData?.corporateLocalBranchAddressLine2?.value
                    : ""
                }
              />
            </div>
            <div className="col-6">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label4">
                  Country *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label4"
                  id="demo-simple-select-filled4"
                  name="corporateLocalBranchAddressCountry"
                  required
                  value={
                    profileData?.corporateLocalBranchAddressCountry
                      ? profileData?.corporateLocalBranchAddressCountry?.value
                      : ""
                  }
                  onChange={props?.onChange}
                  disabled
                >
                  {countries?.length > 0 ? (
                    countries.map((item, i) => (
                      <MenuItem key={i} value={item.value}>
                        {item.value}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label5">
                  State *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label5"
                  id="demo-simple-select-filled5"
                  name="corporateLocalBranchAddressState"
                  required
                  value={
                    profileData?.corporateLocalBranchAddressState
                      ? profileData?.corporateLocalBranchAddressState?.value
                      : ""
                  }
                  onChange={props?.onChange}
                >
                  {props?.hqStates?.length > 0 ? (
                    props?.hqStates?.map((item, i) => (
                      <MenuItem key={i} value={item?.value}>
                        {item?.value}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-4">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label6">
                  City *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label6"
                  id="demo-simple-select-filled6"
                  name="corporateLocalBranchAddressCity"
                  required
                  value={
                    profileData?.corporateLocalBranchAddressCity
                      ? profileData?.corporateLocalBranchAddressCity?.value
                      : ""
                  }
                  onChange={props?.onChange}
                >
                  {props?.hqCities?.length > 0 ? (
                    props?.hqCities?.map((item, i) => (
                      <MenuItem key={i} value={item?.value}>
                        {item?.value}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-4">
              <TextField
                label="District"
                type="text"
                name="corporateLocalBranchAddressDistrict"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  profileData?.corporateLocalBranchAddressDistrict
                    ? profileData?.corporateLocalBranchAddressDistrict?.value
                    : ""
                }
              />
            </div>
            <div className="col-4">
              <TextField
                label="Zipcode"
                type="text"
                name="corporateLocalBranchAddressZipcode"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  profileData?.corporateLocalBranchAddressZipCode
                    ? profileData?.corporateLocalBranchAddressZipCode?.value                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Phone Number"
                type="text"
                name="corporateLocalBranchAddressPhone"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  profileData?.corporateLocalBranchAddressPhone
                    ? profileData?.corporateLocalBranchAddressPhone?.value
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Office Mail"
                type="text"
                name="corporateLocalBranchAddressemail"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={props?.onChange}
                value={
                  profileData?.corporateLocalBranchAddressEmail
                    ? profileData?.corporateLocalBranchAddressEmail?.value
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressCmp;
