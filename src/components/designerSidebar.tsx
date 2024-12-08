import React from "react";
import { FormElements } from "./formElements";
import SidebarBtnElement from "./sidebarBtnElement";

const DesignerSideBar = () => {
  return (
    <aside className="flex flex-col flex-grow border-l-2 border-muted p-4 bg-background overflow-y-auto h-full max-w-[400px]">
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  );
};

export default DesignerSideBar;
