"use client";

import * as React from "react";
import { FiSun, FiMoon } from "./Icons";
import { cn } from "@/lib/utils";

interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false, ...props }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? (theme === "dark" ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-lg p-2.5 text-sm font-medium transition-colors",
        "border border-border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <div className="relative h-4 w-4">
        <FiSun
          className={cn(
            "h-4 w-4 transition-all duration-300",
            mounted && theme === "dark"
              ? "scale-0 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100 text-foreground"
          )}
        />
        <FiMoon
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300",
            mounted && theme === "dark"
              ? "scale-100 rotate-0 opacity-100 text-foreground"
              : "scale-0 -rotate-90 opacity-0"
          )}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium">
          {mounted ? (theme === "dark" ? "Dark" : "Light") : "Theme"}
        </span>
      )}
    </button>
  );
}

