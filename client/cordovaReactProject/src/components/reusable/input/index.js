import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    background: "#27292D",
  },
  input: {
    color: "#ECECEC",
  },
};

const Input = ({
  classes,
  value,
  onChange,
  label,
  type,
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      className={classes.root}
      InputProps={{
        className: classes.input,
      }}
      className='s_input'
      type={type}
    />
  );
};

export default withStyles(styles)(Input);
