import React from "react";
import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.loading_state}>
      <div className={classes.loading}></div>
    </div>
  );
};

export default Spinner;
