import React, { ReactNode } from "react";

const FormDetailsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col flex-grow mx-auto p-2">{children}</div>
  );
};

export default FormDetailsLayout;
