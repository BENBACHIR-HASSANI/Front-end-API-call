import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
const User = (props) => {
  console.log(props);
  let { id } = useParams();

  return (
    <div>
      <h1>User Details</h1>
      ID: {id}
    </div>
  );
};
export default User;
