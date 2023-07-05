import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  radioLabel: {
    "& span": {
      fontSize: "13px",
    },
    "& svg":{
        width:"1rem",
        height:"1rem"
    }
  },
}));

export default function PgkRadioField(props) {
  const classes = useStyles();
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={props?.value}
        name="radio-buttons-group"
        row
        onChange={props?.onHandleChange}
      >
        {props?.radioList?.map((ele, index) => (
          <FormControlLabel
            className={classes.radioLabel}
            key={index}
            value={ele.value}
            control={<Radio />}
            label={ele.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
