import React from "react";
import Button from "@material-ui/core/Button";

const Btn = ({
  title,
  onClick,
  disabled,
}) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      className='s_button'
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default Btn;
