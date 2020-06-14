import React from "react";

export const Member = ({
  data,
  userId,
  onClick,
}) => {
  return (
    <span
      onClick={() => {
        if (data.user) {
          if (userId !== data.user.id) {
            onClick(data.user);
          }
        }
      }}
    >
      {data.user && data.user.nick}
    </span>
  );
};
