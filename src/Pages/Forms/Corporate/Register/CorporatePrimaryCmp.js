import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CorporatePrimaryCmp = (props) => {

    const [years, setYears] = useState([]);

    useEffect(() => {
        const initialyears = [];
        var i;
        for (
            i = new Date().getFullYear();
            i > new Date().getFullYear() - 150;
            i--
        ) {
            initialyears.push(i);
        }
        setYears(initialyears);
    }, []);


    const type = "Corporate";
    const { corporateCategory, corporateIndustry, corporateType } =
        props.lookUpData;

    const corporateCategoryList =
        corporateCategory && corporateCategory.length >= 0
            ? corporateCategory?.map((item, i) => ({
                value: item.categoryCode,
                label: item.categoryName,
            }))
            : null;
    const corporateIndustryList =
        corporateIndustry && corporateIndustry.length >= 0
            ? corporateIndustry?.map((item, i) => ({
                value: item.industryCode,
                label: item.industryName,
            }))
            : null;
    const corporateTypeList =
        corporateType && corporateType.length >= 0
            ? corporateType?.map((item, i) => ({
                value: item.corporateTypeCode,
                label: item.corporateTypeName,
            }))
            : null;

    const history = useNavigate();

    // console.log(props?.corporatePrimaryData?.referral, 'typeeList')
    return (
        <form onSubmit={props?.handleSubmit} className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Primary Details</div>
                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={`${type} Name`}
                            onChange={props?.handleChange}
                            value={props?.corporatePrimaryData?.corporateName}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="CIN"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'CIN'}
                            onChange={props?.handleChange}
                            value={props?.corporatePrimaryData?.CIN}
                            required={true}
                            defaultValue=""
                            aria-autocomplete="none"
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <InputLabel id="demo-simple-select-filled-label17">
                            corporate Type
                        </InputLabel>
                        <Select
                            name="corporateType"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'corporateType'}
                            onChange={props?.handleChange}
                            value={props?.corporatePrimaryData?.corporateType}
                            required={true}
                        >
                            {corporateTypeList ? (corporateTypeList?.map((item) => (
                                <MenuItem
                                    value={item?.value}
                                >
                                    {item?.label}
                                </MenuItem>))
                            )
                                :
                                (<MenuItem></MenuItem>)
                            }
                        </Select>

                    </FormControl>
                </div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <InputLabel id="demo-simple-select-filled-label17">
                            corporate Category
                        </InputLabel>
                        <Select
                            name="corporateCategory"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'corporateCategory'}
                            onChange={props?.handleChange}
                            value={props?.corporatePrimaryData?.corporateCategory}
                            required={true}
                        >
                            {corporateCategoryList ? (corporateCategoryList?.map((item) => (
                                <MenuItem
                                    value={item?.value}
                                >
                                    {item?.label}
                                </MenuItem>))
                            )
                                :
                                (<MenuItem></MenuItem>)
                            }
                        </Select>

                    </FormControl>
                </div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <InputLabel id="demo-simple-select-filled-label17">
                            corporate Industry
                        </InputLabel>
                        <Select
                            name="corporateIndustry"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'corporateIndustry'}
                            onChange={props?.handleChange}
                            value={props?.corporatePrimaryData?.corporateIndustry}
                            required={true}
                        >
                            {corporateIndustryList ? (corporateIndustryList?.map((item) => (
                                <MenuItem
                                    value={item?.value}
                                >
                                    {item?.label}
                                </MenuItem>))
                            )
                                :
                                (<MenuItem></MenuItem>)
                            }
                        </Select>

                    </FormControl>
                </div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}
                    >
                        <InputLabel id="demo-simple-select-filled-label17">
                            Select Year Of Establishment
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label17"
                            id="demo-simple-select-filled17"
                            name="yearOfEstablishment"
                            required
                            value={props?.corporatePrimaryData?.yearOfEstablishment}
                            onChange={props?.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >
                            {years.length > 0 ? (
                                years.map((item, i) => (
                                    <MenuItem key={i} value={item}>
                                        {item}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem></MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2" style={{ fontWeight: 'bold' }}>
                    Profile picture*(if any)
                </div>
                <div className="row row-container">
                    <div className="col-12">
                        <div className="reg-attach" style={{ marginLeft: '20px' }}>

                            <p
                                style={{
                                    display: "block",
                                    color: "red",
                                }}
                            >
                                {/* {errors.fileSizeErr} */}
                            </p>
                            <input
                                type="file"
                                onChange={props?.handleChangeImg}
                                accept=".jpeg, .jpg"
                                className="btn-secondary"
                                name="attachment"
                                id="attachment"
                                required={false}
                            />

                        </div>
                    </div>
                </div>
            </div>

            <div className="row cmp-register-main" >
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Referral Code</div>
                <div className="row row-container" >
                    <div className="col-4">
                        <FormControl
                            variant="filled"
                            style={{ width: "100%", marginBottom: "15px" }}>
                            <TextField
                                name="referral"
                                type='text'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ width: "100%" }}
                                variant="filled"
                                label={'Referral Code'}
                                onChange={props?.handleChange}
                                value={props?.corporatePrimaryData?.referral}
                                required={false}
                                errorMessage={props?.errors?.referral}
                            />
                        </FormControl>
                    </div>

                </div>
            </div>
            <div style={{ width: '100%' }}>
                <div style={{ float: 'left' }}>
                    <button className="btn" type="button"
                        onClick={() => props?.history("/")}
                    >
                        Go to login
                    </button>
                </div>
                <div style={{ float: 'right' }}>
                    <button
                        className="btn"
                        type="submit"
                        disabled={props?.history.isBtnDisabled}
                    >
                        Next
                    </button>
                </div>
            </div>

        </form>
    )
}
export default CorporatePrimaryCmp;