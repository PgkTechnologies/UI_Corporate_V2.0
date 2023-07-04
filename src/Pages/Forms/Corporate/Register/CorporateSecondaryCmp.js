import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux/es';
import { useNavigate } from 'react-router-dom';

const CorporateSecondaryCmp = (props) => {

    const type = 'Corporate';
    const countryCodes = props.countryCodes && props.countryCodes.length >= 0
        ? props.countryCodes?.map((item, i) => ({ value: item.value, label: item.label })) : (null);
    const history = useNavigate();
    const apiStatus = useSelector(state => state.DashboardReducer.apiStatus);
    
    return (
        <form onSubmit={props?.handleSubmit} className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Corporate Headquarters</div>
                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateHQAddressLine1"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Address(Line 1)'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateHQAddressLine1}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateHQAddressLine2"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Address(Line 2)'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateHQAddressLine2}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <InputLabel id="demo-simple-select-filled-label17">
                            Country
                        </InputLabel>
                        <Select
                            name="corporateHQAddressCountry"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'Country'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateHQAddressCountry}
                            required={true}
                        >
                            {countryCodes ? (countryCodes?.map((item) => (
                                <MenuItem
                                    value={item?.label}
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
                            State
                        </InputLabel>
                        <Select
                            name="corporateHQAddressState"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'Country'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateHQAddressState}
                            disabled={props?.corporateSecondary?.corporateHQAddressCountry ? false : true}
                            required={true}
                        >
                            {props.stateList ? (props.stateList?.map((item) => (
                                <MenuItem
                                    value={item?.label}
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
                            City
                        </InputLabel>
                        <Select
                            name="corporateHQAddressCity"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'City'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateHQAddressCity}
                            disabled={props?.corporateSecondary?.corporateHQAddressState ? false : true}
                            required={true}
                        >
                            {props.citylist ? (props.citylist?.map((item) => (
                                <MenuItem
                                    value={item?.label}
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
                        <TextField
                            name="corporateHQAddressDistrict"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'District'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateHQAddressDistrict}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateHQAddressZipCode"
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Zipcode'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateHQAddressZipCode}
                            required={true}
                            error={props?.errors?.corporateHQAddressZipCode ? true : false}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateHQAddressPhone"
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Phone Number'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateHQAddressPhone}
                            required={true}
                            error={props?.errors?.corporateHQAddressPhone ? true : false}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateHQAddressEmail"
                            type='Text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Office mail'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateHQAddressEmail}
                            required={true}
                            error={props?.errors?.corporateHQAddressEmail ? true : false}
                        />
                    </FormControl>
                </div>





            </div>


            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Local branch</div>
                <div style={{ position: 'relative', display: 'flex' }}>
                    <input
                        type="checkbox"
                        onChange={props.saveData} />
                    <label>Same as Headquarters</label>
                    </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateLocalBranchAddressLine1"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Address(Line 1)'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateLocalBranchAddressLine1}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateLocalBranchAddressLine2"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Address(Line 2)'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateLocalBranchAddressLine2}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <InputLabel id="demo-simple-select-filled-label17">
                            Country
                        </InputLabel>
                        <Select
                            name="corporateLocalBranchAddressCountry"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'Country'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateLocalBranchAddressCountry}
                            required={true}
                        >
                            {countryCodes ? (countryCodes?.map((item) => (
                                <MenuItem
                                    value={item?.label}
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
                            State
                        </InputLabel>
                        <Select
                            name="corporateLocalBranchAddressState"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'Country'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateLocalBranchAddressState}
                            disabled={props?.corporateSecondary?.corporateLocalBranchAddressCountry ? false : true}
                            required={true}
                        >
                            {props.stateList ? (props.stateList?.map((item) => (
                                <MenuItem
                                    value={item?.label}
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
                            City
                        </InputLabel>
                        <Select
                            name="corporateLocalBranchAddressCity"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'City'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateLocalBranchAddressCity}
                            disabled={props?.corporateSecondary?.corporateLocalBranchAddressState ? false : true}
                            required={true}
                        >
                            {props.citylist ? (props.citylist?.map((item) => (
                                <MenuItem
                                    value={item?.label}
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
                        <TextField
                            name="corporateLocalBranchAddressDistrict"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'District'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateLocalBranchAddressDistrict}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateLocalBranchAddressZipCode"
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Zipcode'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateLocalBranchAddressZipCode}
                            required={true}
                            error={props?.errors?.corporateLocalBranchAddressZipCode ? true : false}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateLocalBranchAddressPhone"
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Phone Number'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateLocalBranchAddressPhone}
                            required={true}
                            error={props?.errors?.corporateLocalBranchAddressPhone ? true : false}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateLocalBranchAddressEmail"
                            type='Text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Office mail'}
                            onChange={props?.handleChange}
                            value={props?.corporateSecondary?.corporateLocalBranchAddressEmail}
                            required={true}
                            error={props?.errors?.corporateLocalBranchAddressEmail ? true : false}
                        />
                    </FormControl>
                </div>

            </div>

            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Profile</div>
                <div style={{marginBottom : '15px'}}>
                    
                    <TextField 
                     type='Text' 
                     label={'Website/URL (if any)'}
                     variant="filled"
                     style={{ width: "100%" }}

                    />
                    </div>

                    <div style={{marginBottom : '15px'}}>
                    <TextField 
                     type='Text' 
                     label={'Company Profile (in Brief)'}
                     variant="filled"
                     style={{ width: "100%" }}

                    />  
                    </div>                
                </div>

                <div style={{ width: '100%' }}>
                <div style={{ float: 'left' }}>
                    <button className="btn" type="button"
                        onClick={() => props?.history("/register")}
                    >
                        Previous
                    </button>
                </div>
                <div style={{ float: 'right' }}>
                    <button
                        className="btn"
                        type="submit"
                        disabled={props.isBtnDisabled || (apiStatus !== 0)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </form>
    )
}
export default CorporateSecondaryCmp;