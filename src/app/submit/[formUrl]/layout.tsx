import React, { ReactNode } from "react";

const BuilderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full max-h-screen">
      <main>{children}</main>
    </div>
  );
};

export default BuilderLayout;
