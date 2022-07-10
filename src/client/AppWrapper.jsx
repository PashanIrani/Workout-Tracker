import TopNav from "./component/TopNav.jsx";
import LogoutNav from "./component/LogoutNav.jsx";
import React from "react";

const AppWrapper = (props) => {
  return (
    <div>
      <TopNav /> <LogoutNav />
      {props.children}
    </div>
  );
};

export default AppWrapper;
