import React from "react";

export const Member = ({
  data,
}) => {
  return (
    <span>
      {data.user && data.user.nick}
    </span>
  );
};
