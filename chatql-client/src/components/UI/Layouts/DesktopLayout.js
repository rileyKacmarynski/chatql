import React from "react";

import MainMenu from '../../menu/menu';

const DesktopLayout = (props) => {
  return (
    <div className={"DesktopOnly"}>
      <MainMenu isAuthenticated={props.isAuthenticated} />
      <main>{props.children}</main>
    </div>
  );
};

export default DesktopLayout;
