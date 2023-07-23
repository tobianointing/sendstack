"use client";

import { Button } from "@/features/ui/button";
import LogoIcon from "@/features/ui/icons/LogoIcon";
import { useEffect, useState } from "react";
import { LuMoonStar, LuSun } from "react-icons/lu";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="flex items-center justify-between">
      <LogoIcon className="w-40 dark:fill-white" />
      <div className="flex">
        {darkMode ? (
          <Button variant={"ghost"} onClick={toggleDarkMode}>
            <LuMoonStar className="w-6 h-6 dark:stroke-white" />
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={toggleDarkMode}>
            <LuSun className="w-6 h-6 dark:stroke-white" />
          </Button>
        )}
      </div>
    </header>
  );
};
