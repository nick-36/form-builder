"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonitorCog, MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div>
      <Tabs defaultValue={theme}>
        <TabsList>
          <TabsTrigger value="light" onClick={() => setTheme("light")}>
            <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
          <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
            <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
          </TabsTrigger>
          <TabsTrigger value="system" onClick={() => setTheme("system")}>
            <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ThemeSwitcher;
