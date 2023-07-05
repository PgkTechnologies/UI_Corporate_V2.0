import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";

function PgkTextField(props) {
  const [init, setInit] = useState(false);

  const {
    label = "",
    variant = "outlined",
    size = "small",
    name = "",
    value = "",
    onChange = () => {},
    disabled = false,
    multiline = false,
    className = "",
    minRows = 1,
    required = false,
    type = "text",
    errorMessage = "",
    styles = { width: "100%" },
    inputProps = {},
    validations = [],
    inputLabelProps = {},
    InputLabelProps = {},
    InputProps = {},
  } = props;

  const inputHandler = (event) => {
    let { name, value } = event.target;
    let newValidations = [];
    if (required) {
      newValidations = ["isRequired", ...validations];
    } else {
      newValidations = validations;
    }
    const errorString = fieldValidations(value, newValidations);

    onChange(name, type === "number" ? parseInt(value) : value, errorString);
  };

  useEffect(() => {
    if (!init && name && value) {
      let newValidations = [];
      if (required) {
        newValidations = ["isRequired", ...validations];
      } else {
        newValidations = validations;
      }
      const errorString = fieldValidations(value, newValidations);

      onChange(name, value, errorString);
      setInit(!init);
    }
  }, [name, value]);

  return (
    <TextField
      label={label}
      autoFocus={value}
      variant={variant}
      className={className}
      size={size}
      name={name}
      onChange={inputHandler}
      value={value || ""}
      disabled={disabled}
      multiline={multiline}
      rows={minRows}
      required={required}
      type={type}
      error={
        errorMessage !== undefined && errorMessage?.trim() !== "" ? true : false
      }
      helperText={errorMessage}
      style={styles}
      inputProps={inputProps}
      InputLabelProps={inputLabelProps}
      InputProps={InputProps}
      autoComplete={"off"}
    />
  );
}

const fieldValidations = (value, validations) => {
  let error;

  if (validations && validations.length) {
    let flag = true;
    validations.forEach((validationsListItem) => {
      if (flag) {
        if (typeof validationsListItem === "string") {
          if (validationsListItem === "isEmail") {
            error = validateEmail(value);
          }

          if (validationsListItem === "isRequired") {
            error = validateIsRequired(value);
          }

          if (validationsListItem === "isNumeric") {
            error = validateIsNumeric(value);
          }

          if (validationsListItem === "isNumericWithDecimal") {
            error = validateIsNumericWithDecimal(value);
          }

          if (
            validationsListItem.includes("_") &&
            validationsListItem.split("_").length === 2 &&
            ((validationsListItem.split("_")[0].toLowerCase() === "min" &&
              validateIsNumericWithDecimal(
                validationsListItem.split("_")[1]
              ) === undefined) ||
              (validationsListItem.split("_")[0].toLowerCase() === "max" &&
                validateIsNumericWithDecimal(
                  validationsListItem.split("_")[1]
                ) === undefined))
          ) {
            error = minOrMaxValue(
              value,
              validationsListItem.split("_")[0].toLowerCase(),
              +validationsListItem.split("_")[1]
            );
          }

          if (
            validationsListItem.includes("_") &&
            validationsListItem.split("_").length === 2 &&
            ((validationsListItem.split("_")[0].toLowerCase() === "minlength" &&
              validateIsNumeric(validationsListItem.split("_")[1]) ===
                undefined) ||
              (validationsListItem.split("_")[0].toLowerCase() ===
                "maxlength" &&
                validateIsNumeric(validationsListItem.split("_")[1]) ===
                  undefined))
          ) {
            error = minOrMaxLength(
              value,
              validationsListItem.split("_")[0].toLowerCase(),
              +validationsListItem.split("_")[1]
            );
          }
        } else if (typeof validationsListItem === "function") {
          error = validationsListItem(value);
          //console.log('error ', error);
        }

        if (error !== undefined) {
          flag = false;
        }
      }
    });
  }

  return error;
};

function validateEmail(value) {
  let error;
  if (!value || value == undefined || value.toString().trim() === "") {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid Email Address";
  }
  return error;
}

function validateIsRequired(value) {
  let error;
  if (value === null || value == undefined || value.toString().trim() === "") {
    error = "Required";
  }

  return error;
}

function validateIsNumeric(value) {
  const numericPattern = new RegExp(/^[0-9]*$/);

  let error;
  if (!numericPattern.test(value)) {
    error = "Invalid Number";
  }

  return error;
}

function validateIsNumericWithDecimal(value) {
  const numericPattern = new RegExp(/^\d+(?:\.\d{1,2})?$/);

  let error;
  if (!numericPattern.test(value)) {
    error = "Invalid Number";
  }

  return error;
}

function minOrMaxLength(value, minOrMax, length) {
  let error;

  if (
    value !== undefined &&
    minOrMax === "minlength" &&
    value.length < length
  ) {
    error =
      "Minimum Length " +
      length
        .toString()
        .split("")
        .reduce((prevValue, currentValue) => {
          return prevValue + "" + currentValue;
        }, "");
  } else if (
    value !== undefined &&
    minOrMax === "maxlength" &&
    value.length > length
  ) {
    error =
      "Maximum Length " +
      length
        .toString()
        .split("")
        .reduce((prevValue, currentValue) => {
          return prevValue + "" + currentValue;
        }, "");
  }

  return error;
}

function minOrMaxValue(value, minOrMax, minOrMaxVal) {
  let error;

  if (value !== undefined && minOrMax === "min" && value < minOrMaxVal) {
    minOrMaxVal = parseFloat(minOrMaxVal).toFixed(2);
    if (minOrMaxVal.endsWith(".00")) {
      minOrMaxVal = minOrMaxVal.slice(0, minOrMaxVal.length - 3);
    }
    error =
      "Minimum Value " +
      minOrMaxVal
        .toString()
        .split("")
        .reduce((prevValue, currentValue) => {
          return prevValue + "" + (currentValue == "." ? "." : currentValue);
        }, "");
  } else if (value !== undefined && minOrMax === "max" && value > minOrMaxVal) {
    minOrMaxVal = parseFloat(minOrMaxVal).toFixed(2);
    minOrMaxVal = parseFloat(minOrMaxVal).toFixed(2);
    if (minOrMaxVal.endsWith(".00")) {
      minOrMaxVal = minOrMaxVal.slice(0, minOrMaxVal.length - 3);
    }
    error =
      "Maximum Value " +
      minOrMaxVal
        .toString()
        .split("")
        .reduce((prevValue, currentValue) => {
          return prevValue + "" + (currentValue == "." ? "." : currentValue);
        }, "");
  }

  return error;
}

export default PgkTextField;
