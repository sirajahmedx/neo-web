"use client";

import { Moon, Sun, Check } from "lucide-react";
const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine current theme for icon
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-w-6xl mx-auto">
      <h1
        className="text-2xl font-bold tracking-tight transition-colors hover:text-primary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
        tabIndex={0}
        aria-label="Echo Home"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        Echo
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Toggle theme">
            <span
              className="inline-block transition-transform duration-300 will-change-transform"
              key={currentTheme}
            >
              {mounted && currentTheme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
              )}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themeOptions.map((opt) => {
            const selected =
              opt.value === (opt.value === "system" ? theme : currentTheme);
            return (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                aria-selected={selected}
                aria-checked={selected}
                aria-current={selected ? "true" : undefined}
                role="menuitemradio"
                tabIndex={0}
                className="flex items-center gap-2"
              >
                {selected && <Check className="h-4 w-4 text-primary" />}
                {opt.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
