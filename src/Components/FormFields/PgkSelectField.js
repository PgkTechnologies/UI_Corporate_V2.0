import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function PgkSelectField(props) {
  // const [option, setOption] = useState({});

  // useEffect(()=>{
  //     if(props?.options?.length && props?.value?.trim()!=='') {
  //         const option = props?.options?.find((item)=>item?.value===props?.value);
  //         // console.log('option ', option);
  //         setOption(option ? option : {});
  //     }

  // }, [props?.options, props?.value]);

  const {
    label = "",
    variant = "outlined",
    size = "small",
    name = "",
    value = "",
    onChange = () => {},
    disabled = false,
    className = "",
    required = false,
    errorMessage = "",
    styles = { width: "100%" },
    validations = [],
    options = [],
    labelStyles = {},
    selectStyles = {},
    menuStyles = {},
  } = props;

  const onSelect = (event) => {
    let newValidations = [];
    if (required) {
      newValidations = ["isRequired", ...validations];
    }

    const errorString = fieldValidations(event?.target?.value, newValidations);
    onChange(name, event?.target?.value, errorString);
  };

  return (
    <FormControl
      size={size}
      variant="outlined"
      style={styles}
      disabled={disabled}
      required={required}
      error={
        errorMessage !== undefined && errorMessage?.trim() !== "" ? true : false
      }
    >
      <InputLabel style={labelStyles} shrink={true}>
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={onSelect}
        label={label}
        autoWidth
        style={selectStyles}
      >
        <MenuItem style={menuStyles} value={""}>{`Select ${label}`}</MenuItem>
        {options?.length
          ? options.map((option) => {
              if (option && option.value && option.label) {
                return (
                  <MenuItem style={menuStyles} value={option?.value}>
                    {option?.iconName ? (
                      <span style={{ marginRight: "12px" }}>
                        <i className={"fas " + option.iconName}></i>
                      </span>
                    ) : undefined}
                    {option?.label}
                  </MenuItem>
                );
              }
            })
          : null}
      </Select>
      <FormHelperText
        error={
          errorMessage !== undefined && errorMessage?.trim() !== ""
            ? true
            : false
        }
      >
        {errorMessage !== undefined && errorMessage?.trim() !== ""
          ? errorMessage
          : ""}
      </FormHelperText>
    </FormControl>
    // <Autocomplete
    //     options={options}
    //     getOptionLabel={(_option) => _option?.label!==undefined ? _option?.label : ''}
    //     style={styles}
    //     renderInput={(params) => <TextField {...params} required={required} error={errorMessage!==undefined && errorMessage?.trim()!=='' ? true : false} helperText={errorMessage!==undefined && errorMessage?.trim()!=='' ? errorMessage : ''} label={label} variant={variant} />}
    //     size={size}
    //     disabled={disabled}
    //     onChange={onSelect}
    //     value={option}
    //     autoComplete={'off'}
    // />
  );
}

const fieldValidations = (value, validations) => {
  let error;
  if (validations && validations.length) {
    let flag = true;
    validations.forEach((validationsListItem) => {
      if (flag) {
        if (typeof validationsListItem === "string") {
          if (validationsListItem === "isRequired") {
            error = validateIsRequired(value);
          }
        } else if (typeof validationsListItem === "function") {
          error = validationsListItem(value);
        }

        if (error !== undefined) {
          flag = false;
        }
      }
    });
  }

  return error;
};

function validateIsRequired(value) {
  let error;
  if (value == null || value == undefined || value.toString().trim() === "") {
    error = "Required";
  }

  return error;
}

export default PgkSelectField;
