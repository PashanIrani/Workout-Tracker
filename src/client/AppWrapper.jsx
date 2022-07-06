import TopNav from "./component/TopNav.jsx";
import React from "react";

const AppWrapper = (props) => {
  return (<div><TopNav />{props.children}</div>);
}

export default AppWrapper;