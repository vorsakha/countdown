import React, { Fragment } from "react";
import spinner from "../../images/loading.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "50px", margin: "auto", display: "block" }}
        alt="loading..."
      />
    </Fragment>
  );
};

export default Spinner;
