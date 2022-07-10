import TopNav from "./component/TopNav.jsx";
import LogoutNav from "./component/LogoutNav.jsx";
import React from "react";

const AppWrapper = (props) => {
  return (
  <div>
  <div><TopNav />{props.children}</div>
  <div><LogoutNav />{props.children}</div>
  </div>);
}

export default AppWrapper;