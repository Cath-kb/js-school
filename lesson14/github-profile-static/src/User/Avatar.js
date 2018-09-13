import React from "react";

const Avatar = ({avatar}) => (
  <img
    className="img-fluid mx-auto d-block rounded"
    src={avatar.url}
    alt="User Avatar"
  />
);

export default Avatar;
