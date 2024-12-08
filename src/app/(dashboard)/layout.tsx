import Logo from "@/components/logo";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full max-h-screen">
      
      {children}
    </div>
  );
};

export default Layout;
