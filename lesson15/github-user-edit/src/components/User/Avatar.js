import React from "react";

const Avatar = ({avatar}) => (
  <img
    className="img-fluid mb-4 rounded"
    src={avatar.url}
    alt="User Avatar"
  />
);

export default Avatar;
