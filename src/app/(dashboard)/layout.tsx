import Logo from "@/components/logo";
import ThemeSwitcher from "@/components/themeSwitcher";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full max-h-screen">
      <nav className="w-full flex justify-between items-center h-[60] p-2">
        <Logo />
        <div className="flex w-fit gap-4 items-center">
          <ThemeSwitcher />
          <UserButton signInUrl="/sign-in" />
        </div>
      </nav>
      <Separator />
      {children}
    </div>
  );
};

export default Layout;
